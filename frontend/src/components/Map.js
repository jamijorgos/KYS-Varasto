import React from 'react'
import kartta from '../images/varastokartta.png'

const Map = (props) => {
    return (
        <div>
            <img className={props.mapClass} src={kartta}></img>
        </div>
    )
}

export default Map
