import React, { useState } from 'react';
import './App.css';
import Items from './Items.js';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <body>
      <div className="container-fluid">
        <header className="App-header">
          <h1>KYS-Varastonhallinta</h1>
        </header>
        <nav class="col-md-3 d-none d-md-block bg-light sidebar">
          <div class="sidebar-sticky">
            <Items />
          </div>
        </nav>
      </div>
    </body>
  );
}

export default App;
