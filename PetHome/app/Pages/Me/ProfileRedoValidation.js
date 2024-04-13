import * as yup from 'yup';

const phoneRegExp = /^(\+38\d{10}|\d{10})$/

export const validationSchema = yup.object().shape({
    surname: yup.string().required().min(2, 'Закоротке прізвище'),
    name: yup.string().required().min(2, "Закоротке ім'я"),
    email: yup.string().email('Незадовільний формат email').required('Пустий email'),
    phoneNumber: yup.string().matches(phoneRegExp, 'Незадовільний формат номеру телефону').min(10, 'Закороткий номер телефону').max(13, 'Задовгий номер телефону'),
});

const validateProfileRedo = async (object) => {
    try {
        await validationSchema.validate(object, { abortEarly: false });
        return { isValid: true, errors: null };
    } catch (errors) {
        return { isValid: false, errors: errors.errors };
    }
};

export const validateField = async (field, value, setter, validationErrors) => {
    try {
        await yup.reach(validationSchema, field).validate(value);
        setter({ ...validationErrors, [field]: undefined });
    } catch (error) {
        setter({ ...validationErrors, [field]: error.message });
    }
};

export default validateProfileRedo