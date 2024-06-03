import * as Yup from 'yup';

const registrationSchema = Yup.object().shape({
    surname: Yup.string()
        .required('Прізвище є обовʼязковим')
        .min(2, 'Прізвище повинно мати щонайменше 2 символи'),

    name: Yup.string()
        .required('Імʼя є обовʼязковим')
        .min(2, 'Імʼя повинно мати щонайменше 2 символи'),

    sex: Yup.mixed()
        .oneOf(['male', 'female'], 'Оберіть стать')
        .required('Стать є обовʼязковою'),

    email: Yup.string()
        .email('Неправильний формат електронної пошти')
        .required('Email є обовʼязковим'),

    phoneNumber: Yup.string()
        .matches(/^\+380\d{9}$/, 'Неправильний формат номера телефону (+380XXXXXXXXX)')
        .required('Номер телефону є обовʼязковим'),

    username: Yup.string()
        .required('Логін є обовʼязковим')
        .min(5, 'Логін повинен мати щонайменше 5 символів'),

    password: Yup.string()
        .required('Пароль є обовʼязковим')
        .min(8, 'Пароль повинен містити щонайменше 8 символів')
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            'Пароль повинен містити літери, цифри та спеціальні символи'
        ),

    confirmPassword: Yup.string()
        .required('Підтвердження паролю є обовʼязковим')
        .oneOf([Yup.ref('password'), null], 'Паролі не співпадають'),

    location: Yup.string().required('Локація є обовʼязковою'),

    locationLat: Yup.string().required('Географічна широта є обовʼязковою'),

    locationLng: Yup.string().required('Географічна довгота є обовʼязковою')
});

export default registrationSchema