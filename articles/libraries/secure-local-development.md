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
Testing over non-secure channels `http` is generally safe for local servers that don't communicate with external services, like Auth0.  However, when your local server is communicating with external services, we recommend running your local server on `https` for the following reasons:

- Communication between an external service and your localhost should be encrypted to protect any sensitive information.
- It tests a very critical part of the development stack if you run your server on secure channels in production.
- Cookies using a Secure attribute or [SameSite](https://auth0.com/blog/browser-behavior-changes-what-developers-need-to-know/) attribute set to `None` will not be sent across insecure channels, disrupting authentication and other functionality.

## How to set up a secure local server
When you visit a secure web page (served over https), your browser will verify the SSL certificate supplied by the server with a Certificate Authority. When loading a secure web page from a local server, you can create an authority just for your machine and generate certificates that only your browser will trust.

The process to do this is:

1. Create and install a local Certificate Authority
2. Generate an SSL certificate for the domain being used (ie. localhost) using this new Authority.
3. Serve the SSL certificate from your web application

### 1. Install Mkcert Utility
To get started, download [mkcert](https://github.com/FiloSottile/mkcert) and follow the [installation instructions](https://github.com/FiloSottile/mkcert#installation) for your specific operating system.

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
The utility saves the certificate `localhost.pem` and a key file `localhost-key.pem` in the folder where the command was executed.
:::

### 4. Serve the SSL certificate
Now that you have generated an SSL certificate and key, you need to load them when starting your server. The way certificates are loaded depends on the technology used to serve the application. Please see below for examples.

#### Node.js with Express

```js
// app.js

const express = require('express');
const https = require('https');
const fs = require('fs');

const key = fs.readFileSync('./localhost-key.pem');
const cert = fs.readFileSync('./localhost.pem');

https.createServer({key, cert}, express()).listen('3000', () => {
  console.log('Listening on https://localhost:3000');
});
```

#### webpack DevServer

```js
// webpack.config.js

module.exports = {
  //...
  devServer: {
    https: {
      key: fs.readFileSync('./localhost-key.pem'),
      cert: fs.readFileSync('./localhost.pem'),
    }
  }
};
```

#### Apache (including PHP, Python, Ruby)

The actual path of the files mentioned below will differ depending on the OS and install method. The paths below are from Homebrew-installed Apache on macOS.

```
# /usr/local/etc/httpd/httpd.conf
# Find and uncomment the lines below

LoadModule socache_shmcb_module lib/httpd/modules/mod_socache_shmcb.so
# ...
LoadModule ssl_module lib/httpd/modules/mod_ssl.so
# ...
Include /usr/local/etc/httpd/extra/httpd-ssl.conf
```

```
# /usr/local/etc/httpd/extra/httpd-ssl.conf

# Listen 8443
Listen 443
# ...

# Change the line below and comment out the two lines referenced below
# <VirtualHost _default_:8443>
<VirtualHost _default_:443>
# ...
# DocumentRoot "/usr/local/var/www"
# ServerName www.example.com:8443
```

```
# /usr/local/etc/httpd/extra/httpd-vhosts.conf

<VirtualHost *:443>
    # Make sure this path points to your local application.
    DocumentRoot "/path/to/application/root"
    ServerName localhost
    SSLEngine on
    SSLCertificateFile "/usr/local/etc/httpd/localhost.pem"
    SSLCertificateKeyFile "/usr/local/etc/httpd/localhost-key.pem"
</VirtualHost>
```

#### Nginx (for PHP)

#### WordPress

The WordPress documentation has some [specific considerations for running WordPress over HTTPS](https://make.wordpress.org/support/user-manual/web-publishing/https-for-wordpress/). Please see the Apache or nginx sections above for specifics on loading the certificates.
