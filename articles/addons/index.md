---
url: /addons
description: 
---

<style>
.addon {
  padding: 15px;
  /*border: 1px solid $gray-lighter;*/
}
.addon-content {
  text-align: center;
  min-height: 150px;
}
.addon-content:before {
  content: ' ';
  display: inline-block;
  vertical-align: middle;
  height: 90px;
}
.addon-image-wrap {
  display: inline-block;
  vertical-align: middle;
}
.addon-image-wrap img {
  max-height: 80px;
  max-width: 120px;
}
</style>

# Auth0 Client Addons

Addons are plugins associated with a Client in Auth0. Usually, they are 3rd party APIs used by the client that Auth0 generates access tokens for (e.g. Salesforce, Azure Service Bus, Azure Mobile Services, SAP, etc).

## Configure an Addon

### Select the Addon

<% if (account.clientId) { %>
Go to <a href="${manage_url}/#/applications/${account.clientId}/addons">Application Addons</a> page and select the add-on.
<% } else { %>
Go to <a href="${manage_url}/#/applications/">Application Addons</a> page and select the add-on.
<% } %>

![](/media/addons/manage-addons.png) 

### Setup

Each integration is different and requires different parameters and configuration. Once the addon is activated, you will see tailored instructions with details on how to integrate with it in the dashboard.

The key to this integration is the [/delegation endpoint](/auth-api#delegated) in Auth0. 

See the Delegation documentation to learn more about how to call this endpoint:

[Delegation Tokens](/tokens/delegation)

[Lock Android: Delegation API](/libraries/lock-android/delegation-api)

[Lock iOS: Delegation API](/libraries/lock-ios/delegation-api) 

## Additional Information for Specific Addons:

<% var clientAddons = cache.find('articles/addons/client-addons', {sort: 'index'}); %>
<%= include('./_addons', { addons: clientAddons }) %>

