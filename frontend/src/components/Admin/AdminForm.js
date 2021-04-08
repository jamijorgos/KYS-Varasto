import React, { useState, useEffect } from 'react'
import Resizer from 'react-image-file-resizer';
import * as LogFunctions from './LogFunctions';
import { LOCATIONS } from '../ShelfLocation';

const AdminForm = ({setMapLocation}) => {
    const [fetchedData, setfetchedData] = useState([]); //Säilöö kaikki tavarat
    const [currentID, setCurrentID] = useState(0); 
    const [itemData, setItemData] = useState({
        name: '', amount: '', location: '', category: '', image: '', number: ''
    })

    useEffect(()=> {
        fetchData();
    },[])
    useEffect(() => { 
        if(currentID != 0)
            setItemData(fetchedData.find((item) => (currentID === item._id)));
    }, [currentID])
    useEffect(() => {
        setMapLocation(itemData.location)
        setLocationSelectValue(itemData.location)
    }, [itemData.location])

    // Kaikki tavarat serveriltä
    const fetchData = async () => {
        let response = await fetch("http://localhost:5000/");
        let data = await response.json();
        setfetchedData(data);
    }
    // Luodaan select ja tavara optionit
    const ItemList = (data) => {

        if (data.length > 0){
            const listItems = data.map((tavara) =>
                <option key={tavara._id} value = {tavara._id}>{tavara.name}</option>
            );
            return (
                <select className= "custom-select custom-select-lg mb-2" onChange = {e => setCurrentID(e.target.value)}>
                    {listItems}
                </select>
            );
        }
    }
    // Hyllynumeroiden selectin luonti
    const locationSelect = () => {
        const hyllynumerot = LOCATIONS.map((location) =>
            <option key={location.nro} value={location.nro}>{location.nro}</option>
        )
        return (
            <select id="location-select" className="custom-select m-0" onChange={(e) => setItemData({ ...itemData, location: e.target.value})}>
                {hyllynumerot}
            </select>
        );
    }
    // Selectin arvon asetus
    const setLocationSelectValue = (n) => {
        document.getElementById("location-select").value = n;
    }
    // Uuden tavaran lisäys, tavaroiden muokkaus
    const handleSubmit = (e) => {
        e.preventDefault();
        if(currentID === 0){
            fetch('http://localhost:5000/', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(itemData)
            }).then(r => r.json()).then(res => {
                if(res && !res.message){
                    alert('Tavaran lisäys onnistui!')
                    LogFunctions.itemAdded(itemData);
                } else {
                    alert('Tavaran lisäys EPÄonnistui!')
                }
            })
        } else {
            let oldData;
            fetch(`http://localhost:5000/${currentID}`, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            }).then(r => r.json()).then(res => {
                oldData = res;
            }).then(
                fetch(`http://localhost:5000/${currentID}`, {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(itemData)
                }).then(r => r.json()).then(res => {
                    if(res && !res.message){
                        alert('Tavaran muokkaus onnistui!')
                        LogFunctions.itemEdited(oldData, itemData);
                    } else {
                        alert('Tavaran muokkaus EPÄonnistui!')
                    }
                })
            )
        }
    }
    // Tuotteen poisto
    const deleteClick = () => {
        if(currentID != 0){
            fetch(`http://localhost:5000/${currentID}`, {
                method: 'DELETE'
            }).then(r => r.json()).then(res => {
                if(res){
                    alert(res.message);
                    LogFunctions.itemDeleted(itemData)
                    clear();
                }
            })
        } else {
            alert('Tuotetta ei valittu')
        }
    }
    // Muuttaa valitun kuvan kokoa pienemmäksi, parsii base64 stringiksi
    const fileChangedHandler = (e) => {
        var fileInput = false
        if(e.target.files[0]) {
            fileInput = true
        }
        if(fileInput) {
            try {
                Resizer.imageFileResizer(
                e.target.files[0],
                150,
                150,
                'JPEG',
                100,
                0,
                uri => {
                    setItemData({ ...itemData, image: uri})
                },
                'base64',
                150,
                150,
                );
            }   catch(err) {
                    console.log(err)
            }
        }
    }
    // Tyhjentää kentät
    const clear = (e) => {
        setCurrentID(0);
        setItemData({
            name: '', amount: '', location: '', category: '', image: '', number: ''
        })
    }

    return (
        <form id="admin-form" autoComplete="off" noValidate onSubmit={handleSubmit}>
            {ItemList(fetchedData)}
            <h3>{currentID === 0 ? 'Lisää tavara' : 'Muokkaa tietoja'}</h3>
            <label htmlFor="name-input" className="m-0 small">Nimi</label>
            <div className="input-group">
                <input type="text" className="form-control m-0" id="name-input" value={itemData.name} onChange={(e) => setItemData({ ...itemData, name: e.target.value})}></input>
            </div>
            <label htmlFor="nro-input" className="m-0 small">Tuotenumero</label>
            <div className="input-group">
                <input type="text" className="form-control m-0" id="nro-input" value={itemData.number} onChange={(e) => setItemData({ ...itemData, number: e.target.value})}></input>
            </div>
            <label htmlFor="amount-input" className="m-0 small">Määrä varastossa</label>
            <div className="input-group">
                <input type="text" className="form-control m-0" id="amount-input" value={itemData.amount} onChange={(e) => setItemData({ ...itemData, amount: e.target.value})}></input>
            </div>
            <label htmlFor="location-select" className="m-0 small">Hyllypaikka</label>
            <div className="input-group">
                {locationSelect()}
            </div>
            <label htmlFor="category-input" className="m-0 small">Kategoria</label>
            <div className="input-group">
                <input type="text" className="form-control m-0" id="category-input" value={itemData.category} onChange={(e) => setItemData({ ...itemData, category: e.target.value})}></input>
            </div>
            <label htmlFor="file-select" className="m-0 small">Kuva</label>
            <div className="input-group">
                <input type="file" className="file" data-browse-on-zone-click="true" id="file-select" onChange={fileChangedHandler}/>
            </div>
            <img src={itemData.image} ></img>
            <button className="btn btn-primary" type="submit">Tallenna</button>
            <div className="d-flex flex-row">
                <button className="button2 btn btn-danger" type="button" onClick={deleteClick}>Poista</button>
                <button className="button2 btn btn-secondary" type="button" onClick={clear}>Tyhjennä</button>
            </div>
        </form>
    )
}

export default AdminForm
