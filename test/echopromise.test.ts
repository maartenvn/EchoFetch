import * as nock from "nock";
import {EchoService} from "../src/service/EchoService";
import {GET} from "../src/decorators/methods/GetDecorator";
import {EchoPromise} from "../src/types/EchoPromise";
import {EchoServiceBuilder} from "../src/service/EchoServiceBuilder";
import {EchoPromiseStatus} from "../src/types/EchoPromiseStatus";

class TestService extends EchoService {
    @GET("/path")
    public get(): EchoPromise<string> {
        return <EchoPromise<string>>{}
    };
}

/**
 * Setup the TestService.
 */
function setupService(): TestService {
    return new EchoServiceBuilder()
        .setBaseUrl(MOCK_SERVER_URL)
        .build(TestService);
}

const MOCK_SERVER_URL = "http://host:port";
const MOCK_RESULT_TEST = "test";

describe("EchoFetch EchoPromise Tests", () => {

    test("Test 'status' when loading", async () => {
        const path = "/path";

        nock(MOCK_SERVER_URL).get(path).reply(200, MOCK_RESULT_TEST);

        const service = setupService();
        const responsePromise = service.get();

        expect(responsePromise.status).toEqual(EchoPromiseStatus.LOADING);
    });

    test("Test 'status' when succeeded", async () => {
        const path = "/path";

        nock(MOCK_SERVER_URL).get(path).reply(200, MOCK_RESULT_TEST);

        const service = setupService();
        const responsePromise = service.get();
        const response = await responsePromise;

        expect(responsePromise.status).toEqual(EchoPromiseStatus.SUCCESS);
    });

    test("Test 'status' when error", async () => {
        const path = "/path";

        nock(MOCK_SERVER_URL).get(path).reply(400, MOCK_RESULT_TEST);

        const service = setupService();
        const responsePromise = service.get();

        try {
            await responsePromise;
        } catch(error) {}

        expect(responsePromise.status).toEqual(EchoPromiseStatus.ERROR);
    });

    test("Test 'isLoading' when loading", async () => {
        const path = "/path";

        nock(MOCK_SERVER_URL).get(path).reply(200, MOCK_RESULT_TEST);

        const service = setupService();
        const responsePromise = service.get();

        expect(responsePromise.isLoading()).toEqual(true);
    });

    test("Test 'isSuccess' when succeeded", async () => {
        const path = "/path";

        nock(MOCK_SERVER_URL).get(path).reply(200, MOCK_RESULT_TEST);

        const service = setupService();
        const responsePromise = service.get();
        const response = await responsePromise;

        expect(responsePromise.isSuccess()).toEqual(true);
    });

    test("Test 'isError' when error", async () => {
        const path = "/path";

        nock(MOCK_SERVER_URL).get(path).reply(400, MOCK_RESULT_TEST);

        const service = setupService();
        const responsePromise = service.get();
        try {
            await responsePromise
        } catch(error) {}

        expect(responsePromise.isError()).toEqual(true);
    });

    test("Test 'data' when succeeded", async () => {
        const path = "/path";

        nock(MOCK_SERVER_URL).get(path).reply(200, MOCK_RESULT_TEST);

        const service = setupService();
        const responsePromise = service.get();
        const response = await responsePromise;

        expect(responsePromise.data).toEqual(MOCK_RESULT_TEST);
    });

    test("Test 'response' when succeeded", async () => {
        const path = "/path";

        nock(MOCK_SERVER_URL).get(path).reply(200, MOCK_RESULT_TEST);

        const service = setupService();
        const responsePromise = service.get();
        const response = await responsePromise;

        expect(responsePromise.response?.data).toEqual(MOCK_RESULT_TEST);
    });

    test("Test 'error' when error", async () => {
        const path = "/path";

        nock(MOCK_SERVER_URL).get(path).reply(418, MOCK_RESULT_TEST);

        const service = setupService();
        const responsePromise = service.get();
        try {
            await responsePromise
        } catch(error) {};

        expect(responsePromise.error?.response?.status).toEqual(418);
    });

    test("Test 'requireData' when succeeded", async () => {
        const path = "/path";

        nock(MOCK_SERVER_URL).get(path).reply(200, MOCK_RESULT_TEST);

        const service = setupService();
        const responsePromise = service.get();
        const response = await responsePromise;

        expect(responsePromise.requireData()).toEqual(MOCK_RESULT_TEST);
    });

    test("Test 'requireResponse' when succeeded", async () => {
        const path = "/path";

        nock(MOCK_SERVER_URL).get(path).reply(200, MOCK_RESULT_TEST);

        const service = setupService();
        const responsePromise = service.get();
        const response = await responsePromise;

        expect(responsePromise.requireResponse().data).toEqual(MOCK_RESULT_TEST);
    });

    test("Test 'requireError' when error", async () => {
        const path = "/path";

        nock(MOCK_SERVER_URL).get(path).reply(418, MOCK_RESULT_TEST);

        const service = setupService();
        const responsePromise = service.get();
        try {
            await responsePromise
        } catch(error) {}

        expect(responsePromise.requireError().response?.status).toEqual(418);
    });

    test("Test 'requireData' when loading", async () => {
        const path = "/path";

        nock(MOCK_SERVER_URL).get(path).reply(200, MOCK_RESULT_TEST);

        const service = setupService();

        expect(() => service.get().requireData()).toThrow("Data is undefined.");
    });

    test("Test 'requireResponse' when loading", async () => {
        const path = "/path";

        nock(MOCK_SERVER_URL).get(path).reply(200, MOCK_RESULT_TEST);

        const service = setupService();

        expect(() => service.get().requireResponse()).toThrow("Response is undefined.");
    });

    test("Test 'requireError' when loading", async () => {
        const path = "/path";

        nock(MOCK_SERVER_URL).get(path).reply(418, MOCK_RESULT_TEST);

        const service = setupService();

        expect(() => service.get().requireError()).toThrow(new Error("Error is undefined."));
    });
})