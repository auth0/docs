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

- If you customize the HTML of any of the Universal Login pages, you will get pages that behave like the Classic Experience. There's no way to tweak the content of the new pages.

- [Home Realm Discovery](/libraries/lock/v11/selecting-the-connection-for-multiple-logins) is not available. This would allow users to login with their corporate email addresses and be redirected to their enterprise's login pages. The current implementation will add a button for each enterprise connection. This makes it not suitable for this scenario which is very common for B2B customers.

- The Signup page only lets users enter username / email / password, and does not offer the ability to prompt users to accept terms of service.

- In order to be able to use [DUO](/multifactor-authentication/factors/duo) as an MFA factor, it needs to be the only factor enabled. It will render the same pages as in the Classic Experience.

- [Passwordless login](/connections/passwordless) is not supported.

- [MFA Enrollment Tickets](/multifactor-authentication/developer/custom-enrollment-ticket) will keep using the Classic Experience even when the New Experience is enabled.

## Known Bugs

- If you specify the name of a Database Connection in the `connection` parameter to  `/authorize`, the login page will also show the enabled social connections.
