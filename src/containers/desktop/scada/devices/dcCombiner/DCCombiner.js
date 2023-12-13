import React from "react";
import styles from './DCCombiner.module.scss';
import Breadcrumb from '../../../../../components/breadCrumb/BreadCrumb';



function DCCombiner(props) {

    return (
        <div className={styles.dc_combiner}>
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
                                    path: "/scada/devices",
                                    name: "Devices"
                                },
                                {
                                    path: "/scada/devices/setup/123",
                                    name: "INV 01"
                                },
                                {
                                    path: "",
                                    name: "DC Combiner"
                                }
                            ]}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-8">
                        <div className="row">
                            <div className="col-md-6">
                                <div className={styles.item_process}>
                                    <div className={styles.name}>DC Total Current</div>
                                    <div className={styles.value}>
                                        <div className={styles.value_process} style={{ width: "60%" }}></div>
                                    </div>
                                    <div className={styles.unit}>156.6 A</div>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className={styles.item_process}>
                                    <div className={styles.name}>DC Total Power</div>
                                    <div className={styles.value + ` ${styles.purple}`}>
                                        <div className={styles.value_process} style={{ width: "70%" }}></div>
                                    </div>
                                    <div className={styles.unit}>163.65 kW</div>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className={styles.item_process}>
                                    <div className={styles.name}>DC Total Voltage</div>
                                    <div className={styles.value + ` ${styles.green}`}>
                                        <div className={styles.value_process} style={{ width: "70%" }}></div>
                                    </div>
                                    <div className={styles.unit}>1044 V</div>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className={styles.item_process}>
                                    <div className={styles.name}>Box Temperature</div>
                                    <div className={styles.value + ` ${styles.red}`}>
                                        <div className={styles.value_process} style={{ width: "70%" }}></div>
                                    </div>
                                    <div className={styles.unit}>55 0C</div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="col-md-4"></div>

                    <div className="col-md-12">
                        <div className={styles.pannel}>
                            <div className={styles.list_pi}>
                                <div className={styles.list_line}>
                                    <div className={styles.item_line}>
                                        <span className={styles.wire_orange}></span>
                                        <span className={styles.wire_black}></span>
                                    </div>

                                    <div className={styles.item_line}>
                                        <span className={styles.wire_orange}></span>
                                        <span className={styles.wire_black}></span>
                                    </div>

                                    <div className={styles.item_line}>
                                        <span className={styles.wire_orange}></span>
                                        <span className={styles.wire_black}></span>
                                    </div>
                                    <div className={styles.item_line}>
                                        <span className={styles.wire_orange}></span>
                                        <span className={styles.wire_black}></span>
                                    </div>
                                    <div className={styles.item_line}>
                                        <span className={styles.wire_orange}></span>
                                        <span className={styles.wire_black}></span>
                                    </div>
                                    <div className={styles.item_line}>
                                        <span className={styles.wire_orange}></span>
                                        <span className={styles.wire_black}></span>
                                    </div>
                                    <div className={styles.item_line}>
                                        <span className={styles.wire_orange}></span>
                                        <span className={styles.wire_black}></span>
                                    </div>
                                    <div className={styles.item_line}>
                                        <span className={styles.wire_orange}></span>
                                        <span className={styles.wire_black}></span>
                                    </div>
                                    <div className={styles.item_line}>
                                        <span className={styles.wire_orange}></span>
                                        <span className={styles.wire_black}></span>
                                    </div>

                                    <div className={styles.item_line}>

                                    </div>

                                    <div className={styles.box_wi}>
                                        <div className={styles.box_co}>
                                            <span className={styles.text}>13.9 A</span>
                                            <span className={styles.line_left}></span>
                                            <span className={styles.line_right}></span>
                                        </div>
                                    </div>


                                </div>


                                <div className={styles.list_line}>
                                    <div className={styles.item_line}>
                                        <span className={styles.wire_orange}></span>
                                        <span className={styles.wire_black}></span>
                                    </div>

                                    <div className={styles.item_line}>
                                        <span className={styles.wire_orange}></span>
                                        <span className={styles.wire_black}></span>
                                    </div>

                                    <div className={styles.item_line}>
                                        <span className={styles.wire_orange}></span>
                                        <span className={styles.wire_black}></span>
                                    </div>
                                    <div className={styles.item_line}>
                                        <span className={styles.wire_orange}></span>
                                        <span className={styles.wire_black}></span>
                                    </div>
                                    <div className={styles.item_line}>
                                        <span className={styles.wire_orange}></span>
                                        <span className={styles.wire_black}></span>
                                    </div>
                                    <div className={styles.item_line}>
                                        <span className={styles.wire_orange}></span>
                                        <span className={styles.wire_black}></span>
                                    </div>
                                    <div className={styles.item_line}>
                                        <span className={styles.wire_orange}></span>
                                        <span className={styles.wire_black}></span>
                                    </div>
                                    <div className={styles.item_line}>
                                        <span className={styles.wire_orange}></span>
                                        <span className={styles.wire_black}></span>
                                    </div>
                                    <div className={styles.item_line}>
                                        <span className={styles.wire_orange}></span>
                                        <span className={styles.wire_black}></span>
                                    </div>

                                    <div className={styles.item_line}>

                                    </div>

                                    <div className={styles.box_wi}>
                                        <div className={styles.box_co}>
                                            <span className={styles.text}>13.9 A</span>
                                            <span className={styles.line_left}></span>
                                            <span className={styles.line_right}></span>
                                        </div>
                                    </div>


                                </div>


                                <div className={styles.list_line}>
                                    <div className={styles.item_line}>
                                        <span className={styles.wire_orange}></span>
                                        <span className={styles.wire_black}></span>
                                    </div>

                                    <div className={styles.item_line}>
                                        <span className={styles.wire_orange}></span>
                                        <span className={styles.wire_black}></span>
                                    </div>

                                    <div className={styles.item_line}>
                                        <span className={styles.wire_orange}></span>
                                        <span className={styles.wire_black}></span>
                                    </div>
                                    <div className={styles.item_line}>
                                        <span className={styles.wire_orange}></span>
                                        <span className={styles.wire_black}></span>
                                    </div>
                                    <div className={styles.item_line}>
                                        <span className={styles.wire_orange}></span>
                                        <span className={styles.wire_black}></span>
                                    </div>
                                    <div className={styles.item_line}>
                                        <span className={styles.wire_orange}></span>
                                        <span className={styles.wire_black}></span>
                                    </div>
                                    <div className={styles.item_line}>
                                        <span className={styles.wire_orange}></span>
                                        <span className={styles.wire_black}></span>
                                    </div>
                                    <div className={styles.item_line}>
                                        <span className={styles.wire_orange}></span>
                                        <span className={styles.wire_black}></span>
                                    </div>
                                    <div className={styles.item_line}>
                                        <span className={styles.wire_orange}></span>
                                        <span className={styles.wire_black}></span>
                                    </div>

                                    <div className={styles.item_line}>

                                    </div>

                                    <div className={styles.box_wi}>
                                        <div className={styles.box_co}>
                                            <span className={styles.text}>13.9 A</span>
                                            <span className={styles.line_left}></span>
                                            <span className={styles.line_right}></span>
                                        </div>
                                    </div>


                                </div>
                                <div className={styles.list_line}>
                                    <div className={styles.item_line}>
                                        <span className={styles.wire_orange}></span>
                                        <span className={styles.wire_black}></span>
                                    </div>

                                    <div className={styles.item_line}>
                                        <span className={styles.wire_orange}></span>
                                        <span className={styles.wire_black}></span>
                                    </div>

                                    <div className={styles.item_line}>
                                        <span className={styles.wire_orange}></span>
                                        <span className={styles.wire_black}></span>
                                    </div>
                                    <div className={styles.item_line}>
                                        <span className={styles.wire_orange}></span>
                                        <span className={styles.wire_black}></span>
                                    </div>
                                    <div className={styles.item_line}>
                                        <span className={styles.wire_orange}></span>
                                        <span className={styles.wire_black}></span>
                                    </div>
                                    <div className={styles.item_line}>
                                        <span className={styles.wire_orange}></span>
                                        <span className={styles.wire_black}></span>
                                    </div>
                                    <div className={styles.item_line}>
                                        <span className={styles.wire_orange}></span>
                                        <span className={styles.wire_black}></span>
                                    </div>
                                    <div className={styles.item_line}>
                                        <span className={styles.wire_orange}></span>
                                        <span className={styles.wire_black}></span>
                                    </div>
                                    <div className={styles.item_line}>
                                        <span className={styles.wire_orange}></span>
                                        <span className={styles.wire_black}></span>
                                    </div>

                                    <div className={styles.item_line}>

                                    </div>

                                    <div className={styles.box_wi}>
                                        <div className={styles.box_co}>
                                            <span className={styles.text}>13.9 A</span>
                                            <span className={styles.line_left}></span>
                                            <span className={styles.line_right}></span>
                                        </div>
                                    </div>


                                </div>
                                <div className={styles.list_line}>
                                    {/* <div className={styles.item_line_empty}>
                                    </div> */}

                                    <div className={styles.item_line}>
                                        <span className={styles.wire_orange}></span>
                                        <span className={styles.wire_black}></span>
                                    </div>

                                    <div className={styles.item_line}>
                                        <span className={styles.wire_orange}></span>
                                        <span className={styles.wire_black}></span>
                                    </div>

                                    <div className={styles.item_line}>
                                        <span className={styles.wire_orange}></span>
                                        <span className={styles.wire_black}></span>
                                    </div>
                                    <div className={styles.item_line}>
                                        <span className={styles.wire_orange}></span>
                                        <span className={styles.wire_black}></span>
                                    </div>
                                    <div className={styles.item_line}>
                                        <span className={styles.wire_orange}></span>
                                        <span className={styles.wire_black}></span>
                                    </div>
                                    <div className={styles.item_line}>
                                        <span className={styles.wire_orange}></span>
                                        <span className={styles.wire_black}></span>
                                    </div>
                                    <div className={styles.item_line}>
                                        <span className={styles.wire_orange}></span>
                                        <span className={styles.wire_black}></span>
                                    </div>
                                    <div className={styles.item_line}>
                                        <span className={styles.wire_orange}></span>
                                        <span className={styles.wire_black}></span>
                                    </div>
                                    <div className={styles.item_line}>
                                        <span className={styles.wire_orange}></span>
                                        <span className={styles.wire_black}></span>
                                    </div>

                                    <div className={styles.item_line}>

                                    </div>

                                    <div className={styles.box_wi}>
                                        <div className={styles.box_co}>
                                            <span className={styles.text}>13.9 A</span>
                                            <span className={styles.line_left}></span>
                                            <span className={styles.line_right}></span>
                                        </div>
                                    </div>


                                </div>
                            </div>
                            <div className={styles.item_inv}>
                                <span className={styles.line_inv_left}></span>
                                <div className={styles.box_line_inv}>
                                    <div className={styles.inv}></div>
                                    <div className={styles.scb}>
                                        <div className={styles.dot}>
                                            <div className={styles.line_wri}></div>
                                        </div>
                                        <div className={styles.dot_string}>SCB</div>
                                    </div>
                                </div>

                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DCCombiner;