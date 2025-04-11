import { useState, useEffect } from "react";
import Constants from "../../../../../../utils/Constants";
import useAxiosPrivate from "../../../../../../hooks/useAxiosPrivate.js";
import LibToast from "../../../../../../utils/LibToast";
import { useTranslation } from "react-i18next";


function useFilter() {
    const [selectedDeviceGroups, setSelectedDeviceGroups] = useState([])
    const [selectedTemplates, setSelectedTemplates] = useState([])
    const [selectedPoints, setSelectedPoints] = useState([])
    const [selectedErrorLevels, setSelectedErrorLevels] = useState([])
    const [selectedErrorTypes, setSelectedErrorTypes] = useState([])

    const axiosPrivate = useAxiosPrivate()

    const handleDeviceGroupChange = (e) => {
        if (e.target.checked) {
            setSelectedDeviceGroups([...selectedDeviceGroups, e.target.value])
        } else {
            setSelectedDeviceGroups(selectedDeviceGroups.filter(id => id !== e.target.value))
        }
    }

    const handleTemplateChange = (e) => {
        if (e.target.checked) {
            setSelectedTemplates([...selectedTemplates, e.target.value])
        } else {
            setSelectedTemplates(selectedTemplates.filter(id => id !== e.target.value))
        }
    }

    const handlePointChange = (e) => {
        if (e.target.checked) {
            setSelectedPoints([...selectedPoints, e.target.value])
        } else {
            setSelectedPoints(selectedPoints.filter(id => id !== e.target.value))
        }
    }

    const handleErrorLevelChange = (e) => {
        if (e.target.checked) {
            setSelectedErrorLevels([...selectedErrorLevels, e.target.value])
        } else {
            setSelectedErrorLevels(selectedErrorLevels.filter(id => id !== e.target.value))
        }
    }

    const handleErrorTypeChange = (e) => {
        if (e.target.checked) {
            setSelectedErrorTypes([...selectedErrorTypes, e.target.value])
        } else {
            setSelectedErrorTypes(selectedErrorTypes.filter(id => id !== e.target.value))
        }
    }

    return {
        handleDeviceGroupChange,
        handleTemplateChange,
        handlePointChange,
        handleErrorLevelChange,
        handleErrorTypeChange
    }
}

export default useFilter;