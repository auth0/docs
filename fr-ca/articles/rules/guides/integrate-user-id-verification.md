---
title: Integrate User ID Verification Services Using Rules
description: Learn how to integrate third-party user identity verification services using rules.  
topics:
  - rules
  - extensibility
  - identity-providers
contentType: reference
useCase: extensibility-rules
---

# Integrate User ID Verification Services Using Rules

Auth0 allows integration with third-party vendors that offer identity verification. Such integration can be done by either connecting the third-party vendor as a federated identity provider using either a [custom OIDC Connection](/connections/enterprise/oidc) or the [SAML protocol](/saml), or by using [Auth0 Rules](/rules).

In this example, you will integrate with OnFido, a third-party vendor providing Document ID and Facial Biometrics Verification, using a [redirect rule](/rules/guides/redirect) in Auth0.

## Prerequisites

Before connecting your Auth0 app to OnFido, you must [sign up for and configure your account with OnFido](https://onfido.com/us/).

## User ID verification login experience

The authentication flow contains the following steps:

1. An app initiates an authentication request to Auth0.
2. Auth0 routes the request to an Identity Provider through a configured connection.
3. The user authenticates successfully.
4. The [ID Token](/tokens/concepts/id-tokens) and/or <dfn data-key="access-token">Access Token</dfn> is passed through the Rules pipeline, then sent to the app.

The user will see the following screens when the third-party verification service is part of the authentication flow.

The user chooses to login with Google. 

![OnFido Verification Login Screen](/media/articles/rules/onfido-verification-login1.png)

The login process then prompts the user to select a document to use to verify their identity.

![OnFido Verify Identity](/media/articles/rules/onfido-verify-identity.png)

After the user performs the steps to verify their identity, uploading documents and/or images, the verification service determines if the credentials are valid and then continues.

![OnFido Verify Success](/media/articles/rules/onfido-verify-success.png)

## Metadata example

The information of the OnFido verification is then stored in a [user’s app metadata](/users/concepts/overview-user-metadata) within the Auth0 user profile.

![OnFido Metadata Example](/media/articles/rules/onfido-metadata-example.png)

## Keep reading

* [Progressive Profiling](/users/concepts/overview-progressive-profiling)
* [Redirect Users After Login Authentication](/users/guides/redirect-users-after-login)
* [Redirect Users After Logout](/logout/guides/redirect-users-after-logout)
* [Redirect Rule Best Practices](/best-practices/rules#redirection)
