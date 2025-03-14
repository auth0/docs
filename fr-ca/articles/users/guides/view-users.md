---
description: How to view users and their profile details.
topics:
    - users
    - user-management
    - user-profiles
contentType: how-to
useCase: manage-users
---
# View Users

The [Users](${manage_url}/#/users) page lists the users who are associated with your apps. To open a particular user, click the user profile picture or name in the "Name" column. The User Details page will open and display information for that user.

The User Details page has links for five tabs:

1. Details
2. Devices
3. History
4. Locations
5. Raw JSON

## User Details: Details Tab

The Details tab contains three sections that provide a high-level overview of the information in the user's profile:

* **User Identity** provides at-a-glance details about the user, including their email address, associated Connections, and access rights.
* **Metadata** displays the `app_metadata` and `user_metadata` information. You can edit these values.
* **Identity Provider Attributes** displays the information retrieved from the authentication provider. Note that identity provider attributes are read-only.

## User Details: Devices Tab

The Devices tab lists the devices with which the user has requested authentication. Requesting authorization on a device links the device to the user's account.

Login details for the user are associated with the <dfn data-key="refresh-token">Refresh Token</dfn> assigned to that device. To revoke the Refresh Token, click **Unlink** next to the device.

## User Details: History Tab

The History tab displays a log of the user's account activity for the past 2 days.

The logs include information about:

* Events that have occurred
* When the events occurred
* The apps associated with the events
* The identity provider used for authentication
* The originating IP addresses for the events
* Where the events originated

## User Details: Locations Tab

The Locations tab displays a map with pins indicating the user's location(s) when they logged in to the apps.

## User Details: Raw JSON Tab

The Raw JSON tab displays all of the information contained on the user's profile in JSON format so you can quickly view all of the available information about the user.

## Keep reading

* [User Profile Structure](/users/references/user-profile-structure)
* [Normalized User Profiles](/users/normalized)
* [Metadata Overview](/users/concepts/overview-user-metadata)
* [View Users](/users/guides/view-users)
* [Update Users Using Your Database](/users/guides/update-user-profiles-using-your-database)
