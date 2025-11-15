import { Route, Routes, Link } from 'react-router-dom';
import './App.css';

// Importando as páginas
import Produtos from './Paginas/produtos';
import Carrinho from './Paginas/carrinho';
import Login from './Paginas/login';
import AdminUsuarios from './Paginas/admin-usuarios';
import ErrorPage from './Paginas/Error';

interface User {
  name: string;
  email: string;
  senha: string;
  role: string;
  token: string;
}

function App() {
  const user = localStorage.getItem("tipo") ? { role: localStorage.getItem("tipo") } as User : null;

  if (user?.role === "admin") {
    return <li><Link to="/admin/usuarios" className="hover:text-gray-300">Admin</Link></li>
  }
  return (
    <>
      <header className="bg-gray-800 text-white p-4">
        <nav className="container mx-auto flex justify-between gap-4 items-center">
          <Link to="/" className="font-bold text-xl">LojaCelulares</Link>
          <ul className="flex items-center space-x-4">
            <li><Link to="/produtos" className="hover:text-gray-300">Produtos</Link></li>
            <li><Link to="/carrinho" className="hover:text-gray-300">Carrinho</Link></li>
            <li><Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Login</Link></li>
          </ul>
        </nav>
      </header>

      <main className="container mx-auto p-4">
        <Routes>
          {/* Rota principal e de produtos */}
          <Route path="/" element={<Produtos />} />
          <Route path="/produtos" element={<Produtos />} />
          
          {/* Outras páginas */}
          <Route path="/carrinho" element={<Carrinho />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/usuarios" element={<AdminUsuarios />} />
          <Route path="/error" element={<ErrorPage />} />
        </Routes>
      </main>
    </>
  )
}

export default App;
