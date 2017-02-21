## Adding Auth0 Credentials

The dependencies listed above require your client credentials in order for them to work. If you downloaded the seed project, or any sample project from here, these credentials are automatically set. Either way, you have to make sure they are there otherwise your app might crash.

Add your credentials in `Auth0.plist`. You have to create that file if it doesn't already exist in your project:

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
