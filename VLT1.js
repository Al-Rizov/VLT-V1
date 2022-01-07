let words = ['a','b','c','d','e'];
let definitions = ['a','b','c','d','e'];
let output = '';

//Currently this function just cycles through each letter combination and
//displays it in order. It should cycle through randomly.
function wordCycler() {
    
    for(i=0; i<words.length; i++) {
        output += words[i] + ' is ' + definitions[i] + '<br>';
        }
    
};

wordCycler();
document.write(output);

