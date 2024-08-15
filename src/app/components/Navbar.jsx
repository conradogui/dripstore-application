import { NavLink } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  return (
    <nav className="flex justify-around gap-8 font-bold text-xl w-full">
      <NavLink
        to="/"
        className="cursor-pointer flex items-center p-2 transition-transform transform hover:scale-105 hover:text-gray-800"
      >
        <span className="text-3xl font-bold text-gray-900 hover:text-gray-600 transition-colors">
          GC
        </span>
        <span className="text-3xl font-bold text-gray-900 ml-2 hover:text-gray-600 transition-colors">
          STORE
        </span>
      </NavLink>
      <NavigationMenu>
        <NavigationMenuList>
          <NavLink
            to="/"
            className="cursor-pointer p-2 hover:scale-105 transition-all hover:bg-black hover:text-white"
          >
            Home
          </NavLink>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="cursor-pointer p-2 hover:scale-105 transition-all hover:bg-black hover:text-white">
              Sobre
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink>
                wefbeufbwekurgbyekugbysergbwkug
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="cursor-pointer p-2 hover:scale-105 transition-all hover:bg-black hover:text-white">
              Shop
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink>Link</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="cursor-pointer p-2 hover:scale-105 transition-all hover:bg-black hover:text-white">
              Categorias
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink>Link</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavLink
            to="/login"
            className="cursor-pointer p-2 hover:scale-105 transition-all hover:bg-black hover:text-white"
          >
            Promoções
          </NavLink>
        </NavigationMenuList>
      </NavigationMenu>
      <div>
        <NavLink
          to="/login"
          className="cursor-pointer p-2 hover:scale-105 transition-all hover:bg-black hover:text-white"
        >
          Login
        </NavLink>
        <NavLink
          to="/register"
          className="cursor-pointer p-2 hover:scale-105 transition-all hover:bg-black hover:text-white"
        >
          Cadastre-se
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
