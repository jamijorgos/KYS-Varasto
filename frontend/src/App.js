import React, { useState, Fragment } from 'react';
import './App.css';
import Items from './Items.js';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openHandler = () =>{
    if(!sidebarOpen){
      setSidebarOpen(true);
    }
    else{
      setSidebarOpen(false);
    }
  }

  

  return (
    <body>
      <div className="container-fluid">
        <header className="App-header">
          <h1>KYS-Varastonhallinta</h1>
        </header>
        <Sidebar/>
        <Toggle click = {openHandler}/>
      </div>
    </body>
  );
}

export default App;

function Sidebar () {
  return(
      <div className="sidebar">
          <h2>Tavarahaku</h2>
          <button id="close">&times; SULJE</button>
          <Items/>
      </div>
  )
}

function Toggle(props){
  return(
      <Fragment>
          <button id="toggle" onClick = {props.click}>&#8801;</button>
      </Fragment>
  )
}
