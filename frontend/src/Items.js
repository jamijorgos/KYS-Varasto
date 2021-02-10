import React, { useState } from 'react';

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
        if(data==="Ei löydy"){
            return (
                <select disabled>
                    <option>Tyhjä</option>
                </select>
            );
        }
        else if (data.length > 0){
            const listItems = data.map((asiakas) =>
                <option value = {data.id}>data.nimi</option>
            );
            return (
                <select>{listItems}</select>
            );
        }
    }

    return (
        <div>
            <button onClick={() => fetchData()}>Hae</button>
            <br/>
            {ItemList}
        </div>

    )
}
export default Items;