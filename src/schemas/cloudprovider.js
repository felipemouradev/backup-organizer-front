import * as Yup from "yup";

export const CloudProviderSchema = {
    name: '',
    accessKey: '',
    secretKey: '',
    region: '',
    endpoint: '',
    organizationId: null,
    isActive: false,
};

export const CloudProviderSchemaValidation = Yup.object().shape({
    name: Yup.string()
        .required('Required'),
    accessKey: Yup.string()
        .required('Required'),
    secretKey: Yup.string()
        .required('Required'),
    region: Yup.string()
        .required('Required'),
    organizationId: Yup.number()
        .required('Required'),
    isActive: Yup.boolean()
        .required('Required'),
});