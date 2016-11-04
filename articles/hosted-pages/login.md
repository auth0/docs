---
description: Guide on how to use the hosted login page
---

# Login Page

In your [Auth0 Dashboard](${manage_url}/#/login_page), you can enable your Hosted Login Page by simply flipping the toggle switch.

![Hosted Login Page](/media/articles/hosted-pages/login.png)

If you want to change some of the [configuration options](/libraries/lock/v10/customization) within Lock, you may do so _right on this page_, just make your changes and make sure to remember to hit the _Save_ button. 

This login page will be a basic login page for your client, and will use Lock to provide your users with a beautiful and smooth authentication process. The hosted login page is both one of your most secure authentication options as well as one of the easiest to implement.

You will be able to access your hosted login page via the following url:

```text
https://${account.namespace}/login?client=${account.clientId}
```

And thus will be able to simply redirect login requests to this page, and use the hosted login page to authenticate your users, and then return them to your application.

