import {toast} from "react-toastify";

export function toastCustom(notificationType, message) {
    toast[notificationType](message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}
