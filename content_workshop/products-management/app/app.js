import { Dashboard } from "./components/layout/dashboard/dashboard.js";
import { HomeView } from "./view/home/home.view.js";

export const App = () =>{
    const $root = document.getElementById("root");
    if(!$root){
        console.log({message: "Error. Element root not found"})
    }
    const {view,controller} = HomeView();
    Dashboard($root,view,controller)//Is called homeView
}