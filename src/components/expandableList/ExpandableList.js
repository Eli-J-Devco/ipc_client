import FormInput from "../../components/formInput/FormInput";
import { ReactComponent as DownArrow } from "../../assets/images/down-filled-triangular-arrow.svg";
import styles from "./ExpandableList.module.scss";
import useExpandableList from "./useExpandableList";
import isArray from "lodash/isArray";

/**
 * Expandable list component.
 * @param {String}    name             - The name of all selection.
 * @param {Object[]}  list             - The array of items.
 * @param {Number}    list[].id        - Item ID.
 * @param {String}    list[].text      - Item text.
 * @param {Boolean}   list[].selected  - Selected item.
 * @param {Function}  onChange         - The change event handler having the array of selected items as a parameter.
 * @param {String}    headerClassname  - Classname for header styling.
 */
function ExpandableList({ name, list, onChange, headerClassname }) {
    const { isExpand, handleOnExpand, handleOnChange, checkedAll, handleCheckAll, checkedAllRef } = useExpandableList({ list, onChange });

    return (
        <div>
            <div className={headerClassname ? headerClassname : ""}>
                <DownArrow
                    className={styles["expand-icon"]}
                    style={{ transform: isExpand ? "" : "rotate(180deg)" }}
                    onClick={handleOnExpand}
                />
                
                <FormInput.Check
                    ref={checkedAllRef}
                    name={`all-${name}`}
                    label={name}
                    inline
                    checked={checkedAll}
                    onChange={handleCheckAll}
                />
            </div>

            {isExpand &&
                <div className={styles.list}>
                    {
                        isArray(list) && list.length > 0 &&
                        list.map((item, index) => (
                            <FormInput.Check
                                key={item.id}
                                name={`${name}-${item.text}-${item.id}`}
                                label={item.text}
                                checked={item.selected}
                                onChange={() => handleOnChange(item, index)}
                            />
                        ))
                    }
                </div>
            }
        </div>
    );
}

export default ExpandableList;