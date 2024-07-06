export const getProducts = async() =>{ // Function for get products of the Api
    try{ // Error control try - catch
        const URL_API ="https://fakestoreapi.com/products"
        const response = await fetch(URL_API);
        if(!response.ok){
            throw new Error("Error with connection to the Api");
        }
        return response.json();
    }catch(error){
        console.log({message: error})
    } 
}