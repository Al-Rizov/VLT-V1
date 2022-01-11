let words = ['a',
            'b',
            'c',
            'd'];
let definitions = ['a',
                'b',
                'c',
                'd',];
let outputOrder = [];
let readyList = [];


//Currently this function rolls for a number from 0 to (words.length - 1) and then stores each
//number in an array. This array is used for setting the order in which wordCycler() shows words.

function wordRandomizer() {
    
    let usedNumbers = [];
    
    for(i=0; i<words.length; i++) {
        
        let newNumber = Math.floor(Math.random()*words.length);
        if (newNumber != usedNumbers.find(element => element === newNumber)) {
            usedNumbers.push(newNumber);
            
            } else {
            i--;
            }
    }

    outputOrder = usedNumbers;
    
};

//This function cycles words. It should be used together with wordRandomizer() to give words to
//the User in a random order.

function wordCycler() {
        
    wordRandomizer();
    for(i=0; i<words.length; i++) {
        readyList += `${words[outputOrder[i]]} is ${definitions[outputOrder[i]]} <br>`;
        } 
    document.getElementById("paragraph").innerHTML = readyList;
    readyList = [];
};


document.getElementById("button").addEventListener("click", wordCycler);

