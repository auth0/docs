```js
import {createHistory} from "history";
import {makeRouterDriver} from 'cyclic-router'
import {makeAuth0Driver, protect} from "cyclejs-auth0";

function main(sources) {
    //your application's code
}

const drivers = {
    auth0: makeAuth0Driver("client-ID", "domain"),
    router: makeRouterDriver(createHistory())
}
```
