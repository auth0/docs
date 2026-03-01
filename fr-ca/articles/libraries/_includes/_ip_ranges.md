### Single sign-on using IP ranges

In earlier versions of Lock, you could configure an IP range in an Active Directory/LDAP connection. You could then use that range to allow integrated Windows Authentication if the user's IP was within the range. When this was true, Lock would display a button that users could click and get redirected to the integrated authentication dialog.

![SSO With Lock 10 and Windows IP Ranges](/media/articles/libraries/lock/lock-11-windows-authentication.png)

This functionality has been removed from embedded login using Lock 11. There is no IP detection, and the user will need to type user and password in Lock. It is still available when using <dfn data-key="universal-login">Universal Login</dfn>.
