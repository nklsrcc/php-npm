import {SweetAlertIcon} from "../Types/SweetAlert/SweetAlertIcon";
import Swal from "sweetalert2";
import {TAlert} from "../Types/SweetAlert/TAlert";
import {PopFactory} from "../Types/SweetAlert/PopFactory";

export class PopAlert {
    public static fire(
        tAlert: TAlert = PopFactory.tAlert()
    ) {
        Swal.fire({
            icon: tAlert.icon,
            title: tAlert.title,
            draggable: tAlert.draggable,
            ...(tAlert.html ? {html: tAlert.text} : {text: tAlert.text}),
            didOpen: (popup) => {
                popup.style.maxHeight = '600px';
                popup.style.overflow = 'auto';
            }
        });
    }
}
