import EchoService from "../../service/EchoService";
import RequestMethod from "../../types/RequestMethod";
import RequestHeaders from "../../types/RequestHeaders";

/**
 * Used for specifying list of headers.
 * @param headers Object containing the headers
 * @constructor
 */
export default function Headers(headers: RequestHeaders): Function {
    return EchoService._registerRequestHeaders(headers);
}