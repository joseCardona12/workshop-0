import { getProducts } from "./home.model.js"

export const HomeController = async() =>{
    const productsGet = await getProducts();
    const $itemList = document.getElementById("products-list");
    const $formProductsSearch = document.getElementById("formSearch"); 
    const $selectOptions = document.getElementById("form-select");
    renderProducts($itemList,productsGet);
    const onlyCategoriesObtain = obtainOnlyCategories(productsGet);
    renderSelectOption($selectOptions,onlyCategoriesObtain);

    $formProductsSearch.addEventListener("submit", (e)=>{
        e.preventDefault();
        const productsFilterSearchObtain = obtainProductsFilterSearch(productsGet,$selectOptions.value);
        renderProducts($itemList,productsFilterSearchObtain)
    })   
}

const renderProducts = ($itemList, productsGet) =>{
    $itemList.innerHTML = 
    `
    ${productsGet.map(product=>
        `
        <article class="section-article card">
            <div class="article-header card-header">
                <img class="header-image" src=${product.image}>
            </div>
            <div class="article-body card-body"> 
                <h5 class="body-paragraph">${product.title}</h5>
                
                <p class="body-paragraph">${product.description.substring(0,30)}...</p>
                <p class="body-paragraph"> 
                    <strong>Precio:</strong> 
                    ${product.price}</p>
                <p class="body-paragraph">
                    <strong>Rating: </strong>
                ${product.rating.rate}</p>
            </div>
            <div class="article-footer">
                <button class="btn btn-primary">Show more</button>
            </div>
        </article>
        `   
    ).join("")}`;
}

const renderSelectOption = ($selectOptions,onlyCategoriesObtain) =>{
    console.log(onlyCategoriesObtain);
    $selectOptions.innerHTML = 
    `
        ${onlyCategoriesObtain.map((category)=>
            `
            <option class="select-option">${category}</option>
            `
        )}
    `

}
const obtainOnlyCategories = (productsGet)=>{
    const onlyCategories = [];
    const filterProductsForCategory = productsGet.filter(product=>{
        if(!onlyCategories.includes(product.category)){
            onlyCategories.push(product.category);
            return true;
        }
        return false;
    })
    return onlyCategories;
}

const obtainProductsFilterSearch = (productsGet, valueOption) =>{
    const productsFilter = productsGet.filter(product=> product.category === valueOption);
    console.log(valueOption, productsFilter)
    return productsFilter;
}
