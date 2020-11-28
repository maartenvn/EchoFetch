(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{365:function(e,s,t){"use strict";t.r(s);var r=t(42),a=Object(r.a)({},(function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"echopromise"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#echopromise"}},[e._v("#")]),e._v(" EchoPromise")]),e._v(" "),t("h2",{attrs:{id:"introduction"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#introduction"}},[e._v("#")]),e._v(" Introduction")]),e._v(" "),t("div",{staticClass:"language-typescript extra-class"},[t("pre",{pre:!0,attrs:{class:"language-typescript"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("class")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[e._v("TestService")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("extends")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[e._v("EchoService")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n    \n    @"),t("span",{pre:!0,attrs:{class:"token constant"}},[e._v("GET")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[e._v('"/path"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),e._v("\n    "),t("span",{pre:!0,attrs:{class:"token function"}},[e._v("getData")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" EchoPromise"),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v("<")]),t("span",{pre:!0,attrs:{class:"token builtin"}},[e._v("string")]),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v(">")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n       "),t("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("return")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("as")]),e._v(" EchoPromise"),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v("<")]),t("span",{pre:!0,attrs:{class:"token builtin"}},[e._v("string")]),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v(">")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(";")]),e._v("\n   "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(";")]),e._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n")])])]),t("p",[e._v("As seen in the example above, "),t("code",[e._v("EchoPromise<T>")]),e._v(" is used instead of the regular "),t("code",[e._v("Promise<T>")]),e._v(".")]),e._v(" "),t("p",[t("code",[e._v("EchoPromise")]),e._v(" is an "),t("em",[e._v("extension")]),e._v(" of the regular Javascript ES6 promise, and has the regular functions such as:")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("then(onfulfilled?, onrejected?:)\ncatch(onrejected?:)\nfinally(onfinally?:) \n")])])]),t("p",[t("code",[e._v("EchoPromise")]),e._v(" has support for the "),t("em",[e._v("async/await")]),e._v(" syntax.")]),e._v(" "),t("p",[e._v("Internally EchoPromise is a wrapper around an existing ES6 Promise,\nbecause transpiling to ES5 does not allow for extensions of build-in classes.")]),e._v(" "),t("h2",{attrs:{id:"converting-to-regular-promise"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#converting-to-regular-promise"}},[e._v("#")]),e._v(" Converting to regular promise.")]),e._v(" "),t("p",[e._v("If you want to convert an EchoPromise to a regular ES6 Promise you can use:")]),e._v(" "),t("div",{staticClass:"language-typescript extra-class"},[t("pre",{pre:!0,attrs:{class:"language-typescript"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("const")]),e._v(" result"),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" EchoPromise"),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v("<")]),t("span",{pre:!0,attrs:{class:"token constant"}},[e._v("T")]),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v(">")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v(" Service"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("get")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(";")]),e._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("const")]),e._v(" promise"),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token builtin"}},[e._v("Promise")]),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v("<")]),t("span",{pre:!0,attrs:{class:"token constant"}},[e._v("T")]),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v(">")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v(" result"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[e._v("getPromise")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(";")]),e._v("\n")])])]),t("h2",{attrs:{id:"reasoning-behind-echopromise"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#reasoning-behind-echopromise"}},[e._v("#")]),e._v(" Reasoning behind EchoPromise.")]),e._v(" "),t("p",[e._v("EchoPromise adds some useful functions to view the state and result of the request, without having to resolve the promise.")]),e._v(" "),t("p",[e._v("This way you can use the result of a request in conjunction with frameworks such as "),t("a",{attrs:{href:"https://vuejs.org/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Vue JS"),t("OutboundLink")],1)]),e._v(" "),t("h2",{attrs:{id:"reference"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#reference"}},[e._v("#")]),e._v(" Reference")]),e._v(" "),t("h3",{attrs:{id:"isloading-boolean"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#isloading-boolean"}},[e._v("#")]),e._v(" isLoading(): boolean")]),e._v(" "),t("p",[e._v("If the request is currently loading/waiting for a response.")]),e._v(" "),t("h3",{attrs:{id:"issuccess-boolean"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#issuccess-boolean"}},[e._v("#")]),e._v(" isSuccess(): boolean")]),e._v(" "),t("p",[e._v("If the request succeeded/when the promise is "),t("code",[e._v("resolved")]),e._v(".")]),e._v(" "),t("h3",{attrs:{id:"iserror-boolean"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#iserror-boolean"}},[e._v("#")]),e._v(" isError(): boolean")]),e._v(" "),t("p",[e._v("If the request has failed/when the promise is "),t("code",[e._v("rejected")]),e._v(".")]),e._v(" "),t("h3",{attrs:{id:"data-t"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#data-t"}},[e._v("#")]),e._v(" data?: T")]),e._v(" "),t("p",[e._v("Data from a request that succeeded. Will be null when "),t("code",[e._v("isSuccess() === false")])]),e._v(" "),t("h3",{attrs:{id:"response-echoresponse"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#response-echoresponse"}},[e._v("#")]),e._v(" response?: EchoResponse")]),e._v(" "),t("p",[e._v("Full response (inherit from "),t("code",[e._v("AxiosResponse")]),e._v(") from the request. Will be null when "),t("code",[e._v("isSuccess() === false")])]),e._v(" "),t("h3",{attrs:{id:"error-echoerror"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#error-echoerror"}},[e._v("#")]),e._v(" error?: EchoError")]),e._v(" "),t("p",[e._v("Error object (inherit from "),t("code",[e._v("AxiosError")]),e._v(") from the request. Will be null when "),t("code",[e._v("isError() === false")])]),e._v(" "),t("h3",{attrs:{id:"requiredata-t"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#requiredata-t"}},[e._v("#")]),e._v(" requireData(): T")]),e._v(" "),t("p",[e._v("Same as "),t("a",{attrs:{href:"#data-t"}},[e._v("data")]),e._v(" but not an "),t("em",[e._v("Optional")]),e._v(". Will throw an error when "),t("code",[e._v("isSuccess() === false")])]),e._v(" "),t("h3",{attrs:{id:"requireresponse-echoresponse"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#requireresponse-echoresponse"}},[e._v("#")]),e._v(" requireResponse(): EchoResponse")]),e._v(" "),t("p",[e._v("Same as "),t("a",{attrs:{href:"#response-echoresponse"}},[e._v("response")]),e._v(" but not an "),t("em",[e._v("Optional")]),e._v(". Will throw an error when "),t("code",[e._v("isSuccess() === false")])]),e._v(" "),t("h3",{attrs:{id:"requireerror-echoresponse"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#requireerror-echoresponse"}},[e._v("#")]),e._v(" requireError(): EchoResponse")]),e._v(" "),t("p",[e._v("Same as "),t("a",{attrs:{href:"#error-echoerror"}},[e._v("error")]),e._v(" but not an "),t("em",[e._v("Optional")]),e._v(". Will throw an error when "),t("code",[e._v("isError() === false")])])])}),[],!1,null,null,null);s.default=a.exports}}]);