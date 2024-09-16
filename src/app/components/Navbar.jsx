import { NavLink } from "react-router-dom";
import { Heart, CircleUserRound } from "lucide-react";
import { useAuth } from "../../hooks/useAuth.jsx";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  const { isAuthenticated, userRole, logout } = useAuth();

  return (
    <nav className="flex justify-between items-center px-4 py-3 bg-[#353535] text-white shadow-lg w-full">
      <Link
        to={isAuthenticated ? "/home" : "/"}
        className="flex items-center text-3xl font-bold transition-transform transform hover:scale-110"
      >
        <span className="text-white">GC</span>
        <span className="text-[#284B63] ml-2">STORE</span>
      </Link>
      <div className="hidden md:flex space-x-8">
        <NavLink
          to={isAuthenticated ? "/home" : "/"}
          className="cursor-pointer p-2 hover:text-[#D9D9D9] transition-all"
        >
          Home
        </NavLink>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="cursor-pointer p-2 hover:text-[#D9D9D9] transition-all">
                Categorias
              </NavigationMenuTrigger>
              <NavigationMenuContent className="mt-2 bg-[#FFFFFF] text-[#353535] shadow-lg rounded-lg p-4">
                <ul className="grid gap-3 md:w-[400px] lg:w-[500px]">
                  {[
                    { label: "Calça", path: "/categorias/calca" },
                    { label: "Tênis", path: "/categorias/tenis" },
                    { label: "Short", path: "/categorias/short" },
                    { label: "Camisa", path: "/categorias/camisa" },
                    { label: "Camiseta", path: "/categorias/camiseta" },
                    { label: "Acessórios", path: "/categorias/acessorios" },
                    { label: "Moletons", path: "/categorias/moletons" },
                  ].map((item, index) => (
                    <li key={index} className="row-span-1">
                      <NavLink
                        to={item.path}
                        className="block text-center bg-[#3C6E71] text-white p-4 rounded-md hover:bg-[#284B63] transition-colors"
                      >
                        {item.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        {isAuthenticated && userRole.includes("PERFIL_ADMIN") && (
          <Link
            to="/home/dashboard-admin"
            className="cursor-pointer p-2 hover:text-[#D9D9D9] transition-all"
          >
            Dashboard Admin
          </Link>
        )}
      </div>
      <div className="flex items-center space-x-4">
        <>
          <Link
            to={isAuthenticated ? "/home/cart" : "/login"}
            className="cursor-pointer p-2 hover:text-[#D9D9D9] transition-all"
          >
            Carrinho
          </Link>
          <Link
            to={isAuthenticated ? "/home/wish" : "/login"}
            className="cursor-pointer p-2 hover:text-[#D9D9D9] transition-all"
          >
            <Heart />
          </Link>
        </>
        {!isAuthenticated ? (
          <div className="space-x-4">
            <Link
              to="/login"
              className="cursor-pointer p-2 hover:text-[#D9D9D9] transition-all"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="cursor-pointer p-2 hover:text-[#D9D9D9] transition-all"
            >
              Cadastre-se
            </Link>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <Link
              to="/home/profile"
              className="cursor-pointer p-2 hover:text-[#D9D9D9] transition-all"
            >
              <CircleUserRound />
            </Link>
            <button
              onClick={logout}
              className="cursor-pointer p-2 hover:text-[#FF6B6B] transition-all"
            >
              Sair
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
