import React from 'react';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import clsx from 'clsx';
import {Formik} from 'formik';
import PageTitle from "../../../components/PageTitle";
import {
    FormControl,
    Grid,
    Divider,
    FormControlLabel,
    Switch, TextField, MenuItem, Input, InputLabel, Select, Chip
} from "@material-ui/core";
import Widget from "../../../components/Widget";
import {makeStyles} from "@material-ui/styles";
import {axiosInstancePrivate} from "../../../utils/network";
import {useParams} from "react-router-dom";
import {BackupSchema, BackupSchemaValidation} from "../../../schemas/backup";
import {CloudProviderSchema, CloudProviderSchemaValidation} from "../../../schemas/cloudprovider";

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '100%',
        },
    }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function FormCloudProvider() {
    const classes = useStyles();
    let {id} = useParams();

    return (
        <>
            <PageTitle title="Cloud Provider"/>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Widget title={`${!!id ? 'Update' : 'Create'} Cloud Provder`} upperTitle>
                        <Divider light/>
                        <Formik
                            initialValues={CloudProviderSchema}
                            onSubmit={async (values, {setSubmitting}) => {
                                setSubmitting(true);
                                try {
                                    await axiosInstancePrivate.post('cloudproviders', values);
                                } catch (e) {
                                    console.log('e: ', e);
                                }
                            }}
                            validationSchema={CloudProviderSchemaValidation}
                        >
                            {(props) => {
                                const {
                                    values,
                                    touched,
                                    errors,
                                    dirty,
                                    isSubmitting,
                                    handleChange,
                                    handleBlur,
                                    handleSubmit,
                                    handleReset,
                                } = props;
                                return (
                                    <form className={classes.root} onSubmit={handleSubmit}>
                                        <FormControl fullWidth className={clsx(classes.margin, classes.textField)}>
                                            <TextField
                                                select
                                                id="organizationId-backup"
                                                label="Organization"
                                                error={errors.organizationId && touched.organizationId}
                                                name="organizationId"
                                                value={values.organizationId}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                helperText={(errors.organizationId && touched.organizationId) && errors.databaseId}
                                            >
                                                <MenuItem value={10}>Ten</MenuItem>
                                                <MenuItem value={20}>Twenty</MenuItem>
                                                <MenuItem value={30}>Thirty</MenuItem>
                                            </TextField>
                                            <TextField
                                                id="name-backup"
                                                name="name"
                                                label="Name"
                                                error={errors.name && touched.name}
                                                value={values.name}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                helperText={(errors.name && touched.name) && errors.name}
                                            />
                                            <TextField
                                                id="accessKey-backup"
                                                name="accessKey"
                                                label="Access Key"
                                                error={errors.accessKey && touched.accessKey}
                                                value={values.accessKey}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                helperText={(errors.accessKey && touched.accessKey) && errors.accessKey}
                                            />
                                            <TextField
                                                id="secretKey-backup"
                                                name="secretKey"
                                                label="Secret Key"
                                                error={errors.secretKey && touched.secretKey}
                                                value={values.secretKey}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                helperText={(errors.secretKey && touched.secretKey) && errors.secretKey}
                                            />
                                            <TextField
                                                id="region-backup"
                                                name="region"
                                                label="Region"
                                                error={errors.region && touched.region}
                                                value={values.region}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                helperText={(errors.region && touched.region) && errors.region}
                                            />
                                            <TextField
                                                id="endpoint-backup"
                                                name="endpoint"
                                                label="Endpoint"
                                                error={errors.endpoint && touched.endpoint}
                                                value={values.endpoint}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                helperText={(errors.endpoint && touched.endpoint) && errors.endpoint}
                                            />
                                        </FormControl>
                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    checked={values.isActive}
                                                    onChange={handleChange}
                                                    name="isActive"
                                                    color="primary"
                                                />
                                            }
                                            label="Is Active?"
                                        />
                                        <DialogActions>
                                            <Button
                                                type="button"
                                                className="outline"
                                                onClick={handleReset}
                                                disabled={!dirty || isSubmitting}
                                            >
                                                Reset
                                            </Button>
                                            <Button type="submit" disabled={isSubmitting}>
                                                Save
                                            </Button>
                                        </DialogActions>
                                    </form>
                                );
                            }}
                        </Formik>
                    </Widget>
                </Grid>
            </Grid>
        </>
    );
}

export default FormCloudProvider;