import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'; // Si vous avez un fichier CSS global

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <div className="container py-5">
      <App />
      <footer className="mt-5 text-center text-muted small">
        Modèle ML : XGBoost - Version {process.env.REACT_APP_MODEL_VERSION || '1.0'}
      </footer>
    </div>
  </React.StrictMode>
);