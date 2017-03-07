---
description: This articles lists several existing multi-tenant applications and describes their implementations.
toc: true
---

# Using Auth0 with Multi-tenant Apps


Multi-tenancy refers to a principle in software architecture where a single instance of the software runs on a server, serving multiple client organizations (referred to as tenants).


Here are some examples of existing multi-tenant applications and descriptions of their implementations.

## Slack

### Authentication

* Slack implements a login screen that asks for an email.
* The email is then mapped to a Slack account:  `https://{account}.slack.com`.
* Slack likely maintains a mapping table between email (or email domain) and the Slack subdomain. Notice that in the example, when entering `matias@auth0.com`, the user is redirected to `https://auth0.slack.com`.
* Slack only supports email/password authentication. Asking for an email first is a good approach for an enterprise SSO. Each organization will have a configured identity provider (SAML, ADFS, etc.). Slack will redirect to this provider once the user has entered their email, instead of asking them for credentials.

![](/media/articles/saas/saas-01.png)

### Authorization

* With Slack, a user can belong to multiple teams or organizations. Each team can be considered a __tenant__.
* You can switch from one team to another through an option in Slack.
* Users can have either __full__ or __single-channel__ access within a team.
* A user can have __full access__ on one team but only __single-channel access__ on another.

![](/media/articles/saas/saas-02.png)

### Modeling in Auth0

The `User Profile` below captures the intent of the requirements described above:

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

### Authentication

* Dropbox asks for an email. If there is an organization with a domain that matches the email suffix, Dropbox will hide the password textbox and display a __Single Sign On Enabled__ message on the login screen.
* When the user clicks on __Continue__, they will be redirected to the configured identity provider.
* If there is no SSO configured for that domain, the user will enter their password.

![](/media/articles/saas/saas-03.png)

### Authorization

* Once a user is authenticated, they are granted access to the files they own and those that were shared with them.
* Users are granted access to their personal account and to any organizations they belong to.

![](/media/articles/saas/saas-04.png)

### Modeling in Auth0

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

Storing all of the folders that the user has access to as part of the user profile would be unwieldy. The user object would get very large if the user has many folders. A more manageable approach is to store information at the company level role. All other ACLs are handled at the application or database level.

## Auth0

### Authentication

* Auth0 has a single [Dashboard](${manage_url}) for all tenants.
* Auth0 supports Google, GitHub, Live and user/password authentication.
* Auth0 also supports Enterprise connections for Platinum level subscriptions. You can request this by opening a [support ticket](${env.DOMAIN_URL_SUPPORT}).
* Auth0 uses email domains for home realm discovery (see screen below), making it similar to the Dropbox experience.

![](/media/articles/saas/saas-05.png)

### Authorization

* A user can belong to multiple tenants and have different permissions on each (__user foo__ can be an __admin__ on __tenant bar__ and a __regular user__ of __tenant xyz__).
* This is implemented by assigning a `user_id` property to an **account-level** entity if the user has access to everything or an **app-level** entity if the user has only app level permission.

![](/media/articles/saas/saas-06.png)

### Modeling in Auth0

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

## How to use Auth0 with a multi-tenant app

A typical modern SaaS multi-tenant app has these features:

* Allows users to signup with a custom __username/password__, especially during trial periods.
* Allows users to login with their existing __Google__, __LinkedIn__ or __Yahoo!__ credentials.
* Small businesses with employee directories based on __Office365__ or __Google Apps__ prefer to login using these credentials.
* Larger companies often have identity systems for employees. Many companies rely on __Active Directory__ or __LDAP__ while some have deployed systems for identity federation based on __ADFS__, __PingFederate__, __Okta__, __OneLogin__, __CA Siteminder__, or even a custom __SAML-P provider__.
* The app is often a web app built as a __Single Page App__ (SPA) using __AngularJS__ with a backend API built with __nodejs__. A mobile app for __Android__ and __iOS__ with a subset of the web app functionality may also be available.

### One database connection or many

A single database connection is often sufficient. Whether or not a user has access to a certain tenant can be handled with [metadata](/metadata) instead of separate database connections. You can easily find users that have specific metadata values via our [user search API](/api/management/v2/user-search). For example, to fetch all users that belong to the `company1` tenant per the example given earlier, you could use this Lucene query:

```
_exists_:app_metadata.permissions.company1
````

There are a few cases where storing users in multiple database connections might make sense:

- If you need to isolate a set of users (e.g. staging vs. prod environment), it may make sense to use different database connections. However, we recommend you use [separate Auth0 tenants](https://auth0.com/docs/dev-lifecycle/setting-up-env) for this instead.

- If your **tenant A** and **tenant B** only contain username/password users but **tenant C** uses an enterprise connection for its users (eg. Active Directory or SAML), then you might want separate database connections for **tenant A** and **tenant B**, but again, you could just use one database connection for both and use the metadata approach instead. In fact, you may have some tenants with a mixture of both database and enterprise (or even social) connections. Metadata provides a consistent way to categorize your users without the added complexity of multiple database connections.

- If your tenants have different connection-level requirements. The best example is if they have different password policy requirements. So **tenant A** only requires the **Fair** password policy where **tenant B** requires the **Excellent** password policy and maybe a specific password history. Since these are settings at the connection level you would require multiple database connections to accomplish this.

::: panel-warning Warning
If you do decide to employ multiple database connections, be aware that there is currently a limit to how many _enabled_ database connections that Lock will support for a single client (at the time of this writing the limit was 50). Therefore we advise if you have multiple database connections _and_ you use Lock in your application, that you actually create _separate_ Auth0 clients for each of your tenants. Many would argue that multi-tenant SaaS applications should treat each tenant as separate applications anyway, even if it's the same physical application hosting all of them.
:::

### A single Auth0 account for all tenants

One account for all tenants is simpler and allows you to manage them in one place.

Only if you want to share access to the dashboard with tenants would a separate Auth0 account per tenant be required. But to do so would require you to leverage the restricted API to create each new account. However, you can use the regular API to add applications and connections.

**NOTE:** You can find a sample multi-tenant app where each tenant has its own Auth0 account on [Github](https://github.com/auth0/auth0-multitenant-spa-api-sample).

### Different roles for each tenant

You can use [metadata](/api/v1#!#put--api-users--user_id--metadata) to handle roles per tenant, as mentioned above.

Metadata in Auth0's user profile is a generic way of associating information to any authenticated user. __Permissions__, __Groups__, and __Roles__ are all special cases of these attributes.

Here is an example that would model a simplified chat system like Slack:

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

