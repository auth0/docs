# Auth0 Workshop

These are the exercises for the __Auth0 Workshop__.

## Exercise 1

Create a new ASP.Net application and register it in Auth0.
Follow the tutorial until step 4. Use the code snippet of the Step 4 to replace the login link functionality.

## Exercise 2

Add the Logout functionality as explained in the tutorial.

## Exercise 3

Make the About page secure with the `[Authorize]` attribute.
Replace the content of loginForm in Login.cshtml and show the sign in widget there.

__Hint:__ use `container: 'loginForm'` and `chrome: true`.

## Exercise 4

Use the `state` parameter to keep the URL the user wants to access.

__Hint:__ add this option to the signin call `state: 'ru=@Request.QueryString["ReturnUrl"]'` in the Login.cshtml.

## Exercise 5

Show every claim in the About page.

Add `ViewBag.User = ClaimsPrincipal.Current.Claims` and then in the About.cshtml:

	<ul>
	@foreach (var claim in ViewBag.User)
	{
	    <li>@claim.Type : @claim.Value</li>
	}
	</ul>

## Exercise 6

To extend the profile metadata create a new form in the About page asking for `Telephone` and POSTs the value to `/Profile` in your ASP.Net application.
Using an instance of Auth0 client with the global client id and secret, update the current user's metadata.
Verify next time the user logins has this new claim in the About page.

__Hint:__ user_id is another claim.
__Hint:__ found global client_id and client_secret on API Explorer.

## Exercise 7

Create a new WCF Project and Service. Add a call to the new service from the ASP.Net application.

## Exercise 8

Follow the <a href="https://docs.auth0.com/wcf-tutorial" target="_blank">WCF Tutorial</a>  in order to secure your web service.

## Exercise 9

Create a new WCF application in Auth0.
Change the Client ID and Secret in the WCF service with the new credentials.
Lastly instead of attaching the original id_token, obtain a new __delegation token__ using the original one.

	// get JsonWebToken from logged in user
	string token = ClaimsPrincipal.Current.FindFirst("id_token").Value;

	// create an Auth0 client to call the /delegation endpoint using the client id and secret of the caller application
	var auth0 = new Auth0.Client("... asp.net client id ...", "... asp.net client secret ...", "... namespace ...");
	var result = auth0.GetDelegationToken(token, "...client id of the target WCF service...");