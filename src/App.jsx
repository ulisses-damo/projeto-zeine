import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css'
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/home.jsx";

function App() {

  return (
    <BrowserRouter>
     
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        {/* Adicione outras rotas aqui se quiser */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
