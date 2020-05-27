import * as Yup from "yup";

export const BackupSchema = {
    name: '',
    prefixName: '',
    sizeRange: 100000,
    isActive: false,
    organizationId: '',
    frequency: 30
};

export const BackupSchemaValidation = Yup.object().shape({
    name: Yup.string()
        .required('Required'),
    prefixName: Yup.string()
        .required('Required'),
    sizeRange: Yup.number()
        .required('Required'),
    organizationId: Yup.string()
        .required('Required'),
    frequency: Yup.number()
        .required('Required'),
    isActive: Yup.boolean()
        .required('Required'),
});