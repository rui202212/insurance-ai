import React, { useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';
import ResultDisplay from './ResultDisplay';

const PredictionForm = () => {
  const [formData, setFormData] = useState({
    age: 30,
    sex: 'male',
    bmi: 22.5,
    children: 0,
    smoker: false,
    region: 'southwest'
  });
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post('http://localhost:8000/predict', {
        ...formData,
        age: parseInt(formData.age),
        bmi: parseFloat(formData.bmi),
        children: parseInt(formData.children)
      });
      setPrediction(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la prédiction');
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded bg-white shadow-sm">
      <h2 className="mb-4 text-center">Estimation d'assurance</h2>
      
      {error && (
        <Alert variant="danger" dismissible onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        {/* Champs du formulaire (inchangés) */}
        {/* ... (gardez vos Form.Group existants) ... */}

        <Button 
          variant="primary" 
          type="submit" 
          disabled={loading}
          className="w-100 mt-3"
        >
          {loading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                className="me-2"
              />
              Calcul en cours...
            </>
          ) : (
            'Estimer le coût'
          )}
        </Button>
      </Form>

      {/* Résultat */}
      <ResultDisplay prediction={prediction} error={error} />
    </div>
  );
};

export default PredictionForm;