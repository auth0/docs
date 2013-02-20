# Using Auth0 with ASP.NET Web API and Single Page Apps

Integrating Auth0 with a Single Page Application and a Web API backend consists of very simple and straightforward instructions.

##Before you start

1. You will need Visual Studio 2012 and MVC4

##Integrating Auth0 with MVC4

####1. Create a simple MVC4 website

For this example, we will use the empty MVC4 Empty Template. Select __"FILE -> New project -> ASP.NET MVC 4 Web Application -> Empty"__

Once the default template unfolds, you can create a new Controller that derives from `ApiController`.

    public class CustomersController : ApiController
    {
        // GET api/customers
        public IEnumerable<string> Get()
        {
            return new string[] { "John Doe", "Nancy Davolo" };
        }
    }

You can also create a `HomeController` with an `Index` method and the `Index.cshtml` view that will be the shell for your JavaScript Single Page App. 

> A regular HTML file will also work.

####2. Setup the callback URL in Auth0

Go to [Settings](https://app.auth0.com/#/settings) and make sure to set the callback URL to whatever URL was assigned by Visual Studio:

```
http://localhost:some_random_port
```

![](img/settings-callback.png)

####3. Integrate the Login widget

On the html or `Index.cshtml` page that you added in the previous step, you can add the following code that instantiates the widget:

    <script src="https://sdk.auth0.com/auth0.js#client=@@account.clientId@@&amp;scope=openid&amp;response_type=token"></script>

Now, you have to call the login widget by using the JavaScript API `window.Auth0.signIn`. Here is an example using a `<button>`:

    <button onclick="window.Auth0.signIn({onestep: true})">Login</button>

Once a user has logged in using the widget, Auth0 will callback your application and send the `access_token` and `id_token` through the URL hash, like this `@@account.callback@@#access_token=...&id_token=...`. 

You can use the `access_token` to make an AJAX call to Auth0 backend to get all the user information, like the following code illustrates.

        var access_token = /access_token=([^&]*)/g.exec(window.location.hash);
        if (access_token) {
            $.ajax({
                url: 'https://api.auth0.com/userinfo?access_token=' + access_token[1],
                dataType: 'json',
                success: function (data, status, jqHXR) {
                    // data will be a JSON containing all the user properties
                },
                error: function (resp) {
                    if (resp.status == 401) {
                        // 'Unauthorized'
                    } else {
                        // error
                    }
                }
            });
        }

####4. Securing the Web API

Auth0 will also give you a JSON Web Token which has been signed with your client secret. You should send this token in the `Authorizaton` header of your AJAX calls and validate it on the Web API. To do that, we created a simple package that will provide the JSON Web Token validation. Execute the following on the Nuget Package Manager Console

    Install-Package WebApi.JsonWebToken

Add the following on the `Register` method of `WebApiConfig.cs`:

    config.MessageHandlers.Add(new JsonWebTokenValidationHandler()
    {
        Audience = "@@account.clientId@@",  // client id
        SymmetricKey = "@@account.clientSecret@@"   // client secret
    });

> You should put the client id and secret on Web.config

And finally, protect your Web API with the `[Authorize]` attribute

    public class CustomersController : ApiController
    {
        // GET api/customers
        [Authorize]
        public IEnumerable<string> Get()
        ...
    }

####5. Calling the secure API

The last step would be to call the API from your JavaScript application. To do so, you have to grab the `id_token` from the URL hash and send it to your API as part of the Authorization header (something like `Authorization: Bearer ...id_token...`). Here is some code to do that:

    var id_token = /id_token=([^&]*)/g.exec(window.location.hash);
    $.ajax({
        url: '/api/customers',
        dataType: 'json',
        beforeSend: function (request) {
            if (id_token) request.setRequestHeader("Authorization", "Bearer " + id_token[1]);
        },
        success: function (data, status, jqHXR) {
            // data has API response
        },
        error: function (resp) {
            if (resp.status == 401) {
                // the token was invalid, not authorized
            } else {
                // server error
            }
            
        }
    });

#### Testing the app:

Open a browser, navigate to the website and press the login button. You should see Auth0 widget with a Google button, which is the default connection. 

Once you are logged in, you can try calling the API with and without the Authorization header to make sure things are properly configured. 


#### Extra tips...

You can get the user id on the Web API side by doing:

      ClaimsPrincipal.Current.Claims.SingleOrDefault(c => c.Type == "sub").Value

If you want to get all the claims from the user (not just the id), you should specify `openid profile` (instead of just `openid`) in the scope parameter, like shown in this snippet

    <script src="https://sdk.auth0.com/auth0.js#client=@@account.clientId@@&amp;scope=openid%20profile&amp;response_type=token"></script>

> Notice that this will increase the size of the token, and it might break browser URL lenght.

You are done! Congratulations! 
