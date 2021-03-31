import React, {useEffect} from 'react'
import kartta from '../images/varastokartta.png'
import { LOCATIONS } from './ShelfLocation'

const Map = (props) => {

    useEffect(() => {
        drawMap();
        drawLayout();
    }, [])
    useEffect(() => {
        drawLocation(props.mapLocation)
    }, [props.mapLocation])

    const drawMap = () => {
        const canvas = document.getElementById('canvas');
        const karttaImg = document.getElementById('kartta');
        const ctx = canvas.getContext('2d');
        const image = {
            w: karttaImg.width,
            h: karttaImg.height,
            x: 20,
            y: 20
        }
        ctx.drawImage(karttaImg, image.x, image.y, image.w, image.h);
    }
    const drawLayout = () => {
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        ctx.lineJoin = "round";
        LOCATIONS.forEach((location) =>{
            ctx.lineWidth = 1.5;
            ctx.font = "25px Tahoma";
            ctx.strokeStyle = "#585858";
            ctx.strokeRect(location.x, location.y, location.w, location.h);
            ctx.fillStyle = "#C5C5C5";
            ctx.fillRect(location.x, location.y, location.w, location.h);
            ctx.fillStyle = "#000000";
            ctx.fillText(location.nro, location.x + location.w * 0.2, location.y + 27);
        })
    }
    const drawLocation = (n) => {
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        drawMap();
        drawLayout();
        ctx.lineWidth = 4;
        ctx.lineJoin = "round";
        let index = null;
        let hylly = {
            w: 0,
            h: 0,
            x: 0,
            y: 0
        }
        const locations = LOCATIONS.map((nro) => nro.nro);
        locations.forEach( 
            element => element === n ? index = locations.indexOf(element) : null
        )

        if(index != null){
            hylly = {w: LOCATIONS[index].w, h: LOCATIONS[index].h, x: LOCATIONS[index].x, y: LOCATIONS[index].y}
        }

        ctx.strokeStyle = 'red';
        ctx.strokeRect(hylly.x, hylly.y, hylly.w, hylly.h);

    }

    return (
        <div id="map-container">
            <canvas className={props.mapClass} id="canvas" width="891" height="504" ></canvas>
            <img className="img-fluid" src={kartta} id="kartta"></img>
        </div>
    )
}


export default Map
