import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./registro.css";

export default function Registro() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mostrarPassword, setMostrarPassword] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    setError("");

    try {
      const respuesta = await axios.post(
        "https://theanimelist-backend.onrender.com/register.php",
        data
      );

      if (respuesta.data.success) {
        navigate("/loginreg");
      } else {
        setError(respuesta.data.mensaje || "Error al registrarse");
      }
    } catch (error) {
      setError("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-box">
      <h1>Registro</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Nombre de Usuario</label>
        <input
          type="text"
          placeholder="Usuario"
          {...register("usuario", { required: true })}
        />

        <label>Email</label>
        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: true })}
        />

        <label>Contraseña</label>
        <input
          type={mostrarPassword ? "text" : "password"}
          placeholder="••••••••"
          {...register("contraseña", { required: true })}
        />

        {/* Checkbox para mostrar contraseña */}
        <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <input
            type="checkbox"
            checked={mostrarPassword}
            onChange={() => setMostrarPassword(!mostrarPassword)}
          />
          Mostrar contraseña
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Creando cuenta..." : "Enviar"}
        </button>
      </form>

      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
    </div>
  );
}