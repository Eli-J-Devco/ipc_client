import { NavLink } from "react-router-dom";
import styles from './BreadCrumb.module.scss';

function Breadcrumb({ routes }) {
    return (
        <div className={styles.crumb}>
            <ol className={`breadcrumb ${styles.breadcrumb}`}>
                {
                    routes.map(route => (
                        <li className="breadcrumb-item">
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

export default Breadcrumb;