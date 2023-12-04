import { useState } from "react";
import Constants from "../../../../../utils/Constants";

function useAlarm() {
    const [total, setTotal] = useState(70);
    const [limit, setLimit] = useState(Constants.DEFAULT_PAGE_SIZE);
    const [offset, setOffset] = useState(0);
    const [columns, ] = useState([
        {
            id: 1,
            slug: "serial_number",
            name: "Serial Number"
        }, {
            id: 2,
            slug: "name",
            name: "Name"
        }, {
            id: 3,
            slug: "message",
            name: "Message"
        }, {
            id: 4,
            slug: "device_categorize",
            name: "Device Categorize"
        }, {
            id: 5,
            slug: "device",
            name: "Device"
        }, {
            id: 6,
            slug: "tag",
            name: "Tag (point)"
        }, {
            id: 7,
            slug: "error_level",
            name: "Error Level"
        }, {
            id: 8,
            slug: "error_type",
            name: "Condition (Error Type)"
        }, {
            id: 9,
            slug: "enable_switch",
            name: "Enable"
        }, {
            id: 10,
            slug: "action",
            name: "Actions"
        }
    ]);
    const [alarmList,] = useState([
        {
            serial_number: "1",
            name: "Fan Fault",
            message: "Fan Fault",
            device_categorize: "Datalogger",
            device: "INV01",
            tag: "pt0",
            error_level: "ERROR",
            error_type: "Fan fault = 1",
            enable: true
        },{
            serial_number: "2",
            name: "DC soft starting fault",
            message: "DC soft starting fault",
            device_categorize: "Datalogger",
            device: "INV01",
            tag: "pt1",
            error_level: "ERROR",
            error_type: "DC soft starting fault = 1",
            enable: true
        },{
            serial_number: "3",
            name: "Hardware fault",
            message: "Hardware fault",
            device_categorize: "Datalogger",
            device: "INV01",
            tag: "pt2",
            error_level: "ERROR",
            error_type: "Hardware fault = 1",
            enable: true
        },
    ]);
    const [point, setPoint] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);

    const closeModal = () => setIsModalOpen(false);
    const handleAlarmEdit = item => {
        setIsModalOpen(true);
        setPoint(item);
    }

    return {
        columns,
        alarmList,
        total,
        setLimit,
        setOffset,
        isModalOpen,
        closeModal,
        handleAlarmEdit,
        point
    };
}

export default useAlarm;