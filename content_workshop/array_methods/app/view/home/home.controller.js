import { getProducts } from "./home.model.js"

export const HomeController = async() =>{
    const productsGet = await getProducts();
    console.log(productsGet)
}