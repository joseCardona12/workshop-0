import { Navbar } from "../../navbar/navbar.js";

const {viewNavbar, controllerNavbar} = Navbar();
export const Dashboard = ($root,view,controller) =>{
    $root.innerHTML = 
    `
        <header>${viewNavbar}</header>
        <main>${view}</main>
        <footer></footer>
    `
    controllerNavbar();
    controller();


}