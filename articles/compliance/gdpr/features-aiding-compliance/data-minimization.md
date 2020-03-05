---
title: "GDPR: Data Minimization"
description: This article discusses how customers can minimize the personal data they collect for processing and ensure their security
toc: true
topics:
    - compliance
    - gdpr
contentType: how-to
useCase: compliance
---
# GDPR: Data Minimization

According to Article 5 of GDPR, the personal data you collect must be limited to what is necessary for processing and must be kept only as long as needed. Appropriate security must be ensured during data processing, including protection against unauthorised or unlawful processing and against accidental loss, destruction, or damage.

There are several Auth0 features than can help you achieve these goals, like account linking, user profile encryption, and more.

<%= include('./_legal-warning.md') %>

## Restrict user profile information

To limit the amount of personal information in the Auth0 user profile, you can:

- Minimize (or avoid) saving personal information in the metadata section of the user profile
- If you use [enterprise directories](/connections/identity-providers-enterprise), configure them to return only the minimum information needed
- If you use [social providers](/connections/identity-providers-social), configure them to return only the minimum information needed
- [Blacklist the user attributes](/security/blacklisting-attributes) that you do not want to persist in the Auth0 databases

## Encrypt user profile information

<%= include('./_encrypt-data.md') %>

## Use account linking

Every time a user uses a connection to log in to your application, a user profile is created if it doesn't already exist. Note that this is per connection.

To better understand this, consider the following scenario. Your application offers three different options for signup:
- sign up with email/password
- login with Google
- login with Facebook

If a user signs up with Google, this will create a user profile in Auth0. If the same user, upon return, does not remember what he signed up with, and chooses to login with Facebook, Auth0 will create another user profile for the user. So now you have two profiles for the same user.

You can fix this with [account linking](/users/concepts/overview-user-account-linking). You can link multiple accounts under a single user profile, regardless of the connection's type (for example, user/password, social, or <dfn data-key="security-assertion-markup-language">SAML</dfn>).

There are three ways to implement this:
- **Automatic** account linking: you can configure a rule that will link accounts with the same email address. For more info and a sample rule, see [Automatic Account Linking](/users/concepts/overview-user-account-linking#automatic-account-linking)
- **User-initiated** account linking: your app must provide the UI so an authenticated user can link their accounts manually. For a sample implementation, see [Link User Accounts Server-Side Scenario](/users/references/link-accounts-user-initiated-scenario)
- **Suggested** account linking: in this case you still configure a rule that will link accounts with the same verified email address. However, instead of completing the link automatically, your app will first prompt the user to link their identities. For a sample implementation, see [Link User Accounts Server-Side Scenario](/users/references/link-accounts-server-side-scenario)

## Export logs

You can export [Auth0 logs](/logs) and either store them yourself or automatically push them to external log services. This functionality can help you with data retention requirements, as well as log analysis requirements.

### Export logs with the API

You can use the Management API to export logs and store them yourself. There are the two available endpoints, each providing slightly different information.

#### Search all logs

The [Search log events endpoint](/api/management/v2#!/Logs/get_logs) retrieves log entries that match the search criteria you provided. If you do not provide any search criteria, you will get a list of all available entries. 

You can provide search criteria using the **q** parameter and retrieve specific fields using the **fields** parameter. 

To access the API, you need a [Management APIv2 token](/api/management/v2/tokens).

This sample request retrieves all logs for successful logins (the event acronym for successful login is `s`). The list of fields we will retrieve per log entry is: **date**, **description**, **client_id**, and **log_id**.

```har
{
"method": "GET",
"url": "https://${account.namespace}/api/v2/logs",
"httpVersion": "HTTP/1.1",
"headers": [{
    "name": "Authorization",
    "value": "Bearer YOUR_MGMT_API_ACCESS_TOKEN"
}],
"queryString":  [
    {
      "name": "fields",
      "value": "date,description,client_id,log_id"
    },
    {
      "name": "type",
      "value": "s"
    }
]
}
```

For details on the search criteria you can use and a list with the event acronyms, see the [Search log events endpoint](/api/management/v2#!/Logs/get_logs).

#### Get a single log entry

The [Get a log event by ID endpoint](/api/management/v2#!/Logs/get_logs_by_id) retrieves the log entry associated with the provided ID.

This sample request retrieves a single log entry with the ID `90020180129170850881585554625888895190928456277777449010`.

```har
{
"method": "GET",
"url": "https://${account.namespace}/api/v2/logs/90020180129170850881585554625888895190928456277777449010",
"httpVersion": "HTTP/1.1",
"headers": [{
    "name": "Authorization",
    "value": "Bearer YOUR_MGMT_API_ACCESS_TOKEN"
}]
}
```

### Use Extensions to export to an external service

You can install and configure an Auth0 Extension in order to export logs automatically to another provider, like Sumo Logic or Loggly. For a list of available providers and detailed steps to configure each, see [Export Auth0 logs to an external service](/extensions#export-auth0-logs-to-an-external-service).


## Keep sensitive information from logs

You should minimize any sensitive information contained in URLs that might be captured by Auth0 log files. For example, consider using `health-site` or similar as your domain name instead of `cancer-treatments`.

---

:::panel What else do I have to do?
- Analyze what you are collecting in sign up and through social media and whether that is necessary for the purpose of your service
- Configure enterprise identity providers to control what data is returned to Auth0
- Specify what data you want to collect from the social provider and negotiate any particular terms around social login with the social provider around use of the data they will get around your users’ login
:::
