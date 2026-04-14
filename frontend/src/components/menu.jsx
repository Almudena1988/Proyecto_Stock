import { Icon, NavbarDivider, NavbarGroup, Navbar } from "@blueprintjs/core";
import { Link } from "react-router-dom";


export function Menu({ darkMode, setDarkMode }) {
    return (
        <div>
            <div>
                <Navbar className="navbar">
                    <NavbarGroup>
                        <div className="textonavbar" >
                            <p className="texto">Gestor de Stock</p>
                            <p className="texto2">Ayuda</p>
                        </div>
                        <NavbarDivider />
                        <div >
                            <Icon className="icons" icon="home" size={20} />
                            <Icon className="icons" icon="contrast" size={20} onClick={() => setDarkMode(!darkMode)} />
                            <Icon className="icons" icon="help" size={20} />
                        </div>
                    </NavbarGroup>
                </Navbar>
            </div>

            <div>
                <p> <Link to="/">Inicio de sesión</Link></p>
                <p> <Link to="/proveedores" >Proveedores</Link></p>
                <p> <Link to="/productos" >Productos</Link></p>
            </div>
        </div>
    );
}