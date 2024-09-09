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
              Categorias
            </NavigationMenuTrigger>
            <NavigationMenuContent> {/*Fazer componente com categorias de cada produto */}
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px]">
                <li className="row-span-1">
                  <NavigationMenuLink href="/categorias/calca">
                    <div className="flex h-full w-full select-none flex-col justify-end p-6 no-underline outline-none">
                      <p className="text-sm leading-tight text-muted-foreground">
                        Calça
                      </p>
                    </div>
                  </NavigationMenuLink>
                </li>
                <li className="row-span-1">
                  <NavigationMenuLink href="/categorias/tenis">
                    <div className="flex h-full w-full select-none flex-col justify-end p-6 no-underline outline-none">
                      <p className="text-sm leading-tight text-muted-foreground">
                        Tênis
                      </p>
                    </div>
                  </NavigationMenuLink>
                </li>
                <li className="row-span-1">
                  <NavigationMenuLink href="/categorias/short">
                    <div className="flex h-full w-full select-none flex-col justify-end p-6 no-underline outline-none">
                      <p className="text-sm leading-tight text-muted-foreground">
                        Short
                      </p>
                    </div>
                  </NavigationMenuLink>
                </li>
                <li className="row-span-1">
                  <NavigationMenuLink href="/categorias/camisa">
                    <div className="flex h-full w-full select-none flex-col justify-end p-6 no-underline outline-none">
                      <p className="text-sm leading-tight text-muted-foreground">
                        Camisa
                      </p>
                    </div>
                  </NavigationMenuLink>
                </li>
                <li className="row-span-1">
                  <NavigationMenuLink href="/categorias/camiseta">
                    <div className="flex h-full w-full select-none flex-col justify-end p-6 no-underline outline-none">
                      <p className="text-sm leading-tight text-muted-foreground">
                        Camiseta
                      </p>
                    </div>
                  </NavigationMenuLink>
                </li>
                <li className="row-span-1">
                  <NavigationMenuLink href="/categorias/acessorios">
                    <div className="flex h-full w-full select-none flex-col justify-end p-6 no-underline outline-none">
                      <p className="text-sm leading-tight text-muted-foreground">
                        Acessórios
                      </p>
                    </div>
                  </NavigationMenuLink>
                </li>
                <li className="row-span-1">
                  <NavigationMenuLink href="/categorias/moletons">
                    <div className="flex h-full w-full select-none flex-col justify-end p-6 no-underline outline-none">
                      <p className="text-sm leading-tight text-muted-foreground">
                        Moletons
                      </p>
                    </div>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          {isAuthenticated && userRole.includes("PERFIL_ADMIN") ? (
            <NavLink
              to="/dashboard-admin"
              className="cursor-pointer p-2 hover:scale-105 transition-all hover:bg-black hover:text-white"
            >
              Dashboard Admin
            </NavLink>
          ) : (
            <>
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
            </>
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
