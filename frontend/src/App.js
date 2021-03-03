import React, { useState, Fragment } from 'react';
import './App.css';
import Items from './Items.js';
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

function Sidebar (props) {

  const [sidebarClass, setSidebarClass] = useState(props.sidebar);

  const closeHandler = () => {
    setSidebarClass("sidebar-close");
    setTimeout(() => {
      props.close();
    }, 1000)
  }

  return(
      <div className={sidebarClass}>
          <h2>Tavarahaku</h2>
          <button id="close" onClick = {closeHandler}>&times; SULJE</button>
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
