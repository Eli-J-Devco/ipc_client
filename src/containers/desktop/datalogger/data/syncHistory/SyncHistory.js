import Button from "../../../../../components/button/Button";
import FormInput from "../../../../../components/formInput/FormInput";
import TableNW from "../../../../../components/tableNW/TableNW";
import useSyncHistory from "./useSyncHistory";
import DatePicker from "../../../../../components/datePicker/DatePicker";
import Modal from "../../../../../components/modal/Modal"
import styles from './SyncHistory.module.scss';
import { formatDate } from "../../../../../utils/Utils.js"

function SyncHistory() {
    const { 
        columns, 
        history, 
        total, 
        limit, setLimit, 
        currentPageIndex, setCurrentPageIndex, 
        inverterOptions, 
        uploadChannelOptions,
        handleOnInverterOptionChange,
        handleOnUploadChannelOptionChange,
        selectedInverterOption,
        startDate, 
        handleOnStartDateChange,
        endDate, 
        handleOnEndDateChange,
        handleOnSearch,
        handleToday,
        isOpen,
        handleOnDelete,
        handleOnClose,
        handleOnSubmitDelete,
    } = useSyncHistory();

    return (
        <>
            <Modal 
                isOpen={isOpen}
                close={handleOnClose}
                centered={true}
                title="Are you sure you want to delete?"
            >
                <div>{`These logs of ${selectedInverterOption ? selectedInverterOption.map(item => item.value) : "All"} from ${formatDate(startDate)} to ${formatDate(endDate)} will be deleted.`}</div>
                <div className="float-end mt-3">
                    <Button onClick={handleOnClose}>
                        Cancel
                    </Button>
                    <Button className="bg-danger ms-3" onClick={handleOnSubmitDelete}>
                        Confirm
                    </Button>
                </div>      
            </Modal>
            <div>
                <div className="d-flex align-items-center flex-wrap column-gap-4 row-gap-2 mb-2">
                    <FormInput.Select
                        placeholder="Choose inverter"
                        option={inverterOptions}
                        onChange={handleOnInverterOptionChange}
                        className={styles["w-300"]}
                        isMulti={true}
                    />
                    <FormInput.Select 
                        placeholder="Choose channel"
                        option={uploadChannelOptions}
                        className={styles["w-200"]}
                        onChange={handleOnUploadChannelOptionChange}
                        isMulti={true} />
                    <div className="d-flex align-items-center">
                        <DatePicker
                            selected={startDate}
                            onChange={handleOnStartDateChange}
                        />
                        <div className="mx-2">
                            -
                        </div>
                        <DatePicker
                            selected={endDate}
                            onChange={handleOnEndDateChange}
                        />
                    </div>
                    <Button onClick={handleToday}>
                        Today
                    </Button>
                    <Button onClick={handleOnSearch}>
                        Search
                    </Button>
                    <Button className="bg-danger" onClick={handleOnDelete}>
                        Delete
                    </Button>
                </div>
                <TableNW 
                    variant="grey"
                    className="mb-2"
                    control
                    pagination={{
                        enable: true,
                        total,
                        limit,
                        setLimit,
                        currentPageIndex,
                        setCurrentPageIndex,
                    }}
                    columns={columns}
                    data={history}
                />
            </div>
        </>
        
    );
}

export default SyncHistory;