import EchoRequest from "../types/EchoRequest";
import EchoResponse from "../types/EchoResponse";
import EchoError from "../types/EchoError";

interface EchoServiceInterceptor {

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
     * @param response
     */
    onError(error: EchoError): EchoError;
}

export default EchoServiceInterceptor;