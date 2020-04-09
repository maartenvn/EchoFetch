import {EchoService} from "../../service/EchoService";
import {RequestMethod} from "../../types/RequestMethod";

/**
 * Used for specifying a OPTIONS request
 * @param path Path to the endpoint to fetch
 * @constructor
 */
export function OPTIONS(path: string): Function {
    return EchoService._registerRequestMethod(RequestMethod.OPTIONS, path);
}