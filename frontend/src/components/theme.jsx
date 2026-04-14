
import { useState } from "react";

export function Theme() {

    const [darkmode, setDarkMode] = useState(false);

    return (
        <div className={darkmode ? "bp5-dark dark" : "light"}>
            <button onClick={() => setDarkMode(!darkmode)}>
                <Icon className="icons" icon="contrast" size={20} />
            </button>
        </div>
    )
}