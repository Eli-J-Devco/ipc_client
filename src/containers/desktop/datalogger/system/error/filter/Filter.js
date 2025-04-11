import Button from "../../../../../../components/button/Button";
import styles from "./Filter.module.scss";
import { ReactComponent as RefreshIcon } from "../../../../../../assets/images/refresh.svg";
import { ReactComponent as ExportIcon } from "../../../../../../assets/images/export.svg";
import { ReactComponent as FilterIcon } from "../../../../../../assets/images/filter.svg";
import { ReactComponent as DownArrow } from "../../../../../../assets/images/down-arrow.svg";
import { ReactComponent as DoubleArrow } from "../../../../../../assets/images/double-up-arrow.svg";
import FormInput from "../../../../../../components/formInput/FormInput";
import ButtonGroup from "../../../../../../components/buttonGroup/ButtonGroup";
import DatePickerButton from "../../../../../../components/datePickerButton/DatePickerButton";
import useFilter from "./useFilter";


function Filter({ 
    isExpand, 
    onExpand, 
    deviceGroups, 
    templates,
    points,
    errorLevels,
    errorTypes,
    selectedTemplates,
    handleDeviceGroupChange,
    handleTemplateChange,
    handlePointChange,
    handleErrorLevelChange,
    handleErrorTypeChange,
}) {
    return (
        <div className={styles.filter}>
            <div className={styles.utils}>
                <Button
                    variant="light"
                    onClick={onExpand}
                >
                    <Button.Image
                        image={<FilterIcon />}
                    />

                    <Button.Text
                        text="Filter"
                        className="ps-1"
                    />

                    <Button.Image
                        image={<DownArrow style={{ transform: isExpand ? "" : "rotate(180deg)" }} />}
                        className="ms-4"
                    />
                </Button>
            </div>

            {isExpand &&
                <div className={styles.main} >
                    <div className={styles.header}>
                        <span>Applied Filters:</span>
                        
                        <Button
                            variant="light"
                            className={styles["clear-all-button"]}
                        >
                            <Button.Text
                                text="Clear All"
                                className="fw-bold"
                            />
                        </Button>
                    </div>

                    <div className={styles.body}>
                        <div className={`container ${styles["check-box-wrapper"]}`}>
                            <div className="row">
                                <div className="col-2 px-0">
                                    <fieldset className={`${styles.fieldset}`}>
                                        <legend className={styles.legend}>
                                            Device Group
                                        </legend>

                                        <FormInput.Check
                                            name="device_group"
                                            label="All"
                                            value="all"
                                            className="fw-bold"
                                            onChange={handleDeviceGroupChange}
                                        />
                                        {
                                            deviceGroups.map(item => (
                                                <FormInput.Check
                                                    key={item.id}
                                                    name="device_group"
                                                    label={item.name}
                                                    value={item.id}
                                                    onChange={handleDeviceGroupChange}
                                                />
                                            ))
                                        }
                                    </fieldset>
                                </div>

                                <div className="col-7 px-3">
                                    <fieldset className={`${styles.fieldset} ${styles.others} ${styles.top}`}>
                                        <legend className={styles.legend}>
                                            Template
                                        </legend>

                                        <div className="row">
                                            <div className="col-3">
                                                <FormInput.Check
                                                    name="template"
                                                    label="All"
                                                    value="all"
                                                    className="fw-bold"
                                                    onChange={handleTemplateChange}
                                                />
                                            </div>

                                            {
                                                templates.map(item => (
                                                    <div
                                                        key={item.id}
                                                        className="col-3"
                                                    >
                                                        <FormInput.Check
                                                            name="template"
                                                            label={item.name}
                                                            value={item.id}
                                                            onChange={handleTemplateChange}
                                                        />
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </fieldset>
                                    
                                    <fieldset disabled={selectedTemplates.length === 0} className={`${styles.fieldset} ${styles.others} ${styles.top}`}>
                                        <legend className={styles.legend}>
                                            Point
                                        </legend>

                                        <div className="row">
                                            <div className="col-6">
                                                <FormInput.Check
                                                    name="point"
                                                    label="All"
                                                    value="all"
                                                    className="fw-bold"
                                                    onChange={handlePointChange}
                                                />
                                            </div>

                                        {
                                            points.map(item => (
                                                <div
                                                    key={item.id}
                                                    className="col-6"
                                                >
                                                    <FormInput.Check
                                                        name="point"
                                                        label={item.name}
                                                        value={item.id}
                                                        onChange={handlePointChange}
                                                    />
                                                </div>
                                            ))
                                        }
                                        </div>
                                    </fieldset>
                                    
                                </div>

                                <div className="col-3 px-0">
                                    <fieldset className={`${styles.fieldset} ${styles.others}`}>
                                        <legend className={styles.legend}>
                                            Error Level
                                        </legend>

                                        <div className="row">
                                            <div className="col-6">
                                                <FormInput.Check
                                                    name="error_level"
                                                    label="All"
                                                    value="all"
                                                    className="fw-bold"
                                                    onChange={handleErrorLevelChange}
                                                />
                                            </div>

                                        {
                                            errorLevels.map(item => (
                                                <div
                                                    key={item.id}
                                                    className="col-6"
                                                >
                                                    <FormInput.Check
                                                        name="error_level"
                                                        label={item.name}
                                                        value={item.id}
                                                        onChange={handleErrorLevelChange}
                                                    />
                                                </div>
                                            ))
                                        }
                                        </div>
                                    </fieldset>

                                    <fieldset className={`${styles.fieldset} ${styles.others}`}>
                                        <legend className={styles.legend}>
                                            Error Type
                                        </legend>

                                        <div className="row">
                                            <div className="col-6">
                                                <FormInput.Check
                                                    name="error_type"
                                                    label="All"
                                                    value="all"
                                                    className="fw-bold"
                                                    onChange={handleErrorTypeChange}
                                                />
                                            </div>

                                        {
                                            errorTypes.map(item => (
                                                <div
                                                    key={item.id}
                                                    className="col-6"
                                                >
                                                    <FormInput.Check
                                                        name="error_type"
                                                        label={item.name}
                                                        value={item.id}
                                                        onChange={handleErrorTypeChange}
                                                    />
                                                </div>
                                            ))
                                        }
                                        </div>
                                    </fieldset>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.footer}>
                        <Button
                            variant="yellow"
                            className="mx-2"
                        >
                            <Button.Text
                                text="Select All"
                            />
                        </Button>

                        <Button
                            variant="dark"
                            className="mx-2"
                        >
                            <Button.Text
                                text="Clear All"
                            />
                        </Button>

                        <Button
                            variant="light"
                            className="mx-2"
                            onClick={onExpand}
                        >
                            <Button.Text
                                text="Collapse"
                            />
                            <Button.Image
                                image={<DoubleArrow />}
                                className="ms-3"
                            />
                        </Button>
                    </div>
                </div>
            }
        </div>
    );
}

export default Filter;