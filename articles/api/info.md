---
description: This page explains the basics of Auth0's Management and Authentication APIs.
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

Auth0 exposes two APIs for developers to consume in their applications:

* **Authentication**: Handles identity-related tasks;
* **Management**: Handles management of your Auth0 account, including functions related to (but not limited to):

    * Applications;
    * Connections;
    * Emails;
    * Users.

## Authentication API

The Authentication API exposes Auth0 identity functionality, as well as those of supported identity protocols (such as OpenID Connect, OAuth, and SAML). Typically, you consume this API through one of the Auth0 SDKs, such as [Auth0.js](/libraries/auth0js) or a library like [Lock](/libraries/lock). If you are building your authentication UI manually, you will need to interface directly with the Authentication API.

<div class="api-info-wrapper">
  <div class="block-links">
    <div class="api-info">
      <div class="row">
        <div class="col-md-6">
          <div class="wrapper-left">
            <a href="/auth-api" class="illustration i-apiexplorer"></a>
            <h4>API Explorer</h4>
            <p>Learn about and use the Auth0 Authentication API in the browser.</p>
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

The Management API allows you to manage every aspect of your Auth0 account. For example, you can use the Management API to automate the configuration of your user environments or for runtime tasks such as user creation.

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
            <p><a href="https://app.getpostman.com/run-collection/cc9e83969d9e70160054"><img src="https://run.pstmn.io/button.svg" alt="Run in Postman" /></a></p>
            <p><a href="/api/postman">How to use our Postman Collections</a></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

### Management API v1 - DEPRECATED

The Management API v1 is deprecated and should not be used for new projects. If your existing application uses Management API v1, refer to the [Management API v1 documentation](/api/management/v1).
