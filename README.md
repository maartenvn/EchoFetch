
# EchoFetch

[![build status](https://img.shields.io/travis/maartenvn/echofetch)](https://travis-ci.org/maartenvn/EchoFetch)
[![npm version](https://img.shields.io/npm/v/echofetch)](https://www.npmjs.com/echofetch)
[![npm downloads](https://img.shields.io/npm/dm/echofetch)](http://npm-stat.com/charts.html?package=echofetch)

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

    @GET("/path")
    @Queries({
        "searching": true
    })
    searchData(@Query("q") query: string): EchoPromise<string> {};
   
    @POST("/path")
    @Headers({
        "Authorization": "api-token"
    })
    createData(@Header("name") nameHeader: string, @Body() data: TestData): EchoPromise<void> {};

    @PATCH("/path/{id}")
    updateData(@Path("id") id: number, @Body() data: TestDataUpdate): EchoPromise<void> {};

    @DELETE("/path")
    deleteData(@Path("id") id: number): EchoPromise<void> {};

    @PUT("/path/{id}")
    putData(@Path("id") id: number, @Body() data: TestDataPut): EchoPromise<void> {};
    
    @FormMultipart()
    uploadImage(@FormField("image") image: File): EchoPromise<string> {};
    
    @FormUrlEncoded()
    submitForm(@FormField("username") username: string, @FormFieldObject() otherData: Data): EchoPromise<User> {};
}

const service = new EchoServiceBuilder()
            .setBaseUrl("https://localhost:3000")
            .build(TestService);

service.getData()
        .then((data: string) => console.log(data))
        .catch((error: EchoError) => console.error(error))
```

More examples & documentation: [Documentation](https://maartenvn.github.io/EchoFetch/)