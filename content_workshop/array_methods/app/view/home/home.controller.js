import { getProducts } from "./home.model.js"

export const HomeController = async() =>{
    const productsGet = await getProducts();
    console.log(productsGet)
    const $contentProducts = document.getElementById("products-content");
    renderProducts($contentProducts,productsGet);


}

const renderProducts = ($contentProducts,products) =>{

    $contentProducts.innerHTML=`
    
        ${products.map(product=>
            `
                <article class="content-article card">
                    <div class="article-header card-header">
                        <p>Image</p>
                    </div>
                    <div class="article-body"> 
                        <h4 class="body-name">${product.name}</h4>
                        <div class="body-price">
                            <p> 
                                <strong>Price: </strong> 
                                ${product.price}</p>
                            <p> 
                                <strong>Stock: </strong>
                            ${product.stock}
                            </p>
                        </div>
                    </div>
                    <div class="article-footer">
                    
                    </div>
                
                </article>
            `
        ).join("")}
    
    `
    
} 