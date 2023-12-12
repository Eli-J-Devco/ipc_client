import FormInput from '../../formInput/FormInput';
import styles from './DropDowns.module.scss';

/**
 * @description get text from React element
 * @param {Element} elem 
 * @returns text
 */
function textContent(elem) {
    if (!elem) return "";
    if (typeof elem === 'string') return elem;
    const children = elem.props && elem.props.children;
    if (children instanceof Array) return children.map(textContent).join('');
    return textContent(children);
}
  
function DropDowns({ data, isShow, refProp }) {
    return (
        <ul
            ref={refProp}
            className={`${styles.dropdowns} ${isShow ? "d-block" : ""}`}
        >
            {
                data.getAllColumns().length > 1 && (
                    <li key={0} className="border-bottom">
                        <FormInput.Check
                            label="All"
                            name="all"
                            checked={data.getIsAllColumnsVisible()}
                            onChange={data.getToggleAllColumnsVisibilityHandler()}
                        />
                    </li>
                )
            }

            {
                data.getAllColumns().map(item => (
                    <li key={item.id}>
                        <FormInput.Check
                            label={textContent(item.columnDef.header)}
                            name={`column-visible-${item.columnDef.accessorKey}`}
                            checked={item.getIsVisible()}
                            onChange={item.getToggleVisibilityHandler()}
                        />
                    </li>
                ))
            }
        </ul>
    );
}

export default DropDowns;