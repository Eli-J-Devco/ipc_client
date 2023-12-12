import React from "react";
import styles from './DCCombiner.module.scss';
import Breadcrumb from '../../../../../components/breadCrumb/BreadCrumb';



function DCCombiner(props) {
    
    return (
        <div className={styles.DCCombiner}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <Breadcrumb
                            routes={[
                                {
                                    path: "/scada/overview",
                                    name: "SCADA"
                                },
                                {
                                    path: "/scada/DCCombiner",
                                    name: "DCCombiner"
                                }
                            ]}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DCCombiner;