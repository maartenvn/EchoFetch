import {EchoService} from "../../service/EchoService";

/**
 * Register a map of form field parameters for a given method.
 * @constructor
 */
export function FormFieldObject(): Function {
    return EchoService._registerFormFieldParameter("", true);
}