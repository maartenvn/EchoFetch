import {EchoService} from "../../service/EchoService";

/**
 * Register a form field parameter for a given method.
 * @param key Key of the form field parameter.
 * @constructor
 */
export function FormField(key: string): Function {
    return EchoService._registerFormFieldParameter(key, false);
}