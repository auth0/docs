---
description: How to setup Microsoft Office 365 custom provisioning.
---

# Office 365 Custom Provisioning

The default Office 365 setup will include Active Directory and DirSync/Azure AD Sync Services to synchronize and provision your AD users in Azure AD for SSO. Auth0 will then be configured to be an identity provider which is providing SSO for these users.

All of this is fine when you want SSO for your own users living in your AD. But for scenarios where you want to allow contractors, partners or even customers to access your Office 365 environment (eg: SharePoint) this approach is not optimal since these users would need to be created in your own AD environment. This is why Auth0 allows custom provisioning of Azure AD users from our rules. This would allow you to create users in Azure AD (and effectively Office 365) just as they login from any connection available in Auth0 (in that case your rule will take over DirSync's task for any type of connection where DirSync would not work). This will allow you to offer Facebook, LinkedIn, Google Apps, ... logins to your Office 365 environment.

## Configuring Office 365

The [Office 365 tutorial](/integrations/office-365) explains how to register a custom domain and how to configure Office 365 as a third party application in Auth0. This step is required before custom provisioning can be configured.

## Configuring Azure AD

Custom provisioning uses the Azure AD Graph API to provision new users in Azure AD. In order to access the Azure AD Graph API an application must be created within the Azure AD Directory that has been linked to the Office 365 subscription.

Go to [the Azure Management Portal](https://manage.windowsazure.com/@auth0testenv.onmicrosoft.com#Workspaces/ActiveDirectoryExtension) and create a new application in your Azure AD Directory:

![Create Azure AD Application](/media/articles/integrations/office-365/office-365-create-app.png)

Choose **Add an application my organization is developing**, give it a name (eg: **Auth0 Provisioning**). For the Sign-On Url and App ID Url any value will do (eg: **http://mycompany.com/auth0-provision**).

On the **Configure** tab of the application you will be able to generate a new key. The Client ID and the key on this page will give you access to the Graph API:

![Azure AD Client ID and Key](/media/articles/integrations/office-365/office-365-app-key.png)

> Note: They key generated here is valid for 1 or 2 years. Make sure you generate a new key before it expires and you update it in Auth0 accordingly.

The final step in the Azure AD configuration is to give the required permissions to the application. Under **Application Permissions** (at the bottom of the page) you will need to choose **Read and write directory data**. This will allow your application to create new users in Azure AD.

## Azure AD Provisioning Rule

The following rule shows the provisioning process:

 1. If the user comes from the AD connection, skip the provisioning process (because this will be handled by DirSync)
 2. If the user was already provisioned in Azure AD, just continue with the login transaction.
 3. Get an access token of the Graph API using the Azure AD Client ID and Key
 4. Create a user in Azure AD
 5. Continue with the login transaction.
 
The username is generated with the `AAD_USERNAME_GENERATOR` function, which by default generates a username in the format `auth0-c3fb6eec-3afd-4d52-8e0a-d9f357dd19ab@fabrikamcorp.be`. You can change this to whatever you like, just make sure this value is unique for all your users.

In the code you'll also see that the rule will wait about 15 seconds after the user is provisioned. This is because it takes a few seconds before the provisioned user is available for Office 365.

```js
function (user, context, callback) {

  var AUTH0_AD_CONNECTION = 'FabrikamAD';
  var AUTH0_OFFICE365_CLIENTID = 'CLIENT_ID_OF_MY_THIRD_PARTY_APP_IN_AUTH0';
  
  var AAD_CUSTOM_DOMAIN = 'fabrikamcorp.be';
  var AAD_TENANT_NAME = 'fabrikamcorp365.onmicrosoft.com';
  var AAD_CLIENT_ID = 'AZURE_AD_CLIENT_ID';
  var AAD_CLIENT_SECRET = 'AZURE_AD_CLIENT_SECRET';
  // https://go.microsoft.com/fwLink/?LinkID=335775&clcid=0x409
  var AAD_USAGE_LOCATION = 'US';
  var AAD_USER_CREATE_WAIT = 15000;
  var AAD_USERNAME_GENERATOR = function() {
    
    // Will generate something like: 
    // auth0-c3fb6eec-3afd-4d52-8e0a-d9f357dd19ab@fabrikamcorp.be
    var uuid = require('node-uuid').v4();
    return 'auth0-' + uuid + '@' + AAD_CUSTOM_DOMAIN;
  };
  
  // Skip custom provisioning for AD users.
  if (context.connection === AUTH0_AD_CONNECTION) { 
    return callback(null, user, context);
  }

  if (context.clientID === AUTH0_OFFICE365_CLIENTID) { 
    // Check if the user was already provisioned.
    user.app_metadata = user.app_metadata || {};
    if (user.app_metadata.office365_provisioned) return continue_with_azuread_user();

    // Generate a new uuid.
    var uuid = require('node-uuid').v4();
    var immutable_id = guid_to_base64(uuid);

    // Log context.
    console.log('Preparing user provisioning:');
    console.log(' > uuid:', uuid);
    console.log(' > immutable_id:', immutable_id);

    // Get the token.
    get_azuread_token(function(err, token) {
      if (err) return callback(err);

      var context = {
        displayName: user.nickname,
        mailNickname: user.email.split('@')[0],
        userPrincipalName: 'auth0-' + uuid + '@' + AAD_CUSTOM_DOMAIN,
        uuid: uuid,
        immutableId: immutable_id
      };

      // Create the user.
      provision_azuread_user(token, context, function(err) {
        if (err) return callback(err);

        console.log('Done! Storing info in user profile.');

        // Update the user.
        user.app_metadata.office365_provisioned = true;
        user.app_metadata.office365_upn = context.userPrincipalName;
        user.app_metadata.office365_immutable_id = context.immutableId;
        auth0.users.updateAppMetadata(user.user_id, user.app_metadata)
        .then(function() {
          // Wait a little bit, it takes some time before the user is created.
          setTimeout(function() {
            return continue_with_azuread_user();
          }, AAD_USER_CREATE_WAIT);
        })
        .catch(function(err) {
          console.log('Error updating user profile:', err);
          return callback(err);
        });
      });
    });
  }
  else {
    return callback(null, user, context);
  }

  /*
   * Continue the login...
   */
  function continue_with_azuread_user() {
    user.app_metadata = user.app_metadata || {};
    user.upn = user.app_metadata.office365_upn;
    user.inmutableid = user.app_metadata.office365_immutable_id;
    console.log('Logging in user:', {
      upn: user.upn,
      immutable_id: user.inmutableid
    });
    return callback(null, user, context);
  }

  /*
   * Create the user in Azure AD.
   */
  function provision_azuread_user(token, context, cb) {
    var options = {
      url: 'https://graph.windows.net/' + AAD_TENANT_NAME + 
              '/users?api-version=1.5',
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      json: true,
      body: {
        /*
         * Additional properties are documented here (like license assignment)
         * https://msdn.microsoft.com/Library/Azure/Ad/Graph/api/entity-and-complex-type-reference#EntityreferenceUserEntity
         */
        accountEnabled: true,
        displayName: context.displayName,
        mailNickname: context.mailNickname,
        userPrincipalName: context.userPrincipalName,
        passwordProfile: {
          password: context.uuid,
          forceChangePasswordNextLogin: false
        },
        immutableId: context.immutableId,
        usageLocation: AAD_USAGE_LOCATION
      },
    };

    console.log('Creating user in Azure AD:', options.body);
    request.post(options, function(err, res, body) {
      if(err) { 
        console.log('Error creating user in Azure AD.', err);
        return cb(err);
      }

      if (body.error) {
        console.log('Error creating user in Azure AD.', body.error_description);
        return cb(new Error(body.error_description));
      }

      console.log('User created!');
      return cb(null);
    }); 
  }

  /*
   * Get the token for Azure AD.
   */
  function get_azuread_token(cb) {
    var options = {
      url: 'https://login.windows.net/' + AAD_TENANT_NAME + 
              '/oauth2/token?api-version=1.5',
      headers: {
        'Content-type': 'application/json',
      },
      json: true,
      form: {
        client_id: AAD_CLIENT_ID,
        client_secret: AAD_CLIENT_SECRET,
        grant_type: 'client_credentials',
        resource: 'https://graph.windows.net'
      },
    };

    console.log('Getting token for Azure AD...');
    request.post(options, function(err, res, body) {
      if(err) { 
        console.log('Error getting token for Azure AD.', err);
        return cb(err);
      }

      if (body.error) {
        console.log('Error getting token for Azure AD.', body.error_description);
        return cb(new Error(body.error_description));
      }

      console.log('Token received:', body.access_token);
      return cb(null, body.access_token);
    }); 
  }

  /*
   * Create the actual immutable id.
   */
  function guid_to_base64(g) {
    var le = true;
    var hexlist = '0123456789abcdef';
    var b64list = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    var s = g.replace(/[^0-9a-f]/ig, '').toLowerCase();
    if (s.length !== 32) return '';

    if (le) s = s.slice(6, 8) + s.slice(4, 6) + s.slice(2, 4) + s.slice(0, 2) +
      s.slice(10, 12) + s.slice(8, 10) +
      s.slice(14, 16) + s.slice(12, 14) +
      s.slice(16);
    s += '0';

    var a, p, q;
    var r = '';
    var i = 0;

    while (i < 33) {
      a = (hexlist.indexOf(s.charAt(i++)) << 8) |
        (hexlist.indexOf(s.charAt(i++)) << 4) |
        (hexlist.indexOf(s.charAt(i++)));
      p = a >> 6;
      q = a & 63;

      r += b64list.charAt(p) + b64list.charAt(q);
    }
    r += '==';

    return r;
  }
}
```

> Note: this code shows the provisioning process of a new user, but you can also adapt the code to synchronise metadata of existing users.

## End-user Experience

The easiest way for your external users to authenticate is by using IdP initiated login: [Using smart links or IdP initiated authentication with Office 365](https://community.office365.com/en-us/w/sso/using-smart-links-or-idp-initiated-authentication-with-office-365).

You will basically need to redirect your users to the following URL (eg: using a "smart link" like `https://office.fabrikamcorp.com`):

```
https://@@account.namespace@@.auth0.com/login?client=CLIENT_ID_OF_THIRD_PARTY_APP&protocol=wsfed&state=&redirect_uri=&
```

> Note: the `CLIENT_ID_OF_THIRD_PARTY_APP` value can be obtained from the URL when working with the Dashboard. When viewing or editing the settings for the Office 365 SSO Integration in Auth0, you will see an URL in the form of `https://{account}.auth0.com/#/externalapps/{client_id}/settings`. The `{client_id}` is the value you need here.

This will show them the Auth0 login page after which they'll be redirected to Office 365. It will be important to explain external users that this is the only way they can authenticate, since the Office 365 login page does not support Home Realm Discover for these external users. This also means that, when they try to open a link, they'll need to visit the smart link first before the can access the link they tried to open.

![Different connections enabled for Office 365](/media/articles/integrations/office-365/office-365-different-connections.png)

In this example Fabrikam enabled a few social accounts and a database connection for their Office 365 Third Party application in Auth0.

<%= include('./_office-365-deep-linking') %>
