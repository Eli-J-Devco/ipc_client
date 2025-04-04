import { useFormik } from 'formik';
import { object } from 'yup';
import { useEffect } from "react";

function useValidate(onSubmit, initialValues = {}, validationSchema = object({})) {
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
        enableReinitialize: true
    });
    useEffect(() => {
        if(formik.submitCount) {
            Object.keys(validationSchema.fields).forEach(value => {
                formik.setFieldTouched(value, true)            
            });
        }
    }, [formik.submitCount]);

    return formik;
}

export default useValidate;