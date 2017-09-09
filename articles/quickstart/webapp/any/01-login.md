---
title: Login
default: true
description: This tutorial demonstrates how to integrate Auth0 authentication into any conventional server-based web application.
budicon: 
---

This guide explains in general terms how to integrate Auth0 authentication into a conventional server-based web app serving static HTML pages to the user. 

## Overview

This is how user authentiation happens between a conventional server-side web application and the Auth0 service. 

1. Your application redirects the user's browser to Auth0 `/authorize` endpoint, with a *redirect URI* in the query string.
2. The user logs in, using the Auth0 login form on that page.
3. Auth0 authenticates the user. 
    - Authentication is performed against the list of users provided by you to Auth0.
4. Auth0 redirects the user to your `redirect_uri`, with an *Authorization Code* in the querystring.
5. Your application calls the Auth0 /oauth/token endpoint with the Authorization Code, asking to exchange it with an access_token.
6. Auth0 authenticates the web app, validates the Authorization Code, and responds back with the token.
7. The web application decodes and verifies the token, which confirms the user's identity.
8. Your application uses sessions or cookies to persist a user login.

## Register Your App as a Client

Go to the [Clients](${manage_url}/#/clients) page from the [Auth0 Dashboard](${manage_url}). Edit the default client or create a new client by clicking **Create Client**.

Name your new application, and set the Client Type to **Regular Web Applications** as the **Client Type**.

### Set Allowed Callback URI

When your app redirects a user to Auth0, the querystring will include a callback URI. After authentication completes, the user will be redirected to this URI.

${include('../_callbackRegularWebApp')}

While you are editing your Client settings, update your Allowed Callbacks list to include the redirect URI you plan to use.

### Enable OIDC Conformance

Before you leave Client Setting, click on **Show Advanced Settings**. Go to the **OAuth** tab and make sure tha the **OIDC Conformant** switch is enabled.

Save your settings.

## Add Users

Before users can login, you need to [add some registered users](/user-profile).

## Create a Log In Link

Your users will log in to your site using the Auth0 authentication portal at the URI `https://${account.namespace}/authorize`.

To facilitate this, you will provide a link from your site with the following query parameters:

| Parameter | Value |
|:----------|:---------|
| response_type | `code` |
| scope | `openid` |
| redirect_uri | The URI that the user will be redirected to after authentication (`${account.callback}`)|
