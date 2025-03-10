import { useState, useEffect } from "react";
import Constants from "../../../../../utils/Constants";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate.js";
import { formatDatetime, formatUTCDatetime } from "../../../../../utils/Utils.js"

function compareName( a, b ) {
    if ( a.name < b.name ){
      return -1;
    }
    if ( a.name > b.name ){
      return 1;
    }
    return 0;
}

function useSyncHistory() {
    const [total, setTotal] = useState(100);
    const [limit, setLimit] = useState(Constants.DEFAULT_PAGE_SIZE);
    const [currentPageIndex, setCurrentPageIndex] = useState();
    const [history, setHistory] = useState();
    const [inverterOptions, setInverterOptions] = useState();
    const [selectedInverterOption, setSelectedInverterOption] = useState();
    const [uploadChannelOptions, setUploadChannelOptions] = useState()
    const [selectedUploadChannelOption, setSelectedUploadChannelOption] = useState();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [isOpen, setIsOpen] = useState(false)


    const axiosPrivate = useAxiosPrivate();
    
    const columns = [
        {
            id: 1,
            slug: "id",
            name: "ID",
        }, {
            id: 2,
            slug: "id_device",
            name: "Device ID"
        }, {
            id: 18,
            slug: "device.name",
            name: "Device Name",
        }, {
            id: 3,
            slug: "synced",
            name: "Synced"
        }, {
            id: 4,
            slug: "data",
            name: "Data"
        }, {
            id: 5,
            slug: "id_upload_channel",
            name: "Upload Channel ID"
        }, {
            id: 6,
            slug: "modbusport",
            name: "Modbus Port"
        }, {
            id: 7,
            slug: "modbusdevice",
            name: "Modbus Device"
        }, {
            id: 8,
            slug: "ensuredir",
            name: "Ensure Dir"
        }, {
            id: 9,
            slug: "source",
            name: "Source"
        }, {
            id: 10,
            slug: "filename",
            name: "File Name"
        }, {
            id: 11,
            slug: "deletedfile",
            name: "Deleted File"
        }, {
            id: 12,
            slug: "createtime",
            name: "Create Time"
        }, {
            id: 13,
            slug: "updatetime",
            name: "Update Time"
        }, {
            id: 14,
            slug: "error",
            name: "Error"
        }, {
            id: 15,
            slug: "number_of_time_retry",
            name: "Number of Time Retry"
        }, {
            id: 16,
            slug: "status",
            name: "Status"
        }, {
            id: 17,
            slug: "action",
            name: <div className="text-center">Actions</div>,
            width: 150
        }
    ];
    // Upload Channel List
    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await axiosPrivate.post(
                    Constants.API_URL.UPLOAD_CHANNEL.GET
                );
                let options = data.map(item => {
                    if (item.enable) return { label: item.name, value: item.id, devices: item.devices }
                })
                options = options.filter(item => !!item)
                setUploadChannelOptions(options)
            } catch (e) {
                console.error(e);
            }
        }
        fetchData()
        
    }, [])
    // Device List
    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axiosPrivate.post(
                Constants.API_URL.DEVICES.LIST,
                { id: null }
            )
            let options = [...new Set(data.map(item => ({name: item.name, id: item.id})))]
            
            options = options.sort(compareName)
            options = options.map(option => {
                return {
                    label: `${option.name} - (${option.id})`,
                    value: option.id
                }
            })
            options.unshift({
                label: "All",
                value: null
            })
            setInverterOptions(options)
        }
        fetchData()
    }, [])
    useEffect(() => {
        const fetchData = async () => {
            let device_ids
            if (selectedInverterOption) {
                device_ids = selectedInverterOption.map(item => item.value)
                if (device_ids.indexOf(null) >= 0) {
                    device_ids = null
                }
            } else {
                device_ids = null
            }
            var { data } = await axiosPrivate.post(
                Constants.API_URL.SYNC_DATA.DATE_RANGE,
                { device_ids }
            )
            if (data.start_date && data.end_date) {
                const start_date = new Date(data.start_date+"Z")
                const end_date = new Date(data.end_date+"Z")
                setStartDate(start_date)
                setEndDate(end_date)
            }
        }
        fetchData()
    }, [selectedInverterOption])
    useEffect(() => {
        const fetchData = async () => {
            let device_ids
            if (selectedUploadChannelOption && selectedUploadChannelOption.length) {
                device_ids = selectedUploadChannelOption.map(item => item.devices)
                device_ids = device_ids.flat()
                const inverterOption = device_ids.map(item => ({ label: `${item.name} - (${item.id})`, value: item.id }))
                setSelectedInverterOption(inverterOption)
                console.log(inverterOption)
                setInverterOptions(inverterOption)
                device_ids = device_ids.map(item => item.id)
            } else {
                device_ids = null
                const { data } = await axiosPrivate.post(
                    Constants.API_URL.DEVICES.LIST,
                    { id: null }
                )
                let options = [...new Set(data.map(item => ({name: item.name, id: item.id})))]
                
                options = options.sort(compareName)
                options = options.map(option => {
                    return {
                        label: `${option.name} - (${option.id})`,
                        value: option.id
                    }
                })
                options.unshift({
                    label: "All",
                    value: null
                })
                setInverterOptions(options)
            }
        }
        fetchData()
    }, [selectedUploadChannelOption])
    // Sync Data List
    useEffect(() => {
        const fetchData = async () => {
            try {
                var { data } = await axiosPrivate.post(
                    `${Constants.API_URL.SYNC_DATA.LIST}?page=1&limit=${limit}`,
                )
                let formatedData = data.data.map(item => {
                    var date = new Date(item.id+"Z")
                    return { ...item, id: formatDatetime(date)}
                })
                setTotal(data.total)
                setHistory(formatedData)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
        
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (startDate && endDate) {
                    var start = startDate;
                    start.setHours(0, 0, 0)
                    var end = endDate;
                    end.setHours(23, 59, 59)
                    
                    let device_ids
                    if (selectedInverterOption) {
                        device_ids = selectedInverterOption.map(item => item.value)
                        if (device_ids.indexOf(null) >= 0) {
                            device_ids = null
                        }
                    } else {
                        device_ids = null
                    }

                    console.log(`Get Data of ${device_ids} from ${formatDatetime(start)} to ${formatDatetime(end)}`)
                    if (currentPageIndex) {
                        var { data } = await axiosPrivate.post(
                            `${Constants.API_URL.SYNC_DATA.LIST}?page=${currentPageIndex}&limit=${limit}`,
                            { 
                                device_ids,
                                start_date: formatUTCDatetime(start),
                                end_date: formatUTCDatetime(end)
                            }
                        )
                        const Formateddata = data.data.map(item => {
                            var date = new Date(item.id+"Z")
                            return { ...item, id: formatDatetime(date)}
                        })
                        setHistory(Formateddata)
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
        
    }, [currentPageIndex, limit])

    const handleOnInverterOptionChange= (value) => {
        setSelectedInverterOption(value)
    }
    const handleOnUploadChannelOptionChange= (value) => {
        setSelectedUploadChannelOption(value)
    }

    const handleOnStartDateChange = value => {
        setStartDate(value);
    }
    const handleOnEndDateChange = value => {
        setEndDate(value);
    }

    const handleToday = async () => {
        var start = new Date();
        start.setHours(0, 0, 0)
        setStartDate(start)
        start = formatUTCDatetime(start)
        var end = new Date();
        end.setHours(23, 59, 59)
        setEndDate(end)
        end = formatUTCDatetime(end)

        let device_ids
        if (selectedInverterOption) {
            device_ids = selectedInverterOption.map(item => item.value)
            if (device_ids.indexOf(null) >= 0) {
                device_ids = null
            }
        } else {
            device_ids = null
        }
        var { data } = await axiosPrivate.post(
            `${Constants.API_URL.SYNC_DATA.LIST}?page=1&limit=${Constants.DEFAULT_PAGE_SIZE}`,
            { 
                device_ids,
                start_date: start,
                end_date: end
            }
        )

        const Formateddata = data.data.map(item => {
            var date = new Date(item.id+"Z")
            return { ...item, id: formatDatetime(date)}
        })
        setTotal(data.total)
        setHistory(Formateddata)
        setCurrentPageIndex(1)
        setLimit(Constants.DEFAULT_PAGE_SIZE)
    }

    const handleOnSearch = async () => {
        var start = startDate;
        start.setHours(0, 0, 0)
        start = formatUTCDatetime(start)
        var end = endDate;
        end.setHours(23, 59, 59)
        end = formatUTCDatetime(end)

        let device_ids
        if (selectedInverterOption) {
            device_ids = selectedInverterOption.map(item => item.value)
            if (device_ids.indexOf(null) >= 0) {
                device_ids = null
            }
        } else {
            device_ids = null
        }
        var { data } = await axiosPrivate.post(
            `${Constants.API_URL.SYNC_DATA.LIST}?page=1&limit=${Constants.DEFAULT_PAGE_SIZE}`,
            { 
                device_ids,
                start_date: start,
                end_date: end
            }
        
)

        const Formateddata = data.data.map(item => {
            var date = new Date(item.id+"Z")
            return { ...item, id: formatDatetime(date)}
        })
        setTotal(data.total)
        setHistory(Formateddata)
        setCurrentPageIndex(1)
        setLimit(Constants.DEFAULT_PAGE_SIZE)
    }

    const handleOnDelete = () => {
        setIsOpen(true)
    }
    const handleOnClose = () => {
        setIsOpen(false)
    }

    const handleOnSubmitDelete = async () => {
        let device_ids
        if (selectedInverterOption) {
            device_ids = selectedInverterOption.map(item => item.value)
            if (device_ids.indexOf(null) >= 0) {
                device_ids = null
            }
        } else {
            device_ids = null
        }
        var start = startDate;
        start.setHours(0, 0, 0, 0)
        var end = endDate;
        end.setHours(23, 59, 59, 999)
        console.log(`Delete Logs of ${device_ids ? device_ids : "All"} from ${formatUTCDatetime(start)} to ${formatUTCDatetime(end)}`)
        setIsOpen(false)

        var { data } = await axiosPrivate.post(
            Constants.API_URL.SYNC_DATA.DELETE,
            { 
                device_ids,
                start_date: start,
                end_date: end
            }
        )
        console.log(data)
    }

    return {
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
    };
}

export default useSyncHistory;