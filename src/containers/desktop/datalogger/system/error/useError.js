import { useState, useEffect } from "react";
import Constants from "../../../../../utils/Constants";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate.js";

function useError() {
    const [total, setTotal] = useState(70);
    const [limit, setLimit] = useState(Constants.DEFAULT_PAGE_SIZE);
    const [offset, setOffset] = useState(0);
    const [columns, ] = useState([
        {
            id: 1,
            slug: "name",
            name: "Name"
        }, {
            id: 2,
            slug: "message",
            name: "Message"
        }, {
            id: 3,
            slug: "device_group.name",
            name: "Device Group"
        }, {
            id: 4,
            slug: "tag_point.name",
            name: "Point"
        }, {
            id: 5,
            slug: "error_level.name",
            name: "Error Level"
        }, {
            id: 6,
            slug: "error_type.name",
            name: "Error Type"
        }, {
            id: 7,
            slug: "enable",
            name: "Enable"
        }, {
            id: 8,
            slug: "action",
            name: <div className="text-center">Actions</div>
        }
    ]);
    const [errorList, setErrorList] = useState();
    const [point, setPoint] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);

    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const {data} = await axiosPrivate.post(
                    Constants.API_URL.ERROR.LIST
                )
                setErrorList(data)
            } catch (e) {
                console.log(e)
            }
        }
        fetchData()
    }, [])

    const closeModal = () => setIsModalOpen(false);
    const handleErrorEdit = item => {
        setIsModalOpen(true);
        setPoint(item);
    }

    return {
        columns,
        errorList, setErrorList,
        total,
        setLimit,
        setOffset,
        isModalOpen,
        closeModal,
        handleErrorEdit,
        point
    };
}

export default useError;