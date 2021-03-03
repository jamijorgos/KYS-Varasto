import { CropSquareRounded } from '@material-ui/icons';
import React, { useState } from 'react'
import Resizer from 'react-image-file-resizer';

const AdminForm = () => {
    const [itemData, setItemData] = useState({
        name: '', amount: '', location: '', category: '', image: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(itemData);
        fetch('http://localhost:5000/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(itemData)
        }).then(r => r.json()).then(res => {
            if(res)
                alert('Tavaran lisäys onnistui!')
        })
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
                200,
                200,
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

    return (
        <form id="admin-form" noValidate onSubmit={handleSubmit}>
            <h3>Lisää tavara</h3>
            <input type="text" placeholder="name" onChange={(e) => setItemData({ ...itemData, name: e.target.value})}></input>
            <input type="text" placeholder="amount" onChange={(e) => setItemData({ ...itemData, amount: e.target.value})}></input>
            <input type="text" placeholder="location" onChange={(e) => setItemData({ ...itemData, location: e.target.value})}></input>
            <input type="text" placeholder="category" onChange={(e) => setItemData({ ...itemData, category: e.target.value})}></input>
            <input type="file" onChange={fileChangedHandler}/>
            <button className="btn btn-primary" type="submit">Tallenna</button>
        </form>
    )
}

export default AdminForm
