---
description: Explains the basics of a User profile, how to create a user and view users and their profile details.
toc: true
---
# User Profile

The Auth0 **User Profile** is the set of attributes that contains specific information about a user. User Profile information may include the user's name, email address, contact information, and so on.

User Profile attributes can come from many places. Attributes may be returned by the authenticating service (such as Facebook), as well as via custom databases and web services. Auth0 refers to all attribute sources as **Connections** because Auth0 connects to them to authenticate the user.

## Manage users using the Dashboard

Use the [Dashboard > Users](${manage_url}/#/users) to create, view, modify, or delete users.

::: note
User Management is included as part of the **Developer** subscription plan. You may need to [upgrade your plan](${manage_url}/#/tenant/billing/subscription) to access these features.
:::

![User Profile Dashboard](/media/articles/user-profile/user1.png)

### Create a user

To create a new user and their corresponding User Profile, click the [Users](${manage_url}/#/users) page in the Dashboard. Click the **+Create User** button at the top right of the *Users* page. You will be prompted to enter the following information:

* **Email**: the user's email address. The maximum length is 64 chars for the user/local part and 256 chars for the domain part.
* **Password**: the user's password. There is no limit for max password length. For more information refer to [Password Strength in Auth0 Database Connections](/connections/database/password-strength).
* **Repeat Password**: retype the user's password to ensure that you entered the password correctly.
* **Connection**: the database connection to use to authenticate the user. The dropdown lists all the configured database connections in your tenant. The connection you use must be associated with an Application.

Fill in the required information and click **Save** to create the new user. For more information refer to: [Creating Users via the Management Dashboard](/tutorials/creating-users-in-the-management-portal).

::: note
The User Details page will show `pending` when a user is first created until they have logged in for the first time.
:::

### View users

The [Users](${manage_url}/#/users) page lists the users who are associated with your apps. To open a particular user, click the user profile picture or name in the "Name" column. The User Details page will open and display information for that user.

The User Details page has links for five tabs:

1. Details
2. Devices
3. History
4. Locations
5. Raw JSON

#### User Details: Details

The Details tab contains three sections that provide a high-level overview of the information in the user's profile:

1. **User Identity** provides at-a-glance details about the user, including their email address, associated Connections, and access rights.
2. **Metadata** displays the `app_metadata` and `user_metadata` information. You can edit these values.
3. **Identity Provider Attributes** displays the information retrieved from the authentication provider. Note that identity provider attributes are read-only.

#### User Details: Devices

The Devices tab lists the devices with which the user has requested authentication. Requesting authorization on a device links the device to the user's account.

Login details for the user are associated with the Refresh Token assigned to that device. To revoke the Refresh Token, click **Unlink** next to the device.

#### User Details: History

The History tab displays a log of the user's account activity for the past 2 days.

The logs include information about:

* Events that have occurred
* When the events occurred
* The apps associated with the events
* The identity provider used for authentication
* The originating IP addresses for the events
* Where the events originated

#### User Details: Locations

The Locations tab displays a map with pins indicating the user's location(s) when they logged in to the apps.

#### User Details: Raw JSON

The Raw JSON tab displays all of the information contained on the user's profile in JSON format so you can quickly view all of the available information about the user.

### Impersonate a user

::: panel-warning Advanced Feature
Impersonation functionality may be disabled by default for your tenant. To check, go to the [Users](${manage_url}/#/users) page in the Dashboard, select a user, and see if the __Sign in as User__ button is displayed. If you can't see it, [contact support](${env.DOMAIN_URL_SUPPORT}) and ask them to enable the feature for your tenant.

You will also need to [set the appropriate flag in auth0.js](/user-profile/user-impersonation#enable-impersonation). 
:::

If you need to log in to your app as a user, see everything exactly as the user sees it, and do everything exactly as the user does it, you can do this using the Dashboard.

Navigate to the [Users](${manage_url}/#/users) page in the Dashboard. Select the user you want to impersonate from the list. When the User Details page opens, click the "Sign in as User" button. Select the app you want to log into from the dropdown menu.

![Impersonate a User](/media/articles/user-profile/user2.png)

::: panel I can't see the button
Can't see the button? The following conditions are required for the button display:
- The applications registered in the tenant must have at least one callback URL listed.
- The applications must have the connections that the impersonated user belongs to turned on.
:::

A popup will display the URL to use to impersonate the user. You can copy the URL into the clipboard (white button) or open the URL in a separate browser tab/window (blue button).

![Impersonate a User](/media/articles/user-profile/user3.png)

::: panel Impersonation API
You can also use the [Impersonation API](/api/authentication/reference#impersonation) to impersonate a user. The API generates a link that you can use once to log in as a specific user. To distinguish between real logins and impersonation logins, the profile of the impersonated user will contain additional `impersonated` and `impersonator` properties.
:::

Please see [User Impersonation](/user-profile/user-impersonation) for more information about impersonating a user.

### Block and unblock a user

To disable a user's access to your apps, you can block the user in the Dashboard.

To block a user, navigate to the [Users](${manage_url}/#/users) page in the Dashboard. Click the name of the user you want to block. When the User Details page opens, click the "Actions" button. Select **Block User** from the dropdown menu.

![Block a User](/media/articles/user-profile/user4.png)

If a blocked user tries to access an application, they will see the error message `user is blocked`.

To unblock a user, navigate to the [Users](${manage_url}/#/users) page in the Dashboard. Click the name of the user you want to unblock. When the User Details page opens, click the **Actions** button. Select **Unblock User** from the dropdown menu.

![Unblock a User](/media/articles/user-profile/user4.png)

### Delete a user

To permanently delete a user, navigate to the [Users](${manage_url}/#/users) page in the Dashboard. Click the name of the user you want to delete. When the User Details page opens, click the **Actions** button. Select **Delete User** from the dropdown menu.

![Delete a User](/media/articles/user-profile/user4.png)

A popup will warn you that the action cannot be undone and prompt you to confirm that you want to delete the user. Click the **Yes, Delete It** button to confirm. This will permanently delete the user.

## Manage users using the Management API

Alternatively, you can retrieve, create, update or delete users using our [Management API](/api/management/v2#!/Users/get_users).

First, you have to generate an `access_token` to call the Management API. For information on how to do that refer to [The Auth0 Management APIv2 Token](/api/management/v2/tokens).

Instead of making the HTTP calls directly, and depending on the platform you use, you can use one of our SDKs. For a list of available SDKs, refer to [the SDKs section of our Support Matrix](/support/matrix#sdks).

## User access to applications

Inside a single Auth0 tenant the users are shared between applications. The idea here is that the all the applications in a single tenant will usually belong to the same app.

For total separation you can create a new tenant. To do this click on tenant name on top right of the dashboard and select **+ Create Tenant** . If you have multiple tenants, you can easily switch between them from the tenants menu.

If you need to restrict some users to certain applications you can use rules. Inside a rule, the `context.clientName` and `context.clientID` variables are available to check which application the user is using for login. See [this rule for an example](https://github.com/auth0/rules/blob/master/rules/simple-user-whitelist-for-app.md).

You can also restrict users from applications by configuring a new connection and only giving access to a specific application. To enable application access for a connection go to the the **Settings** section for a connection and click on the **Applications** tab, here you can enable/disable any application.

## Keep reading

::: next-steps
* [User Profile Attributes](/user-profile/user-profile-structure)
* [Auth0 Normalized User Profile](/user-profile/normalized)
* [User Metadata](/metadata)
* [User Profile: In-Depth Details](/user-profile/user-profile-details)
* [Update Users using a Custom Database](/user-profile/customdb)
:::
