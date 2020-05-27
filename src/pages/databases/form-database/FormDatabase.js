import React from 'react';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import clsx from 'clsx';
import {Formik} from 'formik';
import * as Yup from 'yup';
import PageTitle from "../../../components/PageTitle";
import {
    FormControl,
    Grid,
    Divider,
    FormControlLabel,
    Switch, TextField, InputLabel, Select, MenuItem, FormHelperText
} from "@material-ui/core";
import Widget from "../../../components/Widget";
import {makeStyles} from "@material-ui/styles";
import {axiosInstancePrivate} from "../../../utils/network";
import {useParams} from "react-router-dom";
import {DatabaseSchema, DatabaseShemaValidation} from "../../../schemas/database";

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
    return (
        <>
            <PageTitle title="Database"/>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Widget title={`${!!id ? 'Update' : 'Create'} Database`} upperTitle>
                        <Divider light/>
                        <Formik
                            initialValues={DatabaseSchema}
                            onSubmit={async (values, {setSubmitting}) => {
                                setSubmitting(true);
                                try {
                                    await axiosInstancePrivate.post('databases', values);
                                } catch (e) {
                                    console.log('e: ', e);
                                }
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
                                                <MenuItem value={10}>Ten</MenuItem>
                                                <MenuItem value={20}>Twenty</MenuItem>
                                                <MenuItem value={30}>Thirty</MenuItem>
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