import React, { useState } from 'react';
import Result from './Result.js';

function Items(params) {

    const [fetchedData, setfetchedData] = useState([]);

    async function fetchData() {
        let response = await fetch("http://localhost:5000");//Tänne oikeanlainen kutsu jolla saadaan tiedot palvelimelta
        let data = await response.json();
        setfetchedData(data);
    }

    function ItemList(data) {//Täyttää alasvetolaatikon
        //console.log("Data: ");
        //console.log(data);
        
        if (data.length > 0){
            const listItems = data.map((tavara) =>
                <option value = {tavara.id}>{tavara.nimi}</option>
            );
            return (
                <select>{listItems}</select>
            );
        }
    }
    //Täällä palautetaan se täydennetty alasvetolaatikko
    //Sitten joku onchange metodi ja siitä kutsutaan Result
    return (
        <div>
            <select onChange={() => fetchData()}>
                <option>1</option>
            </select>
            <br/>
            {ItemList}
            <br/>
            <Result/>
        </div>

    )
}
export default Items;