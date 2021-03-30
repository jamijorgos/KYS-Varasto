import React, { useState, useEffect } from 'react'
import Resizer from 'react-image-file-resizer';
import * as LogFunctions from './LogFunctions';

const AdminForm = ({setMapLocation}) => {
    const [fetchedData, setfetchedData] = useState([]); //Säilöö kaikki tavarat
    const [currentID, setCurrentID] = useState(0); 
    const [itemData, setItemData] = useState({
        name: '', amount: '', location: '', category: '', image: ''
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
                <option value = {tavara._id}>{tavara.name}</option>
            );
            return (
                <select class= "custom-select custom-select-lg mb-3" onChange = {e => setCurrentID(e.target.value)}>
                    {listItems}
                </select>
            );
        }
    }
    // Uuden tavaran lisäys, tavaroiden muokkaus
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(itemData);
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
            let oldData = LogFunctions.getOldData(currentID);
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
            name: '', amount: '', location: '', category: '', image: ''
        })
    }

    return (
        <form id="admin-form" autoComplete="off" noValidate onSubmit={handleSubmit}>
            {ItemList(fetchedData)}
            <h3>{currentID === 0 ? 'Lisää tavara' : 'Muokkaa tietoja'}</h3>
            <input type="text" placeholder="name" value={itemData.name} onChange={(e) => setItemData({ ...itemData, name: e.target.value})}></input>
            <input type="text" placeholder="amount" value={itemData.amount} onChange={(e) => setItemData({ ...itemData, amount: e.target.value})}></input>
            <input type="text" placeholder="location" value={itemData.location} onChange={(e) => setItemData({ ...itemData, location: e.target.value})}></input>
            <input type="text" placeholder="category" value={itemData.category} onChange={(e) => setItemData({ ...itemData, category: e.target.value})}></input>
            <input type="file" onChange={fileChangedHandler}/>
            <img src={itemData.image} ></img>
            <button className="btn btn-primary" type="submit">Tallenna</button>
            <div class="d-flex flex-row">
                <button className="button2 btn btn-danger" type="button" onClick={deleteClick}>Poista</button>
                <button className="button2 btn btn-secondary" type="button" onClick={clear}>Tyhjennä</button>
            </div>
        </form>
    )
}

export default AdminForm
