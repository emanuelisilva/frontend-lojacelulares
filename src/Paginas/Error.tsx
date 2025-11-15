import { useSearchParams } from "react-router-dom";

export default function ErrorPage() {
  const [searchParams] = useSearchParams();
  const mensagem = searchParams.get("mensagem");

  return (
    <div style={{ color: 'red', padding: '20px', border: '1px solid red', borderRadius: '5px', margin: '20px' }}>
      <h2>Ocorreu um Erro</h2>
      <p>{mensagem || "Algo deu errado. Por favor, tente novamente."}</p>
    </div>
  );
}
