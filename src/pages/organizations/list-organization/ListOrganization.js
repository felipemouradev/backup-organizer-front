import React, {useCallback, useEffect, useState} from "react";
import {Button, Divider, Grid} from "@material-ui/core";
import MUIDataTable from "mui-datatables";

// components
import PageTitle from "../../../components/PageTitle";
import {TableActions} from "../../../components/TableActions/TableActions"
import {axiosInstancePrivate} from "../../../utils/network";
import { useHistory } from "react-router-dom";


export default function ListOrganization() {
    let history = useHistory();
    const [listOrg, setListOrg] = useState([]);

    const fetchData = useCallback(() => {
        axiosInstancePrivate.get('/organizations')
            .then(({data}) => {
                let result = [];
                data.map(org => {
                    result.push([org.name, <TableActions
                        key={org.ID} id={org.ID}
                        cbDelete={fetchData}
                        deleteEntity={"organizations"}
                    />]);
                });
                setListOrg(result);
            });
    }, []);

    useEffect(() => {
        fetchData()
    }, [fetchData]);

    return (
        <>
            <PageTitle title="Organizations"/>
            <Button onClick={()=>history.push('/app/form-organizations')} className="btn-primary" style={{marginBottom: 10}} variant="contained"
                  color="primary">
                New Organization
            </Button>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <MUIDataTable
                        title={"Organization List"}
                        data={listOrg}
                        columns={["Name", "Actions"]}
                        options={{
                            filterType: "checkbox",
                        }}
                    />
                </Grid>
            </Grid>
        </>
    );
}
