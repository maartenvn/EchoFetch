
# EchoFetch

EchoFetch is a decorator based HTTP client for browser & Node.JS based on Axios. It has been inspired by the Java library *RetroFit*.
EchoFetch will obtain the data from an API using a decorator based system.

## [Documentation](https://maartenvn.github.io/EchoFetch/)

You can find the full documentation here: [Documentation](https://maartenvn.github.io/EchoFetch/)

## How does it work

EchoFetch is a thin layer on top of [Axios](https://github.com/axios/axios), therefore allowing it to both run in the browser & in Node.JS.
It used the ES7 *Decorator-syntax* to create an implementation for a set of functions inside a class.

## Install the package

### Using NPM:

```
npm install echofetch --save
```

### Using YARN

```
yarn add echofetch
```

Whats next: [Build Setup](https://maartenvn.github.io/EchoFetch/guide/installation.html#build-setup)

## Simple usage

```typescript
class TestService extends EchoService {
    
    @GET("/path")
    getData(): EchoPromise<string> {};
}

const service = new EchoServiceBuilder()
            .setBaseUrl("https://localhost:3000")
            .build(TestService);

service.getData()
        .then((data: string) => console.log(data))
        .catch((error: EchoError) => console.error(error))
```

More examples & documentation: [Documentation](https://maartenvn.github.io/EchoFetch/)