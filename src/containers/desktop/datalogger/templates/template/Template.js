import useTemplate from "./useTemplate";
import styles from './Template.module.scss';
import NavTabs from "../../../../../components/navTabs/NavTabs";
import { Outlet } from "react-router-dom";

function Template() {
    const { name } = useTemplate();

    return (
        <div className={styles.template} >
            <header className={styles.header} >
                {`Modbus Template: [${name}]`}
            </header>
            
            <div className={styles.body}>
                <NavTabs
                    routes={[
                        {
                            path: `/datalogger/templates/${name}/points`,
                            name: "Point List"
                        },
                        {
                            path: `/datalogger/templates/${name}/registers`,
                            name: "Register Blocks"
                        },
                        {
                            path: `/datalogger/templates/${name}/advanced`,
                            name: "Advanced"
                        }
                    ]}
                />

                <div className={styles.outlet}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Template;