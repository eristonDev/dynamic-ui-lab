import { FaShoppingCart, FaSearch, FaUser } from "react-icons/fa";
import type { ButtonData } from "../types/uiTypes";

function Objects() {
  
    const navObj = [
        {tag:'li', content: 'HOME', path:'/'},
        {tag:'li', content: 'MENU', path:'/'},
        {tag:'li', content: 'ABOUT', path:'/'},
        {tag:'li', content: 'BOOK TABLE', path:'/'},
        {tag:'li', icon: FaUser},
        {tag:'li', icon: FaShoppingCart},
        {tag:'li', icon: FaSearch},
    ];
    const btnUniversal: ButtonData[] = [
        {type:'Now', content:'Order Now'},
        {type: 'View', content: 'View More'},
        {type: 'Online', content: 'Order Online'},
        {type: 'card', content: FaShoppingCart},
    ];
    
    return {navObj, btnUniversal}

}

export default Objects