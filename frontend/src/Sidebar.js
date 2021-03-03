import React, { useEffect, useState } from 'react';
import Items from './Items.js';
import './App.css';

function Sidebar (props) {

    const [sidebarClass, setSidebarClass] = useState(props.sidebar);
  
    const closeHandler = () => {
      setSidebarClass("sidebar-close");
      setTimeout(() => {
        props.close();
      }, 700)
    }
  
    return(
        <div className={sidebarClass}>
            <h2>Tavarahaku</h2>
            <button id="close" class="btn btn-info btn-lg" onClick = {closeHandler}>&times; SULJE</button>
            <Items/>
        </div>
    )
  }

export default Sidebar;