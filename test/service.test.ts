import * as nock from "nock";
import {EchoService} from "../src/service/EchoService";
import {EchoPromise} from "../src/types/EchoPromise";
import {GET} from "../src/decorators/methods/GetDecorator";
import {EchoServiceBuilder} from "../src/service/EchoServiceBuilder";

class TestService extends EchoService {
    @GET("/path")
    public get(): EchoPromise<string> {
        return <EchoPromise<string>>{}
    };
}

interface TestModel {
    test: string
}

class TestClass {
    test1: string;
    test2: number;
    test3: boolean;
    test4: TestModel = {
        test: "testing"
    };

    constructor(test1: string, test2: number) {
        this.test1 = "test1";
        this.test2 = 10;
        this.test3 = true;
    }
}

const MOCK_SERVER_URL = "http://host:port";
const MOCK_RESULT_TEST_STRING = "test";
const MOCK_RESULT_TEST_INT = 10;
const MOCK_RESULT_TEST_BOOLEAN = true;
const MOCK_RESULT_TEST_OBJECT = {
    test: "testing"
};
const MOCK_RESULT_TEST_OBJECT_NESTED = {
    test: "testing",
    test2: {
        test3: "nested"
    }
};
const MOCK_RESULT_TEST_OBJECT_NESTED_JSON = JSON.stringify(MOCK_RESULT_TEST_OBJECT_NESTED);
const MOCK_RESULT_TEST_OBJECT_CLASS = new TestClass("testing", 10);

/**
 * Setup the TestService.
 */
function setupService(): TestService {
    return new EchoServiceBuilder()
        .setBaseUrl(MOCK_SERVER_URL)
        .build(TestService);
}

describe("EchoFetch Service Tests", () => {

    test("Test request with return type 'string'.", async () => {
        const path = "/path";

        nock(MOCK_SERVER_URL).get(path).reply(200, MOCK_RESULT_TEST_STRING);

        const service = setupService();
        const responsePromise = service.get();
        const response = await responsePromise;

        expect(response).toEqual(MOCK_RESULT_TEST_STRING);
    });

    test("Test request with return type 'number'.", async () => {
        const path = "/path";

        nock(MOCK_SERVER_URL).get(path).reply(200, MOCK_RESULT_TEST_INT.toString());

        const service = setupService();
        const responsePromise = service.get();
        const response = await responsePromise;

        expect(response).toEqual(MOCK_RESULT_TEST_INT);
    });

    test("Test request with return type 'boolean'.", async () => {
        const path = "/path";

        nock(MOCK_SERVER_URL).get(path).reply(200, MOCK_RESULT_TEST_BOOLEAN.toString());

        const service = setupService();
        const responsePromise = service.get();
        const response = await responsePromise;

        expect(response).toEqual(MOCK_RESULT_TEST_BOOLEAN);
    });

    test("Test request with return 'custom object'.", async () => {
        const path = "/path";

        nock(MOCK_SERVER_URL).get(path).reply(200, MOCK_RESULT_TEST_OBJECT);

        const service = setupService();
        const responsePromise = service.get();
        const response = await responsePromise;

        expect(response).toEqual(MOCK_RESULT_TEST_OBJECT);
    });

    test("Test request with return 'custom nested object'.", async () => {
        const path = "/path";

        nock(MOCK_SERVER_URL).get(path).reply(200, MOCK_RESULT_TEST_OBJECT_NESTED);

        const service = setupService();
        const responsePromise = service.get();
        const response = await responsePromise;

        expect(response).toEqual(MOCK_RESULT_TEST_OBJECT_NESTED);
    });

    test("Test request with return 'class object'.", async () => {
        const path = "/path";

        nock(MOCK_SERVER_URL).get(path).reply(200, MOCK_RESULT_TEST_OBJECT_CLASS);

        const service = setupService();
        const responsePromise = service.get();
        const response = await responsePromise;

        expect(response).toEqual(MOCK_RESULT_TEST_OBJECT_CLASS);
    });

    test("Test request with JSON return should be converted to object", async () => {
        const path = "/path";

        nock(MOCK_SERVER_URL).get(path).reply(200, MOCK_RESULT_TEST_OBJECT_NESTED_JSON);

        const service = setupService();
        const responsePromise = service.get();
        const response = await responsePromise;

        expect(response).toEqual(MOCK_RESULT_TEST_OBJECT_NESTED);
    });
});