# Interceptors

An interceptor can intercept the request, response & error from an EchoFetch request.
It requires the implementation of the following 3 methods:

```typescript
/**
 * Called before sending every request.
 * @param request
 */
onRequest(request: EchoRequest): EchoRequest;

/**
 * Called after every successful response.
 * @param response
 */
onResponse(response: EchoResponse): EchoResponse;

/**
 * Called after every failed response.
 * @param error
 */
onError(error: EchoError): EchoError;
```

The diagram of when a specific method of an interceptor is called looks like this:

![Interceptor diagram](/img/interceptor_diagram.png)

## Creating an interceptor

You can create an interceptor by implementing the interface `EchoServiceInterceptor`

```typescript
export class TestInterceptor implements EchoServiceInterceptor {

    /**
     * Called before sending every request.
     * @param request
     */
    onRequest(request: EchoRequest): EchoRequest {
        // Add extra headers to every request.
        request.headers["test1"] = "interceptor-value1";
        request.headers["test2"] = "interceptor-value2";

        return request;
    }
    
    /**
     * Called after every successful response.
     * @param response
     */
    onResponse(response: EchoResponse): EchoResponse {
        return response;
    }
    
    /**
     * Called after every failed response.
     * @param error
     */
    onError(error: EchoError): EchoError {
        return response;
    }
}
```

## Registering an interceptor

When creating the service using the `EchoServiceBuilder`, you can add interceptors using:

```typescript
addInterceptor(interceptor: EchoServiceInterceptor)
```

For example:

```typescript
const service = new EchoServiceBuilder()
            .setBaseUrl("https://localhost:3000")
            .addInterceptor(new TestInterceptor())
            .build(TestService);
```

You can add an interceptor inline, without implementing all of its members:

```typescript
const service = new EchoServiceBuilder()
            .setBaseUrl("https://localhost:3000")
            .addInterceptor(<EchoServiceInterceptor> {

                onRequest(request: EchoRequest): EchoRequest {

                    // Change the headers.
                    request.headers["test2"] = "interceptor-value2";
                    request.headers["test4"] = "interceptor-value4";

                    return request;
                }
            })
            .build(TestService);
```