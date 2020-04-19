# EchoPromise

## Introduction

```typescript
class TestService extends EchoService {
    
    @GET("/path")
    getData(): EchoPromise<string> {
       return {} as EchoPromise<string>;
   };
}
```

As seen in the example above, `EchoPromise<T>` is used instead of the regular `Promise<T>`.

`EchoPromise` is an *extension* of the regular Javascript ES6 promise, and has the regular functions such as:

```
then(onfulfilled?, onrejected?:)
catch(onrejected?:)
finally(onfinally?:) 
```

`EchoPromise` has support for the *async/await* syntax.

Internally EchoPromise is a wrapper around an existing ES6 Promise, 
because transpiling to ES5 does not allow for extensions of build-in classes.

## Converting to regular promise.
If you want to convert an EchoPromise to a regular ES6 Promise you can use:

```typescript
const result: EchoPromise<T> = Service.get();
const promise: Promise<T> = result.getPromise();
```

## Reasoning behind EchoPromise.

EchoPromise adds some useful functions to view the state and result of the request, without having to resolve the promise.

This way you can use the result of a request in conjunction with frameworks such as [Vue JS](https://vuejs.org/)

## Reference

### isLoading(): boolean

If the request is currently loading/waiting for a response.

### isSuccess(): boolean

If the request succeeded/when the promise is `resolved`.

### isError(): boolean

If the request has failed/when the promise is `rejected`.

### data?: T

Data from a request that succeeded. Will be null when `isSuccess() === false`

### response?: EchoResponse

Full response (inherit from `AxiosResponse`) from the request. Will be null when `isSuccess() === false`

### error?: EchoError

Error object (inherit from `AxiosError`) from the request. Will be null when `isError() === false`

### requireData(): T

Same as [data](#data-t) but not an *Optional*. Will throw an error when `isSuccess() === false`

### requireResponse(): EchoResponse

Same as [response](#response-echoresponse) but not an *Optional*. Will throw an error when `isSuccess() === false`

### requireError(): EchoResponse

Same as [error](#error-echoerror) but not an *Optional*. Will throw an error when `isError() === false`

