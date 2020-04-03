import EchoService from "../../service/EchoService";

/**
 * Register a path parameter for a given method.
 * @param pathName Name of parameter
 * @constructor
 */
export default function Path(pathName: string): Function {
    return EchoService._registerPathParameter(pathName);
}