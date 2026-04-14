import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [mensaje, setMensaje] = useState('');

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
        <div>
            <div>
                <h3 className='titulo'> Inicio de sesión</h3>

            </div>
            <div>
                <h3>Usuario:</h3>
                <input className='usuario' type="text" placeholder='Introduce el nombre de usuario' onChange={(e) => setUsername(e.target.value)} />

                <h3>Contraseña:</h3>
                <input className='pass' type="password" placeholder='Introduce la contraseña' onChange={(e) => setPassword(e.target.value)} />

                <br /><br />
                <button onClick={handleLogin}>Entrar</button>

                <p>{mensaje}</p>
            </div>

        </div>
    );
}

