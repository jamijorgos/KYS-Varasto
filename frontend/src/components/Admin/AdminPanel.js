import React from 'react'
import {Link} from 'react-router-dom'

import AdminForm from './AdminForm'
import Map from '../Map'
import Log from './Log'

const AdminPanel = () => {
    return (
        <div>
            <Link className="btn btn-info" to="/">&lt; Takaisin</Link>
            <div className="admin-flex">
                <AdminForm />
                <Map mapClass="admin-map"/>
                <Log />
            </div>
        </div>
    )
}

export default AdminPanel
