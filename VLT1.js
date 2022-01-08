let words = ['a','b','c','d','e'];
let definitions = ['a','b','c','d','e'];
let usedWords = '';
let output = '';

//Currently this function just cycles through each letter combination and
//displays it in order. It should cycle through randomly.

function wordRandomizer() {
    
    let usedNumbers = [];
    
    for(i=0; i<words.length; i++) {
        
        let newNumber = Math.floor(Math.random()*words.length);
        if (newNumber === usedNumbers.find(element => element === newNumber)) {
            i--
            document.write('roll again <br>');
        } else {
            usedNumbers.push(newNumber);
            document.write(newNumber+'<br>');
        }
    
    }
};

function wordCycler() {    
    
    for(i=0; i<words.length; i++) {
        document.write(`${words[i]} is ${definitions[i]} <br>`);
        }    
};


//wordRandomizer();
//wordCycler();

function test() {
    let usedNumbers = [];

    for(i=0; i<words.length; i++) {
        let newNumber = Math.floor(Math.random()*words.length);
    if (newNumber === usedNumbers.find(element => element === newNumber)) {
        document.write('roll again <br>');
    } else {
        usedNumbers.push(newNumber);
        document.write(newNumber+'<br>');
    }
}
}

wordRandomizer();

