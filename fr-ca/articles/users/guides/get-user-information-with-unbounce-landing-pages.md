---
description: How to get user information with one-click social authentication on Unbounce landing pages.
topics:
  - users
  - user-management
  - search
  - unbounce
contentType:
  - how-to
useCase:
  - manage-users
---
# Get User Information on Unbounce Landing Pages

## Auth0 Configuration

1. Create an Auth0 account and navigate to the [dashboard](${manage_url}).
1. Go to [Applications](${manage_url}/#/applications) and click **+ Create Application**. Pick the `Single-Page Application` option and go to **Settings**. Note the **Client ID** and **Domain**. Also, add the `callback URL` in both **Allowed Callback URLs** and **Allowed Origins (CORS)** (it should be your Unbounce page URL. For example:`http://unbouncepages.com/changeit`).
1. Go to **Connections > Social** and enable the social providers you want to support.

![Social Connections](/media/articles/scenarios/unbounce/social-connections.png)

## Unbounce Configuration

* Add a button (or whatever UI element you consider) that will trigger the login with the provider. Take note of the button ID under **Properties > Element Metadata**.
* Add a new JavaScript to your Unbounce landing page, select `Before Body End Tag` under `Placement` and add this code. Also make sure to check jQuery as a dependency.

```html
<script src="${auth0js_url}"></script>
<script type="application/javascript">
  var webAuth = new auth0.WebAuth({
    domain:       '${account.namespace}',
    clientID:     '${account.clientId}',
    audience: 'https://${account.clientId}/userinfo'
    redirectUri:  'REPLACE_WITH_YOUR_UNBOUNCE_PAGE_URL', // e.g http://unbouncepages.com/changeit
    scope: 'openid profile email',
    responseType: 'token id_token',
  });
</script>
```

::: note
You should use the clientID and Domain of the application you just configured.
:::

* You need a way to pass the information coming from the social providers to Unbounce. The way you do that is by creating a Form and adding `Hidden fields` for each field. In the following example we are using the fields `name` and `email`.
  ![](/media/articles/scenarios/unbounce/custom-fields.png)
* Finally, go back to the JavaScript editor at Unbounce and add a click handler for each button to trigger the social authentication. Here, you must replace the button ID you took note of previously and the connection name, which can be seen in the [dashboard](${manage_url}) under under **Connections > Social** and expanding the provider. For example, for Google you would use `google-oauth2` and for LinkedIn, `linkedin`. Also, make sure that you replace the IDs properly, so instead of `#name` and `#email` you should put the ID of the form fields in question (you can see them while editing the form, under `Field Name and ID`).

```js
$('#REPLACE_WITH_BUTTON_ID').bind('click', function() { 
  webAuth.authorize({
    connection: 'YOUR CONNECTION NAME'
  });
});

// After authentication occurs, the parseHash method parses a URL hash fragment to extract the result of an Auth0 authentication response.

webAuth.parseHash({ hash: window.location.hash }, function(err, authResult) { 
  if (err) { 
    return console.log(err); 
  }

  if (authResult != null && authResult.accessToken != null) {
    webAuth.client.userInfo(authResult.accessToken, function(err, user) {
      $('#name').val(user.name); 
      $('#email').val(user.email); 
    }); 
  } 

});
```

Now you will be able to see the information provided by the IdP in the `Leads` section of your Unbounce Admin Panel, after the user submits the form.
