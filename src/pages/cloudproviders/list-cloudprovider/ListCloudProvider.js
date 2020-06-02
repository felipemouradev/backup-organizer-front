import React from "react";
import {Grid} from "@material-ui/core";
import MUIDataTable from "mui-datatables";

// components
import PageTitle from "../../../components/PageTitle";
import {TableActions} from "../../../components/TableActions/TableActions"

//mock
const datatableData = [
    ["Backup1", "Org1", <TableActions id={1} deleteEntity={"cloudproviders"}/>],
    ["Backup2", "Org1", <TableActions id={2} deleteEntity={"cloudproviders"}/>,],
];

export default function ListCloudProvider() {
    return (
        <>
            <PageTitle title="Cloud Provider"/>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <MUIDataTable
                        title="Backup List"
                        data={datatableData}
                        columns={["Name", "Organization" ,"Actions"]}
                        options={{
                            filterType: "checkbox",
                        }}
                    />
                </Grid>
            </Grid>
        </>
    );
}
