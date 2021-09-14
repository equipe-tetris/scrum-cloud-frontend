import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
    <script src="https://unpkg.com/react-router-dom/umd/react-router-dom.min.js"></script>
  </React.StrictMode>,
  document.getElementById('root')
);

