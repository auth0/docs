A feature specific to iOS is the support for *Touch ID*, which allows users to authenticate with their fingerprint (biometric authentication).

![](/media/articles/connections/passwordless/passwordless-touchid-start.png)

During sign-up, the library will generate a key pair on the device, create a user in Auth0, and register the public key for the user:

![](/media/articles/connections/passwordless/passwordless-touchid-flow.png)

The private key is stored in the keystore of the device. Each time a user initiates authentication with a valid fingerprint, *Touch ID* retrieves the private key from the keystore, creates a token, signs it with the private key and sends it to Auth0. Auth0 then returns an ID Token, the user profile and, optionally, a <dfn data-key="refresh-token">Refresh Token</dfn>.

::: note
You can use Touch ID with an iPhone 5s or later, an iPad Air 2, or an iPad mini 3 or later.
:::

## Implementation

### Using the Auth0 Lock

<%= include('./_introduction-lock', { repository: 'Lock.iOS-OSX', platform: 'iOS', docsUrl: 'lock-ios' }) %>

<div>
<% if (language === "objc") { %>
<%= include('./_touchid-controller-objc') %>
<% } else { %>
<%= include('./_touchid-controller-swift') %>
<% } %>
</div>

### Using your own UI

If you choose to build your own UI, you must install our [TouchIDAuth](https://github.com/auth0/TouchIDAuth) library to handle the features specific to *Touch ID*.

Begin by signing up a user in a Database Connection:

<div>
<% if (language === "objc") { %>
<%= include('./_touchid-signup-objc') %>
<% } else { %>
<%= include('./_touchid-signup-swift') %>
<% } %>
</div>

::: note
You can generate a random password to avoid asking the user for one at this time. The user can change it later.
:::

Once the user has signed up, use the `idToken` to register the public key for the user.

First, you will need a place to store an Auth0 API application with the token until you register the key, and a place to store the TouchID component:

<div>
<% if (language === "objc") { %>
<%= include('./_touchid-properties-objc') %>
<% } else { %>
<%= include('./_touchid-properties-swift') %>
<% } %>
</div>

Now implement the following method to perform TouchID authentication:

<div>
<% if (language === "objc") { %>
<%= include('./_touchid-login-method-objc') %>
<% } else { %>
<%= include('./_touchid-login-method-swift') %>
<% } %>
</div>

Then create and store the API application:

<div>
<% if (language === "objc") { %>
<%= include('./_touchid-init-client-objc') %>
<% } else { %>
<%= include('./_touchid-init-client-swift') %>
<% } %>
</div>

Now configure the TouchID Authentication component:

<div>
<% if (language === "objc") { %>
<%= include('./_touchid-configure-component-objc') %>
<% } else { %>
<%= include('./_touchid-configure-component-swift') %>
<% } %>
</div>

Then, to begin authentication, add this line:

<% if (language === "objc") { %>
```objc
[self.authentication start];
```

<% } else { %>
```swift
self.authentication.start()
```
<% } %>
