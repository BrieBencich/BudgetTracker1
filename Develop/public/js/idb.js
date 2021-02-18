
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
        const transaction = db.tranaction(["pending"], "readwrite"); 
        const store = transaction.objectStore("pending");

        store.add(record); 
    }


    function checkDatabase() { 
        const transaction = db.transaction(["pending"], "readwrite"); 
        const store = transaction.objectStore("pending"); 
        const getAll = store.getAll();

        getAll.onsuccess = function() { 
            if (getAll.result.length > 0 ) { 
                fetch("/api/transaction/bulk", { 
                    method: "POST",
                    body: JSON.stringify(getAll.result), 
                    headers: { 
                        Accept: "application/json, text/plain, */*", 
                    "Content-Type": "application/json"
                    }
                })
                .then(response => { 
                    return response.json(); 
                })
                .then(() => { 
                    const transaction = db.transaction(["pending"], "readwrite"); 
                    const store = transaction.objectStore("pending");
                    store.clear();
                });
            }
        };

    }


window.addEventListener("online", checkDatabase); 

