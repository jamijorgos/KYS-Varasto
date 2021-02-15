import React, { useState } from 'react';
import './App.css';
import Items from './Items.js';

function App() {
  return (
    <div className="App">
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
