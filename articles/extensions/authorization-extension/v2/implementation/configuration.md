---
title: Configuring the Authorization Extension
description: How to configure the Authorization Extension
toc: true
---

# Authorization Extension: Configuration

Before the extension can enforce your authorization logic, you'll need to configure how it will behave during the login transaction. Your configuration settings will be captured in a [rule](/rules) that's executed during runtime.

## Configure the Extension

Open up the Authorization Extension, and click **Configuration** on the drop-down menu in the top right of the **Authorization Dashboard**.

![Click Configuration](/media/articles/extensions/authorization/click-configuration.png)

This brings you to the **Rule Configuration** section of the **Configuration** page.

![Configuration page](/media/articles/extensions/authorization/configuration.png)

## Token Contents

You can store authorization data like groups, roles, or permissions in the outgoing token issued by Auth0. Your application can then consume this information by inspecting the token and take appropriate actions based on the user's current authorization context.

::: warning
Storing too much data in the token may cause performance issues or even prevent the issuance of the token. Be sure to store only what you need. If you need a large amount of user-data readily available, consider using [persistence](#persistence) instead of adding the data to the token.
:::

To add groups, roles, and/or permissions information to the outgoing token, simply enable the slider next to the option you want included.

![Set token contents](/user-info.png)

### Passthroughs

You might have users that receive groups, roles, or permissions from the identity provider you're using, such as Active Directory. If you want to merge these items (to preserve them) with the ones defined in the Authorization Extension, make sure you enable the appropriate Passthrough options. Simply enable the slider next to the appropriate merges you want enabled.

![Enable passthroughs](/passthrough.png)

### Persistence

In addition to storing the authorization context in the token, you can choose to persist groups, roles, or permissions information in the user profile. This is useful if your authorization context is large (for example, the user might belong to many groups or have been granted many permissions). 

The data will be stored in the user's `app_metadata` field, and you can then use the [Management API](/api/management/v2) or the Authentication API's [User Profile endpoint](/api/authentication#user-profile) to retrieve this information after the user has logged in.

![Enable persistence](/persistence.png)

## Publish the Authorization Extension Rule

Once you've set the token contents and enabled passthrough or persistence, click **Publish Rule**. This captures your settings into a rule that's executed during login.

## Custom Claims

If you'd like to add custom claims to your tokens, you'll need to create a [rule](/rules) that allows the Authorization Extension to do so.

::: warning
If you're using [OIDC-Conformant Authentication](/api-auth/intro), the custom attributes added to the token by the Authorization Extension won't be added to the user's `id_token`.
:::

```js
function (user, context, callback) {
  var namespace = 'http://yourdomain/claims/'; // You can set your own namespace, but do not use an Auth0 domain

  // Add the namespaced tokens. Remove any which is not necessary for your scenario
  context.idToken[namespace + "permissions"] = user.permissions;
  context.idToken[namespace + "groups"] = user.groups;
  context.idToken[namespace + "roles"] = user.roles;
  
  callback(null, user, context);
}
```

This rule must run **after** the Authorization Extension rule. To make sure this happens, make sure that you place it below the Authorization Extension rule.

::: note
When calling the `/authorize` endpoint or configuring Lock, you'll need to specify the information you want in the `scope` by indicating `groups`, `permissions` and/or `roles`.
:::

<%= include('./_stepnav', {
 prev: ["Install the Extension", "/extensions/authorization-extension/v2/implementation/install"],
 next: ["Setup the Extension", "/extensions/authorization-extension/v2/implementation/setup"]
}) %>