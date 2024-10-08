import React, { useState } from "react";
import "./LoginPaciente.css";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { loginPaciente } from "../../../servicios/pacienteService";

function LoginPaciente() {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginPaciente(correo, password);
      const pacienteId = response.data.id; // Obtener el ID del paciente desde la respuesta
      
      // Guardar el ID del paciente en localStorage
      localStorage.setItem("pacienteId", pacienteId);
      
      navigate(`/perfil-paciente/${pacienteId}`); // Redirigir al perfil del paciente con su ID
    } catch (err) {
      setError("Credenciales incorrectas. Inténtalo de nuevo.");
    }
  };

  const redirectToRegister = () => {
    navigate("/register-paciente"); // Cambia esta ruta según tu configuración de registro
  };

  const redirectToDoctorLogin = () => {
    navigate("/login-doctor"); // Redirigir al login del doctor
  };

  return (
    <div className="login-paciente">
      <div className="cosas-login">
        <form onSubmit={handleLogin}>
          <h1>INICIAR SESION PACIENTE</h1>
          <div className="input-box">
            <FaUser className="icono" />
            <input
              type="text"
              placeholder="Correo electrónico"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
          </div>
          <div className="input-box">
            <FaLock className="icono" />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <div className="recuperar-contraseña">
            <a href="#">
              <p>¿Olvidaste tu contraseña?</p>
            </a>
          </div>
          <button type="submit">Ingresar</button>

          {/* Nueva sección para registrarse */}
          <div className="registrarse">
            <p>
              ¿No tienes cuenta?{" "}
              <span onClick={redirectToRegister} className="register-link" style={{ cursor: "pointer", color: "blue" }}>
                Regístrate ahora
              </span>
            </p>
          </div>

          <div className="login-doctor-link">
            <p>
              ¿No eres paciente?{" "}
              <span onClick={redirectToDoctorLogin} className="doctor-login-link" style={{ cursor: "pointer", color: "blue" }}>
                Inicia sesión como doctor
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPaciente;
