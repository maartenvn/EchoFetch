import {EchoService} from "../../service/EchoService";
import {RequestMethod} from "../../types/RequestMethod";

/**
 * Used for specifying a POST request
 * @param path Path to the endpoint to fetch
 * @constructor
 */
export function POST(path: string): Function {
    return EchoService._registerRequestMethod(RequestMethod.POST, path);
}