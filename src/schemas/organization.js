import * as Yup from "yup";

export const OrganizationSchema = {name: '', isActive: false};

export const OrganizationSchemaValidation = Yup.object().shape({
    name: Yup.string()
        .required('Required'),
    isActive: Yup.boolean()
        .required('Required'),
});