import FormInput from '../../formInput/FormInput';
import styles from './DropDowns.module.scss';

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
                            label={item.columnDef.header}
                            name={item.columnDef.accessorKey}
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