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
            slug: "id",
            name: "ID"
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
            slug: "device_group.name",
            name: "Device Group"
        }, {
            id: 10,
            slug: "template.name",
            name: "Template"
        }, {
            id: 5,
            slug: "tag_point.name",
            name: "Point"
        }, {
            id: 6,
            slug: "error_level.name",
            name: "Error Level"
        }, {
            id: 7,
            slug: "error_type.name",
            name: "Error Type"
        }, {
            id: 8,
            slug: "enable",
            name: "Enable"
        }, {
            id: 9,
            slug: "action",
            name: <div className="text-center">Actions</div>
        }
    ]);
    const [errorList, setErrorList] = useState();
    const [error, setError] = useState({});
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
    }, []);

    const openModal = () => {
        setIsModalOpen(true);
    }
    
    const closeModal = () => {
        setIsModalOpen(false);
        setError({})
    }

    const handleEditError = (item) => {
        setError(item)
        openModal()
    }

    return {
        columns,
        isModalOpen,
        openModal, closeModal,
        error, setError,
        errorList, setErrorList,
        total,
        setLimit,
        setOffset,
        handleEditError,
    };
}

export default useError;