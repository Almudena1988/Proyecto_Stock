import { Icon, NavbarDivider, NavbarGroup, Navbar } from "@blueprintjs/core";
import { Link } from "react-router-dom";
import { HelpIcon } from '../pages/HelpMenu.jsx';


export function Menu() {    

    return (
        <div className="layout">
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