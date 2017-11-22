---
description: How to get user information with one-click social authentication on Unbounce landing pages.
---
# Get User Information on Unbounce Landing Pages

## Auth0 Configuration

1. Create an Auth0 account and navigate to the [dashboard](${manage_url}).
2. Go to [Clients](${manage_url}/#/clients) and click **+ Create Client**. Pick the `Single Page Application` option and go to **Settings**. Note the **Client ID** and **Domain**. Also, add the `callback URL` in both **Allowed Callback URLs** and **Allowed Origins (CORS)** (it should be your unbounce page URL. For example:`http://unbouncepages.com/changeit`).
3. Go to **Connections > Social** and enable the social providers you want to support.

![Social Connections](/media/articles/scenarios/unbounce/social-connections.png)

## Unbounce Configuration

* Add a button (or whatever UI element you consider) that will trigger the login with the provider. Take note of the button ID under **Properties > Element Metadata**.

* Add a new JavaScript to your Unbounce landing page, select `Before Body End Tag` under `Placement` and add this code. Also make sure to check jQuery as a dependency.

```html
<script src="${auth0js_urlv8}"></script>
<script type="application/javascript">
  var webAuth = new auth0.WebAuth({
    domain:       '${account.namespace}',
    clientID:     '${account.clientId}',
    redirectUri:  'REPLACE_WITH_YOUR_UNBOUNCE_PAGE_URL', // e.g http://unbouncepages.com/changeit
    responseType: 'token'
  });
</script>
```

::: note
You should use the clientID and Domain of the client you just configured.
:::

* You need a way to pass the information coming from the social providers to Unbounce. The way you do that is by creating a Form and adding `Hidden fields` for each field. In the following example we are using the [normalized profile](/user-profile/normalized) fields `name`, `email`, `given_name`, `family_name`, `nickname` and `picture`. You can also include IdPs specific attributes such as `headline` if you are using LinkedIn.

![](/media/articles/scenarios/unbounce/custom-fields.png)

* Finally, go back to the JavaScript editor at Unbounce and add a click handler for each button to trigger the social authentication. Here, you must replace the button ID you took note of previously and the connection name, which can be seen under `Connections` -> `Social` and expanding the provider. For example, for google you would use `google-oauth2` and for linkedin, `linkedin`. Also, make sure that you replace the IDs properly, so instead of `#INPUT_1` you should put the ID of the form field (you can see it while editing the form, under `Field Name and ID`).

```js
$('#REPLACE_WITH_BUTTON_ID').bind('click', function() {
  webAuth.authorize({
    connection: 'REPLACE_WITH_CONNECTION_NAME',  // you get the connection name from Auth0 dashboard (expand social provider)
  });
});

// After authentication occurs, the parseHash method parses a URL hash fragment to extract the result of an Auth0 authentication response.

webAuth.parseHash({ hash: window.location.hash }, function(err, authResult) {
  if (err) {
    return console.log(err);
  }

  // Use the accessToken to collect userInfo
  webAuth.client.userInfo(authResult.accessToken, function(err, user) {
    // normalized attributes from Auth0
    $('#INPUT_1').val(user.name);
    $('#INPUT_2').val(user.email);
    $('#INPUT_3').val(user.given_name);
    $('#INPUT_4').val(user.family_name);
    $('#INPUT_5').val(user.nickname);
    $('#INPUT_6').val(user.picture);

    // provider-specific attributes
    if (user.headline) $('#INPUT_7').val(user.headline);
  });
});
```

Now you will be able to see the information provided by the IdP in the `Leads` section of your Unbounce Admin Panel, after the user submits the form.
