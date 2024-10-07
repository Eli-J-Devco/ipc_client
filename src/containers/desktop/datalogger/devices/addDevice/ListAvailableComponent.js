import Modal from "../../../../../components/modal/Modal";
import { ReactComponent as FilterIcon } from "../../../../../assets/images/filter.svg";
import FormInput from "../../../../../components/formInput/FormInput";
import useListAvailableComponent from "./useListAvailableComponent";
import Table from "../../../../../components/table/Table";
import Button from "../../../../../components/button/Button";
export function ListAvailableComponent({
  onClose,
  plugPoints,
  existingComponents,
  deviceTypes,
}) {
  const {
    columns,
    searchParams,
    setSearchParams,
    deviceTypeOptions,
    communicationOptions,
    validationSchemas,
    onSubmit,
    dataTable,
    rowSelection,
    setRowSelection,
    pagination,
    setPagination,
  } = useListAvailableComponent({ existingComponents, deviceTypes });
  return (
    <FormInput
      initialValues={searchParams}
      validationSchema={validationSchemas}
      onSubmit={onSubmit}
      id="a"
    >
      <Modal
        className="h-75"
        isOpen={true}
        close={onClose}
        title="Add Device"
        size="lg"
        centered
        footer={
          <Button>
            <Button.Text text="Add" />
          </Button>
        }
      >
        <div className="row">
          <div className="col-4">
            <div className="row justify-content-between">
              <div className="col-2">
                <FilterIcon />
              </div>
              <Button className="col-4" type="submit" formId="a">
                <Button.Text text="Apply" />
              </Button>
            </div>
            <FormInput.Select
              className={"mt-3"}
              label="Position"
              name="position"
              option={plugPoints}
              horizontal={true}
              // value={searchParams.position}
              // onChange={(e) => {
              //   setSearchParams({
              //     ...searchParams,
              //     position: e,
              //   });
              // }}
            />
            <FormInput.Text
              className={"mt-3"}
              label="Name"
              name="name"
              placeholder="Enter to search"
              value=""
              onChange={() => {}}
            />
            <FormInput.Select
              className={"mt-3"}
              label={"Device Type"}
              name="device_type"
              option={deviceTypeOptions}
              value={searchParams.device_type}
              onChange={(e) => {
                setSearchParams({
                  ...searchParams,
                  device_type: e,
                });
              }}
            />
            <FormInput.Select
              className={"mt-3"}
              label={"Communication"}
              name="communication"
              option={communicationOptions}
              value={searchParams.communication}
              onChange={(e) => {
                setSearchParams({
                  ...searchParams,
                  communication: e,
                });
              }}
              isClearable={true}
            />
            <FormInput.Text
              className={"mt-3"}
              label="IP Address"
              name="ip_address"
              placeholder="Enter IP Address to search"
              value={searchParams.ip_address}
              onChange={(e) => {
                setSearchParams({
                  ...searchParams,
                  ip_address: e.target.value,
                });
              }}
            />

            <FormInput.Range
              label={"Bus Address"}
              className="position-relative mt-3"
              name="rtu_bus_address_range"
              placeholder="Enter  to search"
              horizontal
              min={1}
              max={255}
              isMulti={true}
              isAllowInputRange={true}
            />
            <FormInput.Range
              label={"TCP Port"}
              className="position-relative mt-3"
              name="tcp_port"
              placeholder="Enter  to search"
              horizontal
              min={1}
              max={65535}
              isMulti={true}
              isAllowInputRange={true}
            />
          </div>
          <div className="col-8">
            <Table
              columns={{ columnDefs: columns }}
              data={dataTable}
              selectRow={{ rowSelection, setRowSelection, enable: false }}
              // pagination={{
              //   enable: true,
              //   total: pagination.total,
              //   setLimit: (limit) => {
              //     setPagination({
              //       ...pagination,
              //       limit,
              //     });
              //   },
              //   setOffset: (offset) => {
              //     setPagination({
              //       ...pagination,
              //       offset,
              //     });
              //   },
              // }}
            />
          </div>
        </div>
      </Modal>
    </FormInput>
  );
}
