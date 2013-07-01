# Link accounts

Let's say a user logged in with Google and now she wants to associate her Twitter account to login to the application as the same person, or another user logged in with an Active Directory account and wants to be recognized as the same user when logging in with his Microsoft Account (LiveID). You can allow your users to link accounts from different providers, very easily, as shown below.

**Using Auth0 Login Widget**

```
<script src="@@sdkURL@@/auth0.js#access_token=....LOGGED_IN_USER_ACCESS_TOKEN...&client=@@account.clientId@@&scope=openid"></script>
<a href="javascript: window.Auth0.signIn({onestep: true, title: 'Link with another account'})">Add account</a>
```

> Notice the `access_token` fragment of the URL. This is the access_token Auth0 will generate when a user logs in. It identifies a logged in user univocally.

** or manually triggering a redirect to... **

`https://@@account.namespace@@/authorize?response_type=code&scope=openid`
`&client_id=@@account.clientId@@`
`&redirect_uri=@@account.callback@@`
`&access_token=...LOGGED_IN_USER_ACCESS_TOKEN...`

### How to obtain the access_token of the user logged in?

The SDKs should make this easy for you, but essentially, after the user logs in and comes back to your app with a `code` in the querystring, that code is exchanged with the `access_token`. 

As an example, in ASP.NET we add the access_token as a claim that can be accessed like this:

```
<%= ClaimsPrincipal.Current.FindFirst("access_token").Value %>
```

### Unlink

To unlink a specific identity, perform a post request to the following url:

`https://@@account.namespace@@/unlink?`
`&client_id=@@account.clientId@@`
`&access_token=...LINKED_USER_ACCESS_TOKEN...`
