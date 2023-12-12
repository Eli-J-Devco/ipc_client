import { NavLink } from "react-router-dom";
import styles from './BreadCrumb.module.scss';

function Breadcrumb({ routes }) {
    return (
        <div className={styles.crumb}>
            <ol className={`breadcrumb ${styles.breadcrumb}`}>
                {
                    routes ? 
                    routes.map(route => (
                        <li key={route.path} className="breadcrumb-item">
                            <NavLink to={route.path} className={(navData) => navData.isActive ? styles.active : ""} end>
                                {route.name}
                            </NavLink>
                        </li>
                    )) : null
                }
            </ol>
        </div>
    );
}

export default Breadcrumb;