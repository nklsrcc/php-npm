import Swal from "sweetalert2";
import {TError} from "../Types/SweetAlert/TError";
import {PopFactory} from "../Types/SweetAlert/PopFactory";

export class PopError {
    public static fire(
        tError: TError = PopFactory.tError()
    ) {
        Swal.fire({
            icon: tError.icon,
            title: tError.title,
            draggable: tError.draggable,
            ...(tError.html ? {html: tError.text} : {text: tError.text}),
            didOpen: (popup) => {
                popup.style.maxHeight = '600px';
                popup.style.overflow = 'auto';
            }
        });
    }
}