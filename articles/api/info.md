---
title: Auth0 APIs
description: Learn about Auth0's Management and Authentication APIs.
section: apis
crews: crew-2
topics:
    - management-api
    - authorization-api
    - apis
contentType: reference
useCase: invoke-api
---
# Auth0 APIs

Auth0 exposes the following APIs for developers to consume in their applications.

## Authentication API

The Authentication API exposes identity functionality for Auth0 and supported identity protocols (including <dfn data-key="openid">OpenID Connect</dfn>, OAuth, and <dfn data-key="security-assertion-markup-language">SAML</dfn>). 

Typically, you should consume this API through one of the Auth0 SDKs, such as [Auth0.js](/libraries/auth0js), or a library like [Lock](/libraries/lock). However, if you are building your authentication UI manually, you will need to call the Authentication API directly.

Some example tasks include:

* getting [tokens](/tokens) during authentication
* requesting a user's profile using an [Access Token](/tokens/concepts/access-tokens)
* exchanging [Refresh Tokens](/tokens/concepts/refresh-tokens) for new Access Tokens
* requesting a challenge for [multi-factor authentication (MFA)](/multifactor-authentication)

<div class="api-info-wrapper">
  <div class="block-links">
    <div class="api-info">
      <div class="row">
        <div class="col-md-6">
          <div class="wrapper-left">
            <a href="/auth-api" class="illustration i-apiexplorer"></a>
            <h4>API Explorer</h4>
            <p>Explore the requests and responses for Auth0 Authentication API endpoints in your browser.</p>
            <p><a href="/auth-api">Open API Explorer</a></p>
          </div>
        </div>
        <div class="col-md-6">
          <div class="wrapper-right">
            <span href="#" class="illustration i-postman"></span>
            <h4>Postman</h4>
            <p>Try the Auth0 Authentication API in Postman.</p>
            <p><a href="https://app.getpostman.com/run-collection/90d43da958b7e910ff1a"><img src="https://run.pstmn.io/button.svg" alt="Run in Postman" /></a></p>
            <p><a href="/api/postman">How to use our Postman Collections</a></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

## Management API v2

The Management API allows you to manage your Auth0 account programmatically, so you can automate configuration of your environment. Most of the tasks you can perform in the Auth0 Management Dashboard can also be performed programmatically by using this API.

Some example tasks include:

* registering your applications and APIs with Auth0
* setting up [connections](/connections) with which your users can authenticate
* [managing users](/users)
* [linking user accounts](/users/guides/link-user-accounts)

<div class="api-info-wrapper">
  <div class="block-links">
    <div class="api-info">
      <div class="row">
        <div class="col-md-6">
          <div class="wrapper-left">
            <a href="/api/v2" class="illustration i-apiexplorer"></a>
            <h4>API Explorer</h4>
            <p>Learn about and use the Auth0 Management API in the browser.</p>
            <p><a href="/api/v2">Open API Explorer</a></p>
          </div>
        </div>
        <div class="col-md-6">
          <div class="wrapper-right">
            <span href="#" class="illustration i-postman"></span>
            <h4>Postman</h4>
            <p>Try the Auth0 Management API in Postman.</p>
            <p><a href="https://app.getpostman.com/run-collection/b98c6e2ef2ba7ff59fe5"><img src="https://run.pstmn.io/button.svg" alt="Run in Postman" /></a></p>
            <p><a href="/api/postman">How to use our Postman Collections</a></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

### Management API v1 - DEPRECATED

The Management API v1 is deprecated and should not be used for new projects. If your existing application uses Management API v1, please see the [Management API v1 documentation](/api/management/v1).
