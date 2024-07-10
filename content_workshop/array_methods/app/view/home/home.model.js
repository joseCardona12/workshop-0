export const getProducts = async() =>{
    try{
        const productsGet = await fetch("http://localhost:3000/products");
        if(!productsGet.ok){
            throw new Error({message: "Error with connection to json server. Try again"})
        }
        return productsGet.json();
    }catch(error){
        console.log({message:error})
    }
    
}
