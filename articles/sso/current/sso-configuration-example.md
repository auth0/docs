---
description: An example of how to configure Single Sign On (SSO) with Auth0 using Google.
toc: true
topics:
  - sso
contentType:
  - how-to
useCase:
  - integrate-saas-sso
---

# Google Single Sign On Configuration Example

To understand how Single Sign On (SSO) works, see [Introduction to Single Sign On with Aut0](/sso/current/introduction). 

## Prerequisite

* Create an application.

## Enable Single Sign On

Enabling Single Sign On means that if the user is already logged in through Auth0, the Identity Provider (in this example, Google) login dialog won’t be prompted again, and they will automatically be logged in the specified application.

1. In the management dashboard, click **Apps / APIs**.
2. Click the application that you want to enable Single Sign On.
3. In the **Settings** tab, scroll down until you see the **Use Auth0 instead of the IdP to do Single Sign On switch**.
4. Flip the switch! and save the changes.

## Configure the Google connection

1. Generate a Client ID and Client Secret in a Google project. (Your social connection can not use developer keys.)
2. Enable the Google Admin SDK Service
3. Copy your Google Client ID and Client Secret keys into your Auth0 dashboard
4. Enable the Google social connection in Auth0.

## Connection settings

1. Switch over to the *Settings* tab. 
2. Choose an **Attribute**. 
3. Select the Permissions for each of the features you want to allow your app to access. 
4. Click **Save** when you're done.

## Session length

Any time a user performs a new standard login, it resets the SSO session.

If the SSO flag is set for an application, Auth0 will maintain an SSO session for any user authenticating via that Application. If the user remains active, the session will last no more than **7 days**, but if not, the session will terminate after **3 days**. To be considered active, the user must access the Application that created the session within the given timeframe.

Auth0 maintains an SSO session for any user authenticating via that Application. Auth0 maintains two pieces of information:

| Setting | Description |
| - | - |
| Inactivity timeout | The maximum length of time that can elapse without user activity before the user is asked to log in again. **This setting cannot exceed 3 days!** |
| Require log in after | The length of time that elapses before Auth0 forces the user to log in again (regardless of activity) |

To configure the **SSO Cookie Timeout** setting, navigate to [Dashboard > Tenant Settings > Advanced](${manage_url}/#/tenant/advanced).

![](/media/articles/sso/sso-session-mgmt-2.png)

## Test your connection

1. Go back to the Connections > Social section of the Auth0 dashboard. If you have configured your connection correctly, you will see a Try icon next to the Google logo. 
2. Click **Try**. 
3. Click **Allow**. You should see the **It Works!** page.

## Guidelines and considerations

Single Sign On works with Social Identity Providers given the following conditions:

1. All applications on the Auth0 tennant share sessions with other application on that tennant. If you have applications that should not share the session with other applications, then you’ll probably want to create different Auth0 tenants.
1. Check the users' SSO status from the application. For more information, see [Client-Side SSO (Single Page Apps)](/sso/current/single-page-apps-sso).
1. Once you successfully authenticate a user, Google includes an Access Token in the user profile it returns to Auth0. You can then use this token to call their API. For more information, see [Identity Provider Access Tokens](https://auth0.com/docs/tokens/overview-idp-access-tokens).
1. You can also get a [Refresh Token](https://auth0.com/docs/connections/social/google#optional-get-a-refresh-token) from Google in order to refresh your Access Token, once it expires. 

<%= include('./connections/_quickstart-links.md') %>


## Keep reading

- Please see the [Auth0 SSO Sample](https://github.com/auth0/auth0-sso-sample) repo for an example of SSO with both Single Page Apps and Regular Web Apps.
- For Social Identity Providers, make sure the Connection is not using [developer keys](/connections/social/devkeys).
- [Single Sign On Integrations](/integrations/sso).


