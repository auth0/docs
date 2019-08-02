---
title: Adding Username for Database Connections
description: How to add a username field for login to database connections.
crews: crew-2
topics:
    - connections
    - database
    - db-connections
contentType: how-to
useCase: customize-connections
---

# Adding Username for Database Connections

For database connections, you can have your users sign in with a username instead of their email address.

## Require a username

1. Go to the [Connections > Database](${manage_url}/#/connections/database) section of the dashboard.

1. Select the connection you wish to edit by clicking on the connection name or the Settings gear icon.
![Require a username](/media/articles/connections/database/requires-username-toggle.png)

1. Under **Settings**, you will see **Requires Username**, use the toggle here to enable/disable requiring a username.

![](/media/articles/connections/database/username-length.png)

You can see how the this will affect the login screen by clicking on **Try Connection**. You can see that once **Requires Username** is enabled, new users will have to enter a username and their email address to sign up.

![Lock with username](/media/articles/connections/database/lock-usernamestyle.png)

Users can then login with either their username or their email address. For users who registered while **Requires Username** was disabled, there will be no Username field stored for them and they will have to login with their email.

### Username Length

The default allowed length for usernames is between 1 and 15 characters. However, using the dashboard or via API v2, you can modify the length minimum and maximum (up to a maximum length of 128 characters).

![Username length](/media/articles/connections/database/username-length.png)

### Allowed Characters

The username field accepts the following characters:

* Alphanumeric characters (without accent marks, automatically converted to lowercase);
* The at sign (@) character (but email addresses are not allowed);
* The caret (^) character;
* The dollar sign ($) character;
* The dot (.) character;
* The exclamation (!) character;
* The grave accent (\`) character;
* The minus (-) character;
* The number sign (#) character;
* The plus (+) character;
* The single quote (') character;
* The tilde (~) character;
* The underscore (_) character;

No other characters/symbols are allowed.
