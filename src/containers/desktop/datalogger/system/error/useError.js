import { useState, useEffect } from "react";
import Constants from "../../../../../utils/Constants";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate.js";
import LibToast from "../../../../../utils/LibToast";
import { useTranslation } from "react-i18next";


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
    const [isExpand, setIsExpand] = useState(false);
    const [deviceGroups, setDeviceGroups] = useState([]);
    const [templates, setTemplates] = useState([]);
    const [points, setPoints] = useState([]);
    const [errorLevels, setErrorLevels] = useState([]);
    const [errorTypes, setErrorTypes] = useState([]);
    const [errorComparisons, setErrorComparisons] = useState([]);
    const [formSubmit, setFormSubmit] = useState({
        enable: true
    });
    const { t } = useTranslation()
    
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

    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await axiosPrivate.post(
                    Constants.API_URL.DEVICES.CONFIG.GROUP
                );
                setDeviceGroups(data)
            } catch (e) {
                console.log(e);
            }
        }
        fetchData()
        
    }, [])

    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await axiosPrivate.post(
                    Constants.API_URL.TEMPLATE.GET
                );
                setTemplates(data)
            } catch (e) {
                console.log(e);
            }
        }
        fetchData()
        
    }, [])

    useEffect(() => {
        async function fetchData() {
            try {
                if (formSubmit.template?.value) {
                    const response = await axiosPrivate.post(
                        `${Constants.API_URL.POINT.LIST}?id_template=${formSubmit.template.value}`
                    );
                    setPoints(response.data)
                }
            } catch (e) {
                console.log(e);
            }
        }
        fetchData()
    }, [formSubmit])

    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await axiosPrivate.post(
                    Constants.API_URL.ERROR.LEVEL.LIST
                );
                setErrorLevels(data)
            } catch (e) {
                console.log(e);
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await axiosPrivate.post(
                    Constants.API_URL.ERROR.TYPE.LIST
                );
                setErrorTypes(data)
            } catch (e) {
                console.log(e);
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await axiosPrivate.post(
                    Constants.API_URL.ERROR.COMPARISON.LIST
                );
                setErrorComparisons(data)
            } catch (e) {
                console.log(e);
            }
        }
        fetchData()
    }, [])

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

    const handleDeleteError = async (id) => {
        try {
            const { data } = await axiosPrivate.post(
                `${Constants.API_URL.ERROR.DELETE}?error_id=${id}`
            )
            if (data) {
                setErrorList(errorList.filter(item => {
                    return item.id !== id
                }))
                LibToast.toast(t("toastMessage.info.delete"), "info");
            }
        } catch (e) {
            console.log(e)
        }
    }
    const handleIsExpand = () => setIsExpand(!isExpand);

    return {
        columns,
        isModalOpen,
        openModal, closeModal,
        isExpand, handleIsExpand,
        error, setError,
        errorList, setErrorList,
        total,
        setLimit,
        setOffset,
        deviceGroups,
        templates,
        points,
        errorLevels,
        errorTypes,
        errorComparisons,
        formSubmit, setFormSubmit,
        handleEditError,
        handleDeleteError,
    };
}

export default useError;