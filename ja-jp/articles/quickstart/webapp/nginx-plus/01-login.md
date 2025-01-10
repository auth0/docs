---
title: Login
default: true
description: This tutorial demonstrates how to use the `nginx-openid-connect` module to add authentication and authorization to your NGINX server.
budicon: 448
topics:
  - quickstarts
  - webapp
  - nginx
  - nginx+
  - nginx plus
  - login
contentType: tutorial
useCase: quickstart
---

::: panel System Requirements
This tutorial and seed project have been tested with the following:
* NGINX Plus R24
:::

**Please follow the steps below to configure your application using [NGINX Plus](https://www.nginx.com/products/nginx/) to work with Auth0 and Open ID Connect.**

## Install and Enable `nginx-plus-module-njs` Module

First, you need to install the nginx-plus-module-njs module for NGINX Plus. Follow the [dynamic module installation guide](https://www.nginx.com/products/nginx/dynamic-modules/) to install packages in your host OS. 
For Linux distributions that use `yum` package manager install as follows:

```bash
sudo yum install nginx-plus-module-njs jq
```

Once you've installed it, you need to enable it for NGINX by adding the following line near the top of your `/etc/nginx/nginx.conf` file:

${snippet(meta.snippets.module)}

## Checkout `nginx-openid-connect` Template Repository
Clone [`nginx-openid-connect` GitHub repository](https://github.com/nginxinc/nginx-openid-connect). This repository comes with a template configuration.

```bash
git clone https://github.com/nginxinc/nginx-openid-connect
```

## Configure with Your Auth0 Application Information
Run the `configure.sh` script inside nginx-openid-connect folder to populate template configuration for your Auth0 application:

${snippet(meta.snippets.setup)}

Next, add your tenant’s logout URL to `openid_connect_configuration.conf` file

${snippet(meta.snippets.logout)}

## Set Accept-Encoding Type for Token and JWKS Endpoints

Add `Accept-Encoding` header in `openid_connect.server_conf`

${snippet(meta.snippets.token)}

## Copy OpenID Connect Config Files to NGINX Server

You need to copy four files to the config folder of NGINX server machine

```bash
sudo cp openid_connect.js \ 
   frontend.conf \
   openid_connect_configuration.conf \
   openid_connect.server_conf /etc/nginx/conf.d
```
        
## Configuring Auth0 Settings

In your application settings add a new "Allowed Callback URLs" that is equal to `https://server-fqdn/_codexch`.

Then, change "Token Endpoint Authentication Method" to "None" in Auth0 for your Application. This is required for PKCE authorisation code flow.

## Passing Headers to Upstream Application
Edit `/etc/nginx/conf.d/frontend.conf` and add additional headers from `id_token` to the upstream target:

${snippet(meta.snippets.use)}
