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


//Currently this function rolls for a number from 0 to (words.length - 1) and then stores each
//number in an array. This array is used for setting the order in which wordCycler() shows words.

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

//This function cycles words. It should be used together with wordRandomizer() to give words to
//the User in a random order.

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

wordOrderRandomizer();
document.getElementById("button").addEventListener("click", wordCycler);

