---
description: Regular web app scenario application implementation
toc: true
---
# SSO for Regular Web Apps: Application Implementation

Let's walk through the implementation of our regular web application. We used ASP .NET Core for the implementation, you can find the code in [this GitHub repository](https://github.com/auth0-samples/auth0-pnp-webapp-oidc).

The sample contains an application which uses Active Directory integration to authenticate company employees and an Auth0 database connection for external contractors. Authorization is implemented using rules and claims as we will see in detail in this paragraph.

## User Login

Auth0 provides a Lock widget which serves as a login component for your application, meaning that you do not have to implement your own login screen. The Lock widget seamlessly integrates with all of the connections you configure inside your Auth0 dashboard, whether they be database, social or enterprise connections.

There are a number of different ways in which you can implement a Login screen using a web application and Auth0:
- __Hosted Lock__: Use an instance of the Lock widget which is hosted on the Auth0 infrastructure.
- __Embedded Lock__: Embed the Lock widget inside a web page of your application. You have some customization options for the actual Lock widget, and full control over the rest of the HTML on the page.
- __Custom UI__: Develop a completely custom web page for the login screen. The custom HTML form will post back to your server which will in turn authenticate the user using the Authentication API. For more information on when to use a Custom UI refer to [Lock vs. a Custom UI](/libraries/when-to-use-lock).

The recommended best practice is to use Hosted Lock because it is the most secure option and the easiest way to enable users to log in to your application.

### Automate Home Realm Discovery (HRD)

By default, Lock will display all the connections available for login. Selecting the appropriate Identity Providers from multiple options is called _Home Realm Discovery (HRD)_. In our case the options are either authenticating with Active Directory (for company employees) or using email/password for our database connection (external contractors).

You may however want to avoid that first step, where the user needs to choose the Identity Provider (IdP), and have the system identify it instead of asking every time. Lock offers you the following options:

- __Identify the IdP programatically__: When you initiate an authentication transaction with Auth0 you can optionally send a `connection` parameter. This value maps directly with any connection defined in your dashboard. When using the Hosted version of Lock by calling the [`/authorize`](/api/authentication/reference#database-ad-ldap-passive-) endpoint, you can pass along a `connection` query string parameter containing the name of the connection. Alternatively, if you are using Embedded Lock, this is as simple as writing `auth0.show({connections: ['YOUR_CONNECTION']});`.

  There are multiple practical ways of getting the `connection` value. One of them is to use __vanity URLs__: for example, company employees will use `https://internal.yoursite.com`, while external contractors will use `https://external.yoursite.com`.

- __Use email domains__: Lock can use email domains as a way of routing authentication requests. Enterprise connections in Auth0 can be mapped to `domains`. If a connection has this setup, then the password textbox gets disabled automatically when typing an e-mail with a mapped domain. Note that you can associate multiple domains to a single connection.

For additional information on this topic refer to: [Selecting the connection in Auth0 for multiple login options](/libraries/lock/v10/selecting-the-connection-for-multiple-logins).

## Session Management

When talking about managing sessions, there are typically three layers of sessions we need to consider:

- __Application Session__: The first is the session inside the application. Even though your application uses Auth0 to authenticate users, you will still need to keep track of the fact that the user has logged in to your application. In a normal web application this is achieved by storing information inside a cookie.
- __Auth0 session__: Next, Auth0 will also keep a session and store the user's information inside a cookie. Next time when a user is redirected to the Auth0 Lock screen, the user's information will be remembered.
- __Identity Provider session__: The last layer is the Identity Provider, for example Facebook or Google. When you allow users to sign in with any of these providers, and they are already signed into the provider, they will not be prompted to sign in. They may simply be required to give permissions to share their information with Auth0 and in turn your application.

When developing a web application, you will therefore need to keep track of the fact that the user has logged in to your Web application. You can do this by making use of a cookie-based session to keep track of the fact that the user has signed in, and also store any of the user related information or tokens.

::: panel How do I control the duration of the user's local application session? Can I drive that from Auth0?
The web app has full control over the user's local application session. How this is done usually depends on the web stack being used (for example, ASP.NET). Regardless, all approaches ultimately use one or more cookies to control the session. The developer can choose to use the expiration of the JWT `id_token` returned by Auth0 to control their session duration or ignore it completely. Some developers store the `id_token` itself in session state and end the user's session when it has expired.

The reason why you would use the expiration of the token to determine the expiration of the local session is because it gives you centralized control of the duration of a user session from the Auth0 Dashboard.
:::

The login flow is as follows:

![Login Flow Diagram](/media/articles/architecture-scenarios/web-app-sso/login-flow.png)

1. __Initiate OIDC Authentication Flow__: The user's browser will send a request to Auth0 to initiate the OIDC flow.
1. __Set SSO Cookie__: Auth0 will set a cookie to store the user's information.
1. __Code exchange and return ID Token__: Auth0 will make a request back to the web server and return the code. The web server will exchange the code for an ID Token.
1. __Set auth cookie and send response__: The web server will send a response back to the browser and set the application authentication cookie to store the user's session information.
1. __Auth cookie sent with every subsequent request__: The application authentication cookie will be sent on every subsequent request as proof that the user is authenticated.

::: panel How does Auth0's SSO session impact the application's session?
Auth0 manages its own single-sign-on session. Applications can choose to honor or ignore that SSO session when it comes to maintaining their own local session. The Lock widget even has a special feature where it can detect if an Auth0 SSO session exists and ask the user if they wish to log in again as that same user.

![Lock Widget SSO](/media/articles/architecture-scenarios/web-app-sso/sso-login.png)

If they do so, they are signed in without having to re-enter their credentials with the actual IDP.  Even though the user didn't authenticate, the application still performs an authentication flow with Auth0 and obtains a new `id_token`, which can be used to then manage the new local application session.
:::

**See the implementation in [ASP.NET Core](/architecture-scenarios/application/web-app-sso/implementation-aspnetcore#configure-the-cookie-and-oidc-middleware)**.

## User Logout

When logging the user out, you will once again need to think about the three layers of sessions which we spoke about before:
- __Application Session__: You need to log out the user from your Web Application, by clearing their session.
- __Auth0 session__: You need to log out the user from Auth0. To do this you redirect the user to `https://${account.namespace}/v2/logout`. Redirecting the user to this URL clears all single sign-on cookies set by Auth0 for the user.
- __Identity Provider session__: Although this is not common practice, you can force the user to log out from the Identity Provider used, for example Facebook or Google. To do this add a `federated` querystring parameter to the logout URL: `https://${account.namespace}/v2/logout?federated`.

To redirect a user after logout, add a `returnTo` querystring parameter with the target URL as the value: `https://${account.namespace}/v2/logout?returnTo=http://www.example.com`. Note, that you will need to add the `returnTo` URL as an __Allowed Logout URLs__. For more information on how to implement this refer to: [Logout](/logout).

The logout flow (not including federated logout) is as follows:

![Logout Flow Diagram](/media/articles/architecture-scenarios/web-app-sso/logout-flow.png)

1. __Initiate Logout Flow__: The logout flow will be initiated from the browser, for example by the user clicking a _Logout_ link. A request will be made to the web server.
1. __Clear user’s local session__: The user's Application Session / Cookie will be cleared.
1. __Redirect browser to Auth0 Logout__: The user's browser will be redirected to the Auth0 Logout URL.
1. __Clear SSO Cookie__: Auth0 will clear the user's SSO Cookie.
1. __Redirect to post-logout URL__: Auth0 will return a redirect response and redirect the user's browser to the `returnTo` querystring parameter.

**See the implementation in [ASP.NET Core](/architecture-scenarios/application/web-app-sso/implementation-aspnetcore#implement-the-logout)**.

## Access Control

Authorization refers to the process of determining what actions a user can perform inside your application.

You can either implement authorization directly inside your application, independently of Auth0, or use one of the available ways to retrieve the user authorization levels, put them as authorization claims inside the `id_token` and validate these claims inside your application, once you retrieve the token, to control access.

There are various ways in which you can retrieve and set the user authorization claims when using Auth0:
- By configuring and using the [Auth0 Authorization Extension](/extensions/authorization-extension).
- By using Active Directory groups. These can be used in combination with the Authorization Extension by mapping Active Directory Groups to Groups you define using the Authorization extension.
- Add metadata to the user's profile by making use of [rules](/rules#add-roles-to-a-user).
- By calling an external services from inside a [rule](/rules).

Since in our case the company has already Active Directory set up, we will enforce access control using the Authorization Extension in combination with Active Directory groups.

::: panel Authorization Extension
At this point in time the authorization extension is primarily designed to enforce coarse-grained authorization, for example to control access to an application based on a user's group membership. It is not necessarily designed to control fine-grained access (such as whether a user can perform a specific action inside the application), even though this is how we are utilizing it in this instance.
:::

All users will implicitly be regular users, but timesheet administrators will be assigned to an `Admin` group which will allow them to approve timesheets. The Authorization Extension allows for mapping groups to existing group membership.

All timesheet administrators will be assigned to the `Timesheet Administrators` group on Active Directory, which will be automatically mapped to the `Admin` group inside the Timesheet Application.

When you install the Authorization Extension, it creates a rule in the background, which does the following:
1. Determine the user's group membership.
1. Store the user's group membership info as part of the `app_metadata`.
1. Add the user's group membership to the outgoing token.
1. Verify that the user has been granted access to the current application.


### Install the Authorization Extension

To install the Authorization extension navigate to the [Extensions](${manage_url}/#/extensions) view of your Auth0 Dashboard, and select and install the Auth0 Authorization extension.

![Install the Authorization Extension](/media/articles/architecture-scenarios/web-app-sso/install-authz-ext.png)

Once installed, you will see the app listed under _Installed Extensions_.

When you click on the link to open the extension for the first time, you will be prompted to provide permission for the extension to access your Auth0 account. If you do so, you will be redirected to the Authorization Dashboard.

Once on the Authorization Dashboard, navigate to Groups in the navigation menu, and create a new group called `Admin`.

![Create Admin Group](/media/articles/architecture-scenarios/web-app-sso/create-admin-group.png)

After the group has been added you can click on the new group to go to the group management section. Go to the _Group Mappings_ tab and add a new group mapping which will map all Active Directory users in the `Timesheet Admins` groups to the `Admin` group you just created.

![Add Admin Group Mapping](/media/articles/architecture-scenarios/web-app-sso/add-group-mapping.png)

Once you click __Save__ you can see the new mapping listed.

![View Admin Group Mapping](/media/articles/architecture-scenarios/web-app-sso/view-group-mapping.png)

With the mapping configured you only need to maintain membership to the `Timesheet Admins` group in Active Directory, and those users will be automatically mapped to the `Admin` group inside our application.

For more information refer to the [Authorization Extension documentation](/extensions/authorization-extension).

### Enforce permissions in your application

When you installed the Authorization Extension, it also created an Auth0 rule which will add an `authorization` claim with all the authorization related settings for a particular user. The groups for a user will be added as a sub-claim of the `authorization` claim called `groups` and all the groups a user belongs to will be added as an array to this claim. This is an example of what JSON payload of a ID Token may look like with the groups listed:

```json
{
  "sub": "1234567890",
  "name": "John Doe",
  "authorization": {
    "groups": ["Admin"]
  }
}
```

In your application you will therefore need to decode the ID Token returned when a user is authenticated, and extract the groups which a user belongs to from the `authorization` claim. You can then store these groups, along with other user information inside the user's session, and subsequently query these to determine whether a user has permissions to perform a certain action based on their group membership.

::: note
See the implementation in [ASP.NET Core](/architecture-scenarios/application/web-app-sso/implementation-aspnetcore#implement-admin-permissions).
:::

<%= include('./_stepnav', {
 prev: ["2. Auth0 Configuration", "/architecture-scenarios/application/web-app-sso/part-2"],
 next: ["4. Conclusion", "/architecture-scenarios/application/web-app-sso/part-4"]
}) %>
