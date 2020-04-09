import {EchoService} from "../../service/EchoService";

/**
 * Register a query parameter for a given method.
 * @param queryName Name of query
 * @constructor
 */
export function Query(pathName: string): Function {
    return EchoService._registerQueryParameter(pathName);
}