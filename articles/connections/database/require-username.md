---
description: How to add a username field for login to database connections.
---

# Adding Username for Database Connections

For database connections, you can have your users sign in with a username instead of their email address.

### To add a required username:

1. Go to the [Connections -> Database](${manage_url}/#/connections/database) section of the dashboard.

1. Select the connection you wish to edit by clicking on the connection name or the Settings gear icon.  
![](/media/articles/connections/database/db-connections-page.png)

1. Under **Settings**, you will see **Requires Username**, use the toggle here to enable/disable requiring a username.  
![](/media/articles/connections/database/requires-username-toggle.png)

You can see how the this will affect the login screen by clicking on **Try Connection**. You can see that once **Requires Username** is enabled, new users will have to enter a username and their email address to sign up. 

![](/media/articles/connections/database/username-lock.png)

Users can then login with either their username or their email address. For users who registered while **Requires Username** was disabled, there will be no Username field stored for them and they will have to login with their email.
