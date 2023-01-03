let words = ['a',
            'b',
            'c',
            'd'];
let definitions = ['a',
                'b',
                'c',
                'd'];
let readyList = [];
let definitionsList = [];
let counter = -1;


const nextButton = document.getElementById("nextButton");
const previousButton = document.getElementById("previousButton");
const wordSpace =document.getElementById("paragraph");



function wordOrderRandomizer() {
    
    let outputOrder = [];
    
    for(i=0; i<words.length; i++) {
        
        let newNumber = Math.floor(Math.random()*words.length);
        
        if (newNumber != outputOrder.find(element => element === newNumber)) {
            outputOrder.push(newNumber);
            readyList.push(words[newNumber]);
            definitionsList.push(definitions[newNumber]);
            
            } else { i--; }
    }
    
    console.log(readyList + ' and ' + definitionsList);
};

function displayWord() {
    if(counter === -1) {
        wordSpace.innerHTML = 'No more words in history pile.';
    } 
        else if(counter === words.length) {
            wordSpace.innerHTML = 'Game Over';
        }
        else{
            wordSpace.innerHTML = `'${readyList[counter]}' means: ${definitionsList[counter]}.`;
        }
}

function nextWord() {

    if(counter != words.length) {
        counter++;
    }
    
    displayWord();
};

function previousWord() {
    
    if(counter != -1) {
        counter--;
    }

    displayWord();
}
 


/*
Create a:

- semi-permanent list with indexedDB.

- input field for adding new words+definitions in list.

- delete-from-list function.

- show-definition function.

- check if word/spelling is correct function.

- list of learned words.

*/

wordOrderRandomizer();
//document.getElementById("submit").addEventListener("click", newWordInsertion);
nextButton.addEventListener("click", nextWord);
previousButton.addEventListener("click", previousWord);

