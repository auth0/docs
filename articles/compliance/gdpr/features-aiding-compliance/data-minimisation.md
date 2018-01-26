---
title: GDPR Compliance: Data Minimisation
description: This article discusses how customers can minimise the personal data they collect for processing and ensure their security
toc: true
---
# GDPR Compliance: Data Minimisation

According to article 5, personal data must be limited to what is necessary for the processing and must be kept only as long as needed. Also, they have to be processed in a manner that ensures appropriate security of the data, including protection against unauthorised or unlawful processing and against accidental loss, destruction or damage.

There are several Auth0 features than can help you achieve that, like account linking, user profile encryption, and more.

## Restrict user profile information

Some ways to limit the amount of personal information contained in the Auth0 user profile, are:

- Do not save end user information in the metadata section of the user profile
- If you use [enterprise directories](/identityproviders#enterprise), configure them in order to control what data is returned to Auth0
- If you use [social connections](/identityproviders#social), configure them in order to control how much information Auth0 retrieves from the social provider
- [Blacklist the user attributes](/security/blacklisting-attributes) that you do not want to persist in the Auth0 databases

## Encrypt user profile information

You can encrypt user information before you save them in the user profile. You can use any encryption mechanism you'd like prior to storing data in the metadata fields, or you can use the built-in [rules](/rules) template **Encrypt sensitive data in the user profile** to implement this functionality (there is also a **Decrypt sensitive data from the user profile** template).

## Use account linking

Auth0 creates a profile for every user in your application. This is per configured connection.

To understand what that means consider the following scenario: Your application offers three different options for signup:
- sign up with email/password
- login with Google
- login with Facebook

If a user signs up with Google, this will create a user profile in Auth0. If the same user, upon return, does not remember what he signed up with, and chooses to login with Facebook, this will create a second user profile. So now you have two profiles for the same user.

You can fix this with [account linking](/link-accounts). You can link multiple accounts under a single user profile, regardless if it’s user/password, social, SAML, you name it.

There are three ways to implement this:
- **automatic** account linking: you can configure a rule that will link accounts with the same email address. For more info and a sample rule, see [Automatic Account Linking](/link-accounts#automatic-account-linking)
- **user-initiated** account linking: your app must provide the UI so an authenticated user can link their accounts manually. For a sample implementation, see [User Initiated Account Linking](/link-accounts/user-initiated-linking)
- **suggested** account linking: in this case you still configure a rule that will link accounts with the same verified e-mail address. However, instead of completing the link automatically, your app will first prompt the user to link their identities. For a sample implementation, see [Account Linking using server side code](/link-accounts/suggested-linking)

## Export logs

You can export [Auth0 logs](/logs) and either store them yourself or automatically push them to external log services. This functionality can help you with data retention requirements, as well as log analysis requirements.

### Use the Management API

You can use the Management API to export logs and store them yourself. There are the two available endpoints, each providing slightly different quantities of information:

- [GET /api/v2/logs](/api/management/v2#!/Logs/get_logs): Retrieves log entries that match the provided search criteria. If you do not provide any search criteria, you will get a list of all available entries


- [GET /api/v2/logs/{LOG_ID}](/api/management/v2#!/Logs/get_logs_by_id): Retrieves the single log entry associated with the provided ID

### Use Extensions to export to an external service

You can install and configure an Auth0 Extension in order to export logs automatically to another provider, like Sumo Logic or Loggly. For a list of available providers and detailed steps to configure each, see [Export Auth0 logs to an external service](/extensions#export-auth0-logs-to-an-external-service).


## Keep sensitive information from logs

You should minimize any sensitive information contained in URLs that might be captured by Auth0 log files. For example, consider using `health-site` or similar as your domain name instead of `cancer-treatments`.

:::panel What else do I have to do?
- Analyze what you are collecting in sign up and through social media and whether that is necessary for the purpose of your service
- Configure enterprise identity providers to control what data is returned to Auth0
- Specify what data you want to collect from the social provider and negotiate any particular terms around social login with the social provider around use of the data they will get around your users’ login
:::

<%= include('./_stepnav', {
 prev: ["Go back", "/compliance/gdpr/features-aiding-compliance"]
}) %>