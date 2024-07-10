import { HomeController } from "./home.controller.js";

export const HomeView = () =>{
    const view = 
    `
    <section class="section-products">
        <h2>Products management</h2>
        <div class="products-totalPrice">
            <button class="totalPrice-button btn btn-primary" id="totalPriceProducts">Total price</button>
            <div class="totalPrice-content">
                <h6>Total price:</h6>
                <p id="priceTotal">Loading...</p>
            </div>
        </div>

        <form class="products-form" id="formSearch">
            <div class="form-name">
                <label class="name-label form-label" for="name">Enter product name:</label>
                <input class="name-input form-control" name="name" id="nameProduct">
            </div>
            <input class="products-form-button btn btn-success mt-2" id="button-search" type="submit" value="search">
        </form>

        <div class="category">
            <h6 class="category-title">Category filter</h6>
            <select class="category-select" id="category-select">
            </select>
        </div>

        <div class="available-products">
            <button class="button-available btn btn-info" id="button-available">Available products</button>
            <p id ="paragraph-available"></p>
        </div>

        <div class="products-content" id="products-content">
            Loading...
        </div>
    </section>
    
    `;
    const controller = HomeController

    return{
        view,
        controller
    }
}