---
public: false
image: "/media/landings/sl-custom-social-connection/sl-custom-social-connection.png"
imageAlt: "Adding your custom social connection"
imagePosition: "center"
imageExtraClass: "code"
budicon: 399
color: "#8EA6D7"
title: "Add your custom social connection using OAuth"
---

The most common identity providers are readily available on Auth0's dashboard. However, you can use Auth0's Connections API to add any **OAuth2 Authorization Server** as an identity provider.

Adding your custom connection is **easy**! Just create a **custom connection**, fill the configuration file by setting the required properties for your provider, such as _Authorization URL_, _Token URL_, _Client ID_, _Client Secret_, and so on. Add logic to the **fetchUserProfile** method to get the user profile from the provider and customize the returned JSON object that contains the user information. Finally, use your connection with any of the Auth0 standard mechanisms (e.g. direct links, Auth0 Lock, auth0.js, etc.) to login. 

More information about creating your custom OAuth2 connections can be found [here](https://auth0.com/docs/connections/social/oauth2#use-your-custom-connection). 

Remember, you can always use [Rules](https://auth0.com/docs/rules) for more sophisticated manipulation of user information. If you are creating your own OAuth2 connection, we recommend that you use [Google OAuth 2.0 Playground](https://developers.google.com/oauthplayground/), where you can experiment with the OAuth 2.0 protocol and APIs that use the protocol. You can walk through each step of the OAuth 2.0 flow for server-side web applications. At each step, you will see the full HTTP requests and responses.

Wanna try it out? Get Auth0's [free production-ready plan](https://auth0.com/pricing#free) with support for up to 7,000 active users.