import { useEffect, useState } from "react";
import api from "../Api/api";

interface Item { idProduto: string; nome: string; preco: number; quantidade: number; _id?: string; }

export default function Carrinho() {

  const [itens, setItens] = useState<Item[]>([]);
  const idUsuario = localStorage.getItem("userId") || "demo";

  useEffect(() => { carregar(); }, []);

  const carregar = async () => {
    try {
      const res = await api.get(`/api/carrinho/${idUsuario}`);
      setItens(res.data.itens || []);
    } catch (err) { console.error(err); }
  };

  const remover = async (idProduto: string) => {
    try {
      await api.delete(`/api/carrinho/${idUsuario}/${idProduto}`);
      setItens(prev => prev.filter(i => i.idProduto !== idProduto));
    } catch (err) { console.error(err); return err && <p className="text-red-500 bg-red-100 p-2 rounded mb-4">{`${err}`}</p>}
  };
  // Calcula o total do carrinho
  const total = itens.reduce((s, it) => s + it.preco * (it.quantidade || 1), 0);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Carrinho de Compras</h2>
      {itens.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <div>
          <ul className="space-y-3">
            {itens.map(item => (
              <li key={item.idProduto} className="p-3 border rounded flex justify-between items-center shadow-sm">
                <div>
                  <span className="font-semibold">{item.nome}</span>
                  <span className="mx-2">|</span>
                  <span>Qtd: {item.quantidade || 1}</span>
                  <span className="mx-2">|</span>
                  <span className="font-medium">R$ {item.preco.toFixed(2).replace('.', ',')}</span>
                </div>
                <button
                  onClick={() => remover(item.idProduto)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Remover
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-6 text-right">
            <h3 className="text-xl font-bold">Total: R$ {total.toFixed(2).replace('.', ',')}</h3>
          </div>
        </div>
      )}
    </div>
  );
}