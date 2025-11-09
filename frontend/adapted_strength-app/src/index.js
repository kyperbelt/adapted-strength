import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ErrorBoundry from './pages/ErrorBoundry';

// Disable console logs in production (not localhost)
if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
  console.log = () => {};
  console.warn = () => {};
  // Keep console.error for debugging critical issues
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <ErrorBoundry>
      <App />
    </ErrorBoundry>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
