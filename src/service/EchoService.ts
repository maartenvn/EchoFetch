import MapUtil from "../util/MapUtil";
import ServiceMetadata from "../types/ServiceMetadata";
import EchoServiceBuilder from "./EchoServiceBuilder";
import RequestHeader from "../types/RequestHeader";
import RequestHeaders from "../types/RequestHeaders";
import RequestQueries from "../types/RequestQueries";
import RequestQuery from "../types/RequestQuery";
import EchoServiceInterceptor from "./EchoServiceInterceptor";
import EchoRequest from "../types/EchoRequest";
import EchoResponse from "../types/EchoResponse";
import EchoServiceConverter from "./EchoServiceConverter";
import axios, {AxiosRequestConfig, Method} from "axios";
import RequestMethod from "../types/RequestMethod";
import EchoError from "../types/EchoError";
import EchoPromise, {convertToEchoPromise} from "../types/EchoPromise";
import EchoPromiseStatus from "../types/EchoPromiseStatus";

export default class EchoService {

    /**
     * Base URL, will be joined before the path of each method in the service.
     */
    private readonly baseUrl: string;

    /**
     * List of interceptors.
     */
    private readonly interceptors: Array<EchoServiceInterceptor>;

    /**
     * List of converters that will be used for converting the response.
     */
    private readonly converters: Array<EchoServiceConverter>;

    /**
     * Map containing all metadata for the methods in the service:
     *      Key: name of the method
     *      Value: metadata object for that method. This will contain all the metadata provided by the decorators.
     */
    public metadataMap: Map<string, ServiceMetadata> | undefined;

    /**
     * Create a service
     * @param serviceBuilder Instance of the EchoServiceBuilder.
     */
    constructor(serviceBuilder: EchoServiceBuilder) {
        this.baseUrl = serviceBuilder.getBaseUrl();
        this.interceptors = serviceBuilder.getInterceptors();
        this.converters = serviceBuilder.getConverters();

        // Implement all the methods inside the service.
        this.implementMethods();
    }

    /**
     * Set the request method for a method in the service.
     * @param methodName Name of the method
     * @param requestMethod EchoRequest Method
     * @private
     */
    public setMetadataMethod(methodName: string, requestMethod: RequestMethod) {
        const metadata = this.getMetadataForMethod(methodName);

        metadata.requestMethod = requestMethod;

        this.metadataMap?.set(methodName, metadata);
    }

    /**
     * Set the request path for a method
     * @param methodName Name of the method
     * @param requestPath EchoRequest path (absolute or relative to the base URL)
     * @private
     */
    private setMetadataPath(methodName: string, requestPath: string) {
        const metadata = this.getMetadataForMethod(methodName);

        metadata.requestPath = requestPath;

        this.metadataMap?.set(methodName, metadata)
    }

    /**
     * Set the request headers for a method
     * @param methodName Name of the method
     * @param requestHeaders EchoRequest headers
     * @private
     */
    private setMetadataHeaders(methodName: string, requestHeaders: RequestHeaders) {
        const metadata = this.getMetadataForMethod(methodName);

        metadata.requestHeaders = requestHeaders;

        this.metadataMap?.set(methodName, metadata)
    }

    /**
     * Set the request queries for a method
     * @param methodName Name of the method
     * @param requestQueries EchoRequest queries
     * @private
     */
    private setMetadataQueries(methodName: string, requestQueries: RequestQueries) {
        const metadata = this.getMetadataForMethod(methodName);

        metadata.requestQueries = requestQueries;

        this.metadataMap?.set(methodName, metadata)
    }

    /**
     * Add a path parameter to the metadata
     * @param methodName Name of the method
     * @param pathParameter Name of the path parameter to replace
     * @param index Index of the parameter in the method
     */
    private addMetadataPathParameter(methodName: string, pathParameter: string, index: number) {
        const metadata = this.getMetadataForMethod(methodName);

        metadata.requestPathParameters.set(index, pathParameter);

        this.metadataMap?.set(methodName, metadata)
    }

    /**
     * Add a header parameter to the metadata
     * @param methodName Name of the method
     * @param headerName Name of the header to send
     * @param index Index of the parameter in the method
     */
    private addMetadataHeaderParameter(methodName: string, headerName: string, index: number) {
        const metadata = this.getMetadataForMethod(methodName);

        metadata.requestHeaderParameters.set(index, headerName);

        this.metadataMap?.set(methodName, metadata)
    }

    /**
     * Add a body parameter to the metadata
     * @param methodName Name of the method
     * @param index Index of the parameter in the method
     */
    private addMetadataBodyParameter(methodName: string, index: number) {
        const metadata = this.getMetadataForMethod(methodName);

        metadata.requestBodyParameters.push(index);

        this.metadataMap?.set(methodName, metadata)
    }

    /**
     * Add a query parameter to the metadata
     * @param methodName Name of the method
     * @param queryName Name of the query to send
     * @param index Index of the parameter in the method
     */
    private addMetadataQueryParameter(methodName: string, queryName: string, index: number) {
        const metadata = this.getMetadataForMethod(methodName);

        metadata.requestQueryParameters.set(index, queryName);

        this.metadataMap?.set(methodName, metadata)
    }

    /**
     * Get the metadata for a given method.
     * @param methodName Name of the method.
     */
    private getMetadataForMethod(methodName: string): ServiceMetadata {

        // Check if the map exists, if not create it.
        // Do this to prevent initialization errors when using decorators.
        if (this.metadataMap == undefined) {
            this.metadataMap = new Map();
        }

        return MapUtil.getOrDefault(this.metadataMap, methodName, new ServiceMetadata());
    }

    /**
     * Build a fetch URL for a specific method in the service
     * @param methodName Name of the method
     * @param methodArgs Arguments passed to the method at runtime
     */
    private resolveUrl(methodName: string, methodArgs: Array<unknown>): string {
        const metadata = this.getMetadataForMethod(methodName)

        let url = this.baseUrl;

        // Add slash to end when necessary.
        url = url.endsWith("/") && !metadata.requestPath?.endsWith("/") ? `${url}/` : url;

        // Add the path of the given method.
        url = url + metadata.requestPath

        // Replace all the path parameters.
        for (const parameterIndex of Array.from(metadata.requestPathParameters.keys())) {
            const parameterName = metadata.requestPathParameters.get(parameterIndex);

            url = url.replace(`{${parameterName}}`, String(methodArgs[parameterIndex]));
        }

        // Add the query parameters.
        const queries = this.resolveQueries(methodName, methodArgs);

        if (queries.length > 0) {
            const queriesString = queries
                .map(q => String(encodeURIComponent(q.name) + "=" + encodeURIComponent(q.value)))
                .join("&");

            url = url + "?" + queriesString;
        }

        return url;
    }

    /**
     * Build a list of headers for a specific method in the service
     * @param methodName Name of the method
     * @param methodArgs Arguments passed to the method at runtime
     */
    private resolveHeaders(methodName: string, methodArgs: Array<unknown>): Array<RequestHeader> {
        const metadata = this.getMetadataForMethod(methodName);
        const headers = new Array<RequestHeader>();

        // Resolve all the parameter headers.
        for (const headerIndex of Array.from(metadata.requestHeaderParameters.keys())) {
            const headerName = metadata.requestHeaderParameters.get(headerIndex);
            const headerValue = methodArgs[headerIndex];

            headers.push(<RequestHeader>{
                name: headerName,
                value: headerValue
            })
        }

        // Resolve all the request headers.
        if (metadata.requestHeaders !== undefined) {
            for (const headerName of Object.keys(Object(metadata.requestHeaders))) {
                const headerValue = metadata.requestHeaders!![headerName];

                headers.push({
                    name: headerName,
                    value: headerValue
                })
            }
        }

        return headers;
    }

    /**
     * Build a list of queries for a specific method in the service
     * @param methodName Name of the method
     * @param methodArgs Arguments passed to the method at runtime
     */
    private resolveQueries(methodName: string, methodArgs: Array<unknown>): Array<RequestQuery> {
        const metadata = this.getMetadataForMethod(methodName);
        const queries = new Array<RequestQuery>();

        // Resolve all the request queries.
        if (metadata.requestQueries !== undefined) {
            for (const queryName of Object.keys(Object(metadata.requestQueries))) {
                const queryValue = metadata.requestQueries!![queryName];

                queries.push({
                    name: queryName,
                    value: queryValue
                })
            }
        }

        // Resolve all the parameter queries.
        for (const queryIndex of Array.from(metadata.requestQueryParameters.keys())) {
            const queryName = metadata.requestQueryParameters.get(queryIndex);
            const queryValue = methodArgs[queryIndex];

            queries.push(<RequestQuery>{
                name: queryName,
                value: queryValue
            })
        }

        return queries;
    }

    /**
     * Build a "body"-object to pass to the request for a specific method in the service
     * @param methodName Name of the method
     * @param methodArgs Arguments passed to the method at runtime
     */
    private resolveBody(methodName: string, methodArgs: Array<unknown>): unknown {
        const metadata = this.getMetadataForMethod(methodName);
        let body = {};

        for (const bodyIndex of metadata.requestBodyParameters.reverse()) {
            const bodyValue = methodArgs[bodyIndex];

            if (typeof bodyValue !== "object") {
                throw new Error(`Unable to parse body parameter at index ${bodyIndex} for method '${methodName}'`);
            }

            body = {...body, ...bodyValue};
        }

        return body;
    }

    /**
     * Implement all the methods in the Service.
     */
    private implementMethods() {
        if (this.metadataMap != null) {
            const map = this.metadataMap

            for (const methodName of Array.from(map.keys())) {

                // Self instance to use in descriptor.
                const self = this;

                // Create a descriptor that will be used to implement the method.
                const descriptor = {
                    get(): Function {
                        return (...args: Array<unknown>) => self.fetch(methodName, args)
                    }
                }

                Object.defineProperty(this, methodName, descriptor);
            }
        }
    }

    /**
     * Fetch data for a specific method inside the service.
     * @param methodName Name of the method in the service
     * @param methodArguments Arguments of the method in the service.
     */
    private fetch<T>(methodName: string, methodArguments: Array<unknown>): EchoPromise<T> {
        const metadata = this.getMetadataForMethod(methodName);

        const url = this.resolveUrl(methodName, methodArguments);
        const headers = this.resolveHeaders(methodName, methodArguments);
        const body = this.resolveBody(methodName, methodArguments);

        const request: AxiosRequestConfig = {
            url,
            method: metadata.requestMethod?.toString() as Method,
            headers: Object.fromEntries(headers.map(header => [header.name, header.value])),
            data: body
        }

        let echoRequest: EchoRequest = request;

        // Execute the interceptors.
        for (const interceptorIndex in this.interceptors) {
            const interceptor = this.interceptors[interceptorIndex];

            // Check if interceptor has the function
            if(!interceptor.onRequest) {
                continue;
            }

            const interceptorRequest = interceptor.onRequest(echoRequest);

            // Check if interceptor result is not undefined.
            if (!interceptorRequest) {
                throw new Error(`Request interceptor '${interceptorIndex}' must return a variable of type 'EchoRequest'`);
            }

            echoRequest = interceptorRequest;
        }

        let fetchPromise = convertToEchoPromise(new Promise<T>((resolve, reject) => {

            axios(echoRequest)
                .then(response => {

                    let echoResponse: EchoResponse = response;

                    // Execute the interceptors.
                    for (const interceptorIndex in this.interceptors) {
                        const interceptor = this.interceptors[interceptorIndex];

                        // Check if interceptor has the function
                        if(!interceptor.onResponse) {
                            continue;
                        }

                        const interceptorResponse = interceptor.onResponse(echoResponse);

                        // Check if interceptor result is not undefined.
                        if (!interceptorResponse) {
                            throw new Error(`Response interceptor '${interceptorIndex}' must return a variable of type 'EchoResponse'`);
                        }

                        echoResponse = interceptorResponse;
                    }

                    let data = echoResponse.data;

                    // Execute the converters on the response.
                    // First converter that can convert the given response will parse it.
                    for (const converter of this.converters) {

                        if (converter.canConvert(echoResponse)) {
                            data = converter.convert(echoResponse);
                            break;
                        }
                    }

                    // Set the EchoPromise fields.
                    fetchPromise.status = EchoPromiseStatus.SUCCESS;
                    fetchPromise.data = data;
                    fetchPromise.response = echoResponse;

                    resolve(data);
                })
                .catch(error => {
                    let echoError: EchoError = error;

                    // Execute the interceptors.
                    for (const interceptorIndex in this.interceptors) {
                        const interceptor = this.interceptors[interceptorIndex];

                        // Check if interceptor has the function
                        if(!interceptor.onError) {
                            continue;
                        }

                        const interceptorError = interceptor.onError(echoError);

                        // Check if interceptor result is not undefined.
                        if (!interceptorError) {
                            throw new Error(`Error interceptor '${interceptorIndex}' must return a variable of type 'EchoError'`);
                        }

                        echoError = interceptorError;
                    }

                    fetchPromise.status = EchoPromiseStatus.ERROR;
                    fetchPromise.error = echoError;

                    reject(echoError);
                })
        }));

        // Set the EchoPromise specific fields.
        fetchPromise.status = EchoPromiseStatus.LOADING;

        return fetchPromise;
    }

    /**
     * Register a request method for a given method.
     * @param requestMethod
     * @param requestPath
     */
    static _registerRequestMethod(requestMethod: RequestMethod, requestPath: string): Function {
        return (target: EchoService, methodName: string, _: PropertyDescriptor) => {
            target.setMetadataMethod(methodName, requestMethod);
            target.setMetadataPath(methodName, requestPath);
        };
    }

    /**
     * Register request headers for a given method.
     * @param requestHeaders EchoRequest headers.
     * @private
     */
    static _registerRequestHeaders(requestHeaders: RequestHeaders) {
        return (target: EchoService, methodName: string, _: PropertyDescriptor) => {
            target.setMetadataHeaders(methodName, requestHeaders);
        };
    }

    /**
     * Register request headers for a given method.
     * @param requestHeaders EchoRequest headers.
     * @private
     */
    static _registerRequestQueries(requestQueries: RequestQueries) {
        return (target: EchoService, methodName: string, _: PropertyDescriptor) => {
            target.setMetadataQueries(methodName, requestQueries);
        };
    }

    /**
     * Register a path parameter for a given method.
     * @param pathName Name of parameter
     * @private
     */
    static _registerPathParameter(pathName: string): Function {
        return (target: EchoService, methodName: string, parameterIndex: number) => {
            target.addMetadataPathParameter(methodName, pathName, parameterIndex)
        }
    }

    /**
     * Register a header parameter for a given method.
     * @param headerName Name of header
     * @private
     */
    static _registerHeaderParameter(headerName: string): Function {
        return (target: EchoService, methodName: string, parameterIndex: number) => {
            target.addMetadataHeaderParameter(methodName, headerName, parameterIndex)
        }
    }

    /**
     * Register a body parameter for a given method.
     * @private
     */
    static _registerBodyParameter(): Function {
        return (target: EchoService, methodName: string, parameterIndex: number) => {
            target.addMetadataBodyParameter(methodName, parameterIndex)
        }
    }

    /**
     * Register a body parameter for a given method.
     * @private
     */
    static _registerQueryParameter(queryName: string): Function {
        return (target: EchoService, methodName: string, parameterIndex: number) => {
            target.addMetadataQueryParameter(methodName, queryName, parameterIndex)
        }
    }
}