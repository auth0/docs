# Using Auth0 with ASP.NET MVC 3

Integrating Auth0 with ASP.NET MVC3 is really simple.

##Before you start

1. You will need Visual Studio 2012 and MVC4
2. We also assume you have Google OAuth2 connection enabled. If you haven't done so, this [tutorial](enable-simple-connection) shows how to do it.

##Integrating Auth0 with MVC3

####1. Create a simple MVC website and install Auth0 client

For this example, we will use the standard template MVC3 template. Select __"FILE -> New project -> MVC 3 Web Application -> Empty"__

Once the default template unfolds, use NuGet to install the **Auth0**, running the command:

	Install-Package Auth0

####2. Setup the callback URL in Auth0

Go to [Settings](https://app.auth0.com/#/settings) and make sure to set the callback URL to this:

```
http://localhost:port/Auth/Callback
```

![](img/settings-callback.png)

####3. Create an authentication controller

Create a new controller named ```AuthController.cs``` with the following code:

    public class AuthController : Controller
    {
        private readonly Auth0.Client client = new Auth0.Client(
                                "@@account.clientId@@",
                                "@@account.clientSecret@@",
                                "@@account.namespace@@");

        public ActionResult Callback(string code)
        {
            var token = client.ExchangeAuthorizationCodePerAccessToken(
                            code, 
                            "http://localhost:{PORT}");

            var user = client.GetUserInfo(token);

            AppendCookie(user);

            return Redirect("/");
        }

        private void AppendCookie(Auth0.UserProfile user)
        {
            var jsonWriter = new JsonFx.Json.JsonWriter();
            var json = jsonWriter.Write(user);

            var authTicket = new FormsAuthenticationTicket(
                2, user.Name,
                DateTime.Now,
                DateTime.Now.AddMinutes(FormsAuthentication.Timeout.TotalMinutes),
                false,
                json);

            var authCookie = new HttpCookie(
                FormsAuthentication.FormsCookieName,
                FormsAuthentication.Encrypt(authTicket)
                ) {HttpOnly = true};

            Response.AppendCookie(authCookie);
        }
    }

> This controller will exchange the Authorization Code for an Access Token. Then the access token is used to retrive the user profile from Auth0 and the profile is stored in a FormsAuthentication cookie.  

####4. Deserialize the cookie with an MVC Filter

In the previous step we serialized the user profile in a cookie. Now we can create a new Filter attribute to deserialize the cookie and create the profile. Create a new class named ```Auth0ReadUser.cs``` with the following chunk of code:


    [AttributeUsage(AttributeTargets.Method | AttributeTargets.Class, Inherited = true, AllowMultiple = true)]
    public class UserDeserializer : AuthorizeAttribute
    {
        protected override bool AuthorizeCore(System.Web.HttpContextBase httpContext)
        {
            var isAuthenticated = base.AuthorizeCore(httpContext);
            if (isAuthenticated)
            {
                var cookieName = FormsAuthentication.FormsCookieName;
                if (!httpContext.User.Identity.IsAuthenticated ||
                    httpContext.Request.Cookies == null || 
                    httpContext.Request.Cookies[cookieName] == null)
                {
                    return true;
                }

                var authCookie = httpContext.Request.Cookies[cookieName];
                var authTicket = FormsAuthentication.Decrypt(authCookie.Value);

                if (authTicket == null) return false;

                var jsonValue = authTicket.UserData;

                var jsonReader = new JsonFx.Json.JsonReader();

                var identity = jsonReader.Read<Identity>(jsonValue);
                
                httpContext.User = new UserProfile(identity);
            }
            return true;
        }

        public class UserProfile : IPrincipal
        {
            public UserProfile(Identity identity)
            {
                Identity = identity;
            }
            public bool IsInRole(string role)
            {
                return  false;
            }
            public IIdentity Identity { get; private set; }
        }

        public class Identity : Auth0.UserProfile, IIdentity
        {
            string IIdentity.Name { get { return Name; } }
            public string AuthenticationType { get { return "Auth0";  } }
            public bool IsAuthenticated { get { return true; } }
        }
    }


####5. Create a HomeController

Create a new ```HomeController.cs``` whit two routes route:

    [Auth0ReadUser]
    public ActionResult Index()
    {
        return HttpContext.User.Identity is Auth0.UserProfile ? 
            View("Index_Logged", (Auth0.UserProfile)HttpContext.User.Identity) : 
            View();
    }

    public ActionResult Logoff()
    {
        FormsAuthentication.SignOut();
        return RedirectToAction("Index");
    }


> The index will show a page for the anonymous user and a different one when the user is logged in.

####6. Integrate the widget

We have a beautiful widget that you can integrate on any web application. We will setup this on a new view named ```Index.cshtml```:

    <!DOCTYPE html>
    <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
            <script src="https://sdk.auth0.com/auth0.js#client=KzMP6RmlctuKAxYbjfrXNAddktX8eq8c"></script>
        </head>
        <body>
            <h2>Welcome</h2>
            <button onclick="window.Auth0.signIn({onestep: true})">Login</button>
        </body>
    </html>

####7. Create a success page

Create a new view named ```Index_Logged.cshtml``` with the following code:

    @model Auth0.UserProfile
    <!DOCTYPE html>
    <html>
        <head>
        </head>
        <body>
            <h2>Hello!</h2>
            hello <strong>@Model.Name</strong>  you have logged in as <strong>@Model.Identities.First().Provider</strong>
            <br />
            <a href="/Home/Logoff">logout</a> 
        </body>
    </html> 

#### Testing the app:

Open a browser, navigate to the website and press the login button. You should see Auth0 widget with a google button. 

Once you are logged in, you should see welcome message.

Congratulations! 