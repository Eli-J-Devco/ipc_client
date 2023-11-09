import { useNavigate } from "react-router-dom";

function useSubmitTemplate(close) {
    const initialValues = {
        name: ""
    };
    const navigate = useNavigate();

    const handleOnSubmit = values => {
        close();
        navigate(`/datalogger/templates/${values.name}/points`);
    };

    return {
        handleOnSubmit,
        initialValues
    };
}

export default useSubmitTemplate;