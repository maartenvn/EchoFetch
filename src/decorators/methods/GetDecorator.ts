import {EchoService} from "../../service/EchoService";
import {RequestMethod} from "../../types/RequestMethod";

/**
 * Used for specifying a GET request
 * @param path Path to the endpoint to fetch
 * @constructor
 */
export function GET(path: string): Function {
    return EchoService._registerRequestMethod(RequestMethod.GET, path);
}