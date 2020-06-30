---
description: How to setup Microsoft Office 365 custom provisioning.
topics:
  - integrations
  - microsoft
  - office-365
contentType:
  - how-to
  - concept
useCase: integrate-saas-sso
---

# Office 365 Custom Provisioning

The default Office 365 setup will include Active Directory and DirSync/Azure AD Sync Services to synchronize and provision your AD users in Azure AD for SSO. Auth0 will then be configured to be an identity provider which is providing <dfn data-key="single-sign-on">Single Sign-on (SSO)</dfn> for these users.

All of this is fine when you want SSO for your own users living in your AD. But for scenarios where you want to allow contractors, partners or even customers to access your Office 365 environment (eg: SharePoint) this approach is not optimal since these users would need to be created in your own AD environment. This is why Auth0 allows custom provisioning of Azure AD users from our rules. This would allow you to create users in Azure AD (and effectively Office 365) just as they login from any connection available in Auth0 (in that case your rule will take over DirSync's task for any type of connection where DirSync would not work). This will allow you to offer Facebook, LinkedIn, G Suite, ... logins to your Office 365 environment.

## Configuring Office 365

The [Office 365 tutorial](/integrations/office-365) explains how to register a custom domain and how to configure Office 365 as a third party application in Auth0. This step is required before custom provisioning can be configured.

## Configuring Azure AD

Custom provisioning uses the Azure AD Graph API to provision new users in Azure AD. In order to access the Azure AD Graph API an application must be created within the Azure AD Directory that has been linked to the Office 365 subscription.

1. Log into the [Azure Portal](https://portal.azure.com).
2. Choose [Azure Active Directory in the left navigation](https://portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/Overview).
3. Select **App registrations** in the new menu.
4. Click on **New application registration**.
5. Fill the form:
    1. Input a name for the application (such as `Auth0 Provisioning`)
    2. Select **Web app / API** as the **Application type**.
    3. Insert a sign-on URL. Any valid url as this won't be really used.
5. The recently created app will appear in the **App registrations** list. Select it.
6. In the **Settings** blade (Microsoft call these sections as blade), choose **Keys**.
7. Input a **Description** (like `Auth0 Provision`) and choose a **Duration** for the new key. If you choose to issue non-permanent key, take note of the expiration date and create a reminder to replace the key with a new one before it expires.
8. Click on save the key and copy the **App Key**. This key will be shown only once and it's needed for the Auth0 rule.
![Creating a key on Azure AD apps registration](/media/articles/integrations/office-365/office-365-app-key.png)
9. Choose **Required permissions** and click **Add** in the new blade.
10. Select the **Microsoft Graph** API and then check `Read and write directory data` under **Application Permissions**.
11. Back in the **Required permissions**, click on the **Grant Permissions** button and then click **Yes** to grant the requested permissions.

## Azure AD Provisioning Rule

The following rule shows the provisioning process:

 1. If the user comes from the AD connection, skip the provisioning process (because this will be handled by DirSync)
 2. If the user was already provisioned in Azure AD, just continue with the login transaction.
 3. Get an <dfn data-key="access-token">Access Token</dfn> of the Graph API using the Azure AD Client ID and Key
 4. Create a user in Azure AD
 5. Assign a license to the user.
 6. Continue with the login transaction.

The username is generated with the `createAzureADUser` function, which by default generates a username in the format `auth0-c3fb6eec-3afd-4d52-8e0a-d9f357dd19ab@fabrikamcorp.be`. You can change this to whatever you like, just make sure this value is unique for all your users.

Make sure you set the correct values for the `AUTH0_OFFICE365_CLIENT_ID`, `AAD_CUSTOM_DOMAIN`, `AAD_DOMAIN`, `AAD_APPLICATION_ID` and `AAD_APPLICATION_API_KEY` values in your [configuration object](/rules/current#use-the-configuration-object) to make the values available in your rule code.

In the code you'll also see that the rule will wait about 15 seconds after the user is provisioned. This is because it takes a few seconds before the provisioned user is available for Office 365.

```js
function (user, context, callback) {
  // Require the Node.js packages that we are going to use.
  // Check this website for a complete list of the packages available:
  // https://auth0-extensions.github.io/canirequire/
  var rp = require('request-promise');
  var uuidv4 = require('uuid');

  // The name of your Active Directory connection (if using one)
  var AUTH0_AD_CONNECTION = 'FabrikamAD';
  // The client_id of your Office 365 SSO integration
  // You can get it from the URL when editing the SSO integration,
  // it will look like
  // https://manage.auth0.com/#/externalapps/{the_client_id}/settings
  var AUTH0_OFFICE365_CLIENT_ID = configuration.AUTH0_OFFICE365_CLIENT_ID;
  // The main domain of our company.
  var YOUR_COMPANY_DOMAIN = 'mycompanyurl.com';
  // Your Azure AD domain.
  var AAD_DOMAIN = configuration.AAD_DOMAIN;
  // The Application ID generated while creating the Azure AD app.
  var AAD_APPLICATION_ID = configuration.AAD_APPLICATION_ID;
  // The generated API key for the Azure AD app.
  var AAD_APPLICATION_API_KEY = configuration.AAD_APPLICATION_API_KEY;
  // The location of the users that are going to access Microsoft products.
  var AAD_USAGE_LOCATION = 'US';
  // Azure AD doesn't recognize the user instantly, it needs a few seconds
  var AAD_USER_CREATE_DELAY = 15000;
  // The key that represents the license that we want to give the new user.
  // Take a look in the following URL for a list of the existing licenses:
  // https://gist.github.com/Lillecarl/3c4727e6dcd1334467e0
  var OFFICE365_KEY = 'O365_BUSINESS';

  // Only execute this rule for the Office 365 SSO integration.
  if (context.clientID !== AUTH0_OFFICE365_CLIENT_ID) {
    return callback(null, user, context);
  }

  // Skip custom provisioning for AD users.
  if (context.connection === AUTH0_AD_CONNECTION) {
    return callback(null, user, context);
  }

  // If the user is already provisioned on Microsoft AD, we skip
  // the rest of this rule
  user.app_metadata = user.app_metadata || {};
  if (user.app_metadata.office365Provisioned) {
    return connectWithUser();
  }

  // Global variables that we will use in the different steps while
  // provisioning a new user.
  var token;
  var userPrincipalName;
  var mailNickname = user.email.split('@')[0];
  var uuid = uuidv4.v4();
  var immutableId = new Buffer(uuid).toString('base64');
  var userId;

  // All the steps performed to provision new Microsoft AD users.
  // The definition of each function are below.
  getAzureADToken()
    .then(createAzureADUser)
    .then(getAvailableLicenses)
    .then(assignOffice365License)
    .then(saveUserMetadata)
    .then(waitCreateDelay)
    .then(connectWithUser)
    .catch(callback);

  // Requests an Access Token to interact with Windows Graph API.
  function getAzureADToken() {
    var options = {
      method: 'POST',
      url: 'https://login.windows.net/' + AAD_DOMAIN + '/oauth2/token?api-version=1.5',
      headers: {
        'Content-type': 'application/json',
        },
      json: true,
      form: {
        client_id: AAD_APPLICATION_ID,
        client_secret: AAD_APPLICATION_API_KEY,
        grant_type: 'client_credentials',
        resource: 'https://graph.windows.net'
      },
    };

    return rp(options);
  }

  // Gets the Access Token requested above and assembles a new request
  // to provision the new Microsoft AD user.
  function createAzureADUser(response) {
    token = response.access_token;
    userPrincipalName = 'auth0-' + uuid + '@' + YOUR_COMPANY_DOMAIN;

    var options = {
      url: 'https://graph.windows.net/' + AAD_DOMAIN + '/users?api-version=1.6',
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      json: true,
      body: {
        accountEnabled: true,
        displayName: user.nickname,
        mailNickname: mailNickname,
        userPrincipalName: userPrincipalName,
        passwordProfile: {
          password: immutableId,
          forceChangePasswordNextLogin: false
        },
        immutableId: immutableId,
        usageLocation: AAD_USAGE_LOCATION
      },
    };

    return rp(options);
  }

  // After provisioning the user, we issue a request to get the list
  // of available Microsoft products licenses.
  function getAvailableLicenses(response) {
    userId = response.objectId;
    var options = {
      url: 'https://graph.windows.net/' + AAD_DOMAIN + '/subscribedSkus?api-version=1.6',
      json: true,
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    };
    return rp(options);
  }

  // With the licenses list, we iterate over it to get the id (skuId) of the
  // license that we want to give to the new user (office 365 in this case).
  // We also issue a new request to the Graph API to tie the user and the
  // license together.
  function assignOffice365License(response) {
    var office365License;

    for (var i = 0; i < response.value.length; i++) {
      if (response.value[i].skuPartNumber === OFFICE365_KEY) {
        office365License = response.value[i].skuId;
        break;
      }
    }

    var options = {
      url: ' https://graph.windows.net/' + AAD_DOMAIN + '/users/' + userId + '/assignLicense?api-version=1.6',
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      json: true,
      body: {
        'addLicenses': [
          {
            'disabledPlans': [],
            'skuId': office365License
          }
        ],
        'removeLicenses': []
      }
    };
    return rp(options);
  }

  // After provisioning the user and giving a license to them, we record
  // (on Auth) that this G Suite user has already been provisioned. We
  // also record the user's principal username and immutableId to properly
  // redirect them on future logins.
  function saveUserMetadata() {
    user.app_metadata = user.app_metadata || {};

    user.app_metadata.office365Provisioned = true;
    user.app_metadata.office365UPN = userPrincipalName;
    user.app_metadata.office365ImmutableId = immutableId;

    return auth0.users.updateAppMetadata(user.user_id, user.app_metadata);
  }

  // As mentioned, Windows Graph API needs around 10 seconds to finish
  // provisioning new users (even though it returns ok straight away)
  function waitCreateDelay() {
    return new Promise(function (resolve) {
      setTimeout(function() {
        resolve();
      }, AAD_USER_CREATE_DELAY);
    });
  }

  // Adds the principal username and immutableId to the user object and ends
  // the rule.
  function connectWithUser() {
    user.upn = user.app_metadata.office365UPN;
    user.inmutableid = user.app_metadata.office365ImmutableId;
      return callback(null, user, context);
  }
}
```

::: note
This code shows the provisioning process of a new user, but you can also adapt the code to synchronize metadata of existing users.
:::

## End-user Experience

The easiest way for your external users to authenticate is by using IdP initiated login: [Using smart links or IdP initiated authentication with Office 365](https://community.office365.com/en-us/w/sso/using-smart-links-or-idp-initiated-authentication-with-office-365).

You will basically need to redirect your users to the following URL (eg: using a "smart link" like `https://office.fabrikamcorp.com`):

```
https://${account.namespace}/login?client=AUTH0_OFFICE365_CLIENT_ID&protocol=wsfed&state=&redirect_uri=&
```

::: panel AUTH0_OFFICE365_CLIENT_ID
The `AUTH0_OFFICE365_CLIENT_ID` value can be obtained from the URL when working with the Dashboard. When viewing or editing the settings for the Office 365 SSO Integration in Auth0, you will see a URL in the form of `${manage_url}/#/externalapps/${account.clientId}/settings`. The `${account.clientId}` is the value you need here.
:::

This will show them the Auth0 login page after which they'll be redirected to Office 365. It will be important to explain external users that this is the only way they can authenticate, since the Office 365 login page does not support Home Realm Discover for these external users. This also means that, when they try to open a link, they'll need to visit the smart link first before the can access the link they tried to open.

![Different connections enabled for Office 365](/media/articles/integrations/office-365/office-365-different-connections.png)

In this example Fabrikam enabled a few social accounts and a database connection for their Office 365 Third Party application in Auth0.

<%= include('./_office-365-deep-linking') %>
