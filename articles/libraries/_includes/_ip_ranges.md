### Single Sign On Using IP Ranges

In earlier versions of Lock, you could configure an IP range in an Active Directory/LDAP connection. You could then use that range to allow integrated Windows Authentication if the user's IP was within the range. When this was true, Lock would display a button enabling SSO for that user as shown below.

![SSO With Lock 10 and Windows IP Ranges](/media/articles/libraries/lock/lock-11-windows-authentication.png)

This functionality has been removed from Lock 11. There is no IP detection and the user will get redirected to the Active Directory login page where they will have to type in their credentials. It will still be available when using centralized login.