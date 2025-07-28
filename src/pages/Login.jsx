import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/Login.css";
import api from "../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/login", {
        email,
        password,
      });
      toast.success("Login realizado com sucesso!");
      localStorage.setItem("userEmail", email);
      navigate("/home");
      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } catch (err) {
      toast.error(
        "Erro ao fazer login: " + (err.response?.data?.error || err.message)
      );
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="login-container">
        <div className="login-left">
          <div className="login-logo">
            <img src="../../images/logo.png" alt="Logo" />
          </div>
        </div>
        <div className="login-right">
          <div className="login-access">
            Não tem uma conta?{" "}
            <Link to="/register" className="login-link">
              Criar conta
            </Link>
          </div>
          <h2>Acessar conta</h2>
          <form onSubmit={handleSubmit}>
            <div className="login-field">
              <label>E-mail</label>
              <input
                type="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="login-field">
              <label>Senha</label>
              <input
                type="password"
                placeholder="Insira sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="login-btn"
              disabled={!email || !password}
            >
              Acessar conta
            </button>
          </form>
        </div>
      </div>
    </>
  );
}