let words = ['a',
            'b',
            'c',
            'd'];
let definitions = ['a',
                'b',
                'c',
                'd'];
let outputOrder = [];
let readyList = [];
let wordHistory = [];
let counter = 0;

const button = document.getElementById("button");
const rewindButton = document.getElementById("rewindButton");
const wordSpace =document.getElementById("paragraph");



function wordOrderRandomizer() {
    
    outputOrder = [];
    
    for(i=0; i<words.length; i++) {
        
        let newNumber = Math.floor(Math.random()*words.length);
        
        if (newNumber != outputOrder.find(element => element === newNumber)) {
            outputOrder.push(newNumber);
            readyList.push(words[newNumber]);
            
            } else { i--; }
    }
    
};
 

function wordCycler() {
        
    if(readyList.length != 0) {
        wordSpace.innerHTML = readyList[0];
        button.innerHTML = "Next word.";
        wordHistory.push(readyList[0]);
        readyList.shift();
        console.log('READY: ' + readyList);
        console.log('HISTORY: ' + wordHistory);
        console.log();
        
    
    } else if (wordHistory.length === outputOrder.length){
        wordSpace.innerHTML = "Game over.";
        button.innerHTML = "Start again?";
        outputOrder = [];
        
        
    } else {
        button.innerHTML = "Click on Me!";
        wordSpace.innerHTML = "Paragraph.";
        wordHistory = [];
        wordOrderRandomizer();
    }
    
};

//This function cycles through the words the User has already seen.

function historyCycler() {
    
     
    if (wordHistory.length > 1) {
        readyList.unshift(wordHistory.pop());
        wordSpace.innerHTML = wordHistory[(wordHistory.length-1)];
        

        console.log('READY: ' + readyList);
        console.log('HISTORY: ' + wordHistory);
        console.log();
    } else if(wordHistory.length === 1) {
        readyList.unshift(wordHistory.pop());
        wordSpace.innerHTML = "No more previous words left.";
        console.log('READY: ' + readyList);
        console.log('HISTORY: ' + wordHistory);
        console.log();
    }
    else {
        wordSpace.innerHTML = "No more previous words left.";
    }
};


//-Save insertions into their arrays, so that they stay there.

function newWordInsertion() {
    const newWord = document.getElementById("newWord").value;
    const newWordDefinition = document.getElementById("wordDefinition").value;
    const wordDouble = words.find(element => element === newWord);
    
    if(newWord === "") {
        alert("Sorry, but it looks like the 'New Word'-field is empty. Please enter a word to be saved.")
        
    } else if (newWord === wordDouble) {
        alert("It would seem that this word is already in your list. Please enter a different word and try again.")
    } else if (newWordDefinition === "") {
        alert("Please add a definition to go with that awesome new word you've found.");
    } else {
        words.push(newWord);
        definitions.push(newWordDefinition);
        document.getElementById("newWord").value = "";
        document.getElementById("wordDefinition").value = "";
    }
    
}


wordOrderRandomizer();
//document.getElementById("submit").addEventListener("click", newWordInsertion);
button.addEventListener("click", wordCycler);
rewindButton.addEventListener("click", historyCycler);

