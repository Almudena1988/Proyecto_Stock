import { Icon, NavbarDivider, NavbarGroup, Navbar } from '@blueprintjs/core'
import { useState } from 'react';
import { Link } from "react-router-dom";
import { HelpIcon } from './HelpMenu.jsx';


export function NavBar({ darkMode, setDarkMode }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="main-container">

            <Navbar className="navbar" />

            <NavbarGroup className="navbar-group">

                <div className="textonavbar" >
                    <h2> Lab<span style={{ color: "green" }}>Stock </span>Control</h2>
                </div>

                <div className="routes">
                    <Link className='link' to="/proveedores">Proveedores</Link>
                    <Link className='link' to="/productos">Productos</Link>
                    <Link className='link' to="/pedido">Pedidos</Link>
                    <Link className='link' to="/new">Nuevo pedido</Link>
                </div>
                <div className="navbar-divider">
                    <NavbarDivider />
                </div>
                <div className="navbar-icon">

                    <Link to="/home" > <Icon className="home-icon" icon="home" size={20} color='black' /> </Link>

                    <Icon className="mode-icon"
                        icon="contrast"
                        style={{ cursor: "pointer" }}
                        size={20}
                        onClick={() => setDarkMode(!darkMode)} />

                    {/* onClick siempre recibe una función. Esa función puede:
                    cambiar de estado, llamar funciones...*/}

                    <Icon className="help-icon"
                        onClick={() => setOpen(true)}
                        color='green'
                        icon="help"
                        size={20}
                        style={{ cursor: "pointer" }} />

                    <HelpIcon open={open} handleClose={() => setOpen(false)} ></HelpIcon>

                    <Link to="/" ><Icon className='log-out-icon'
                        icon="log-out"
                        color='black'
                        size={20}                       
                        style={{ cursor: "pointer" }}></Icon></Link>

                </div>

            </NavbarGroup>

        </div>
    );
}