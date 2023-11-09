import { useFormik } from 'formik';
import * as yup from 'yup';

function useValidate(onSubmit, initialValues) {
    const validationObj = Object.keys(initialValues).reduce((acc, key) => {
        let validate = yup.string();
        switch (key) {
            case "name":
                validate = yup.string().required('Required');
                break;
            
            case "email":
                validate = yup.string().email('Invalid email address').required('Required');
                break;
            
            default:
                break;
        }
        
        return { ...acc, [key]: validate };
    }, {});
    const validationSchema = yup.object(validationObj);

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
        enableReinitialize: true
    });

    return formik;
}

export default useValidate;