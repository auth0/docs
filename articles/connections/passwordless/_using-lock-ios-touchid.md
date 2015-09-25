# Authenticate users with Touch ID

A feature specific to iOS is the support for Touch ID, which allows users to authenticate with their fingerprint (biometric authentication). 

![](/media/articles/connections/passwordless/passwordless-touchid-start.png)

During sign up the library will create a user in Auth0, create a key pair on the device and then upload the public key in the user. 

![](/media/articles/connections/passwordless/passwordless-touchid-flow.png)

The private key is stored in the keystore of the device. Each time the users try to authenticate, their fingerprint is used to retrieve fhe private key from the keystore, create a token, sign it with the private key and send it to Auth0. Auth0 will then return an `id_token`, the profile and optionally also a `refresh_token`.

> You can use Touch ID with an iPhone 5s or later, iPad Air 2, or iPad mini 3 or later.

## Implementation

### Using the Auth0 Lock

<%= include('./_introduction-lock', { repository: 'Lock.iOS-OSX', platform: 'iOS', docsUrl: 'lock-ios' }) %>

<% if (language === "objc") { %>
<%= include('./_touchid-controller-objc') %>
<% } else { %>
<%= include('./_touchid-controller-swift') %>
<% } %>

> A sample application is available in [the Lock.iOS-OSX repository on GitHub](https://github.com/auth0/Lock.iOS-OSX/tree/master/Examples/TouchID).

### Using your own UI

If you choose to build your own UI you'll also need to use our [TouchIDAuth](https://github.com/auth0/TouchIDAuth) library which will take care of the Touch ID specific features.

You will first start by signing up a user in a Database Connection:

<% if (language === "objc") { %>
<%= include('./_touchid-signup-objc') %>
<% } else { %>
<%= include('./_touchid-signup-swift') %>
<% } %>

> You can generate a random password to avoid asking one to the user. He can later change it.

After the user signed up, you will use the `idToken` to register the public key for the user, that's what 

First you need to a place to store a Auth0 API client with the token until you register the key, and a place to store the TouchID component:

<% if (language === "objc") { %>
<%= include('./_touchid-properties-objc') %>
<% } else { %>
<%= include('./_touchid-properties-swift') %>
<% } %>

Now we'll implement the following method to perform TouchID authentication

<% if (language === "objc") { %>
<%= include('./_touchid-login-method-objc') %>
<% } else { %>
<%= include('./_touchid-login-method-swift') %>
<% } %>

First let's create and store the API client 

<% if (language === "objc") { %>
<%= include('./_touchid-init-client-objc') %>
<% } else { %>
<%= include('./_touchid-init-client-swift') %>
<% } %>

Now let's configure our TouchID Authentication component

<% if (language === "objc") { %>
<%= include('./_touchid-configure-component-objc') %>
<% } else { %>
<%= include('./_touchid-configure-component-swift') %>
<% } %>

Then to start authentication, just add this line

<% if (language === "objc") { %>
```objc
[self.authentication start];
```

> [The Lock.iOS-OSX repository on GitHub](https://github.com/auth0/Lock.iOS-OSX/tree/master/Pod/Classes/TouchID) shows in detail how the same flow was used to build the UI of the Lock.iOS - you can use this as an example if you wish to build your own UI for Touch ID authentication.

<% } else { %>
```swift
self.authentication.start()
```
<% } %>

