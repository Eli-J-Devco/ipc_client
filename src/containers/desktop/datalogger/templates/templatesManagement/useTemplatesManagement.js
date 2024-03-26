import { useState } from "react";
import { useNavigate } from "react-router-dom";

function useTemplatesManagement() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [template, setTemplate] = useState("Modbus Template");
    const [fileUpload, setFileUpload] = useState(null);
    const [columns,] = useState([
        {
            id: 1,
            slug: "id",
            name: "No."
        }, {
            id: 2,
            slug: "name",
            name: "File Name"
        }, {
            id: 3,
            slug: "action",
            name: <div className="d-flex flex-wrap justify-content-center">Action</div>
        }
    ]);
    const [templateList, setTemplateList] = useState([]);
    const navigate = useNavigate();

    const openModal = value => {
        setIsModalOpen(true);
        setTemplate(value);
    };
    const closeModal = () => setIsModalOpen(false);
    const handleOnItemEdit = item => {
        navigate(`/datalogger/templates/${item.id}/points`);
    };
    const handleFileUploadChange = (e) => {
        setFileUpload(e.target.files ? e.target.files[0] : undefined)
    }

    return {
        isModalOpen,
        openModal,
        closeModal,
        template,
        columns,
        templateList,
        setTemplateList,
        handleOnItemEdit,
        fileUpload,
        handleFileUploadChange
    };
}

export default useTemplatesManagement;