import React, {useCallback, useEffect, useState} from "react";
import {Button, Grid} from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import {useHistory} from "react-router-dom";
// components
import PageTitle from "../../../components/PageTitle";
import {TableActions} from "../../../components/TableActions/TableActions"
import {axiosInstancePrivate} from "../../../utils/network";

export default function ListDatabase() {
    let history = useHistory();
    const [listDatabases, setDatabases] = useState([]);

    const fetchDatabase = useCallback(() => {
        axiosInstancePrivate.get('/databases')
            .then(({data}) => {
                let result = [];
                data.map(database => {
                    result.push([database.name, database.organizationId, <TableActions
                        key={database.ID} id={database.ID}
                        cbDelete={fetchDatabase}
                        deleteEntity={"databases"}
                    />]);
                });
                setDatabases(result);
            });
    }, []);

    useEffect(() => {
        fetchDatabase()
    }, [fetchDatabase]);

    return (
        <>
            <PageTitle title="Databases"/>
            <Button onClick={() => history.push('/app/form-databases')} className="btn-primary"
                    style={{marginBottom: 10}} variant="contained"
                    color="primary">
                New Database
            </Button>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <MUIDataTable
                        title="Database List"
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
