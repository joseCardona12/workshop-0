export const Dashboard = ($root,view,controller) =>{
    $root.innerHTML =  
    `
        <header></header>
        <main>${view}</main>
        <footer></footer>
    `;
    controller();
}