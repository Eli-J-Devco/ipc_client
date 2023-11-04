import { useNavigate } from "react-router-dom";

function useSubmitTemplate(close) {
    const navigate = useNavigate();

    const handleOnSubmit = values => {
        close();
        navigate(`/datalogger/templates/${values.name}/points`);
    };

    return handleOnSubmit;
}

export default useSubmitTemplate;