---
description: Explains the basics of a User profile, how to create a user and view users and their profile details. 
url: /user-profile
---

# User Profile

The Auth0 **User Profile** is the set of attributes that contains specific information about a user. User Profile information may include the user's name, email address, contact information, and so on. Please see [Structure of the User Profile](/user-profile/user-profile-structure) for more information about the attributes available on the User Profile.

User Profile attributes can come from many places. Attributes may be returned by the authenticating service (such as Facebook), as well as via custom databases and web services. Auth0 refers to all attribute sources as **Connections** because Auth0 connects to them to authenticate the user.

For more information about User Profiles, please see [User Profile: In-Depth Details](/user-profile/user-profile-details).

## Managing User Profiles in the Management Dashboard

Use the Auth0 Management Dashboard ("Dashboard") to manage User Profiles.

Within the Dashboard, you can create, view, modify, or delete users. These options are available via the [Users](${manage_url}/#/users) page.

![User Profile Dashboard](/media/articles/user-profile/user-profile-dashboard.png)

### Creating a New User

To create a new user and their corresponding User Profile, click the [Users](${manage_url}/#/users) page in the Dashboard. Click the **+Create User** button at the top right of the *Users* page. You will be prompted to enter the following information:

* **Email**: the user's email address.
* **Password**: the user's desired password.
* **Repeat Password**: retype the user's desired password to ensure that you entered the password correctly.
* **Connection**: the database connection to use to authenticate the user. The dropdown lists all the configured database connections in your account. The connection you use must be associated with a Client.

Fill in the required information and click **Save** to create the new user. For more information refer to: [Creating Users via the Management Dashboard](/tutorials/creating-users-in-the-management-portal).

### Viewing Users

The [Users](${manage_url}/#/users) page lists the users who are associated with your apps. To open a particular user, click the user profile picture or name in the "Name" column. The User Details page will open and display information for that user.

The User Details page has links for five tabs:

1. Details.
2. Devices.
3. History.
4. Locations.
5. Raw JSON.

#### User Details: Details

The Details tab contains three sections that provide a high-level overview of the information in the user's profile: 

1. **User Identity** provides at-a-glance details about the user, including their email address, associated Connections, and access rights.
2. **Metadata** displays the information available via the `app_metadata` and `user_metadata` attributes. Click the "Edit" button in this section to edit the user's `user_metadata` attributes. Note that all `app_data` attributes are read-only.
3. **Identity Provider Attributes** displays the information retrieved from the authentication provider. Note that Identity Provider Attributes are read-only.

#### User Details: Devices

The Devices tab lists the devices with which the user has requested authentication. Requesting authorization on a device links the device to the user's account.

Login details for the user are associated with the refresh token assigned to that device. To revoke the refresh token, click "Unlink" next to the device.

#### User Details: History

The History tab displays a log of the user's account activity for the past 2 days.

The logs include information about:

* Events that have occurred.
* When the events occurred.
* The apps associated with the events.
* The identity provider used for authentication.
* The originating IP addresses for the events.
* Where the events originated.

#### User Details: Locations

The Locations tab displays a map with pins indicating the user's location(s) when they logged in to the apps.

#### User Details: Raw JSON

The Raw JSON tab displays all of the information contained on the user's profile in JSON format so you can quickly view all of the available information about the user.

## Impersonating a User

If you need to log in to your app as a user, see everything exactly as the user sees it, and do everything exactly as the user does it, you can do this using the Dashboard. 

Navigate to the [Users](${manage_url}/#/users) page in the Dashboard. Select the user you want to impersonate from the list. When the User Details page opens, click the "Sign in as User" button. Select the app you want to log into from the dropdown menu.

![](/media/articles/user-profile/signin-as-user-01.png)

> Can't see the button? The following conditions are required for the button display:
> - The applications registered in the account must have at least one callback URL listed.
> - The applications must have the connections that the impersonated user belongs to turned on.

A popup will display the URL to use to impersonate the user. You can copy the URL into the clipboard (white button) or open the URL in a separate browser tab/window (blue button).

![](/media/articles/user-profile/signin-as-user-02.png)

::: panel-info Impersonation API
You can also use the [Impersonation API](/api/authentication#!#post--users--user_id--impersonate) to impersonate a user. The API generates a link that you can used once to log in as a specific user. To distinguish between real logins and impersonation logins, the profile of the impersonated user will contain additional `impersonated` and `impersonator` properties.
:::

Please see [User Impersonation](/user-profile/user-impersonation) for more information about impersonating a user.

## Blocking and Unblocking a User

To disable a user's access to your apps, you can block the user in the Dashboard. 

To block a user, navigate to the [Users](${manage_url}/#/users) page in the Dashboard. Click the name of the user you want to block. When the User Details page opens, click the "Actions" button. Select _Block User_ from the dropdown menu.

![](/media/articles/user-profile/block-user.png)

If a blocked user tries to access an application, they will see the error message `user is blocked`. 

To unblock a user, navigate to the [Users](${manage_url}/#/users) page in the Dashboard. Click the name of the user you want to unblock. When the User Details page opens, click the "Actions" button. Select _Unblock User_ from the dropdown menu.

![](/media/articles/user-profile/unblock-user.png)

## Deleting a User

To permanently delete a user, navigate to the [Users](${manage_url}/#/users) page in the Dashboard. Click the name of the user you want to delete. When the User Details page opens, click the "Actions" button. Select _Delete User_ from the dropdown menu.

![](/media/articles/user-profile/delete-user.png)

A popup will warn you that the action cannot be undone and prompt you to confirm that you want to delete the user. Click the "Yes, Delete It" button to confirm. This will permanently delete the user.
