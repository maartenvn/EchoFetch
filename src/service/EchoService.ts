import axios from "axios";
import * as FormData from "form-data";
import {EchoServiceInterceptor} from "./EchoServiceInterceptor";
import {EchoServiceConverter} from "./EchoServiceConverter";
import {EchoServiceBuilder} from "./EchoServiceBuilder";
import {RequestMethod} from "../types/RequestMethod";
import {MapUtil} from "../util/MapUtil";
import {EchoPromise} from "../types/EchoPromise";
import {ServiceMetadata} from "../types/ServiceMetadata";
import {RequestHeaders} from "../types/RequestHeaders";
import {RequestQueries} from "../types/RequestQueries";
import {RequestHeader} from "../types/RequestHeader";
import {RequestQuery} from "../types/RequestQuery";
import {AxiosRequestConfig, Method} from "axios";
import {EchoResponse} from "../types/EchoResponse";
import {EchoRequest} from "../types/EchoRequest";
import {EchoPromiseStatus} from "../types/EchoPromiseStatus";
import {EchoError} from "../types/EchoError";

export class EchoService {

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
     * Set if the request is FormUrlEncoded
     * @param methodName Name of the method
     * @param isFormUrlEncoded If the request is FormUrlEncoded.
     * @private
     */
    private setMetadataFormUrlEncoded(methodName: string, isFormUrlEncoded: boolean) {
        const metadata = this.getMetadataForMethod(methodName);

        metadata.isFormUrlEncoded = isFormUrlEncoded;

        this.metadataMap?.set(methodName, metadata)
    }

    /**
     * Set if the request is FormMultipart
     * @param methodName Name of the method
     * @param isFormMultipart If the request is FormMultipart.
     * @private
     */
    private setMetadataFormMultipart(methodName: string, isFormMultipart: boolean) {
        const metadata = this.getMetadataForMethod(methodName);

        metadata.isFormMultipart = isFormMultipart;

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
     * Add a form field parameter to the metadata
     * @param methodName Name of the method
     * @param key Key of the form field parameter.
     * @param isObject If the given parameter is an object of form fields or a single form field.
     * @param index Index of the parameter in the method
     */
    private addMetadataFormFieldParameter(methodName: string, key: string, isObject: boolean,  index: number) {
        const metadata = this.getMetadataForMethod(methodName);

        metadata.requestFormFieldParameters.set(index, { key, isObject });

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
        let path = metadata.requestPath;

        // Add/remove slash to end when necessary.
        if(url.endsWith("/")) {
            if(path?.startsWith("/")) {
                path = path?.substr(1);
            }
        }
        else {
            if(!path?.startsWith("/")) {
                path = "/" + path;
            }
        }

        // Add the path of the given method.
        url = url + path

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
     * Build formdata, based on the given form fields.
     * @param methodName Name of the method
     * @param methodArgs Arguments passed to the method at runtime
     */
    private resolveFormData(methodName: string, methodArgs: Array<unknown>): FormData {
        const metadata = this.getMetadataForMethod(methodName);
        const formData = new FormData();

        for(const formFieldIndex of Array.from(metadata.requestFormFieldParameters.keys()).reverse()) {
            const formFieldData = metadata.requestFormFieldParameters.get(formFieldIndex);
            const formFieldValue = methodArgs[formFieldIndex];

            // Check for potential undefined.
            if(!formFieldValue) {
                throw new Error(`Undefined value for form field '${formFieldData?.isObject}'`);
            }

            // When object: add all the keys of the object to the formdata.
            if(formFieldData?.isObject) {
                const formFieldValueObject = formFieldValue as any;

                for(const key of Object.keys(formFieldValueObject)) {
                    formData.append(key, formFieldValueObject[key])
                }
            }
            // When not object: add value to formdata with given key
            else {
                formData.append(formFieldData!!.key, formFieldValue as string)
            }
        }

        return formData;
    }

    /**
     * Build an URL encoded string based on the given form fields.
     * Used when isFormUrlEncoded = true.
     * @param methodName Name of the method
     * @param methodArgs Arguments passed to the method at runtime
     */
    private resolveFormDataUrlEncoded(methodName: string, methodArgs: Array<unknown>): string {
        const metadata = this.getMetadataForMethod(methodName);
        const data = {} as any;

        for(const formFieldIndex of Array.from(metadata.requestFormFieldParameters.keys()).reverse()) {
            const formFieldData = metadata.requestFormFieldParameters.get(formFieldIndex);
            const formFieldValue = methodArgs[formFieldIndex];

            // Check for potential undefined.
            if(!formFieldValue) {
                throw new Error(`Undefined value for form field '${formFieldData?.isObject}'`);
            }

            // When object: add all the keys of the object to the formdata.
            if(formFieldData?.isObject) {
                const formFieldValueObject = formFieldValue as any;

                for(const key of Object.keys(formFieldValueObject)) {
                    data[key] = formFieldValueObject[key]
                }
            }
            // When not object: add value to formdata with given key
            else {
                data[formFieldData!!.key] = formFieldValue as string
            }
        }

        const dataEncoded = Object.keys(data)
            .map((key: string) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
            .join('&');

        return dataEncoded;
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

        // If Form Url Encoded: override the existing data with the given encoded formdata & add "Content-Type"-header
        if(metadata.isFormUrlEncoded) {
            const formDataEncoded = this.resolveFormDataUrlEncoded(methodName, methodArguments);

            request.headers["Content-Type"] = "application/x-www-form-urlencoded;charset=utf-8";
            request.data = formDataEncoded;
        }

        // If Form Multipart: override the existing data with given formdata.
        if(metadata.isFormMultipart) {
            const formData = this.resolveFormData(methodName, methodArguments);
            request.headers = {...request.headers, ...formData.getHeaders()}
            request.data = formData;
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

        let fetchPromise = new EchoPromise(new Promise<T>((resolve, reject) => {

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

                    // Add support for Vue
                    try {
                        const Vue = require("vue").default;
                        Vue.set(fetchPromise, "status", EchoPromiseStatus.SUCCESS);
                        Vue.set(fetchPromise, "data", data);
                        Vue.set(fetchPromise, "response", echoResponse);
                    } catch(error) {}

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

                    // Add support for Vue
                    try {
                        const Vue = require("vue").default;
                        Vue.set(fetchPromise, "status", EchoPromiseStatus.SUCCESS);
                        Vue.set(fetchPromise, "error", error);
                    } catch(error) {}

                    // Set EchoPromise fields.
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
     * Register as Form URL Encoded for a given method.
     * @private
     */
    static _registerFormUrlEncoded() {
        return (target: EchoService, methodName: string, _: PropertyDescriptor) => {
            target.setMetadataFormUrlEncoded(methodName, true);
        };
    }

    /**
     * Register as Form Multipart for a given method.
     * @private
     */
    static _registerFormMultipart() {
        return (target: EchoService, methodName: string, _: PropertyDescriptor) => {
            target.setMetadataFormMultipart(methodName, true);
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
     * Register a form data field parameter for a given method.
     * @param key Key of the form field parameter.
     * @param isObject If the given parameter is an object of form fields or a single form field.
     * @private
     */
    static _registerFormFieldParameter(key: string, isObject: boolean): Function {
        return (target: EchoService, methodName: string, parameterIndex: number) => {
            target.addMetadataFormFieldParameter(methodName, key, isObject, parameterIndex)
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