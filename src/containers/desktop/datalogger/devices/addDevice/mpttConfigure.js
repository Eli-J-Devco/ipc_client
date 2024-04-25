import { createColumnHelper } from "@tanstack/react-table";
import Button from "../../../../../components/button/Button";
import FormInput from "../../../../../components/formInput/FormInput";
import Table from "../../../../../components/table/Table";
import { ReactComponent as ExpandIcon } from "../../../../../assets/images/chevron-down.svg";
import { ReactComponent as CollapseIcon } from "../../../../../assets/images/chevron-up.svg";
import { useEffect, useState } from "react";
import { POINT_CONFIG, RowAdapter, resortIndex } from "../../../../../utils/TemplateHelper";
import _ from "lodash";
export default function MPTTConfigure({ initialValues, dataTemplate, setDataTemplate, setInitialValues }) {
    const [dataMptt, setDataMptt] = useState([]);
    const [rowSelection, setRowSelection] = useState({});
    const columnsHelper = createColumnHelper();
    const columns = [
        columnsHelper.accessor("toggle", {
            id: "toggle",
            size: 10,
            maxSize: 10,
            header: ({ table }) => (
                <div>
                    <Button
                        variant="dark"
                        onClick={() =>
                            table.getIsSomeRowsExpanded()
                                ? table.toggleAllRowsExpanded(false)
                                : table.toggleAllRowsExpanded()
                        }
                    >
                        <Button.Image
                            image={
                                table.getIsAllRowsExpanded() ||
                                    table.getIsSomeRowsExpanded() ? (
                                    <CollapseIcon />
                                ) : (
                                    <ExpandIcon />
                                )
                            }
                        />
                    </Button>
                </div>
            ),
            cell: ({ row }) => (
                <div style={{ paddingLeft: `${row.depth * 2}rem` }}>
                    {row.getCanExpand() && (
                        <Button variant="dark" onClick={() => row.toggleExpanded()}>
                            <Button.Image
                                image={row.getIsExpanded() ? <CollapseIcon /> : <ExpandIcon />}
                            />
                        </Button>
                    )}
                </div>
            ),
        }),
        columnsHelper.accessor("id_checkbox", {
            id: "id_checkbox",
            size: 10,
            maxSize: 10,
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
                            name: row.original.index,
                            label: `pt${row.original.index}`,
                            checked: row.getIsSelected(),
                            onChange: row.getToggleSelectedHandler(),
                            disabled: POINT_CONFIG.MPPT_CONFIG.values.includes(
                                row.original?.id_config_information
                            ),
                            indeterminate: row.getIsSomeSelected(),
                        }}
                    />
                );
            },
        }),
        columnsHelper.accessor("name", {
            id: "name",
            header: "Name",
            size: 400,
            cell: ({ row }) => (
                <div style={{ paddingLeft: `${row.depth * 2}rem` }}>
                    {row.original?.name}
                </div>
            )
        }),
        columnsHelper.accessor("unit", {
            id: "unit",
            header: "Units",
            size: 80,
            maxSize: 80,
        }),
        columnsHelper.accessor("action", {
            id: "action",
            header: <div className="text-center">Actions</div>,
            cell: ({ row }) => (
                <div className="d-flex justify-content-center">
                    {row.original?.config && row.original?.defaultMaxChildren > row.original?.subRows?.length && (
                        <Button
                            className="mx-2"
                            onClick={() => { }}
                        >
                            <Button.Text text={`Add ${row.original?.config.name}`} />
                        </Button>
                    )}
                </div>
            ),
        }),
    ];

    useEffect(() => {
        let data = dataTemplate?.map((mppt, index) => {
            return {
                ...new RowAdapter(
                    {
                        ...mppt,
                        config: POINT_CONFIG.STRING,
                    },
                    index
                ).getRow(),
                defaultMaxChildren: mppt?.children?.length || 0,
                subRows:
                    mppt?.children?.map((string, sindex) => {
                        return {
                            ...new RowAdapter(
                                {
                                    ...string,
                                    ...(string?.id_config_information ===
                                        POINT_CONFIG.STRING.value
                                        ? {
                                            config: POINT_CONFIG.PANEL,
                                        }
                                        : {
                                            config: "",
                                        }),
                                },
                                sindex
                            ).getRow(),
                            defaultMaxChildren: string?.children?.length || 0,
                            subRows:
                                string?.children?.map((panel, pindex) => {
                                    return {
                                        ...new RowAdapter(panel, pindex).getRow(),
                                    };
                                }) || [],
                        };
                    }) || [],
            };
        });
        setDataMptt(resortIndex(_.cloneDeep(data)));
        setInitialValues({ ...initialValues, mppt: dataTemplate })
    }, [dataTemplate]);

    return (
        <FormInput id="mpttForm">
            <div className='mt-3'>
                <div className='row mb-3'>
                    <div className="col-4">
                        <FormInput.Text
                            label="Number of MPTT"
                            name="mptt_count"
                            placeholder="Number of MPTT"
                            required={true}
                            type='number'
                        />
                    </div>
                    <div className='col-4 d-flex align-items-end'>
                        <Button variant="dark" formId="mpttForm" className="me-2" type="submit">
                            <Button.Text text="Change" />
                        </Button>
                        <Button variant="dark" className="mt-2" onClick={() => { }}>
                            <Button.Text className="text-nowrap" text="Remove selected points" />
                        </Button>
                    </div>
                </div>
                <Table
                    maxHeight="calc(100vh - 600px)"
                    columns={{
                        columnDefs: columns
                    }}
                    data={dataMptt}
                    selectRow={{
                        enable: false,
                        rowSelection: rowSelection,
                        setRowSelection: setRowSelection
                    }}

                />
            </div>
        </FormInput>
    );
}