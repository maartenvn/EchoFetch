import {EchoService} from "../../service/EchoService";
import {RequestMethod} from "../../types/RequestMethod";

/**
 * Used for encoding the fields data as multipart/form-data.
 * All parameters with @FormField will be added.
 * @constructor
 */
export function FormMultipart(): Function {
    return EchoService._registerFormMultipart();
}