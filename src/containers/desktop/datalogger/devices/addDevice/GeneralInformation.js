import { useMemo } from "react";
import FormInput from "../../../../../components/formInput/FormInput";
import { useDeviceManagement } from "../DeviceManagement";
import Button from "../../../../../components/button/Button";
import { useNavigate } from "react-router-dom";
import { isEmpty } from "lodash";
import DeviceUtils from "../DeviceUtils";

export default function GeneralInformation({
  generalInformation,
  setGeneralInformation,
  updateAddingComponent,
}) {
  const navigate = useNavigate();
  const { deviceConfig } = useDeviceManagement();
  const { device_type_groups, device_types, device_groups, templates } =
    deviceConfig;
  const optionTemplate = [
    {
      label: "Built-in",
      options: [],
    },
    {
      label: "Custom",
      options: [],
    },
  ];
  const deviceTypeGroupOptions = useMemo(() => {
    return device_type_groups.map((item) => ({
      label: item.name,
      value: item.id,
      addition: item.addition,
    }));
  }, [device_type_groups]);

  const deviceTypeOptions = useMemo(() => {
    return device_types
      .filter(
        (item) => item.group === generalInformation?.device_type_group?.value
      )
      .map((item) => ({
        label: item.name,
        value: item.id,
        image: item.image,
      }));
  }, [device_types, generalInformation?.device_type_group]);

  const deviceGroupOptions = useMemo(() => {
    return device_groups
      .filter(
        (item) => item.id_device_type === generalInformation?.device_type?.value
      )
      .map((item) => ({
        label: item.name,
        value: item.id,
        type: item.type ? 1 : 0,
      }))
      .reduce(
        (acc, item) => {
          acc[item.type].options.push(item);
          return acc;
        },
        [...optionTemplate]
      );
  }, [device_groups, generalInformation?.device_type]);

  const templateLibraryOptions = useMemo(() => {
    return templates
      .filter(
        (item) =>
          item.id_device_group === generalInformation?.device_group?.value
      )
      .map((item) => ({
        label: item.name,
        value: item.id,
        type: item.type ? 1 : 0,
      }))
      .reduce(
        (acc, item) => {
          acc[item.type].options.push(item);
          return acc;
        },
        [...optionTemplate]
      );
  }, [templates, generalInformation?.device_group]);

  const createTemplateBTN = (
    <Button
      className="col-xl-4 col-md-4 col-sm-4"
      variant="dark"
      onClick={() => navigate("/datalogger/templates")}
    >
      <Button.Text text="Create template" />
    </Button>
  );

  return (
    <>
      <div className="col-xl-6 col-md-12">
        <FormInput.Text
          label="Device ID"
          name="name"
          placeholder="Device name"
          className="mb-3"
          required={true}
        />
      </div>

      <div className="col-xl-6 col-md-12 col-sm-12 d-flex mt-2 ml-5 align-items-center">
        <div className="col-xl-6 col-md-6 col-sm-6">
          <div className="w-75">
            <FormInput.Select
              label="Device type group"
              name="device_type_group"
              value={generalInformation?.device_type_group}
              option={deviceTypeGroupOptions}
              onChange={(e) => {
                DeviceUtils.clearDemoImage();
                setGeneralInformation({
                  ...generalInformation,
                  device_type_group: e,
                  device_type: null,
                  device_group: null,
                  template: null,
                });
              }}
            />
          </div>
        </div>
        {!isEmpty(deviceTypeOptions) && (
          <div className="col-xl-6 col-md-6 col-sm-6">
            <div className="w-75">
              <FormInput.Select
                label="Device type"
                name="device_type"
                option={deviceTypeOptions}
                value={generalInformation?.device_type}
                onChange={(e) => {
                  DeviceUtils.clearDemoImage();
                  setGeneralInformation({
                    ...generalInformation,
                    device_type: e,
                    device_group: null,
                    template: null,
                  });
                }}
              />
            </div>
          </div>
        )}
        {!isEmpty(
          deviceGroupOptions.reduce(
            (acc, item) => [...acc, ...item.options],
            []
          )
        ) && (
          <div className="col-xl-6 col-md-6 col-sm-6">
            <div className="w-75">
              <FormInput.CreatableSelect
                label="Device Group"
                name="device_group"
                option={deviceGroupOptions}
                value={generalInformation?.device_group}
                onChange={(e) => {
                  DeviceUtils.clearDemoImage();

                  setGeneralInformation({
                    ...generalInformation,
                    device_group: e,
                    template: null,
                  });
                }}
              />
            </div>
          </div>
        )}
        {!isEmpty(
          templateLibraryOptions.reduce(
            (acc, item) => [...acc, ...item.options],
            []
          )
        ) && (
          <div className="col-xl-6 col-md-6 col-sm-6">
            <div className="w-75">
              <FormInput.Select
                label="Template Library"
                className="template_library"
                name="template"
                option={templateLibraryOptions}
                value={generalInformation?.template}
                onChange={(e) => {
                  DeviceUtils.clearDemoImage();
                  setGeneralInformation({
                    ...generalInformation,
                    template: e,
                  });
                  updateAddingComponent(
                    generalInformation?.device_type,
                    e.value
                  );
                  setTimeout(async () => {
                    await DeviceUtils.fetchImage(
                      generalInformation?.device_type?.image
                    );
                  }, 1000);
                }}
              />
            </div>
          </div>
        )}
        {((!isEmpty(generalInformation.device_type) &&
          isEmpty(
            deviceGroupOptions.reduce(
              (acc, item) => [...acc, ...item.options],
              []
            )
          )) ||
          (!isEmpty(generalInformation.device_group) &&
            isEmpty(
              templateLibraryOptions.reduce(
                (acc, item) => [...acc, ...item.options],
                []
              )
            ))) &&
          !isEmpty(generalInformation.device_type_group) &&
          createTemplateBTN}
      </div>
    </>
  );
}
