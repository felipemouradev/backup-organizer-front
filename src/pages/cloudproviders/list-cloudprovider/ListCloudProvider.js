import React, {useCallback, useEffect, useState} from "react";
import {Button, Grid} from "@material-ui/core";
import MUIDataTable from "mui-datatables";

// components
import PageTitle from "../../../components/PageTitle";
import {TableActions} from "../../../components/TableActions/TableActions"
import {axiosInstancePrivate} from "../../../utils/network";
import {useHistory} from "react-router-dom";

const entityName = 'cloudproviders';

export default function ListCloudProvider() {
    let history = useHistory();
    const [cloudproviders, setCloudProviders] = useState([]);

    const fetchData = useCallback(() => {
        axiosInstancePrivate.get(`${entityName}`)
            .then(({data}) => {
                let result = [];
                data.map(org => {
                    result.push([org.name, <TableActions
                        key={org.ID} id={org.ID}
                        cbDelete={fetchData}
                        deleteEntity={entityName}
                    />]);
                });
                setCloudProviders(result);
            });
    }, []);

    useEffect(() => {
        fetchData()
    }, [fetchData]);
    return (
        <>
            <PageTitle title="Cloud Provider"/>
            <Button onClick={() => history.push('/app/form-cloudproviders')} className="btn-primary"
                    style={{marginBottom: 10}} variant="contained"
                    color="primary">
                New Cloud Provider
            </Button>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <MUIDataTable
                        title="CloudProvider List"
                        data={cloudproviders}
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
