# Decorators

EchoFetch supports various decorators inside an `EchoService`.

## HTTP Method Decorators

These decorators are placed above a method inside an `EchoService`. They will execute an HTTP-method when doing a request.

### `@GET(path: string)`

Send a `GET` request to the given `path`

### `@POST(path: string)`

Send a `POST` request to the given `path`

### `@PUT(path: string)`

Send a `PUT` request to the given `path`

### `@PATCH(path: string)`

Send a `PATCH` request to the given `path`

### `@DELETE(path: string)`

Send a `DELETE` request to the given `path`

### `@OPTIONS(path: string)`

Send a `OPTIONS` request to the given `path`

### `@HEAD(path: string)`

Send a `HEAD` request to the given `path`

## Other Method Decorators

### `@Headers({ [key: string]: string })`

Will provide a list of static headers.
They are provided to the decorator as an object of *key-value pairs*.

Multiple headers can be specified.
Can also be used in conjunction with [`@Header`](#header-name-string)


```typescript
@GET("/path")
@Headers({
    "test1": "value1",
    "test2": "value2"
})
public getWithHeaders(): EchoPromise<string> {
    return {} as EchoPromise<string>;
};
```

### `@Queries({ [key: string]: string })`

Will provide a list of static query parameters.
They are provided to the decorator as an object of *key-value pairs*.

`
https://example.org/index?query1=value1&query2=value2
`

Multiple query parameters can be specified and will be chained together into a correct URL.
Can also be used in conjunction with [`@Query`](#query-name-string)

```typescript
@GET("/path")
@Queries({
    "test1": "value1",
    "test2": "value2"
})
public getWithQueries(): EchoPromise<string> {
    return {} as EchoPromise<string>;
};
```

### `@FormUrlEncoded()`
Will encode all the passed `FormField` parameters as an URL string.
Will provide the header: `Content-Type: application/x-www-form-urlencoded`
All parameters with @FormField will be added to the encoded data string.

A possible result for 2 FormFields (test1 & test2) could be:

data: `test1=value1&test2=value2`

```typescript
@FormUrlEncoded()
@GET("/path")
public getWithFormField(@FormField("test") test: string): EchoPromise<string> {
    return {} as EchoPromise<string>;
};
```

### `@FormMultipart()`
Will encode all the passed `FormField` parameters as a `FormData` object.
Will provide the header `Content-Type: multipart/form-data`
All parameters with @FormField will be added to FormData object.

```typescript
@FormMultipart()
@GET("/path")
public getWithFormFieldMultipart(@FormField("test") test: string): EchoPromise<string> {
    return {} as EchoPromise<string>;
};
```

## Parameter Decorators

These decorators are placed inside the declaration of a method inside an EchoService.
They will provide extra information with the HTTP request.

### `@Path(name: string)`

Will replace a variable inside the path of the given *HTTP Method Decorator*.

`{name}` inside the path of *HTTP Method Decorator* will be replaced 
with the value passed to the parameter of the function.

Multiple path parameters van be specified.

```typescript
@GET("/path/{id}")
public getWithPathParam(@Path("id") id: number): EchoPromise<string> {
    return {} as EchoPromise<string>;
};
```

### `@Query(name: string)`

Will append a *Query parameter* with name `name` to the URL of the HTTP-request.
The value of the query parameter will be the value passed to the parameter of the function.

`
https://example.org/index?query1=value1&query2=value2
`

Multiple query parameters van be specified and will be chained together into a correct URL.

```typescript
@GET("/path")
public getWithQueryParam(@Query("test") test: string): EchoPromise<string> {
    return {} as EchoPromise<string>;
};
```

### `@Body()`

Will provide a `body` to the HTTP-request.
The value of the body will be the value passed to the parameter of the function.

You are able to provide multiple bodies for a single method. 
The keys will be merged according to there position in the method (last value has the highest priority)

```typescript
@POST("/path")
public postWithBody(@Body() test: TestModel): EchoPromise<string> {
    return {} as EchoPromise<string>;
};
```

### `@Header(name: string)`

Will provide a header with a given `name` to the HTTP-request. 
The value of the header will be the value passed to the parameter of the function.

When used in conjunction with [`@Headers`](#headers-key-string-string), this decorator will have the highest priority, 
overriding duplicate keys.

Multiple header parameters van be specified.

```typescript
@GET("/path")
public getWithHeader(@Header("test") test: string): EchoPromise<string> {
    return {} as EchoPromise<string>;
};
```

### `@FormField(name: string)`

Will provide a form field to the method when used in conjunction with [`@FormUrlEncoded()`](#formurlencoded)
or [`@FormMultipart()`](#formmultipart)

Will create a `FormData`-object with key-value: *test*:
```typescript
@FormMultipart()
@GET("/path")
public getWithFormFieldMultipart(@FormField("test") test: string): EchoPromise<string> {
    return {} as EchoPromise<string>;
};
```

Will create a data string with key-values: *test1* & *test2*:
Example: `test1=value1&test2=value2`
```typescript
@FormUrlEncoded()
@GET("/path")
public getWithFormFieldMultiple(@FormField("test1") test1: string, @FormField("test2") test2: string, @FormField("a") a: number): EchoPromise<string> {
    return <EchoPromise<string>>{}
};
```