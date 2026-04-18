import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Registro() {
    const {register,
        handleSubmit
    } = useForm();
    const [formData, setFormData] = useState(null);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
                console.log(data);
                const respuesta = await axios.post("http://localhost/TheAnimeList-Backend/register.php", data,   
                );
                 console.log(respuesta.data);
                 if(respuesta.data.success){
                    navigate("/loginreg");
                 };
                 
            setFormData(data); // guardamos los datos en frontend
                
        } catch (error) {
            console.log("Error al enviar los datos", error)
        }
       
    };

    return(
        <div>
            <h1>Registro</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="username">Nombre de Usuario</label>
                    <input id="username" type="text" {...register("usuario", {required:true})}/>
                <label htmlFor="email">Email</label>
                    <input id="email" type="email" {...register("email", {required:true})}/>
                <label htmlFor="contraseña">Contraseña</label>
                    <input id="contraseña" type="password" {...register("contraseña", {required:true})}/>
                    <button type="submit">Enviar</button>
            </form>
             /* Mostrar datos */
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