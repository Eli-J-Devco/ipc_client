import React from "react";
import { Outlet } from 'react-router-dom';
import Header from "./header/Header";
import Footer from "./footer/Footer";
import LeftMenu from "./leftMenu/LeftMenu";

function Datalogger(props){
    return (
        <div className="datalogger">
            <Header />
            <LeftMenu />
            <Outlet />
            <Footer />
        </div>
    );
}

export default Datalogger;