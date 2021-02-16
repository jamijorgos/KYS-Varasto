import React, { useEffect, useState } from 'react';

function Result(props) {

    var tavaraId = props.tavaraId;
    //Jotenkin tuolta propseista pitäisi saada se tavaraId.
    console.log(props[0]);
    console.log("tavaraID: "+ tavaraId);

    const [fetchedItemData, setfetchedItemData] = useState([]);

    useEffect(()=> {//Hooksin lifecycle metodi joka ajetaan sen jälkeen kun DOM-puu on luotu
        fetchItemData();
    },[])//Estetään jatkuva haku, ainoastaan tilanmuutoksen yhteydessä

    async function fetchItemData() {
        let response = await fetch("http://localhost:5000/"+tavaraId);//Tänne oikeanlainen kutsu jolla saadaan tiedot palvelimelta
        let data = await response.json();
        console.log("Resultissa haettu data: ")
        console.log(data);
        setfetchedItemData(data);
    }

    return (
        <form>
            <br/>
            <div class="container bg-info">
                <div class = "row">
                    <div class = "col">
                        <img src = "logo.svg"></img>
                    </div>
                    <div class = "col">
                        <p>Nimi: </p>
                    </div>
                    <div class = "col">
                        <p>Kategoria: </p>
                    </div>
                </div>
                <div class = "row">
                    <div class = "col">

                    </div>
                    <div class = "col">
                        <p>Hyllypaikka: </p>
                    </div>
                    <div class = "col">
                        <p>Määrä varastossa: </p>
                    </div>
                </div>
            </div>

        </form>

    )

}

export default Result;