import {EchoService} from "../../service/EchoService";
import {RequestMethod} from "../../types/RequestMethod";

/**
 * Used for encoding the fields data as application/x-www-form-urlencoded.
 * All parameters with @FormField will be added.
 * @constructor
 */
export function FormUrlEncoded(): Function {
    return EchoService._registerFormUrlEncoded();
}