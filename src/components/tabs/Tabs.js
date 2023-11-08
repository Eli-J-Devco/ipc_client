import { NavLink } from "react-router-dom";
import styles from './Tabs.module.scss';

function Tabs({ routes }) {
    return (
        <div className={styles.crumb}>
            <ol className={`breadcrumb ${styles.breadcrumb}`}>
                {
                    routes.map(route => (
                        <li key={route.path} className="breadcrumb-item">
                            <NavLink to={route.path} className={(navData) => navData.isActive ? styles.active : ""} end>
                                {route.name}
                            </NavLink>
                        </li>
                    ))
                }
            </ol>
        </div>
    );
}

export default Tabs;