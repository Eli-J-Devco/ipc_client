import { useState } from "react";
import { useNavigate } from "react-router-dom";

function useTemplatesManagement() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [template, setTemplate] = useState("Modbus Template");
    const [fileUpload, setFileUpload] = useState(null);
    const [columns, ] = useState([
        {
            id: 1,
            slug: "id",
            name: "No."
        }, {
            id: 2,
            slug: "file_name",
            name: "File Name"
        }, {
            id: 3,
            slug: "action",
            name: "Actions"
        }
    ]);
    const [templateList, ] = useState([
        {
            id: "1",
            file_name: "invt"
        }, {
            id: "2",
            file_name: "invt2"
        }, {
            id: "3",
            file_name: "invt3"
        }
    ]);
    const navigate = useNavigate();

    const openModal = value => {
        setIsModalOpen(true);
        setTemplate(value);
    };
    const closeModal = () => setIsModalOpen(false);
    const handleOnItemEdit = item => {
        navigate(`/datalogger/templates/${item.file_name}/points`);
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
        handleOnItemEdit,
        fileUpload,
        handleFileUploadChange
    };
}

export default useTemplatesManagement;