import { useFormik } from 'formik';
import * as yup from 'yup';
import isArray from 'lodash/isArray';
import pick from 'lodash/pick';

function useValidate(onSubmit, children) {
    const initialValues = {
        name: "",
        email: ""
    };
    const validationSchema = yup.object({
        name: yup.string().required('Required'),
        email: yup.string().email('Invalid email address').required('Required')
    });

    const fieldsInUse = isArray(children) ? children.map(item => item.props.name) : [children?.props?.name];
    const initialValuesInUse = pick(initialValues, fieldsInUse);
    const validationSchemaInUse = validationSchema.pick(fieldsInUse);

    const formik = useFormik({
        initialValues: initialValuesInUse,
        validationSchema: validationSchemaInUse,
        onSubmit
    });

    return formik;
}

export default useValidate;