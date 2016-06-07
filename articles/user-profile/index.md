---
url: /user-profile
---

# User Profile

The Auth0 **User Profile** is the set of attributes that contains specific information about a user. Such information may include the user's name, email address, contact information, and so on. Please see [User Profile Structure](/user-profile/user-profile-structure) for additional information on the attributes available on the User Profile.

User Profile attributes may originate from many places. In addition to attributes returned by the authenticating service (such as Facebook), there might be information returned via custom databases or web services. Regardless, these sources are referred to by Auth0 as **Connections**, since Auth0 connects to them to authenticate the user.

For an in-depth discussion on the User profile, please see the [details](/user-profile/user-profile-details) doc.

## Viewing User Profiles in the Management Dashboard

The Auth0 Management Dashboard provides an easy-to-use UI to help you manage user identities.

Within the Dashboard, you may create, view, modify, or delete a given user. These options are available to you via the [Users tab](${uiURL}/#/users).

![](/media/articles/user-profile/user-profile-dashboard.png)

### Creating a New User

To create a new user and their corresponding user profile, click on the "+ Create User" button at the top right of the Users page in the Management Dashboard. You will be asked to provide the following pieces of information:

* **Email**: the user's email address;
* **Password**: the user's desired password;
* **Repeat Password**: a repeat of the user's desired password (this is to ensure that the password has been entered correctly);
* **Connection**: the type of connection that should be used to authenticate the user. The options available here are dependent on the types of connections you have previously configured to work with your Auth0 account.

When you've provided the required pieces of information, click "Save" to create the new user.

### Viewing Users

Once you open up the [Users tab](${uiURL}/#/users), you may scroll down to see a list of users that are associated with your apps. To open a particular user, click in the first column, where the user has their profile picture (or placeholder). This will bring up the User Details page, which displays the information on the User Profile.

Under the User Details page, you will see links to five sub-pages:

* Details;
* Devices;
* History;
* Locations;
* Raw JSON.

### User Details: Details

The Details page contains three sections that provide a high-level overview of the information contained on the user's profile.

The top section provides at-a-glance details about the user, including their email address, associated Connections, and access rights.

The next section, Metadata, displays the information available via the `app_metadata` and `user_metadata` attributes. By clicking on the "Edit" button in this section, you may edit the user's `user_metadata` attributes (all `app_data` attributes are read-only).

### User Details: Devices

The Devices page lists the devices with which the user has requested authentication and are therefore linked to that user's account. Login details for the user is associated with the refresh token assigned to that device. If you would like to revoke the refresh token, you may do so by clicking on "Unlink" next to the appropriate device.

### User Details: History

The History page displays a log of the user's account activity for the past two days.

The logs include information about the:

* event that has occurred;
* when the event occurred;
* the app associated with the event;
* the identity provider used for authentication;
* the originating IP address for the event;
* where the event originated.

### User Details: Locations

The Locations page displays a map with pins indicating the location(s) where the user has been when logging in to the appropriate apps.

### User Details: Raw JSON

The Raw JSON page displays all of the information contained on the user's profile in JSON format. This is an easy way to quickly view all of the information available about the user.

### Impersonating a User

Sometimes you need to impersonate a user; login to your app as the user, see everything exactly as the user sees it, and do everything exactly as the user does it. You can do this using the Management Dashboard. 

Navigate to the [Users](${uiURL}/#/users) page in the Management Dashboard and select the user you want to login as. Click on the _Sign in as User_ and select the app you want to log into using the dropdown menu.

![](/media/articles/user-profile/signin-as-user-01.png)

> Can't see the button? Check the following conditions; they should apply for the button to be displayed:
> - The applications registered in the account must have at least one callback URL listed.
> - The applications must have the connections turned on that the users who are to be impersonated belong to.

A popup displays the URL to be used in order to impersonate the user. You can choose either to copy the URL into the clipboard (white button) or open it in a separate browser tab/window (blue button).

![](/media/articles/user-profile/signin-as-user-02.png)

> You can also use the [Impersonation API](/api/authentication#!#post--users--user_id--impersonate). The API generates a link that can be used once to log in as a specific user. To distinguish between real logins and impersonation logins, the profile of the impersonated user will contain additional `impersonated` and `impersonator` properties.

[Click here for more information on Impersonation.](/user-profile/user-impersonation)

### Blocking and unblocking a User

When you want to disable a user's access to your apps you can use the _Block User_ functionality, available via the Management Dashboard.

Navigate to the [Users](${uiURL}/#/users) page in the Management Dashboard and select the user you want to block. Click on the _Actions_ and select _Block User_ from the dropdown menu.

![](/media/articles/user-profile/block-user.png)

If a blocked user tries to access an application the error message `user is blocked` will be returned. 

To unblock the user, select the _Unblock User_ option from the same dropdown menu.

![](/media/articles/user-profile/unblock-user.png)

### Deleting a User

Using the Management Dashboard you can delete a user permanently. To do so, navigate to the [Users](${uiURL}/#/users) page in the Management Dashboard and select the user you want to delete. Click on the _Actions_ and select _Delete User_ from the dropdown menu.

![](/media/articles/user-profile/delete-user.png)

A popup warns you that the action cannot be undone and prompts for your confirmation. Once you confirm the user is deleted. 
