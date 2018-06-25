---
description: Learn how to troubleshoot errors when using your database as an identity provider.
crews: crew-2
---
# Troubleshoot Errors When Using Custom Databases

Test the script using the **TRY** button. If your settings are correct you should see the resulting profile:

![Try the login script](/media/articles/connections/database/mysql/db-connection-try-ok.png)

If you do not get the expected result, or you receive an error, use `console.log`statements in your script and try the connection again. The output of `console.log` prints in the try the script window.

::: note
The [auth0-custom-db-testharness library](https://www.npmjs.com/package/auth0-custom-db-testharness) can be used to deploy, execute, and test the output of database action scripts using a Webtask sandbox environment.
:::