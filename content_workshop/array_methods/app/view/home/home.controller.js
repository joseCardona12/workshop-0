import { getProducts } from "./home.model.js"

export const HomeController = async() =>{
    const productsGet = await getProducts();
    if(!productsGet){
        console.log({message: "Error to obtain the products..."})
        return;
    }
    const $contentProducts = document.getElementById("products-content");
    const $categorySelect = document.getElementById("category-select");
    const $buttonTotalPriceProducts = document.getElementById("totalPriceProducts");
    const $formSearch = document.getElementById("formSearch");
    const $buttonAvailable = document.getElementById("button-available");
    const productCategories = obtainAllCategoryProducts(productsGet);

    renderProducts($contentProducts,productsGet);
    renderCategoryOptions($categorySelect, productCategories);

    $buttonTotalPriceProducts.addEventListener("click", ()=>{
        const $paragraphTotalPriceProducts = document.getElementById("priceTotal");
        const totalPriceProducstObtain = obtainTotalPriceProducts(productsGet);
        renderTotalPriceProducts($buttonTotalPriceProducts,$paragraphTotalPriceProducts,totalPriceProducstObtain);

    })
    //Filter productst for category
    $categorySelect.addEventListener("change", ()=>{ // Add event for obtain change in the options available for choose
        const productsForCategoryFilter = filterProductsForCategory(productCategories,$categorySelect.value,productsGet);
        if(!productsForCategoryFilter){
            renderProducts($contentProducts,productsGet) // Is called renderProduct when choose all producst - return false
        }
        renderProducts($contentProducts,productsForCategoryFilter) // Is called again renderProducst, but the value of products change for category
    })

    //Search products for name
    $formSearch.addEventListener("submit", (e)=>{
        e.preventDefault();
        const enterNameProduct = document.getElementById("nameProduct");
        const forNameProductSearch = searchForNameProduct(enterNameProduct.value,productsGet, $contentProducts);
        if(forNameProductSearch){
            renderProduct($contentProducts,forNameProductSearch)
        }
    })

    //Verify available the products
    $buttonAvailable.addEventListener("click", ()=>{
        const $paragraphAvailable = document.getElementById("paragraph-available");
        const availableProductsVerify = verifyAvailableProducts(productsGet);
        $paragraphAvailable.innerText = `${availableProductsVerify}`
    })
    

}
const renderProduct = ($contentProducts,product) =>{
    $contentProducts.innerHTML = 
    `
    <article class="content-article card">
        <div class="article-header card-header">
            <p>Image</p>
        </div>
        <div class="article-body"> 
            <h4 class="body-name">${product.name}</h4>
            <div class="body-price">
                <div class="price-content">
                    <h6>Price:</h6>
                    <p>${product.price}</p>
                </div>
                <div class="price-content">
                    <h6>Stock:</h6>
                    <p> ${product.stock}</p>
                </div>   
            </div>
        </div>
        <div class="article-footer">
        
        </div>
                
    </article>
    `;
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
                        <div class="price-content">
                            <h6>Price:</h6>
                            <p>${product.price}</p>
                        </div>
                        <div class="price-content">
                            <h6>Stock:</h6>
                            <p> ${product.stock}</p>
                        </div>   
                    </div>
                </div>
                <div class="article-footer">
                
                </div>
            
            </article>
        `
    ).join("")}
    ` 
} 

const obtainAllCategoryProducts = (products) =>{
    const productCategories = products.map(product=>product.category);
    const productCategoriesUnit = [];

    productCategories.forEach(category=> {
        if(!productCategoriesUnit.includes(category)){
            productCategoriesUnit.push(category);
            return;
        }
        return false
    });
    return productCategoriesUnit; 
}

const renderCategoryOptions = ($elements, productCategories) =>{
    $elements.innerHTML = 
    `
        <option>All products</option>
        ${productCategories.map(category=>
            `
                <option class="select-option">${category}</option>
            `
        )}
    
    `
}

const obtainTotalPriceProducts = (products) =>{
    const priceStockProducts = [];
    products.forEach(product=>{
        priceStockProducts.push({"price": product.price, "stock": product.stock});
    })
    const totalPriceProducts = priceStockProducts.reduce((total, product)=>{
        return total + (product.price * product.stock)
    },0);
    return totalPriceProducts;
}

const renderTotalPriceProducts = ($button, $paragraph,totalPriceProducts) =>{
    $button.classList.toggle("active-price");
    if(!$button.classList.contains("active-price")){
        $paragraph.innerText = "Loading..."
        return;
    }
    $paragraph.innerText = `$ ${totalPriceProducts.toLocaleString("es-CO")}`
}

const filterProductsForCategory = (categories,enterValueUser,products) =>{
    const foundCategory = categories.find(category=> category === enterValueUser)
    if(!foundCategory){
        return false;
    }
    const productsForCategory = products.filter(product=>product.category === foundCategory);
    return productsForCategory;

}
const searchForNameProduct = (nameProduct,products, content)=>{
    const foundProduct = products.find(product=> product.name === nameProduct);
    console.log(foundProduct)
    if(!foundProduct){
        content.innerText = "Product not found..."
    }
    return foundProduct;
}

const verifyAvailableProducts = (producst) =>{
    const availableProductsVerify = producst.every(product => product.stock > 0);
    return availableProductsVerify
}
