---
	Title: Identity Providers
---

# Identity Providers 

Auth0 is an "identity hub" that supports a number of authentication providers using different protocols: OAuth2, WS-Federation, etc.

![](http://markdownr.blob.core.windows.net/images/2142124826.png)

Auth0 sits in between your app and the system that authenticate your users. 

> Each relationship between Auth0 and these systems is called a 'connection'.

Auth0 abstracts the handshake between the identity providers and your app, so you don't need to worry about their idiosyncracies and details (and nuances).

### Google OpenID
Configuring Google OpenID is straight forward and perhaps one of the simplest to configure, becuase...well, there's no configuration!

Once you add a Google OpenId connection, you are ready to go. The authentication flow is pretty straight forward:

1. A user initiates login in the app
2. User is redirected to Auth0 
3. User's immediately redirected to Google for authentication. 
4. User enters username and password 
5. User consents to disclosing information (name, e-mail) to Auth0
6. A postback happens against the app callback URL
7. Done!

> Notice that between steps 2 and 3 there's no user interaction. Steps 4 and 5 are specific to Google and might not happen necessarily if the process is repeated (e.g. the user selects 'remember me' in Google)

What is the catch? You only get a very basic profile from the user: names (in various forms and segments: name, last name, given name, etc.), and an e-mail.

What if you need to query the user's calendar, or his pictures or his birthday? Continue reading! What you need is Google OAuth2. (If your users are in Google). 

### Google OAuth2
This identity provider allows you to get much more information about the user. The tradeoff is that when configuring this connection you will have to register your instance of Auth0 with Google and then you have to supply a _clientid_ and a _client secret_.

> Auth0 is a multi-tenant service. When you register to Auth0 you get your own namespace (@@account.namespace@@). This is the application you need to register with Google.

####1. Register Auth0 with Google
You need to use Google's API console for this. See [here](goog-clientid) for full instructions. 

####2. Enter the Client ID and Client Secret

####3. Edit the callback URL
Make sure the callback address in Google is configured to

        https://@@account.namespace@@/login/callback
        
You are done! 

### Google Apps
This is actually very similar to Google OAuth2 connection. The difference is that you have the option to request even more advanced API access or user's attributes. For example, you can query to which groups the user belongs to.

This is useful if you are selling your service to a company using Google Apps and you want to drive authorization based on the group membership of the user. You can write rules like: "anyone from __Marketing__ can read from my app", "anyone from __Sales__ can create new proposals", etc.

In this examples, membership to the Sales and Marketing gorups is information kept in Google Apps, not your own app.

> This is a good thing, as you won't need to manage this membership information in your app. Your customers will also be happy as they would only need to manage this in one place. 

### Office 365
Office 365 uses [WS-Federation](http://docs.oasis-open.org/wsfed/federation/v1.2/os/ws-federation-1.2-spec-os.html) and SAML tokens. Auth0 will handle the protocol transition between your app (that continues to use OAuth2) and O365.

####1. Register Auth0 with Office365
You need to use Microsoft's [Seller Dashboard](https://sellerdashboard.microsoft.com). See [here](o365-clientid) for full instructions. 

####2. Enter the Client ID and Client Secret
Once you get a `clientId` and `clientSecret` eneter them into the connection's settings.

> Why does Office365 need a `clientId` and `clientSecret` if it uses WS-Federation? Because querying Windows Azure Active Directory uses OAuth authentication. 

### Active Directory Federation Services
