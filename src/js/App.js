import React from 'react';
import Record from './Record';
import ErrrorIndicator from './ErrrorIndicator';
import '../css/App.css';


export default function App() {

  return (
    <>
    <div className="container">
      <ErrrorIndicator />
      <Record />
    </div>
    </>
  )
}