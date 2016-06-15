# Duo for Administrators

## Enabling Duo for MFA

To turn on Duo for two-step verification, first visit the [Multifactor Auth](${uiURL}/#/guardian) page from the dashboard. Then click on the link to use a different provider.

![](/media/articles/mfa/change-provider.png)

Then you can use the slider to turn on Duo.

![](/media/articles/mfa/toggle-duo.png)

::: panel-info Note
If you enable Duo while using another provider for MFA, all other providers will be disabled. All customizations and enrolled users in other MFA will be lost. Be careful as this action cannot be reverted.
:::

### Customize Duo 

After you toggle the slider to enable using Duo, a portal displays a code editing textbox containing the following code snippet for you to use:

```JS
function (user, context, callback) {

  var CLIENTS_WITH_MFA = ['{REPLACE_WITH_YOUR_CLIENT_ID}'];
  // run only for the specified clients
  if (CLIENTS_WITH_MFA.indexOf(context.clientID) !== -1) {
    // uncomment the following if clause in case you want to request a second factor only from user's that have user_metadata.use_mfa === true
    // if (user.user_metadata && user.user_metadata.use_mfa){
      context.multifactor = {
        //required
        provider: 'duo',
        ikey: 'DIXBMN...LZO8IOS8',
        skey: 'nZLxq8GK7....saKCOLPnh',
        host: 'api-3....049.duosecurity.com',

        // optional. Force DuoSecurity everytime this rule runs. Defaults to false. if accepted by users the cookie lasts for 30 days (this cannot be changed)
        ignoreCookie: true,

        // optional. Use some attribute of the profile as the username in DuoSecurity. This is also useful if you already have your users enrolled in Duo.
        // username: user.nickname,

        // optional. Admin credentials. If you provide an Admin SDK type of credentials. auth0 will update the realname and email in DuoSecurity.
        // admin: {
        //  ikey: 'DIAN...NV6UM',
        //  skey: 'YL8OVzvoeeh...I1uiYrKoHvuzHnSRj'
        // },
      };
    // }
  }

  callback(null, user, context);
}
```

#### Changing the Required Fields

Required fields that you **must** replace to use Duo are: `ikey`, `skey` and `host`. 

1. To get these fields first [login to your Duo account](https://admin.duosecurity.com/login).

2. Click on the **Applications** section from the sidebar.

3. Then click on the button to **Protect an Application**.

4. Find the **Auth API** option from the list and then click **Protect this Application**.

5. Then you will be brought to the **Auth API** page under your Appications, you should see a **Details** section.

6. Under the **Details** section you will see: 

* **Integration key** - use this for your `ikey` field
* **Secret key** - use this for your `skey` field
* **API hostname**  - use this for your `host` field

Replace the three fields in the code snippet. For more details about editing the other parts of this code snippet, [see Duo for Developers](/multifactor-authentication/duo/dev-guide#other-customizations).

When you have finished editing the code snippet based on the requirements of your app, click **Save**.

## Editing a User's Settings

If you need to change the settings for logging in with Duo for one of your users or if a user has lost their mobile device, you will need to edit User setting on the Duo site.

1. Visit [Duo.com](https://duo.com/) and login to your account.
2. Click **Users** from the sidebar.
3. Find the desired user and click their username.
4. From a User page you can edit their settings.

## Disabling Duo

Duo can be disabled from the [Multifactor Auth](${uiURL}/#/guardian) section of the dashboard then by clicking the link to use a different provider. 

![](/media/articles/mfa/change-provider.png)

Toggle the slider button to disable Duo, then a confirmation popup will appear.

By disabling Duo you will lose all customizations, but your previously enrolled users will still be visible in your Duo settings.

