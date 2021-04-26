import React, { useEffect, useState } from 'react';
import Items from './Items.js';

function Sidebar (props) {

    const [sidebarClass, setSidebarClass] = useState(props.sidebar);//sidebarin luokkatieto jonka se saa parametrina
    

  
    const closeHandler = () => {//Sulkemispyynnön käsittely
      setSidebarClass("sidebar-close");//Muutetaan sidebarin luokkaa
      setTimeout(() => {//Sulkemiseen viive
        props.close();
      }, 700)
    }
  
    return(
        <div className={sidebarClass}>
            <h3>Tavarahaku</h3>
            <button id="close" className="btn btn-info btn-lg" onClick = {closeHandler}>&times; SULJE</button>
            <Items selectedItem = {props.selectedItem} setSelectedItem = {props.setSelectedItem} setMapLocation={props.setMapLocation}/>
        </div>
    )
  }

export default Sidebar;