import Swal from 'sweetalert2';
import {TToast} from "../Types/SweetAlert/TToast";
import {PopFactory} from "../Types/SweetAlert/PopFactory";
import {TNotice} from "../Types/SweetAlert/TNotice";

export class PopNotice {

    public static fire(tNotice: TNotice = PopFactory.tNotice(), toast: TToast = PopFactory.tToast()): void {
        const Toast = Swal.mixin({
            toast: true,
            position: tNotice.position,
            showConfirmButton: false,
            timer: tNotice.millisecondsTimer,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
        Toast.fire(toast
        );

    }
}