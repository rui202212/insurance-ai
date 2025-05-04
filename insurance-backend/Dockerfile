# Utilise une image Python officielle avec slim pour réduire la taille
FROM python:3.9-slim

# Définit le répertoire de travail dans le conteneur
WORKDIR /app

# Installe les dépendances système (nécessaires pour XGBoost, pandas, etc.)
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Copie le fichier requirements.txt d'abord pour exploiter le cache Docker
COPY requirements.txt .

# Installe les dépendances Python
RUN pip install --no-cache-dir -r requirements.txt

# Copie le reste de l'application
COPY ./app ./app

# Expose le port 8000 pour Uvicorn
EXPOSE 8000

# Commande pour démarrer l'application FastAPI avec Uvicorn
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]