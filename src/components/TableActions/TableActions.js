import {Create as CreateIcon, Delete as DeleteIcon} from "@material-ui/icons";
import React from "react";
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import {axiosInstancePrivate} from "../../utils/network";
import {toastCustom} from "../../utils/toastCustom";
import {CustomToastContainer} from "../CustoToastNotification/CustomToastNotification";

export function TableActions(props) {

    const deleteEntity = async () => {
        const {id, deleteEntity} = props;
        try {
            await axiosInstancePrivate.delete(deleteEntity + '/' + id);
            toastCustom("success", "Success");
        } catch (e) {
            toastCustom("error", "Error")
        }

    };

    return <div>
        <CustomToastContainer />
        <Link style={{color: "inherit"}} to={`/app/form-organization/${props.id}`}>
            <CreateIcon/>
        </Link>
        <DeleteIcon onClick={() => deleteEntity()}/>
    </div>
}

TableActions.propTypes = {
    id: PropTypes.any,
    deleteEntity: PropTypes.string
};