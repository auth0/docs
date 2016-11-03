## Configure Callback URLs

Callback URLs are the URLs that Auth0 invokes after the authentication process. Auth0 routes your application back to this URL and appends additional parameters to it, including a token. Since callback URLs can be manipulated, you will need to add your application's URL to your client's *Allowed Callback URLs* for security. This will enable Auth0 to recognize these URLs as valid. If omitted, authentication will not be successful.

That being said, go to your [Client's Dashboard](${manage_url}/#/applications/${account.clientId}/settings) and make sure that *Allowed Callback URLs* contains the following:
```shell
 ${account.clientId}://\*.auth0.com/authorize
```

## Set Credentials

The [dependencies](#dependencies) listed above requires that you set your credentials in two different `.plist` files in order for them to work. If you downloaded the seed project, or any sample project from here, these credentials are automatically set. Either way, you have to make sure they are there—otherwise your app might crash.

You can add the following entries in your project's `Info.plist`:

```xml
<key>Auth0ClientId</key>
<string>${account.clientId}</string>
<key>Auth0Domain</key>
<string>${account.namespace}</string>
```

Alternatively you can add your credentials in `Auth0.plist`. You have to create that file if it doesn't already exist:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>ClientId</key>
  <string>${account.clientId}</string>
  <key>Domain</key>
  <string>${account.namespace}</string>
</dict>
</plist>
```
