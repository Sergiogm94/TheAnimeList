import { useForm } from "react-hook-form";
import { useState } from "react";

export default function Registro() {
    const {register,
        handleSubmit
    } = useForm();
    const [formData, setFormData] = useState(null);

    const onSubmit = (data) => {
        console.log(data);
        setFormData(data); // guardamos los datos
    };

    return(
        <div>
            <h1>Registro</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="username">Nombre de Usuario</label>
                    <input id="username" {...register("usuario")}/>
                <label htmlFor="email">Email</label>
                    <input id="email" {...register("email")}/>
                <label htmlFor="contraseña">Contraseña</label>
                    <input id="contraseña" {...register("contraseña")}/>
                    <button type="submit">Enviar</button>
            </form>
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