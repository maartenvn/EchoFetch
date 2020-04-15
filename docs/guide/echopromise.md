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

