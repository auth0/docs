---
section: libraries
description: Securing local development servers to work with samesite cookies
topics:
  - libraries
  - samesite
contentType:
  - reference
---

# Secure Local Development
Google is introducing new restrictions on cookie usage in version 80 of Chrome with a new cookie attribute named [Same Site](https://auth0.com/blog/browser-behavior-changes-what-developers-need-to-know/).  This article covers how it impacts using Auth0 in your local environment with certain SDKs.

This article only impacts you if you are using one of the following SDKS:
- express-openid-connect
- another one

These SDKs utilize cookies to handle request state and prevent replay attacks.  When the authentication request is handed back from Auth0 to your local server, the new same site restrictions will prevent the cookie being passed if the local server is not secure (https).  Without this cookie value, the local server will be unable to complete the authentication request.

## How to set up a secure local environment
Instructions on how to set up a secure local environment can be daunting and burdensome.  However, thanks to the open source community, [Mkcert](https://github.com/FiloSottile/mkcert) is a tool that automates and simplifies the implementation.

Follow the [installation instructions](https://github.com/FiloSottile/mkcert#installation) for your specific operating system.

### Installing the local Certificate Authority
After you have mkcert installed you can use it to install the local Certificate Authority.  The local Certificate Authority will allow for mkcert to generate locally-trusted certificates and accompanying keys to allow your local development server to run on `https`.

```powershell
> mkcert -install
# Using the local CA at "/Users/$HOME/Library/Application Support/mkcert" ✨
# The local CA is now installed in the system trust store! 👍
# The local CA is now installed in the Firefox trust store (requires browser restart)! 🦊
```

### Generate a locally-trusted certificate & key
The next step is to generate the locally-trusted certificate and key for use on your local development server. This example will assume you are running your local server on `https://localhost:{port}` or `https://127.0.0.1:{port}`.  Multiple values can be passed into mkcert to support a range of address names.

```powershell
> mkcert localhost 127.0.0.1
# Using the local CA at "/Users/$HOME/Library/Application Support/mkcert" ✨

# Created a new certificate valid for the following names 📜
#  - "localhost"
#  - "127.0.0.1"

# The certificate is at "./localhost+1.pem" and the key at "./localhost+1-key.pem" ✅
```

:::note
The utility saves the cerificate `localhost+1.pem` and key `localhost+1-key.pem` in the folder where the command was executed.
:::

### Use the local certificate and key on your server
Now that you have generated a locally-trusted certificate and key, you can use them when starting up your server.  Here is an example of using them on localhost with an Express web server.

```js
const fs = require('fs');
const key = fs.readFileSync('./localhost+1-key.pem');
const cert = fs.readFileSync('./localhost+1.pem');

const express = require('express');
const https = require('https');
const app = express();

https.createServer({key: key, cert: cert }, app).listen(port, () => {
  console.log('listening on http://localhost:' + port);
});
```