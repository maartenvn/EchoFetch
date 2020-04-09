import {EchoService} from "../../service/EchoService";
import {RequestHeaders} from "../../types/RequestHeaders";

/**
 * Used for specifying list of headers.
 * @param headers Object containing the headers
 * @constructor
 */
export function Headers(headers: RequestHeaders): Function {
    return EchoService._registerRequestHeaders(headers);
}