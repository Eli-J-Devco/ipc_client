import styles from "./BuiltIn.module.scss";
import { ReactComponent as DownArrow } from "../../../../../../assets/images/down-filled-triangular-arrow.svg";
import { ReactComponent as Filter } from "../../../../../../assets/images/filter.svg";
import ExpandableList from "../../../../../../components/expandableList/ExpandableList";
import useBuiltIn from "./useBuiltIn";
import VerticalTabs from "../../../../../../components/verticalTabs/VerticalTabs";
import Button from "../../../../../../components/button/Button";

function BuiltIn() {
    const { isExpand, handleOnExpand, basicList, setBasicList, advancedList, setAdvancedList, calculations, setCalculations } = useBuiltIn();

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
                            <div className="col-3 ps-0">
                                <div className={styles.types} >
                                    <VerticalTabs
                                        tabs={[
                                            { id: 1, text: "Weather" },
                                            { id: 2, text: "Summary" },
                                            { id: 3, text: "Alert" }
                                        ]}
                                        onClick={selected => {}}
                                    />
                                </div>
                            </div>

                            <div className="col-3">
                                <div className={styles.params} >
                                    <ExpandableList
                                        name="Basic"
                                        list={basicList}
                                        onChange={list => setBasicList(list)}
                                        headerClassname={styles["list-header"]}
                                    />
                                </div>
                            </div>

                            <div className="col-3">
                                <div className={styles.params} >
                                    <ExpandableList
                                        name="Advanced"
                                        list={advancedList}
                                        onChange={list => setAdvancedList(list)}
                                        headerClassname={styles["list-header"]}
                                    />
                                </div>
                            </div>

                            <div className="col-3">
                                <div className={styles.params} >
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