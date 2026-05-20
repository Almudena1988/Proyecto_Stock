import { Icon, NavbarDivider, NavbarGroup, Navbar } from '@blueprintjs/core'
import { useState } from 'react';
import { Link, NavLink } from "react-router-dom";
import { HelpIcon } from './HelpMenu.jsx';


export function NavBar({ darkMode, setDarkMode }) {
    const [open, setOpen] = useState(false);


    return (
        <div className="main-container">

            <NavbarGroup className="navbar-group">

                <div className="textonavbar" >
                    <h2> Lab<span style={{ color: "green" }}>Stock </span>Control</h2>
                </div>

                <div className="routes">
                    {/* NavLink, componente de React Router, sabe si la ruta actual coincide con el enlace.
                    Cuando la ruta en la que estoy y to="ruta" coinciden, se da isActive (boolean) */}
                    <NavLink
                        className='link'
                        to="/proveedores"
                        style={({ isActive }) => ({
                            fontWeight: isActive ? "bold" : undefined,
                            fontSize: isActive ? "16px" : undefined,
                            color: isActive ? "black" : undefined,
                            backgroundColor: isActive ? "#f2eaea" : undefined,
                            borderRadius: isActive ? "8px" : undefined
                        })}>

                        Proveedores

                    </NavLink>

                    <NavLink
                        className='link'
                        to="/productos"
                        style={({ isActive }) => ({
                            fontWeight: isActive ? "bold" : undefined,
                            fontSize: isActive ? "16px" : undefined,
                            color: isActive ? "black" : undefined,
                            backgroundColor: isActive ? "#f2eaea" : undefined,
                            borderRadius: isActive ? "8px" : undefined
                        })}>

                        Productos

                    </NavLink>
                    

                    <NavLink
                        className='link'
                        to="/new"
                        style={({ isActive }) => ({
                            fontWeight: isActive ? "bold" : undefined,
                            fontSize: isActive ? "16px" : undefined,
                            color: isActive ? "black" : undefined,
                            backgroundColor: isActive ? "#f2eaea" : undefined,
                            borderRadius: isActive ? "8px" : undefined
                        })}>

                        Nuevo pedido

                    </NavLink>
                    <NavLink
                        className='link'
                        to="/order_products"
                        style={({ isActive }) => ({
                            fontWeight: isActive ? "bold" : undefined,
                            fontSize: isActive ? "16px" : undefined,
                            color: isActive ? "black" : undefined,
                            backgroundColor: isActive ? "#f2eaea" : undefined,
                            borderRadius: isActive ? "8px" : undefined
                        })}>

                        Historial de pedidos

                    </NavLink>
                </div>

                <div className="navbar-icon">

                    <NavbarDivider />

                    <NavLink
                        to="/productos"
                        style={({ isActive }) => ({
                            fontWeight: isActive ? "bold" : undefined,
                            fontSize: isActive ? "16px" : undefined,
                            color: isActive ? "black" : undefined,
                            backgroundColor: isActive ? "#f2eaea" : undefined,
                            borderRadius: isActive ? "8px" : undefined
                        })} >
                        <Icon
                            className="home-icon"
                            icon="home"
                            size={20}
                            color='black'

                        />
                    </NavLink>

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