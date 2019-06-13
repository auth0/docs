---
description: How to integrate with SharePoint 2010/2013, including setup, troubleshooting, acessing logs and next steps.
topics:
  - integrations
  - sharepoint
contentType: how-to
useCase: integrate-saas-sso
---

# SharePoint 2010/2013 Integration

Auth0 can help to radically simplify the authentication process for SharePoint. In this tutorial, you'll learn how to add Single Sign On (SSO) to Sharepoint using Auth0. Your users will be able to log in using any of our [Social Identity Providers](/identityproviders) (Facebook, Twitter, Github, and so on), [Enterprise Providers](/identityproviders) (LDAP, Active Directory, ADFS, and so on) or with a username and password.

## Setup

### 1. Adding the Integration to your account

The first thing you need to do is go to the [SSO Integrations](${manage_url}/#/externalapps/create) section in the Dashboard and choose **SharePoint** from the list of apps.

![Create a new SSO Integration](/media/articles/integrations/sharepoint/sharepoint-new-sso.png)

### 2. Follow the Live Documentation

::: note
If your SharePoint server does not have Internet access, you will need to download the installation files to a SharePoint server manually ([Learn more about offline installation](https://github.com/auth0/auth0-sharepoint/tree/master/auth0-authentication-provider#offline-installation)).
:::

On the **Settings** tab you'll need to enter the URL of the SharePoint Web Application and the external URL (typically the internet endpoint in your Alternate Access Mappings).

![Tutorial](/media/articles/integrations/sharepoint/sharepoint-app-tutorial.png)

The Live Documentation will first start with the installation of the Auth0 CmdLets for SharePoint:

![Auth0 CmdLets for SharePoint](/media/articles/integrations/sharepoint/sharepoint-cmdlets-installation.png)

Once these have been installed you'll be able to enable/disable Auth0 and the Claims Provider for the different Web Applications. You will need to enable authentication with Auth0:

![Auth0 Authentication for SharePoint](/media/articles/integrations/sharepoint/sharepoint-auth-installation.png)

And then install the Claims Provider, to make sure that the People Picker and permissions work correctly:

![Claims Provider for SharePoint](/media/articles/integrations/sharepoint/sharepoint-cp-installation.png)

Once these scripts have been executed you'll complete the configuration in Central Administration:

![Central Administration](/media/articles/integrations/sharepoint/sharepoint-central-admin.png)

Note that the call to `Enable-Auth0` can be adapted to:

 - Change the unique identifier for users (such as email or a user id)
 - Allow additional claims to be passed through to SharePoint
 - Enable or disable the default Windows Authentication

The following example also adds the Role claim to the claims mapping and allows Windows Authentication:

```
Enable-Auth0
  -auth0Domain:"fabrikam.auth0.com"
  -clientId:"bOFty3tWgpijnwMcltysNFqHgO1ziz1I"
  -webAppUrl:"http://fabrikam-sp/"
  -identifierClaimType:"http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
  -claims:@(
    "Email|http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress",
    "Role|http://schemas.microsoft.com/ws/2008/06/identity/claims/role", "Client ID|http://schemas.auth0.com/clientID",
    "Given Name|http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname",
    "Surname|http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname", "Picture|http://schemas.auth0.com/picture")
  -allowWindowsAuth
```

### 3. You now have Sharepoint configured

You have configured SharePoint to use Auth0 as the SSO broker. When your users visit your site they'll be presented with a login page showing all the connections enabled for that application.

![SharePoint Login Page](/media/articles/integrations/sharepoint/sharepoint-login-page.png)

Depending on which claims have been mapped when installing the claims provider this additional information will also be available in the user's personal settings page:

![SharePoint User Info](/media/articles/integrations/sharepoint/sharepoint-user-info.png)

## Customizing the Login Page

You can customize the login page by following the instructions in the [documentation on customizing the login page](/hosted-pages/login#how-to-customize-your-login-page).

You might wish to provide a way to let users authenticate with Sharepoint using Windows Authentication, bypassing Auth0. You can do that by customizing the login page, adding a link to the Windows Authentication endpoint (usually similar to `https://yoursharepointserver/_windows/default.aspx?ReturnUrl=/_layouts/15/Authenticate.aspx`).

On way of doing it is by using jQuery to modify the Lock widget and add a link to the Windows Authentication endpoint.

You need to add a reference to jQuery at the top of the `<body>` section of the customized login page.

```js
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
```

Before calling `lock.show()`, add code to modify the HTML DOM that adds the link.

```js
// construct Lock
// var lock = ...
[...]
// One or more SharePoint client IDs here for which you want
// a Windows Auth button
var sharepointClientIDs = ['your_sharepoint_client_id'];

if (sharepointClientIDs.indexOf(config.clientID) >= 0) {
  lock.on('signin ready', function() { 
    var getParameterByName = function(name) {
      name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
      var regexS = "[\\?&]" + name + "=([^&#]*)";
      var regex = new RegExp(regexS);
      var results = regex.exec(window.location.search);
      if (results == null) return null;
      else return results[1];
    };
    // get the host from the callback URL
    var parser = document.createElement('a');
    parser.href = config.callbackURL;
    var host = parser.host;
    var windowsAuthURL = "https://" + host + "/_windows/default.aspx?ReturnUrl=/_layouts/15/Authenticate.aspx";
    var wctx = getParameterByName("wctx");
    if (wctx) {
      windowsAuthURL += "&Source=" + wctx;
    }

    $('.auth0-lock-tabs-container') 
    .after('<div><p class="auth0-lock-alternative" style="padding:5px 0;">' + 
      '<a class="auth0-lock-alternative-link" ' + 
      'href="'+ windowsAuthURL + '">' + 
      'Login with Windows Authentication!!!</a>' + 
      '</p><p><span>or</span></p></div>').attr('href','https://nowhere');
  });
}

lock.show();
```

![SharePoint Login Page Windows Auth](/media/articles/integrations/sharepoint/sharepoint-login-page-windows-auth.png)

## Troubleshooting

When working with additional claims and authorization it can always be useful to view the claims for the current user. [Liam Clearly](https://www.helloitsliam.com)'s [Claims Viewer Web Part](https://sharepointobservations.wordpress.com/2013/08/21/sharepoint-2013-and-adfs-2-0-test-with-claims-viewer-web-part/) can be used to troubleshoot any issues with the user's claims:

![Claims Webpart](/media/articles/integrations/sharepoint/sharepoint-claims-webpart.png)

### Logs in SP2010

Errors and warnings are logged to SharePoint's Unified Logging Service and tools like the [ULS Viewer](http://www.microsoft.com/en-us/download/details.aspx?id=44020) can be used to troubleshoot any issues you might have when using the Claims Provider.

![ULS](/media/articles/integrations/sharepoint/sharepoint-uls-logs.png)

### Logs in SP2013

For SharePoint 2013 we no longer use the Unified Logging Service for our logs, but we've moved to Event Tracing for Windows instead. This delivers more performance and gives you multiple ways of capturing all the logged events.

To view the logs in real-time you can download [the Logs Processor](https://github.com/auth0/auth0-sharepoint/releases). Run this tool on your SharePoint Server(s) to see every call SharePoint is making to the Claims Provider:

![ETW](/media/articles/integrations/sharepoint/sharepoint-logs-real-time.png)

## Next Steps

### Authorization

The claims being passed through from Auth0 can also be used for authorization in SharePoint. For example, a user with the Role claim containing **Fabrikam HR** should have access or be a Contributor on a specific site.

Let's take Azure AD as an example. In this Cloud Directory users can be part of groups and David is part of Fabrikam HR.

![Azure AD Group Member](/media/articles/integrations/sharepoint/sharepoint-group-member.png)

When David logs in using his Azure AD account (and the Security Groups attribute is enabled for that connection) the group memberships will be stored in the `groups` attribute of the user's profile.

![User Groups](/media/articles/integrations/sharepoint/sharepoint-profile-groups.png)

If we want to make these groups available as Roles in SharePoint we'll need to write a [Rule](${manage_url}/#/rules) that adds this to the SAML configuration. This rule will only run for the application named **Fabrikam Intranet (SharePoint)**.

```
function (user, context, callback) {
  if (context.clientName === 'Fabrikam Intranet (SharePoint)') {
    context.samlConfiguration.mappings = {
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier': 'user_id',
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress': 'email',
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name': 'name',
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname': 'given_name',
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname': 'family_name',
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/upn': 'upn',
        'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': 'groups'
    };
  }

  callback(null, user, context);
}
```

This will add an additional outgoing claim `http://schemas.microsoft.com/ws/2008/06/identity/claims/role` containing the `groups` and which will be used by SharePoint for authorization.

When installing the Claims Provider we need to allow the Role claim to be passed through to SharePoint, by adding it to the claims mapping list:

```
Enable-Auth0
  -auth0Domain:"fabrikam.auth0.com"
  ...
  -claims:@(
    "Email|http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress",
    "Role|http://schemas.microsoft.com/ws/2008/06/identity/claims/role",
    ...)
  ...
  -Verbose
```

By default a user won't have access to the site:

![Access Denied](/media/articles/integrations/sharepoint/sharepoint-no-access.png)

Now instead of adding that specific user to a SharePoint Group (eg: Contributors) we can now add a **Role** to a SharePoint Group. Here's a sample PowerShell script that shows how to add "Fabrikam HR" members to the Contributors group:

```
$webName = "http://fabrikam-sp"
$groupName = "Contributors"
$roleClaim = "Fabrikam HR"

$sts = Get-SPTrustedIdentityTokenIssuer "Auth0"
$claimPrincipal = New-SPClaimsPrincipal -ClaimValue $roleClaim -ClaimType "http://schemas.microsoft.com/ws/2008/06/identity/claims/role" -TrustedIdentityTokenIssuer $sts

$web = Get-SPWeb $webName
$user = New-SPUser -UserAlias $claimPrincipal.ToEncodedString() -Web $web

$group = $web.SiteGroups[$groupName]
$group.AddUser($user)
```

After adding this claim value to the Contributors group David will be able to access the site and edit its contents.

### User Profile Synchronization

By default SharePoint is able to synchronize user profile information originating from Active Directory. Now with Auth0 users can come from different types of connections (from social to enterprise) which will require a different approach to synchronize user profiles.

A first approach would be to create a timer job that runs every few hours, queries the Auth0 Users Endpoint and synchronizes the profile information for those users.

```cs
using System;

using Microsoft.SharePoint;
using Microsoft.SharePoint.Administration;

using Microsoft.Office.Server;
using Microsoft.Office.Server.UserProfiles;

namespace UserProfileSync
{
    class Program
    {
        static void Main(string[] args)
        {
            // Call the Auth0 Management API - https://docs.auth0.com/api/v2

            using (var site = new SPSite("http://servername"))
            {
                var context = SPServiceContext.GetContext(site);
                var profileManager = new UserProfileManager(context);

                var accountName = "i:05.t|auth0|john@example.org";
                var userProfile = profileManager.GetUserProfile(accountName);
                userProfile[PropertyConstants.HomePhone].Value = "+1 594 9392";
                userProfile.Commit();
            }
        }
    }
}
```

Alternatively this logic could also be implemented as an HttpModule which runs each time the user logs in:

```cs
public class PersistUserClaimsHttpModule : IHttpModule
{
    private SPFederationAuthenticationModule FederationModule
    {
        get { return HttpContext.Current.ApplicationInstance.Modules["FederatedAuthentication"] as SPFederationAuthenticationModule; }   
    }

    public void Init(HttpApplication context)
    {
        FederationModule.SecurityTokenValidated += OnFederationSecurityTokenValidated;
    }

    private void OnFederationSecurityTokenValidated(object sender, SecurityTokenValidatedEventArgs e)
    {
        // Use e.ClaimsPrincipal
    }
}
```
