import useVerticalTabs from "./useVerticalTabs";
import styles from "./VerticalTabs.module.scss";
import isArray from "lodash/isArray";

/**
 * Set of vertical tabs component.
 * @param {Object[]}    tabs            - An array of tab objects.
 * @param {Number}      tabs[].id       - Tab ID.
 * @param {String}      tabs[].text     - Tab text.
 * @param {Function}    onClick         - The click event handler having the selected tab as a parameter.
 */
function VerticalTabs({ tabs, onClick }) {
    const { selected, handleOnClick } = useVerticalTabs({ tabs, onClick });

    return (
        <ul className="d-flex flex-column">
            {
                isArray(tabs) && tabs.length > 0 &&
                tabs.map(tab => (
                    <li
                        key={tab.id}
                        className={`${styles.tab} ${tab.id === selected ? styles.active : ""}`}
                        onClick={() => handleOnClick(tab)}
                    >
                        {tab.text}
                    </li>
                ))
            }
        </ul>
    );
}

export default VerticalTabs;