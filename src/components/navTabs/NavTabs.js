import { NavLink } from "react-router-dom";
import styles from './NavTabs.module.scss';

function NavTabs({ routes, className }) {
    return (
        <div className={`${styles.tabs} ${className ? className : ""}`} >
            <ul className="nav nav-tabs border-bottom-0">
                {
                    routes ? routes.map(route => (
                        <li key={route.path} className="nav-item">
                            <NavLink to={route.path} className={(navData) => `nav-link m-0 border-0 ${navData.isActive ? styles.active : ""}`} end>
                                {route.name}
                            </NavLink>
                        </li>
                    )) : null
                }
            </ul>
        </div>
    );
}

export default NavTabs;