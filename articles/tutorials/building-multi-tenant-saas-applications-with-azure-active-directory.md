# Building multi-tenant, SaaS applications with Azure AD and Auth0

Azure AD is often used as a user directory for Office 365, Intune, Dynamics CRM and applications you're building for the users in your organization.

![](/media/articles/scenarios/multi-tenant-saas-azure-ad/azure-ad-mt-single-tenant-example.png)

In that case the users in your organization's directory (contoso.onmicrosoft.com) will be able to access the applications you registered in your directory (Contoso Intranet and Office 365). This is how the [standard integration with Auth0 works](/waad-clientid), you'll create an application in Azure AD that points to Auth0 after which you can create it as an Azure AD Connection in the dashboard.

A more advanced concept in Azure AD is the support for multi-tenant applications. This is where your directory can define an application (typically a SaaS application) which can be used by other directories (your customers).

![](/media/articles/scenarios/multi-tenant-saas-azure-ad/azure-ad-multi-tenant-example.png)

In this example Fabrikam Corporation is an ISV hosting a Timesheet SaaS applications. They have been using Auth0 to make sure customers can login with their Facebook, Google, LinkedIn, ... accounts. But now they want to extend this support and provide SSO to organizations which are using Azure AD (or Office 365). For Fabrikam Corporation this can be a great way to attract new customers because they can offer SSO to thousands of companies already using Azure AD/Office 365 in just a few clicks.

Contoso is one of their new customers which have signed up with their Azure AD. Users in this directory will now have SSO to Fabrikam's Timesheet SaaS and will be able to use their existing Contoso credentials after going through a simple consent flow.

This document will cover how Fabrikam can create a multi-tenant Azure AD application, how it will integrate with Auth0 and how the end user experience will be when signing up for the application.

## Prerequisites

Before you can create a multi-tenant application in Azure AD you'll need a Microsoft Azure subscription and a domain name (like fabrikamcorp.com). This domain name is a requirement for adding multi-tenant applications to Azure AD.

## Creating an application in Auth0

We'll start by creating an application in Auth0 in which we define the Allowed Callback URLs for our application. In this example we're building an ASP.NET MVC application which runs locally and in Azure Web Sites, but keep in mind that this scenario works with any technology and any hosting platform.

![](/media/articles/scenarios/multi-tenant-saas-azure-ad/azuread-mt-new-a0-app.png)

## Creating an application in Azure AD

The first thing Fabrikam will do is create a new directory in Azure AD if they haven't got one already.

![](/media/articles/scenarios/multi-tenant-saas-azure-ad/azuread-mt-create-directory.png)

The final application will be running on https://timesheets.fabrikamcorp.com so we'll need to register `fabrikamcorp.com` as a domain first before we can create the multi-tenant application.

On the Domains tab you can create a new domain:

![](/media/articles/scenarios/multi-tenant-saas-azure-ad/azuread-mt-domain-name.png)

This domain will also require verification and you'll need to add a TXT/MX record as described in the verification page.

![](/media/articles/scenarios/multi-tenant-saas-azure-ad/azuread-mt-domain-verified.png)

The DNS propagation can take some minutes so if you see the "Could not verify domain" error that's normal. You can use sites like [What's My DNS](http://www.whatsmydns.net) to follow up on the DNS propagation of your domain.

The next step will be to create a new Application in your Directory.

![](/media/articles/scenarios/multi-tenant-saas-azure-ad/azuread-mt-new-app.png)

![](/media/articles/scenarios/multi-tenant-saas-azure-ad/azuread-mt-new-app-name.png)

The SIGN-ON URL is the url of your application that users will see when adding the application to their directory (in the consent flow).

The APP ID URI is the unique identifier for your application (next to the Client ID) and must match a domain you registered under domains.

![](/media/articles/scenarios/multi-tenant-saas-azure-ad/azuread-mt-new-app-prop.png)

Once the application has been created we'll need to enable it for multi-tenancy, generate a key and configure the callback urls. You'll have 2 types of callback urls: the callback url for Auth0's login endpoint and the callback url for the consent flow.

When new customers sign up with their Azure AD directory the consent flow will redirect back to your application after approval/denial. In this example the page is available from different urls (http://localhost:55000/registration/complete, ...) which is why we're adding this page multiple times.

![](/media/articles/scenarios/multi-tenant-saas-azure-ad/azuread-mt-app-config.png)

The final step is to configure the permissions for the application and this is where it gets interesting. 

The first option is to ask for the 'Read directory data' and 'Enable SSO' permissions. Enabling these options will allow you to get more information about the user and the directory using the [Azure AD Graph API](https://msdn.microsoft.com/en-us/library/azure/hh974476.aspx). This is really useful if you want to access additional information about the user like the groups the user belongs to etc... The only downside is that you'll need to be an administrator to give this type of consent.

The other option is to only ask for the 'Enable SSO' permission, which we'll be using in this example. The interesting part here is that regular users will also be able to go through the consent flow. This will allow you to reach even more users:

- Organization administrators will be able to give consent for the whole directory (all users in the directory will be able to access the application)
- Regular users will be able to give consent just for their own. The reason why this is even more interesting is because this enables single users to sign up for your application and have SSO, even if this user is the only person in the organization using your application (no administrator permissions are required here)

![](/media/articles/scenarios/multi-tenant-saas-azure-ad/azuread-mt-app-perm.png)

## Creating a connection in Auth0

After configuring our application in Azure AD we can add it as a connection in the Auth0 dashboard. Here we'll need to enter the Client ID and Client Secret of the application:

![](/media/articles/scenarios/multi-tenant-saas-azure-ad/azure-mt-new-conn.png)

And when creating the connection we'll need to enter the name of the directory (`fabrikamcorporation.onmicrosoft.com`) and enable the Common Endpoint. This is required if you're building multi tenant applications.

![](/media/articles/scenarios/multi-tenant-saas-azure-ad/azure-mt-conn-comm-endpoint.png)

## Creating the application

Azure AD, the Auth0 connection and the Auth0 application have been configured, now it's time to create the actual application.

![](/media/articles/scenarios/multi-tenant-saas-azure-ad/azure-mt-app-homepage.png)

### Registration

Before users from an other directory (your customers) are able to authenticate they'll need to go through a consent flow. The homepage allows users to sign up with a social account or with their organization. And the `Register` button will start the consent flow for a single user. Checking the option **Enable for my organization** will require an administrator, to give consent for the whole organization.

The following code will store a "registration request" with a unique ID (the SignupToken) after which it will redirect to the consent page. The SignupToken is added as the state of the request, and we'll be able to use this value once the user went through the flow to correlate this back to the original request.

```cs
private const string OnboardingUrl =
    "https://login.windows.net/common/oauth2/authorize?response_type=code
        &client_id={0}&resource={1}&redirect_uri={2}&state={3}";

[HttpPost]
[Route("")]
public async Task<ActionResult> Start(RegistrationModel model)
{
    using (var db = new TimesheetContext())
    {
        // Store thre registration request.
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

This will redirect the user to the consent page and in case we've enabled this for the whole organization this will trigger an admin consent which requires an administrator give consent.

![](/media/articles/scenarios/multi-tenant-saas-azure-ad/azure-mt-consent-page.png)

After accepting the user is redirected back to the application where the registration request is being processed. If everything went well the application will receive a code which can be used to receive an authorization code, the `result` variable.

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

Note that the code will first validate if the state matches and existing SignupToken in the database to make sure this request was initiated from the application (eg: after a payment was made).

### Signin

We're using the Lock for signing in users, but for enterprise connections like Azure AD it only supports HRD (home realm discovery) based on the email address. But since we don't know all email domains that customers will use when logging in with Azure AD we'll modify the Lock a little.

Before showing the Lock we're adding a button to allow login with Azure AD connection.

> Note: Lock v10 does not support adding custom buttons yet, so this must be done using [Lock v9](https://auth0.com/docs/libraries/lock/v9). 

```js
lock.once('signin ready', function () {
    var link = $('<a class="a0-zocial a0-waad" href="#">'
        + '<span>Login with Azure AD</span></a>');
    link.on('click', function () {
        lock.getClient().login({ 
            connection: 'fabrikamcorporation.onmicrosoft.com'
            // repeat any needed custom auth params here, such as 
            // state, responseType and callbackURL.
            // Only domain and clientID are carried over from
            // Lock instance.
            // , responseType: 'code'
            // , callbackURL: ...
            // , ...
        });
    });

    var iconList = $(this.$container).find('.a0-iconlist');
    iconList.append(link);
});
lock.show({
    connections: ['google-oauth2', 'facebook', 'windowslive'],
    socialBigButtons: true,
    callbackURL: window.location.origin + '/signin-auth0'
});
```

After registering the user can now login by clicking the "Login with Azure AD" button.

![](/media/articles/scenarios/multi-tenant-saas-azure-ad/azure-mt-login-popup.png)

And finally the user is signed in and the profile page shows the user's information. From now on these users will be able to use the same credentials they use for Office 365, Intune, ... to access Fabrikam's Timesheet SaaS.

![](/media/articles/scenarios/multi-tenant-saas-azure-ad/azure-mt-profile.png)

The sample application is available on [GitHub](https://github.com/auth0/auth0-azuread-multi-tenant-apps-sample).
