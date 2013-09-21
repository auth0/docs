# Linking Accounts

Auth0 supports the association of different accounts. Applications often support multiple identity providers. Through linking, a user can authenticate with one identity provider and later on with another, but appear to the app as being the same. 

**Linking through Auth0 Login Widget**

```
<script src="@@sdkURL@@/auth0.js#access_token=...LOGGED_IN_USER_ACCESS_TOKEN...&client=@@account.clientId@@&scope=openid"></script>
<a href="javascript: window.Auth0.signIn({onestep: true, title: 'Link with another account'})">Add account</a>
```

> Notice the `access_token` fragment of the URL that is normally not present. This is the `access_token` Auth0 will generate when a user logs in. It identifies a logged in user univocally in Auth0.

**Manually initiating the authentication transaction**

`https://@@account.namespace@@/authorize?response_type=code&scope=openid`
`&client_id=@@account.clientId@@`
`&redirect_uri=@@account.callback@@`
`&access_token=...LOGGED_IN_USER_ACCESS_TOKEN...`

### How to obtain the access_token of the user logged in?

The SDKs should make this very easy. The SDK for your platform will make it available in the most natural way for said platform. As an example, if you are using ASP.NET, the `access_token` is available as a claim:

```
<%= ClaimsPrincipal.Current.FindFirst("access_token").Value %>
```

If you are rolling up your own implementation, it will be available through the standard OAuth2 flow: 

1- User logs in and returns to the app with a `code`
2- The app exchanges the `code` for the `access_token`

The details of these exchanges are available in the [protocols section](protocols).

### Unlinking Accounts

To unlink a specific account, POST request to the following url:

`https://@@account.namespace@@/unlink?`
`&client_id=@@account.clientId@@`
`&access_token=...LINKED_USER_ACCESS_TOKEN...`
