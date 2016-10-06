---
description: Explains the basics of creating and using Auth0 Clients.
---

# Core Concepts: Clients

A **client** is an Auth0 core concept, so it's important to know how:

1. They relate to your applications;
2. They impact auditing, authorization, billing, and so on.

> Depending on the technologies you use, a client may also be referred to as an **application** or a **relying party**.

## Clients in Auth0

Let's start by looking at how clients are represented in Auth0 and how this relates to other core concepts like Connections and Rules.

### Settings

![](/media/articles/applications/applications-callback-settings.png)

The client's settings contain the following information:

* **Name**: the name of your client (which you'll see in the portal, emails, logs, and so on)
* **Domain**: the domain name of your client
* **Client ID**: the unique identifier for your client (this is the ID you'll use with when configuring authentication with Auth0)
* **Client Secret**: the key used to sign and validate tokens for authentication flows and to gain access to select Auth0 API endpoints;
* **Allowed Callback URLs**: the URLs of your application(s) to which Auth0 can redirect the user after authentication.
* **Allowed Origins (CORS)**: the URLs of the applications running your JavaScript code (prevents same-origin policy errors when using Auth0 from within a web browser)
* **JWT Expiration**: the amount of time remaining (in seconds) before the Auth0 access tokens expires
* **Use Auth0 instead of the IdP to do Single Sign On**: if enabled, this setting prevents Auth0 from redirecting authenticated users with valid sessions to the identity provider (such as Facebook, ADFS, and so on)

### Addons

![](/media/articles/applications/applications-addon-types.png)

Addons are extensions associated with clients and are typically used in the following scenarios:

* **Accessing External APIs**: Using the Delegation endpoint, you can exchange a Client's access token for a third-party service's (such as Salesforce or Amazon) access token
* **Integrating with Applications Using SAML2/WS-Federation**: Addons allow you to integrate with any custom or SSO integration that does not currently enjoy built-in Auth0 support, since they allow you to configure every aspect of the SAML2/WS-Federation integration.

![](/media/articles/applications/applications-sso-integrations-overview.png)

### Connections

![](/media/articles/applications/applications-connections-example.png)

At the Client level, you can choose which Connections are enabled for a given client. This is useful if you are building different applications for different audiences. For example, you might build a timesheet application that can only be used by employees in addition to a customer-facing application. The former might require only Active Directory authentication, while the latter might support authentication using Google, Facebook, and so on.

### Rules

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

### Auditing

![](/media/articles/applications/applications-logs-auditing.png)

Whenever a user logs in to a client application, a login fails, a user signs up, a password change is requested, ... these events are logged and can be downloaded using the API or can be accessed in the dashboard. These events contain information about the user (test@auth0.com), the connection (Username-Password-Authentication), the client (Default App) and in addition to that we also keep track of the date and time this event occured, the IP address of the user, the user agent (browser information) and the number of times the user logged in.

### Cost

The [pricing model](https://auth0.com/pricing) is based on the type of identity providers you're using, together with the number of active users and any additional features that have been enabled. Active users are users that authenticated in the last 30 days for **a given application**. We define a client as a client id and client secret pair, if multiple clients (say one on iOS and one on Android) share the same client id and client secret pair, they are a single client in this definition.

In the following example we have 3 active social users for the month of February:

![](/media/articles/applications/applications-single-app-active-users.png)

Next month John and Mary start using the company's collaboration application which means they'll also become active users for this second application. Which means that we'll have 5 active social users for the month of March:

 * Todo List: 3 active users
 * Collaboration Application: 2 active users

![](/media/articles/applications/applications-multi-app-active-users.png)

## Client Examples

### Regular Web Application

![](/media/articles/applications/applications-traditional.png)

For your regular web application you'll simply create a new application in Auth0.

### Mobile + Single Page Application + REST API

![](/media/articles/applications/applications-multiple-single-logical.png)

This example is an Timesheet application with a REST API hosted on one server, a Single Page application hosted on a different server and a few mobile apps running on different types of devices. From a technical point of view these are 5 applications (different language, deployment model, ...) but for Auth0 this is one and the same client application. There's no need to create different applications because we don't want separate auditing (we just want to know who interacted with the REST api), we want to use the same connections in the different client applications, ...

### Multiple Services and APIs

![](/media/articles/applications/applications-complex-same-app.png)

Here is an example of a decomposed client application with several APIs and services. Depending on the requirements this might just be one application in Auth0. This is the easiest to implement but keep in mind that:

 * With a single token you'll be able to access all APIs
 * The logs will show that a user has accessed the "Fabrikam Enterprise Portal" because we won't be able to make a distinction between APIs
 * It won't be possible to write rules to control the flow between the applications

Now on the other hand, you could create different applications for the enterprise portal and the backing services. This will allow us to identify the different APIs and services giving you:

 * Better auditing (you'll be able to see who accessed which service)
 * The ability to apply fine-grained authorization for applications through rules (eg: only finance can access the invoices API)
 * Support to control the flow of your application (eg: the Documents API is the only API that can call the Invoices API)

Keep in mind that users calling out to the different APIs will count as additional active users because they will be spanning multiple applications. Choosing between one application and different application will be a functionality vs. cost tradeoff.

![](/media/articles/applications/applications-complex-different.png)

### Custom domain names

The public, multi-tenant cloud service version of Auth0 supports a domain name of `auth0.com`.  Applications deployed in this service will use a domain name of `{account-name}.auth0.com` or `{account-name}.{location}.auth0.com`.

For example:

```
mycompany.auth0.com
mycompany.eu.auth0.com
mycompany.au.auth0.com
```

Note that with the public cloud service, the `*.auth0.com` endpoints are only used for authentication and the API, not your client.

It is possible to have a custom domain name, which completely hides the Auth0 name, such as `mycompany.com`.  Use of a custom domain name requires a single-tenant version of Auth0, which can be deployed in either an Auth0-managed cloud, a customer-managed cloud, or an on-premise installation.  These three deployment options do have a higher cost, due to the extra administrative work to manage them, compared to the public cloud.

If you cannot use a multi-tenant cloud service because of compliance or other policy requirements, please take a look at [the Auth0 appliance](/appliance).
