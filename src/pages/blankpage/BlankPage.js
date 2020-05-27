import React from "react";
import { Grid } from "@material-ui/core";


// components
import PageTitle from "../../components/PageTitle";
import Widget from "../../components/Widget";

export default function BlankPage() {
  return (
    <>
      <PageTitle title="Blank" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Widget title="Material-UI Table" upperTitle noBodyPadding>
            Anything
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}
