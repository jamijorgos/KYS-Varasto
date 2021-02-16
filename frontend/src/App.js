import React, { useState } from 'react';
import './App.css';
import Items from './Items.js';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <body>
    <div className="container">
      <header className="App-header">
        <h1>KYS-Varastonhallinta</h1>
      </header>
        <div>
          <Items />
        </div>
    </div>
    </body>
  );
}

export default App;
