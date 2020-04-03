import * as nock from "nock";
import * as parser from "fast-xml-parser";
import EchoService from "../src/service/EchoService";
import EchoServiceBuilder from "../src/service/EchoServiceBuilder";
import GET from "../src/decorators/methods/GetDecorator";
import EchoPromise from "../src/types/EchoPromise";
import EchoPromiseStatus from "../src/types/EchoPromiseStatus";
import EchoServiceConverter from "../src/service/EchoServiceConverter";
import EchoResponse from "../src/types/EchoResponse";

class TestService extends EchoService {
    @GET("/path")
    public get(): EchoPromise<string> {
        return <EchoPromise<string>>{}
    };
}

interface TestModel {
    test: string
}

const MOCK_SERVER_URL = "http://host:port";
const MOCK_RESULT_TEST = "<test>testing</test>";
const MOCK_RESULT_TEST_MODEL: TestModel = {
    test: "testing"
}
const MOCK_RESULT_TEST_MODEL_2: TestModel = {
    test: "testing2"
}

describe("EchoFetch Converters Tests", () => {

    test("Test converter that can convert the given result.", async () => {
        const path = "/path";

        nock(MOCK_SERVER_URL).get(path).reply(200, MOCK_RESULT_TEST);

        const service = new EchoServiceBuilder()
            .addConverter(<EchoServiceConverter> {

                canConvert(response: EchoResponse): boolean {
                    return parser.validate(response.data) === true;
                },

                convert(response: EchoResponse): any {
                    return parser.parse(response.data);
                }
            })
            .setBaseUrl(MOCK_SERVER_URL)
            .build(TestService);
        const responsePromise = service.get();
        const response = await responsePromise;

        expect(response).toEqual(MOCK_RESULT_TEST_MODEL);
    });

    test("Test 2 converters where the first converter should convert the result.", async () => {
        const path = "/path";

        nock(MOCK_SERVER_URL).get(path).reply(200, MOCK_RESULT_TEST);

        const service = new EchoServiceBuilder()
            .addConverter(<EchoServiceConverter> {

                canConvert(response: EchoResponse): boolean {
                    return parser.validate(response.data) === true;
                },

                convert(response: EchoResponse): any {
                    return parser.parse(response.data);
                }
            })
            .addConverter(<EchoServiceConverter> {

                canConvert(response: EchoResponse): boolean {
                    return parser.validate(response.data) === true;
                },

                convert(response: EchoResponse): any {
                    let object = parser.parse(response.data);
                    object["extraVar"] = "test";

                    return object;
                }
            })
            .setBaseUrl(MOCK_SERVER_URL)
            .build(TestService);
        const responsePromise = service.get();
        const response = await responsePromise;

        expect(response).toEqual(MOCK_RESULT_TEST_MODEL);
    });

    test("Test 2 converters where the first converter cannot parse the result.", async () => {
        const path = "/path";

        nock(MOCK_SERVER_URL).get(path).reply(200, MOCK_RESULT_TEST);

        const service = new EchoServiceBuilder()
            .addConverter(<EchoServiceConverter> {

                canConvert(response: EchoResponse): boolean {
                    return false;
                },

                convert(response: EchoResponse): any {
                    return parser.parse(response.data);
                }
            })
            .addConverter(<EchoServiceConverter> {

                canConvert(response: EchoResponse): boolean {
                    return parser.validate(response.data) === true;
                },

                convert(response: EchoResponse): any {
                    return MOCK_RESULT_TEST_MODEL_2;
                }
            })
            .setBaseUrl(MOCK_SERVER_URL)
            .build(TestService);
        const responsePromise = service.get();
        const response = await responsePromise;

        expect(response).toEqual(MOCK_RESULT_TEST_MODEL_2);
    });
});