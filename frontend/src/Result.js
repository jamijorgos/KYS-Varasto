import React, { useEffect, useState } from 'react';

function Result(props) {

    var tavaraId = props.props.tavaraId;
    //Jotenkin tuolta propseista pitäisi saada se tavaraId.

    const [fetchedItemData, setfetchedItemData] = useState([]);

    useEffect(()=> {//Hooksin lifecycle metodi joka ajetaan sen jälkeen kun DOM-puu on luotu
        fetchItemData();
    },[props])//Estetään jatkuva haku, ainoastaan tilanmuutoksen yhteydessä

    async function fetchItemData() {
        let response = await fetch(`http://localhost:5000/${tavaraId}`);//Tänne oikeanlainen kutsu jolla saadaan tiedot palvelimelta
        let data = await response.json();
        console.log("Resultissa haettu data: ");
        console.log(data);
        setfetchedItemData(data);
    }

    return (
        <form>
            <br/>
            <div class="container bg-info">
                <div class = "row">
                    <div class = "col">
                        <img src = {fetchedItemData.image} alt="tavaran kuva"></img>
                    </div>
                    <div class = "col">
                        <p>Nimi: {fetchedItemData.name}</p>
                    </div>
                    <div class = "col">
                        <p>Kategoria: {fetchedItemData.category}</p>
                    </div>
                </div>
                <div class = "row">
                    <div class = "col">

                    </div>
                    <div class = "col">
                        <p>Hyllypaikka: {fetchedItemData.location}</p>
                    </div>
                    <div class = "col">
                        <p>Määrä varastossa: {fetchedItemData.amount}</p>
                        <button type="button" class="btn btn-light">+</button>
                        <button type="button" class="btn btn-light">-</button>
                    </div>
                </div>
            </div>

        </form>

    )

}

export default Result;