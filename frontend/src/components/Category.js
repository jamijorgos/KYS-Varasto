import React, { useEffect, useState, memo } from 'react';

function Category(props) {
    var kategoria = props.kategoria;
    const [fetchedData, setfetchedData] = useState([]);
    //Tänne joku tapa hakea kaikki kategoriat

    useEffect(()=> {//Hooksin lifecycle metodi joka ajetaan sen jälkeen kun DOM-puu on luotu
        fetchData();
    },[])//Estetään jatkuva haku, ainoastaan tilanmuutoksen yhteydessä

    async function fetchData() {
        let response = await fetch("http://localhost:5000/categories");//kutsu jolla saadaan kategoriat palvelimelta
        let data = await response.json();
        //console.log("kategoriat:")
        //console.log(data);
        setfetchedData(data);
    }

    function CategoriesList(data) {//Täyttää alasvetolaatikon
        if (data.length > 0){
            const listItems = data.map((kategoria) =>
                <option value = {kategoria}>{kategoria}</option>
            );
            return (
                <select class= "custom-select custom-select-lg mb-3" onChange = {e => props.valitseKategoria(e.target.value)}>
                <option value="Valitse kategoria">Valitse kategoria</option>
                {listItems}
                </select>
            );
        }
    }

    return (
        <div>
            <br/>
            {CategoriesList(fetchedData)}

        </div>
    );
}
export default Category;