// Activities 
// 1. Identification
//    Example

console.log(arrayVar) // We are calling a variable before of create. 
var arrayVar = [2,2,2,2,2] // This variable rises to start of execute context. Only declaration
console.log(arrayVar) // Now, the variable is found and show content variable

// But the hoisting is different with the variables const and let. When is called a variable with us before example. 
// Javascript show a error for before initialize

// In this example, we are calling the function and send a argument, but the argument is a varible and the hoisting 
// rises the variable with the content undifined, because javascript found the varible but not initialization
showName(nameUser); 
var nameUser = "jose"; // Variable name user with reserved word var
function showName(nameUser){ // This function too has the hoisting like the variables with var.
    console.log(`Hello. My name is ${nameUser}`)
}
 
// ------------------>

// 2. Correction
// Example
// try{
//     console.log(name)
// }catch(error){
//     console.error(error)
// }
// var name = "jose"

// ------------>
// Corrected -

const name = "jose"
try{
    console.log(name)
}catch(error){
    console.error(error)
}

// // Example two
// showName(nameUser); 
// var nameUser = "jose"; 
// function showName(nameUser){ 
//     console.log(`Hello. My name is ${nameUser}`)
// }

// --------->
// Corrected
// const nameUser = "jose";
// showName(nameUser);
// function showName(nameUser){
//     console.log(`Hello. My name is ${nameUser}`)
// }


// 3. Creation
const app = async() =>{
    try{
        const usersGet = await getUsers();
        showDataName(usersGet);
        
    }catch(error){
        console.log(error)
    }
}

async function getUsers(){
    const response = await fetch("http://localhost:3000/users");
    const data = await response.json();
    return data;
}
function showDataName(data){
    const usersObtain = data.map(users => users.username);
    console.log(usersObtain)
}

app();
