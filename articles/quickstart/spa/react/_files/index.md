---
filename: index.js
language: javascript
---

```javascript
import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

ReactDOM.render(
  <Auth0Provider
    domain="abcdaaaaaa.us.auth0.com"
    clientId="WbNBGU0fZVUInuejEmB9jnA99yz7h7x7"
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);
```