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

function FormBackup() {
    const classes = useStyles();
    let {id} = useParams();

    return (
        <>
            <PageTitle title="Backup"/>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Widget title={`${!!id ? 'Update' : 'Create'} Backup`} upperTitle>
                        <Divider light/>
                        <Formik
                            initialValues={BackupSchema}
                            onSubmit={async (values, {setSubmitting}) => {
                                setSubmitting(true);
                                try {
                                    await axiosInstancePrivate.post('backups', values);
                                } catch (e) {
                                    console.log('e: ', e);
                                }
                            }}
                            validationSchema={BackupSchemaValidation}
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
                                                label="Database"
                                                error={errors.databaseId && touched.databaseId}
                                                name="databaseId"
                                                value={values.databaseId}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                helperText={(errors.databaseId && touched.databaseId) && errors.databaseId}
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
                                            <FormControl className={classes.formControl}>
                                                <InputLabel id="cloudProvidersIds-backup-label">Cloud Providers to Backup</InputLabel>
                                                <Select
                                                    labelId="cloudProvidersIds-backup-label"
                                                    multiple
                                                    id="cloudProvidersIds-backup"
                                                    label="Cloud Providers Backup"
                                                    error={errors.cloudProvidersIds && touched.cloudProvidersIds}
                                                    input={<Input id="cloudProvidersIds-backup"/>}
                                                    name="cloudProvidersIds"
                                                    value={values.cloudProvidersIds}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    helperText={(errors.cloudProvidersIds && touched.cloudProvidersIds) && errors.cloudProvidersIds}
                                                    renderValue={(selected) => (
                                                        <div className={classes.chips}>
                                                            {selected.map((value) => (
                                                                <Chip key={value} label={value}
                                                                      className={classes.chip}/>
                                                            ))}
                                                        </div>
                                                    )}
                                                    MenuProps={MenuProps}
                                                >
                                                    <MenuItem value={10}>Ten</MenuItem>
                                                    <MenuItem value={20}>Twenty</MenuItem>
                                                    <MenuItem value={30}>Thirty</MenuItem>
                                                </Select>
                                            </FormControl>
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