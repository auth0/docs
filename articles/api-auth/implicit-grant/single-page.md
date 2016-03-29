# API Auth: Using the Implicit Grant from a Single Page application

<%=include('../_preview-warning') %>

After the [**Resource Server**](/api-auth/resource-servers/node-js) has been created, you can create a Single Page application which obtains an `access_token` using the [**Implicit Grant**](/api-auth/grant/implicit) workflow.

## Initiate the Implicit Grant Flow

Configure your Singe Page application to initiate the Implicit Grant workflow. To do that you will need to send the user to the authentication URL:

```text
https://{AUTH0_DOMAIN}/i/oauth2/authorize?scope={SCOPE}&response_type=token&client_id={AUTH0_CLIENT_ID}&redirect_uri={CALLBACK_URL}
```

Where:

* `AUTH0_DOMAIN`: Your Auth0 domain.
* `SCOPE`: The scopes which you want to request authorization for. These must be separated by a space.
* `AUTH0_CLIENT_ID`: Your application's Client ID
* `CALLBACK_URL`: The URL to which the Authorization Server (Auth0) will redirect the User Agent (Browser) after authorization has been granted by the User. The `access_token` (and optionally a `refresh_token`) will be available in the hash fragment of this URL. This URL must be specified as a valid callback URL when [configuring the client](/api-auth/config/clients).

For example:

```html
<a href="https://${account.namespace}/i/oauth2/authorize?scope=appointments%20contacts&response_type=token&client_id=${account.clientId}&redirect_uri=${account.callback}">
	Sign In with Organizer
</a>
```

## Extracting the Access Token

After the Authorization Server has redirected back to the Client, you can extract the `access_token` from the hash fragment of the URL:

```js
function getParameterByName(name) {
  var match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

function getAccessToken() {
  return getParameterByName('access_token');
}

$(function () {
  var access_token = getAccessToken();

  // Use the access token to make API calls
  // ...
});
```

## Using the Access Token

Once the `access_token` has been obtained it can be used to make calls to the Resource Server by passing it as a Bearer Token in the `Authorization` header of the HTTP request:

``` js
// Use the access token to make API calls
$('#get-appointments').click(function(e) {
	e.preventDefault();

	$.ajax({
	  cache: false,
	  url: "http://localhost:7001/api/appointments",
	  headers: { "Authorization": "Bearer " + access_token }
	});
});
```
