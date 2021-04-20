import React, { useState, useEffect } from 'react'

const Log = () => {
    const [logData, setLogData] = useState([]);

    useEffect(() => { 
        fetchLogData();
    }, []);

    async function fetchLogData() {
        let response = await fetch(`http://localhost:5000/logs/list`);
        let data = await response.json();
        let reverseData = data.reverse();
        setLogData(reverseData);
    }

    const setLogColor = (e) => {
        if(e === "item added"){
            return "log added-log"
        }
        if(e === "item deleted"){
            return "log deleted-log"
        }
        if(e === "item edited"){
            return "log edited-log"
        }
        if(e === "amount changed"){
            //saldon muutokset
        }
    }

    return (
        <div className="log-main">
            <h3>Tapahtumat</h3>
            <div className="log-container">
                {logData.map((log) => (
                    <div className={setLogColor(log.action)}>
                        <p>{log.action}</p>
                        <p>{log.info}</p>
                        <p>{log.createdAt}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Log
