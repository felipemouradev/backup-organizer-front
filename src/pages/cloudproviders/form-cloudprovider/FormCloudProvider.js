import React, {useCallback, useEffect, useState} from 'react';
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
    Switch, TextField, MenuItem
} from "@material-ui/core";
import Widget from "../../../components/Widget";
import {makeStyles} from "@material-ui/styles";
import {axiosInstancePrivate} from "../../../utils/network";
import {useParams} from "react-router-dom";
import {CloudProviderSchema, CloudProviderSchemaValidation} from "../../../schemas/cloudprovider";
import {toastCustom} from "../../../utils/toastCustom";
import {CustomToastContainer} from "../../../components/CustoToastNotification/CustomToastNotification";

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

const entityName = 'cloudproviders';

function FormCloudProvider() {
    const classes = useStyles();
    let {id} = useParams();

    const [orgs, setOrganizations] = useState([]);
    const [cloudProvider, setCloudvider] = useState([]);

    const fetchCloudProvider = useCallback(() => {
        if (!id) {
            return null;
        }
        axiosInstancePrivate.get(`/${entityName}/` + id)
            .then(({data}) => {
                setCloudvider(data);
            });
    }, [id]);

    const fetchOrganization = useCallback(() => {
        axiosInstancePrivate.get('/organizations')
            .then(({data}) => {
                setOrganizations(data);
            });
    }, []);

    useEffect(() => {
        fetchOrganization();
        fetchCloudProvider();
    }, [fetchCloudProvider]);

    const renderOptions = () => {
        const options = [];
        orgs.map((org) => {
            options.push(
                cloudProvider.organizationId === org.ID ?
                    <MenuItem selected={true} value={org.ID} key={org.ID}>{org.name}</MenuItem> :
                    <MenuItem value={org.ID} key={org.ID}>{org.name}</MenuItem>
            );
            console.log('org: ', org);
        });
        return options;
    };

    const save = async (values) => {
        try {
            await axiosInstancePrivate.post(`/${entityName}`, values);
            toastCustom('success', 'Cloud Provider Saved')
        } catch (e) {
            toastCustom('error', 'Error in save Cloud Provider');
        }
    };

    const update = async (values, id) => {
        try {
            await axiosInstancePrivate.put(`/${entityName}/${id}`, values);
            await toastCustom('success', 'Cloud Provider Updated');
        } catch (e) {
            toastCustom('error', 'Error in Update Cloud Provider');
        }
    };

    return (
        <>
            <PageTitle title="Cloud Provider"/>
            <CustomToastContainer/>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Widget title={`${!!id ? 'Update' : 'Create'} Cloud Provder`} upperTitle>
                        <Divider light/>
                        <Formik
                            enableReinitialize={true}
                            initialValues={cloudProvider.ID ? cloudProvider : CloudProviderSchema}
                            onSubmit={async (values, {setSubmitting}) => {
                                setSubmitting(true);
                                !!id ? await update(values, id) : await save(values);
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
                                                {renderOptions()}
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