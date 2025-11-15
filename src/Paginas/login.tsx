import React from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import api from "../Api/api";

function Login() {
  const [searchParams, setSearchParams] = useSearchParams();
  const mensagem = searchParams.get("mensagem");
  const navigate = useNavigate();

  async function handleForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const senha = String(formData.get("senha") ?? "");

    if (!email || !senha) {
      setSearchParams({ mensagem: "Por favor, preencha todos os campos." });
      return;
    }

    try {
      const response = await api.post("/login", { email, senha });

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("tipo", response.data.tipo);
        localStorage.setItem("nome", response.data.nome ?? "");
        navigate("/"); // redireciona após login
      }
    } catch (error: any) {
      const msg =
        error?.response?.data?.mensagem ??
        error?.message ??
        "Erro ao fazer login.";
      setSearchParams({ mensagem: msg });
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <div className="text-center">
          <h1 className="mb-2 text-2xl font-bold text-gray-800">
            Olá! Faça seu login
          </h1>
          <p className="mb-6 text-sm text-gray-600">
            Insira seus dados para continuar.
          </p>
        </div>

        {mensagem && (
          <div className="mb-4 rounded-md bg-red-100 p-3 text-center text-sm text-red-700">
            {mensagem}
          </div>
        )}

        <form onSubmit={handleForm} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              E-mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="seuemail@exemplo.com"
              className="w-full rounded-md border border-gray-300 p-3 text-gray-800 shadow-sm transition duration-150 ease-in-out focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="senha"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Senha
            </label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="••••••••"
              className="w-full rounded-md border border-gray-300 p-3 text-gray-800 shadow-sm transition duration-150 ease-in-out focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 p-3 text-base font-semibold text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Continuar
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Não tem uma conta?{" "}
          <Link
            to="/cadastrar"
            className="font-medium text-blue-600 hover:underline"
          >
            Crie uma agora
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
