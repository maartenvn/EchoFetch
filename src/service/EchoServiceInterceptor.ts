import {EchoRequest} from "../types/EchoRequest";
import {EchoResponse} from "../types/EchoResponse";
import {EchoError} from "../types/EchoError";

export interface EchoServiceInterceptor {

    /**
     * Called before sending every request.
     * @param request
     */
    onRequest(request: EchoRequest): EchoRequest;

    /**
     * Called after every successful response.
     * @param response
     */
    onResponse(response: EchoResponse): EchoResponse;

    /**
     * Called after every failed response.
     * @param error
     */
    onError(error: EchoError): EchoError;
}