import {EchoPromiseStatus} from "./EchoPromiseStatus";
import {EchoError} from "./EchoError";
import {EchoResponse} from "./EchoResponse";

export interface EchoPromise<T> extends Promise<T> {

    /**
     * Status of the request.
     */
    status: EchoPromiseStatus;

    /**
     * Data received on a successful request.
     */
    data?: T;

    /**
     * Error received on a failed request.
     */
    error?: EchoError;

    /**
     * Response received on a successful request.
     */
    response?: EchoResponse;

    /**
     * Get if the request is loading.
     */
    isLoading(): boolean;

    /**
     * Get if the request succeeded.
     */
    isSuccess(): boolean;

    /**
     * Get if the request failed.
     */
    isError(): boolean;

    /**
     * Convert the optional data object to an actual data object.
     *  Warning: will throw error when not defined.
     */
    requireData(): T;

    /**
     * Convert the optional error object to an actual error object.
     *  Warning: will throw error when not defined.
     */
    requireError(): EchoError;

    /**
     * Convert the optional response object to an actual response object.
     *  Warning: will throw error when not defined.
     */
    requireResponse(): EchoResponse;
}

/**
 * Convert a build-in Promise to a EchoPromise
 * @param promise
 */
export function convertToEchoPromise<T>(promise: Promise<T>): EchoPromise<T> {
    let echoPromise = promise as EchoPromise<T>;

    /**
     * Loading
     */
    echoPromise = Object.assign(echoPromise, { status: EchoPromiseStatus.INITIALIZED });

    /**
     * Data
     */
    echoPromise = Object.assign(echoPromise, { data: undefined });

    /**
     * Error
     */
    echoPromise = Object.assign(echoPromise, { error: undefined });

    /**
     * isLoading
     */
    echoPromise = Object.assign(echoPromise, { isLoading: () => echoPromise.status === EchoPromiseStatus.LOADING });

    /**
     * isSuccess
     */
    echoPromise = Object.assign(echoPromise, { isSuccess: () => echoPromise.status === EchoPromiseStatus.SUCCESS });

    /**
     * isError
     */
    echoPromise = Object.assign(echoPromise, { isError: () => echoPromise.status === EchoPromiseStatus.ERROR });

    /**
     * requireData
     */
    echoPromise = Object.assign(echoPromise,
        { requireData: () => {
                if(echoPromise.data === undefined) {
                    throw new Error("Data is undefined.")
                }

                return echoPromise.data!!;
        }
    });

    /**
     * requireResponse
     */
    echoPromise = Object.assign(echoPromise,
        { requireResponse: () => {
                if(echoPromise.response === undefined) {
                    throw new Error("Response is undefined.")
                }

                return echoPromise.response!!;
            }
        });

    /**
     * requireError
     */
    echoPromise = Object.assign(echoPromise,
        { requireError: () => {
                if(echoPromise.error === undefined) {
                    throw new Error("Error is undefined.")
                }

                return echoPromise.error!!;
            }
        });

    return echoPromise;
}