import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Register.css";
import api from "../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const minLength = password.length >= 8;
  const hasNumberOrSymbol = /[\d\W]/.test(password);
  const passwordsMatch = password === repeatPassword && password !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
      });
      toast.success("Usuário criado com sucesso!");
      // Redirecione ou limpe o formulário se quiser
    } catch (err) {
      toast.error("Erro ao criar usuário: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="register-container">
        <div className="register-left">
          <div className="register-logo">
            <img src="../../images/logo.png" alt="Logo" />
          </div>
        </div>
        <div className="register-right">
          <div className="register-access">
            Já tem uma conta?{" "}
            <Link to="/" className="register-link">
              Acessar conta
            </Link>
          </div>
          <h2>Criar conta</h2>
          <form onSubmit={handleSubmit}>
            <div className="register-field">
              <label>Nome</label>
              <input
                type="text"
                placeholder="Como você se chama?"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="register-field">
              <label>E-mail</label>
              <input
                type="email"
                placeholder="Seu e-mail aqui"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="register-field">
              <label>Senha</label>
              <input
                type="password"
                placeholder="Escolha uma senha segura"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="register-field">
              <label>Repetir a senha</label>
              <input
                type="password"
                placeholder="Repita sua senha para confirmar"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
              />
            </div>
            <div className="register-validations">
              <div className={minLength ? "valid" : "invalid"}>
                <span>{minLength ? "✔️" : "❌"}</span> Pelo menos 8 caracteres
              </div>
              <div className={hasNumberOrSymbol ? "valid" : "invalid"}>
                <span>{hasNumberOrSymbol ? "✔️" : "❌"}</span> Contém um número ou símbolo
              </div>
              <div className={passwordsMatch ? "valid" : "invalid"}>
                <span>{passwordsMatch ? "✔️" : "❌"}</span> As senhas devem ser iguais
              </div>
            </div>
            <button
              type="submit"
              className="register-btn"
              disabled={!(minLength && hasNumberOrSymbol && passwordsMatch)}
            >
              Criar conta
            </button>
          </form>
        </div>
      </div>
    </>
  );
}