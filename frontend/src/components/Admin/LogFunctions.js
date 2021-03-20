export const itemAdded = (props) => {
    const action = "item added";
    saveLog(action, props.name); //props.name tilalle formatoitu viesti tapahtuman sisällöstä
}

export const itemDeleted = (props) => {
    const action = "item deleted";
    saveLog(action, props.name);
}

export const itemEdited = (props) => {
    const action = "item edited";
    saveLog(action, props.name);
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
                alert('Lol jotain meni vikaan')
            }
        })
}
/*export const amountChanged = (props) => {
    const action = "amount changed";
    saveLog(action, props);
}*/