import './index.css';
import reportWebVitals from './reportWebVitals';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MainApp from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

let renderAllTree = () => {
  root.render(<MainApp />);
};

renderAllTree();

reportWebVitals();
