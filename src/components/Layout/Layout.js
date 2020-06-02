import React from "react";
import {
    Route,
    Switch,
    withRouter,
} from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";

// pages
import Dashboard from "../../pages/dashboard";
import Tables from "../../pages/tables";

// context
import {useLayoutState} from "../../context/LayoutContext";
import BlankPage from "../../pages/blankpage/BlankPage";
import FormOrganization from "../../pages/organizations/form-organization/FormOrganization";
import ListOrganization from "../../pages/organizations/list-organization/ListOrganization";
import ListBackup from "../../pages/backups/list-backup/ListBackup";
import FormBackup from "../../pages/backups/form-backup/FormBackup";
import ListDatabase from "../../pages/databases/list-database/ListDatabase";
import FormDatabase from "../../pages/databases/form-database/FormDatabase";
import ListCloudProvider from "../../pages/cloudproviders/list-cloudprovider/ListCloudProvider";
import FormCloudProvider from "../../pages/cloudproviders/form-cloudprovider/FormCloudProvider";

function Layout(props) {
    var classes = useStyles();

    // global
    var layoutState = useLayoutState();

    return (
        <div className={classes.root}>
            <>
                <Header history={props.history}/>
                <Sidebar/>
                <div
                    className={classnames(classes.content, {
                        [classes.contentShift]: layoutState.isSidebarOpened,
                    })}
                >
                    <div className={classes.fakeToolbar}/>
                    <Switch>
                        <Route path="/app/dashboard" component={Dashboard}/>
                        <Route path="/app/tables" component={Tables}/>
                        <Route path="/app/blank" component={BlankPage}/>
                        <Route path="/app/organizations" component={ListOrganization}/>
                        <Route path="/app/form-organizations/:id?" component={FormOrganization}/>
                        <Route path="/app/databases" component={ListDatabase}/>
                        <Route path="/app/form-databases/:id?" component={FormDatabase}/>
                        <Route path="/app/backups" component={ListBackup}/>
                        <Route path="/app/form-backups/:id?" component={FormBackup}/>
                        <Route path="/app/cloudproviders" component={ListCloudProvider}/>
                        <Route path="/app/form-cloudproviders/:id?" component={FormCloudProvider}/>
                    </Switch>
                </div>
            </>
        </div>
    );
}

export default withRouter(Layout);
