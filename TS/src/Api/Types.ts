import {JSONObject, required} from "ts-json-object";


export class BaseResponseObject extends JSONObject {
    public cached_dom: JQuery<HTMLElement> | null = null;

    constructor(raw: object = {}) {
        super(raw);
    }

    public domCacheLookUp(getter: () => JQuery<HTMLElement>): JQuery<HTMLElement> {
        if (this.cached_dom === null) {
            this.cached_dom = getter();
        }
        return this.cached_dom;
    }
}

export class EmptyResponse extends BaseResponseObject {
}

export interface GenericPayload {

    [x: string]: unknown;
}

export interface RequestOptions {
    url?: string;
    http_method?: "GET" | "POST" | "PUT" | "DELETE";
    headers?: Record<string, string>;
    show_loading?: boolean;
    show_loading_on?: JQuery<HTMLElement>;
    loading_image?: string;
    default_eh?: boolean;
    fail_handle_session_handle?: boolean;
}

export function getDefaultRequestOptions(): RequestOptions {
    return {
        show_loading: true,
        show_loading_on: $(document.body),
        default_eh: true,
        fail_handle_session_handle: true,
        loading_image: "resources/images/loading.gif"
    }
}

export class Strings extends BaseResponseObject {
    @required
    public readonly Login!: string;

    @required
    public readonly Logout!: string;

    @required
    public readonly Username!: string;

    @required
    public readonly Password!: string;

    @required
    public readonly Welcome!: string;

    @required
    public readonly Dashboard!: string;

    @required
    public readonly Settings!: string;

    @required
    public readonly Profile!: string;

    @required
    public readonly Save!: string;

    @required
    public readonly Cancel!: string;

    @required
    public readonly Ok!: string;

    @required
    public readonly Confirm!: string;

    @required
    public readonly Error!: string;

    @required
    public readonly Success!: string;

    @required
    public readonly Warning!: string;

    @required
    public readonly Info!: string;

    @required
    public readonly Continue!: string;

    @required
    public readonly Failed!: string;

    @required
    public readonly Confirmed!: string;
}