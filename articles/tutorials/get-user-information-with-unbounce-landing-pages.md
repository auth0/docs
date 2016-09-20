# Get User Information with one-click social authentication on Unbounce Landing Pages

### Configuration on Auth0

1. Create an account in [Auth0](https://auth0.com)
2. Go to **Clients -> + Create Client**. Crete a Single Page Application on the Auth0 dashboard, go to Settings and take note of the Client ID and Domain. Also, add the `callback URL` in both `Allowed Callback URLs` and `Allowed Origins (CORS)` (it should be your unbounce page URL. For example:`http://unbouncepages.com/changeit`).
3. Go to **Connections -> Social** and Turn on the Social Providers you want to support.

> NOTE: you should configure the Client ID and Secret for each social connection.

![](/media/articles/scenarios/unbounce/social-connections.png)

## Configuration on Unbounce

* Add a button (or whatever UI element you consider) that will trigger the login with the provider. Take note of the button ID under `Properties`->`Element Metadata`.

* Add a new JavaScript to your Unbounce landing page, select `Before Body End Tag` under `Placement` and add this code. Also make sure to check jQuery as a dependency.

```
<script src="${auth0js_url_no_scheme}"></script>
<script type="application/javascript">

  var auth0 = new Auth0({
    domain:                 '${account.namespace}',
    clientID:               '${account.clientId}',
    callbackURL:            'REPLACE_WITH_YOUR_UNBOUNCE_PAGE_URL', // e.g http://unbouncepages.com/changeit
    responseType: 'token'
  });

</script>
```

> Note: You should use the clientID and Domain of the client you just configured.

* You need a way to pass the information coming from the social providers to Unbounce. The way you do that is by creating a Form and adding `Hidden fields` for each field. In the following example we are using the [normalized profile](/user-profile/normalized) fields `name`, `email`, `given_name`, `family_name`, `nickname` and `picture`. You can also include IdPs specific attributes such as `headline` if you are using LinkedIn.

![](/media/articles/scenarios/unbounce/custom-fields.png)

* Finally, go back to the JavaScript editor at Unbounce and add a click handler for each button to trigger the social authentication. Here, you must replace the button ID you took note of previously and the connection name, which can be seen under `Connections` -> `Social` and expanding the provider. For example, for google you would use `google-oauth2` and for linkedin, `linkedin`. Also, make sure that you replace the IDs properly, so instead of `#INPUT_1` you should put the ID of the form field (you can see it while editing the form, under `Field Name and ID`).

```
$('#REPLACE_WITH_BUTTON_ID').bind('click', function() {
  auth0.login({
    connection: 'REPLACE_WITH_CONNECTION_NAME',  // you get the connection name from Auth0 dashboard (expand social provider)
  });
});

  var result = auth0.parseHash(window.location.hash);

  if (result && result.idToken) {
    auth0.getProfile(result.idToken, function (err, profile) {
      // normalized attributes from Auth0
      $('#INPUT_1').val(profile.name);
      $('#INPUT_2').val(profile.email);
      $('#INPUT_3').val(profile.given_name);
      $('#INPUT_4').val(profile.family_name);
      $('#INPUT_5').val(profile.nickname);
      $('#INPUT_6').val(profile.picture);

      // provider-speicifc attributes
      if (profile.headline) $('#INPUT_7').val(profile.headline);
    });
  } else if (result && result.error) {
    alert('error: ' + result.error);
  }
 
```

That's it! Now you will be able to see the information provided by the IdP in the `Leads` section of your Unbounce Admin Panel, after the user submits the form.
