import React from 'react';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import axios from 'axios';
import clsx from 'clsx';
import {Formik} from 'formik';
import * as Yup from 'yup';
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

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '100%',
        },
    }
}));

const contactFormEndpoint = process.env.REACT_APP_CONTACT_ENDPOINT;

function FormOrganization() {
    const classes = useStyles();
    const organizationSchema = {name: '', isActive: false};

    return (
        <>
            <PageTitle title="Organization"/>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Widget title="Organization Form" upperTitle>
                        <Divider light/>
                        <Formik
                            initialValues={organizationSchema}
                            onSubmit={(values, {setSubmitting}) => {
                                setSubmitting(true);
                                axios.post(contactFormEndpoint,
                                    values,
                                    {
                                        headers: {
                                            'Access-Control-Allow-Origin': '*',
                                            'Content-Type': 'application/json',
                                        }
                                    },
                                ).then((resp) => {
                                        console.log('OK')
                                    }
                                );
                            }}
                            validationSchema={Yup.object().shape({
                                name: Yup.string()
                                    .required('Required'),
                                isActive: Yup.boolean()
                                    .required('Required'),
                            })}
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
                                                Submit
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

export default FormOrganization;