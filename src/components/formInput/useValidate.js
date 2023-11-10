import { useFormik } from 'formik';
import { object } from 'yup';

function useValidate(onSubmit, initialValues = {}, validationSchema = object({})) {
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
        enableReinitialize: true
    });

    return formik;
}

export default useValidate;