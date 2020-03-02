# Enable MFA in Tenants

Enabling MFA for your tenant is a fairly straightforward process. First, you toggle on the factors you choose to enable on your tenant, such as push notifications or SMS. Next, you perform any further setup required to configure that factor, and last, you choose whether you wish to force MFA for all users or not. See the instructions below for details.

You can also [customize your MFA flow](/multifactor-authentication/custom) with [Auth0 Rules](/rules), to allow MFA to only be required in specific circumstances or force a particular factor to be used.

## 1. Enable the factors you require

In the [Dashboard > Multifactor Auth](${manage_url}/#/mfa), head to the Multifactor Auth section. Here you will find a series of toggles for the MFA factors supported by Auth0. 

![MFA Dashboard Page](/media/articles/multifactor-authentication/mfa-dashboard-1.png)

Any or all of these factors can be enabled simultaneously. When logging in the first time, the user will be shown the most secure factor available, but will be allowed to choose another factor to use if you have more than one factor enabled in the Dashboard. The SMS and the Duo factors require further setup. You will have to click on the factor and fill in a few further settings before continuing.

::: note
Duo will only be available to end-users as a factor if it is the only factor that is enabled.
:::

### Always require multi-factor authentication

![MFA Dashboard Page](/media/articles/multifactor-authentication/mfa-dashboard-2.png)

The **Always require Multi-factor Authentication** setting, when enabled, will force all your applications to prompt for MFA during the authentication flow. Users will be able to use any of the factors enabled in the Dashboard.

## 2. Set up your services

<%= include('./factors/_factors-index') %>
