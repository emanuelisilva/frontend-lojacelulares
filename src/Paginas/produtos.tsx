import { useEffect, useState } from "react";
import api from "../Api/api";

interface Produto {
  id: number;
  nome: string;
  categoria: string;
  preco: number;
}

const user = { role: "admin" }; 

export default function Produtos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [busca, setBusca] = useState("");

  const carregarProdutos = async () => {
    try {
      const res = await api.get(`/produtos?busca=${busca}`);
      // Garante que o estado de produtos seja sempre um array para evitar erros de renderização.
      setProdutos(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
      setProdutos([]); // Em caso de erro na requisição, garante que a lista fique vazia.
    }
  };

  useEffect(() => {
    carregarProdutos();
  }, [busca]);

  const adicionarAoCarrinho = async (id: number) => {
    try {
      // Assumindo que a API espera um POST em /carrinho com o ID do produto
      await api.post(`/carrinho`, { produtoId: id }); 
      alert("Item adicionado ao carrinho!");
    } catch (error) {
      console.error("Erro ao adicionar item ao carrinho:", error);
      alert("Erro ao adicionar item ao carrinho.");
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      try {
        await api.delete(`/produtos/${id}`);
        alert("Produto excluído com sucesso!");
        carregarProdutos(); 
      } catch (error) {
        console.error("Erro ao excluir produto:", error);
        alert("Erro ao excluir produto.");
      }
    }
  };

  if (produtos.length === 0) {
    return <p>Nenhum produto encontrado.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Produtos</h2>
      <input
        placeholder="Buscar por nome ou categoria..."
        value={busca}
        onChange={e => setBusca(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />
      <ul className="space-y-2">
        {produtos.map(p => (
          <li key={p.id} className="p-3 border rounded flex justify-between items-center shadow-sm">
            <div>
              <span className="font-semibold">{p.nome}</span> - <span>{p.categoria}</span> - <span className="font-bold">R${p.preco.toFixed(2).replace('.',',')}</span>
            </div>
            <div className="space-x-2">
              <button 
                onClick={() => adicionarAoCarrinho(p.id)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Adicionar ao carrinho
              </button>
              
              {user?.role === "admin" && (
                <button
                  onClick={() => handleDelete(p.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Excluir
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
