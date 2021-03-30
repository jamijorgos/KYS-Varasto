import React, { useEffect, useState } from 'react';

function Result(props) {

    var tavaraId = props.tavaraId;
    //Jotenkin tuolta propseista pitäisi saada se tavaraId.

    const [fetchedItemData, setfetchedItemData] = useState([]);

    useEffect(()=> {//Hooksin lifecycle metodi joka ajetaan sen jälkeen kun DOM-puu on luotu
        fetchItemData();
    },[props])//Estetään jatkuva haku, ainoastaan tilanmuutoksen yhteydessä

    useEffect(() => {
        props.setMapLocation(fetchedItemData.location)
    }, [fetchedItemData])

    useEffect(() => { // Suorittaa liian usein (myös sidebaria avattaessa/sulkiessa)
        console.log(fetchedItemData);
        fetch(`http://localhost:5000/${tavaraId}`, {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(fetchedItemData)
            }).then(r => r.json()).then(res => {
                if(res && !res.message){
                    //alert('Tavaran muokkaus onnistui!')
                } else {
                    //alert('Tavaran muokkaus EPÄonnistui!')
                }
        })
    }, [fetchedItemData]);

    async function fetchItemData() {
        let response = await fetch(`http://localhost:5000/${tavaraId}`);//Tänne oikeanlainen kutsu jolla saadaan tiedot palvelimelta
        let data = await response.json();
        //console.log("Resultissa haettu data: ");
        //console.log(data);
        setfetchedItemData(data);
    }

    const incrAmount = (e) => {//Tavaroiden määrän lisääminen
        e.preventDefault();
        var newAmount = parseInt(fetchedItemData.amount)+1;
        setfetchedItemData({...fetchedItemData, amount: newAmount});
    }

    const decrAmount = (e) => {//Tavaroiden määrän vähentäminen
        e.preventDefault();
        if(fetchedItemData.amount!="0"){
            var newAmount = parseInt(fetchedItemData.amount)-1;
        }
        setfetchedItemData({...fetchedItemData, amount: newAmount});
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
                </div>
                <div class="row">
                <div class = "col">
                        
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
                </div>
                <div class="row">
                    <div class= "col"></div>
                    <div class = "col">
                        <p>Määrä varastossa: {fetchedItemData.amount}</p>
                        <button type="button" class="btn btn-light" onClick = {incrAmount}>+</button>
                        <button type="button" class="btn btn-light" onClick = {decrAmount}>-</button>
                    </div>
                </div>
            </div>

        </form>

    )

}

export default Result;