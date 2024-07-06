export const Navbar = ( ) =>{
    console.log("navbar")
    const viewNavbar = `
        <div class="header-content">
            <div class="content-dashbaord">
                <h1>Dashboard</h1>
                <h4>Product management</h4>
            </div>
            <div class="content-user">
                <p class="user-paragraph">Jose</p>
                <div class="user-circle">
                    <span>J</span>
                </div>
            </div>
        </div>
        <hr>
        
    `;
    const controllerNavbar = () =>{
        
    }
    return {
        viewNavbar,
        controllerNavbar
    }
}