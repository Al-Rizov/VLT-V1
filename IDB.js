const indexedDB = 
window.indexedDB ||
window.mozIndexedDB ||
window.webkitIndexedDB ||
window.msIndexedDB ||
window.shimIndexedDB;

let db = null;
let objectStore = null;
let words = [];
let definitions = [];
let wordsObjectList = [];
const request = indexedDB.open('VocabularyDatabase', 3);

request.onerror = function(event) {
    db = event.target.result;
    console.error(`The following error occurred while trying to run Indexed DB - ${event.target.error}`)
};

request.onupgradeneeded = function(event) {
    db = event.target.result;

    if(!db.objectStoreNames.contains('VocabularyList')){
    objectStore = db.createObjectStore('VocabularyList', {keyPath: 'id', autoIncrement: true});
    objectStore.createIndex('word', 'word', {unique:true});
    }
    


    console.log('Upgraded IDB to version: ' + db.version);
}

request.onsuccess = function(event) {
    db = event.target.result;
    getVocabularyList();
    console.log('Success: IDB version-' + db.version);
};


// Transaction:

const form = document.VocabularyDatabase;

form.addEventListener('submit', (ev)=> {
    ev.preventDefault();
    wordsList.innerHTML = '';
    

    const word = document.getElementById('newWord').value.trim();
    const definition = document.getElementById('wordDefinition').value.trim();
    
    

    if(word === '') {
        return console.log('The "New Word" field is empty.');
    }   else if(definition === '') {   
        return console.log('The "Word Definition" field is empty.');
        };

    let entry = {
        word,
        definition,
    };

    let transaction = db.transaction('VocabularyList', 'readwrite');

    transaction.oncomplete = (ev) =>{
        console.log(ev);
    }
    transaction.onerror = (err) =>{
        console.warn(err);
    }
    
    let store = transaction.objectStore('VocabularyList');
    let newRequest = store.add(entry);

    newRequest.onsuccess = (ev) => {
        console.log('Success!');
    }

    newRequest.onerror = (err) => {
        console.log('Error in request: ' + err)
    }

    console.log(entry);
    document.getElementById('newWord').value = '';
    document.getElementById('wordDefinition').value = '';
    
    getVocabularyList();
});


function getVocabularyList() {
    let transaction = db.transaction('VocabularyList', 'readonly');
    transaction.oncomplete = (ev) => {console.log(ev);};
    transaction.onerror = (err) => {console.warn(err);};
    let requestList = transaction.objectStore('VocabularyList').getAll();
    

    requestList.onsuccess = (ev) => {
        let req = ev.target.result;
        wordsObjectList = requestList.result;
        words = [];
        definitions = [];

        for(i=0; i<req.length; i++){
            words.push(req[i].word);
            definitions.push(req[i].definition);
        }
        
    };

    requestList.onerror = (err) => {console.warn('Nothing happened...');};

    
}

function removeWord(wordIndex) {
    
    let transaction = db.transaction(['VocabularyList'], 'readwrite');
    transaction.oncomplete = (ev) =>{
        console.log(ev);
    }
    transaction.onerror = (err) =>{
        console.warn(err);
    }
    
    
    let store = transaction.objectStore('VocabularyList');
    let newRequest = store.delete(parseInt(wordIndex));

    newRequest.onsuccess = (ev) => {
        console.log('Success!');
    }

    newRequest.onerror = (err) => {
        console.log('Error in request: ' + err)
    }
}
