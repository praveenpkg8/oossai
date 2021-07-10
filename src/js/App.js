import React from 'react';
import Record from './Record';
import ErrrorIndicator from './ErrrorIndicator';
import Setting from './Setting';
import MouseControl from './MouseControl';
import Help from './Help';

import '../css/App.css';


export default function App() {

  return (
    <>
    <div className="container">
      {/* <MouseControl /> */}
      <ErrrorIndicator />
      <Record />
      <Setting />
      <Help />
    </div>
    </>
  )
}