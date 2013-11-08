# Linking Accounts

Auth0 supports the association of different accounts. Applications often support multiple identity providers. Through linking, a user can authenticate with one identity provider and later on with another, but appear to the app as being the same. 

**Linking through Auth0 Login Widget**

```
<script src="@@widget_url@@"></script>
<script type="text/javascript">
  var widget = new Auth0Widget({
    domain:       '@@account.namespace@@',
    clientID:     '@@account.clientId@@', 
    callbackURL:  '@@account.callback@@',
    dict: {
      signin: {
        title: 'Link with another account'
      }
    }
  });
</script>

<a href="javascript:widget.show({ access_token: '...LOGGED_IN_USER_ACCESS_TOKEN...' })">Add account</a>
```

> Notice the `access_token` fragment of the URL that is normally not present. This is the `access_token` Auth0 will generate when a user logs in. It identifies a logged in user univocally in Auth0.

**Manually initiating the authentication transaction**

`https://@@account.namespace@@/authorize?response_type=code&scope=openid`
`&client_id=@@account.clientId@@`
`&redirect_uri=@@account.callback@@`
`&access_token=...LOGGED_IN_USER_ACCESS_TOKEN...`

All linked identities will show up in the `User Profile` like in this example:

```
{
  "clientID": "FnMZ8gwv39....ZAeKc",
  "email": "your@mail.com",
  "family_name": "Pace",
  "given_name": "Eugenio",
  "identities": [
    {
      "access_token": "ya29.AHES6.......iNkgkE_ryDsTE",
      "provider": "google-oauth2",
      "user_id": "12345678901234567890",
      "connection": "google-oauth2",
      "isSocial": true
    },
    {
      "access_token": "EwAwAq1DBAAUGCC....qJQloRoZbmCAAA",
      "provider": "windowslive",
      "user_id": "9876543210987654321",
      "connection": "windowslive",
      "isSocial": true
    }
  ],
  "locale": "en",
  "name": "Eugenio Pace",
  "nickname": "eugeniop",
  "user_id": "google-oauth2|12345678901234567890"
}

```

> Notice that the primary `user_id` is referring to the first identity the user authenticated with (Google in the example). Also, all user properties will continue to be those of the primary identity. There's no merging of user profiles with associated identities.

### How to obtain the access_token of the user logged in?

The SDKs should make this very easy. The SDK for your platform will make it available in the most natural way for said platform. As an example, if you are using ASP.NET, the `access_token` is available as a claim:

```
<%= ClaimsPrincipal.Current.FindFirst("access_token").Value %>
```

If you are rolling up your own implementation, it will be available through the standard OAuth2 flow: 

  1. User logs in and returns to the app with a `code`
  2. The app exchanges the `code` for the `access_token`

The details of these exchanges are available in the [protocols section](protocols).

### Unlinking Accounts

To unlink a specific account, POST request to the following url:

`https://@@account.namespace@@/unlink?`

Body should be:

```
{
	clientID: @@account.clientId@@,
    access_token: LOGGED_IN_USER_ACCESS_TOKEN, // Primary identity access_token
    user_id: LINKED_USER_ID // (provider|id)
}
```

Using the sample `User Profile` above, to __unlink__ the Windows Live Id identity, you would send, `user_id: 'windowlive|9876543210987654321'`.

