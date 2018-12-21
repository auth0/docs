---
description: Understand scopes used with APIs.
topics:
  - scopes
contentType:
  - how-to
  - concept
useCase:
  - development
  - call-api
  - secure-api
---
# API Scopes

## Scopes for API developers

As an [API](/apis) developer, you need to define the scopes available for applications that might call your API. This way, you can apply fine-grained control to the information and actions available to your users. In this case, you need to define custom scopes for your API and then identify these scopes so that calling applications can use them.

For example, let's say you are building an API that provides data to a calendar application. You want some users to be able to edit items on the calendar, others to only be able to read them, and others to be able to both read and write to calendar items. To do this, you create two scopes for your API: one that authorizes write access (`write:appointments`) and one that authorizes read-only access (`read:appointments`). 

Now, when an app calls your API, it will specify the scope it needs in its request. The app may request read access by including `read:appointments` in its scope, write access by including `write:appointments` in its scope, or both read and write access by including both `read:appointments` and `write:appointments` in its scope.

For an example showing how to request custom API access for your application, see [Sample Use Cases: Scopes](/scopes/current/sample-use-cases).









## Define scopes using the Dashboard

::: warning
By default, any user of any application can ask for any scope defined here. You can implement access policies to limit this behavior via [Rules](/rules).
:::

You can define API scopes using the [Dashboard](${manage_url}/#/apis). Select the API you want to edit, and open up its **Scopes** tab.

Provide the following parameters:

| Parameter | Description |
| - | - |
| Name | The name of your scope |
| Description | A friendly description for your scope |

Click **Add** when you've provided the requested values.

![API Scopes](/media/articles/scopes/api-scopes.png)

## Limiting API scopes being issued

An application can request any scope and the user will be prompted to approve those scopes during the authorization flow. This may not be a desirable situation, as you may want to limit the scopes based on, for example, the permissions (or role) of a user.

You can make use of the [Authorization Extension](/extensions/authorization-extension) in conjunction with a custom [Rule](/rules) to ensure that scopes are granted based on the permissions of a user.

This approach is discussed in more depth in some of our [Architecture Scenarios](/architecture-scenarios). Specifically, you can review the entire [Configure the Authorization Extension](/architecture-scenarios/spa-api/part-2#configure-the-authorization-extension) section of our SPA+API Architecture Scenario which demonstrates how to configure the Authorization Extension, and also create a custom Rule which will ensure scopes are granted based on the permissions of a user.

## Consent dialog

By default, the user consent page groups scopes for the same resource and displays all actions for that resource in a single line. For example, let's say you have an API defined with the following scopes:

* `read:messages`: Be able to read your email messages
* `write:messages`: Write messages

The consent page would display: **Messages: read and write your messages**.

However, you can set your tenant's **use_scope_descriptions_for_consent** flag to **true** to have the consent page display the **Description** field instead. This affects consent prompts for all APIs on the tenant.

With this flag enabled, the consent page would display: **Be able to read your email messages**, **Write messages**.

To set the **use_scope_descriptions_for_consent** flag, you will need to make the following call to the API:

```har
{
  "method": "PATCH",
  "url": "https://${account.namespace}/api/v2/tenants/settings",
  "headers": [
    { "name": "Content-Type", "value": "application/json" },
    { "name": "Authorization", "value": "Bearer API_ACCESS_TOKEN" },
    { "name": "Cache-Control", "value": "no-cache" }
  ],
  "postData": {
      "mimeType": "application/json",
      "text" : "{ \"flags\": { \"use_scope_descriptions_for_consent\": true } }"
  }
}
```
