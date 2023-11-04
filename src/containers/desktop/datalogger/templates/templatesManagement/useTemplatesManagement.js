import { useState } from "react";

function useTemplatesManagement() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [template, setTemplate] = useState("Modbus Template");
    const openModal = value => {
        setIsModalOpen(true);
        setTemplate(value);
    };
    const closeModal = () => setIsModalOpen(false);

    return {
        isModalOpen,
        openModal,
        closeModal,
        template
    };
}

export default useTemplatesManagement;