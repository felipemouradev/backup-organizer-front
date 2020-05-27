import * as Yup from "yup";

export const DatabaseSchema = {
    organizationId: '',
    name: '',
    host: '',
    port: 3306,
    isActive: false,
};

export const DatabaseShemaValidation = Yup.object().shape({
    organizationId: Yup.string()
        .required('Required'),
    name: Yup.string()
        .required('Required'),
    host: Yup.string()
        .required('Required'),
    password: Yup.string()
        .required('Required'),
    port: Yup.number()
        .required('Required'),
    isActive: Yup.boolean()
        .required('Required')
});