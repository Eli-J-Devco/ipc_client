import styles from "./Template.module.scss";
import NavTabs from "../../../../../components/navTabs/NavTabs";
import { Outlet } from "react-router-dom";
import { useTemplate } from "./useTemplate";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import Constants from "../../../../../utils/Constants";
import { useLocation, useNavigate } from "react-router-dom";
import { loginService } from "../../../../../services/loginService";

function Template() {
  const {
    id,
    setDefaultPointList,
    setDefaultMPPTList,
    setDefaultStringList,
    setDefaultRegisterList,
    setDefaultControlGroupList,
    setConfig,
    deviceType,
    setDeviceType,
    setControlGroups,
  } = useTemplate();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from || "/datalogger/templates";

  const [isSetUp, setIsSetUp] = useState(false);
  useEffect(() => {
    if (!id) return;

    !isSetUp &&
      setTimeout(async () => {
        try {
          const response = await axiosPrivate.post(
            Constants.API_URL.TEMPLATE.LIST,
            { id: id }
          );
          if (response?.status === 200) {
            setDefaultPointList(response?.data?.points);
            setDefaultMPPTList(response?.data?.point_mppt);
            setDefaultStringList(response?.data?.point_string);
            setDefaultRegisterList(response?.data?.register_blocks);
            setDefaultControlGroupList(response?.data?.point_controls);
            setDeviceType(response?.data?.device_type);
          }

          const responseControlGroups = await axiosPrivate.post(
            `${Constants.API_URL.TEMPLATE.CONFIG.CONTROL_GROUPS}?id_template=${id}`
          );

          if (responseControlGroups?.status === 200) {
            setControlGroups(responseControlGroups?.data);
          }
        } catch (error) {
          loginService.handleMissingInfo(error, "Failed to fetch template") &&
            navigate(from, { replace: true });
        } finally {
          setIsSetUp(true);
        }
      }, 300);
  }, [id, isSetUp]);

  useEffect(() => {
    setTimeout(async () => {
      try {
        const response = await axiosPrivate.post(
          Constants.API_URL.TEMPLATE.CONFIG.GET
        );
        if (response?.status === 200) {
          setConfig(response?.data);
        }
      } catch (error) {
        loginService.handleMissingInfo(
          error,
          "Failed to fetch template config"
        ) && navigate(from, { replace: true });
      }
    }, 300);
  }, [setConfig]);

  useEffect(() => {
    if (!deviceType) return;
    if (
      deviceType.toLowerCase().search(/inverter/g) === -1 &&
      location.pathname.search(/mppt/g) !== -1
    ) {
      navigate(`/datalogger/templates/${id}/points`, { replace: true });
      return;
    }

    if (deviceType.toLowerCase().search(/combiner/g) === -1) {
      if (location.pathname.search(/string/g) !== -1) {
        navigate(`/datalogger/templates/${id}/points`, { replace: true });
        return;
      }
    } else {
      if (location.pathname.search(/points/g) !== -1) {
        navigate(`/datalogger/templates/${id}/string`, { replace: true });
        return;
      }
    }
  }, [location, deviceType]);

  return (
    isSetUp &&
    deviceType && (
      <div className={styles.template}>
        <header className={styles.header}>{`Modbus Template: [${id}]`}</header>

        <div className={styles.body}>
          <div className="row">
            <NavTabs
              className="col-10"
              routes={[
                ...(deviceType.toLowerCase().search(/combiner/g) !== -1
                  ? [
                      {
                        path: `/datalogger/templates/${id}/string`,
                        name: "String",
                      },
                    ]
                  : [
                      {
                        path: `/datalogger/templates/${id}/points`,
                        name: "Point List",
                      },
                    ]),
                ...(deviceType.toLowerCase().search(/inverter/g) !== -1
                  ? [
                      {
                        path: `/datalogger/templates/${id}/mppt`,
                        name: "MPPT",
                      },
                    ]
                  : []),

                {
                  path: `/datalogger/templates/${id}/registers`,
                  name: "Register Blocks",
                },
                {
                  path: `/datalogger/templates/${id}/control-groups`,
                  name: "Control Groups",
                },
              ]}
            />
          </div>

          <div className={styles.outlet}>
            <Outlet />
          </div>
        </div>
      </div>
    )
  );
}

export default Template;
