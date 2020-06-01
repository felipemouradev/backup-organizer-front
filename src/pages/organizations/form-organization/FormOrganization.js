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
    Switch, TextField
} from "@material-ui/core";
import Widget from "../../../components/Widget";
import {makeStyles} from "@material-ui/styles";
import {axiosInstancePrivate} from "../../../utils/network";
import {toastCustom} from "../../../utils/toastCustom";
import {withRouter} from "react-router-dom";
import {CustomToastContainer} from "../../../components/CustoToastNotification/CustomToastNotification";
import {useParams} from 'react-router-dom'
import {OrganizationSchema, OrganizationSchemaValidation} from "../../../schemas/organization";

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '100%',
        },
    }
}));

function FormOrganization() {
    const classes = useStyles();
    const {id} = useParams();

    const [org, setOrg] = useState(OrganizationSchema);

    const fetchData = useCallback(() => {
        if (!id) {
            return null;
        }
        axiosInstancePrivate.get('/organizations/' + id)
            .then(({data}) => {
                setOrg(data);
            });
    }, [id]);

    useEffect(() => {
        fetchData()
    }, [fetchData]);

    const save = async (values) => {
        try {
            await axiosInstancePrivate.post('/organizations', values);
            toastCustom('success', 'Organization Saved')
        } catch (e) {
            toastCustom('error', 'Error in save organization');
        }
    };

    const update = async (values, id) => {
        try {
            await axiosInstancePrivate.put('/organizations/' + id, values);
            await toastCustom('success', 'Organization Updated');
        } catch (e) {
            toastCustom('error', 'Error in Update organization');
        }
    };

    console.log('org: ', org);

    return (

        <>
            {console.log('org render: ', org)}
            <PageTitle title="Organization"/>
            <CustomToastContainer/>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Widget title={`${!!id ? 'Update' : 'Create'} Organization`} upperTitle>
                        <Divider light/>
                        <Formik
                            enableReinitialize={true}
                            initialValues={org}
                            onSubmit={async (values, {setSubmitting}) => {
                                setSubmitting(true);
                                !!id ? await update(values, id) : await save(values);
                            }}
                            validationSchema={OrganizationSchemaValidation}
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
                                console.log('values: ', values);
                                return (
                                    <form className={classes.root} onSubmit={handleSubmit}>
                                        <FormControl fullWidth className={clsx(classes.margin, classes.textField)}>
                                            <TextField
                                                id="standard-adornment-amount-1"
                                                name="name"
                                                label="Name"
                                                error={errors.name && touched.name}
                                                value={values.name}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                helperText={(errors.name && touched.name) && errors.name}
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

export default withRouter(FormOrganization);