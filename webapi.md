# Using Auth0 with ASP.NET Web API and Single Page Apps

Integrating Auth0 with a Single Page Application (SPA) and a Web API backend is very simple and straightforward.

##Before you start

1. You will need Visual Studio 2012 and MVC4 

> You can also browse and download the [sample code on GitHub](https://github.com/auth0/auth0-webapi-js-sample)

##Integrating Auth0 with MVC4

###1. Create a simple MVC4 website

For this example, we will use the empty MVC4 Empty Template. Select __"FILE -> New project -> ASP.NET MVC 4 Web Application -> Empty"__

Once the default template unfolds, create a new Controller that derives from `ApiController`.

    public class CustomersController : ApiController
    {
        // GET api/customers
        public IEnumerable<string> Get()
        {
            return new string[] { "John Doe", "Nancy Davolo" };
        }
    }

You can also create a `HomeController` with an `Index` method and the `Index.cshtml` view that will be the shell for your JavaScript Single Page App. 

> A regular HTML file would also work.

###2. Setup the callback URL in Auth0

Go to [Settings](@@uiURL@@/#/settings) and make sure to set the callback URL to the URL assigned by Visual Studio:

```
http://localhost:some_random_port
```

![](img/settings-callback.png)

###3. Integrate the Login widget

On the html or `Index.cshtml` page that you added in the previous step, you can add the following code that instantiates the widget:

    <script src="@@sdkURL@@/auth0.js#client=@@account.clientId@@&amp;scope=openid&amp;response_type=token"></script>

Now, you have to call the login widget by using the JavaScript API `window.Auth0.signIn`. Here is an example using a `<button>`:

    <button onclick="window.Auth0.signIn({onestep: true})">Login</button>

Once a user has logged in using the widget, Auth0 will callback your application and send the `access_token` and `id_token` through the URL hash. This URL will look like this: `@@account.callback@@#access_token=...&id_token=...`. 

You can use the returned `access_token` to make an AJAX call to Auth0 backend. For example, this code below will return the logged user information:

        var access_token = /access_token=([^&]*)/g.exec(window.location.hash);
        if (access_token) {
            $.ajax({
                url: 'https://@@account.namespace@@/userinfo?access_token=' + access_token[1],
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

> See the [User Profile](user-profile) document for details on the object returned.

###4. Securing the Web API

Auth0 will also give you a JSON Web Token which has been signed with your client secret. You should send this token in the `Authorizaton` header of your AJAX calls and validate it on the Web API. To accomplish this, we created a simple nuget package that will provide the JSON Web Token validation. 

####Run the following command on the Nuget Package Manager Console:

    Install-Package WebApi.JsonWebToken

####Add the following code snippet on the `Register` method of `WebApiConfig.cs`:

    config.MessageHandlers.Add(new JsonWebTokenValidationHandler()
    {
        Audience = "@@account.clientId@@",  // client id
        SymmetricKey = "@@account.clientSecret@@"   // client secret
    });

> It would be advisable to put these properties in your all config (Web.config)

####Protect your Web API with the `[Authorize]` attribute

    public class CustomersController : ApiController
    {
        // GET api/customers
        [Authorize]
        public IEnumerable<string> Get()
        ...
    }

###5. Calling the secured API

The last step would be to call the API from your JavaScript application. To do so, you have to extract the `id_token` from the URL hash, and send it to your API as part of the Authorization header (e.g. `Authorization: Bearer ...id_token...`). Here is some code to do that:

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

###6. Testing the app:

Open a browser, navigate to the website and press the login button. You should see Auth0 widget with a Google button, which is the default connection. 

Once you are logged in, you can try calling the API with and without the Authorization header to make sure things are properly configured. 


### Some extra tips...

You can get the user id on the Web API side by doing:

      ClaimsPrincipal.Current.Claims.SingleOrDefault(c => c.Type == "sub").Value

If you want to get all the claims from the user (not just the id), you should specify `openid profile` (instead of just `openid`) in the scope parameter:

    <script src="@@sdkURL@@/auth0.js#client=@@account.clientId@@&amp;scope=openid%20profile&amp;response_type=token"></script>

> Notice that this will add more user attributes to the token, and consequently increase the size of it. Some browsers have limits on URL lengths.

You are done! Congratulations! 

## Download the sample

Browse the sample on GitHub: <https://github.com/auth0/auth0-webapi-js-sample>
