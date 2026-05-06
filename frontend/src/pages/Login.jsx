import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@blueprintjs/core'


export function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleLogin = () => {

        // Validación para evitar campos vacíos

        if (username.trim() === '' || password.trim() === '') {
            setMessage('Todos los campos son obligatorios');
            return;
        }
        // Usuario de prueba

        if (username === 'admin' && password === '1234') {
            setMessage('Login correcto');
            navigate('/home');

        } else {
            setMessage('Datos incorrectos');
        }
    };

    return (

        <div className='login'>

            <div className='title-container'>
                <h1> Lab<span style={{ color: "green" }}>Stock </span>Control</h1>
                <p>Sistema de gestión de inventario</p>
            </div>
            <div className='welcome-container'>
                <h3><span style={{ color: "green", fontSize:"22px" }}>Bienvenido</span></h3>
               
            </div>

            <label>Usuario:</label>
            <div className='user-container'>
                <input
                    className='user-input'
                    type="text"
                    placeholder='Nombre de usuario'
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
                className='enter-button'
                style={{ cursor: "pointer" }}
                onClick={handleLogin}>

                Entrar

            </button>

            <p>{message}</p>
        </div>


    );
}

