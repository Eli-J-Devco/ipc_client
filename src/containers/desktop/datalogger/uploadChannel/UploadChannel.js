import { Outlet } from "react-router-dom";
import Breadcrumb from "../../../../components/breadCrumb/BreadCrumb";
import styles from './UploadChannel.module.scss';
import NavTabs from "../../../../components/navTabs/NavTabs";

function UploadChannel() {

    return (
        <div className="main">
            <Breadcrumb
                routes={[
                    {
                        path: "/datalogger",
                        name: "Dashboard"
                    },
                    {
                        path: "/datalogger/upload",
                        name: "Upload Channels"
                    }
                ]}
            />


            <div className={styles.upload_channels}>
                <NavTabs
                    routes={[
                        {
                            path: "/datalogger/upload",
                            name: "Upload Channels"
                        },
                        {
                            path: "/datalogger/upload/schedule",
                            name: "Upload Schedule"
                        }
                    ]}
                />

                <div className={styles.outlet}>
                    {<Outlet />}
                </div>
            </div>
        </div>
    );
}

export default UploadChannel;