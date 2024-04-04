import { createContext, useContext, useState } from "react";
import { useParams } from "react-router-dom";

const TemplateContext = createContext();

export const useTemplate = () => useContext(TemplateContext);

export default function TemplateProvider({ children }) {
    const [defaultPointList, setDefaultPointList] = useState([]);
    const [defaultMPPTList, setDefaultMPPTList] = useState([]);
    const [defaultRegisterList, setDefaultRegisterList] = useState([]);
    const [editedPoint, setEditedPoint] = useState({
        state: true,
        data: []
    });
    const [editedMPPT, setEditedMPPT] = useState({
        state: true,
        data: []
    });
    const [editedRegister, setEditedRegister] = useState({
        state: true,
        data: []
    });
    const [config, setConfig] = useState({});
    const [isChanged, setIsChanged] = useState({
        point: false,
        mppt: false,
        register: false
    });
    const { id } = useParams();

    return (
        <TemplateContext.Provider value={{
            id,
            defaultPointList,
            setDefaultPointList,
            defaultMPPTList,
            setDefaultMPPTList,
            defaultRegisterList,
            setDefaultRegisterList,
            config,
            setConfig,
            editedPoint,
            setEditedPoint,
            editedMPPT,
            setEditedMPPT,
            editedRegister,
            setEditedRegister,
            isChanged,
            setIsChanged
        }}>
            {children}
        </TemplateContext.Provider>
    );
};