import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51ND1RnJRJbQ8b793bNC0qIFSZqbVQaVDm4OD3r3z7tjlSyHkWwXor7igqowmzbbuYETkZ3pJNHs5mZUOOId9DDbe00Nhm7PsPR')

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
  </BrowserRouter>
  // </React.StrictMode>
);



