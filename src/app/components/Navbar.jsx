import { NavLink } from "react-router-dom";
import { Heart, CircleUserRound } from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";
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
  const { isAuthenticated, userRole, logout } = useAuth();

  return (
    <nav className="flex justify-around gap-8 font-bold text-xl w-full shadow-lg">
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
              Produtos
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
            to={isAuthenticated ? "/cart" : "/login"}
            className="cursor-pointer p-2 hover:scale-105 transition-all hover:bg-black hover:text-white"
          >
            Carrinho
          </NavLink>
          <NavLink
            to={isAuthenticated ? "/wish" : "/login"}
            className="cursor-pointer p-2 hover:scale-105 transition-all hover:bg-black hover:text-white"
          >
            <Heart />
          </NavLink>
          {isAuthenticated && userRole.includes("PERFIL_ADMIN") && (
            <NavLink
              to="/dashboard-admin"
              className="cursor-pointer p-2 hover:scale-105 transition-all hover:bg-black hover:text-white"
            >
              Dashboard Admin
            </NavLink>
          )}
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex">
        {!isAuthenticated ? (
          <>
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
          </>
        ) : (
          <div className="flex justify-center items-center">
            <NavLink
              to="/profile"
              className="cursor-pointer p-2 hover:scale-105 transition-all hover:bg-black hover:text-white"
            >
              <CircleUserRound />
            </NavLink>
            <NavLink
              to="/"
              className="cursor-pointer p-2 hover:scale-105 transition-all hover:bg-black hover:text-white"
              onClick={logout}
            >
              Sair
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

