---
description: Guide on how to use the hosted login page
---

# Hosted Login Page

Auth0 hosts a login page that is shown whenever an authentication request is triggered, such as when using the `/authorize` endpoint (OIDC/OAuth) or when sending a SAML login request.

This login page will be a basic login page for your client, and will use Lock to provide your users with a beautiful and smooth authentication process. The hosted login page is both one of your most secure authentication options as well as one of the easiest to implement.

> Note that if the authentication request includes a specific connection, and that connection is for an external identity provider, the hosted login page might not be displayed and the user will be directed to the identity provider's login page.

## Custom Hosted Login Page

In your [Auth0 Dashboard](${manage_url}/#/login_page), you can enable a custom Hosted Login Page by simply flipping the toggle switch, that allows you to customize the look and feel and behavior of the Hosted Login Page.

![Hosted Login Page](/media/articles/hosted-pages/login.png)

If you want to change some of the [configuration options](/libraries/lock/v10/customization) within Lock, you may do so _right on this page_, just make your changes and make sure to remember to hit the _Save_ button. 

Auth0 provides a whole set of configuration values in the `@@config@@` string that you can decode and use to adjust the hosted login page behavior:

```javascript
// Decode configuration options
var config = JSON.parse(decodeURIComponent(escape(window.atob('@@config@@'))));

// now use the config object to tailor the behavior of the hosted login page
...
```

Take a look at the default custom login page code to get a glimpse of the available configuration options. 
