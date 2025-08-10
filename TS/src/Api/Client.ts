import $ from "jquery";
import {PopError} from "../Popups/PopError";
import {
    BaseResponseObject,
    EmptyResponse,
    GenericPayload,
    getDefaultRequestOptions,
    RequestOptions,
    Strings,
} from "./Types";
import {PopFactory} from "../Types/SweetAlert/PopFactory";

declare const APP_BACKEND_URL: string;


export class AppApiClient {
    public static BASE_ENDPOINT: string;
    private static instance: AppApiClient;

    // region setup client
    protected constructor() {
        // Pull backend URL from global JS constant
        if (typeof APP_BACKEND_URL === "undefined") {
            throw new Error("APP_BACKEND_URL is not defined in global scope");
        }

        AppApiClient.BASE_ENDPOINT = APP_BACKEND_URL;
    }


    public static getInstance(): AppApiClient {
        if (!AppApiClient.instance)
            AppApiClient.instance = new AppApiClient();

        return AppApiClient.instance;
    }

    // region Get messages strings
    public get_strings(lang_code: string = 'En', request_options?: RequestOptions) {
        return this.ApiCall(
            Strings,
            {lang_code: lang_code},
            "strings",
            {
                ...request_options,
                http_method: "GET"
            }
        );
    }

    private toURLSafeParams(data: GenericPayload): Record<string, string> {
        const params: Record<string, string> = {};

        for (const [key, value] of Object.entries(data)) {
            if (value === undefined || value === null) continue;
            params[key] = String(value);
        }

        return params;
    }

    private _ApiCall<ST extends BaseResponseObject | BaseResponseObject[] = EmptyResponse>(
        data: GenericPayload,
        resolver: (content: object | object[]) => ST,
        path: string,
        request_options: RequestOptions
    ): JQuery.Promise<ST> {
        const reqOptions = request_options ?? getDefaultRequestOptions();
        const httpMethod = (reqOptions.http_method ?? 'POST').toUpperCase();
        let url = `${AppApiClient.BASE_ENDPOINT}/${path}`;

        const deferred = $.Deferred<ST>();

        const ajaxOptions: JQuery.AjaxSettings = {
            url,
            type: httpMethod,
            dataType: "json",
            contentType: "application/json",
            success: (response) => {
                const success = response.status === "success";
                const resultData = response.data;
                if (!success) {
                    deferred.reject(response);
                    return;
                }

                try {
                    const result = resolver(resultData);
                    deferred.resolve(result);
                } catch (e) {
                    console.error("Resolver error:", e);
                    deferred.reject("Failed to process response");
                }
            },
            error: (xhr) => {
                const response = xhr.responseJSON ?? {};
                const message = response.error ?? response.message ?? "Unknown error";

                PopError.fire(PopFactory.MakeError("Request Failed", message));
                deferred.reject(response);
            },
        };

        if (httpMethod === "GET") {
            const query = new URLSearchParams(this.toURLSafeParams(data)).toString();
            ajaxOptions.url += `?${query}`;
        } else {
            ajaxOptions.data = JSON.stringify(data);
        }

        $.ajax(ajaxOptions);
        return deferred.promise();
    }

    private ApiCall<ST extends BaseResponseObject = EmptyResponse>(
        type: { new(v: object): ST },
        params: GenericPayload,
        path: string,
        request_options?: RequestOptions
    ): JQuery.Promise<ST> {
        return this._ApiCall(
            params,
            (content: object) => new type(content),
            path,
            request_options ?? getDefaultRequestOptions()
        );
    }

    // endregion

    private ArrayApiCall<ST extends BaseResponseObject = EmptyResponse>(
        type: { new(v: object): ST },
        params: GenericPayload,
        path: string,
        request_options?: RequestOptions
    ): JQuery.Promise<ST[]> {
        return this._ApiCall(
            params,
            (content: object | object[]) => {
                if (Array.isArray(content)) {
                    return content.map(item => new type(item));
                } else {
                    console.error("Expected array, got single object", content);
                    return [];
                }
            },
            path,
            request_options ?? getDefaultRequestOptions()
        );
    }
}
