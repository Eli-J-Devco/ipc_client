import * as yup from 'yup';

function useEditAlarmModal() {
    const validationSchema = yup.object({
        name: yup.string().required('Required')
    });

    return {
        validationSchema
    };
}

export default useEditAlarmModal;