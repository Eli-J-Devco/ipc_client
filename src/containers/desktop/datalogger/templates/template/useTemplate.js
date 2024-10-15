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
  const [config, setConfig] = useState({
    control_input_types: [
      {
        id: 0,
        name: "Not Control",
      },
      {
        id: 1,
        name: "Number",
      },
      {
        id: 2,
        name: "String",
      },
      {
        id: 3,
        name: "Percent",
      },
      {
        id: 4,
        name: "Bool",
      },
    ],
  });
  const [deviceType, setDeviceType] = useState("");
  const [controlGroups, setControlGroups] = useState([]);
  const [templateName, setTemplateName] = useState("");

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
        templateName,
        setTemplateName,
      }}
    >
      {children}
    </TemplateContext.Provider>
  );
}
