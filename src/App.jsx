import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function App() {
  const [data, setData] = useState([])
  const URL_PRODUTOS = 'https://dripstore-api-y1ak.onrender.com/api/produto'

  const getProdutos = async () => {
    try {
      const response = await axios.get(URL_PRODUTOS)
      console.log(response.data);
      setData(response.data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProdutos()
  },[])

  return (
    <>
      <h1 className="bg-red-700 font-bold">Projeto</h1>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Nome</TableHead>
            <TableHead>Desconto</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead className="text-right">Preço</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.nome}</TableCell>
            <TableCell className="font-medium">{item.desconto}</TableCell>
            <TableCell className="font-medium">{item.categoria}</TableCell>
            <TableCell className="text-right">${item.preco}</TableCell>
          </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default App;
