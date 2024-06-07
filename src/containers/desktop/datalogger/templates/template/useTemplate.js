import { createContext, useContext, useState } from "react";
import { useParams } from "react-router-dom";

const TemplateContext = createContext();

export const useTemplate = () => useContext(TemplateContext);

export default function TemplateProvider({ children }) {
  const [defaultPointList, setDefaultPointList] = useState([]);
  const [defaultMPPTList, setDefaultMPPTList] = useState([]);
  const [defaultStringList, setDefaultStringList] = useState([]);
  const [defaultRegisterList, setDefaultRegisterList] = useState([]);
  const [defaultControlGroupList, setDefaultControlGroupList] = useState([]);
  const [config, setConfig] = useState({});
  const [deviceType, setDeviceType] = useState("");
  const [controlGroups, setControlGroups] = useState([]);

  const { id } = useParams();

  return (
    <TemplateContext.Provider
      value={{
        id,
        defaultPointList,
        setDefaultPointList,
        defaultMPPTList,
        setDefaultMPPTList,
        defaultStringList,
        setDefaultStringList,
        defaultRegisterList,
        setDefaultRegisterList,
        defaultControlGroupList,
        setDefaultControlGroupList,
        config,
        setConfig,
        deviceType,
        setDeviceType,
        controlGroups,
        setControlGroups,
      }}
    >
      {children}
    </TemplateContext.Provider>
  );
}
