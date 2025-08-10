import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';

import {DataHandlerLayer} from "./Handlers/DataHandlerLayer";
import {HomeHandlerLayer} from "./Handlers/HomeHandlerLayer";

export class App extends DataHandlerLayer {
    public start(): void {
        const currentPath = window.location.pathname;


        const handlers: Record<string, () => void> = {
            "/": () => new HomeHandlerLayer().handle(),
        };

        if (handlers[currentPath]) {
            handlers[currentPath]();
        } else {
            console.warn(`No handler defined for route: ${currentPath}`);
        }
    }
}

// @ts-ignore
globalThis.app = new App();

// @ts-ignore
globalThis.TS$ = $;

// @ts-ignore
$(() => globalThis.app.start());
