---
description: How to customize the signup process for an invite-only application with Auth0
toc: true
crews: crew-2
---
# Invite-Only Applications

Many SaaS apps allow self-service provisioning, where users can register themselves and begin using the app. Other types of apps, however, do not allow such signups. Instead, the customer (typically an organization of some type) pay upfront for a number of users, and only the end user with the appropriate credentials may sign up and access the app. In such cases, you can use an invite-only workflow for authorization purposes.

## Example Scenario: Analystick

In this tutorial, we will work through a sample setup for the fictional company, Analystick. Analystick is a multi-tenant SaaS solution offering cloud-based analytics. Customers purchasing licenses send Analystick lists of users whom they want to access the application.

You can handle this requirement in Auth0 using an Enterprise Connection (using federation) with the individual customers using ADFS, SAML-P, and so on. This allows the customer to authenticate users with their own Active Directory specifying who gets access to the app.

The invite-only authorization flow includes the following steps:

1. The admin for the customer creates new end users for the Analystick app.
1. Analystick calls the Management API to create those new end users in a database connection.
1. Analystick sends out activation emails to all new end users.
1. When end users click on the activation links contained in their emails, they're redirected to Auth0 (which then flags the users' profiles as having activated their email addresses)
1. Auth0 redirects users to the app, where the end users can reset their passwords
1. Analystick updates each user's password in Auth0.
1. The end users are now ready to authenticate themselves and use Analystick.

![](/media/articles/invite-only/invite-only-overview.png)

### Setup

You can store all Analystick end users in a single database, since everyone will provide their unique corporate email addresses.

![](/media/articles/invite-only/invite-only-connections.png)

To prevent users from signing themselves up and adding themselves to the database connection, be sure to select the **Disable Sign Ups** option on the connection to make sure users can only be created on the backend.

The Analystick app is an ASP.NET MVC web app hosted on `http://localhost:45000/`. You will need to create a [client](/clients) in the [Dashboard](${manage_url}/#/clients) with the correct parameters:

 - **Name**: give your application a clear name as this will be used in the emails being sent out during the invite-only workflow
 - **Client Type**: this will be a regular web application.
 - **Allowed Callback URLs**: this should be the URL of your app, followed by `/signin-auth0` (a requirement of the Auth0.Owin NuGet package for .NET)

![](/media/articles/invite-only/invite-only-app.png)

Since this client needs to access the [Management API](/api/v2), you'll need to authorize it and set its scopes as follows:

* Go to the [APIs section](${manage_url}/#/apis) of the Dashboard.
* Select **Auth0 Management API**.
* Click over to the **Non-interactive Clients** tab.
* Find the client you just created, and set its toggle to **Authorized**.
* Use the **down arrow** to open up the scopes selection area. Select the following scopes: `read:users`, `update:users`, `delete:users`, `create:users`, and `create:user_tickets`.
* Click **Update**.

![Authorize Client](/media/articles/invite-only/invite-only-authorize-client.png)

### Sample Application

You can find a working sample of the application in its [GitHub repository](https://github.com/auth0-samples/auth0-invite-only-sample).

### User Management

Analystick comes with an admin area that allows you to import up to five users at a time.

![](/media/articles/invite-only/invite-only-new.png)

The admin interface uses the [Auth0 Management API SDK](https://www.nuget.org/packages/Auth0.ManagementApi/) to communicate with the Auth0 Management API v2:

```cs
public class UsersController : Controller
{
    private ManagementApiClient _client;

    private async Task<ManagementApiClient> GetApiClient()
    {
        if (_client == null)
        {
            var token = await (new ApiTokenCache()).GetToken();
            _client = new ManagementApiClient(
                token,
                ConfigurationManager.AppSettings["auth0:Domain"]);
        }

        return _client;
    }

    public async Task<ActionResult> Index()
    {
        var client = await GetApiClient();
        return View((await client.Users.GetAllAsync(connection: ConfigurationManager.AppSettings["auth0:Connection"]))
            .Select(u => new UserModel {
                UserId = u.UserId,
                GivenName = u.FirstName,
                FamilyName = u.LastName,
                Email = u.Email }
            ).ToList());
    }

    ...

    [HttpPost]
    public async Task<ActionResult> New(IEnumerable<UserModel> users)
    {
        if (users != null)
        {
            foreach (var user in users.Where(u => !String.IsNullOrEmpty(u.Email)))
            {
                var randomPassword = Guid.NewGuid().ToString();
                var metadata = new
                {
                    activation_pending = true
                };

                var client = await GetApiClient();
                var profile = await client.Users.CreateAsync(new Auth0.ManagementApi.Models.UserCreateRequest
                {
                    Email = user.Email,
                    Password = randomPassword,
                    Connection = ConfigurationManager.AppSettings["auth0:Connection"],
                    EmailVerified = true,
                    FirstName = user.GivenName,
                    LastName = user.FamilyName,
                    AppMetadata = metadata
                });

                var userToken = JWT.JsonWebToken.Encode(
                    new { id = profile.UserId, email = profile.Email },
                    ConfigurationManager.AppSettings["analystick:signingKey"],
                        JwtHashAlgorithm.HS256);

                var verificationUrlTicket = await client.Tickets.CreateEmailVerificationTicketAsync(
                    new Auth0.ManagementApi.Models.EmailVerificationTicketRequest
                    {
                        UserId = profile.UserId,

                        ResultUrl = Url.Action("Activate", "Account", new { area = "", userToken }, Request.Url.Scheme)
                    }
                );

                var body = "Hello {0}, " +
                    "Great that you're using our application. " +
                    "Please click <a href='{1}'>ACTIVATE</a> to activate your account." +
                    "The Analystick team!";

                var fullName = String.Format("{0} {1}", user.GivenName, user.FamilyName).Trim();
                var mail = new MailMessage("app@auth0.com", user.Email, "Hello there!",
                    String.Format(body, fullName, verificationUrlTicket.Value));
                mail.IsBodyHtml = true;

                var mailClient = new SmtpClient();
                mailClient.Send(mail);
            }
        }

        return RedirectToAction("Index");
    }

    [HttpPost]
    public async Task<ActionResult> Delete(string id)
    {
        if (!String.IsNullOrEmpty(id))
        {
            var client = await GetApiClient();
            await client.Users.DeleteAsync(id);
        }
        return RedirectToAction("Index");
    }
}
```

To create a user in your database connection, your app calls the `Users.CreateAsync` method. The method takes five parameters:

 1. The user’s email address
 2. The user’s password (a new GUID is assigned as a random password to the user)
 3. The name of the (database) connection in which to create the user
 4. The email verified parameter (set to `false` prior to the user clicking the activation link)
 5. A metadata object containing the given name and family name of the user and an activation pending setting (used later to validate the user).

### Emails

You will need to send verification emails to all newly-created users. The email will contain a link to the account activation URL of the application (such as `/activate/account`) that leads to the password reset form. The user is identified by the unique JWT appended to the return URL

To generate the `verificationUrl`:

1. Call the `Tickets.CreateEmailVerificationTicketAsync` method on the SDK
2. Set the return URL to that of the password reset form
3. Append the JWT token to the return URL

::: note
Be sure to disable the default **Verification Email** and **Welcome Email** using the Dashboard to prevent these from being sent.
:::

![](/media/articles/invite-only/invite-only-disable-email.png)

You'll need access to an SMTP server to send out your emails. This tutorial uses Mailtrap, but you're free to use whatever you'd like.

Add the following settings to the `web.config` file of your SMTP server:

```xml
  <system.net>
    <mailSettings>
      <smtp from="myapp@auth0.com">
        <network userName="1234567" password="89101112" port="2525" host="mailtrap.io" />
      </smtp>
    </mailSettings>
  </system.net>
```

This is all that needs to be done for user provisioning. At this point, you can return to the user overview to start importing users.

![](/media/articles/invite-only/invite-only-users.png)

Each user will receive a welcome email containing a link to activate their account.

![](/media/articles/invite-only/invite-only-activation-mail.png)

### User Activation

The link in the email template redirects the user to Auth0 for email verification. If the user successfully authenticates, Auth0 redirects the user to the password reset form of the application with the user token included in the URL.

![](/media/articles/invite-only/invite-only-activation.png)

Once the user enters their password, you should:

1. Verify that the account has not been updated yet
2. Update the user's password
3. Mark the user as active (`activation_pending = false`)

```cs
/// <summary>
/// GET Account/Activate?userToken=xxx
/// </summary>
/// <param name="userToken"></param>
/// <returns></returns>
public async Task<ActionResult> Activate(string userToken)
{
    dynamic metadata = JWT.JsonWebToken.DecodeToObject(userToken,
        ConfigurationManager.AppSettings["analystick:signingKey"]);
    var user = await GetUserProfile(metadata["id"]);
    if (user != null)
        return View(new UserActivationModel { Email = user.Email, UserToken = userToken });
    return View("ActivationError",
        new UserActivationErrorModel("Error activating user, could not find an exact match for this email address."));
}

/// <summary>
/// POST Account/Activate
/// </summary>
/// <param name="model"></param>
/// <returns></returns>
[HttpPost]
public async Task<ActionResult> Activate(UserActivationModel model)
{
    dynamic metadata = JWT.JsonWebToken.DecodeToObject(model.UserToken,
        ConfigurationManager.AppSettings["analystick:signingKey"], true);
    if (metadata == null)
    {
        return View("ActivationError",
            new UserActivationErrorModel("Unable to find the token."));
    }

    if (!ModelState.IsValid)
    {
        return View(model);
    }

    User user = await GetUserProfile(metadata["id"]);
    if (user != null)
    {
        if (user.AppMetadata["activation_pending"] != null && !((bool)user.AppMetadata["activation_pending"]))
            return View("ActivationError", new UserActivationErrorModel("Error activating user, the user is already active."));

        var client = await GetApiClient();
        await client.Users.UpdateAsync(user.UserId, new UserUpdateRequest {
            Password = model.Password
        });
        await client.Users.UpdateAsync(user.UserId, new UserUpdateRequest
        {
            AppMetadata = new { activation_pending = false }
        });

        return View("Activated");
    }

    return View("ActivationError",
        new UserActivationErrorModel("Error activating user, could not find an exact match for this email address."));
}
```

::: note
Always validate the token first to ensure that you are updating the correct user.
:::

Next, display a confirmation page where the user can click a link to sign in.

You can customize the rendering of Lock. Since you don’t want users to sign up, hide the Sign Up button that is visible by default:

```javascript
var lock = new Auth0Lock(
    '@System.Configuration.ConfigurationManager.AppSettings["auth0:ClientId"]',
    '@System.Configuration.ConfigurationManager.AppSettings["auth0:Domain"]', {
        auth: {
            redirectUrl: window.location.origin + '/signin-auth0'
        },
        allowSignUp: false
    });

function showLock() {
    lock.show();
}
```

![](/media/articles/invite-only/invite-only-login.png)

As a final step, you can enforce user activation by configuring Auth0 at application startup to intercept every login. This allows you to modify a user’s identity before handing it over to the OWIN pipeline.

The following example checks if a user is active, and if they are, adds the **Member** role to the user:

```cs
public partial class Startup
{
   public void ConfigureAuth(IAppBuilder app)
   {
      ...

      var provider = new Auth0AuthenticationProvider
      {
         OnReturnEndpoint = context =>
         {
             ..
         },
         OnAuthenticated = context =>
         {
             if (context.User["activation_pending"] != null)
             {
                 var pending = context.User.Value<bool>("activation_pending");
                 if (!pending)
                 {
                     context.Identity.AddClaim(new Claim(ClaimTypes.Role, "Member"));
                 }
             }

            ...

             return Task.FromResult(0);
         }
      };

      app.UseAuth0Authentication(ConfigurationManager.AppSettings["auth0:ClientId"],
        ConfigurationManager.AppSettings["auth0:ClientSecret"], ConfigurationManager.AppSettings["auth0:Domain"],
         provider: provider);
   }
}
```

Now, make sure that these pages are only be accessible to users by enforcing the presence of a **Member** claim:

```cs
[Authorize(Roles = "Member")]
public class ProfileController : Controller
{
    public ActionResult Index()
    {
        ...
    }
}
```

Once users have completed the entire authentication and authorization flow, they will be able to access the member-only pages.

![](/media/articles/invite-only/invite-only-profile.png)

## Alternate Password Reset Configuration

As an alternative to the configuration shown above, you're welcome to craft your own new user password reset flow using the [Create an Email Verification Ticket](/api/management/v2#!/Tickets/post_email_verification) and [Create a Password Change Ticket](/api/management/v2#!/Tickets/post_password_change) endpoints.

### Step 1: Verify the User's Email Address

Once you've created the user in Auth0, you'll send the appropriate `POST` call to the [Create an Email Verification Ticket endpoint](/api/management/v2#!/Tickets/post_email_verification) to trigger an email that verifies the user's email.

Be sure to update the following placeholder values:

* `MGMT_API_ACCESS_TOKEN`: replace with your [API access token](/api/management/v2/tokens)
* `YOUR_APP_CALLBACK_URL`: replace with the callback/return URL for your app

```har
{
	"method": "POST",
	"url": "https://${account.namespace}/api/v2/tickets/email-verification",
	"httpVersion": "HTTP/1.1",
	"cookies": [],
	"headers": [{
		"name": "Authorization",
		"value": "Bearer MGMT_API_ACCESS_TOKEN"
	}],
	"queryString": [],
	"postData": {
		"mimeType": "application/json",
		"text": "{ \"result_url\": \"YOUR_APP_CALLBACK_URL\", \"user_id\": \"\", \"ttl_sec\": 0 }"
	},
	"headersSize": -1,
	"bodySize": -1,
	"comment": ""
}
```

### Step 2: Change the User's Password

Once you've verified the user's password, you'll need to initiate the [password change process](/connections/database/password-change).

Be sure to replace the placeholder values for your [API access token](/api/management/v2/tokens), as well as those within the body of the call, including the callback/return URL for your app and the user's details.

```har
{
	"method": "POST",
	"url": "https://${account.namespace}/api/v2/tickets/password-change",
	"httpVersion": "HTTP/1.1",
	"cookies": [],
	"headers": [{
		"name": "Authorization",
		"value": "Bearer MGMT_API_ACCESS_TOKEN"
	}],
	"queryString": [],
	"postData": {
		"mimeType": "application/json",
		"text": "{ \"result_url\": \"YOUR_APP_CALLBACK_URL\", \"user_id\": \"USER_ID\", \"new_password\": \"secret\", \"connection_id\": \"con_0000000000000001\", \"email\": \"EMAIL\", \"ttl_sec\": 0 }"
	},
	"headersSize": -1,
	"bodySize": -1,
	"comment": ""
}
```

## Summary

This tutorial has walked you through one way of implementing an invite-only sign-up flow using the [Management API](/api/v2) to customize the sign-up process and the email handling.