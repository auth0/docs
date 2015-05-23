# Core Concepts: Applications

An application is one of the core concepts in Auth0, which is why it's important to know how this relates to your applications and the impact this will have on auditing, authorization, billing, ...

> Depending on the concepts or technologies you're working with, an application might also be referred to as a **client** or a **relying party**.

## Applications in Auth0

Let's start by looking at how applications are represented in Auth0 and how this relates to other core concepts like Connections and Rules.

### Settings

![](../media/articles/applications/applications-callback-settings.png)

The application's settings contain the following information:

- **Name of the application**: Canonical name of your application which you'll see in the portal, emails, logs, ...
- **Client ID (read-only)**: This is the unique identifier for your application. This is the ID you'll use in your application when setting up authentication with Auth0.
- **Client Secret**: This secret will be used to sign and validate tokens which will be used in the different authentication flows. With this key your application will also be able to authenticate to some of the API endpoints (eg: to get an access token from an authorization code).
- **Allowed Callback Urls**: One or more urls of your application to which Auth0 can redirect after the user has authenticated.
- **Allowed Origins (CORS)**: If you want to use the Auth0 API from within the browser you'll need to add the urls of the applications running your javascript code to prevent Same-origin policy errors.
- **JWT Expiration**: The expiration in seconds of the access tokens that will be handed out by Auth0.
- **Use Auth0 instead of the IdP to do Single Sign On**: If this option is enabled Auth0 won't need to redirect users to the identity provider (Facebook, ADFS, ...) if the user has authenticated before and hasn't logged out or his session hasn't expired.

### Addons

![](../media/articles/applications/applications-addon-types.png)

Addons are extensions associated with applications and are typically used in 2 different scenarios:

* **Accessing external APIs**: using the delegation endpoint an access token for the application can be exchanged for an access token to a third party service (like [Salesforce](server-apis/salesforce), Amazon, Azure, Firebase, ...).
* **Integrating with applications using SAML2/WS-Federation**: enables authentication through Auth0 for applications that support SAML2/WS-Federation like Dropbox, SharePoint, ... The most popular SaaS applications with SAML support are already covered as recipes that will automatically configure the SAML2/WS-Federation addon (in the dashboard under [Third-party applications](https://manage.auth0.com/#/externalapps)). By enabling the addon for an application you can configure every aspect of the SAML2/WS-Federation integration, allowing you to integrate with any custom/third-party application that we haven't covered yet.

![](../media/articles/applications/applications-third-party-overview.png)

### Connections

![](../media/articles/applications/applications-connections-example.png)

On application level we are able to choose which connections are enabled, which is useful if an organization is building applications for different audiences. A timesheet application might be for employees only, so we'll want to restrict this to Active Directory authentication. But a customer facing application might have support for Google, Microsoft Accounts, different ADFS connections, ...

### Rules

![](//docs.google.com/drawings/d/16W_hTS_u2CeDFXkD2PlfituFl7b74EQ6HE_XYn3TdD0/pub?w=891&h=283)

[Rules](rules) are code snippets written in JavaScript that are executed as part of the authentication pipeline in Auth0. This happens every time a user authenticates to an application. Rules enable very powerful customizations and extensions to be easily added to Auth0.

In the context of a rule we also have access to the application the user is trying to reach which is useful if we want to apply coarse grained authorization policies for our applications (eg: only HR can access application X, application Y can only be accessed from the US, ...). Here's an [example of a rule](https://github.com/auth0/rules/blob/master/rules/simple-user-whitelist-for-app.md) where only the people in the whitelist are allowed to access the application:

```
function (user, context, callback) {
    //we just care about NameOfTheAppWithWhiteList
    //bypass this rule for every other app
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

![](../media/articles/applications/applications-logs-auditing-error.png)

Whenever a user logs in to an application, a login fails, a user signs up, a password change is requested, ... these events are logged and can be downloaded using the API or can be accessed in the dashboard. These events contain information about the user (John), the connection (Facebook), the application (Timesheets) and in addition to that we also keep track of the date and time this event occured, the IP address of the user, the user agent (browser information) and the number of times the user logged in.

### Cost

The [pricing model](https://auth0.com/pricing) is based on the type of identity providers you're using, together with the number of active users and any additional features that have been enabled. Active users are users that authenticated in the last 30 days for **a given application**. We define an application as a client id and client secret pair, if multiple applications (say one on iOS and one on Android) share the same client id and client secret pair, they are a single app in this definition.

In the following example we have 3 active social users for the month of February:

![](../media/articles/applications/applications-single-app-active-users.png)

Next month John and Mary start using the company's collaboration application which means they'll also become active users for this second application. Which means that we'll have 5 active social users for the month of March: 

 * Todo List: 3 active users
 * Collaboration Application: 2 active users

![](../media/articles/applications/applications-multi-app-active-users.png)

## Application Examples

### Regular Web Application

![](../media/articles/applications/applications-traditional.png)

For your regular web application you'll simply create a new application in Auth0.

### Mobile + Single Page Application + REST API

![](../media/articles/applications/applications-multiple-single-logical.png)

This example is an Timesheet application with a REST API hosted on one server, a Single Page application hosted on a different server and a few mobile apps running on different types of devices. From a technical point of view these are 5 applications (different language, deployment model, ...) but for Auth0 this is one and the same application. There's no need to create different applications because we don't want separate auditing (we just want to know who interacted with the REST api), we want to use the same connections in the different client applications, ...

### Multiple Services and APIs

![](../media/articles/applications/applications-complex-same-app.png)

Here is an example of a decomposed application with several APIs and services. Depending on the requirements this might just be one application in Auth0. This is the easiest to implement but keep in mind that: 

 * With a single token you'll be able to access all APIs
 * The logs will show that a user has accessed the "Fabrikam Enterprise Portal" because we won't be able to make a distinction between APIs
 * It won't be possible to write rules to control the flow between the applications

Now on the other hand, you could create different applications for the enterprise portal and the backing services. This will allow us to identify the different APIs and services giving you:

 * Better auditing (you'll be able to see who accessed which service)
 * The ability to apply coarse grained authorization for applications through rules (eg: only finance can access the invoices API)
 * Support to control the flow of your application (eg: the Documents API is the only API that can call the Invoices API)

Keep in mind that users calling out to the different APIs will count as additional active users because they will be spanning multiple applications. Choosing between one application and different application will be a functionality vs. cost tradeoff.

![](../media/articles/applications/applications-complex-different.png)
