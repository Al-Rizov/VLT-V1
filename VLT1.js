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
let test = '';


//This function rolls for a number from 0 to (words.length - 1) and then stores each
//number in the outputOrder array. This array is used for setting the order in which wordCycler() 
//will show words from the list.

function wordOrderRandomizer() {
    
    let numbersInList = [];
    
    for(i=0; i<words.length; i++) {
        
        let newNumber = Math.floor(Math.random()*words.length);
        if (newNumber != numbersInList.find(element => element === newNumber)) {
            numbersInList.push(newNumber);
            
            } else {
            i--;
            }
    }

    outputOrder = numbersInList;

    for(i=0; i<words.length; i++) {
        readyList.push(words[outputOrder[i]]);
        } 
    
};

//This function cycles through the words-array in a random order. 

function wordCycler() {
        
    if(readyList.length != 0) {
        document.getElementById("paragraph").innerHTML = readyList[0];
        document.getElementById("button").innerHTML = "Next word.";
        wordHistory.push(readyList[0]);
        readyList.shift();
    
    } else if (wordHistory.length === words.length){
        document.getElementById("paragraph").innerHTML = "Game over.";
        document.getElementById("button").innerHTML = "Start again?";
        wordHistory = [];
        
    } else {
        document.getElementById("button").innerHTML = "Click on Me!";
        document.getElementById("paragraph").innerHTML = "Paragraph.";
        wordOrderRandomizer();
    }
    
};

//This function cycles through the words the User has already seen.

function historyCycler() {
    
    if(readyList.length < words.length && wordHistory.length != 0){
        readyList.unshift(wordHistory.pop());
    }
    if (wordHistory.length != 0) {
        document.getElementById("paragraph").innerHTML = wordHistory[(wordHistory.length-1)];
    } else {
        document.getElementById("paragraph").innerHTML = "No more previous words left."
    }
};

/*function needs to:
    -Save insertions into their arrays, so that they stay there.
*/
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
document.getElementById("submit").addEventListener("click", newWordInsertion);
document.getElementById("button").addEventListener("click", wordCycler);
document.getElementById("rewindButton").addEventListener("click", historyCycler);

