
import { Icon, NavbarDivider, NavbarGroup, Navbar } from '@blueprintjs/core'
import { useState } from 'react';
import { Link } from "react-router-dom";
import { HelpIcon } from './HelpMenu.jsx';


export function NavBar({ darkMode, setDarkMode }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="main-container">
            <Navbar className="navbar"  />
            <NavbarGroup className="navbar-group">

                <div className="textonavbar" >
                    <h2> LabStock <span style={{ color: "green" }}>Control</span></h2>
                </div>
                <div className="routes">
                    <Link to="/proveedores">Proveedores</Link>
                    <Link to="/productos">Productos</Link>
                    <Link to="/pedido">Pedidos</Link>
                    <Link to="/new">Nuevo pedido</Link>
                </div>

                <div className="navbar-icon">
                    <NavbarDivider className="navbar-divider" />
                    <Link to="/" className="home-icon"> <Icon icon="home" size={20} /> </Link>

                    <Icon className="mode-icon"
                        icon="contrast"
                        style={{ cursor: "pointer" }}
                        size={20}
                        onClick={() => setDarkMode(!darkMode)} />

                    {/* onClick siempre recibe una función. Esa función puede:
                    cambiar de estado, llamar funciones*/}

                    <Icon className="help-icon"
                        onClick={() => setOpen(true)}
                        icon="help"
                        size={20}
                        style={{ cursor: "pointer" }} />

                    <HelpIcon open={open}
                        handleClose={() => setOpen(false)} ></HelpIcon>
                </div>

            </NavbarGroup>
            
        </div>
    );
}