import { useNavigate } from "react-router-dom";
import * as yup from 'yup';

function useSubmitTemplate(close) {
    const initialValues = {
        name: ""
    };

    const validationSchema = yup.object({
        name: yup.string().required('Required')
    });

    const navigate = useNavigate();

    const handleOnSubmit = values => {
        close();
        navigate(`/datalogger/templates/${values.name}/points`);
    };

    return {
        handleOnSubmit,
        initialValues,
        validationSchema
    };
}

export default useSubmitTemplate;