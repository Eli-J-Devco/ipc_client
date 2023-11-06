import Modal from "../../../../../../../components/modal/Modal";

function EditPointModal({ isOpen, close, data }) {
    return (
        <Modal
            isOpen={isOpen}
            close={close}
            title="Edit Point"
        >
            {Object.keys(data).map(key => <div key={key}>{data[key]}</div>)}
        </Modal>
    );
}

export default EditPointModal;