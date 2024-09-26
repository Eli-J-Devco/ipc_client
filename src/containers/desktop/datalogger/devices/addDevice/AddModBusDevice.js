/********************************************************
 * Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
 * All rights reserved.
 *
 *********************************************************/
import { useMemo } from "react";
import FormInput from "../../../../../components/formInput/FormInput";
import { useDeviceManagement } from "../DeviceManagement";

export const AddModBusDevice = ({
  communicationInformation,
  setCommunicationInformation,
}) => {
  const { deviceConfig } = useDeviceManagement();
  const { communication } = deviceConfig;
  const communicationOptions = useMemo(() => {
    return communication.map((item) => ({
      label: item.name,
      value: item.id,
    }));
  }, [communication]);
  return (
    <>
      <div className="col-xl-6 col-md-12">
        <div className="d-flex my-3">
          <FormInput.Select
            label="How is Modbus Device connected?"
            name="communication"
            value={communicationInformation?.communication}
            option={communicationOptions}
            onChange={(e) =>
              setCommunicationInformation({
                communication: e,
                rtu_bus_address: "",
                tcp_gateway_port: "",
                tcp_gateway_ip: "",
              })
            }
          />
        </div>
      </div>

      <div className="col-xl-6 col-md-12">
        <div className="col-xl-6 col-md-6">
          <FormInput.Text
            label={
              communicationInformation?.communication?.label &&
              communicationInformation?.communication?.label.search(/COM/g) !==
                -1
                ? "RTU Bus Address"
                : "Bus Address"
            }
            name="rtu_bus_address"
            type="number"
            required={true}
            value={communicationInformation?.rtu_bus_address}
            onChange={(e) =>
              setCommunicationInformation({
                ...communicationInformation,
                rtu_bus_address: e.target.value,
              })
            }
            placeholder="1"
          />
        </div>
        {communicationInformation?.communication?.label &&
        communicationInformation?.communication?.label.search(/COM/g) === -1 ? (
          <>
            <div className="col-xl-6 col-md-6">
              <FormInput.Text
                label="MB/TCP Gateway Port"
                name="tcp_gateway_port"
                type="number"
                required={true}
                value={communicationInformation?.tcp_gateway_port}
                onChange={(e) =>
                  setCommunicationInformation({
                    ...communicationInformation,
                    tcp_gateway_port: e.target.value,
                  })
                }
                placeholder="502"
              />
            </div>
            <div className="col-xl-12 col-md-12">
              <FormInput.Text
                label="MB/TCP Gateway IP-Address"
                name="tcp_gateway_ip"
                required={true}
                value={communicationInformation?.tcp_gateway_ip}
                onChange={(e) =>
                  setCommunicationInformation({
                    ...communicationInformation,
                    tcp_gateway_ip: e.target.value,
                  })
                }
                placeholder="1.1.1.1"
              />
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
};
