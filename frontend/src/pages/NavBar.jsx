import { Outlet } from "react-router-dom";
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

                <NavbarDivider />
                <div>
                    <Link to="/" className="icons"> <Icon icon="home" size={20} /> </Link>
                    <Icon className="icons" icon="contrast" size={20} onClick={() => setDarkMode(!darkMode)} />

                    {/* onClick solo ejecuta funciones*/}
                    <button onClick={() => setOpen(true)}>
                        <Icon className="icons" icon="help" size={20} />
                    </button>

                    <HelpIcon open={open}
                        handleClose={() => setOpen(false)} ></HelpIcon>
                </div>

            </NavbarGroup>

            <div>
                <Outlet />
            </div>
        </div>
    );
}