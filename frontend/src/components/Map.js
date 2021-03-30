import React, {useEffect} from 'react'
import kartta from '../images/varastokartta.png'
import { LOCATIONS } from './ShelfLocation'

const Map = (props) => {

    useEffect(() => {
        drawMap();
    }, [])
    useEffect(() => {
        drawLocation(props.mapLocation)
    }, [props.mapLocation])

    const drawMap = () => {
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        const karttaImg = document.getElementById('kartta');
        const image = {
            w: karttaImg.width,
            h: karttaImg.height,
            x: 20,
            y: 20
        }
        ctx.drawImage(karttaImg, image.x, image.y, image.w, image.h);
    }
    const drawLocation = (n) => {
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        ctx.lineWidth = 5;
        ctx.lineJoin = "round";
        clear();
        drawMap();
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

        function clear(){
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }

    return (
        <div id="admin-canvas">
            <canvas className={props.mapClass} id="canvas" width="891" height="504" ></canvas>
            <img src={kartta} id="kartta"></img>
        </div>
    )
}


export default Map
