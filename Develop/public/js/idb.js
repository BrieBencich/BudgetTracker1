
// giving indexDb different options for web browsers
const indexedDB = 
    window.indexedDB ||
    window.mozIndexedDB ||
    window.webkitIndexedDB ||
    window.msInddexedDB ||
    window.shimIndexedDB; 

    let db; 
    const request = indexedDB.open("Budget-Tracker", 1); 

    request.onupgradeneeded = ({ targt }) => { 
        let db = target.result; 
        db.createObjectStore("pending", { autoIncrement: true })
    }; 
// request that the db is target 
    request.onsuccess = ({ target }) => { 
        db = target.result; 
// app is running before coming from db 
        if (navigator.onLine) { 
            checkDatabase();
        }
    }; 

    // allow error to happen if it is not running 
    request.onerror = function(event) { 
        console.log(" ERROR " + event.target.errorCode);
    }; 
    
    function saveRecord(record) { 
        const transaction = db.tranaction(["pending"], )
    }

