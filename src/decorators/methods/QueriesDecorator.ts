import {EchoService} from "../../service/EchoService";
import {RequestQueries} from "../../types/RequestQueries";

/**
 * Used for specifying list of headers.
 * @param queries Object containing the queries
 * @constructor
 */
export function Queries(queries: RequestQueries): Function {
    return EchoService._registerRequestQueries(queries);
}