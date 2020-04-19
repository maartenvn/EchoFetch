# Converters

A converter takes the `data`, received from a response of a request and converts it into a new value of 
the same or a different type.

It requires the implementation of the following 2 methods:

```typescript
/**
 * Get if the converter should convert a given response.
 * @param response
 */
canConvert(response: EchoResponse): boolean;

/**
 * Convert a fetch response to a different type.
 * @param response
 */
convert(response: EchoResponse): any;
```

The `canConvert(response: EchoResponse)` method is used for determining if the converter can convert a given response.
For every response **only 1 converter will be able to convert the response**.
The first converter in the list, which results true for `canConvert`, will convert the response.

## Creating a converter

You can create a converter by implementing the interface `EchoServiceConverter`.

```typescript
import * as parser from "fast-xml-parser";

export class TestConverter implements EchoServiceConverter {
    /**
     * Get if the converter should convert a given response.
     * @param response
     */
    canConvert(response: EchoResponse): boolean {
        return parser.validate(response.data) === true;
    }
    
    /**
     * Convert a fetch response to a different type.
     * @param response
     */
    convert(response: EchoResponse): any {
        return parser.parse(response.data);
    }
}
```

## Registering a converter

When creating the service using the `EchoServiceBuilder`, you can add converters using:

```typescript
addConverter(converter: EchoServiceConverter)
```

For example:

```typescript
const service = new EchoServiceBuilder()
            .setBaseUrl("https://localhost:3000")
            .addConverter(new TestConverter())
            .build(TestService);
```

You can also add a converter inline:

```typescript
const service = new EchoServiceBuilder()
            .setBaseUrl("https://localhost:3000")
            .addConverter(<EchoServiceConverter> {

                canConvert(response: EchoResponse): boolean {
                    return parser.validate(response.data) === true;
                },

                convert(response: EchoResponse): any {
                    return parser.parse(response.data);
                }
            })
            .build(TestService);
```