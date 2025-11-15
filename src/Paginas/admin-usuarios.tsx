import { useEffect, useState } from "react";
import api from "../Api/api";
import { useNavigate } from "react-router-dom";

interface Usuario { _id: string; nome: string; email: string; tipo: string; }

export default function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const tipo = localStorage.getItem("tipo");
    if (tipo !== "ADMIN") {
      navigate("/"); // redireciona se não for admin
      return;
    }
    carregar();
  }, [navigate]);

  const carregar = async () => {
    try {
      const res = await api.get("/api/usuarios");
      setUsuarios(res.data);
    } catch (err: any) {
      setErro(err.response?.data?.message || "Erro ao carregar usuários");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Gerenciamento de Usuários</h2>
      {erro && <p className="text-red-500 bg-red-100 p-2 rounded mb-4">{erro}</p>}
      <ul className="space-y-2">
        {usuarios.map(usuario => (
          <li key={usuario._id} className="p-3 border rounded flex justify-between items-center shadow-sm">
            <div>
              <span className="font-semibold">{usuario.nome}</span>
              <span className="mx-2">|</span>
              <span>{usuario.email}</span>
              <span className="mx-2">|</span>
              <span className="font-mono bg-gray-200 px-2 py-1 rounded text-sm">{usuario.tipo}</span>
            </div>
            {/* Adicionar botões de ação (editar, excluir) aqui se necessário */}
          </li>
        ))}
      </ul>
    </div>
  );
}