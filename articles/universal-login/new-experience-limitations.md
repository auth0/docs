---
description: New Universal Login Limitations
topics:
  - login
  - universal-login
contentType: index
toc: true
---
# New Universal Login Experience Limitations

The New Universal Login Experience currently has these limitations:

- [Home Realm Discovery](/libraries/lock/v11/selecting-the-connection-for-multiple-logins) is not available. This would allow users to login with their corporate email addresses and be redirected to their enterprise's login pages. The current implementation will add a button for each enterprise connection. This makes it not suitable for this scenario which is very common for B2B customers.

- The Signup page only lets users enter username / email / password, and does not offer the ability to prompt users to accept terms of service.

- [DUO](/multifactor-authentication/factors/duo) is not supported as an MFA factor.

- If you customize the HTML of any of the Universal Login pages, you will get pages that behave like the Classic Experience. There's no way to tweak the content of the new pages.






