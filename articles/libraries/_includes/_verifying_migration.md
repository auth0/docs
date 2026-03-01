### Verifying your migration

Once you have migrated your codebase, you should no longer see [deprecation notes in your logs](/troubleshoot/guides/check-deprecation-errors).

If you would like to be sure that your applications are no longer calling the legacy endpoints, you can go to the [Dashboard](${manage_url}/#/tenant/advanced) under **Tenant Settings > Advanced** then scroll down to **Migrations** and toggle off the Legacy Lock API switch. Turning off this switch will disable the deprecated Lock / Auth0.js endpoints for your tenant, preventing them from being used at all.

![Legacy Lock API](/media/articles/libraries/lock/migration-toggles.png)

After disabling this switch, if the Legacy Lock API errors in your logs do not clear up or if turning it off results in failed logins, this is a sign that you have yet to completely remove all instances of legacy code from your applications.

Once migrations have been successfully performed in production environments, the switch can be toggled off and left off, to ensure that the deprecated features can no longer be used.

