## Configure Callback URLs

Callback URLs are the URLs that Auth0 invokes after the authentication process. Auth0 routes your application back to this URL and appends additional parameters to it, including a token. Since callback URLs can be manipulated, you will need to add your application's URL to your client's *Allowed Callback URLs* for security. This will enable Auth0 to recognize these URLs as valid. If omitted, authentication will not be successful.

That being said, go to your [Client's Dashboard](${manage_url}/#/applications/${account.clientId}/settings) and make sure that *Allowed Callback URLs* contains the following:
```shell
 ${account.clientId}://\*.auth0.com/authorize
```

## Set Credentials

The [dependencies](#dependencies) listed above requires that you set your credentials in two different `.plist` files in order for them to work. If you downloaded the seed project, or any sample project from here, these credentials are automatically set. Either way, you have to make sure they are there—otherwise your app might crash.

Make sure you have the following entries in your project's `Info.plist`:

<table class="table">
  <thead>

```
<tr>
  <th>Key</th>
  <th>Value</th>
</tr>
```

  </thead>
  <tr>

```
<td>Auth0ClientId</td>
<td>${account.clientId}</td>
```

  </tr>
  <tr>

```
<td>Auth0Domain</td>
<td>${account.namespace}</td>
```

  </tr>
</table>

Also, make sure you have the following entries in a file named `Auth0.plist`. You have to create that file if it doesn't already exist:

<table class="table">
  <thead>

```
<tr>
  <th>Key</th>
  <th>Value</th>
</tr>
```

  </thead>
  <tr>

```
<td>ClientId</td>
<td>${account.clientId}</td>
```

  </tr>
  <tr>

```
<td>Domain</td>
<td>${account.namespace}</td>
```

  </tr>
</table>