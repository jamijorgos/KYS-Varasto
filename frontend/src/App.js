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
        <Category/>
        <h2>Valitse tavara</h2>
        <Items/>

      </body>
    </div>
  );
}

export default App;

function Category() {
  return (
    <div>
      <h2>Valitse kategoria</h2>
        <select>
          <option value = "1">Rokotteet</option>
          <option value = "2">Työvälineet</option>
          <option value = "3">Muut</option>
        </select>
    </div>
  );
}