from fastapi import FastAPI, Request
from pydantic import BaseModel
import pickle
import numpy as np
import os

from fastapi.middleware.cors import CORSMiddleware




# Initialize FastAPI app
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://spam-predictor-yp83.onrender.com", "https://spam-dectetor.vercel.app"],  # React frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Check if the pickle files exist before loading
if not os.path.exists('log_reg_model.pkl'):
    raise FileNotFoundError("log_reg_model.pkl not found")

# Load models
with open('log_reg_model.pkl', 'rb') as f:
    log_reg = pickle.load(f)

with open('rf_model.pkl', 'rb') as f:
    rf = pickle.load(f)

with open('xgb_model.pkl', 'rb') as f:
    xgb = pickle.load(f)

with open('svm_model.pkl', 'rb') as f:
    svm = pickle.load(f)

# Load TF-IDF Vectorizer
with open('tfidf_vectorizer.pkl', 'rb') as f:
    vectorizer = pickle.load(f)

# Input schema
class MessageInput(BaseModel):
    message: str

# Prediction endpoint
@app.post("/predict")
async def predict(data: MessageInput):
    message = data.message
    input_features = vectorizer.transform([message])

    # Get individual predictions
    log_reg_pred = log_reg.predict(input_features)[0]
    rf_pred = rf.predict(input_features)[0]
    xgb_pred = xgb.predict(input_features)[0]
    svm_pred = svm.predict(input_features)[0]

    # Convert to labels
    predictions = {
        'log_reg': 'Spam' if log_reg_pred == 0 else 'Ham',
        'random_forest': 'Spam' if rf_pred == 0 else 'Ham',
        'xgboost': 'Spam' if xgb_pred == 0 else 'Ham',
        'svm': 'Spam' if svm_pred == 0 else 'Ham'
    }

    # Final prediction logic
    if xgb_pred == 0:
        final_prediction = 'Spam'
    else:
        spam_votes = [log_reg_pred, rf_pred, xgb_pred, svm_pred].count(0)
        final_prediction = 'Spam' if spam_votes >= 2 else 'Not a Spam'

    return {
        "input": message,
        "predictions": predictions,
        "final_prediction": final_prediction
    }
