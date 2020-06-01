import {Create as CreateIcon, Delete as DeleteIcon} from "@material-ui/icons";
import React from "react";
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import {axiosInstancePrivate} from "../../utils/network";
import {toastCustom} from "../../utils/toastCustom";
import {CustomToastContainer} from "../CustoToastNotification/CustomToastNotification";

export function TableActions(props) {
    const {id, deleteEntity, cbDelete} = props;
    const fnDeleteEntity = async () => {
        try {
            await axiosInstancePrivate.delete(deleteEntity + '/' + id);
            cbDelete();
            toastCustom("success", "Success");
        } catch (e) {
            toastCustom("error", "Error")
        }

    };

    return <div>
        <CustomToastContainer />
        <Link style={{color: "inherit"}} to={`/app/form-${deleteEntity}/${props.id}`}>
            <CreateIcon/>
        </Link>
        <DeleteIcon onClick={() => fnDeleteEntity()}/>
    </div>
}

TableActions.propTypes = {
    id: PropTypes.any,
    deleteEntity: PropTypes.string,
    cbDelete: ()=> {}
};