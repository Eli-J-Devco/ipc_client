import Button from "../../../../../components/button/Button";
import styles from "./Filter.module.scss";
import { ReactComponent as RefreshIcon } from "../../../../../assets/images/refresh.svg";
import { ReactComponent as ExportIcon } from "../../../../../assets/images/export.svg";
import { ReactComponent as FilterIcon } from "../../../../../assets/images/filter.svg";
import { ReactComponent as DownArrow } from "../../../../../assets/images/down-arrow.svg";
import { ReactComponent as DoubleArrow } from "../../../../../assets/images/double-up-arrow.svg";
import FormInput from "../../../../../components/formInput/FormInput";
import ButtonGroup from "../../../../../components/buttonGroup/ButtonGroup";
import DatePickerButton from "../../../../../components/datePickerButton/DatePickerButton";

function Filter({ isExpand, onExpand }) {
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

                <div>
                    <Button
                        variant="yellow"
                    >
                        <Button.Image
                            image={<RefreshIcon />}
                        />

                        <Button.Text
                            text="Refresh"
                            className="ps-1"
                        />
                    </Button>

                    <Button
                        className="ms-3"
                    >
                        <Button.Image
                            image={<ExportIcon />}
                        />

                        <Button.Text
                            text="Export"
                            className="ps-1"
                        />
                    </Button>
                </div>
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
                        <div className="d-flex flex-wrap mb-3">
                            <FormInput.Text
                                className={`my-1 ${styles.search}`}
                                placeholder="Keyword..."
                            />

                            <ButtonGroup
                                buttons={[
                                    {
                                        text: "1 Day"
                                    },
                                    {
                                        text: "Week"
                                    },
                                    {
                                        text: "Month"
                                    },
                                    {
                                        text: "Year"
                                    },
                                ]}
                                className="mx-0 my-1 mx-sm-3"
                            />

                            <DatePickerButton
                                className="my-1"
                                prevDate="Aug 18, 2023"
                                nextDate="Aug 20, 2023"
                            />
                        </div>
                        
                        <div className={`container ${styles["check-box-wrapper"]}`}>
                            <div className="row">
                                <div className="col-2 px-0">
                                    <fieldset className={`${styles.fieldset}`}>
                                        <legend className={styles.legend}>
                                            Devices
                                        </legend>

                                        <FormInput.Check
                                            name="all_devices"
                                            label="All"
                                            className="fw-bold"
                                        />

                                        {
                                            Array.from({ length: 20 }, (item, index) => `Inverter ${index + 1}`).map(item => (
                                                <FormInput.Check
                                                    key={item}
                                                    name={item}
                                                    label={item}
                                                />
                                            ))
                                        }
                                    </fieldset>
                                </div>

                                <div className="col-7 px-3">
                                    <fieldset className={`${styles.fieldset} ${styles.others} ${styles.top}`}>
                                        <legend className={styles.legend}>
                                            Error Level
                                        </legend>

                                        <div className="row">
                                            <div className="col-3">
                                                <FormInput.Check
                                                    name="all_error_level"
                                                    label="All"
                                                    className="fw-bold"
                                                />
                                            </div>

                                            {
                                                ["DEBUG", "ERROR", "FATAL", "INFO", "WARNING", "PRODUCTION", "COM"].map(item => (
                                                    <div
                                                        key={item}
                                                        className="col-3"
                                                    >
                                                        <FormInput.Check
                                                            name={item}
                                                            label={item}
                                                        />
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </fieldset>
                                    
                                    <fieldset className={`${styles.fieldset} ${styles.others}`}>
                                        <legend className={styles.legend}>
                                            Device Categorize
                                        </legend>

                                        <div className="row">
                                            <div className="col-3">
                                                <FormInput.Check
                                                    name="all_device_categorize"
                                                    label="All"
                                                    className="fw-bold"
                                                />
                                            </div>

                                        {
                                            ["Production Meter", "Solar Tracker", "Weather Station", "Datalogger", "Sensor", "Load Meter", "Consumption Meter", "Cell Modem", "PV System Inverter"].map(item => (
                                                <div
                                                    key={item}
                                                    className="col-3"
                                                >
                                                    <FormInput.Check
                                                        name={item}
                                                        label={item}
                                                    />
                                                </div>
                                            ))
                                        }
                                        </div>
                                    </fieldset>
                                </div>

                                <div className="col-3 px-0">
                                    <fieldset className={`${styles.fieldset} ${styles.others} ${styles.top}`}>
                                        <legend className={styles.legend}>
                                            Status
                                        </legend>

                                        <div className="row">
                                            <div className="col-6">
                                                <FormInput.Check
                                                    name="all_status"
                                                    label="All"
                                                    className="fw-bold"
                                                />
                                            </div>

                                        {
                                            ["Closed", "Opened"].map(item => (
                                                <div
                                                    key={item}
                                                    className="col-6"
                                                >
                                                    <FormInput.Check
                                                        name={item}
                                                        label={item}
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
                                                    name="all_error_type"
                                                    label="All"
                                                    className="fw-bold"
                                                />
                                            </div>

                                        {
                                            ["Zero Generation", "String Performance", "Device Fault", "Performance Index", "System Disconnect"].map(item => (
                                                <div
                                                    key={item}
                                                    className="col-6"
                                                >
                                                    <FormInput.Check
                                                        name={item}
                                                        label={item}
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