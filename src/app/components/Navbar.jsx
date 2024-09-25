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
    <nav className="flex justify-between items-center px-6 py-4 bg-[#1D2A34] text-white shadow-md w-full fixed z-10">
      <Link
        to={isAuthenticated ? "/home" : "/"}
        className="flex items-center text-4xl font-bold transition-transform transform hover:scale-110"
      >
        <span className="text-[#FF6B6B]">GC</span>
        <span className="text-[#BFD3C1] ml-2">STORE</span>
      </Link>
      <div className="hidden md:flex space-x-10">
        <NavLink
          to={isAuthenticated ? "/home" : "/"}
          className="cursor-pointer hover:text-[#FF6B6B] transition-colors"
        >
          Home
        </NavLink>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="cursor-pointer hover:text-[#FF6B6B] transition-colors">
                Categorias
              </NavigationMenuTrigger>
              <NavigationMenuContent className="bg-[#2D3E50] text-white shadow-lg rounded-lg p-4">
                <ul className="grid gap-5">
                  {[
                    { label: "Calça", path: "/categorias/calca" },
                    { label: "Tênis", path: "/categorias/tenis" },
                    { label: "Short", path: "/categorias/short" },
                    { label: "Camisa", path: "/categorias/camisa" },
                    { label: "Camiseta", path: "/categorias/camiseta" },
                    { label: "Acessórios", path: "/categorias/acessorios" },
                    { label: "Moletons", path: "/categorias/moletons" },
                  ].map((item, index) => (
                    <li key={index}>
                      <NavLink
                        to={item.path}
                        className="block text-center bg-[#3C6E71] text-white p-3 rounded-md hover:bg-[#FF6B6B] transition-colors"
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
            className="cursor-pointer hover:text-[#FF6B6B] transition-colors"
          >
            Dashboard Admin
          </Link>
        )}
        {isAuthenticated && userRole.includes("PERFIL_MODERADOR") && (
          <Link
            to="/home/dashboard-mod"
            className="cursor-pointer hover:text-[#FF6B6B] transition-colors"
          >
            Dashboard Moderador
          </Link>
        )}
      </div>
      <div className="flex items-center space-x-6">
        <Link
          to={isAuthenticated ? "/home/cart" : "/login"}
          className="cursor-pointer hover:text-[#FF6B6B] transition-colors"
        >
          Carrinho
        </Link>
        <Link
          to={isAuthenticated ? "/home/wish" : "/login"}
          className="cursor-pointer hover:text-[#FF6B6B] transition-colors"
        >
          <Heart />
        </Link>
        {!isAuthenticated ? (
          <div className="space-x-4">
            <Link
              to="/login"
              className="cursor-pointer hover:text-[#FF6B6B] transition-colors"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="cursor-pointer hover:text-[#FF6B6B] transition-colors"
            >
              Cadastre-se
            </Link>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <Link
              to="/home/profile"
              className="cursor-pointer hover:text-[#FF6B6B] transition-colors"
            >
              <CircleUserRound />
            </Link>
            <button
              onClick={logout}
              className="cursor-pointer hover:text-[#FF6B6B] transition-colors"
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
