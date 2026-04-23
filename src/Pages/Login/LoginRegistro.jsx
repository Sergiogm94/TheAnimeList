import { useState } from "react";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import Nav from "../../Components/Nav/Nav";
import Login from "../../Components/Login/Login";
import Registro from "../../Components/Registro/Registro";
import "./loginRegistro.css";

export default function LoginRegistro() {
  const [mostrarLogin, setMostrarLogin] = useState(true);

  return (
    <div>
      <Header />
      <Nav />

      <div className="login-page">
        <h1 className="title">Acceso a la plataforma</h1>

        <div className="tabs">
          <button
            className={mostrarLogin ? "active" : ""}
            onClick={() => setMostrarLogin(true)}
          >
            Login
          </button>

          <button
            className={!mostrarLogin ? "active" : ""}
            onClick={() => setMostrarLogin(false)}
          >
            Registro
          </button>
        </div>

        <div className="form-container">
          {mostrarLogin ? (
            <div className="fade">
              <Login />
            </div>
          ) : (
            <div className="fade">
              <Registro />
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}