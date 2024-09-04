import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import model1 from "../assets/img/model1.jpg";
import model2 from "../assets/img/model2.jpg";
import model3 from "../assets/img/model3.jpg";
import Navbar from "./components/Navbar.jsx";
import axios from "axios";
import { useAuth } from "../context/AuthContext.jsx";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const Home = () => {
  const [data, setData] = useState([]);
  const URL_PRODUTOS = "https://dripstore-api-y1ak.onrender.com/api/produto";
  const { addToCart, addToWishList } = useAuth(); 

  const getProdutos = async () => {
    try {
      const response = await axios.get(URL_PRODUTOS);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProdutos();
  }, []);

  return (
    <div className="relative font-sans text-gray-800">
      <div className="pt-20">
        <Carousel
          opts={{
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 5000,
            }),
          ]}
          className="justify-center block"
        >
          <CarouselContent>
            <CarouselItem>
              <div className="relative w-full h-[calc(100vh-80px)] sm:h-[calc(70vh-80px)] items-center grayscale opacity-95">
                <div className="absolute bottom-8 left-8 text-white p-4 bg-black bg-opacity-50 rounded">
                  <p className="text-xl font-bold">Texto</p>
                  <Link to="/explore" className="text-sm underline">
                    Saiba mais
                  </Link>
                </div>
                <img
                  src={model1}
                  alt="modelo1"
                  className="w-full h-full object-cover"
                />
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="relative w-full h-[calc(100vh-80px)] sm:h-[calc(70vh-80px)] items-center grayscale opacity-95">
                <div className="absolute bottom-8 left-8 text-white p-4 bg-black bg-opacity-50 rounded">
                  <p className="text-xl font-bold">Texto</p>
                  <Link to="/explore" className="text-sm underline">
                    Saiba mais
                  </Link>
                </div>
                <img
                  src={model2}
                  alt="modelo2"
                  className="w-full h-full object-cover"
                />
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="relative w-full h-[calc(100vh-80px)] sm:h-[calc(70vh-80px)] items-center grayscale opacity-95">
                <div className="absolute bottom-8 left-8 text-white p-4 bg-black bg-opacity-50 rounded">
                  <p className="text-xl font-bold">Texto</p>
                  <Link to="/explore" className="text-sm underline">
                    Saiba mais
                  </Link>
                </div>
                <img
                  src={model3}
                  alt="modelo3"
                  className="w-full h-full object-cover"
                />
              </div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
      <div className="mt-16 px-4 sm:px-8 md:px-16">
        <h3 className="text-2xl font-semibold text-center mb-8">
          Itens Populares
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {data.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-lg p-6 rounded-lg hover:shadow-xl transition-shadow"
            >
              <h4 className="text-lg font-semibold mb-2">{item.nome}</h4>
              <p className="text-gray-600">{item.descricao}</p>
              <p className="text-gray-800 font-semibold">${item.preco}</p>
              <button
                onClick={() => addToCart({ ...item, quantity: 1 })}
                className="mt-4 px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Adicionar ao Carrinho
              </button>
              <button
                onClick={() => addToWishList(item)}
                className="mt-2 px-4 py-2 font-semibold text-blue-600 bg-white border border-blue-600 rounded-lg hover:bg-blue-100"
              >
                Adicionar à Lista de Interesse
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-16 px-4 sm:px-8 md:px-16 bg-gray-100 py-12">
        <h3 className="text-2xl font-semibold text-center mb-8">Sobre Nós</h3>
        <p className="text-lg text-center max-w-4xl mx-auto">Texto</p>
      </div>
      <div className="mt-16 px-4 sm:px-8 md:px-16 py-12 bg-blue-600 text-white text-center">
        <h3 className="text-2xl font-semibold mb-8">Entre em Contato</h3>
        <p className="text-lg mb-4">Texto</p>
        <button className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition">
          Fale Conosco
        </button>
      </div>
      <footer className="mt-16 p-4 bg-gray-800 text-white text-center">
        <p>&copy;onrado 2024. Todos os direitos reservados.</p>
        <div className="mt-4">
          <Link to="/" className="mx-2 hover:underline">
            Política de Privacidade
          </Link>
          <Link to="/" className="mx-2 hover:underline">
            Termos de Serviço
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Home;
