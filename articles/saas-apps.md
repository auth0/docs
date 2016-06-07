# Using Auth0 in SaaS, multi-tenant Apps

> Multi-tenancy refers to a principle in software architecture where a single instance of the software runs on a server, serving multiple client-organizations (referred to as tenants).

Let's start by enumerating some multi tenant applications and understand how they handle it.

## Slack

<img src="https://cloudup.com/cuk-QPyi9wr+" width="400">
<img src="https://cloudup.com/csn7IkScRzC+" width="400">

### Authentication:

* Slack implements a login screen that asks for email.
* The email is then mapped to a Slack account:  `https://{account}.slack.com`.
* Slack likely maintains a mapping table between email (or email domain) and the Slack subdomain. Notice that in the example above, when entering `matias@auth0.com`, the user is redirected to `https://auth0.slack.com`.
* Slack only supports email/password authentication. This approach of asking the user for an email first, is a good starting point for enterprise SSO. Each organization will have configured its identity provider (SAML, ADFS, etc.) and Slack will redirect there once the user entered their email (instead of asking the user for credentials).

### Authorization:

* In Slack a user can belong to multiple teams (or organizations).Each team/org can be considered a __tenant__.
* You can switch from one team to another through an option in Slack.
* Users can either have __full__ or __single-channel__ access within a team (organization).
* A user can have __full access__ on one team but __single-channel access__ on another one.

### Modeling this in Auth0

This `User Profile` can perfectly capture the intent in the requirements described above:

```json
{
  "email": "matias@auth0.com",
  "app_metadata": {
    "permissions": {
      "auth0": {
        "role": "admin",
        "channels": ["*"]
      },
      "another-company": {
        "role": "single-channel",
        "channels": [ "some-channel" ]
      }
    }
  }
}
```

## Dropbox

<img src="https://cloudup.com/c9wc2n55i3K+" width="400">
<img src="https://cloudup.com/ccqaPFLghy4+" width="400">

### Authentication:

* Dropbox asks for an e-mail. Based on the e-mail suffix, if there is an organization with a domain that matches that suffix, it will hide the password textbox, and will show __Single Sign On Enabled__ message on the login screen.
* When the user clicks on the __Continue__ he will be redirected to the configured identity provider.
* If there is no SSO configured for that domain, the user will just enter the password.

### Authorization:


* Once a user is authenticated and gets an access to files and folders shared with or owned by the user.
* Users get access to their own personal account and to any organization they belong to.

### Modeling this in Auth0

```json
{
  "email": "foo@bar.com",
  "app_metadata": {
    "permissions": {
      "personal": {
        "role": "full",
      },
      "company1": {
        "role": "user",
      },
      "company2": {
        "role": "admin",
      }
    }
  }
}
```

Storing the folders you have access to as part of the user profile in this case, would be overkill. The user object can get really big if the user has lots of folders. A more manageable approach is to store information at the company level role. All other ACLs are handled at the app/db level.

## Auth0

<img src="https://cloudup.com/ceLMDO3TLba+" width="400">
<img src="https://cloudup.com/cexc__8B02O+" width="400">

### Authentication:

* Auth0 has a single dashboard for all the tenants and it is accesible through <${uiURL}>.
* It supports Google, GitHub, Live and User/Passwords authentication.
* It also supports Enterprise connections (you can request this by opening a [support ticket](https://support.auth0.com))
* Auth0 uses email domains for home realm discovery (see screen below). Making it very similar to the Dropbox experience.

### Authorization:

* A user can belong to multiple tenants and have different permissions on each tenant (__user foo__ can be an __admin on tenant bar__ and a __regular user__ of __tenant xyz__).
* It is implemented by assigning the `user_id` property to an "account-level" entity together with the permission if the user has access to everything OR to an "app-level" entity if the user has an app level permission.

### Modeling this in Auth0

```json
{
  "email": "foo@bar.com",
  "app_metadata": {
    "permissions": {
      "company1": {
        "role": "full",
        "clients": [ "*" ]
      },
      "company2": {
        "role": "app-owner",
        "clients": [ "iaeonoemaoiy2ie029je" ]
      }
    }
  }
}
```


# Building a multi-tenant app? How to use Auth0?

Here are typical requirements of for a modern, SaaS multi-tenant app:

* Allow users to signup with a custom __username/password__. Especially during trial periods.
* Allow users to login with their existing __Google__, __LinkedIn__ & __Yahoo!__ credentials.
* Small businesses with employees directories based on __Office365__ or __Google Apps__ have a preference for login using these credentials.
* Bigger companies often have already one or many identity systems for employees. Many rely on __Active Directory__, or __LDAP__. Some have deployed systems for identity federation based on __ADFS__, __PingFederate__, __Okta__, __OneLogin__, __CA Siteminder__, or even custom __SAML-P providers__.

The app is primarily a web app, built as a __Single Page App__ (SPA) using __AngularJS__ with a backend API built with __nodejs__. They also have a mobile app for __Android__ and __iOS__ with a subset of the web app functionality.

## Should you use one database connection or multiple ones?

A single database connection is often sufficient. Whether the user has access to a certain tenant or not could very well be handled with [metadata](/api/v1#!#put--api-users--user_id--metadata), not with different database connections.
The only case where it would make sense to use different DB connections is if you need to isolate a set of users (e.g. staging vs. prod environment), but even then we would recommend creating different accounts in Auth0 for that case. The other case where you would need a separate database connection would be if "tenant-A" use the builtin Auth0 user store but "tenant-B" has a set of users somewhere and you want to authenticate those users. In that case you would create a [custom db connection](/connections/database/mysql) only for that tenant and somewhere in your application you would have to store that association.

## Should I use a single Auth0 account for all tenants?

Typically yes, one account for all tenants would be ok and it would allow you to manage everything from the same place. The only case in which it would make sense to have a **new** Auth0 account per tenant, would be if you want to share access to the Dashboard to the tenant. Notice that if you do that you would have to leverage the (restricted) API to create a new account. You can use the normal API to add applications and connections.

> You can find a sample multi-tenant app where each tenant has its own Auth0 account in [Github](https://github.com/auth0/auth0-multitenant-spa-api-sample).

## How do I store different roles for each tenant?

As explained above, the way to handle roles per tenant would be using [metadata](/api/v1#!#put--api-users--user_id--metadata).

Metadata in Auth0's user profile is a generic way of associating information to __any__ authenticated user. __Permissions__, __Groups__, __Roles__ are all special cases of these attributes.

Here is an example that would model a simplified chat system like "Slack":

```json
{
  "email": "matias@auth0.com",
  "app_metadata": {
    "permissions": {
      "auth0": {
        "role": "admin",
        "channels": ["*"]
      },
      "another-company": {
        "role": "single-channel",
        "channels": [ "some-channel" ]
      }
    }
  }
}
```

> This article is under development. Feedback very welcome.
