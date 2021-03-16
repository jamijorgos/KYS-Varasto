import React, { useState, Fragment, useRef } from 'react';
import './App.css';
import Items from './components/Items.js';
import Sidebar from './components/Sidebar.js';
import Map from './components/Map'
import AdminForm from './components/AdminForm'
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const openHandler = () =>{
    if(!sidebarOpen){
      setSidebarOpen(true);
    }
    else{
      setSidebarOpen(false);
    }
  }
  const sidebarCloseHandler = () =>{
    setSidebarOpen(false);
  }


  let sidebar;
  if(sidebarOpen){
    sidebar = <Sidebar close = {sidebarCloseHandler} sidebar = {"sidebar"}/>
  }
  

  return (
    <body>
      <div className="container-fluid">
        <header className="App-header">
          <h1>KYS-Varastonhallinta</h1>
        </header>
        {sidebar}
        <Toggle click = {openHandler}/>
        <Map />
        <AdminForm />
      </div>
    </body>
  );
}

export default App;

function Toggle(props){
  return(
      <Fragment>
          <button class="btn btn-info btn-lg" id="toggle" onClick = {props.click}>&#8801;</button>
      </Fragment>
  )
}
