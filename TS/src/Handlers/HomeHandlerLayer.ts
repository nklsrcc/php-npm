import {AppApiClient} from '../Api/Client';
import {HandlerLayer} from "./HandlerLayer";
import {Strings} from "../Api/Types";
import {PopAlert} from "../Popups/PopAlert";
import {SweetAlertIcon} from "../Types/SweetAlert/SweetAlertIcon";
import $ from 'jquery';
import {PopError} from "../Popups/PopError";
import {PopNotice} from "../Popups/PopNotice";
import {TAlert} from "../Types/SweetAlert/TAlert";

export class HomeHandlerLayer extends HandlerLayer {
    private client: AppApiClient;

    constructor() {
        super()
        this.client = AppApiClient.getInstance();
    }

    public handle(): void {
        this.setListeners();
    }

    private setListeners(): void {
        this.setGetStringsListenerIt();
        this.setGetStringsListenerDefault();
        this.setGetStringsListenerFr();
        this.setPopError();
        this.setPopNotice();

    }

    private setGetStringsListenerIt(): void {
        $('#getStringsIt').on('click', (e) => {
            this.client.get_strings('It').done((strings: Strings) => {
                let html = '';

                Object.keys(strings).forEach((key) => {
                    if (key === "cached_dom") return; // skip internal prop

                    const value = (strings as any)[key];
                    html += `<strong>${key}:</strong> ${value}<br>`;
                });

                const alert: TAlert = {
                    title: 'Strings',
                    html: true,
                    text: html,
                    icon: SweetAlertIcon.Success,
                    draggable: true,
                }
                PopAlert.fire(alert);
            });
        });
    }

    private setGetStringsListenerDefault(): void {
        $('#getStringsDef').on('click', (e) => {
            this.client.get_strings().done((strings: Strings) => {
                let html = '';

                Object.keys(strings).forEach((key) => {
                    if (key === "cached_dom") return; // skip internal prop

                    const value = (strings as any)[key];
                    html += `<strong>${key}:</strong> ${value}<br>`;
                });
                const alert: TAlert = {
                    title: 'Strings',
                    html: true,
                    text: html,
                    icon: SweetAlertIcon.Success,
                    draggable: true,
                }
                PopAlert.fire(alert);
            });
        });
    }

    private setGetStringsListenerFr(): void {
        $('#getStringsFr').on('click', (e) => {
            this.client.get_strings('Fr').done((strings: Strings) => {
                let html = '';

                Object.keys(strings).forEach((key) => {
                    if (key === "cached_dom") return; // skip internal prop

                    const value = (strings as any)[key];
                    html += `<strong>${key}:</strong> ${value}<br>`;
                });
                const alert: TAlert = {
                    title: 'Strings',
                    html: true,
                    text: html,
                    icon: SweetAlertIcon.Success,
                    draggable: true,
                }
                PopAlert.fire(alert);
            });
        });
    }

    private setPopError(): void {
        $('#popError').on('click', (e) => {
            PopError.fire();
        })
    }

    private setPopNotice(): void {
        $('#popNotice').on('click', (e) => {
            PopNotice.fire();
        })
    }
}