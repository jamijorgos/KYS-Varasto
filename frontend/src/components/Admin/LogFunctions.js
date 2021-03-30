export const itemAdded = (props) => {
    const action = "item added";
    const message = `nimi: ${props.name} määrä: ${props.amount} paikka: ${props.location} kategoria: ${props.category}`
    saveLog(action, message); 
}

export const itemDeleted = (props) => {
    const action = "item deleted";
    const message = `nimi: ${props.name} määrä: ${props.amount} paikka: ${props.location} kategoria: ${props.category}`
    saveLog(action, message);
}

export const itemEdited = (oldData, newData) => {
    console.log(oldData);
    const action = "item edited";
    let message;
    if(oldData.name != newData.name){
        message = `name changed: ${oldData.name} > ${newData.name}`
    }
    //const message = `nimi: ${props.name} määrä: ${props.amount} paikka: ${props.location} kategoria: ${props.category}`
    saveLog(action, message);
}

export async function getOldData(id){
    let response = await fetch(`http://localhost:5000/${id}`);
    let oldData = await response.json();
    return oldData;
}

const saveLog = (action, props) => {
    const logData = {
        action: action, info: props
    }
    fetch('http://localhost:5000/logs', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(logData)
        }).then(r => r.json()).then(res => {
            if(res && !res.message){
                alert('Loki lisäys onnistui!')
            } else {
                alert('Lokia ei tallennettu')
            }
        })
}
/*export const amountChanged = (props) => {
    const action = "amount changed";
    saveLog(action, props);
}*/