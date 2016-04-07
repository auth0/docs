# Invite-only applications

Self-service provisioning is a common concept for SaaS applications, where users can register and pay after which they can start using the application. Other types of applications might not allow single users to register for an application. Instead, the customers might be organizations that pay upfront for a number of users and only want those users to access your application. Think about platforms like Google Apps and Office 365.

And this is where an invite-only workflow can be used. Let’s take a look at a fictitious application, Analystick, which is a multi-tenant SaaS solution offering analytics in the cloud. Their customers will send them a list of users (given name, family name and email address) that can access the application.

As always, this is simply one way to solve it. Another option to achieve this is by using an Enterprise Connection, where you can federate with your customer using ADFS/SAML-P/… allowing them to authenticate using their own Active Directory (in which they could then specify who can access the application).

Here's how we're going to setup the invite only flow. The tenant admnistrator will be able to create new users in his subscription from within the application (1). The application will call the Auth0 API to create the new users in a database connection (2) and will send out activation emails for all users (3). When a user clicks the activation link he'll be redirected to Auth0 (4) where his email address will be set to validated. After validation Auth0 will redirect the user to the application and be presented with a password reset form (5). Finally the application will update the user's password in Auth0 after which the user will be able to authenticate.

![](/media/articles/invite-only/invite-only-overview.png)

## Setup

The users will be stored in a database and this is why we’ll need to make sure that we have a database connection available. We’ll only need a single database because Analystick will sign up users of Contoso, Fabrikam and other companies with their corporate email address (making users unique for each customer).

![](/media/articles/invite-only/invite-only-connections.png)

To prevent users from signing up you'll need to activate the "Disable Sign Ups" option on the connection to make sure users can only be created from your backend.

The Analystick application is an ASP.NET MVC web application hosted on http://localhost:45000/, so we’ll need to make sure we create an application in the dashboard with the right parameters:

 - **Name**: give your application a clear name as this will be used in the emails being sent out during the invite-only workflow
 - **Allowed Callback URLs**: this should be the url of your application followed with /signin-auth0 (a requirement of the Auth0.Owin NuGet package for .NET)

![](/media/articles/invite-only/invite-only-app.png)

## User Management

The team at Analystick then decided to build a simple user interface in their admin backend allowing the import of users. This UI could potentially allow the upload of CSV, XML, JSON … files but for simplicity we’ll stick to a page that allows you to create up to 5 users.

![](/media/articles/invite-only/invite-only-new.png)

This admin interface simply uses the Auth0 SDK for .NET to communicate with the Auth0 API:

```
public class UsersController : Controller
{
    private readonly Client _client;

    public UsersController()
    {
        _client = new Client(
            ConfigurationManager.AppSettings["auth0:ClientId"],
            ConfigurationManager.AppSettings["auth0:ClientSecret"],
            ConfigurationManager.AppSettings["auth0:Domain"]);
    }

    public ActionResult Index()
    {
        var users = _client.GetUsersByConnection(ConfigurationManager.AppSettings["auth0:Connection"]);
        return View(users.Select(u => new UserModel
        {
            UserId = u.UserId,
            GivenName = u.GivenName,
            FamilyName = u.FamilyName,
            Email = u.Email
        }).ToList());
    }

    ...

    [HttpPost]
    public ActionResult New(IEnumerable<UserModel> users)
    {
      if (users != null)
      {
          foreach (var user in users.Where(u => !String.IsNullOrEmpty(u.Email)))
          {
              var randomPassword = Guid.NewGuid().ToString();
              var metadata = new
              {
                  user.GivenName,
                  user.FamilyName,
                  activation_pending = true
              };

              var profile = _client.CreateUser(user.Email, randomPassword,
              	ConfigurationManager.AppSettings["auth0:Connection"], false, metadata);

              var userToken = JWT.JsonWebToken.Encode(
                new { id = profile.UserId, email = profile.Email },
                  ConfigurationManager.AppSettings["analystick:signingKey"],
                    JwtHashAlgorithm.HS256);

              var verificationUrl = _client.GenerateVerificationTicket(profile.UserId,
                  Url.Action("Activate", "Account", new { area = "", userToken }, Request.Url.Scheme));

              var body = "Hello {0}, " +
                "Great that you're using our application. " +
                "Please click <a href='{1}'>ACTIVATE</a> to activate your account." +
                "The Analystick team!";

              var fullName = String.Format("{0} {1}", user.GivenName, user.FamilyName).Trim();
              var mail = new MailMessage("app@auth0.com", user.Email, "Hello there!",
                  String.Format(body, fullName, verificationUrl));
              mail.IsBodyHtml = true;

              var mailClient = new SmtpClient();
              mailClient.Send(mail);
          }
      }

      return RedirectToAction("Index");
    }

    [HttpPost]
    public ActionResult Delete(string id)
    {
        if (!String.IsNullOrEmpty(id))
            _client.DeleteUser(id);
        return RedirectToAction("Index");
    }
}
```

If you take a closer look at the code you’ll see that the CreateUser method is called to create the user in the database connection. This method is being called with 4 parameters:

 1. The user’s email address
 2. The user’s password (we’re generating a new Guid to assign a random password to the user)
 3. The name of the connection in which we want to create the user
 4. The email verified parameter (we're setting this to false because we need the user to click the activation link).
 5. A metadata object containing the given name and family name of the user, together with an activation pending setting (which we’ll use later to validate the user).

## Emails ##

Once the user is created we'll need to send out the email verification email. The most important part here is generating the email verification url. Our goal is to send the user to the password reset form in the application (/Activate/Account), but we need a secure way to identify the user. This is why we're generating a token that identifies the user (we use a JWT token for that) and append this to the account activation url. Finally we're calling the ```GenerateVerificationTicket``` method on the SDK to generate the Auth0 verification url and we set the return url to the url of our password reset form (with token).

Since we don’t want the default emails to be sent out we’ll need to go to the dashboard and disable the **Verification Email** and **Welcome Email**.

![](/media/articles/invite-only/invite-only-disable-email.png)

Since our backend will be sending out the email we’ll need access to an SMTP server. For testing purposes we’re using Mailtrap, but any SMTP server will do. After signing up we’re adding the SMTP settings to the web.config:

```xml
  <system.net>
    <mailSettings>
      <smtp from="myapp@auth0.com">
        <network userName="1234567" password="89101112" port="2525" host="mailtrap.io" />
      </smtp>
    </mailSettings>
  </system.net>
```

And that's it for the user provisioning. If we go back to the user overview we can start importing a few users.

![](/media/articles/invite-only/invite-only-users.png)

Each user will now also have received an email welcoming them and giving them a chance to activate their account.

![](/media/articles/invite-only/invite-only-activation-mail.png)

## User Activation ##

The link in our email template will redirect to Auth0 for email verification, after which Auth0 will redirect the user to the password reset form in the application (see how the user token is added to the url).

![](/media/articles/invite-only/invite-only-activation.png)

Once the user entered his password we'll verify that the account hasn't been updated yet, we'll update the user's password and mark him as active (```activation_pending = false```).

```cs
/// <summary>
/// GET Account/Activate?userToken=xxx
/// </summary>
/// <param name="userToken"></param>
/// <returns></returns>
public ActionResult Activate(string userToken)
{
    dynamic metadata = JWT.JsonWebToken.DecodeToObject(userToken,
        ConfigurationManager.AppSettings["analystick:signingKey"]);
    var user = GetUserProfile(metadata["id"]);
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
public ActionResult Activate(UserActivationModel model)
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

    UserProfile user = GetUserProfile(metadata["id"]);
    if (user != null)
    {
        if (user.ExtraProperties.ContainsKey("activation_pending")
              && !((bool)user.ExtraProperties["activation_pending"]))
            return View("ActivationError",
              new UserActivationErrorModel("Error activating user, the user is already active."));

        _client.ChangePassword(user.UserId, model.Password, false);
        _client.UpdateUserMetadata(user.UserId, new { activation_pending = false });

        return View("Activated");
    }

    return View("ActivationError",
        new UserActivationErrorModel("Error activating user, could not find an exact match for this email address."));
}
```

Note that we always validate the token first before proceeding, to make sure we’re making the change for the right person.

As a final step we're showing a confirmation page where the user can click a link to sign in. One last customization we want to apply is the rendering of the Lock. Since we don’t want users to sign up we’re going to hide the Sign Up button (which is visible by default):

```javascript
var lock = new Auth0Lock('@System.Configuration.ConfigurationManager.AppSettings["auth0:ClientId"]', '@System.Configuration.ConfigurationManager.AppSettings["auth0:Domain"]');

function showLock() {
    lock.show({
        callbackURL: window.location.origin + '/signin-auth0',
        disableSignupAction: true
    });
}
```

![](/media/articles/invite-only/invite-only-login.png)

As a final step we’re also enforcing the user activation. When we configure Auth0 at application startup we can intercept every login, allowing us to modify the user’s identity before handing it over to the OWIN pipeline.

In this example we’re checking if a user is active, and if that’s the case we’ll add the "Member" role to the user:

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

And now we can protect our pages which should only be accessible to users by enforcing the presence of a Member claim:

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

## Summary ##

Once the user has gone through the whole flow he'll be able to access the member-only pages.

![](/media/articles/invite-only/invite-only-profile.png)

This scenario covered how to implement an invite-only flow by using Auth0 API to completely customize the signup process and the email flow. For more information about the API you can use the [API Explorer](/api/v2) to try the different endpoints.
