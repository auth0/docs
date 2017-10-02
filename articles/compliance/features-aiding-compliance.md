---
title: Auth0 Features Aiding GDPR Compliance
description: This article discusses the Auth0 features that help customers comply with GDPR requirements
---
# Auth0 Features Aiding General Data Protection Regulation (GDPR) Compliance

The following Auth0 features (listed based on the end-goal action of the user or functionality offered to you as the customer) help you comply with GDPR regulations.

## Signup

You can:

* Use [Lock to allow new user signups](/libraries/lock/v10/customization) when using [database connections](/libraries/lock/v10/customization)
* [Enable or disable signup mode](/libraries/lock/v10/customization#allowsignup-boolean-) in Lock
* Implement a [custom signup process](/libraries/custom-signup)
* Implement [progressive profiling](/user-profile/progressive-profiling) to gather only the data you need

## Notification and Consent

You can:

* Provide [a **User Must Accept Terms** checkbox](/libraries/lock/v10/customization#mustacceptterms-boolean-) that is displayed next to the terms and conditions the user must agree to prior to signing up with the [verbiage displayed controllable using the language dictionary](/libraries/lock/v10/customization#mustacceptterms-boolean-)

::: note
See [singUpTerms](https://github.com/auth0/lock/blob/master/src/i18n/en.js) for a detailed code sample.
:::

## Withdrawal of Consent

You can decide what happens if your end user withdraws their consent for you to use their data. If appropriate, you can [delete the end user from Auth0 using the Management API](/api/management/v2#!/Users/delete_users_by_id).

## Right to Access Data

You can use either the [Management Dashboard](${manage_url}) (which is a manual process) or the [Management API](/api/management/v2#!/Users/delete_users_by_id) (which is a programmatic process) to retrieve information about a specific user, correct their profile, or delete their profile. The [Get a User endpoint](/api/management/v2#!/Users/delete_users_by_id) enable you to provide an end user with their information in a standardized format (JSON).

Auth0 will assist in pointing you toward the correct API endpoints to use, as well as how to obtain the data you need.

* [The Auth0 Management API](/api/management/v2)
* [How to Get an Access Token for the Management API](/api/management/v2/tokens)
* [How to Search for Users Using Lucene Query Syntax](/api/management/v2/user-search)
* [Management API Endpoint to Search for a User](/api/management/v2#!/Users/get_users)
* [Management API Endpoint to Locate a User by ID](/api/management/v2#!/Users/get_users_by_id)
* [Management API Endpoint to Update a User by ID](/api/management/v2#!/Users/patch_users_by_id)
* [Management API Endpoint to Delete a User](/api/management/v2#!/Users/delete_users_by_id)

Please review our documentation for additional information on [Auth0 user profiles](/user-profile) (including [metadata](/metadata)) and what can/cannot be updated.

::: warning
Auth0 cannot be used to update user profile information in remote providers.
:::

## Right to be Forgotten

You can decide how to handle customer requests to be forgotten. With Auth0, you can [use the Management API to delete the user](/api/management/v2#!/Users/delete_users_by_id) from Auth0 and halt further processing of that user's data.

When you delete a user from Auth0, you remove the user's account, as well as any information possessed by Auth0 for that user. Going forward, the user's information will not be contained in any Auth0 logs or back-up files. However, Auth0 will **not** retroactively delete such data from logs and back-up files that already exist.

## Right to Restrict Processing

Auth0 will assist, to the best of its ability, you in implementing the behavior and functionality needed when an end user restricts your right to their data.

## Choice of Providers

You can choose which identity providers to use for user authentication.

Using external providers means that your end users' credentials are **not** stored in Auth0 (or onsite). This eliminates the possibility of a data breach on your end.

::: note
If you use LDAP connections, turn off caching to prevent end user credentials from being store in Auth0/onsite.
:::

## Data Minimization

You can limit the amount of personal information contained in the Auth0 user profile as follows:

* Avoid storing end user information in the metadata section of the user profile
* Configure enterprise identity providers to control what data is returned to Auth0
* Configure social connections in Auth0 to control how much information Auth0 retrieves from the social provider

* Use [blacklisting](/tutorials/blacklisting-attributes) to prevent persistence of information

* Encrypt information prior to storing it in the user profile. You can use any encryption mechanism you'd like prior to storing data in the metadata fields

* Minimize information contained in URLs that might be captured by Auth0 log files (for example, consider using `health-site` or similar as your domain name instead of `cancer-treatments`)

## Logging

The ability to export Auth0 logs to external log services can help you with data retention requirements, as well as log analysis requirements.

You can [send your logs from Auth0 to external log services](/extensions#export-auth0-logs-to-an-external-service) to:

* Store them for a longer period of time than that offered by your Auth0 service level 
* Perform detailed analytics on the data