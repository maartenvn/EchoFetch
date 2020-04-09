import {EchoService} from "../../service/EchoService";

/**
 * Register a body parameter for a given method.
 * @constructor
 */
export function Body(): Function {
    return EchoService._registerBodyParameter();
}