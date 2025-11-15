import React, { useEffect, useState } from "react";
import api from "../Api/api";

interface Item { idProduto: string; nome: string; preco: number; quantidade: number; _id?: string; }

const Carrinho: React.FC = () => {
  const [itens, setItens] = useState<Item[]>([]);
  const idUsuario = localStorage.getItem("userId") || "demo"; // ajuste conforme auth

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
    } catch (err) { console.error(err); }
  };
  // Calcula o total do carrinho
  const total = itens.reduce((s, it) => s + it.preco * (it.quantidade || 1), 0);
}

export default Carrinho
