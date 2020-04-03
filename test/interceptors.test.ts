import EchoService from "../src/service/EchoService";
import * as nock from "nock";
import EchoServiceBuilder from "../src/service/EchoServiceBuilder";
import GET from "../src/decorators/methods/GetDecorator";
import EchoPromise from "../src/types/EchoPromise";
import EchoServiceInterceptor from "../src/service/EchoServiceInterceptor";
import EchoRequest from "../src/types/EchoRequest";
import Headers from "../src/decorators/methods/HeadersDecorator";
import EchoResponse from "../src/types/EchoResponse";
import EchoError from "../src/types/EchoError";

class TestService extends EchoService {
    @GET("/path")
    public get(): EchoPromise<string> {
        return <EchoPromise<string>>{}
    };

    @GET("/path")
    @Headers({
        test1: "value1",
        test2: "value2",
        test3: "value3"
    })
    public getWithHeaders(): EchoPromise<string> {
        return <EchoPromise<string>> {}
    }
}

const MOCK_SERVER_URL = "http://host:port";
const MOCK_RESULT_TEST = "test";

describe("EchoFetch Interceptor Tests", () => {

    test("Test interceptor 'onRequest'.", async () => {
        const changedPath = "/changedPath";

        nock(MOCK_SERVER_URL).get(changedPath).reply(200, MOCK_RESULT_TEST);

        const service = new EchoServiceBuilder()
            .setBaseUrl(MOCK_SERVER_URL)
            .addInterceptor(<EchoServiceInterceptor> {

                onRequest(request: EchoRequest): EchoRequest {

                    // Change the request URL.
                    request.url = `${MOCK_SERVER_URL}${changedPath}`

                    return request;
                }
            })
            .build(TestService);

        const responsePromise = service.get();
        const response = await responsePromise;

        expect(responsePromise.response?.config.url).toEqual(`${MOCK_SERVER_URL}${changedPath}`);
    });

    test("Test 2 interceptors 'onRequest'.", async () => {
        const changedPath1 = "/changedPath1";
        const changedPath2 = "/changedPath2";

        nock(MOCK_SERVER_URL).get(changedPath2).reply(200, MOCK_RESULT_TEST);

        const service = new EchoServiceBuilder()
            .setBaseUrl(MOCK_SERVER_URL)
            .addInterceptor(<EchoServiceInterceptor> {

                onRequest(request: EchoRequest): EchoRequest {

                    // Change the request URL.
                    request.url = `${MOCK_SERVER_URL}${changedPath1}`

                    return request;
                }
            })
            .addInterceptor(<EchoServiceInterceptor> {

                onRequest(request: EchoRequest): EchoRequest {

                    // Change the request URL.
                    request.url = `${MOCK_SERVER_URL}${changedPath2}`

                    return request;
                }
            })
            .build(TestService);

        const responsePromise = service.get();
        const response = await responsePromise;

        expect(responsePromise.response?.config.url).toEqual(`${MOCK_SERVER_URL}${changedPath2}`);
    });

    test("Test '@Header' decorator in conjunction with 'onRequest' header change", async () => {
        const path = "/path";

        nock(MOCK_SERVER_URL, {
            reqheaders: {
                test1: "value1",
                test2: "interceptor-value2",
                test3: "value3",
                test4: "interceptor-value4"
            }
        }).get(path).reply(200, MOCK_RESULT_TEST);

        const service = new EchoServiceBuilder()
            .setBaseUrl(MOCK_SERVER_URL)
            .addInterceptor(<EchoServiceInterceptor> {

                onRequest(request: EchoRequest): EchoRequest {

                    // Change the headers.
                    request.headers["test2"] = "interceptor-value2";
                    request.headers["test4"] = "interceptor-value4";

                    return request;
                }
            })
            .build(TestService);

        const responsePromise = service.getWithHeaders();
        const response = await responsePromise;

        expect(response).toEqual(MOCK_RESULT_TEST);
    });

    test("Test interceptor 'onResponse'.", async () => {
        const path = "/path";
        const changedResult = "result altered by interceptor";

        nock(MOCK_SERVER_URL).get(path).reply(200, MOCK_RESULT_TEST);

        const service = new EchoServiceBuilder()
            .setBaseUrl(MOCK_SERVER_URL)
            .addInterceptor(<EchoServiceInterceptor> {

                onResponse(response: EchoResponse): EchoResponse {

                    // Change the response value.
                    response.data = changedResult;

                    return response;
                }
            })
            .build(TestService);

        const responsePromise = service.get();
        const response = await responsePromise;

        expect(responsePromise.data).toEqual(changedResult);
        expect(responsePromise.response?.data).toEqual(changedResult);
        expect(response).toEqual(changedResult);
    });

    test("Test 2 interceptors 'onResponse'.", async () => {
        const path = "/path";
        const changedResult1 = "result altered by interceptor1";
        const changedResult2 = "result altered by interceptor2";

        nock(MOCK_SERVER_URL).get(path).reply(200, MOCK_RESULT_TEST);

        const service = new EchoServiceBuilder()
            .setBaseUrl(MOCK_SERVER_URL)
            .addInterceptor(<EchoServiceInterceptor> {

                onResponse(response: EchoResponse): EchoResponse {

                    // Change the response value.
                    response.data = changedResult1;

                    return response;
                }
            })
            .addInterceptor(<EchoServiceInterceptor> {

                onResponse(response: EchoResponse): EchoResponse {

                    // Change the response value.
                    response.data = changedResult2;

                    return response;
                }
            })
            .build(TestService);

        const responsePromise = service.get();
        const response = await responsePromise;

        expect(responsePromise.data).toEqual(changedResult2);
        expect(responsePromise.response?.data).toEqual(changedResult2);
        expect(response).toEqual(changedResult2);
    });

    test("Test interceptor 'onError'.", async () => {
        const path = "/path";
        const changedErrorCode = "401";

        nock(MOCK_SERVER_URL).get(path).reply(400, MOCK_RESULT_TEST);

        const service = new EchoServiceBuilder()
            .setBaseUrl(MOCK_SERVER_URL)
            .addInterceptor(<EchoServiceInterceptor> {

                onError(error: EchoError): EchoError {

                    // Change the error code.
                    error.code = changedErrorCode;

                    return error;
                }
            })
            .build(TestService);

        const responsePromise = service.get();

        try {
            await responsePromise;
        } catch(error) {}

        expect(responsePromise.requireError().code).toEqual(changedErrorCode);
    });


    test("Test 2 interceptors 'onError'.", async () => {
        const path = "/path";
        const changedErrorCode1 = "401";
        const changedErrorCode2 = "402";

        nock(MOCK_SERVER_URL).get(path).reply(400, MOCK_RESULT_TEST);

        const service = new EchoServiceBuilder()
            .setBaseUrl(MOCK_SERVER_URL)
            .addInterceptor(<EchoServiceInterceptor> {

                onError(error: EchoError): EchoError {

                    // Change the error code.
                    error.code = changedErrorCode1;

                    return error;
                }
            })
            .addInterceptor(<EchoServiceInterceptor> {

                onError(error: EchoError): EchoError {

                    // Change the error code.
                    error.code = changedErrorCode2;

                    return error;
                }
            })
            .build(TestService);

        const responsePromise = service.get();

        try {
            await responsePromise;
        } catch(error) {}

        expect(responsePromise.requireError().code).toEqual(changedErrorCode2);
    });
})