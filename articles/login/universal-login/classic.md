---
description: Classic Universal Login Experience
topics:
  - login
  - universal-login
contentType: index
---
# Classic Universal Login Experience

Auth0's Classic <dfn data-key="universal-login">Universal Login</dfn> experience is built on top of Auth0's JavaScript libraries <dfn data-key="lock">([Lock.js](/libraries/lock)</dfn>, [auth0.js](/libraries/auth0js), MFA Widget, Password Reset). Compared to the New Universal Login experience, it currently offers a more complete feature set.

When you [customize the HTML](${manage_url}/#/login_page) for Universal Login pages, the default templates will also use the same JavaScript libraries, so from a UX and functional perspective, the transition between the default user interface and a custom one is more natural.  

Given that it is being used by a significant percentage of Auth0 customers, the Classic Universal Login Experience will be maintained for the foreseeable future. However, the majority of significant new feature development will be done on the [New Universal Login Experience](/universal-login/new).

## Implement Universal Login

In addition to configuring Universal Login for your tenant's applications, you will also need to complete a few other steps:

1. Set up a connection(s) in the [Dashboard](${manage_url}) (Choose **Connections** in the Dashboard's sidebar, then choose a type and pick one to configure, such as a database or a social login provider). 
1. Set up your application in the [Dashboard](${manage_url}/#/applications). 
1. Configure your application's code to call Auth0's [`/authorize`](/api/authentication#login) endpoint in order to trigger Universal Login, and then to deal with the response. You can either do this directly, or use one of our SDKs to make the process easier.

For step by step instructions on setting up your application to use Universal Login, check out our [Quickstart guides](/quickstarts).
