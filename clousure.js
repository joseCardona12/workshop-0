
// Identification - Example one

const numbers = [1,2,3]; // <--- Crear un array con 3 valores.
const showArray = (array) =>{ // <-- Create a function. Requiere a parameter 
    let limit = 0; // <-- initialize a variable with value Cero.
    return { // <-- at the moment of call the function, this return the code encapsuled here
        next: function(){ // <-- Method that return depending of the conditions
            return limit < array.length // <-- Condition. Return limit while the lenght array is less than limit
            ? {value: array[limit++], done: "false"} // <-- The object contain two property value and done. Value contain a counter
            : {done: "true"} // <-- show When finish limit is upper that lenght array.
        }
    };
};

// The function next has access to variable of global scope 
const arrayShow = showArray(numbers); // <-- Instantiate the function "showArray" and send the parameter "numbers"
console.log(arrayShow.next()); // function call - The property value change every time the function is called
console.log(arrayShow.next()); 
console.log(arrayShow.next());
console.log(arrayShow.next());


const word = ["h", "o", "l", "a"]
const showLetter = (array) =>{ // <-- Function for show letter
    let countLetter = 0;

    return function(){ 
        return countLetter < array.length // <---- Condition for change the index of array
        ? {letter: array[countLetter++]}
        : {letter: "finish"} // <-- Show when finish condition
    }
}

const counterLetterWord = showLetter(word);
console.log(counterLetterWord());
console.log(counterLetterWord());
console.log(counterLetterWord());
console.log(counterLetterWord());

// Correction
const plus = (a, b) =>{
    return a + b
}

const substract = (a, b) =>{
    return a - b
}
const multiply = (a, b) =>{
    return a * b
}

// For other option. We can use a function first and create fuctions inside this 
const operators = (a,b) =>{
    return {
        plusValues: function(){
            return a + b;
        },
        subtractValues: function(){
            return a - b; 
        },
        multiplyValues: function(){
            return a * b;
        },
        getValues: function(){
            return [a,b]
        },
        setValues: function(newValue, newValueSecond){
            a = newValue,
            b = newValueSecond;
        }
    }
}

const myOperators = operators(4,6);
console.log(myOperators.plusValues());
console.log(myOperators.subtractValues());
console.log(myOperators.multiplyValues());
console.log(myOperators.getValues());
myOperators.setValues(9,2);
console.log(myOperators.getValues());

// Creation

const states = [true, false, true, false, true,false]
const checkState = (stateArray) =>{
    let count = 0;
    return function(){
        return {state: stateArray[count++]} // The state change one by one
    }
}
console.log("Verify state of a array");
const stateCheck = checkState(states);
console.log(stateCheck());
console.log(stateCheck());
console.log(stateCheck());
console.log(stateCheck());
