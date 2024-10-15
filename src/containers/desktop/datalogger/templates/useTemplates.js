import { createContext, useContext, useEffect, useState } from "react";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import Constants from "../../../../utils/Constants";
import { loginService } from "../../../../services/loginService";
import { useNavigate } from "react-router-dom";
import _ from "lodash";

const TemplatesContext = createContext();

export const useTemplates = () => useContext(TemplatesContext);

export default function TemplatesProvider({ children }) {
  const [deviceGroups, setDeviceGroups] = useState(null);
  const [deviceTypes, setDeviceTypes] = useState([]);
  const [templateGroups, setTemplateGroups] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  useEffect(() => {
    deviceTypes?.length > 0 &&
      setTimeout(async () => {
        try {
          const response = await axiosPrivate.post(
            Constants.API_URL.DEVICES.CONFIG.GROUP
          );
          if (response?.status === 200) {
            let output = [];
            deviceTypes.forEach((type) => {
              output.push({
                label: type.name,
                options: response?.data
                  .filter((group) => group.id_device_type === type.id)
                  .map((group) => ({ value: group.id, label: group.name })),
              });
            });
            setDeviceGroups(output);
          }
        } catch (error) {
          console.log(error);
        }
      }, 300);
  }, [deviceTypes]);

  useEffect(() => {
    deviceTypes.length === 0 &&
      setTimeout(async () => {
        try {
          const response = await axiosPrivate.post(
            Constants.API_URL.DEVICES.CONFIG.TYPE
          );
          if (response?.status === 200) {
            setDeviceTypes(response?.data);
          }
        } catch (error) {
          console.log(error);
        }
      }, 300);
  }, [deviceTypes]);

  useEffect(() => {
    if (_.isEmpty(deviceGroups)) return;

    var output = document.getElementById("progress");
    output.innerHTML = "<div><img src='/loading.gif' alt='loading' /></div>";
    setTimeout(async () => {
      try {
        const response = await axiosPrivate.post(
          Constants.API_URL.TEMPLATE.LIST,
          {
            type: 1,
          }
        );
        if (response?.status === 200) {
          setTemplateGroups(setTemplateGroupsByDeviceGroup(response?.data));
        }
      } catch (error) {
        loginService.handleMissingInfo(error, "Failed to fetch templates") &&
          navigate("/", { replace: true });
      } finally {
        output.innerHTML = "";
      }
    }, 300);
  }, [deviceGroups]);

  const setTemplateGroupsByDeviceGroup = (templates) => {
    return deviceGroups
      .map((group) => {
        let filteredGroup = group.options
          .map((option) => {
            let filteredTemplates = templates.filter(
              (template) => template.id_device_group === option.value
            );
            if (filteredTemplates.length === 0) {
              return null;
            }

            return {
              name: option.label,
              subRows: filteredTemplates,
            };
          })
          .filter((item) => item !== null);

        if (filteredGroup.length === 0) {
          return null;
        }
        return {
          name: group.label,
          subRows: filteredGroup,
        };
      })
      .filter((item) => item !== null);
  };

  return (
    <TemplatesContext.Provider
      value={{
        deviceGroups,
        setDeviceGroups,
        deviceTypes,
        setDeviceTypes,
        templateGroups,
        setTemplateGroups,
        setTemplateGroupsByDeviceGroup,
      }}
    >
      {children}
    </TemplatesContext.Provider>
  );
}
