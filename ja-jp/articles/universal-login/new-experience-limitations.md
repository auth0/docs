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

- You can create [Page Templates](/universal-login/page-templates) to customize the universal login flow UI, but you can't create a completely custom UI. If you want to do that, you need to customize the HTML pages for each prompt (Login / Password Reset / MFA), where by default you will get pages that behave like the Classic Experience. 

- [Identifier-First login](/universal-login/identifier-first) is not available. This would allow users to login with their corporate email addresses and be redirected to their enterprise's login pages. The current implementation will add a button for each enterprise connection. This makes it not suitable for this scenario which is very common for B2B customers.

- [Kerberos](/connector/kerberos) for AD/LDAP connections is not supported. Users will still be able to type their credentials to log in using an AD/LDAP connection, but only if:
  - the username is in email format.
  - there are no other database connections enabled.

- The Signup page only lets users enter username / email / password, and does not offer the ability to prompt users to accept terms of service.

- You cannot specify additional fields to have the user fill out in the signup page. Users can only sign up with username, email and password. If you need to capture additional data, you will need to do it after signup, from within your application (such as with [progressive profiling](/users/concepts/overview-progressive-profiling)).

- In order to be able to use [DUO](/mfa/guides/configure-cisco-duo) as an MFA factor, it needs to be the only factor enabled. It will render the same pages as in the Classic Experience.

- <dfn data-key="passwordless">[Passwordless login](/connections/passwordless)</dfn> is not supported.

- [MFA Enrollment Tickets](/mfa/guides/guardian/create-enrollment-ticket) will keep using the Classic Experience even when the New Experience is enabled.

- When starting password reset by a call to the Management API password change endpoint, the password reset UI doesn't grant the user the option to click a button to redirect after the password change is complete (when using the New Universal Login Experience).
