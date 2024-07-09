import { HomeController } from "./home.controller.js";

export const HomeView = () =>{
    const view = 
    `
    <section class="section-products">
        <h2>Products management</h2>
        <div class="products-totalPrice">
            <button class=" totalPrice-button btn btn-primary">Total price</button>
        </div>

        <form class="products-form" id="formCategory">
            <div class="form-name">
                <label class="name-label form-label" for="name">Enter product name:</label>
                <input class="name-input form-control" name="name">
            </div>

            <>Category filter</h2>
            <select id="category-select">

            </select>
        </form>

        <div class="products-content" id="products-content">
            
        </div>
    </section>
    
    `;
    const controller = HomeController

    return{
        view,
        controller
    }
}