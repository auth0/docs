# API v1 Use Cases

Currently, there are certain features and functionality that are only available in Management APIv1. If your business process/configuration requires the use of any of these features, please consider continuing with APIv1 for the time being.

* [Active Directory Connector Monitoring](#active-directory-connector-monitoring)
* [Client Users](#client-users)
* [Email](#email)
* [Enterprise Users/Directory Searching](#enterprise-users/directory-searching)
* [Impersonation](#impersonation)
* [Searching via the Auth0 Appliance](#searching-via-the-auth0-appliance)

## Active Directory Connector Monitoring

In APIv1, there is a `GET` endpoint that allows you to monitor the status of your Active Directory Connector:

`/api/connections/{AUTH0_CONNECTION}/socket`

## Client Users

With APIv1, after authenticating with the `client_id` and the `client_secret` of an application, you may make a `GET` call to the [appropriate Users endpoint](https://auth0.com/docs/api/v1#!#get--api-clients--client-id--users) to return only those users that belong to a Connection enabled on that application.

## Email

In APIv1, as part of your automation process, you may use the `PATCH` email endpoint to update email templates.

## Enterprise Users/Directory Searching

APIv1 allows you to search directly for users authenticating using Enterprise connections, such as Active Directory or Azure Active Directory.

## Impersonation

APIv1 possesses an [Impersonation endpoint](https://auth0.com/docs/auth-api#impersonation) that generates a link that can be used once to log in as a specific user (generally for troubleshooting purposes).

## Searching via the Auth0 Appliance

In APIv1, you could perform a ["starts with" search for users by name or email](https://auth0.com/docs/api/v1#!#get--api-users-search--criteria-). This functionality works in both cloud instances, as well as the Auth0 appliance.

With APIv2, the search operates with reduced functionality and does not currently support Lucene syntax.
