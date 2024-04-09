import Button from "../../../../../components/button/Button";
import Modal from "../../../../../components/modal/Modal";

export default function ConfirmUpdateModal({ confirmUpdate, setConfirmUpdate, updateTemplate }) {

    return (
        <Modal
            title="Confirm Update"
            isOpen={confirmUpdate}
            close={() => setConfirmUpdate(false)}
            footer={
                <div>
                    <Button className="me-3" onClick={() => setConfirmUpdate(false)}>
                        <Button.Text text="No" />
                    </Button>
                    <Button className="ms-3" onClick={() => {
                        updateTemplate();
                        setConfirmUpdate(false)
                    }}>
                        <Button.Text text="Yes" />
                    </Button>
                </div>
            }
        >
            <div>
                <p>Are you sure you want to save all changes? If any devices are using this template, all data will <strong style={{ color: "red" }}>be removed</strong></p>
            </div>
        </Modal>
    );
}