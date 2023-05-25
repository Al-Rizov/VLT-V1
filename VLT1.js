
let readyList = [];
let definitionsList = [];
let markedForRemoval=[];
let counter = -1;
let secondCounter = 0;


const nextButton = document.getElementById("nextButton");
const previousButton = document.getElementById("previousButton");
const interface = document.getElementsByClassName("interface");
const wordSpace =document.getElementById("wordSpace");
const defSpace = document.getElementById("defSpace");
const wordInsertion = document.getElementsByClassName("wordInsert");
const beginButton = document.getElementById("beginButton");
const spellingButton = document.getElementById("testSpellingButton");
const insertButton = document.getElementById("wordInsertButton");
const wordsList = document.getElementById("wordsList");
const showListButton = document.getElementById("showListButton");
const removeWordButton = document.getElementById("removeWordButton");
const reviewButton = document.getElementById("reviewButton");
const cover = document.getElementById("cover");
const spellcheck = document.getElementById("spellcheck");
const secondDefSpace = document.getElementById("secondDefSpace");
const restartButton = document.getElementById('restartButton');


showListButton.addEventListener('click', function(){
    showTarget(listBox);
    fillOutList();
});

wordsList.addEventListener('click', (ev)=>{
let li = ev.target.closest('[data-key]');
let id = li.getAttribute('data-key');
let item = markedForRemoval.indexOf(id);
console.log(li, id);

markedForRemoval.includes(id) ? markedForRemoval.splice(item, 1) : markedForRemoval.push(id);

li.classList.toggle('marked');
})

nextButton.addEventListener("click", nextWord);

spellingButton.addEventListener('click', ()=>showTarget(interface[1]));

previousButton.addEventListener("click", previousWord);

restartButton.addEventListener("click", restart);

beginButton.addEventListener("click", () => showTarget(interface[0]));

insertButton.addEventListener("click",() => {if(confirm('Warning! All exercises will be restarted. Continue anyway?')){
                                            restart();
                                            showTarget(wordInsertion[0]);}
                                            });

cover.addEventListener("click", () => {cover.classList.add('inactive')});

defSpace.addEventListener("click", () => {cover.classList.remove('inactive')});

removeWordButton.addEventListener("click", function(){
    markedForRemoval.forEach(el => removeWord(el))
    markedForRemoval = [];
    wordsList.innerText = '';
    
    getVocabularyList();

    setTimeout(fillOutList, 500);
    
});

reviewButton.addEventListener('click', spellThis)



function wordOrderRandomizer() {
    
    let outputOrder = [];
    readyList = [];
    definitionsList = [];

    for(i=0; i<words.length; i++) {
        
        let newNumber = Math.floor(Math.random()*words.length);
        
        if (newNumber != outputOrder.find(element => element === newNumber)) {
            outputOrder.push(newNumber);
            readyList.push(words[newNumber]);
            definitionsList.push(definitions[newNumber]);
            
            } else { i--; }
    }
    
    
};

function displayWord() {
    if(counter === -1) {
        wordSpace.innerHTML = '';
        defSpace.innerHTML = '';
    } 
        else if(counter === words.length) {
            defSpace.innerHTML = 'Click the reset button to try again!';
            wordSpace.classList.add('inactive');
            cover.classList.add('inactive');
            nextButton.classList.add('inactive');
            previousButton.classList.add('inactive');
            restartButton.classList.remove('inactive');
            counter = -1;
        }
        else{
            wordSpace.innerText = readyList[counter];
            defSpace.innerText = definitionsList[counter];
        }
}

function restart() {
    wordOrderRandomizer();

    restartButton.classList.add('inactive');
    nextButton.classList.remove('inactive');
    previousButton.classList.remove('inactive');
    cover.classList.add('inactive');
    wordSpace.innerText = '';
    wordSpace.classList.add('inactive');
    defSpace.innerText = "You will be shown a word from your list in the space above." +
                        " The definition will be shown here, but covered, so that you" +
                        " can try and remember the definition yourself. You can remove" +
                        " the cover by clicking on it.";

    reviewButton.innerText = 'Start';
    secondDefSpace.innerText = 'Press the \'Start\' button to begin.';
    counter = -1;
    secondCounter = 0;

    spellcheck.classList.add('inactive');
}

function nextWord() {

    if(readyList.length===0) {wordOrderRandomizer();};
    if(counter != words.length) {counter++;};
    
    wordSpace.classList.remove('inactive');
    cover.classList.remove('inactive');
    displayWord();
};

function previousWord() {
    
    if(counter != -1) {counter--;};

    displayWord();
}

function fillOutList(){
    if(wordsList.innerHTML === ''){
        for(i=0; i<wordsObjectList.length; i++){
            const item = document.createElement('li');
            item.dataset.key = `${wordsObjectList[i].id}`; //wordsObjectList is declared in IDB.js
            wordsList.appendChild(item);
            item.textContent = words[i];
        }
        restart();
    }
}

function showTarget(target) {
    const targets = [interface[0], interface[1],wordInsertion[0], listBox];

    targets.forEach(targ => {
                if(targ.classList.contains("inactive") && targ === target) {
                    targ.classList.toggle("inactive")
                } else if(!targ.classList.contains("inactive")) {
                    targ.classList.toggle("inactive")
                }
                
                });

}

function spellThis(){
    const word = spellcheck.value;

    if(reviewButton.innerText === 'Start') {
        wordOrderRandomizer();
        reviewButton.innerText = 'Spellcheck word';
        secondDefSpace.innerText = definitionsList[secondCounter];
        spellcheck.classList.remove('inactive');
        return

    } else if(reviewButton.innerText === 'Restart') {
        restart();
        return
    }


    if(word === readyList[secondCounter] && secondCounter != definitionsList.length -1) {
        secondCounter++;
        spellcheck.value = '';
        secondDefSpace.innerText = 'Correct!';
        setTimeout(()=>{secondDefSpace.innerText = definitionsList[secondCounter]}, 800);
        
    } else if(word === readyList[secondCounter] && secondCounter === definitionsList.length -1) {
        spellcheck.value = ''
        secondDefSpace.innerText = 'Correct!';
        setTimeout(()=>{secondDefSpace.innerText = "All done! Would you like to start again?"}, 800);
        reviewButton.innerText = 'Restart'
        spellcheck.classList.add('inactive');

    } else{
        secondDefSpace.innerText = 'False. Please, try again.';
        setTimeout(()=>{secondDefSpace.innerText = definitionsList[secondCounter]}, 800);
        
    }
}