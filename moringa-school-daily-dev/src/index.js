import React from 'react';
import ReactDOM from 'react-dom/client'; // React 18 root API
import './index.css';
import App from './App';
import { Provider } from 'react-redux'; // Import the Redux Provider
import  store  from './redux/store'; // Correct path to store (update if needed)
import reportWebVitals from './reportWebVitals';

// Create root with React 18's new root API
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app with the Redux store provided to the entire app
root.render(
  <React.StrictMode>
    <Provider store={store}>  {/* Provide the Redux store to the App */}
      <App />
    </Provider>
  </React.StrictMode>
);

// Optional: Track app performance
reportWebVitals();
