```js
// app/index.js

import {makeAuth0Driver, protect} from "cyclejs-auth0";

function main(sources) {
    //your application's code
}

const drivers = {
    auth0: makeAuth0Driver('<%= account.clientId %>', '<%= account.namespace %>')
}
```
