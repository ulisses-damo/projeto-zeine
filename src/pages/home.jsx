import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/home.css";

export default function Home() {
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: "Carmen Lúcia",
      type: "Trabalho",
      phone: "(16) 3537-7333",
      email: "carmen.lucia@example.com",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    {
      id: 2,
      name: "Cristina Silveira",
      type: "Colega",
      phone: "(19) 2337-5664",
      email: "cristinasilveira98@example.com",
      avatar: "https://randomuser.me/api/portraits/women/66.jpg",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [activeLetter, setActiveLetter] = useState("A"); 
  const [search, setSearch] = useState("");

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name[0].toUpperCase() === activeLetter &&
      contact.name.toLowerCase().includes(search.toLowerCase())
  );

  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formAvatar, setFormAvatar] = useState(""); 

  const navigate = useNavigate();
  const addBtnTimer = useRef(null);

  // Função para mostrar o toast especial
  const handleAddBtnMouseEnter = () => {
    addBtnTimer.current = setTimeout(() => {
      toast.info("Tá esperando o quê? Boraa moeer!! 🚀");
    }, 7000);
  };

  const handleAddBtnMouseLeave = () => {
    clearTimeout(addBtnTimer.current);
  };

  const openModal = () => {
    setEditingContact(null);
    setFormName("");
    setFormPhone("");
    setFormEmail("");
    setFormAvatar("");
    setShowModal(true);
  };

  const openEditModal = (contact) => {
    setEditingContact(contact);
    setFormName(contact.name);
    setFormPhone(contact.phone);
    setFormEmail(contact.email);
    setFormAvatar(contact.avatar);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingContact(null);
    setFormName("");
    setFormPhone("");
    setFormEmail("");
    setFormAvatar("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formName || !formPhone || !formEmail) return;
    if (editingContact) {
      setContacts(
        contacts.map((c) =>
          c.id === editingContact.id
            ? {
                ...c,
                name: formName,
                phone: formPhone,
                email: formEmail,
                avatar: formAvatar || "../../images/account_.png",
              }
            : c
        )
      );
      toast.success("Editado com sucesso!");
    } else {
      // Adicionar
      const newContact = {
        id: Date.now(),
        name: formName,
        type: "Outro",
        phone: formPhone,
        email: formEmail,
        avatar: formAvatar || "../../images/account_.png",
      };
      setContacts([...contacts, newContact]);
      toast.success(`Contato ${formName} adicionado com sucesso!`);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    const contact = contacts.find((c) => c.id === id);
    setContacts(contacts.filter((c) => c.id !== id));
    toast.success(`Contato ${contact?.name} deletado com sucesso!`);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setFormAvatar(reader.result);
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (showModal) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [showModal]);

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    navigate("/");
  };

  const userEmail = localStorage.getItem("userEmail") || "Desconhecido";

  return (
    <>
      <ToastContainer />
      <div className="home-bg">
        <aside className="home-sidebar">
          <div className="home-logo">
            <img src="../../images/logo.png" alt="" />
          </div>
          <nav className="home-nav">
            <button className="home-nav-btn active">
              <img
                src="../../images/account_.png"
                alt="Contatos"
                className="home-nav-img"
              />
            </button>
            <button className="home-nav-btn">
              <img
                src="../../images/settings_.png"
                alt="Configurações"
                className="home-nav-img"
              />
            </button>
            <button className="home-nav-btn" onClick={handleLogout}>
              <img
                src="../../images/logout_.png"
                alt="Sair"
                className="home-nav-img"
              />
            </button>
          </nav>
          <div className="home-user">
            <span>Logado como:</span>
            <br />
            <span className="home-user-email">{userEmail}</span>
          </div>
        </aside>
        <main className="home-main">
          <div className="home-content">
            <h2>Lista de contatos</h2>
            <div className="home-header">
              <input
                className="home-search"
                placeholder="Pesquisar"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                className="home-add-btn"
                onClick={openModal}
                onMouseEnter={handleAddBtnMouseEnter}
                onMouseLeave={handleAddBtnMouseLeave}
              >
                + Adicionar contato
              </button>
            </div>
            <div className="home-list-container">
              <div className="home-alphabet">
                {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((l) => (
                  <div
                    key={l}
                    className={`home-letter${
                      l === activeLetter ? " active" : ""
                    }`}
                    onClick={() => setActiveLetter(l)}
                    style={{ cursor: "pointer" }}
                  >
                    {l}
                  </div>
                ))}
              </div>
              <div className="home-list">
                <div className="home-list-title">
                  <span>NOME</span>
                  <span>TELEFONE</span>
                  <span>EMAIL</span>
                  <span></span>
                </div>
                {filteredContacts.map((contact) => (
                  <div className="home-list-item" key={contact.id}>
                    <img
                      className="home-avatar"
                      src={contact.avatar}
                      alt={contact.name}
                    />
                    <div>
                      <div className="home-contact-name">{contact.name}</div>
                      <div className="home-contact-type">{contact.type}</div>
                    </div>
                    <span className="home-contact-phone">{contact.phone}</span>
                    <span className="home-contact-email">{contact.email}</span>
                    <div className="home-actions">
                      <button
                        className="home-edit-btn"
                        onClick={() => openEditModal(contact)}
                      >
                        Editar
                      </button>
                      <img
                        className="home-lock-btn"
                        src="../../images/lock_.png"
                        alt="Lock"
                      />
                      <img
                        className="home-delete-btn"
                        src="../../images/delete_.png"
                        alt="Delete"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDelete(contact.id)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button className="modal-close" onClick={closeModal}>
                ×
              </button>
              <h2>{editingContact ? "Editar contato" : "Adicionar contato"}</h2>
              <div className="modal-avatar-area">
                <img
                  src={formAvatar || "../../images/account_.png"}
                  alt="Avatar"
                  className="modal-avatar"
                />
                <label
                  className="modal-photo-btn"
                  style={{ cursor: "pointer" }}
                >
                  + Adicionar foto
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handlePhotoChange}
                  />
                </label>
              </div>
              <form onSubmit={handleSubmit}>
                <label>Nome</label>
                <input
                  type="text"
                  placeholder="Nome do contato"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                />
                <label>Telefone</label>
                <input
                  type="text"
                  placeholder="Número de telefone"
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                />
                <label>E-mail</label>
                <input
                  type="email"
                  placeholder="Email do contato"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                />
                <div className="modal-actions">
                  <button
                    type="button"
                    className="modal-cancel"
                    onClick={closeModal}
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="modal-save">
                    {editingContact ? "Salvar edição" : "Salvar"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}