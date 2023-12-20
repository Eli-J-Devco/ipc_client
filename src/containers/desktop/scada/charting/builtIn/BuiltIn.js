import styles from "./BuiltIn.module.scss";
import { ReactComponent as DownArrow } from "../../../../../assets/images/down-filled-triangular-arrow.svg";
import { ReactComponent as Filter } from "../../../../../assets/images/filter.svg";
import ExpandableList from "../../../../../components/expandableList/ExpandableList";
import useBuiltIn from "./useBuiltIn";
import VerticalTabs from "../../../../../components/verticalTabs/VerticalTabs";
import FormInput from "../../../../../components/formInput/FormInput";
import Button from "../../../../../components/button/Button";

function BuiltIn() {
    const {
        isExpand, handleOnExpand,
        isBasicExpand, handleOnBasicExpand, basicVoltageList, setBasicVoltageList, basicCurrentList, setBasicCurrentList, basicCheckedAll, handleBasicCheckAll, basicCheckedAlllRef,
        isAdvancedExpand, handleOnAdvancedExpand, advancedCurrentList, setAdvancedCurrentList, advancedCheckedAll, handleAdvancedCheckAll, advancedCheckedAlllRef,
        calculations, setCalculations
    } = useBuiltIn();

    return (
        <div className={styles["built-in"]}>
            <div className={styles.header}>
                <div className={styles.title} >
                   Built-In
                </div>

                <Button
                    variant="white"
                    className={styles["filter-btn"]}
                >
                    <Button.Image
                        image={<Filter />}
                    />
                    <Button.Text
                        text={"Save filter name"}
                        className="mx-2"
                    />
                    <Button.Image
                        image={<DownArrow />}
                    />
                </Button>
            </div>

            <div className={styles.body} >
                {isExpand &&
                    <div className={styles["body-content"]}>
                        <div className={`row m-0 ${styles["body-row"]}`}>
                            <div className="col-2 ps-0">
                                <div className={styles.types} >
                                    <VerticalTabs
                                        tabs={[
                                            { id: 1, text: "Inverter" },
                                            { id: 2, text: "String" },
                                            { id: 3, text: "Summary" },
                                            { id: 4, text: "Alert" },
                                        ]}
                                        onClick={selected => {}}
                                    />
                                </div>
                            </div>

                            <div className="col-3">
                                <div className={styles.params} >
                                    <div>
                                        <DownArrow
                                            className={styles["expand-icon"]}
                                            style={{ transform: isBasicExpand ? "" : "rotate(180deg)" }}
                                            onClick={handleOnBasicExpand}
                                        />
                                        
                                        <FormInput.Check
                                            ref={basicCheckedAlllRef}
                                            name={`all-basic`}
                                            label="Basic"
                                            inline
                                            className="fw-bold"
                                            checked={basicCheckedAll}
                                            onChange={handleBasicCheckAll}
                                        />
                                    </div>
                                    
                                    {isBasicExpand &&
                                        <div className={styles["params-list"]}>
                                            <ExpandableList
                                                name="MPPT (Voltage) (3)"
                                                list={basicVoltageList}
                                                onChange={list => setBasicVoltageList(list)}
                                            />

                                            <ExpandableList
                                                name="MPPT (Current) (3)"
                                                list={basicCurrentList}
                                                onChange={list => setBasicCurrentList(list)}
                                            />
                                        </div>
                                    }
                                </div>
                            </div>

                            <div className="col-3">
                                <div className={styles.params} >
                                    <div>
                                        <DownArrow
                                            className={styles["expand-icon"]}
                                            style={{ transform: isAdvancedExpand ? "" : "rotate(180deg)" }}
                                            onClick={handleOnAdvancedExpand}
                                        />
                                        
                                        <FormInput.Check
                                            ref={advancedCheckedAlllRef}
                                            name={`all-advanced`}
                                            label="Advanced"
                                            inline
                                            className="fw-bold"
                                            checked={advancedCheckedAll}
                                            onChange={handleAdvancedCheckAll}
                                        />
                                    </div>

                                    {isAdvancedExpand &&
                                        <div className={styles["params-list"]}>
                                            <ExpandableList
                                                name="String (Current) (3)"
                                                list={advancedCurrentList}
                                                onChange={list => setAdvancedCurrentList(list)}
                                            />
                                        </div>
                                    }
                                </div>
                            </div>

                            <div className="col-3">
                                <div className={styles.params} >
                                    <div className={styles.calculations}>
                                        <ExpandableList
                                            name="Calculations"
                                            list={calculations}
                                            onChange={list => setCalculations(list)}
                                            headerClassname={styles["list-header"]}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }

                <div className={styles.footer}>
                    <div className="d-flex gap-2 justify-content-end align-items-end flex-wrap">
                        <Button variant={"yellow"}>
                            <Button.Text text={"Apply"} />
                        </Button>

                        <Button variant={"white"}>
                            <Button.Text
                                text={"Clear All"}
                                className="text-nowrap"
                            />
                        </Button>

                        <Button onClick={handleOnExpand} >
                            <Button.Text text={isExpand ? "Collapse" : "Expand"} />
                            <Button.Image
                                image={
                                    <DownArrow
                                        className="ms-2"
                                        style={{ transform: isExpand ? "" : "rotate(180deg)" }}
                                    />
                                }
                            />
                        </Button>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default BuiltIn;