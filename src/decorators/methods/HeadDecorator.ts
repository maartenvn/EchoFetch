import EchoService from "../../service/EchoService";
import RequestMethod from "../../types/RequestMethod";

/**
 * Used for specifying a HEAD request
 * @param path Path to the endpoint to fetch
 * @constructor
 */
export default function HEAD(path: string): Function {
    return EchoService._registerRequestMethod(RequestMethod.HEAD, path);
}