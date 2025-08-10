import {TToast} from "./TToast";
import {SweetAlertIcon} from "./SweetAlertIcon";
import {TNotice} from "./TNotice";
import {SAPosition} from "./SAPosition";
import {TError} from "./TError";
import {TAlert} from "./TAlert";

export class PopFactory {
    public static tToast(overrides: Partial<TToast> = {}): TToast {
        return {
            icon: SweetAlertIcon.Success,
            title: "Logged in successfully",
            ...overrides,
        };
    }

    public static tNotice(overrides: Partial<TNotice> = {}): TNotice {
        return {
            position: SAPosition.BOTTOM_END,
            millisecondsTimer: 2500
        }
    }

    public static tError(overrides: Partial<TError> = {}): TError {
        return {
            title: "Oops...",
            text: "Something went wrong",
            html: false,
            icon: SweetAlertIcon.Error,
            draggable: true,
        }
    }

    public static tAlert(overrides: Partial<TAlert> = {}): TAlert {
        return {
            title: 'Alert title',
            text: 'Default alert text',
            html: false,
            icon: SweetAlertIcon.Success,
            draggable: true
        }
    }

    public static MakeError(requestFailed: string, message: any, overrides: Partial<TError> = {}): TError {
        return {
            title: requestFailed,
            text: message,
            html: false,
            icon: SweetAlertIcon.Error,
            draggable: true,
        };
    }
}