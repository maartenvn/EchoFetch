import {EchoServiceInterceptor} from "./EchoServiceInterceptor";
import {EchoServiceConverter} from "./EchoServiceConverter";

export class EchoServiceBuilder {

    /**
     * Base URL added before every request path.
     */
    private baseUrl: string = "";

    /**
     * List of interceptors.
     */
    private interceptors: Array<EchoServiceInterceptor> = new Array();

    /**
     * List of converters that will be used for converting the response.
     */
    private converters: Array<EchoServiceConverter> = new Array();

    /**
     * Build an EchoService
     * @param service Classname of the service to build
     */
    public build<T>(service: new(builder: EchoServiceBuilder) => T): T {
        return new service(this)
    }

    /**
     * Get the base URL of the instance.
     */
    public getBaseUrl(): string {
        return this.baseUrl;
    }

    /**
     * Set the base URL of the instance.
     * @param baseUrl
     */
    public setBaseUrl(baseUrl: string): EchoServiceBuilder {
        this.baseUrl = baseUrl;

        return this;
    }

    /**
     * Get the list with interceptors.
     */
    public getInterceptors(): Array<EchoServiceInterceptor> {
        return this.interceptors;
    }

    /**
     * Add an interceptor to the list of interceptors.
     * @param interceptor
     */
    public addInterceptor(interceptor: EchoServiceInterceptor): EchoServiceBuilder {
        this.interceptors.push(interceptor);

        return this;
    }

    /**
     * Get the list of converters.
     */
    public getConverters(): Array<EchoServiceConverter> {
        return this.converters;
    }

    /**
     * Add a converter to the list of converters.
     * @param converter
     */
    public addConverter(converter: EchoServiceConverter): EchoServiceBuilder {
        this.converters.push(converter);

        return this;
    }
}