---
	Title: Identity Providers
---

# Identity Providers 

Auth0 is an "identity hub" that supports a number of authentication providers using different protocols: OAuth2, WS-Federation, etc.

![](http://markdownr.blob.core.windows.net/images/2142124826.png)

Auth0 sits in between your app and the system that authenticate your users. 

> Each relationship between Auth0 and these systems is called a 'connection'.

The handshake between the identity providers an Auth0 is completely abstracted from your app, so you don't need to worry about their idiosyncracies and details (and nuances). For example, Google has two (three if you count Google Apps) different implementations: one that responds to the OpenId protocol and another one that uses OAuth2. Office 365, on the other hand, uses WS-Federation and SAML tokens.

### Google OpenID
Configuring Google OpenID is straight forward and perhaps one of the simplest to configure, becuase...well, there's no configuration!

Once you configure a connection to use Google OpenId, you are ready to go. The authentication flow is pretty straight forward:

1. A user initiates login in the app
2. User is redirected to Auth0 
3. User's immediately redirected to Google for authentication. 
4. User enters username and password 
5. User consents to disclosing information (name, e-mail) to Auth0
6. A postback happens against the app callback URL
7. Done!

> Notice that between steps 2 and 3 there's no user interaction. Steps 4 and 5 are specific to Google and might not happen necessarily if the process is repeated (e.g. the user selects 'remember me' in Google)

What is the catch? You only get a very basic profile fromt he user: names (in various forms and segments: name, last name, given name, etc.), and an e-mail.

What if you need to query the user's calendar, or his pictures or his birthday? Continue reading! What you need is Google OAuth2. (If your users are in Google). 

### Google OAuth2

This identity provider allows you to get much more information about the user. The tradeoff is that when configuring this connection you will have to register your instance of Auth0 with Google and then you have to supply a _clientid_ and a _client secret_.

> Auth0 is a multi-tenant service. When you register to Auth0 you get your own namespace (@{User.namespace}.auth0.com). This is the application you need to register with Google.

####1. Register the Auth0 with Google
You need to use Google's API console for this. 

####2. Create a Client ID and Cloient Secret
Once the clientid an client secrets are creted in Google. Paste them into Auth0 connection:


####3. Edit the callback URL
Make sure the callback address in Google is configured to

        https://@{namespace}.auth0.com/login/callback
        
You are done! 

### Google Apps
This is actually very similar to Google OAuth2 connection. The difference is that you have the option to request even more advanced API access or user's attributes. For example, you can query to which groups the user belongs to.

This is useful if you are selling your service to a comapny using Google Apps and you want to drive authorization beased on the group membership of the user. With this you can write rules like: "anyone from __Marketing__ can read from my app", "anyone from __Sales__ can create new proposals", etc.

In this examples, membership to the Sales and Marketing gorups is information kept in Google Apps, not your own app.

> This is a good thing, as you won't need to manage this membership information in your app. Your customers will also be happy as they only need to manage this in one place. 

### Office 365
Office 365 uses a completely different identity protocol: WS-Federation and different security tokens: SAML tokens. Auth0 will handle the protocol transition between your app (that continues to use OAuth2) and O365.

![](http://markdownr.blob.core.windows.net/images/7589049392.png)
