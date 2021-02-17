import React, { useEffect, useState } from 'react';
import Result from './Result.js';

function Items(params) {

    const [fetchedData, setfetchedData] = useState([]);
    const [selectedItem, setselectedItem] = useState("");

    useEffect(()=> {//Hooksin lifecycle metodi joka ajetaan sen jälkeen kun DOM-puu on luotu
        fetchData();
    },[])//Estetään jatkuva haku, ainoastaan tilanmuutoksen yhteydessä

    async function fetchData() {
        let response = await fetch("http://localhost:5000/");//kutsu jolla saadaan tiedot palvelimelta
        let data = await response.json();
        //console.log(data);
        setfetchedData(data);
    }


    function ItemList(data) {//Täyttää alasvetolaatikon
        //console.log("Data: ");
        //console.log(data);
        
        if (data.length > 0){
            const listItems = data.map((tavara) =>
                <option value = {tavara._id}>{tavara.name}</option>
            );
            return (
                <select class= "custom-select custom-select-lg mb-3" onChange = {e => setselectedItem(e.target.value)}>
                    {listItems}
                </select>
            );
        }
    }
    //Täällä palautetaan se täydennetty alasvetolaatikko
    //Sitten joku onchange metodi ja siitä kutsutaan Result
    //console.log("selectedItem: " + selectedItem);

    return (
        <div>
            <Category/>
            <br/>
            <h2>Valitse Tavara</h2>
            
            {ItemList(fetchedData)}
            <br/>
            <Result props = {{tavaraId : selectedItem}}/>
        </div>

    )
}
export default Items;

function Category() {
    return (
        <div>
            <br/>
            <h2>Valitse kategoria</h2>
            <select class= "custom-select custom-select-lg mb-3">
                <option value="1">Rokotteet</option>
                <option value="2">Työvälineet</option>
                <option value="3">Muut</option>
            </select>
            <br/>

        </div>
    );
}