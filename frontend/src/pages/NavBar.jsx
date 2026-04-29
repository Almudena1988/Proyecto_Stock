import { Outlet } from "react-router-dom"; // Sirve para renderizar rutas hijas dentro de este layout.
import { Icon, NavbarDivider, NavbarGroup, Navbar } from '@blueprintjs/core'
import { useState } from 'react';
import { Link } from "react-router-dom";
import { HelpIcon } from './HelpMenu.jsx';

export function NavBar({ darkMode, setDarkMode }) {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <Navbar className="navbar" darkMode={darkMode} setDarkMode={setDarkMode} />
            <NavbarGroup className="navbar-group">

                <div className="textonavbar" >
                    <h2> LabStock <span style={{ color: "green" }}>Control</span></h2>
                </div>

                <NavbarDivider className="navbar-divider" />
                
                <div className="navbar-icon">
                    <Link to="/" className="home-icon"> <Icon icon="home" size={20} /> </Link>

                    <Icon className="mode-icon" 
                    icon="contrast" 
                    style={{ cursor: "pointer" }} 
                    size={20} 
                    onClick={() => setDarkMode(!darkMode)} />

                    {/* onClick siempre recibe una función. Esa función puede:
                    cambiar de estado, llamar funciones*/}
                    <button onClick={() => setOpen(true)}>
                        <Icon className="help-icon" 
                        icon="help" 
                        size={20} 
                        style={{ cursor: "pointer" }} />
                    </button>

                    <HelpIcon open={open}
                        handleClose={() => setOpen(false)} ></HelpIcon>
                </div>

            </NavbarGroup>

            <div>
                <Outlet /> {/* React Router renderiza las rutas hijas*/}
            </div>
        </div>
    );
}