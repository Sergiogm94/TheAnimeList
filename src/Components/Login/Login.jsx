import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Login() {
    const {register,
        handleSubmit
    } = useForm();  // Inicializa el formularío.
     const [formData, setFormData] = useState(null);
     const navigate = useNavigate();
     const [error, setError] = useState("");
     const { login } = useContext(AuthContext);

    const onSubmit = async (data) => {
        try {
            console.log(data);

            const respuesta = await axios.post("http://localhost/TheAnimeList-Backend/login.php",
                data, {withCredentials: true});
                console.log(respuesta.data);
        
        if (respuesta.data.success) {
                // login correcto
                await login(respuesta.data.usuario);
                navigate("/");
            } else {
                setError(respuesta.data.mensaje);
            }
                setFormData(data); // guardamos los datos

        } catch (error) {
            console.log(error);
            setError("Error de conexión con el servidor");
        }
    };
      
    

    return(
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="username">Nombre de Usuario o email</label>
                    <input id="username" {...register("usuario", {required: true})}/>
                <label htmlFor="contraseña">Contraseña</label>
                    <input id="contraseña" type="password" {...register("contraseña", {required:true})}/>
                    <button type="submit">Enviar</button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
                        {/* Mostrar datos */}
            {formData && (
                <div>
                    <h2>Datos enviados:</h2>
                    <p>Usuario: {formData.usuario}</p>
                    <p>Contraseña: {formData.contraseña}</p>
                </div>
            )}
        </div>
    );
};