/********************************************************
 * Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
 * All rights reserved.
 *
 *********************************************************/
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDeviceManagement } from "../DeviceManagement";
import Constants from "../../../../../utils/Constants";
import { loginService } from "../../../../../services/loginService";
import { createColumnHelper } from "@tanstack/react-table";
import FormInput from "../../../../../components/formInput/FormInput";
import Button from "../../../../../components/button/Button";
import * as yup from "yup";
import _ from "lodash";
import LibToast from "../../../../../utils/LibToast";
import useMQTT from "../../../../../hooks/useMQTT";

export default function useConfigPoints() {
  const [points, setPoints] = useState([]);
  const [point, setPoint] = useState({});
  // const [template, setTemplate] = useState(null);
  const [rowSelection, setRowSelection] = useState([]);

  const axiosPrivate = useAxiosPrivate();
  const { device, setDevice } = useDeviceManagement();
  const { data } = useMQTT();
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const noUnits = ["None", "(No units)"];
  const [initialValues, setInitialValues] = useState({});
  const [schema, setSchema] = useState({});
  const [saving, setSaving] = useState(false);
  const [isFetchingPoint, setIsFetchingPoint] = useState(false);

  const columnsHelper = createColumnHelper();
  const columns = [
    columnsHelper.accessor("id_checkbox", {
      id: "id_checkbox",
      size: 10,
      header: ({ table }) => (
        <FormInput.Check
          {...{
            inline: true,
            name: "all",
            label: "Point#",
            checked: table.getIsAllRowsSelected(),
            onChange: (e) => table.toggleAllRowsSelected(e.target.checked),
          }}
        />
      ),
      cell: ({ row }) => {
        return (
          <FormInput.Check
            {...{
              inline: true,
              name: row.original?.id,
              label: `${row.index}`,
              checked: row.getIsSelected(),
              onChange: row.getToggleSelectedHandler(),
              indeterminate: row.getIsSomeSelected(),
            }}
          />
        );
      },
    }),
    columnsHelper.accessor("name", {
      id: "name",
      header: "Function",
      size: 100,
      cell: ({ row }) => (
        <div>
          <strong>{row.original?.name}</strong>
          <i>
            {!noUnits.includes(row.original?.unit?.name) &&
              ` (${row.original?.unit?.name})`}
          </i>
        </div>
      ),
    }),
    // columnsHelper.accessor("output_values", {
    //   id: "output_values",
    //   header: "Current Reading",
    //   size: 50,
    // }),
    columnsHelper.accessor("low_alarm", {
      id: "low_alarm",
      header: "Low Alarm",
      size: 100,
      cell: ({ row }) => (
        <FormInput.Text
          horizontal
          type="number"
          name={`low_alarm_${row.original?.id}`}
          disabled={!row.original?.status}
        />
      ),
    }),
    columnsHelper.accessor("high_alarm", {
      id: "high_alarm",
      header: "High Alarm",
      size: 100,
      cell: ({ row }) => (
        <FormInput.Text
          horizontal
          type="number"
          name={`high_alarm_${row.original?.id}`}
          disabled={!row.original?.status}
        />
      ),
    }),
    columnsHelper.accessor("control_min", {
      id: "control_min",
      header: "Control Min",
      size: 100,
      cell: ({ row }) => (
        <FormInput.Text
          horizontal
          type="number"
          name={`control_min_${row.original?.id}`}
          disabled={!row.original?.status}
        />
      ),
    }),
    columnsHelper.accessor("control_max", {
      id: "control_max",
      header: "Control Max",
      size: 100,
      cell: ({ row }) => (
        <FormInput.Text
          horizontal
          type="number"
          name={`control_max_${row.original?.id}`}
          disabled={!row.original?.status}
        />
      ),
    }),
    columnsHelper.accessor("action", {
      id: "action",
      header: "Action",
      size: 100,
      cell: ({ row }) => (
        <div className="d-flex flex-wrap justify-content-center">
          <Button
            disabled={!row.original?.status}
            onClick={() => {
              setTimeout(() => {
                setPoint(row.original);
                navigate(`${location.pathname}/${row.original?.id}`, {
                  state: { from: location.pathname },
                });
              }, 100);
            }}
          >
            <Button.Text text="Config Point" />
          </Button>
        </div>
      ),
    }),
  ];

  const output = document.getElementById("progress");

  useEffect(() => {
    setTimeout(() => {
      if (device) {
        let index = data.findIndex((item) => item.id_device === device.id);
        if (index !== -1) {
          setDevice({
            ...device,
            status: data[index].status_device,
            message: data[index].message,
          });
        }
      }
    }, 300);
  }, [data]);

  useEffect(() => {
    if (isFetchingPoint || points.length > 0) return;
    if (!id) {
      navigate("/datalogger/devices/", { replace: true });
      return;
    }

    if (!device?.id) {
      setTimeout(async () => {
        try {
          const response = await axiosPrivate.post(
            Constants.API_URL.DEVICES.GET + `?id=${id}`
          );
          setDevice(response.data);
          return;
        } catch (error) {
          loginService.handleMissingInfo(
            error,
            "Failed to get device information"
          ) && navigate("/", { replace: true });
        }
      }, 300);
    }

    if (points.length === 0)
      output.innerHTML = "<div><img src='/loading.gif' /></div>";

    setIsFetchingPoint(true);
    setTimeout(async () => {
      try {
        const response = await axiosPrivate.post(
          Constants.API_URL.DEVICES.CONFIG.POINT_MAP,
          {
            id: id,
          }
        );
        if (
          _.isEqual(points, response.data?.points) &&
          _.isEqual(device?.template, response.data?.template)
        )
          return;

        setPoints(response.data?.points);
        setInitialValues(
          response.data?.points.reduce((acc, curr) => {
            return {
              ...acc,
              [`low_alarm_${curr["id"]}`]: curr["low_alarm"],
              [`high_alarm_${curr["id"]}`]: curr["high_alarm"],
              [`control_min_${curr["id"]}`]: curr["control_min"],
              [`control_max_${curr["id"]}`]: curr["control_max"],
            };
          }, {})
        );
        setSchema(
          yup.object().shape({
            ...response.data?.points.reduce((acc, curr) => {
              return {
                ...acc,
                [`low_alarm_${curr["id"]}`]: yup
                  .number()
                  .required("Low Alarm is required")
                  .min(0, "Low Alarm must be greater than 0"),
                [`high_alarm_${curr["id"]}`]: yup
                  .number()
                  .required("High Alarm is required")
                  .min(0, "High Alarm must be greater than 0"),
                [`control_min_${curr["id"]}`]: yup
                  .number()
                  .required("Control Min is required")
                  .min(0, "Control Min must be greater than 0"),
                [`control_max_${curr["id"]}`]: yup
                  .number()
                  .required("Control Max is required")
                  .min(0, "Control Max must be greater than 0"),
              };
            }, {}),
          })
        );
      } catch (error) {
        loginService.handleMissingInfo(
          error,
          "Error fetching device configuration."
        ) && navigate("/", { replace: true });
      } finally {
        output.innerHTML = "";
        setIsFetchingPoint(false);
      }
    }, 300);
  }, [device]);

  const handleSave = (data) => {
    if (saving) return;

    setSaving(true);
    const body = {
      id_device: id,
      values: Object.keys(data).reduce((acc, curr) => {
        const id_point = curr.split("_")[2];
        if (acc.find((item) => item.id_point === parseInt(id_point)))
          return acc;

        return [
          ...acc,
          {
            id_point: parseInt(id_point),
            low_alarm: data[`low_alarm_${id_point}`],
            high_alarm: data[`high_alarm_${id_point}`],
            control_min: data[`control_min_${id_point}`],
            control_max: data[`control_max_${id_point}`],
          },
        ];
      }, []),
    };

    output.innerHTML = "<div><img src='/loading.gif' /></div>";
    setTimeout(async () => {
      try {
        const response = await axiosPrivate.post(
          Constants.API_URL.DEVICES.CONFIG.ALARM,
          body
        );
        setPoints(response.data?.points);
        LibToast.toast("Points configured successfully", "info");
      } catch (error) {
        loginService.handleMissingInfo(error, "Failed to configure points") &&
          navigate("/", { replace: true });
      } finally {
        output.innerHTML = "";
        setSaving(false);
      }
    }, 300);
  };

  return {
    points,
    point,
    // template,
    columns,
    rowSelection,
    initialValues,
    schema,
    setRowSelection,
    setPoints,
    handleSave,
  };
}
