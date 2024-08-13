import { useNavigate } from "react-router-dom";
import useQuickstart from "../useQuickStart";
import { useEffect, useRef, useState } from "react";
import useProjectSetup from "../../../../../hooks/useProjectSetup";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import _ from "lodash";
import LibToast from "../../../../../utils/LibToast";
import { useTranslation } from "react-i18next";
import Constants from "../../../../../utils/Constants";
import { loginService } from "../../../../../services/loginService";
import Libs from "../../../../../utils/Libs";

export default function useSiteInformation() {
  const { t } = useTranslation();
  const { projectSetup, setProjectSetup } = useProjectSetup();
  const [siteInformation, setSiteInformation] = useState({
    id: "",
    name: "",
    location: "",
    description: "",
    administrative_contact: "",
    serial_number: "",
  });

  const axiosPrivate = useAxiosPrivate();
  const isChange = useRef(false);
  const navigate = useNavigate();
  const from = null;
  const to = "/datalogger/quickstart/ethernet-1";
  useEffect(() => {
    /**
     * Fetch site information
     * @author: nhan.tran 2024-03-01
     * @param {int} id site id - will be remove in future
     */
    if (_.isEmpty(projectSetup)) return;

    Libs.progress(true);
    setTimeout(() => {
      setSiteInformation({
        id: projectSetup.id,
        name: projectSetup.name,
        location: projectSetup.location,
        description: projectSetup.description,
        administrative_contact: projectSetup.administrative_contact,
        serial_number: projectSetup.serial_number,
      });
      Libs.progress(false);
    }, 300);
  }, [projectSetup]);

  /**
   * Handles the save operation for the site information.
   * @author nhan.tran 2024-03-01
   * @param {Object} data - The event object.
   */
  const handleSave = (data) => {
    data["id"] = siteInformation["id"];
    isChange.current = !_.isEqual(data, siteInformation);
    if (!isChange.current) {
      LibToast.toast(t("toastMessage.info.noChange"), "info");
      return;
    }

    Libs.progress(true);
    /**
     * Save site information
     * @author nhan.tran 2024-03-01
     * @param {int} id site id - will be remove in future
     * */
    setTimeout(async () => {
      try {
        const response = await axiosPrivate.post(
          Constants.API_URL.PROJECT.PROJECT_UPDATE,
          data
        );
        if (response.status === 200) {
          LibToast.toast(
            "Site information " + t("toastMessage.info.update"),
            "info"
          );
          setProjectSetup({
            ...projectSetup,
            ...data,
          });
          isChange.current = false;
          navigate(to, { replace: true });
        }
      } catch (error) {
        loginService.handleMissingInfo(
          error,
          t("toastMessage.error.updateSiteInfo")
        ) && navigate("/", { replace: true });
      } finally {
        Libs.progress(false);
      }
    }, 300);
  };

  return {
    siteInformation,
    handleSave,
    from,
    to,
  };
}
