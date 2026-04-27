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

            <h3> Inicio de sesión</h3>

            <h3>Usuario:</h3>
            <div className='pass-container'>
                <input

                    type="text"
                    placeholder='Introduce el nombre de usuario'
                    onChange={(e) => setUsername(e.target.value)} />
            </div>

            <h3>Contraseña:</h3>
            <div>
                <input

                    type={showPassword ? 'text' : 'password'}
                    placeholder='Introduce la contraseña'
                    onChange={(e) => setPassword(e.target.value)} />


                <Icon
                    className='hide-show-pass'
                    icon={showPassword ? "eye-off" : "eye-open"}
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ cursor: "pointer" }} />
            </div>
            <br /><br />

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

