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
import {DatabaseSchema, DatabaseShemaValidation} from "../../../schemas/database";
import {CustomToastContainer} from "../../../components/CustoToastNotification/CustomToastNotification";
import {toastCustom} from "../../../utils/toastCustom";

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '100%',
        },
    }
}));

function FormDatabase() {
    const classes = useStyles();
    let {id} = useParams();

    const [orgs, setOrganizations] = useState([]);
    const [dataBase, setDatabase] = useState([]);

    const fetchDatabase = useCallback(() => {
        if (!id) {
            return null;
        }
        axiosInstancePrivate.get('/databases/' + id)
            .then(({data}) => {
                setDatabase(data);
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
        fetchDatabase();
    }, [fetchOrganization]);


    const renderOptions = () => {
        const options = [];
        orgs.map((org) => {
            options.push(
                dataBase.organizationId === org.ID ?
                    <MenuItem selected={true} value={org.ID} key={org.ID}>{org.name}</MenuItem> :
                    <MenuItem value={org.ID} key={org.ID}>{org.name}</MenuItem>
            );
            console.log('org: ', org);
        });
        return options;
    };

    const save = async (values) => {
        try {
            await axiosInstancePrivate.post('/databases', values);
            toastCustom('success', 'Database Saved')
        } catch (e) {
            toastCustom('error', 'Error in save database');
        }
    };

    const update = async (values, id) => {
        try {
            await axiosInstancePrivate.put('/databases/' + id, values);
            await toastCustom('success', 'Database Updated');
        } catch (e) {
            toastCustom('error', 'Error in Update database');
        }
    };

    return (
        <>
            <PageTitle title="Database"/>
            <CustomToastContainer/>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Widget title={`${!!id ? 'Update' : 'Create'} Database`} upperTitle>
                        <Divider light/>
                        <Formik
                            enableReinitialize={true}
                            initialValues={dataBase.ID ? dataBase : DatabaseSchema}
                            onSubmit={async (values, {setSubmitting}) => {
                                setSubmitting(true);
                                !!id ? await update(values, id) : await save(values);
                            }}
                            validationSchema={DatabaseShemaValidation}
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
                                                id="organizationId-database"
                                                label="Organization"
                                                error={errors.organizationId && touched.organizationId}
                                                name="organizationId"
                                                value={values.organizationId}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                helperText={(errors.organizationId && touched.organizationId) && errors.organizationId}
                                            >
                                                {renderOptions()}
                                            </TextField>
                                            <TextField
                                                id="name-database"
                                                name="name"
                                                label="Name"
                                                error={errors.name && touched.name}
                                                value={values.name}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                helperText={(errors.name && touched.name) && errors.name}
                                            />
                                            <TextField
                                                id="host-database"
                                                name="host"
                                                label="Host"
                                                error={errors.host && touched.host}
                                                value={values.host}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                helperText={(errors.host && touched.host) && errors.host}
                                            />
                                            <TextField
                                                id="username-database"
                                                name="username"
                                                label="Username"
                                                error={errors.username && touched.username}
                                                value={values.username}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                helperText={(errors.username && touched.username) && errors.username}
                                            />
                                            <TextField
                                                id="password-database"
                                                name="password"
                                                label="Password"
                                                error={errors.password && touched.password}
                                                value={values.password}
                                                type="password"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                helperText={(errors.password && touched.password) && errors.password}
                                            />
                                            <TextField
                                                id="port-database"
                                                name="port"
                                                label="Port"
                                                type="number"
                                                error={errors.port && touched.port}
                                                value={values.port}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                helperText={(errors.port && touched.port) && errors.port}
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

export default FormDatabase;