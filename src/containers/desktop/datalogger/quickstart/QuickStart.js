import React from "react";
import { NavLink } from "react-router-dom";
function QuickStart(props) {
    return (
        <div className="main">
            <div className="crumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <NavLink to="/datalogger">
                            Daskboard
                        </NavLink>
                    </li>
                    <li className="breadcrumb-item active">Quick Start</li>
                </ol>
            </div>
            <div className="quick-start">
            </div>
        </div>
    );
}

export default QuickStart;