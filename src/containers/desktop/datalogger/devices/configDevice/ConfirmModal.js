import { useEffect, useState } from "react";
import Button from "../../../../../components/button/Button";
import Modal from "../../../../../components/modal/Modal";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import Constants from "../../../../../utils/Constants";
import { createColumnHelper } from "@tanstack/react-table";
import FormInput from "../../../../../components/formInput/FormInput";
import Table from "../../../../../components/table/Table";
import { loginService } from "../../../../../services/loginService";
import { useNavigate } from "react-router-dom";
import LibToast from "../../../../../utils/LibToast";

export default function ConfirmModal({ show, setShow, template, device, selectedPoints, action, onConfirm }) {
    const axiosPrivate = useAxiosPrivate();
    const [devices, setDevices] = useState([])
    const [isFetching, setIsFetching] = useState(true);
    const [rowSelection, setRowSelection] = useState([]);
    const navigate = useNavigate();
    const output = document.getElementById("progress");

    useEffect(() => {
        if (template) {
            setIsFetching(true);
            output.innerHTML = "<div><img src='/loading.gif' /></div>";
            setTimeout(async () => {
                try {
                    const response = await axiosPrivate.post(Constants.API_URL.DEVICES.GET_ONE,
                        {
                            id_template: template,
                            id_device: device
                        });
                    setDevices(response.data);
                } catch (error) {
                    console.error(error);
                } finally {
                    output.innerHTML = "";
                    setIsFetching(false);
                }
            }, 300);
        }
    }, [template, device, axiosPrivate]);

    const columnsHelper = createColumnHelper();
    const columns = [
        columnsHelper.accessor("id_checkbox", {
            id: "id_checkbox",
            size: 10,
            header: ({ table }) => (
                <FormInput.Check
                    {...{
                        inline: true,
                        name: "all",
                        label: "Device#",
                        checked: table.getIsAllRowsSelected(),
                        onChange: (e) => table.toggleAllRowsSelected(e.target.checked),
                    }}
                />
            ),
            cell: ({ row }) => {
                return (
                    <FormInput.Check
                        {...{
                            inline: true,
                            name: row.original.id,
                            label: `${row.original.id}`,
                            checked: row.getIsSelected(),
                            onChange: row.getToggleSelectedHandler(),
                            indeterminate: row.getIsSomeSelected(),
                        }}
                    />
                );
            },
        }),
        columnsHelper.accessor("name", {
            id: "name",
            header: "Name",
            width: 200,
            cell: ({ row }) => (
                <div>{row.original?.name}</div>
            ),
        }),
    ];

    const handleSave = () => {
        var body = {
            id_device: device,
            id_devices_to_config: Object.keys(rowSelection).map(key => {
                return devices[parseInt(key)].id
            }),
            id_point: selectedPoints,
            action: action.toLowerCase().trim()
        }

        var url = Constants.API_URL.DEVICES.CONFIG.POINT_ACTION;
        output.innerHTML = "<div><img src='/loading.gif' /></div>";
        setTimeout(async () => {
            try {
                const response = await axiosPrivate.post(url, body);
                onConfirm(response.data?.points);
                setShow(false);
                LibToast.toast("Points configured successfully", "info");
            } catch (error) {
                loginService.handleMissingInfo(error, "Failed to configure points") && navigate("/", { replace: true });
            } finally {
                output.innerHTML = "";
            }
        }, 300);
    }
    return !isFetching && (
        <Modal
            title={`Confirm ${action.toLowerCase()} points`}
            isOpen={show}
            close={() => setShow(false)}
            footer={
                <>
                    <Button
                        variant="white"
                        onClick={() => setShow(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="dark"
                        onClick={handleSave}
                    >
                        Confirm
                    </Button>
                </>
            }
        >
            {
                devices.length > 0 ?
                    <div>
                        <h6>Do you want to configure the following devices too?</h6>
                        <Table
                            className="mt-3"
                            data={devices}
                            columns={{ columnDefs: columns }}
                            selectRow={{
                                enable: false,
                                rowSelection: rowSelection,
                                setRowSelection: setRowSelection
                            }}
                        />
                    </div> :
                    <p>Are you sure to disable these points?</p>
            }
        </Modal>
    )
}