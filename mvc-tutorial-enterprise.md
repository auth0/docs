# Using Auth0 with ASP.NET MVC 4 - Enterprise Providers

The true power of Auth0 is that it open new possibilities to integrate your application with your customers user directories. In this tutorial we will guide you through a series of steps to enable enterprise single-sign on in your Asp.Net MVC 4 application. 

##Before you start

1. You will need Visual Studio 2012 and MVC4
2. Have completed the [previous tutorial](/mvc-tutorial). You are supposed to do these steps on top of the result of the previous tutorial.

##Integrating Auth0 with MVC4

####1. Create a new provisioning route

We will start by creating a route that will enable us to associate new companies to your application. Create a new controller named ProvisioningController with the following code:


    public class ProvisioningController : Controller
    {
        private readonly Auth0.Client auth0Client = new Auth0.Client(
                    "@@account.clientId@@",
                    "@@account.clientSecret@@",
                    "@@account.namespace@@");

        [HttpPost]
        public ActionResult Index(Auth0.ProvisioningTicket ticket)
        {
            return Json(auth0Client.CreateConnection(ticket));
        }
    }




> This is a very simple route for the purpose of the example. It is more likely that you will have a full process for company sign up and you will request some additional data than the one that Auth0 need. Explore the different overloads of ```Client.CreateConnection``` method.
>

####2. Enable an enterprise provider 

Go to [Enterprise Connections](https://app.auth0.com/#/connections/enterprise) in your dashboard and enable Google-Apps connections by providing the same credentials you use for Google OAuth2 in the previous tutorial. 

####3. Enable the widget

In the previous article we added the login widget to simplify the social and enterprise sign on. Auth0 also provides a very simple provisioning widget for enterprise providers. Modify your ```_LoginPartial.cshtml``` to add the **sign up my company** link:



    @if (Request.IsAuthenticated) {
        <text>
            Hello, @Html.ActionLink(User.Identity.Name, "Manage", "Account", routeValues: null, htmlAttributes: new { @class = "username", title = "Manage" })!
            @using (Html.BeginForm("LogOff", "Account", FormMethod.Post, new { id = "logoutForm" })) {
                @Html.AntiForgeryToken()
                <a href="javascript:document.getElementById('logoutForm').submit()">Log off</a>
            }
        </text>
    } else {
        <ul>
            <li><a href="javascript:window.Auth0.signIn({onestep: true})">login</a></li>
            <li><a href="javascript:window.Auth0.showProvisioning('/Provisioning')">sign up my company</a></li>
        </ul>
        <script src="https://sdk.auth0.com/auth0.js#client=@@account.clientId@@"></script>
    }


## Testing the app:

Open a browser, navigate to the website and press the **sign up my company** link. You should see the provisioning widget and if you have a google account you will be able to register a company:

![](img/widget-prov-in-aspnet.png)

Congratulations! 