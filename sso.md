# SSO scenarios with Auth0

## Web SSO

SSO in web apps using Auth0 is achieved at the Identity Provider (IdP) level. A user that logs in with any given IdP will be able to access any app registered with Auth0 without entering credentials again.

This works with any app using any of the [supported protocols](protocols): custom or 3rd party.

![](https://docs.google.com/drawings/d/1gfYo2b5IP3yuSo3Vcp18Yh_2PPKpOxS9s7lLGdyLRPU/pub?w=811&amp;h=340)

As a case study, consider the exmple above: Active Directory is used as the IdP, using the [Auth0 AD Connector](ad), and 4 apps are registered in Auth0:

* Two __Custom apps__ are using __OpenID Connect__ and __WS-Federation__ respectively.
* Two 3rd. party apps using __SAML__ (Salesforce and Google Apps)

When a user attempts access to the first app (e.g. the __PHP App__), the authentication transaction is initiated in the configured protocol for that app (OpenID Connect). User will be redirected to Auth0. Since there's only once connection configured (AD), Auth0 redirects the user to it. 

Users is authenticated there (either using __Kerberos__ or by entering __username/password__), and then he is sent back to Auth0. Auth0 completes the transaction with the __PHP App__ and the user has access to it.

Later, user attempts access to __Salesforce__. A similar process is triggered: user is redirected to Auth0 and Auth0 redirects user to AD. This time, credentials will not be asked again, since there's a session established already as a result of logging in with the first App. User is authenticated, redirected back to Auth0 and then again, the authentication transaction is completed. This time though, __SAML__ is used.

The process is equivalent if any of the other apps are accessed. Notice that all these redirects happen "behind the scenes". Normally the browser will be follow them with no intervention from the user at all. The end result is seamless access to all apps with a single login.

> AD is used as an example. Any connection on Auth0 will work the same way, __social__, __enterprise__ or __custom__.

### SSO with more than one connection

The process above works seamlessly because there's only one way to login. Namely, a single __connection__.

Consider this second scenario in which there are two connections:

* __Active Directory__ for _employees_.
* A __custom user store__ for _vendors_ and _partners_.

![](https://docs.google.com/drawings/d/1EeGtLk8ifIASGjjrp6LMWcDX2RKPzuXyyB6KZoNHvbg/pub?w=690&amp;h=324)

For this other case study, let's assume that _vendors_ will only have access to the two custom apps, but not to __Salesforce__ or __Google Apps__. 

In this situation, neither __Salesforce__ nor __Google Apps__ need to guess as they will only accept users from __AD__. You can either:

* Enable just __AD__ for both and disable all other connections. 
* Explicitly request __AD__ as the authentication source while configuring SAML for it, using the `connection` parameter:

```
https://@@account.namespace@@/samlp/{YOUR SALESFORCE/GOOG APPS CLIENTID IN AUTH0}/?connection=ad
```

If you don't do either of these, Auth0 will prompt the user for which authentication method to use.

The custom apps can use a similar mechanism (the `connection` parameter) to properly identify the type of user: employee vs. vendor. A common mechanism is through vanity URLs: `https://employees.myapp.com` vs. `https://partners.myapp.com`. Depending on how the user accesses the app he will either end up in __AD__ or the __Custom User Store__. 

You could also have links for __`Login for Employees`__ and __`Login for non-employees`__ on the apps. Following either will result in simply setting the `connection` property to one IdP or the other.

> Resolving the authentication method of users is explained in this article: [Home Realm Discovery in Auth0](hrd).

Applications that have multiple connection options, can also query Auth0 for the user's last used method. [This example](https://github.com/auth0/auth0-jquery/tree/gh-pages/examples/sso-multiple-apps) shows how to do it. (See this (line of code)[https://github.com/auth0/auth0-jquery/blob/gh-pages/examples/sso-multiple-apps/two/app.js#L38])

With this technique, users that login to a 2nd app can automatically be directed to the connection they used in the 1st app. This is the same underlying mechanism used by __Auth0 Lock__ to show the "Last time you logged in" message.
