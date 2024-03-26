import { createContext, useContext, useEffect, useState } from "react";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import Constants from "../../../../utils/Constants";

const TemplatesContext = createContext();

export const useTemplates = () => useContext(TemplatesContext);

export default function TemplatesProvider({ children }) {
    const [deviceGroups, setDeviceGroups] = useState(null);
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        !deviceGroups && setTimeout(async () => {
            try {
                const response = await axiosPrivate.post(Constants.API_URL.DEVICE_GROUP.LIST);
                if (response?.status === 200) {
                    setDeviceGroups(response?.data);
                }
            }
            catch (error) {
                console.log(error);
            }
        }, 300);
    }, [deviceGroups, setDeviceGroups]);
    return (
        <TemplatesContext.Provider value={{ deviceType: deviceGroups, setDeviceType: setDeviceGroups }}>
            {children}
        </TemplatesContext.Provider>
    );
}