import React, {useCallback, useEffect, useState} from "react";
import {Button, Grid} from "@material-ui/core";
import MUIDataTable from "mui-datatables";

// components
import PageTitle from "../../../components/PageTitle";
import {TableActions} from "../../../components/TableActions/TableActions"
import {useHistory} from "react-router-dom";
import {axiosInstancePrivate} from "../../../utils/network";

const entityName = 'backups';

export default function ListBackup() {
    let history = useHistory();
    const [listDatabases, setDatabases] = useState([]);

    const fetchDatabase = useCallback(() => {
        axiosInstancePrivate.get(`/${entityName}`)
            .then(({data}) => {
                let result = [];
                data.map((backup) => {
                    result.push(
                        backup.name,
                        backup.organizationId,
                        <TableActions
                            key={backup.ID}
                            id={backup.ID}
                            cbDelete={fetchDatabase}
                            deleteEntity={entityName}
                        />)
                });
                setDatabases(result);
            });
    }, []);

    useEffect(() => {
        fetchDatabase()
    }, [fetchDatabase]);

    return (
        <>
            <PageTitle title="Backup"/>
            <Button onClick={() => history.push('/app/form-backups')} className="btn-primary"
                    style={{marginBottom: 10}} variant="contained"
                    color="primary">
                New Backup
            </Button>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <MUIDataTable
                        title="Backup List"
                        data={listDatabases}
                        columns={["Name", "Organization", "Actions"]}
                        options={{
                            filterType: "checkbox",
                        }}
                    />
                </Grid>
            </Grid>
        </>
    );
}
