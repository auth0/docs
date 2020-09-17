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
The idea is to run a webserver in front of your local development server that will accept https requests and forward them to your application's webserver over http, thus serving your application's requests over https by proxy. This is called an https reverse proxy and we can use an off the shelf product called [Caddy](https://caddyserver.com/v2) to create an https reverse proxy.

The process to do this is:

1. Download the Caddy binary
2. Run your application's webserver over http as normal
2. Run the Caddy binary as a reverse proxy telling it to forward traffic to your application's webserver
3. Visit the reverse proxy webserver over https

### 1. Download the Caddy binary 

Visit [https://caddyserver.com/download](https://caddyserver.com/download), select your platform and download the file to your computer. 

### 2. Run your application's webserver over http as normal 

Run your application as normal, for example at port `3000`

### 2. Run the Caddy binary as a reverse proxy telling it to forward traffic to your application's webserver

Find the location of your downloaded Caddy binary and run the following command to create a reverse proxy and forward requests from port `443` (the default port used for https) to your application's port (in this case `3000`):

```shell script
/path/to/caddy reverse-proxy --from localhost:443 --to localhost:3000
```articles/quickstart/webapp/express/01-login.md

### 3. Visit the reverse proxy webserver over https

Visit https://localhost and it will serve your application's requests over https

## Running your application behind a proxy

You may have to make some slight adjustments to you application when it is running behind a proxy.

For example in Express.js, although the app will not fail to run, it will incorrectly register the proxy’s IP address as the client IP address unless `trust proxy` is configured, see https://expressjs.com/en/guide/behind-proxies.html 
