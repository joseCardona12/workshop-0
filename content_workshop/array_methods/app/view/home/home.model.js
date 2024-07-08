export const getProducts = async() =>{
    const productsGet = await fetch("http://localhost:3000/products");
    return productsGet.json();
}
