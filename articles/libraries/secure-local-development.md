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
Local development environments typically run on non-secure channels (ie: `http://localhost`) out of the box.  This guide will discuss when you should run a secure local server and how to setup `https` on localhost.

## When to use a secure local server
Testing locally on non-secure channels `http` is generally safe for servers that don't communicate with external services.  However, when your local server is communicating with external services (ie. Auth0), we recommend running your local server on `https` for the following reasons:

- Communication between an external service and your localhost should be encrypted to protect any sensitive information.
- It tests a very critical part of the development stack if you run your server on secure channels in production.
- Cookies using secure or [same-site](https://auth0.com/blog/browser-behavior-changes-what-developers-need-to-know/) will not be sent to local `http`, disrupting authentication and other functionality.

## How to set up a secure local server
When you visit a secure web page (served over https), your browser will verify the SSL certificate supplied by the server with a Certificate Authority. When loading a secure web page from a local server, you can create an authority just for your machine and generate certificates that only your browser will trust.

The process to do this is:

1. Create and install a local Certificate Authority
2. Generate an SSL certificate for the domain being used (ie. localhost) using this new Authority.
3. Serve the SSL certificate from your web application

### 1. Install Mkcert Utility
To get started, download [Mkcert](https://github.com/FiloSottile/mkcert) and follow the [installation instructions](https://github.com/FiloSottile/mkcert#installation) for your specific operating system.

### 2. Install local Certificate Authority
The Certificate Authority is a trusted entity that the web browser uses to verify the certificate supplied by a webserver.  Installing a local Certificate Authority will allow you to generate your own SSL Certificates to be used locally.

```powershell
> mkcert -install
# Using the local CA at "/Users/$HOME/Library/Application Support/mkcert" ✨
# The local CA is now installed in the system trust store! 👍
# The local CA is now installed in the Firefox trust store (requires browser restart)! 🦊
```

### 3. Generate an SSL Certificate
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

### 4. Serve the SSL certificate
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
