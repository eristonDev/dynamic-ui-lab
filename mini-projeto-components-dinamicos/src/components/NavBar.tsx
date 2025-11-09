import { NavLink } from "react-router";
import Objects from "../hook/Objects";

const NavBar = () => {
    const{navObj} = Objects();

  return (
    <nav className="flex gap-4 ml-20 text-sm bg-red-500 text-neutral-50 h-10 items-center">
        {navObj.map((m, i) => (
            <NavLink key={i} to={m.path ?? '/'}>{m.content}</NavLink>
        ))}
    </nav>
  )
}

export default NavBar