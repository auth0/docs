---
public: false
color: "#2F383D"
budicon: 342
title: "It's Easy to Implement Single Sign On in your Custom Applications"
---
You can implement Single Sign On in your **custom applications** that use Auth0 by just flipping a switch in each app.

1. In the management dashboard, click **[Apps / APIs](https://manage.auth0.com/#/applications)**.
2. Click the application that you want to enable Single Sign On.
3. In the **Settings** tab, scroll down until you see the **Use Auth0 instead of the IdP to do Single Sign On** switch.
4. Flip the switch! and save the changes.

	![Enabling Single Sign On in your applications](https://cdn.auth0.com/content/single-sign-on/enabling-sso-in-your-custom-app-flow.gif)
	
	Enabling Single Sign On means that if the user is already logged in through Auth0, the Identity Provider (for example Facebook) login dialog won't be prompted again, and he will be automatically logged in the specified application.
