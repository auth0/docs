---
name: Register an application
description: "In this video, you'll learn how to register a new application in Auth0 and how to configure it."
timeInSeconds: 241
videoId: rinlyqb8po
---
In this screencast we’ll learn how to register an application in Auth0, a simple process that can be completed in a matter of minutes.

After creating your account in Auth0, you’ll be prompted for a couple of one time setups.
First you’ll need to select the ‘Region’ where Auth0 should service your users authentication requests.  You’ll want to choose the region that is closest to most of your users, which will provide the fastest possible response to login requests.
Next you’ll add  a unique auth0 sub-domain, which will act as an api endpoint for your applications.
After clicking the ‘Save’ button you will be asked to choose the authentication providers you wish to use, this initial list only shows the more popular choices, such as facebook, google and twitter, However there are many additional providers that you can choose later in the ‘connections’ area.  We’ll learn more about this in the next screencast.

## Default application
After creating your account, Auth0 automatically creates a default application for you, and forwards you to the ‘Quick Start Area’ of that newly created default application.
You can always add additional applications to your account by clicking the ‘New App/API’ button from the dashboard, however, in this case, we’ll just use the default application that was created for us.

## Application Settings
For now, we’re going to focus on the general configuration found in the settings tab of your application.
The first thing you’ll notice is the name ‘Default App’, you’ll probably want to give this a more meaningful name at this point.
Next you see the Auth0 domain you created just a few moments ago, your domain is established upon initial account setup and is simply listed as a reference for you at this point.
The ‘Client Id’ is the publicly published, unique identifier for this application, which will be sent to Auth0 when making authentication requests.
Next you see the ‘Client Secret’, which is a private string that can be used by Auth0 to sign the Json Web Token that is generated and returned to the client after successfully authenticating the user.
You can use this same ‘Client Secret’ in your server side code, to verify the signature of the Json Web Tokens, that clients send with each API Request, essentially verifying the users identity.
Unlike the ‘Client Id’ that is published and potentially viewable on the client side, the ‘Client Secret’ must not be shared and should be secured on your server.
Using a ‘Client Secret’ isn’t the only option for signing JWT’s, you could choose the asymmetrical cryptography option, which uses a private key to sign the JWT and a public key to verify the signature.
This would be done by clicking the ‘Show Advanced Settings’ link then changing the ‘JsonWebToken Token Signature Algorithm’ from HS256 to RS256 and then you can click the ‘Download certificate’ button to obtain the key you’ll need on your server to verify JWT signatures.
#
The ‘Allowed Callback URLs’ is required for ‘Third Party Apps’, Single Sign On integration and for ‘Regular Web Apps’. During the authentication process, auth0 won’t make a callback to a URL that isn’t white-listed here, so specifying proper callback urls is a crucial setup step.
If you’re creating a Single Page App and just calling an API, you just need to add the URLs from which you’re calling, to the ‘Allowed origins’ to allow cross origin resource sharing or CORS. Doing this will allow calling Auth0 from your single page app.
It’s worth noting that adding your url’s to the ‘Allowed Callback URLs’ will also add it as an allowed origin.
Typically you’ll want to set up url’s for each environment you use, such as: Production and Testing. We’ll add `http://localhost:3000`, so we can use Auth0 in our development environment.
Next you see the ‘JWT Expiration’, which specifies how long the JWT will be valid in seconds.  The value you specify here will set the expiration time included in the JWT, which your server side code will then use as part of the token verification processes.
And Lastly we’ll save our changes.
Stay tuned for the next screencast where we’ll configure the social connection, such as facebook, google and twitter, that we wish to use in our application.
