import React, { useState, Fragment, useRef } from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import './App.css';
import Items from './components/Items.js';
import Sidebar from './components/Sidebar.js';
import Map from './components/Map'
import AdminPanel from './components/Admin/AdminPanel'
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);//Sidebarin aukiolotieto
  const [selectedItem, setSelectedItem] = useState("");//Valittu tavara

  const openHandler = () =>{//käsitellään pyyntö avata sidebar
    if(!sidebarOpen){
      setSidebarOpen(true);
    }
    else{
      setSidebarOpen(false);
    }
  }
  const sidebarCloseHandler = () =>{//sidebarin sulkemispyynnön käsittely
    setSidebarOpen(false);
  }

  let sidebar;//Sidebarin parametrien määrittely
  if(sidebarOpen){//Jos sidebar on auki, sidebarille annetaan parametrina sulkemisfunktio ja avoimen sidebarin luokka.
    sidebar = <Sidebar close = {sidebarCloseHandler} sidebar = {"sidebar"} selectedItem = {selectedItem} setSelectedItem={setSelectedItem}/>
  }
  
  return (
    <Router>
      <body>
        <div className="container-fluid">
          <header className="App-header">
            <h1>KYS-Varastonhallinta</h1>
            <Link className="btn btn-light" to="adminpanel">Admin</Link>
          </header>
          <Switch>
            <Route path="/adminpanel" component={AdminPanel}/>
            <Route path="/">
              {sidebar}
              <Toggle click = {openHandler}/>
              <Map mapClass="user-map"/>
            </Route>
          </Switch>
        </div>
      </body>
    </Router>
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
