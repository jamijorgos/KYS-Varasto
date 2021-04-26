//AdminFormin handleSubmit()
export const itemAdded = (props) => {
    const action = "item added";
    const message = `tuotenumero: ${props.number} || nimi: ${props.name} || määrä: ${props.amount} || paikka: ${props.location} ||  kategoria: ${props.category}`
    saveLog(action, message); 
}
//AdminFormin deleteClick()
export const itemDeleted = (props) => {
    const action = "item deleted";
    const message = `tuotenumero: ${props.number} || nimi: ${props.name} || määrä: ${props.amount} || paikka: ${props.location} ||  kategoria: ${props.category}`
    saveLog(action, message);
}
//AdminFormin handleSubmit() ja mahdollisesti saldon muutokset
export const itemEdited = (oldData, newData) => {
    const action = `Item '${oldData.name}' edited`;

    let message = '';
    if(oldData.name != newData.name){
        message += `|| name changed: ${oldData.name} > ${newData.name}`
    }
    if(oldData.amount != newData.amount){
        message += ` || amount changed: ${oldData.amount} > ${newData.amount}`
    }
    if(oldData.location != newData.location){
        message += ` || location changed: ${oldData.location} > ${newData.location}`
    }
    if(oldData.category != newData.category){
        message += ` || category changed: ${oldData.category} > ${newData.category}`
    }
    if(oldData.number != newData.number){
        if(newData.number.length == 0){
            message += ` || product number removed`
        } else {
            message += ` || product number changed: ${oldData.number} > ${newData.number}`
        }
    }
    if(oldData.image != newData.image){
        message += ` || image changed ||`
    }
    saveLog(action, message);
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