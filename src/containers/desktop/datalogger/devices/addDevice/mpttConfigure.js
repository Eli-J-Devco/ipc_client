import { createColumnHelper } from "@tanstack/react-table";
import Button from "../../../../../components/button/Button";
import FormInput from "../../../../../components/formInput/FormInput";
import Table from "../../../../../components/table/Table";
import { ReactComponent as ExpandIcon } from "../../../../../assets/images/chevron-down.svg";
import { ReactComponent as CollapseIcon } from "../../../../../assets/images/chevron-up.svg";
import { useEffect, useState } from "react";
export default function MPTTConfigure({ initialValues, dataTemplate, setDataTemplate, setInitialValues }) {
    const [dataMptt, setDataMptt] = useState([])
    const mpttColsHelper = createColumnHelper()
    const mpttCols = [
        mpttColsHelper.accessor("toggle", {
            id: "toggle",
            size: 10,
            header: ({ table }) => (
                <div>
                    <Button variant="dark" onClick={() => table.getIsSomeRowsExpanded() ? table.toggleAllRowsExpanded(false) : table.toggleAllRowsExpanded()}>
                        <Button.Image image={table.getIsAllRowsExpanded() || table.getIsSomeRowsExpanded() ? <CollapseIcon /> : <ExpandIcon />} />
                    </Button>
                    <span style={{ paddingLeft: "2rem" }}>#</span>
                </div>
            ),
            cell: ({ row }) => (
                <div style={{ paddingLeft: `${row.depth * 2}rem` }}>
                    {
                        row.getCanExpand() ? (
                            <Button variant="dark" onClick={() => row.toggleExpanded()}>
                                <Button.Image image={row.getIsExpanded() ? <CollapseIcon /> : <ExpandIcon />} />
                            </Button>
                        ) : (
                            <div className="d-flex justify-content-center align-items-center" style={{ width: 30 }}>
                                <div>{row.index + 1}</div>
                            </div>
                        )
                    }
                </div>
            )
        }),
        mpttColsHelper.accessor("name", {
            id: "name",
            header: "Name",
            cell: ({ row }) => <div style={{ paddingLeft: `${row.depth * 2}rem` }}>{row.original?.name}</div>
        }),
        mpttColsHelper.accessor("action", {
            id: "action",
            header: <div className='text-center'>Action</div>,
            cell: ({ row }) => row.original?.subRows && (
                <div className='row justify-content-center'>
                    <button className='col-2 btn btn-success m-1' type="button" onClick={() => console.log(row?.original)} title='Add string'>
                        <span style={{ color: "#fff", fontSize: 20, fontWeight: "700" }}>+</span>
                    </button>
                    <button className='col-2 btn btn-danger m-1' type="button" onClick={() => {

                    }} title='Remove mptt'>
                        <span style={{ color: "#fff", fontSize: 20, fontWeight: "700" }}>-</span>
                    </button>
                </div>
            )
        })
    ]

    const initMptt = {
        mptt_count: dataTemplate.length,
        string_count: dataTemplate.map(item => ({ parent: item?.id_pointkey, count: item.string.length })),
        panel_count: dataTemplate.map(item => item.string.map(string => ({ parent: string?.id_pointkey, count: string.panel.length }))).flat()
    }
    useEffect(() => {
        setDataMptt(dataTemplate)
        setInitialValues({ ...initialValues, mppt: dataTemplate })
    }, [dataTemplate]);

    useEffect(() => {
        console.log(dataMptt)
    }, [dataMptt]);

    const onChangeMpttNumber = (data) => {
        let { mptt_count, string_count, panel_count } = data
        let newMptt = []
        for (let i = 0; i < mptt_count; i++) {
            let dataTemplateItem = dataTemplate[i]
            dataTemplateItem.string = []
            for (let j = 0; j < string_count[i].count; j++) {
                let string = { ...dataTemplateItem }
                string.panel = []
                for (let k = 0; k < panel_count[i * string_count[i].count + j].count; k++) {
                    string.panel.push({ ...dataTemplateItem })
                }
                dataTemplateItem.string.push(string)
            }
            newMptt.push(dataTemplate[i])
        }
        setTimeout(() => {
            setDataMptt(newMptt)
            setInitialValues({ ...initialValues, mppt: newMptt })
        }, 100);
    }
    return (
        <FormInput id="mpttForm" initialValues={initMptt} onSubmit={onChangeMpttNumber}>
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
                    <div className='col-2'>
                        <Button variant="dark" formId="mpttForm" className="mt-4" type="submit">
                            <Button.Text text="Change" />
                        </Button>
                    </div>
                </div>
                <Table columns={{
                    columnDefs: mpttCols
                }}
                    data={dataMptt} />
            </div>
        </FormInput>
    );
}