# Getting started

## Creating a service

To fetch data from an API, you need to create a *class* that extends the `EchoService`-class:

```typescript
class TestService extends EchoService {
    
    @GET("/path")
    getData(): EchoPromise<string> {
       return {} as EchoPromise<string>;
   };
}
```

In this example we are using the `@GET(path: string)` decorator to specify that the given function will do a *GET* request
on the given `/path` when the function is called.

The empty return is there to prevent TypeScript errors that no result is specified.

### No implicit return

::: warning
This is not recommended, since no error will be given when any function in the project returns no value.
:::

You can add `"noImplicitReturns": false` to your *tsconfig.json* file, if you want to create a function without return.

*tsconfig.json*

```json
{
    "compilerOptions": {
        "target": "es5",
        "module": "es2015",
        "moduleResolution": "node",
        "strict": true,
        "experimentalDecorators": true,
        "noImplicitReturns": false
   }
}
```

```typescript
class TestService extends EchoService {
    
    @GET("/path")
    getData(): EchoPromise<string> {};
}
```

## Building a service
In order to use a service, you need to build an instance of that service using the `EchoServiceBuilder`.

```typescript
const service = new EchoServiceBuilder()
            .setBaseUrl("http://localhost:3000")
            .build(TestService);
```

Use `.setBaseUrl(string: string)` to set the prefix of the url for every function inside the service. 