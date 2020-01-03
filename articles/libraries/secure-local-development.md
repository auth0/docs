---
section: libraries
description: Securing local development servers to work with samesite cookies
topics:
  - libraries
  - samesite
contentType:
  - guide
---

# Secure Local Development
Commonly developers run local web servers on non-secure channels (http).  Generally because the perceived difficulty of running a secure local server (https), and/or it is not a requirement for their local setup.  This guide will discuss when you should run a secure local server `https` and provide simple instructions for setting it up.

## When to use a secure local server
Testing locally on non-secure channels `http` is generally safe for servers that don't communicate with external services.  However, when your local server is communicating with external services (ie. Auth0), we recommend running your local server on `https` for the following reasons:

- Communication between an external service (ie. Auth0) and your localhost should be encrypted to protect any sensitive information.
- It tests a very critical part of the development stack. When you run your server on secure channels in production, you're missing a potentially large source of issues.
- Cookies using secure or [same-site](https://auth0.com/blog/browser-behavior-changes-what-developers-need-to-know/) will not be sent to local `http` disrupting authentication and other functionality.

## How to set up a secure local server
When your web browser visits a secure web page (https) the browser verifies the SSL certificate supplied by the server with a Certificate Authority.

This can be handled locally in 3 easy steps:

1. Install a local Certificate Authority
2. Generate SSL certificate for the address/domain (ie. localhost)
3. Serve the SSL certificate from your web application

To get started, download [Mkcert](https://github.com/FiloSottile/mkcert) and follow the [installation instructions](https://github.com/FiloSottile/mkcert#installation) for your specific operating system.

### 1. Install local Certificate Authority
The Certificate Authority is a trusted entity that the web browser uses to verify the certificate supplied by a webserver.  Installing a local Certificate Authority will allow you to generate your own SSL Certificates to be used locally.

```powershell
> mkcert -install
# Using the local CA at "/Users/$HOME/Library/Application Support/mkcert" ✨
# The local CA is now installed in the system trust store! 👍
# The local CA is now installed in the Firefox trust store (requires browser restart)! 🦊
```

### 2. Generate SSL Certificate
The next step is to generate the SSL certificate. This example will assume you are running your local server on `https://localhost:{port}`.

```powershell
> mkcert localhost
# Using the local CA at "/Users/$HOME/Library/Application Support/mkcert" ✨

# Created a new certificate valid for the following names 📜
#  - "localhost"

# The certificate is at "./localhost.pem" and the key at "./localhost-key.pem" ✅
```

:::note
The utility saves the cerificate `localhost.pem` and a key file `localhost-key.pem` in the folder where the command was executed.
:::

### 3. Serve SSL certificate
Now that you have generated an SSL certificate and key, you need to load them when starting your server.  Here is an example of using them on localhost with an Express web server.

```js
const fs = require('fs');
const key = fs.readFileSync('./localhost-key.pem');
const cert = fs.readFileSync('./localhost.pem');

const express = require('express');
const https = require('https');
const app = express();

https.createServer({key: key, cert: cert }, app).listen('3000', () => {
  console.log('listening on http://localhost:3000');
});
```