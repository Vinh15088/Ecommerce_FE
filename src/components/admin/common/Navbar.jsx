import { Bars3Icon } from "@heroicons/react/20/solid";


function Navbar({toggleSideMenu}) {
    const itemIconClass = "w-8 h-8 lg:w-8 lg:h-8";
    const navBarHeight = "71px";

    return (
        <nav
            className="flex items-center space-x-4 shadow bg-white block w-full px-5 absolute"
            style={{height: navBarHeight}}
        >
            <div>
                <Bars3Icon className={itemIconClass} onClick={toggleSideMenu}/>
            
            </div>
                
            <div> 

            </div>
        </nav>
    );
}

export default Navbar;