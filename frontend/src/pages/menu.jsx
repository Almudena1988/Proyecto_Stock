import { Icon, NavbarDivider, NavbarGroup, Navbar } from "@blueprintjs/core";
import { Link } from "react-router-dom";


export function Menu({ darkMode, setDarkMode }) {
    return (
        <div className="menu">
            <div>
                <Navbar className="navbar">
                    <NavbarGroup>
                        <div className="textonavbar" >
                            <p className="texto">Gestor de Stock</p>
                            <p className="texto2">Ayuda</p>
                        </div>
                        <NavbarDivider />
                        <div>
                            <Icon className="icons" icon="home" size={20} />
                            <Icon className="icons" icon="contrast" size={20} onClick={() => setDarkMode(!darkMode)} />
                            <Icon className="icons" icon="help" size={20} />
                        </div>
                    </NavbarGroup>
                </Navbar>
            </div>

            <div className="lateral" >
                <p className="opcion"> <Link to="/">Inicio de sesión</Link></p>
                <p className="opcion"> <Link to="/proveedores" >Proveedores</Link></p>
                <p className="opcion"> <Link to="/productos" >Productos</Link></p>
                <p className="opcion"> <Link to="">Alertas</Link></p>
                <p className="opcion"> <Link to="/pedido">Pedidos</Link></p>
                <p className="opcion"> <Link to="/new"> Nuevo pedido</Link> </p>
                <p className="opcion"> <Link to="/modales"> Modales</Link> </p>
            </div>
        </div>
    );
}