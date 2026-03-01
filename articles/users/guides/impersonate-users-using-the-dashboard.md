---
description: Learn how to impersonate users using the Dashboard to view their information as they would see it. 
sitemap: false
topics:
    - users
    - user-management
    - user-profiles
contentType: how-to
useCase: manage-users
v2: true
---
# Impersonate Users Using the Dashboard

<%= include('../../_includes/_deprecate-impersonation') %>

You may need to impersonate other users for testing or troubleshooting purposes. You can:

* Log in to an app as a specific user.
* See everything exactly as that user sees it.
* Do everything exactly as that user does it.

Auth0 provides a __Sign in As__ feature for user impersonation, and provides the following features and information:

* Detailed auditing of who impersonated when.
* Restrictions on impersonation which allows you to reject an impersonated authentication transaction based on, for instance, corporate policies around privacy and sensitive data.
* Unlimited customization on who can impersonate who, when, depending on whatever context, using our [Rules](/rules) engine. In a Rule, you have access to `user.impersonated` (the impersonated login) and `user.impersonator` (the impersonating login) and you can write arbitrary Javascript to define how it works.

::: note
Any [Rules](/rules) that you have implemented will run when you impersonate a user, including any actions that update the user.
:::

::: panel Impersonation does not work with Authorization API
Impersonation **does not work** with the [API Authorization](/api-auth) features. This means that the `audience` parameter will be ignored, and the [Access Token](/tokens/concepts/overview-access-tokens) returned to applications when using this flow is only valid for requests to [the /userinfo endpoint](/api/authentication#get-user-info). 
:::

## Impersonation and Login CSRF attacks

To avoid [Login CSRF attacks](/protocols/oauth2/mitigate-csrf-attacks), the OAuth 2.0 specification recommends that applications use the **state** parameter to make sure that the response they receive matches the authentication request and originates from the same session.

However, applications that check for a valid **state** parameter will *not* work with Impersonation, since Impersonation works by sending authenticated responses to applications that never requested authentication. If you are building a single-page application where the authentication results are processed by Lock or Auth0.js, you can disable checking of **state** to allow Impersonation.

::: warning
Impersonation leaves your application vulnerable to CSRF attacks, since the flag allows the bypassing of the CSRF check from the [state parameter](/protocols/oauth2/oauth-state) if this parameter is missing from the authorization response. By using impersonation, you acknowledge that you understand and accept these risks.
:::

If you are using [Auth0.js](/libraries/auth0js), you have to update the **webAuth.parseHash** of the [library](/libraries/auth0js/v9#extract-the-authresult-and-get-user-info) and set the flag **__enableIdPInitiatedLogin** to `true`.

```javascript
var data = webAuth.parseHash(
  {
    ...
    __enableIdPInitiatedLogin: true
    ...
  }
```

If you're using [Lock](/lock), you can include the flag using the options parameter sent to the constructor.

```javascript
const lock = new Auth0Lock(clientID, domain, options)
```

Here's the flag itself:

```javascript
var options = {
    _enableIdPInitiatedLogin: true
};
```

Note that the **enableIdPInitiatedLogin** flag is preceded by **one** underscore when used with Lock and **two** underscores when used with the auth0.js library.

## Impersonate users using the Dashboard
1. Use the Dashboard to log in to your app as a user.

2. Navigate to the [Users](${manage_url}/#/users) page in the Auth0 Dashboard and select the user you want to log in as. Click on the __Sign in as User__ and select the application you want to log in to using the dropdown menu.

![Impersonate a User](/media/articles/user-profile/user2.png)

::: panel I can't see the button
Can't see the button? The following conditions are required for the button display:
- The applications registered in the tenant must have at least one callback URL listed.
- The applications must have the connections that the impersonated user belongs to turned on.
:::

A popup displays the URL to be used in order to impersonate the user. You can choose either to copy the URL into the clipboard (white button) or open it in a separate browser tab/window (blue button).

3. Copy the URL into the clipboard (white button) or open the URL in a separate browser tab/window (blue button).

![Impersonate a User](/media/articles/user-profile/user3.png)

::: panel Acquiring a token
Impersonating a user using the [Dashboard](${manage_url}) will not return an [ID Token](/tokens/concepts/id-tokens) to your application by default. There are two ways to achieve this. You can alter the **Response Type** setting in the impersonation menu's [Advanced Settings](#advanced-settings) from `Code` to `Token` (**Sign in as user** -> **Show Advanced Settings**). Alternatively, you can add `additionalParameters.scope: "openid"` to the request body while calling the [impersonation endpoint](/api/authentication/reference#impersonation) manually.
:::

### Advanced settings

When impersonating a user in Dashboard, after clicking **Sign in as User** you will see a link to expand "Advanced Settings."

![Advanced Settings](/media/articles/user-profile/impersonation-adv.png)

This reveals fields to make it easier to [Impersonate a User Using the Impersonation API](/users/guides/impersonate-users-using-the-impersonation-api):

- **Response mode**: `GET` or `POST`. This is only for server side apps, client side apps default to `GET`.
- **Response type**: `Code` or `Token`. This is only for server side apps, client side apps default to `Token`.
- **Scope**: This field will have `openid` in it is as default, [other scopes](/scopes) can be added as a list using whitespace as separator.
- **State**: The `state` is a required parameter and leaving it blank may lead to errors like `Impersonation - Bad mac`. For more information, see [State Parameter](/protocols/oauth2/oauth-state).

## Keep reading

* [User Profile Structure](/users/references/user-profile-structure)
* [Normalized User Profiles](/users/normalized)
* [Metadata Overview](/users/concepts/overview-user-metadata)
* [View Users](/users/guides/view-users)
