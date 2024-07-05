/*  
Control de flujo ------->
Es la forma y/o estructura que se usa para orientar el flujo de ejecución del código.

Estructuras de control de Flujo
1. __if, else if, else__ */

const limit = 50;

// Using condition if, else if and else

function conditions(enterValue){
    if(limit < enterValue){
        console.log({message: "The limit is than enterValue"});
    }else if(limit > enterValue){
        console.log({message:"The limit is greater than enterValue"})
    }else{
        console.log({message: "The limit is equal than enterValue"})
    }
    
}

conditions(70);
conditions(40); 
conditions(50);

// 2. Using ternary operator
console.log("Using ternary operator");
const age = 68;
age > 46
?console.log({message: "I am old than him"})
:console.log({message: "I am younger than him"});

// 3. Using switch: is used for create different options based in the expression value
const animal = "pig";

const animalIdentify = (animal) =>{
    switch(animal){
        case "cat":
            return function(){
                return (`I am a ${animal}`)
            }
        case "dog":
            return function(){
                return(`I am a ${animal}`)
            }
        default:
            return function(){
                return(`I am nothing`);
            }
    }
}

const identifyAnimal = animalIdentify(animal);
console.log(identifyAnimal())

// 4.FOR. This is structure is used for execute or iterab a code number of times

const colors = ["yellow", "blue", "red", "pink", "purple"]
for(let i = 0; i < colors.length; i++){
    console.log(colors[i])
}

// 5. While. This is structure is used for execute code when is true the condition
console.log("While")
let count = 8;
while(count < 8){
    console.log(count); 
    count++;
}

// 6. Do While
let countDo = 8;
console.log("Do while")
do{
    console.log(countDo);
    countDo++;
}while(countDo < 8);

// 7. Try catch
console.log("Using try catch")
// const errorFunction = () =>{ // The structure is used for control errors
//     throw Error("Error with the function")
// }
// try{
//     const response = errorFunction();
//     console.log(response)
// }catch(error){
//     console.log("hola")
//     console.error(error)
// }


// 8.Break and continue
console.log("Using break and continue")
for(let i = 0; i < 10; i++){
    if(i % 2 === 0){
        continue;
    }
    if(i === 7){
        break;
    }
    console.log(i)
}

// Guess a number between 1 and 10

const numberGuess = () =>{
    const secretNumber = Math.floor(Math.random() * 10);
    let attempts = 0;
    let guess = false;

    while(attempts < 5){
        const chooseNumber = parseInt(prompt("Enter a number. Please..."));

        if(isNaN(chooseNumber)){
            console.log("Error, choose value incorrect. Try again");
        }

        if(chooseNumber < 1 || chooseNumber > 10){
            console.log("Error. The number is between 1 and ten")
        }
        
        if(chooseNumber === secretNumber){
            console.log("Congratulations.. You win")
            guess = true;
            break;
        }
        console.log("Sorry. Try again!")
        attempts++;

    }

}

try{
    numberGuess();
}catch(error){
    console.error(error)
}
