import EchoService from "../../service/EchoService";
import RequestMethod from "../../types/RequestMethod";

/**
 * Used for specifying a DELETE request
 * @param path Path to the endpoint to fetch
 * @constructor
 */
export default function DELETE(path: string): Function {
    return EchoService._registerRequestMethod(RequestMethod.DELETE, path);
}