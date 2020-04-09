import {EchoService} from "../../service/EchoService";

/**
 * Register a header parameter for a given method.
 * @param headerName Name of header
 * @constructor
 */
export function Header(headerName: string): Function {
    return EchoService._registerHeaderParameter(headerName);
}