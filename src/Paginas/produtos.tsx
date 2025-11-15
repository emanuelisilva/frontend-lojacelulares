import { useEffect, useState } from "react";
import api from "../Api/api";

interface Produto {
  id: number;
  nome: string;
  categoria: string;
  preco: number;
}

export default function Produtos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [busca, setBusca] = useState("");

  const carregar = async () => {
    const res = await api.get(`/produtos?busca=${busca}`);
    setProdutos(res.data);
  };

  useEffect(() => {
    carregar();
  }, [busca]);

  const remover = async (id: number) => {
    await api.delete(`/carrinho/${id}`);
    alert("Item removido do carrinho!");
  };

  //parte jessica 
  {user?.role === "admin" && (
  <button
    onClick={() => handleDelete(produto._id)}
    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
  >
    Excluir
  </button>
)}
///////

  return (
    <div className="container">
      <h2>Produtos</h2>
      <input
        placeholder="Buscar por nome ou categoria..."
        value={busca}
        onChange={e => setBusca(e.target.value)}
      />
      <ul>
        {produtos.map(p => (
          <li key={p.id}>
            {p.nome} - {p.categoria} - R${p.preco}{" "}
            <button onClick={() => remover(p.id)}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
