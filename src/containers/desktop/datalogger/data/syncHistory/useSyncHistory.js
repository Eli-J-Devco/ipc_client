import { useState, useEffect } from "react";
import Constants from "../../../../../utils/Constants";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate.js";
import { formatDatetime, formatUTCDatetime, formatDate } from "../../../../../utils/Utils.js"
import LibToast from "../../../../../utils/LibToast";
import _ from "lodash"

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
    // Upload Channel anh Device List
    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await axiosPrivate.post(
                    Constants.API_URL.UPLOAD_CHANNEL.GET
                );
                
                let options = data.map(item => {
                    if (item.enable) return { label: item.name, value: item.id }
                }).filter(item => !!item)
                options.unshift({
                    label: "All",
                    value: null
                })
                setUploadChannelOptions(options)

                options = data.map(item => {
                    if (item.enable) return item.devices
                }).filter(item => !!item)
                options = [...new Set(options.flat().map(JSON.stringify))].map(JSON.parse).sort(compareName)
                options = options.map(item => ({ label: `${item.name} - (${item.id})`, value: item.id }))
                options.unshift({
                    label: "All",
                    value: null
                })
                setInverterOptions(options)
            } catch (e) {
                console.error(e);
            }
        }
        fetchData()
        
    }, [])
    useEffect(() => {
        const fetchData = async () => {
            let device_ids
            if (selectedInverterOption) {
                device_ids = selectedInverterOption.map(item => item.value)
                if (device_ids.indexOf(null) > -1) {
                    device_ids = null
                }
                if (selectedInverterOption.length > 1 && selectedInverterOption.some(item => item.value === null)) {
                    setSelectedInverterOption([{
                        label: "All",
                        value: null
                    }])
                }
            } else {
                device_ids = null
            }
            let channel_ids
            if (selectedUploadChannelOption) {
                channel_ids = selectedUploadChannelOption.map(item => item.value)
                if (channel_ids.indexOf(null) > -1) {
                    channel_ids = null
                }
                if (selectedUploadChannelOption.length > 1 && selectedUploadChannelOption.some(item => item.value === null)) {
                    setSelectedUploadChannelOption([{
                        label: "All",
                        value: null
                    }])
                }
            } else {
                channel_ids = null
            }
            var { data } = await axiosPrivate.post(
                Constants.API_URL.SYNC_DATA.DATE_RANGE,
                { 
                    device_ids, 
                    channel_ids 
                }
            )
            if (data.start_date && data.end_date) {
                const start_date = new Date(data.start_date+"Z")
                const end_date = new Date(data.end_date+"Z")
                setStartDate(start_date)
                setEndDate(end_date)
            }
        }
        fetchData()
    }, [selectedInverterOption, selectedUploadChannelOption])
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
                    start.setHours(0, 0, 0, 0)
                    var end = endDate;
                    end.setHours(23, 59, 59, 999)
                    
                    let device_ids
                    if (selectedInverterOption) {
                        device_ids = selectedInverterOption.map(item => item.value)
                        if (device_ids.indexOf(null) >= 0) {
                            device_ids = null
                        }
                    } else {
                        device_ids = null
                    }
                    let channel_ids
                    if (selectedUploadChannelOption) {
                        channel_ids = selectedUploadChannelOption.map(item => item.value)
                        if (channel_ids.indexOf(null) > -1) {
                            channel_ids = null
                        }
                    } else {
                        channel_ids = null
                    }
                    
                    if (currentPageIndex) {
                        var { data } = await axiosPrivate.post(
                            `${Constants.API_URL.SYNC_DATA.LIST}?page=${currentPageIndex}&limit=${limit}`,
                            { 
                                device_ids,
                                channel_ids,
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
        var output = document.getElementById("progress");
        output.innerHTML = "<div><img src='/loading.gif' /></div>";
        var start = new Date();
        start.setHours(0, 0, 0, 0)
        setStartDate(start)
        start = formatUTCDatetime(start)
        var end = new Date();
        end.setHours(23, 59, 59, 999)
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
        let channel_ids
        if (selectedUploadChannelOption) {
            channel_ids = selectedUploadChannelOption.map(item => item.value)
            if (channel_ids.indexOf(null) > -1) {
                channel_ids = null
            }
        } else {
            channel_ids = null
        }
        try {
            var { data } = await axiosPrivate.post(
                `${Constants.API_URL.SYNC_DATA.LIST}?page=1&limit=${Constants.DEFAULT_PAGE_SIZE}`,
                { 
                    device_ids,
                    channel_ids,
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
        } catch (e) {
            console.log(e)
        } finally {
            output.innerHTML = "";
        }
    }

    const handleOnSearch = async () => {
        var output = document.getElementById("progress");
        output.innerHTML = "<div><img src='/loading.gif' /></div>";
        var start = startDate;
        start.setHours(0, 0, 0)
        start = formatUTCDatetime(start)
        var end = endDate;
        end.setHours(23, 59, 59)
        end = formatUTCDatetime(end)

        let device_ids
        if (selectedInverterOption) {
            device_ids = selectedInverterOption.map(item => item.value)
            if (device_ids.indexOf(null) > -1) {
                device_ids = null
            }
        } else {
            device_ids = null
        }
        let channel_ids
        if (selectedUploadChannelOption) {
            channel_ids = selectedUploadChannelOption.map(item => item.value)
            if (channel_ids.indexOf(null) > -1) {
                channel_ids = null
            }
        } else {
            channel_ids = null
        }
        try {
            var { data } = await axiosPrivate.post(
                `${Constants.API_URL.SYNC_DATA.LIST}?page=1&limit=${Constants.DEFAULT_PAGE_SIZE}`,
                { 
                    device_ids,
                    channel_ids,
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
        } catch (e) {
            console.log(e)
        } finally {
            output.innerHTML = "";
        }
        
    }

    const handleOnDelete = () => {
        setIsOpen(true)
    }
    const handleOnClose = () => {
        setIsOpen(false)
    }

    const handleOnSubmitDelete = async () => {
        var output = document.getElementById("progress");
        output.innerHTML = "<div><img src='/loading.gif' /></div>";
        let device_ids
        if (selectedInverterOption) {
            device_ids = selectedInverterOption.map(item => item.value)
            if (device_ids.indexOf(null) > -1) {
                device_ids = null
            }
        } else {
            device_ids = null
        }
        let channel_ids
        if (selectedUploadChannelOption) {
            channel_ids = selectedUploadChannelOption.map(item => item.value)
            if (channel_ids.indexOf(null) > -1) {
                channel_ids = null
            }
        } else {
            channel_ids = null
        }

        var start_date = startDate;
        start_date.setHours(0, 0, 0, 0)
        var end_date = endDate;
        end_date.setHours(23, 59, 59, 999)
        console.log(`Delete Logs of ${device_ids ? device_ids : "All"} from ${formatUTCDatetime(start_date)} to ${formatUTCDatetime(end_date)}`)
        setIsOpen(false)
        
        try {
            var { data } = await axiosPrivate.post(
                Constants.API_URL.SYNC_DATA.DELETE,
                { 
                    device_ids,
                    channel_ids,
                    start_date,
                    end_date
                }
            )
            LibToast.toast(`Successfully delete logs from ${formatDate(start_date)} to ${formatDate(end_date)}`, 'info');
            var { data } = await axiosPrivate.post(
                `${Constants.API_URL.SYNC_DATA.LIST}?page=1&limit=${Constants.DEFAULT_PAGE_SIZE}`,
                { 
                    device_ids,
                    channel_ids,
                    start_date,
                    end_date
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
        } catch (e) {
            console.log(e)
        } finally {
            output.innerHTML = "";
        }
        
    }

    return {
        columns,
        history,
        total,
        limit, setLimit,
        currentPageIndex, setCurrentPageIndex,
        inverterOptions,
        uploadChannelOptions,
        selectedInverterOption,
        handleOnInverterOptionChange,
        selectedUploadChannelOption,
        handleOnUploadChannelOptionChange,
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