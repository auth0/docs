---
description: Explains the basics of creating and using Auth0 Clients.
---

# Clients

An Auth0 **client** allows your application to utilize Auth0 for authentication. A fully-configured authentication process will consist of an Auth0 client that possesses information about and is able to communicate with your application (which, conversely, possesses information about and is able to communicate with the Auth0 client.)

A client is a core Auth0 concept, so it's important to know how they:

1. Relate to your applications;
2. Impact auditing, authorization, and so on.

## Client Settings

![](/media/articles/applications/applications-callback-settings.png)

When you configure your Auth0 client, you will be asked for or provided (as indicated by a grayed out text box) the following pieces of information:

* **Name**: the name of your client (which you'll see in the portal, emails, logs, and so on);
* **Domain**: the domain name of your client;
* **Client ID**: the unique identifier for your client (this is the ID you'll use with when configuring authentication with Auth0). By default, the  is hidden, so check the **Reveal Client Secret** box to see this value;
* **Client Secret**: the key used to sign and validate tokens for authentication flows and to gain access to select Auth0 API endpoints;
* **Client Type**: the type of client you are implementing (depending on which you choose, the settings available differ);
* **Token Endpoint Authentication Method**: the requested authentication method for the token endpoint: `None` (public client without a client secret), `Post` (client uses HTTP POST parameters), or `Basic` (client uses HTTP Basic parameters);
* **Allowed Callback URLs**: the URLs of your application(s) to which Auth0 can redirect the user after authentication.
* **Allowed Logout URLs**: the URLs that Auth0 can redirect your users to after logging out;
* **Allowed Origins (CORS)**: the URLs of the applications running your JavaScript code (prevents same-origin policy errors when using Auth0 from within a web browser)
* **JWT Expiration (Seconds)**: the amount of time before the Auth0 access tokens expires
* **Use Auth0 instead of the IdP to do Single Sign On**: if enabled, this setting prevents Auth0 from redirecting authenticated users with valid sessions to the identity provider (such as Facebook, ADFS, and so on)

## Addons

![](/media/articles/applications/applications-addon-types.png)

Addons are extensions associated with clients. They are typically third-party APIs used by the application(s) for which Auth0 generates access tokens. Some typical scenarios used include:

* **Accessing External APIs**: Using the Delegation endpoint, you can exchange a Client's access token for a third-party service's (such as Salesforce or Amazon) access token
* **Integrating with Applications Using SAML2/WS-Federation**: Addons allow you to integrate with any custom or SSO integration that does not currently enjoy built-in Auth0 support, since they allow you to configure every aspect of the SAML2/WS-Federation integration.

![](/media/articles/applications/applications-sso-integrations-overview.png)

## Connections

![](/media/articles/applications/applications-connections-example.png)

At the Client level, you can choose which Connections, or sources of users, are enabled for a given client. This is useful if you are building different applications for different audiences. For example, you might build a timesheet application that can only be used by employees in addition to a customer-facing application. The former might require only Active Directory authentication, while the latter might support authentication using Google, Facebook, and so on.

Connections may be shared among multiple clients.

## Rules

![](/media/articles/applications/rules-flow.png)

[Rules](/rules) are code snippets written in JavaScript that are executed as part of the Auth0 authentication process. This happens every time a user authenticates. Rules enable very powerful customizations and extensions to be easily added to Auth0.

Rules enable powerful customizations and allow extensions to be easily added to Auth0.

Within the context of a rule, we have access to the Client the user is authenticating to, which is useful if we want to apply coarse-grained authorization policies for our applications:

* Only HR officials can access Application X
* Only US-based users can access Application Y

Here's a [sample rule](https://github.com/auth0/rules/blob/master/rules/simple-user-whitelist-for-app.md) where only the users in the whitelist are allowed to access the application:

```js
function (user, context, callback) {
    //applies to NameOfTheAppWithWhiteList & bypassese for every other app
    if(context.clientName !== 'NameOfTheAppWithWhiteList'){
      return callback(null, user, context);
    }

    var whitelist = [ 'user1@mail.com', 'user2@mail.com' ]; //authorized users
    var userHasAccess = whitelist.some(
      function (email) {
        return email === user.email;
      });

    if (!userHasAccess) {
      return callback(new UnauthorizedError('Access denied.'));
    }

    callback(null, user, context);
}
```

## Auditing

![](/media/articles/applications/applications-logs-auditing.png)

The logs include many of the actions performed by the user:

* Logging in to a Client;
* Failing to log in to a Client;
* Signing up;
* Requesting a password change;

You can download the event logs using the [Management API](/api/management/v2#!/Logs/get_logs) or view them via the [Management Dashboard](${manage_url}/#/logs)

While the [Management Dashboard](${manage_url}/#/logs) displays the log data in a neatly formatted manner, clicking on the row corresponding to a particular event displays the raw data, which looks something like this:

```json
{
  "date": "2016-10-04T15:27:38.509Z",
  "type": "f",
  "description": "Invalid thumbprint (configured: 634AB4651FCA2F623563BE32EDA32DE565219118. calculated: BDEBFBFBA786C2D97F2125274793E32643358E81)",
  "connection": "SSOCircle",
  "connection_id": "con_T60D5poVozRmw77h",
  "client_id": "UEsQCe4RVHYDSQ2zlLWIAHSqDhpsYyTG",
  "client_name": "N/A",
  "ip": "108.248.62.158",
  "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36",
  "strategy": "samlp",
  "strategy_type": "enterprise"
}
```

### Sample User Count Calculation

Let's say that we have 3 active social users for the month of February:

![](/media/articles/applications/applications-single-app-active-users.png)

In the following month, John and Mary start using the company's collaboration application. This means that they'll become active users for this second application. All together, this means that there are a total of 5 active social users for the month of March:

 * Todo List: 3 active users
 * Collaboration Application: 2 active users

![](/media/articles/applications/applications-multi-app-active-users.png)

## Sample Clients

The following are high-level overviews of sample Clients using a variety of technologies.

> One client is comprised of an ID-secret pair. If multiple clients (for example, one runs on iOS and one runs on Android) share the same Client ID-secret pair, Auth0 considers them to be a single Client.

### Regular Web Application

![](/media/articles/applications/applications-traditional.png)

For a regular web application, all you need to do is create a new Client in Auth0.

### Mobile Clients, a Single Page Application, and an REST API

![](/media/articles/applications/applications-multiple-single-logical.png)

This example is a timesheet application that utilizes:

* A REST API;
* A Single Page Application (SPA) hosted on a server different from the one hosting the REST API;
* Mobile apps capable of running on several types of devices.

From a technical standpoint, the above comprises at least three Clients, due to their differing language, deployment model, and so on. However, for Auth0, this is **one** Client application that shares an ID-secret pair.

Doing so simplifies logging/auditing and allows for reuse of Connections across the different Clients implemented.

### Multiple Services and APIs

![](/media/articles/applications/applications-complex-same-app.png)

This is a decomposed Clients with several APIs and services. Depending on the requirements, this might be one or more Client(s) in Auth0. While it is easiest to implement such a scenario as one Client, note that:

 * With a single token, you'll be able to access all APIs;
 * The logs will show only that a user has accessed the *Fabrikam Enterprise Portal*, because Auth0 will not be able to distinguish between the various APIs used;
 * You won't be able to write [rules](/rules) to control the flow between the Clients.

Now on the other hand, you could create different applications for the enterprise portal and the backing services. This will allow us to identify the different APIs and services giving you:

However, implementing this using multiple Clients allows for identification of the different APIs and services used, which means that you now have:

 * Better auditing;
 * The ability to apply fine-grain authorization for Cpplications through rules (for example, you can limit access to the Invoices API to those in Finance);
 * The ability to control the flow of your Clients (for example, you could configure the Invoices API so that it can only be called by the Documents API.

Note that users interacting with the different APIs results in a higher active user count.

![](/media/articles/applications/applications-complex-different.png)

### Custom Domain Names

The public, multi-tenant cloud service version of Auth0 supports a domain name based off of `auth0.com`. Auth0 assigns Clients deployed using this service a domain name in one of the two formats:

* `{account-name}.auth0.com`;
* `{account-name}.{location}.auth0.com`.

For example, if your company is **My Company**, you would receive some or all the following addresses:

```
mycompany.auth0.com
mycompany.eu.auth0.com
mycompany.au.auth0.com
```

> With the Auth0 public cloud service, the `*.auth0.com` endpoints are only used for authentication and the API, *not* user access to your Client.

You may choose to use a custom domain name that obscures the Auth0 reference, such as `mycompany.com`. Using a custom domain name requires a *single-tenant* implementation of Auth0, which can be deployed in one of three locations:

* The Auth0-managed cloud;
* A customer-managed cloud;
* An on-premise installation.

Due to the additional features offered by these three options, these deployment options do come with a higher cost.

If you are unable to use a multi-tenant cloud service due to compliance or other policy requirements, please take a look at [the Auth0 appliance](/appliance).
