# Get User Information with one-click social authentication on Unbounce Landing Pages

![](/media/articles/scenarios/unbounce/unbounce.gif)

### Configuration on Auth0

1. Create an account in [Auth0](https://auth0.com)
2. Go to **Applications -> NEW**. Crete an HTML5 Application on Auth0 dashboard and go to Settings and take note of the Client ID and Domain.
3. Go to **Connections -> Social** and Turn on the Social Providers you want to support.

![](https://cloudup.com/c-l39hZ2KH4+)

> NOTE: if you want to show your own logo on the consent page of the social provider, click on the provider logo and it will be expanded. Click on How to obtain a CLient ID link for instructions.

## Configuration on Unbounce

1. Add a new JavaScript to your Unbounce landing page and replace the Auth0 domain and client id with the values you've got from Auth0. Also make sure to check jQuery as a dependency.

```
<script src="${auth0js_url_no_scheme}"></script>
<script type="application/javascript">
  
  var auth0 = new Auth0({
    domain:                 'REPLACE_WITH_YOUR_AUTH0_DOMAIN',
    clientID:               'REPLACE_WITH_YOUR_AUTH0_CLIENT_ID', 
    callbackURL:            'REPLACE_WITH_YOUR_UNBOUNCE_PAGE_URL', // e.g http://unbouncepages.com/changeit
    callbackOnLocationHash: true
  });
  
</script>
```

2. Add a button (or whatever UI element you consider) that will trigger the login with the provider. Take note of the button ID under Advanced.

3. You need a way to pass the information coming from the social providers to Unbounce. The way you do that is by creating a Form and add Hidden fields for each field. In the following example we are using the [normalized profile](/user-profile) fields `name`, `email`, `given_name`, `family_name`, `nickname` and `picture` and at the end you can see a LinkedIn field called `headline`.

  ![](https://cloudup.com/caDtUPj4EO3+)

3. Finally, go back to the JavaScript editor at Unbounce and add a click handler for each button to trigger the social authentication.

```
$('#REPLACE_WITH_BUTTON_ID').bind('click', function() {
  auth0.login({
    connection: 'REPLACE_WITH_CONNECTION_NAME',  // you get the connection name from Auth0 dashboard (expand social provider)
    popup: true
  }, callback);
      
  return false;
});

function callback(err, profile, id_token, access_token, state) {
  if (err) alert('There was an error, please try again');
  
  // normalized attributes from Auth0
  $('#INPUT_1').val(profile.name);
  $('#INPUT_2').val(profile.email);
  $('#INPUT_3').val(profile.given_name);
  $('#INPUT_4').val(profile.family_name);
  $('#INPUT_5').val(profile.nickname);
  $('#INPUT_6').val(profile.picture);
  
  // provider-speicifc attributes
  if (profile.headline) $('#INPUT_7').val(profile.headline);
}

```

> Note: the name of the connection (REPLACE_WITH_CONNECTION_NAME) can be taken from the Auth0 dashboard under Connections -> Social and expanding the provider. Also, make sure to change the input IDs.

