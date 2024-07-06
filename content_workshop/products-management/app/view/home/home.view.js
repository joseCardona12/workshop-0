import { HomeController } from "./home.controller.js";

export const HomeView = () =>{
    const view = 
    `
    <div class="products" id="content-products">
        <form class="products-form" id="formSearch">
            <label class="form-label">Choose category</label>
            <select class="form-select" id="form-select">
                
            </select>
            <input class="form-button btn btn-success mt-4" value="search" type="submit">
        </form>
        <h3>Productos</h3>

        <section class="products-section" id="products-list">
            Cargando...
        </section> 
    </div>
    `;
    const controller = HomeController;
    
    return {
        view,
        controller
    }
}