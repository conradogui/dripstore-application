import React, { useState } from "react";
import { Link } from "react-router-dom";
import model1 from "../assets/img/model1.jpg";
import model2 from "../assets/img/model2.jpg";
import model3 from "../assets/img/model3.jpg";
import calca from "../assets/img/calca.jpg";
import tenis from "../assets/img/tenis.jpg";
import short from "../assets/img/short.jpg";
import camisa from "../assets/img/camisa.jpg";
import camiseta from "../assets/img/camiseta.jpg";
import acessorios from "../assets/img/acessorios.jpg";
import moletom from "../assets/img/moletom.jpg";
import Navbar from "./components/Navbar.jsx";
import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.jsx";
import { useModal } from "../context/ModalContext.jsx";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useCart } from "../hooks/useCart.jsx";
import { useProducts } from "../hooks/useProducts.jsx";
import Modal from "./components/Modal.jsx";
import ProductOwn from "./pages/ProductOwn.jsx";
import { useLiked } from "../hooks/useLiked.jsx";

const Home = () => {
  const { produto } = useProducts();
  const { addToCart } = useCart();
  const {addToLiked} = useLiked()
  const { openModal } = useModal();
  const [unicProduct, setUnicProduct ] = useState(null);

  const handleOpenModal = (product) => {
    setUnicProduct(product);
    openModal();
  };

  const isLancamento = (dataCadastro) => {
    const umaSemana = 7 * 24 * 60 * 60 * 1000
    const dataAtual = new Date();
    return (dataAtual - new Date(dataCadastro)) < umaSemana
  }

  return (
    <div className="relative font-sans text-gray-800">
          <Navbar />
      <div>
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
            {[model1, model2, model3].map((model, index) => (
              <CarouselItem key={index}>
                <div className="relative w-full h-[calc(100vh-80px)] sm:h-[calc(70vh-80px)] items-center grayscale opacity-95">
                  <img
                    src={model}
                    alt={`modelo${index + 1}`}
                    className="w-full h-full object-cover brightness-75"
                  />
                  <div className="absolute bottom-16 left-8 text-white p-6 bg-black bg-opacity-60 rounded-lg">
                    <h2 className="text-2xl font-bold">Novidades Incríveis</h2>
                    <Link to="/explore" className="text-sm underline">
                      Descubra mais
                    </Link>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      <div className="mt-12 px-4 sm:px-8 md:px-16 bg-[#2A4B54] text-white py-12 rounded-lg shadow-md">
        <h3 className="text-3xl font-bold text-center mb-6">Vendas Flash</h3>
        <p className="text-center mb-8 opacity-80">
          Descontos incríveis por tempo limitado!
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {produto
            .filter((item) => item.desconto >= 50)
            .map((item) => (
              <div
                key={item.id}
                className="bg-white text-gray-800 shadow-md p-4 rounded-lg transition-transform transform hover:scale-105 -rotate-3"
              >
                <h4 className="text-lg font-semibold mb-2">{item.nome}</h4>
                <p className="text-gray-500">{item.descricao}</p>
                <p className="text-gray-800 font-bold">
                  <span className="line-through text-gray-400">
                    ${item.preco}
                  </span>{" "}
                  <span className="text-red-600">
                    ${(item.preco * (1 - item.desconto / 100)).toFixed(2)}
                  </span>
                </p>
                <button
                  onClick={() => addToCart({ ...item, quantidade: 1 })}
                  className="mt-4 w-full py-2 font-bold text-white bg-[#1D3A34] rounded-lg hover:bg-[#274B4D] transition-colors"
                >
                  Adicionar ao Carrinho
                </button>
                <button
                  onClick={() => addToLiked({ ...item, quantidade: 1 })}
                  className="mt-4 w-full py-2 font-bold text-white bg-[#1D3A34] rounded-lg hover:bg-[#274B4D] transition-colors"
                >
                  curtir
                </button>
                <button
                  onClick={() => handleOpenModal(item)}
                  className="mt-2 w-full py-2 font-semibold text-[#1D3A34] bg-transparent border border-[#1D3A34] rounded-lg hover:bg-[#1D3A34] hover:text-white transition-colors"
                >
                  Visualizar produto
                </button>
                <Modal>
                {unicProduct && <ProductOwn unicProduct={unicProduct} />}
                </Modal>
              </div>
            ))}
        </div>
      </div>
      <div className="mt-16 px-4 sm:px-8 md:px-16 bg-[#F5F5F5] py-12 rounded-lg shadow-md">
        <h3 className="text-3xl font-bold text-center mb-8">
          Depoimentos de Clientes
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {[
            {
              nome: "João Silva",
              depoimento:
                "Adorei os produtos da Dripstore! Atendimento excelente e entrega rápida.",
            },
            {
              nome: "Maria Souza",
              depoimento:
                "Produtos de ótima qualidade! Comprei e chegou antes do esperado. Recomendo!",
            },
            {
              nome: "Lucas Oliveira",
              depoimento:
                "Excelente variedade de produtos e ótimos preços. Sempre compro na Dripstore.",
            },
          ].map((cliente, index) => (
            <div
              key={index}
              className="bg-white shadow-lg p-4 rounded-lg transition-shadow hover:shadow-xl flex flex-col"
            >
              <p className="text-lg italic mb-4 text-gray-600">
                "{cliente.depoimento}"
              </p>
              <h4 className="text-lg font-semibold text-gray-800 text-right">
                {cliente.nome}
              </h4>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-16 px-4 sm:px-8 md:px-16 bg-[#2A4B54] py-12">
        <h3 className="text-2xl font-semibold text-center mb-8 text-white">Categorias</h3>
        <Carousel
          opts={{
            loop: true,
          }}
          className="w-full"
        >
          <CarouselNext />
          <CarouselContent className="-ml-4 mt-2 mb-2">
            {[
              { src: calca, alt: "modelo1", label: "Calça", path: "/categorias/calca"},
              { src: tenis, alt: "modelo2", label: "Tênis", path: "/categorias/tenis" },
              { src: short, alt: "modelo3", label: "Short", path: "/categorias/short" },
              { src: camisa, alt: "modelo3", label: "Camisa", path: "/categorias/camisa" },
              { src: camiseta, alt: "modelo3", label: "Camiseta", path: "/categorias/camiseta" },
              { src: acessorios, alt: "modelo3", label: "Acessórios", path: "/categorias/acessorios" },
              { src: moletom, alt: "modelo3", label: "Moletons", path: "/categorias/moletons" },
            ].map((item, index) => (
              <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/4">
                <NavLink
                  to={item.path}
                  className="flex hover:cursor-pointer justify-center group transition-transform duration-300 ease-in-out transform hover:scale-105 sm:justify-center"
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-52 h-52 rounded-full object-cover grayscale opacity-95 shadow-lg transition-opacity duration-300 group-hover:opacity-100"
                  />
                  <p className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-white text-sm font-medium bg-[#353535] bg-opacity-50 px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {item.label}
                  </p>
                </NavLink>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
        </Carousel>
      </div>
      <div className="mt-16 px-4 sm:px-8 md:px-16 bg-[#2A4B54] text-white py-12">
        <h3 className="text-2xl font-semibold text-center mb-8">
          Novos Lançamentos
        </h3>
        <p className="text-center mb-4">
          Confira nossos produtos mais recentes e tendências do mercado!
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {produto
            .filter((item) => isLancamento(item.data_cadastro))
            .slice(0, 6)
            .map((item) => (
              <div
                key={item.id}
                className="bg-white text-gray-800 shadow-lg p-6 rounded-lg hover:shadow-xl transition-shadow"
              >
                <h4 className="text-lg font-semibold mb-2">{item.nome}</h4>
                <p className="text-gray-500">{item.descricao}</p>
                <p className="text-gray-800 font-bold">
                  <span className="line-through text-gray-400">
                    ${item.preco}
                  </span>{" "}
                  <span className="text-red-600">
                    ${(item.preco * (1 - item.desconto / 100)).toFixed(2)}
                  </span>
                </p>
                <button
                  onClick={() => addToCart({ ...item, quantidade: 1 })}
                  className="mt-4 px-4 py-2 font-semibold text-white bg-[#284B63] rounded-lg hover:bg-[#353535]"
                >
                  Adicionar ao Carrinho
                </button>
              </div>
            ))}
        </div>
      </div>
      <footer className="mt-16 p-4 bg-[#353535] text-white text-center">
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
