import React from 'react';
import { Container } from 'react-bootstrap';
import PredictionForm from './components/PredictionForm';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Container className="py-5">
      <h1 className="text-center mb-5">Estimation des Coûts d'Assurance</h1>
      <PredictionForm />
    </Container>
  );
}

export default App;