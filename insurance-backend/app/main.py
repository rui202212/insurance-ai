from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dataclasses import asdict 
import joblib
import pandas as pd
import numpy as np
from pathlib import Path
from .schemas import InsuranceInput, InsuranceOutput 

app = FastAPI(title="Insurance Prediction API")

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Model loading
MODEL_PATH = Path(__file__).parent / "ml" / "insurance_model_xgboost.pkl"
model = joblib.load(MODEL_PATH)

@app.post("/predict")  
async def predict(input_data: InsuranceInput):
    # Conversion en dict avec asdict()
    input_dict = asdict(input_data)
    df = pd.DataFrame([input_dict])
    
    # Prédiction
    prediction = model.predict(df)[0]
    
    # Calcul de la confiance
    confidence = min(0.95, max(0.7, 1 - abs(prediction - 20000) / 100000))
    
    # Détails explicatifs
    details = {
        "age_impact": input_dict["age"] * 250,
        "smoker_impact": 8000 if input_dict["smoker"] else 0,
        "bmi_impact": (input_dict["bmi"] - 25) * 300
    }
    
    # Création de l'objet de sortie
    output = InsuranceOutput(
        prediction=round(float(prediction), 2),
        confidence=round(confidence, 2),
        details=details
    )
    
    # Conversion en dict avant retour
    return asdict(output)

@app.get("/health")
async def health_check():
    return {"status": "healthy", "model_loaded": model is not None}