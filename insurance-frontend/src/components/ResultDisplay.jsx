import React from 'react';
import { Card, ProgressBar, ListGroup, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ResultDisplay = ({ prediction, error }) => {
  if (error) {
    return (
      <Alert variant="danger" className="mt-4">
        <Alert.Heading>Erreur</Alert.Heading>
        <p>{error}</p>
      </Alert>
    );
  }

  if (!prediction) return null;

  // Calcul du pourcentage de confiance pour la ProgressBar
  const confidencePercentage = prediction.confidence * 100;

  return (
    <Card className="mt-4 shadow-sm">
      <Card.Header as="h5" className="bg-primary text-white">
        Résultat de la prédiction
      </Card.Header>
      <Card.Body>
        <div className="text-center mb-4">
          <Card.Title className="fs-1 fw-bold text-success">
            ${prediction.prediction.toFixed(2)}
          </Card.Title>
          <Card.Subtitle className="mb-3 text-muted">
            Estimation annuelle
          </Card.Subtitle>
          
          <div className="mb-3">
            <span className="me-2">Confiance du modèle:</span>
            <ProgressBar 
              now={confidencePercentage} 
              label={`${confidencePercentage.toFixed(0)}%`} 
              variant={confidencePercentage > 80 ? 'success' : confidencePercentage > 60 ? 'warning' : 'danger'}
              className="mt-2"
              style={{ height: '24px' }}
            />
          </div>
        </div>

        <Card className="mb-3">
          <Card.Header>Détails des facteurs d'influence</Card.Header>
          <ListGroup variant="flush">
            <ListGroup.Item className="d-flex justify-content-between align-items-center">
              <span>Âge ({prediction.details.age_impact > 0 ? '+' : ''}{prediction.details.age_impact.toFixed(2)}$)</span>
              <span className={`badge ${prediction.details.age_impact > 0 ? 'bg-danger' : 'bg-success'}`}>
                {prediction.details.age_impact > 0 ? '↑ Coût' : '↓ Coût'}
              </span>
            </ListGroup.Item>
            
            <ListGroup.Item className="d-flex justify-content-between align-items-center">
              <span>Tabagisme ({prediction.details.smoker_impact.toFixed(2)}$)</span>
              <span className={`badge ${prediction.details.smoker_impact > 0 ? 'bg-danger' : 'bg-success'}`}>
                {prediction.details.smoker_impact > 0 ? '↑ Coût' : '↓ Coût'}
              </span>
            </ListGroup.Item>
            
            <ListGroup.Item className="d-flex justify-content-between align-items-center">
              <span>IMC ({prediction.details.bmi_impact.toFixed(2)}$)</span>
              <span className={`badge ${prediction.details.bmi_impact > 0 ? 'bg-danger' : 'bg-success'}`}>
                {prediction.details.bmi_impact > 0 ? '↑ Coût' : '↓ Coût'}
              </span>
            </ListGroup.Item>
          </ListGroup>
        </Card>

        <Alert variant="info" className="mt-3">
          <Alert.Heading>Note explicative</Alert.Heading>
          <p>
            Cette estimation est basée sur notre modèle d'apprentissage automatique. 
            Les montants indiqués représentent l'impact individuel de chaque facteur sur votre prime annuelle.
          </p>
        </Alert>
      </Card.Body>
    </Card>
  );
};

export default ResultDisplay;