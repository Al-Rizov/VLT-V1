let words = ['a','b','c','d','e'];
let definitions = ['a','b','c','d','e'];
let usedWords = '';
let output = '';

//Currently this function rolls for a number from 0 to (words.length - 1) and then stores each
//number in an array. Function then rolls again and checks if rolled number is already in array
//in which case it prints 'roll again', otherwise it prints the number.
//Printing was done just to check if function worked, function should just store numbers in an array
//so it can then be used as index-order for the words list.

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

//This function cycles words. It should be used together with wordRandomizer() to give words to
//the User in random order.

function wordCycler() {    
    
    for(i=0; i<words.length; i++) {
        document.write(`${words[i]} is ${definitions[i]} <br>`);
        }    
};


wordRandomizer();

