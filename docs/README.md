---
home: true
heroText: EchoFetch
tagline: Decorator based HTTP client for browser & Node.JS based on Axios.
actionText: Get Started →
actionLink: /guide/installation
features:
- title: Powerfull & easy to use
  details: EchoFetch will make doing requests super easy, stripping down on boilerplate code.
- title: Small bundle size
  details: EchoFetch only adds an additional 2.78 KB (Gzipped) to your bundle size.
- title: Framework support
  details: Goes perfectly with Frontend Frameworks such as Vue.JS (build-in support)
footer: MIT Licensed | Copyright © 2020 - Maarten Van Neyghem
---

---
# Overview

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
