import { createContext, useContext, useEffect, useState } from "react";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import Constants from "../../../../utils/Constants";

const TemplatesContext = createContext();

export const useTemplates = () => useContext(TemplatesContext);

export default function TemplatesProvider({ children }) {
    const [deviceGroups, setDeviceGroups] = useState(null);
    const [deviceTypes, setDeviceTypes] = useState([]);
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        deviceTypes?.length > 0 && setTimeout(async () => {
            try {
                const response = await axiosPrivate.post(Constants.API_URL.DEVICES.CONFIG.GROUP);
                if (response?.status === 200) {
                    let output = []
                    deviceTypes.forEach(type => {
                        output.push({
                            label: type.name,
                            options: response?.data.filter(group => group.id_device_type === type.id).map(group => ({ value: group.id, label: group.name }))
                        })
                    });
                    setDeviceGroups(output);
                }
            }
            catch (error) {
                console.log(error);
            }
        }, 300);
    }, [deviceTypes]);

    useEffect(() => {
        deviceTypes.length === 0 && setTimeout(async () => {
            try {
                const response = await axiosPrivate.post(Constants.API_URL.DEVICES.CONFIG.TYPE);
                if (response?.status === 200) {
                    setDeviceTypes(response?.data);
                }
            }
            catch (error) {
                console.log(error);
            }
        }, 300);
    }, [deviceTypes]);

    return (
        <TemplatesContext.Provider value={{ deviceGroups, setDeviceGroups, deviceTypes, setDeviceTypes }}>
            {children}
        </TemplatesContext.Provider>
    );
}