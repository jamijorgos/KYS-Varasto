import React, { useEffect, useState, memo } from 'react';
import Result from './Result.js';
import Category from './Category.js';

function Items(props) {

    const [fetchedData, setfetchedData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState([]);
    //const [selectedItem, setselectedItem] = useState(props.props.selectedItem);

    
    console.log("Selected cat.");
    console.log(selectedCategory);

    useEffect(()=> {//Hooksin lifecycle metodi joka ajetaan sen jälkeen kun DOM-puu on luotu
        fetchData();
    },[])//Estetään jatkuva haku, ainoastaan tilanmuutoksen yhteydessä

    async function fetchData() {
        //let response;
        if(selectedCategory.length==0 || selectedCategory=="Valitse kategoria"){//Jos ei ole valittu mitään, haetaan kaikki
            let response = await fetch("http://localhost:5000/");//kutsu jolla saadaan tiedot palvelimelta
            let data = await response.json();
            //console.log("dataa:");
            //console.log(data);
            setfetchedData(data);
        }
        else{
            let response = await fetch(`http://localhost:5000/category/${selectedCategory}`);//Muuten tehdään haku kategorian perusteella
            let data = await response.json();
            console.log("dataa:");
            console.log(data);
            setfetchedData(data);
        }
    }

    function ItemList(data) {//Täyttää alasvetolaatikon
        //console.log("Data: ");
        //console.log(data);
        
        if (data.length > 0){
            const listItems = data.map((tavara) =>
                <option value = {tavara._id}>{tavara.name}</option>
            );
            return (
                <select class= "custom-select custom-select-lg mb-3" onChange = {e => props.setSelectedItem(e.target.value)}>
                    <option value = {""}>Valitse tavara</option>
                    {listItems}
                </select>
            );
        }
    }
    //Täällä palautetaan se täydennetty alasvetolaatikko
    //console.log("selectedItem: " + selectedItem);

    return (
        <div class= "sidebarContent">
            <Category kategoria = {selectedCategory} valitseKategoria = {setSelectedCategory}/>
            {ItemList(fetchedData)}
            <br/>
            <Result tavaraId = {props.selectedItem} setMapLocation={props.setMapLocation}/>
        </div>

    )
}
export default Items;