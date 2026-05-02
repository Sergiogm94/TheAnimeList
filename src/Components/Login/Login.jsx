import { useForm } from "react-hook-form";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import "./login.css";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const onSubmit = async (data) => {
    setLoading(true);
    setError("");

    try {
      const respuesta = await axios.post(
        "https://theanimelist-backend.onrender.com/login.php",
        data,
        { withCredentials: true, headers: {
        "Content-Type": "application/json"
        } }
      );

      if (respuesta.data.success) {
        await login(respuesta.data.usuario);
        navigate("/");  // Redirección automática al home.
      } else {
        setError(respuesta.data.mensaje);
      }
    } catch (error) {
      console.log(error);
      setError("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-box">
      <h2>Login</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Usuario o email</label>
        <input
          type="text"
          {...register("usuario", { required: true })}
          placeholder="Introduce tu usuario"
        />

        <label>Contraseña</label>
        <input
          type="password"
          {...register("contraseña", { required: true })}
          placeholder="••••••••"
        />

        <button type="submit" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>

      {error && <p className="error">{error}</p>}
    </div>
  );
}