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

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '100%',
        },
    }
}));

function FormBackup() {
    const classes = useStyles();
    const backupSchema = {
        name: '',
        prefixName: '',
        sizeRange: 100000,
        isActive: false,
        organizationId: '',
        frequency: 30
    };

    return (
        <>
            <PageTitle title="Backup"/>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Widget title="Backup Form" upperTitle>
                        <Divider light/>
                        <Formik
                            initialValues={backupSchema}
                            onSubmit={async (values, {setSubmitting}) => {
                                setSubmitting(true);
                                try {
                                    await axiosInstancePrivate.post('backup', values);
                                } catch (e) {
                                    console.log('e: ', e);
                                }
                            }}
                            validationSchema={Yup.object().shape({
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
                                                select
                                                id="organizationId-backup"
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
                                                id="prefixName-backup"
                                                name="prefixName"
                                                label="Prefix Name Backup"
                                                error={errors.prefixName && touched.prefixName}
                                                value={values.prefixName}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                helperText={(errors.prefixName && touched.prefixName) && errors.prefixName}
                                            />
                                            <TextField
                                                id="sizeRange-backup"
                                                name="sizeRange"
                                                label="Size of Slice Backup"
                                                error={errors.sizeRange && touched.sizeRange}
                                                value={values.sizeRange}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                helperText={(errors.sizeRange && touched.sizeRange) && errors.sizeRange}
                                            />
                                            <TextField
                                                id="frequency-backup"
                                                name="frequency"
                                                label="Frequency Backup (in minutes)"
                                                error={errors.frequency && touched.frequency}
                                                value={values.frequency}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                helperText={(errors.frequency && touched.frequency) && errors.frequency}
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

export default FormBackup;