---
description: How to build a multi-tenant SaaS application with Azure AD and Auth0.
toc: true
---

# Build Multi-tenant SaaS Apps with Azure Active Directory

Azure Active Directory (AD) is often used as a user directory for Office 365, Intune, Dynamics CRM, and possibly applications you're building for the users that are a part of your organization.

![](/media/articles/scenarios/multi-tenant-saas-azure-ad/azure-ad-mt-single-tenant-example.png)

When creating an Active Directory for your organization, users in your organization's directory (contoso.onmicrosoft.com) can access the apps you register to your directory (Contoso Intranet and Office 365). This is how the [standard integration with Auth0 works](/waad-clientid): you create an application in Azure AD that points to Auth0, where you can then create an Azure AD Connection in the [Dashboard](${manage_url}).  

A more advanced concept in Azure AD is the support for multi-tenant applications. This is where your directory can define an application (typically a SaaS application) which can be used by other directories (your customers).

![](/media/articles/scenarios/multi-tenant-saas-azure-ad/azure-ad-multi-tenant-example.png)

In this example, Fabrikam Corporation is an ISV hosting Timesheet SaaS applications. They have been using Auth0 to make sure customers can login with their Facebook, Google, LinkedIn, and other Social accounts. Now they want to extend this support and provide SSO to organizations which are using Azure AD or Office 365. For Fabrikam Corporation, this can be a great way to attract new customers because they can offer SSO to thousands of companies already using Azure AD/Office 365 with just a few clicks.

Contoso is one of their new customers which have signed up with their Azure AD. Users in this directory will now have SSO to Fabrikam's Timesheet SaaS and will be able to use their existing Contoso credentials after going through a simple consent flow.

This document will cover:

* How Fabrikam can create a multi-tenant Azure AD application
* How Fabrikam will integrate with Auth0
* What the end user's experience will be when signing up for the application

::: note
You can get a copy of the sample application we build in this article from [GitHub](https://github.com/auth0/auth0-azuread-multi-tenant-apps-sample).
:::

## Prerequisites

Before you can create a multi-tenant application in Azure AD you'll need a Microsoft Azure subscription and a domain name (like fabrikamcorp.com).

## Create a Client in Auth0

We'll start by creating a Client in Auth0 where we define the Allowed Callback URLs for our application. In this example, we're building an ASP.NET MVC application that runs locally and in Azure Web Sites, but remember that this scenario works with any technology and any hosting platform.

![](/media/articles/scenarios/multi-tenant-saas-azure-ad/azuread-mt-new-a0-app.png)

## Creating an application in Azure AD

The first thing Fabrikam will do is create a new directory in Azure AD if don't have one already.

![](/media/articles/scenarios/multi-tenant-saas-azure-ad/azuread-mt-create-directory.png)

The final application will run on https://timesheets.fabrikamcorp.com, so we'll need to register `fabrikamcorp.com` as the domain.

On the *Domains* tab, you can create a new domain:

![](/media/articles/scenarios/multi-tenant-saas-azure-ad/azuread-mt-domain-name.png)

Microsoft requires you to add a TXT/MX record (as described on the setup page itself) and verify your domain.

![](/media/articles/scenarios/multi-tenant-saas-azure-ad/azuread-mt-domain-verified.png)

DNS propagation can take some time, so if you see the "could not verify domain" error, check again at at a later point in time. You can use sites like [What's My DNS](http://www.whatsmydns.net) to follow up on the DNS propagation of your domain.

The next step will be to create a new Application in your Directory.

![](/media/articles/scenarios/multi-tenant-saas-azure-ad/azuread-mt-new-app.png)

![](/media/articles/scenarios/multi-tenant-saas-azure-ad/azuread-mt-new-app-name.png)

The **Sign-On URL** is the url of your application that users will see when adding the application to their directory (in the consent flow).

The **App ID URI** is the unique identifier for your application (next to the Client ID) and must match a domain you registered under domains.

Once the application has been created, we'll need to enable it for multi-tenancy, generate a key, and configure the callback urls. You'll have 2 types of callback urls: the callback url for Auth0's login endpoint and the callback url for the consent flow.

When new customers sign up with their Azure AD directory, the consent flow redirects them back to your application afterwards.

![](/media/articles/scenarios/multi-tenant-saas-azure-ad/azuread-mt-app-config.png)

The final step is to configure the permissions for the application.

The first option for doing this is to ask for the 'Read directory data' and 'Enable SSO' permissions. Enabling these options will allow you to get more information about the user and the directory using the [Azure AD Graph API](https://msdn.microsoft.com/en-us/library/azure/hh974476.aspx). This is really useful if you want to access additional information about the user like the groups to which the user belongs. Typically, only administrators may grant this type of consent.

The second option is to only ask for the 'Enable SSO' permission, which is the option we show in this example. By doing this, even regular users can go through the consent flow. This allows you to reach even more users because:

- Organization administrators will be able to give consent for the whole directory (all users in the directory will be able to access the application)
- Regular users will be able to give consent just for their own. This enables single users to sign up for your application and have SSO, even if this user is the only person in the organization using your application (no administrator permissions are required in this instance)

![](/media/articles/scenarios/multi-tenant-saas-azure-ad/azuread-mt-app-perm.png)

![](/media/articles/scenarios/multi-tenant-saas-azure-ad/azuread-mt-app-perm2.png)

## Create a Connection in Auth0

After configuring our application in Azure AD we can add it as a connection in the Auth0 dashboard. Here, we'll need to enter the Client ID and Client Secret of the application:

![](/media/articles/scenarios/multi-tenant-saas-azure-ad/azure-mt-new-conn.png)

And when creating the connection we'll need to enter the name of the directory (`fabrikamcorporation.onmicrosoft.com`) and enable the Common Endpoint. This is required if you're building multi-tenant applications.

## Create the Application

Now that you've configured Azure AD, the Auth0 Connection, and the Auth0 Client, it's time to create the application itself.

![](/media/articles/scenarios/multi-tenant-saas-azure-ad/azure-mt-app-homepage.png)

### Registration

Before users from another directory are able to authenticate, they'll need to go through a consent flow. The `Register` button starts the consent flow for a single user, and users can sign up with a social account or as part of their organization. Opting for **Enable for my organization** requires administrative permissions for the whole organization.

The following code snippet stores a "registration request" with a unique ID (the `SignupToken`) before redirecting the user to the consent page. The `SignupToken` is added as the state of the request, and we'll be able to use this value once the user goes through the flow.

```cs
// URL with parameters to be populated with custom parameters two code blocks down
private const string OnboardingUrl =
    "https://login.windows.net/common/oauth2/authorize?response_type=code
        &client_id={0}&resource={1}&redirect_uri={2}&state={3}";

[HttpPost]
[Route("")]
public async Task<ActionResult> Start(RegistrationModel model)
{
    using (var db = new TimesheetContext())
    {
        // Store the registration request.
        var registration = db.RegistrationRequests.Add(new RegistrationRequest
        {
            Id = Guid.NewGuid(),
            CreatedOn = DateTime.UtcNow,
            SignupToken = Guid.NewGuid().ToString(),
            AdminConsented = model.EnableForMyOrganization,
            OrganizationName = model.OrganizationName
        });
        await db.SaveChangesAsync();

        // Build the redirect to the consent page.
        var authorizationRequest = String.Format(OnboardingUrl,
            Uri.EscapeDataString(
                ConfigurationManager.AppSettings["AzureAD:ClientID"]),
            Uri.EscapeDataString("https://graph.windows.net"),
            Uri.EscapeDataString(Request.Url.GetLeftPart(UriPartial.Authority) 
                + "/registration/complete"),
            Uri.EscapeDataString(registration.SignupToken));
        if (model.EnableForMyOrganization)
            authorizationRequest += String.Format("&prompt={0}", 
                Uri.EscapeDataString("admin_consent"));
        return Redirect(authorizationRequest);
    }
}
```

Notice that the second block of this code snippet redirects the user to the consent page.

![](/media/articles/scenarios/multi-tenant-saas-azure-ad/azure-mt-consent-page.png)

After accepting the request for access, the user is redirected back to the application where the registration request is being processed. 

The application receives a code which can be used to receive an authorization code, the `result` variable.

```cs
[HttpGet]
[Route("complete")]
public async Task<ActionResult> Complete(string code, string error, string error_description, string resource, string state)
{
    using (var db = new TimesheetContext())
    {
        if (!String.IsNullOrEmpty(error) 
             || !String.IsNullOrEmpty(error_description))
        {
            return View("RegistrationError", new RegistrationErrorModel() { Error = error, ErrorDescription = error_description });
        }

        var registrationRequest = await 
            db.RegistrationRequests.FirstOrDefaultAsync(r => 
                r.SignupToken == state);
        if (registrationRequest == null)
        {
            return View("RegistrationRequestUnknown");
        }
                
        // Get the user's profile from Azure AD.
        var credential = new ClientCredential(
            ConfigurationManager.AppSettings["AzureAD:ClientID"], 
            ConfigurationManager.AppSettings["AzureAD:Key"]);
        var authContext = new AuthenticationContext(
            "https://login.windows.net/common/");
        var result = authContext.AcquireTokenByAuthorizationCode(code, 
            new Uri(Request.Url.GetLeftPart(UriPartial.Path)), credential);

        // Clean up the registration request.
        db.RegistrationRequests.Remove(registrationRequest);

        // Persist the user.

        // Consent happend by administrator for the whole organization..
        if (registrationRequest.AdminConsented)
        {
            // Persist the tenant.

            // Save.
            await db.SaveChangesAsync();

            // Show confirmation page.
            return View("TenantRegistrationSuccess");
        }
                
        // Save.
        await db.SaveChangesAsync();

        // Show user confirmation page.
        return View("UserRegistrationSuccess");
    }
}
```

The `result` variable contains information about the user and the tenant and can be used to persist the user and the tenant in the database.

::: note
The code will first check to see if the state matches an existing SignupToken in the database to make sure this request was initiated from the application (for example, after a payment was made).
:::

### Log In

We're using Lock as the login UI, but for enterprise connections like Azure AD, Lock only supports HRD (home realm discovery) based on matching email addresses to previously configured domains. In this case we don't know all of the possible email domains that end users will use when logging in, so we'll modify Lock to handle this case by adding button for users to click on if they're using an Azure AD connection. 

::: note 
Adding buttons directly to Lock's DOM is not officially supported, so make sure you test this code when upgrading to new versions.
:::

```js
<script src="https://cdn.auth0.com/js/lock/10.20/lock.min.js"></script>
<script src="${auth0js_urlv8}"></script>
<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>

const YOUR_AUTH0_CONNECTION_AZURE_AD_NAME = 'fabrikamcorp-waad';
const YOUR_AUTH0_DOMAIN = 'fabrikamcorp.auth0.com';
const YOUR_AUTH0_CLIENTID = '2d8C6oCsRI6dw8V0rmvcE8GtkBaLvi8v';

let redirectUrl = 'https://fabrikamcorp.com/api/auth0callback';

var lock = new Auth0Lock(clientId, domain, {
    sso: false,
    auth: {
        redirect: true,
        redirectUrl: redirectUrl,
    },
});

function createReadyCallback(btnText) {
    var buttonList = $('#auth0-lock-container-' + lock.id).find('.auth0-lock-social-buttons-container');

    //Azure AD custom button
    buttonList.append(
        $('<button type="button" data-provider="windows">')
            .addClass('auth0-lock-social-button auth0-lock-social-big-button')
            .append('<div class="auth0-lock-social-button-icon">')
            .append($('<div class="auth0-lock-social-button-text">').text(btnText))
            .on('click', function() {
                var webAuth = new auth0.WebAuth({domain: YOUR_AUTH0_DOMAIN, clientID: YOUR_AUTH0_CLIENTID});

                webAuth.authorize({
                    connection: YOUR_AUTH0_CONNECTION_AZURE_AD_NAME,
                    responseType: 'code',
                    // repeat any needed custom auth params here, such as 
                    // state, responseType and callbackURL.
                    // , responseType: 'code'
                    // , redirectUri: ...
                    // , ...
                });
            })
    );
}
lock.on('signin ready', function() {
    createReadyCallback('Log in with Azure AD');
});
lock.on('signup ready', function() {
    createReadyCallback('Sign up with Azure AD');
});
lock.show({
    callbackURL: window.location.origin + '/signin-auth0'
});
```

After registering, the user can now login by clicking the "Login with Azure AD" button.

![](/media/articles/scenarios/multi-tenant-saas-azure-ad/azure-mt-login-popup.png)

When the user is signed in, the profile page shows the user's information. These users will now be able to use the same credentials they use for Office 365, Intune, and so on to access Fabrikam's Timesheet SaaS.

![](/media/articles/scenarios/multi-tenant-saas-azure-ad/azure-mt-profile.png)
