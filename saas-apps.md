# Using Auth0 in SaaS, multi-tenant Apps

> Multitenancy refers to a principle in software architecture where a single instance of the software runs on a server, serving multiple client-organizations (tenants)

Let's start by enumerating some multi tenant applications and understand how they handle it.

## Slack

<img src="https://cloudup.com/cuk-QPyi9wr+" width="400">
<img src="https://cloudup.com/csn7IkScRzC+" width="400">

### Authentication:

* Slack implements a login screen asking for email. Based on the email it will redirect to https://{account}.slack.com
* Slack must be storing the mapping between email (or email suffix) and subdomain. Notice that when I enter matias@auth0.com I get redirected to my own domain
* Right now they only support email/password. But they plan to support enterprise SSO. This login experience where they ask email first for sure is in preparation to support enterprise SSO. Each organization will have configured its identity provider (SAML, ADFS, etc.) and Slack will redirect there once the user entered their email.

### Authorization: 
    
* You can belong to multiple teams (or organizations) in Slack. Each team/org can be considered a tenant.
* You can switch from one team to another through an option in Slack
* Users can be either full access or single-channel access within a team (organization)
* A user can be have full access on one team but single-channel access on another

### How this can be modeled in Auth0?

```
{
	email: 'matias@auth0.com'
    permissions: [
    	"auth0": 
        {
        	role: "admin",
        	channels: ["*"]
        },
        "another-company": 
        {
        	role: "single-channel",
        	channels: [ "some-channel" ] 
        }
    ]
}
```

## Dropbox


<img src="https://cloudup.com/c9wc2n55i3K+" width="400">
<img src="https://cloudup.com/ccqaPFLghy4+" width="400">

### Authentication:

* Dropbox asks for an e-mail. Based on the e-mail suffix, if there is an organization with a domain that matches that suffix, it will hide the password and show "Single Sign On Enabled". When the user clicks on the "Continue" it will be redirected to the identity provider. If there is no SSO configured for that domain, the user will just enter the password.

### Authorization:

* Once a user is authenticated you get access to folders/files you own and folders you were shared.
* You get access to your personal account and any organization you belong

### How this can be modeled in Auth0?

```
{
	email: 'foo@bar.com'
	permissions: [
	    	"personal": 
	        {
	        	role: "full",
	        },
	        "company1": 
	        {
	        	role: "user",
	        },
	        "company2": 
	        {
	        	role: "admin",
	        }
    	]
}
```

Storing the folders you have access to as part of the user model in this case, would be overkill. The user object can get really big if you have lots of folders. Instead storing up to company level role and then the rest would be handled on the application/db level.

## Auth0

<img src="https://cloudup.com/ceLMDO3TLba+" width="400">
<img src="https://cloudup.com/cexc__8B02O+" width="400">

### Authentication:

* Auth0 has a single dashboard for all the tenants and it is accesible through <https://app.auth0.com>. 
* It supports Google, GitHub, Live and User/Passwords.
* It also supports Enterprise connections (configured manually for now) and using the email domain for home realm discovery (see screen below). Similar to Dropbox experience.

### Authorization:

* A user can belong to multiple tenants and have different permissions on each tenant (user foo can be an admin on tenant bar and be a regular user of tenant xyz. 
* It is implemented by assigning the `user_id` property to an "account-level" entity together with the permission if the user has access to everything OR to an "app-level" entity if the user has an app level permission.

### How this can be modeled in Auth0?

```
{
	email: 'foo@bar.com'
    permissions: [
    	"company1": 
        {
        	role: "full",
            clients: [ "*" ]
        },
        "company2": 
        {
        	role: "app-owner",
        	clients: [ "iaeonoemaoiy2ie029je" ] 
        }
    ]
}
```


# How to use Auth0?

Here is a typical scenario of a SaaS multi tenant app: 

* Many clients signup with a custom __username/password__. Especially during trial periods.
* Some customers login with their existing __Google__, __LinkedIn__ & __Yahoo!__ credentials.
* Small businesses with employees directories based on __Office365__ or __Google Apps__ have a preference for login using these credentials.
* Bigger companies often have already one or many identity systems for employees. Many rely on __Active Directory__, or __LDAP__. Some have deployed systems for identity federation based on __ADFS__, __PingFederate__, __Okta__, __OneLogin__, __CA Siteminder__, or even custom __SAML-P providers__.

The app is primarily a web app, built as a __Single Page App__ (SPA) using __AngularJS__ with a backend API built with __nodejs__. They also have a mobile app for __Android__ and __iOS__ with a subset of the web app functionality. 

## Should I use one database connection or multiple?

Typically you would be ok with just one database connection. Whether the user has access to a certain tenant or not should be handled with [metadata](https://docs.auth0.com/api#!#put--api-users--user_id--metadata), not with different database connections.
The only case where it would make sense to use different db connections is if you need to isolate a set of users (e.g. staging vs prod environment), but even then we would recommend creating different accounts in Auth0 for that case. The other case where you would need a separate database connection would be if "tenant-A" use the builtin Auth0 user store but "tenant-B" has a set of users somewhere and you want to authenticate those users. In that case you would create a [custom db connection](https://docs.auth0.com/mysql-connection-tutorial) only for that tenant and somewhere in your application you would have to store that association.

## Should I use one Auth0 account for each tenant?

Typically yes, one account per tenant would be ok and it would allow you to manage everything from the same place. The only case in which it would make sense to have a **new** Auth0 account per tenant, would be if you want to give access to that tenant to the Auth0 dashboard. Notice that if you do that you would have to leverage the API to create a new account, application and connections programatically. If you need access to such API send an email to [support@auth0.com](mailto:support@auth0.com)

## How do I store a different roles for each tenant?

As explained above, the way to handle roles per tenant would be using [metadata](https://docs.auth0.com/api#!#put--api-users--user_id--metadata).

Here is an example that would model a simplified "Slack" (a chat application) authorization model.

```
{
	email: "matias@auth0.com"
    permissions: [
    	"auth0": 
        {
        	role: "admin",
        	channels: ["*"]
        },
        "another-company": 
        {
        	role: "single-channel",
        	channels: [ "some-channel" ] 
        }
    ]
}
```

> This article is under development. Feedback very welcome.
