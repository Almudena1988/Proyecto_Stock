import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@blueprintjs/core'


export function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleLogin = () => {

        // Validación para evitar campos vacíos

        if (username.trim() === '' || password.trim() === '') {
            setMensaje('Todos los campos son obligatorios');
            return;
        }
        // Usuario de prueba

        if (username === 'admin' && password === '1234') {
            setMensaje('Login correcto');
            navigate('/home');

        } else {
            setMensaje('Datos incorrectos');
        }
    };

    return (
        
            <div className='login'>

                <div>
                    <h1> LabStock <span style={{ color: "green" }}>Control</span></h1>
                    <p>-Sistema de gestión de inventario-</p>
                </div>
                <div className='welcome-container'>
                    <h3>Bienvenido</h3>
                    <p>Inicio de sesión</p>
                </div>

                <label>Usuario:</label>
                <div className='user-container'>
                    <input
                        className='user-input'
                        type="text"
                        placeholder='Introduce el nombre de usuario'
                        onChange={(e) => setUsername(e.target.value)} />
                </div>

                <label>Contraseña:</label>
                <div className='pass-container'>
                    <input
                        className='pass-input'
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Introduce la contraseña'
                        onChange={(e) => setPassword(e.target.value)} />


                    <Icon
                        className='hide-show-pass'
                        icon={showPassword ? "eye-off" : "eye-open"}
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ cursor: "pointer" }} />
                </div>
                <div className='remember-input'>
                    <label> <input type="checkbox" /> Recordar usuario</label>
                </div>

                <button
                    style={{ cursor: "pointer" }}
                    className='enter-button'
                    onClick={handleLogin}>
                    Entrar
                </button>

                <p>{mensaje}</p>
            </div>
        

    );
}

