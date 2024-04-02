import { createContext, useContext, useState } from "react";
import { useParams } from "react-router-dom";

const TemplateContext = createContext();

export const useTemplate = () => useContext(TemplateContext);

export default function TemplateProvider({ children }) {
    const [defaultPointList, setDefaultPointList] = useState([]);
    const [defaultMPPTList, setDefaultMPPTList] = useState([]);
    const [defaultRegisterList, setDefaultRegisterList] = useState([]);
    const [editedPoint, setEditedPoint] = useState({});
    const [editedMPPT, setEditedMPPT] = useState({});
    const [editedRegister, setEditedRegister] = useState({});
    const [config, setConfig] = useState({});
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
            setEditedRegister
        }}>
            {children}
        </TemplateContext.Provider>
    );
};