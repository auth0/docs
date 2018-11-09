---
description: Description of the User Details dashboard.
topics:
    - users
    - user-management
    - user-profiles
contentType: reference
useCase: manage-users
---

# User Details 

The [Users](${manage_url}/#/users) page lists the users who are associated with your apps. There are five tabs:

* Details
* Devices
* History
* Locations
* Raw JSON

## Details tab

The Details tab contains three sections that provide a high-level overview of the information in the user's profile:

* **User Identity** provides at-a-glance details about the user, including their email address, associated Connections, and access rights.
* **Metadata** displays the `app_metadata` and `user_metadata` information. You can edit these values.
* **Identity Provider Attributes** displays the information retrieved from the authentication provider. Note that identity provider attributes are read-only.

## Devices tab

The Devices tab lists the devices with which the user has requested authentication. Requesting authorization on a device links the device to the user's account.

Login details for the user are associated with the Refresh Token assigned to that device. To revoke the Refresh Token, click **Unlink** next to the device.

## History tab

The History tab displays a log of the user's account activity for the past 2 days.

The logs include information about:

* Events that have occurred
* When the events occurred
* The apps associated with the events
* The identity provider used for authentication
* The originating IP addresses for the events
* Where the events originated

## Locations tab

The Locations tab displays a map with pins indicating the user's location(s) when they logged in to the apps.

## Raw JSON tab

The Raw JSON tab displays all of the information contained on the user's profile in JSON format so you can quickly view all of the available information about the user.