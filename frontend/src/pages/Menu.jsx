import { Icon, NavbarDivider, NavbarGroup, Navbar } from "@blueprintjs/core";
import { Link } from "react-router-dom";
import { HelpIcon } from '../pages/HelpMenu.jsx';
import { useState } from 'react';


export function Menu({ darkMode, setDarkMode }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="menu">
            <div>
                <Navbar className="navbar">
                    <NavbarGroup>
                        <div className="textonavbar" >
                            <h2> LabStock <span style={{ color: "green" }}>Control</span></h2>

                        </div>
                        <NavbarDivider />
                        <div>
                            <Link to="/" className="icons"> <Icon icon="home" size={20} /> </Link>
                            <Icon className="icons" icon="contrast" size={20} onClick={() => setDarkMode(!darkMode)} />
                            {/* onClick solo ejecuta funciones*/}
                            <button onClick={() => setOpen(true)}>
                                <Icon className="icons" icon="help" size={20} />
                            </button>

                        </div>
                    </NavbarGroup>
                </Navbar>
                <HelpIcon open={open}
                    handleClose={() => setOpen(false)} ></HelpIcon>
            </div>

            <div className="lateral" >

                <p className="opcion"> <Link to="/proveedores" >Proveedores</Link></p>
                <p className="opcion"> <Link to="/productos" >Productos</Link></p>
                <p className="opcion"> <Link to="/pedido">Pedidos</Link></p>
                <p className="opcion"> <Link to="/new"> Nuevo pedido</Link> </p>
                <p className="opcion"> <Link to="/">Salir</Link></p>

            </div>
        </div>
    );
}