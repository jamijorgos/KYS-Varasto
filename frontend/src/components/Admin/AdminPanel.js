import React, { useState } from 'react'
import {Link} from 'react-router-dom'

import AdminForm from './AdminForm'
import Map from '../Map'
import Log from './Log'

const AdminPanel = () => {
    const [logVisible, setLogVisible] = useState(false);
    const [mapLocation, setMapLocation] = useState('');

    const openLog = () => {
        if(logVisible != true){
            setLogVisible(true);
        } else {
            setLogVisible(false);
        }
    }

    return (
        <div>
            <Link className="btn btn-info" to="/">&lt; Takaisin</Link>
            <div className="admin-flex">
                <AdminForm setMapLocation={setMapLocation}/>
                <Map mapClass="admin-map" mapLocation={mapLocation}/>
                <button onClick={openLog} className="btn btn-primary" id = "log-btn">
                    Loki
                </button>
                {logVisible == true ? <Log /> : null}
            </div>
        </div>
    )
}

export default AdminPanel
