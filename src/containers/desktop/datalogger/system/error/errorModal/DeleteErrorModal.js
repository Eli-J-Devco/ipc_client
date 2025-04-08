import Button from "../../../../../../components/button/Button";
import FormInput from "../../../../../../components/formInput/FormInput";
import Modal from "../../../../../../components/modal/Modal";
import useDeleteErrorModal from "./useDeleteErrorModal copy"

export default function DeleteErrorModal({ isOpen, close, data, dataList, setDataList }) {
    const { submitDelete } = useDeleteErrorModal({ close, data, dataList, setDataList})
    const footer = <div>
        <Button variant="dark" type="submit" formId="userModal">
            <Button.Text text="Confirm delete" />
        </Button>
        <Button variant="grey" className="ms-3" onClick={() => close()}>
            <Button.Text text="Cancel" />
        </Button>
    </div>

    return (
        <FormInput id="userModal" onSubmit={submitDelete}>
            <Modal
                isOpen={isOpen}
                close={close}
                title={"Confirm delete user"}
                centered
                footer={footer}
            >
                <div className='d-flex justify-content-center'>
                    <p className="text-center">
                        Are you sure you want to delete error with id: <strong>{data.id}</strong>?
                    </p>
                </div>
            </Modal>
        </FormInput>
    )
}