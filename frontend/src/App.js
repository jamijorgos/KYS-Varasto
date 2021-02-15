import React, { useState } from 'react';
import './App.css';
import Items from './Items.js';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="container">
      <header className="App-header">
        <h1>KYS-Varastonhallinta</h1>
      </header>

      <body>
        <div>
          <Items />
        </div>
      </body>
    </div>
  );
}

export default App;
