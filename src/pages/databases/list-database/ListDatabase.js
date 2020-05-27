import React from "react";
import {Grid} from "@material-ui/core";
import MUIDataTable from "mui-datatables";

// components
import PageTitle from "../../../components/PageTitle";
import {TableActions} from "../../../components/TableActions/TableActions"

//mock
const datatableData = [
    ["Backup Daily", "Org1", <TableActions id={1} deleteEntity={"databases"}/>],
    ["Backup Every thirty minutes", "Org2", <TableActions id={2} deleteEntity={"databases"}/>,],
];

export default function ListDatabase() {
    return (
        <>
            <PageTitle title="Databases"/>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <MUIDataTable
                        title="Database List"
                        data={datatableData}
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
