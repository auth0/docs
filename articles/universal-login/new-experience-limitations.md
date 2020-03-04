---
description: New Universal Login Limitations
topics:
  - login
  - universal-login
contentType: index
toc: true
---
# New Universal Login Experience Limitations

The New <dfn data-key="universal-login">Universal Login</dfn> Experience currently has these limitations:

- If you customize the HTML of any of the Universal Login pages, you will get pages that behave like the Classic Experience. There's no way to tweak the content of the new pages.

- [Identifier-First login](/universal-login/identifier-first) is not available. This would allow users to login with their corporate email addresses and be redirected to their enterprise's login pages. The current implementation will add a button for each enterprise connection. This makes it not suitable for this scenario which is very common for B2B customers.

- [Kerberos](/connector/kerberos) for AD/LDAP connections is not supported. Users will still be able to type their credentials to log in using an AD/LDAP connection, but only if:
  - the username is in email format.
  - there are no other database connections enabled.

- The Signup page only lets users enter username / email / password, and does not offer the ability to prompt users to accept terms of service.

- In order to be able to use [DUO](/multifactor-authentication/factors/duo) as an MFA factor, it needs to be the only factor enabled. It will render the same pages as in the Classic Experience.

- <dfn data-key="passwordless">[Passwordless login](/connections/passwordless)</dfn> is not supported.

- [MFA Enrollment Tickets](/multifactor-authentication/developer/custom-enrollment-ticket) will keep using the Classic Experience even when the New Experience is enabled.

- When starting password reset by a call to the Management API password change endpoint, the password reset UI doesn't grant the user the option to click a button to redirect after the password change is complete (when using the New Universal Login Experience).

