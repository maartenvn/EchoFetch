import * as nock from "nock";
import GET from "../src/decorators/methods/GetDecorator";
import EchoPromise from "../src/types/EchoPromise";
import EchoServiceBuilder from "../src/service/EchoServiceBuilder";
import EchoService from "../src/service/EchoService";
import Path from "../src/decorators/parameters/PathDecorator";
import Query from "../src/decorators/parameters/QueryDecorator";
import Header from "../src/decorators/parameters/HeaderDecorator";
import Body from "../src/decorators/parameters/BodyDecorator";
import POST from "../src/decorators/methods/PostDecorator";
import PUT from "../src/decorators/methods/PutDecorator";
import PATCH from "../src/decorators/methods/PatchDecorator";
import DELETE from "../src/decorators/methods/DeleteDecorator";
import HEAD from "../src/decorators/methods/HeadDecorator";
import OPTIONS from "../src/decorators/methods/OptionsDecorator";
import Queries from "../src/decorators/methods/QueriesDecorator";
import Headers from "../src/decorators/methods/HeadersDecorator";

class TestService extends EchoService {

    @GET("/path")
    public get(): EchoPromise<string> {
        return <EchoPromise<string>>{}
    };

    @POST("/path")
    public post(): EchoPromise<string> {
        return <EchoPromise<string>>{}
    };

    @PUT("/path")
    public put(): EchoPromise<string> {
        return <EchoPromise<string>>{}
    };

    @PATCH("/path")
    public patch(): EchoPromise<string> {
        return <EchoPromise<string>>{}
    };

    @DELETE("/path")
    public delete(): EchoPromise<string> {
        return <EchoPromise<string>>{}
    };

    @HEAD("/path")
    public head(): EchoPromise<string> {
        return <EchoPromise<string>>{}
    };

    @OPTIONS("/path")
    public options(): EchoPromise<string> {
        return <EchoPromise<string>>{}
    };

    @GET("/path/{id}")
    public getWithPathParam(@Path("id") id: number): EchoPromise<string> {
        return <EchoPromise<string>>{}
    };

    @GET("/path/{id}/{testId}")
    public getWithPathParamMultiple(@Path("id") id: number, @Path("testId") testId: string): EchoPromise<string> {
        return <EchoPromise<string>>{}
    };

    @GET("/path")
    public getWithQueryParam(@Query("query") query: string): EchoPromise<string> {
        return <EchoPromise<string>>{}
    };

    @GET("/path")
    public getWithQueryParamMultiple(@Query("query") query: string, @Query("queryId") queryId: number): EchoPromise<string> {
        return <EchoPromise<string>>{}
    };

    @GET("/path")
    public getWithHeaderParam(@Header("header") header: string): EchoPromise<string> {
        return <EchoPromise<string>>{}
    };

    @GET("/path")
    public getWithHeaderParamMultiple(@Header("header") header: string, @Header("headerId") headerId: number): EchoPromise<string> {
        return <EchoPromise<string>>{}
    };

    @POST("/path")
    public postWithBody(@Body() test: TestModel): EchoPromise<string> {
        return <EchoPromise<string>>{}
    };

    @POST("/path")
    public postWithBodyMultiple(@Body() test: TestModel, @Body() test2: TestMultipleModel): EchoPromise<string> {
        return <EchoPromise<string>>{}
    };

    @POST("/path")
    public postWithBodyMultipleSame(@Body() test: TestModel, @Body() test2: TestModel): EchoPromise<string> {
        return <EchoPromise<string>>{}
    };

    @GET("/path")
    @Queries({
        "test1": "value1",
        "test2": "value2"
    })
    public getWithQueries(): EchoPromise<string> {
        return <EchoPromise<string>>{}
    };

    @GET("/path")
    @Queries({
        "test1": "value1",
        "test2": "value2"
    })
    public getWithQueriesAndQueryParam(@Query("test3") test3: string): EchoPromise<string> {
        return <EchoPromise<string>>{}
    };

    @GET("/path")
    @Headers({
        "test1": "value1",
        "test2": "value2"
    })
    public getWithHeaders(): EchoPromise<string> {
        return <EchoPromise<string>>{}
    };

    @GET("/path")
    @Headers({
        "test1": "value1",
        "test2": "value2"
    })
    public getWithHeadersAndHeaderParam(@Header("test3") test3: string): EchoPromise<string> {
        return <EchoPromise<string>>{}
    };
}

interface TestModel {
    name: string;
}

interface TestMultipleModel {
    test: string,
    number: number
}

const MOCK_SERVER_URL = "http://host:port"

const MOCK_RESULT_TEST: TestModel = {
    name: "Test"
};

/**
 * Setup the TestService.
 */
function setupService(): TestService {
    return new EchoServiceBuilder()
        .setBaseUrl(MOCK_SERVER_URL)
        .build(TestService);
}

describe("EchoFetch Decorator Tests", () => {

    test("Test '@GET' decorator.", async () => {
        const path = `/path`;

        nock(MOCK_SERVER_URL).get(path).reply(200, MOCK_RESULT_TEST);

        const service = setupService();
        const response = await service.get();

        expect(response).toEqual(MOCK_RESULT_TEST);
    });

    test("Test '@POST' decorator.", async () => {
        const path = `/path`;

        nock(MOCK_SERVER_URL).post(path).reply(200, MOCK_RESULT_TEST);

        const service = setupService();
        const response = await service.post();

        expect(response).toEqual(MOCK_RESULT_TEST);
    });

    test("Test '@PUT' decorator.", async () => {
        const path = `/path`;

        nock(MOCK_SERVER_URL).put(path).reply(200, MOCK_RESULT_TEST);

        const service = setupService();
        const response = await service.put();

        expect(response).toEqual(MOCK_RESULT_TEST);
    });

    test("Test '@PATCH' decorator.", async () => {
        const path = `/path`;

        nock(MOCK_SERVER_URL).patch(path).reply(200, MOCK_RESULT_TEST);

        const service = setupService();
        const response = await service.patch();

        expect(response).toEqual(MOCK_RESULT_TEST);
    });

    test("Test '@DELETE' decorator.", async () => {
        const path = `/path`;

        nock(MOCK_SERVER_URL).delete(path).reply(200, MOCK_RESULT_TEST);

        const service = setupService();
        const response = await service.delete();

        expect(response).toEqual(MOCK_RESULT_TEST);
    });

    test("Test '@HEAD' decorator.", async () => {
        const path = `/path`;

        nock(MOCK_SERVER_URL).head(path).reply(200, MOCK_RESULT_TEST);

        const service = setupService();
        const response = await service.head();

        expect(response).toEqual(MOCK_RESULT_TEST);
    });

    test("Test '@OPTIONS' decorator.", async () => {
        const path = `/path`;

        nock(MOCK_SERVER_URL).options(path).reply(200, MOCK_RESULT_TEST);

        const service = setupService();
        const response = await service.options();

        expect(response).toEqual(MOCK_RESULT_TEST);
    });

    test("Test '@Path' decorator with single path.", async () => {
        const pathId = 1;
        const path = `/path/${pathId}`

        nock(MOCK_SERVER_URL).get(path).reply(200, MOCK_RESULT_TEST);

        const service = setupService();
        const responsePromise = service.getWithPathParam(pathId);
        const response = await responsePromise;

        expect(responsePromise.response?.config.url).toEqual(`${MOCK_SERVER_URL}${path}`);
    });

    test("Test '@Path' decorator with multiple path.", async () => {
        const pathId = 1;
        const pathTestId = "testId";
        const path = `/path/${pathId}/${pathTestId}`

        nock(MOCK_SERVER_URL).get(path).reply(200, MOCK_RESULT_TEST);

        const service = setupService();
        const responsePromise = service.getWithPathParamMultiple(pathId, pathTestId);
        const response = await responsePromise;

        expect(responsePromise.response?.config.url).toEqual(`${MOCK_SERVER_URL}${path}`);
    });

    test("Test '@Query' decorator with single query.", async () => {
        const query = "test";
        const path = `/path?query=${query}`;

        nock(MOCK_SERVER_URL).get(path).reply(200, MOCK_RESULT_TEST);

        const service = setupService();
        const responsePromise = service.getWithQueryParam(query);
        const response = await responsePromise;

        expect(responsePromise.response?.config.url).toEqual(`${MOCK_SERVER_URL}${path}`);
    });

    test("Test '@Query' decorator with multiple queries.", async () => {
        const query = "test";
        const queryId = 10;
        const path = `/path?queryId=${queryId}&query=${query}`;

        nock(MOCK_SERVER_URL).get(path).reply(200, MOCK_RESULT_TEST);

        const service = setupService();
        const responsePromise = service.getWithQueryParamMultiple(query, queryId);
        const response = await responsePromise;

        expect(responsePromise.response?.config.url).toEqual(`${MOCK_SERVER_URL}${path}`);
    });

    test("Test '@Header' decorator with single header.", async () => {
        const header = "test";
        const path = `/path`;

        nock(MOCK_SERVER_URL, {
            reqheaders: {
                header: "test"
            }
        }).get(path).reply(200, MOCK_RESULT_TEST);

        const service = setupService();
        const responsePromise = service.getWithHeaderParam(header);
        const response = await responsePromise;

        expect(response).toEqual(MOCK_RESULT_TEST);
    });

    test("Test '@Header' decorator with multiple header.", async () => {
        const header = "test";
        const headerId = 10;
        const path = `/path`;

        nock(MOCK_SERVER_URL, {
            reqheaders: {
                header: "test",
                headerId: headerId.toString()
            }
        }).get(path).reply(200, MOCK_RESULT_TEST);

        const service = setupService();
        const responsePromise = service.getWithHeaderParamMultiple(header, headerId);
        const response = await responsePromise;

        expect(response).toEqual(MOCK_RESULT_TEST);
    });

    test("Test '@Body' decorator with single body.", async () => {
        const body: TestModel = {
            name: "test"
        }
        const path = `/path`;

        nock(MOCK_SERVER_URL).post(path, {...body}).reply(200, MOCK_RESULT_TEST);

        const service = setupService();
        const responsePromise = service.postWithBody(body);
        const response = await responsePromise;

        expect(response).toEqual(MOCK_RESULT_TEST);
    });

    test("Test '@Body' decorator with double body of same type.", async () => {
        const body1: TestModel = {
            name: "test1"
        }

        const body2: TestModel = {
            name: "test2"
        }

        const path = `/path`;

        nock(MOCK_SERVER_URL).post(path, {...body1, ...body2}).reply(200, MOCK_RESULT_TEST);

        const service = setupService();
        const responsePromise = service.postWithBodyMultipleSame(body1, body2);
        const response = await responsePromise;

        expect(response).toEqual(MOCK_RESULT_TEST);
    });

    test("Test '@Body' decorator with double body of different type.", async () => {
        const body1: TestModel = {
            name: "test1"
        }

        const body2: TestMultipleModel = {
            test: "test",
            number: 10
        }

        const path = `/path`;

        nock(MOCK_SERVER_URL).post(path, {...body1, ...body2}).reply(200, MOCK_RESULT_TEST);

        const service = setupService();
        const responsePromise = service.postWithBodyMultiple(body1, body2);
        const response = await responsePromise;

        expect(response).toEqual(MOCK_RESULT_TEST);
    });

    test("Test '@Queries' decorator.", async () => {
        const path = `/path?test1=value1&test2=value2`;

        nock(MOCK_SERVER_URL).get(path).reply(200, MOCK_RESULT_TEST);

        const service = setupService();
        const responsePromise = service.getWithQueries();
        const response = await responsePromise;

        expect(responsePromise.response?.config.url).toEqual(`${MOCK_SERVER_URL}${path}`);
        expect(response).toEqual(MOCK_RESULT_TEST);
    });

    test("Test '@Queries' decorator together with '@Query' decorator.", async () => {
        const path = `/path?test1=value1&test2=value2&test3=value3`;

        nock(MOCK_SERVER_URL).get(path).reply(200, MOCK_RESULT_TEST);

        const service = setupService();
        const responsePromise = service.getWithQueriesAndQueryParam("value3");
        const response = await responsePromise;

        expect(responsePromise.response?.config.url).toEqual(`${MOCK_SERVER_URL}${path}`);
        expect(response).toEqual(MOCK_RESULT_TEST);
    });

    test("Test '@Headers' decorator.", async () => {
        const path = `/path`;

        nock(MOCK_SERVER_URL, {
            reqheaders: {
                test1: "value1",
                test2: "value2"
            }
        }).get(path).reply(200, MOCK_RESULT_TEST);

        const service = setupService();
        const responsePromise = service.getWithHeaders();
        const response = await responsePromise;

        expect(response).toEqual(MOCK_RESULT_TEST);
    });

    test("Test '@Headers' decorator together with '@Header' decorator.", async () => {
        const path = `/path`;

        nock(MOCK_SERVER_URL, {
            reqheaders: {
                test1: "value1",
                test2: "value2",
                test3: "value3"
            }
        }).get(path).reply(200, MOCK_RESULT_TEST);

        const service = setupService();
        const responsePromise = service.getWithHeadersAndHeaderParam("value3");
        const response = await responsePromise;

        expect(response).toEqual(MOCK_RESULT_TEST);
    });
});