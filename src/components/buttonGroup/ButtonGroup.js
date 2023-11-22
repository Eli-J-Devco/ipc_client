import styles from "./ButtonGroup.module.scss";
import useButtonGroup from "./useButtonGroup";

function ButtonGroup({ className, buttons }) {
    const { active, handleOnClick } = useButtonGroup({ buttons });
    
    return (
        <div className={className ? className : ""}>
            {
                buttons && buttons.map(button => (
                    <button
                        key={button.text}
                        className={`${styles.btn} ${active === button.text ? styles.active : ""}`}
                        onClick={() => handleOnClick(button)}
                    >
                        {button.text}
                    </button>
                ))
            }
        </div>
    );
}

export default ButtonGroup;