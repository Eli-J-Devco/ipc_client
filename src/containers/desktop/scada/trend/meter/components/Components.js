import styles from "./Components.module.scss";
import { ReactComponent as DownArrow } from "../../../../../../assets/images/down-filled-triangular-arrow.svg";
import ExpandableList from "../../../../../../components/expandableList/ExpandableList";
import useComponents from "./useComponents";

function Components() {
    const { isExpand, handleOnExpand, productionMeterList, setProductionMeterList } = useComponents();

    return (
        <div className={styles.components}>
            <div
                className={styles.header}
                onClick={handleOnExpand}
            >
                <span>Components</span>

                <DownArrow
                    className={styles["expand-icon"]}
                    style={{ transform: isExpand ? "" : "rotate(180deg)" }}
                />
            </div>

            {isExpand &&
                <div className={styles.body} >
                    <ExpandableList
                        name="Production Meter (2)"
                        list={productionMeterList}
                        onChange={list => setProductionMeterList(list)}
                    />
                </div>
            }
        </div>
    );
}

export default Components;