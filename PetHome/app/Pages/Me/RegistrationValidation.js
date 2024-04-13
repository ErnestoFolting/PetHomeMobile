import * as yup from 'yup';

const phoneRegExp = /^(\+38\d{10}|\d{10})$/

export const validationSchema = yup.object().shape({
    surname: yup.string().required().min(5),
    name: yup.string().required().min(5, 'Закоротке'),
    email: yup.string().email().required(),
    phoneNumber: yup.string().matches(phoneRegExp, 'Phone number is not valid').min(10).max(13),
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