# Vue

EchoFetch integrates very nicely with Vue, since it was written with Vue in mind. 
EchoFetch supports native Vue Reactivity on the EchoPromise object, allowing easy displaying of state.

## Templates

You can use the EchoPromise object as result from a service function inside Vue templates. 
The Vue renderer will automatically re-render the template when the EchoPromise changes:

```vue
<template>
    <div>
        <!-- Loading -->
        <template v-if="result.isLoading()">
            Loading...
        </template>
        
        <!-- Success -->
        <template v-else-if="result.isSuccess()">
            {{ result.data }}
        </template>

        <!-- Error -->
        <template v-else-if="result.isError()">
            
            <p>
                An error has occurred.
            </p>

            {{ result.error.message }}
        </template>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TestService from "./services/TestService";

@Component
export default class Test extends Vue {
    
    /**
     * The only necessary property to display the data.
     * No complex watcher or computed property structure necessary.
     * This makes creating complex templates with multiple data properties a breeze.
     */ 
    result: EchoPromise<string> = TestService.getTest();
}
</script>
```

This way it is easy to handle all the different states from a request. 
It does not require any watchers or computed properties as would be the case with regular Axios usage.
This makes creating complex templates with multiple data properties a breeze.