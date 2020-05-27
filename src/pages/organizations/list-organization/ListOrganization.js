import React from "react";
import {Grid} from "@material-ui/core";
import MUIDataTable from "mui-datatables";

// components
import PageTitle from "../../../components/PageTitle";
import {TableActions} from "../../../components/TableActions/TableActions"

//mock
const datatableData = [
    ["Org1", <TableActions id={1} deleteEntity={"organizations"}/>],
    ["Org2", <TableActions id={2} deleteEntity={"organizations"}/>,],
];

export default function ListOrganization() {
    return (
        <>
            <PageTitle title="Organizations"/>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <MUIDataTable
                        title="Organization List"
                        data={datatableData}
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
