import { createContext, useContext, useState } from "react";
import { useParams } from "react-router-dom";

const TemplateContext = createContext();

export const useTemplate = () => useContext(TemplateContext);

export default function TemplateProvider({ children }) {
    const [defaultPointList, setDefaultPointList] = useState([]);
    const [defaultRegisterList, setDefaultRegisterList] = useState([]);
    const { id } = useParams();

    return (
        <TemplateContext.Provider value={{ id, defaultPointList, setDefaultPointList, defaultRegisterList, setDefaultRegisterList }}>
            {children}
        </TemplateContext.Provider>
    );
};