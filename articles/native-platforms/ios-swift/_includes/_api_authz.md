## Configuring Your Application

## Dependences

This quickstart uses the Auth0.swift SDK to help you add authentication and API authorization to your iOS app. You will need to add this dependency to your Podfile.

```ruby
use_frameworks!
pod "Auth0", :git => 'https://github.com/auth0/Auth0.swift.git'
```

Then, run `pod install`.

> For further reference on Cocoapods, check [their official documentation](http://guides.cocoapods.org/using/getting-started.html).

## Configuration

First, add a `Auth0.plist` file to your main bundle. This should contain the ClientId and Domain from your Auth0 tenant configuration:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
   <key>ClientId</key>
   <string>{YOUR_CLIENT_ID}</string>
   <key>Domain</key>
   <string>{YOUR_DOMAIN}</string>
</dict>
</plist>
```

In your application's `Info.plist` file, register your iOS Bundle Identifer as a custom scheme:

```xml
<key>CFBundleURLTypes</key>
<array>
    <dict>
        <key>CFBundleTypeRole</key>
        <string>None</string>
        <key>CFBundleURLName</key>
        <string>auth0</string>
        <key>CFBundleURLSchemes</key>
        <array>
            <string>$(PRODUCT_BUNDLE_IDENTIFIER)</string>
        </array>
    </dict>
</array>
```

Finally, go to Auth0 Dashboard and go to application's settings. Make sure you have in Allowed Callback URLs a URL with the following format:

`{YOUR_BUNDLE_IDENTIFIER}://{YOUR_AUTH0_DOMAIN}/ios/{YOUR_BUNDLE_IDENTIFIER}/callback`

## Initiate Authentication and Authorization

Your Swift application will need to use Auth0.swift to kick off the OAuth flow using the code below:

```swift
@IBAction func StartAuthentication( sender: AnyObject? ) {
    
    let params: [String: String] = [
        "audience":"{YOUR AUDIENCE}",
        "scope":"{YOUR SCOPES}",
        "response_type":"code",
        ]
    
    Auth0
        .webAuth()
        .parameters(params)
        .start(authCallback);
    
}

func authCallback(result:Result<Credentials>) {
    print("In callback...")
    
    print(result)
    
    switch result {
    case .success(let credentials):        
        DispatchQueue.main.async {
            // here you have the access token, id token
            // and (optionally) refresh token available to your app
            // credentials.accessToken
            // credentials.idToken
            // credentials.refreshToken
        }
    case .failure(let error):
        print(error)
    }
    
}
```

The `audience` parameter should contain your API identifier from the Dashboard. The `scope` parameter should include one or more scopes you defined in the Dashboard for your API, in addition to any of the standard openid scopes.

You also need to add the following method to your application's `AppDelegate`:

```swift
func application(_ app: UIApplication, open url: URL, options: [UIApplicationOpenURLOptionsKey : Any] = [:]) -> Bool {
    return Auth0.resumeAuth(url, options:options)
}
```

## Making an Authenticated API Call

Use the `access_token` to invoke your Resource Server (API):

```swift
let headers = [
  "content-type": "application/json",
  "authentication": "Bearer {ACCESS_TOKEN}"
]

var request = NSMutableURLRequest(URL: NSURL(string: "https://someapi.com/api")!,
                                        cachePolicy: .UseProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.HTTPMethod = "GET"
request.allHTTPHeaderFields = headers

let session = NSURLSession.sharedSession()
let dataTask = session.dataTaskWithRequest(request, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    println(error)
  } else {
    let httpResponse = response as? NSHTTPURLResponse
    println(httpResponse)
  }
})

```

The Resource Server (API) should be configured to verify the JWT and any claims contained within it. Because the Resource Server is utilizing the RS256 signature method, tokens are signed using Auth0's private key for your account. Verification is done using the corresponding public key, which can be found at the following standard [JWKS (JSON Web Key set)](https://self-issued.info/docs/draft-ietf-jose-json-web-key.html) URL: [https://${account.namespace}/.well-known/jwks.json]. You can use any [recommended JWT library](https://jwt.io) to validate the standard claims returned in the token. These details are outside the scope of this quickstart tutorial. More information can be found [in our documentation](https://auth0.com/docs/api-auth/config/asking-for-access-tokens).
