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

## Auth0 Client Addons

Addons are plugins associated with a Client in Auth0. Usually, they are 3rd party APIs used by the client that Auth0 generates access tokens for (e.g. Salesforce, Azure Service Bus, Azure Mobile Services, SAP, etc).

Here are the general steps to configuring an Auth0 addon:

### 1. Select the Addon

<% if (account.clientId) { %>
Go to <a href="${manage_url}/#/applications/${account.clientId}/addons">Application Addons</a> page and select the add-on.
<% } else { %>
Go to <a href="${manage_url}/#/applications/">Application Addons</a> page and select the add-on.
<% } %>

![](/media/articles/server-apis/addons.png)

Each integration is different and requires different parameters and configuration. Once the addon is activated, you will see tailored instructions with details on how to integrate with it.

### 2. Use it

The key to this integration is the Delegation endpoint in Auth0. Check the documentation of any of our FrontEnd or Mobile SDKs to learn how to call [this endpoint](/auth-api#delegated). You can download your favorite library from any of the [Quickstarts](/).

### 3. You are done!

Congrats! You've implemented Delegation for the your addon. 

## Additional Information for Specific Addons

<% var clientAddons = cache.find('articles/addons/client-addons', {sort: 'index'}); %>
<%= include('./_addons', { addons: clientAddons }) %>

