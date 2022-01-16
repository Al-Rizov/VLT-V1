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
let newWord = document.getElementById("wordEntry");
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
    1.Insert a word AND its definition in their respected variables
    2.Check if both values are given by User and warn him, if there's one missing
    3.Check if a word is already present and if so, inform User
    4.Remove value from the text and textarea elements
*/
function newWordInsertion() {
    let something = document.getElementById("testWord").value;
    test += something;
}


wordOrderRandomizer();
document.getElementById("submit").addEventListener("click", newWordInsertion);
document.getElementById("button").addEventListener("click", wordCycler);
document.getElementById("rewindButton").addEventListener("click", historyCycler);

