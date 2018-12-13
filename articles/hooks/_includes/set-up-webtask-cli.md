::: panel Prerequisite: Set up the Webtask CLI

Before proceeding, you'll need to set up the Webtask CLI. You can find instructions for installing and configuring the Webtask CLI in the [Dashboard > Webtask page](${manage_url}/#/account/webtasks). 

The `wt-cli` package also includes the `auth0` binary, allowing you to use the Auth0 CLI.

![Install Webtasks Instructions](/media/articles/hooks/mgmt-dashboard-webtasks.png)

Please note that all of the examples on this page use `auth0-profile` as the name of the profile. This is the same profile name used when installing `wt-cli` and can be obtained from *Step 2* of the instructions set located on [Auth0 Management Dashboard's Webtask page](${manage_url}/#/account/webtasks).
:::

::: warning
Tenants created after **July 16, 2018** will not have access to the underlying Webtask Sandbox via the Webtask CLI. Please contact [Auth0](https://auth0.com/?contact=true) to request access.
:::