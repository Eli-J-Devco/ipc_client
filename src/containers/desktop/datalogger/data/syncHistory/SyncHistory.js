import Button from "../../../../../components/button/Button";
import FormInput from "../../../../../components/formInput/FormInput";
import Table from "../../../../../components/table/Table";
import useSyncHistory from "./useSyncHistory";
import { ReactComponent as ViewIcon } from "../../../../../assets/images/eye_view.svg";
import { ReactComponent as DeleteIcon } from "../../../../../assets/images/delete.svg";
import DatePicker from "../../../../../components/datePicker/DatePicker";

function SyncHistory() {
    const { columns, history, total, setLimit, setOffset, date, handleOnDateChange } = useSyncHistory();
    return (
        <div>
            <div className="d-flex align-items-center flex-wrap column-gap-4 row-gap-2">
                <FormInput.Select
                    placeholder="Choose a inverter"
                />

                <DatePicker
                    selected={date}
                    onChange={handleOnDateChange}
                />

                <Button>
                    <Button.Text text="Today"/>
                </Button>
            </div>

            <Table
                variant="grey"
                className="mb-2"
                maxHeight="calc(100vh - 300px)"
                pagination={{
                    enable: true,
                    total,
                    setLimit,
                    setOffset
                }}
                columns={columns}
                data={history}
                action={item => (
                    <div className="d-flex flex-wrap justify-content-center">
                        <Button.Image
                            image={<ViewIcon />}
                            className="mx-2"
                        />
                        <Button.Image
                            image={<DeleteIcon />}
                            className="mx-2"
                        />
                    </div>
                )}
            />
        </div>
    );
}

export default SyncHistory;