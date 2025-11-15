import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../Api/api";

function Login() {
  const [searchParams] = useSearchParams();
  const mensagem = searchParams.get("mensagem");
  const navigate = useNavigate();

  async function handleForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const senha = String(formData.get("senha") ?? "");

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
      navigate(`/login?mensagem=${encodeURIComponent(msg)}`);
    }
  }
  return (
    <>
      {mensagem && <p>{mensagem}</p>}
      <form onSubmit={handleForm}>
        <input type="text" name="email" placeholder="Email" />
        <input type="password" name="senha" placeholder="Senha" />
        <input type="submit" value="Logar" />
      </form>
    </>
  );

}

export default Login;
