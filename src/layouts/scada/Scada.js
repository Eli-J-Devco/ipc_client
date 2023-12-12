import React from "react";
import { Outlet } from 'react-router-dom';
import Header from "./header/Header";
// import TopMenu from './topMenu/TopMenu';

function Scada(props) {
    return (
        <div className="scada">
            <Header />
            {/* <TopMenu /> */}
            <Outlet />
        </div>
    );
}

export default Scada;