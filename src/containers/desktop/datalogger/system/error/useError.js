import { useState, useEffect } from "react";
import Constants from "../../../../../utils/Constants";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate.js";
import LibToast from "../../../../../utils/LibToast";
import ErrorModal from "./errorModal/ErrorModal";
import DeleteErrorModal from "./errorModal/DeleteErrorModal";
import { useTranslation } from "react-i18next";
import _ from "lodash"


function useError() {
    const [total, setTotal] = useState(100);
    const [limit, setLimit] = useState(Constants.DEFAULT_PAGE_SIZE);
    const [currentPageIndex, setCurrentPageIndex] = useState();
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
    const [pointList, setPointList] = useState([])
    const [action, setAction] = useState();
    const [selectedDeviceGroups, setSelectedDeviceGroups] = useState([])
    const [selectedTemplates, setSelectedTemplates] = useState([])
    const [selectedPoints, setSelectedPoints] = useState([])
    const [selectedErrorLevels, setSelectedErrorLevels] = useState([])
    const [selectedErrorTypes, setSelectedErrorTypes] = useState([])
    const { t } = useTranslation()
    
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        const fetchData = async () => {
            var output = document.getElementById("progress");
            output.innerHTML = "<div><img src='/loading.gif' /></div>";
            try {
                const payload = {}
                if (selectedDeviceGroups.length ||
                    selectedTemplates.length ||
                    selectedPoints.length ||
                    selectedErrorLevels.length ||
                    selectedErrorTypes.length
                ) {
                    if (selectedDeviceGroups.length) {
                        payload.device_group_ids = selectedDeviceGroups
                    }
                    if (selectedTemplates.length) {
                        payload.template_ids = selectedTemplates
                    }
                    if (selectedPoints.length) {
                        payload.point_ids = selectedPoints
                    }
                    if (selectedErrorLevels.length) {
                        payload.error_level_ids = selectedErrorLevels
                    }
                    if (selectedErrorTypes.length) {
                        payload.error_type_ids = selectedErrorTypes
                    }
                }
                if (currentPageIndex) {
                    const { data } = await axiosPrivate.post(
                        `${Constants.API_URL.ERROR.LIST}?page=${currentPageIndex}&limit=${limit}`,
                        _.isEmpty(payload) ? undefined : payload 
                    )
                    console.log("payload", _.isEmpty(payload) ? undefined : payload)
                    console.log("data", data)
                    setErrorList(data.data)
                    setTotal(data.total)
                }
            } catch (e) {
                console.log(e)
            }
            output.innerHTML = "";
        }
        fetchData()
    }, [
        currentPageIndex, 
        limit,
        selectedDeviceGroups,
        selectedTemplates,
        selectedPoints,
        selectedErrorLevels,
        selectedErrorTypes,
    ]);

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

    useEffect(() => {
        let data = []
        const fetchData = async () => {
            data = await Promise.all(selectedTemplates.map(async id => {
                try {
                    const response = await axiosPrivate.post(
                        `${Constants.API_URL.POINT.LIST_V2}?id_template=${id}`
                    );
                    return response.data
                } catch (e) {
                    console.log(e);
                }
            }))
            data = data.flat()
            setPointList(data)
        }
        fetchData()
    }, [selectedTemplates])

    // useEffect(() => {
    //     const payload = {}
    //     if (selectedDeviceGroups.length ||
    //         selectedTemplates.length ||
    //         selectedPoints.length ||
    //         selectedErrorLevels.length ||
    //         selectedErrorTypes.length
    //     ) {
    //         if (selectedDeviceGroups.length) {
    //             payload.device_group_ids = selectedDeviceGroups
    //         }
    //         if (selectedTemplates.length) {
    //             payload.template_ids = selectedTemplates
    //         }
    //         if (selectedPoints.length) {
    //             payload.point_ids = selectedPoints
    //         }
    //         if (selectedErrorLevels.length) {
    //             payload.error_level_ids = selectedErrorLevels
    //         }
    //         if (selectedErrorTypes.length) {
    //             payload.error_type_ids = selectedErrorTypes
    //         }
    //         async function fetchData() {
    //             try {
    //                 const { data } = await axiosPrivate.post(
    //                     `${Constants.API_URL.ERROR.LIST}?page=${currentPageIndex}&limit=${limit}`,
    //                     _.isEmpty(payload) ? undefined : payload 
    //                 );
    //                 console.log(data)
    //                 setErrorList(data.data)
    //                 setTotal(data.total)
    //             } catch (e) {
    //                 console.log(e);
    //             }
    //         }
    //         fetchData()
    //     }
    // }, [
    //     selectedDeviceGroups,
    //     selectedTemplates,
    //     selectedPoints,
    //     selectedErrorLevels,
    //     selectedErrorTypes
    // ])

    const openModal = () => {
        setIsModalOpen(true);
    }
    
    const closeModal = () => {
        setIsModalOpen(false);
        setError({})
    }
    const handleAddError = () => {
        setAction("ADD")
        setError({})
        openModal()
    }

    const handleEditError = (item) => {
        setAction("EDIT")
        setError(item)
        openModal()
    }

    const handleDeleteError = async (item) => {
        setAction("DELETE")
        setError(item)
        openModal()
    }
    
    const handleIsExpand = () => setIsExpand(!isExpand);

    const handleDeviceGroupChange = (e) => {
        if (e.target.value === "all") {
            var checkedList = document.querySelectorAll("input[name='device_group']")
            if (e.target.checked === true) {
                checkedList.forEach(el => el.checked = true)
                setSelectedDeviceGroups(deviceGroups.map(item => item.id))
            } else {
                checkedList.forEach(el => el.checked = false)
                setSelectedDeviceGroups([])
            }
        } else {
            var checkedAll = document.querySelector("input[name='device_group'][value='all']")
            if (e.target.checked) {
                const newArray = [...selectedDeviceGroups, Number(e.target.value)] 
                var result = deviceGroups.map(item => item.id).every(value => newArray.includes(value));
                if (result) {
                    checkedAll.checked = true
                }
                setSelectedDeviceGroups(newArray)
            } else {
                checkedAll.checked = false
                setSelectedDeviceGroups(selectedDeviceGroups.filter(id => id !== Number(e.target.value)))
            }
        }
    }

    const handleTemplateChange = (e) => {
        var checkedPointAll = document.querySelector("input[name='point'][value='all']")
        if (e.target.value === "all") {
            var checkedList = document.querySelectorAll("input[name='template']")
            if (e.target.checked === true) {
                checkedList.forEach(el => el.checked = true)
                setSelectedTemplates(templates.map(item => item.id))
                checkedPointAll.checked = false
            } else {
                checkedList.forEach(el => el.checked = false)
                setSelectedTemplates([])
                setSelectedPoints([])
                checkedPointAll.checked = false
            }
        } else {
            var checkedAll = document.querySelector("input[name='template'][value='all']")
            if (e.target.checked) {
                const newArray = [...selectedTemplates, Number(e.target.value)] 
                var result = templates.map(item => item.id).every(value => newArray.includes(value));
                if (result) {
                    checkedAll.checked = true
                }
                setSelectedTemplates(newArray)
                checkedPointAll.checked = false
            } else {
                checkedAll.checked = false
                setSelectedTemplates(selectedTemplates.filter(id => id !== Number(e.target.value)))
                const newPointList = pointList
                    .filter(item => item.id_template !== Number(e.target.value))
                    .map(item => item.id)
                setSelectedPoints(newPointList)
                var checkedPointList = document.querySelectorAll("input[name='point']")
                checkedPointList = Array.from(checkedPointList).filter(el => el.value !== "all").map(el => Number(el.value))
                var result
                if (newPointList.length) {
                    result = newPointList.every(value => checkedPointList.includes(value));
                } else {
                    result = false
                }
                if (result) {
                    checkedPointAll.checked = true
                }
            }
        }
    }

    const handlePointChange = (e) => {
        if (e.target.value === "all") {
            var checkedList = document.querySelectorAll("input[name='point']")
            if (e.target.checked === true) {
                checkedList.forEach(el => el.checked = true)
                setSelectedPoints(pointList.map(item => item.id))
            } else {
                checkedList.forEach(el => el.checked = false)
                setSelectedPoints([])
            }
        } else {
            var checkedAll = document.querySelector("input[name='point'][value='all']")
            if (e.target.checked) {
                const newArray = [...selectedPoints, Number(e.target.value)] 
                var result = pointList.map(item => item.id).every(value => newArray.includes(value));
                if (result) {
                    checkedAll.checked = true
                }
                setSelectedPoints(newArray)
            } else {
                checkedAll.checked = false
                setSelectedPoints(selectedPoints.filter(id => id !== Number(e.target.value)))
            }
        }
    }

    const handleErrorLevelChange = (e) => {
        if (e.target.value === "all") {
            var checkedList = document.querySelectorAll("input[name='error_level']")
            if (e.target.checked === true) {
                checkedList.forEach(el => el.checked = true)
                setSelectedErrorLevels(errorLevels.map(item => item.id))
            } else {
                checkedList.forEach(el => el.checked = false)
                setSelectedErrorLevels([])
            }
        } else {
            var checkedAll = document.querySelector("input[name='error_level'][value='all']")
            if (e.target.checked) {
                const newArray = [...selectedErrorLevels, Number(e.target.value)] 
                var result = errorLevels.map(item => item.id).every(value => newArray.includes(value));
                if (result) {
                    checkedAll.checked = true
                }
                setSelectedErrorLevels(newArray)
            } else {
                checkedAll.checked = false
                setSelectedErrorLevels(selectedErrorLevels.filter(id => id !== Number(e.target.value)))
            }
        }
    }

    const handleErrorTypeChange = (e) => {
        if (e.target.value === "all") {
            var checkedList = document.querySelectorAll("input[name='error_type']")
            if (e.target.checked === true) {
                checkedList.forEach(el => el.checked = true)
                setSelectedErrorTypes(errorTypes.map(item => item.id))
            } else {
                checkedList.forEach(el => el.checked = false)
                setSelectedErrorTypes([])
            }
        } else {
            var checkedAll = document.querySelector("input[name='error_type'][value='all']")
            if (e.target.checked) {
                const newArray = [...selectedErrorTypes, Number(e.target.value)] 
                var result = errorTypes.map(item => item.id).every(value => newArray.includes(value));
                if (result) {
                    checkedAll.checked = true
                }
                setSelectedErrorTypes(newArray)
            } else {
                checkedAll.checked = false
                setSelectedErrorTypes(selectedErrorTypes.filter(id => id !== Number(e.target.value)))
            }
        }
    }

    return {
        columns,
        isModalOpen,
        openModal, closeModal,
        isExpand, handleIsExpand,
        error, setError,
        errorList, setErrorList,
        total,
        limit, setLimit,
        currentPageIndex, setCurrentPageIndex,
        deviceGroups,
        templates,
        points,
        errorLevels,
        errorTypes,
        errorComparisons,
        formSubmit, setFormSubmit,
        action,
        pointList,
        selectedTemplates,
        handleEditError,
        handleAddError,
        handleDeleteError,
        handleDeviceGroupChange,
        handleTemplateChange,
        handlePointChange,
        handleErrorLevelChange,
        handleErrorTypeChange,
    };
}

export default useError;