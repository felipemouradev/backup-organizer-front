import * as Yup from "yup";

export const BackupSchema = {
    name: '',
    prefixName: '',
    sizeRange: 100000,
    isActive: false,
    databaseId: 0,
    cloudProvidersIds: [],
    tableName: '',
    frequency: 30
};

export const BackupSchemaValidation = Yup.object().shape({
    name: Yup.string()
        .required('Required'),
    prefixName: Yup.string()
        .required('Required'),
    sizeRange: Yup.number()
        .required('Required'),
    databaseId: Yup.number()
        .required('Required'),
    cloudProvidersIds: Yup.array()
        .required('Required'),
    frequency: Yup.number()
        .required('Required'),
    isActive: Yup.boolean()
        .required('Required'),
});