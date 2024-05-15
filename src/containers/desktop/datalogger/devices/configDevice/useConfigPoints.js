/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import { useLocation, useNavigate } from "react-router-dom";
import { useDeviceManagement } from "../DeviceManagement";
import Constants from "../../../../../utils/Constants";
import { loginService } from "../../../../../services/loginService";
import { createColumnHelper } from "@tanstack/react-table";
import FormInput from "../../../../../components/formInput/FormInput";
import Button from "../../../../../components/button/Button";
import * as yup from "yup";
import _ from "lodash";
import LibToast from "../../../../../utils/LibToast";

export default function useConfigPoints() {
  const [points, setPoints] = useState([]);
  const [point, setPoint] = useState({});
  const [template, setTemplate] = useState(null);
  const [rowSelection, setRowSelection] = useState([]);

  const axiosPrivate = useAxiosPrivate();
  const { device } = useDeviceManagement();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || { pathname: '/datalogger/devices' };

  const noUnits = ["None", "(No units)"];
  const [initialValues, setInitialValues] = useState({});
  const [schema, setSchema] = useState({});
  const [saving, setSaving] = useState(false);

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
    }),
    columnsHelper.accessor("output_values", {
      id: "output_values",
      header: "Current Reading",
      size: 50,
    }),
    columnsHelper.accessor("low_alarm", {
      id: "low_alarm",
      header: "Low Alarm",
      size: 200,
      cell: ({ row }) => (
        <FormInput.Text
          unit={!noUnits.includes(row.original?.unit?.name) && row.original?.unit?.name}
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
      size: 200,
      cell: ({ row }) => (
        <FormInput.Text
          unit={!noUnits.includes(row.original?.unit?.name) && row.original?.unit?.name}
          horizontal
          type="number"
          name={`high_alarm_${row.original?.id}`}
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
                navigate(`${location.pathname}/${row.original?.id}`, { state: { from: location.pathname } });
              }, 100);
            }}
          >
            <Button.Text text="Config Point" />
          </Button>
        </div>
      ),
    })
  ]

  const output = document.getElementById("progress");

  useEffect(() => {
    if (!device?.id) {
      navigate(from, { replace: true });
      return;
    };

    if (points.length === 0)
      output.innerHTML = "<div><img src='/loading.gif' /></div>";

    setTimeout(async () => {
      try {
        const response = await axiosPrivate.post(Constants.API_URL.DEVICES.CONFIG.POINT_MAP, {
          id: device.id
        });
        if (_.isEqual(points, response.data?.points) && template === response.data?.template) return;

        setPoints(response.data?.points);
        setTemplate(response.data?.template);
        setInitialValues(response.data?.points.reduce((acc, curr) => {
          return {
            ...acc,
            [`low_alarm_${curr["id"]}`]: curr["low_alarm"],
            [`high_alarm_${curr["id"]}`]: curr["high_alarm"]
          }
        }, {}));
        setSchema(yup.object().shape({
          ...response.data?.points.reduce((acc, curr) => {
            return {
              ...acc,
              [`low_alarm_${curr["id"]}`]: yup.number().required("Low Alarm is required").min(0, "Low Alarm must be greater than 0"),
              [`high_alarm_${curr["id"]}`]: yup.number().required("High Alarm is required").min(0, "Low Alarm must be greater than 0"),
            }
          }, {})
        }));
      } catch (error) {
        loginService.handleMissingInfo(error, "Error fetching device configuration.") && navigate("/", { replace: true });
      } finally {
        output.innerHTML = "";
      }
    }, 300);
  }, [device])

  const handleSave = (data) => {
    if (saving) return;

    setSaving(true);
    const body = {
      id_device: device.id,
      values: Object.keys(data).reduce((acc, curr) => {
        const id_point = curr.split("_")[2];
        if (acc.find(item => item.id_point === parseInt(id_point))) return acc;

        return [
          ...acc,
          {
            id_point: parseInt(id_point),
            low_alarm: data[`low_alarm_${id_point}`],
            high_alarm: data[`high_alarm_${id_point}`]
          }
        ]
      }, [])
    }

    output.innerHTML = "<div><img src='/loading.gif' /></div>";
    setTimeout(async () => {
      try {
        const response = await axiosPrivate.post(Constants.API_URL.DEVICES.CONFIG.ALARM, body);
        setPoints(response.data?.points);
        LibToast.toast("Points configured successfully", "info");
      } catch (error) {
        loginService.handleMissingInfo(error, "Failed to configure points") && navigate("/", { replace: true });
      } finally {
        output.innerHTML = "";
        setSaving(false);
      }
    }, 300);
  }

  return {
    points,
    point,
    template,
    columns,
    rowSelection,
    initialValues,
    schema,
    setRowSelection,
    setPoints,
    handleSave,
  }
}
