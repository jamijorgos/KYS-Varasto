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
        //console.log(fetchedItemData);
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
            <div class="container bg-info">
                <div class = "row">
                    <div class = "col-sm-6" style = {{maxheight: 100}}>
                        <img src = {fetchedItemData.image} class="img-fluid" alt="tavaran kuva" style = {{paddingTop:15}}></img>
                    </div>
                    <div class = "col-sm-6" id="resultBox">
                        <p class = "resultText">Nimi: {fetchedItemData.name}</p>
                        <p class = "resultText">Kategoria: {fetchedItemData.category}</p>
                        <p class = "resultText">Hyllypaikka: {fetchedItemData.location}</p>
                        <p class = "resultText">Määrä varastossa: {fetchedItemData.amount}</p>
                        <button type="button" class="btn btn-light mr-2" id = "saldo" onClick = {incrAmount}><b>+</b></button>
                        <button type="button" class="btn btn-light mr-2" id = "saldo" onClick = {decrAmount}><b>-</b></button>
                        <br/>
                    </div>
                </div>
            </div>

        </form>

    )

}

export default Result;