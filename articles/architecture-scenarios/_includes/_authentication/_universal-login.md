Do you have, or will you have, more than one application in your system? If the answer to this question is yes, then you will want a centralized sign in experience. To achieve a seamless <dfn data-key="single-sign-on">Single Sign-on (SSO)</dfn> experience between multiple applications, it is critical to have a centralized location to redirect your users for authentication. This allows you a way to provide your users with a consistent experience if you add social authentication in the future, add third party applications to your system, or add multi-factor authentication as an option (or requirement) for your users - and also allow you to take advantage of new features for improving your users’ experience with little, if any, added development effort.

::: panel Best Practice
If you have more than one application, the best practice is to redirect to a [centralized location](/hosted-pages/login) to authenticate the user. With Auth0, this means taking advantage of [Universal Login](/universal-login), which provides many security and user experience benefits out-of-the-box, including [SSO](/sso/current).
:::

Auth0 Universal Login makes authenticating users a short, easy process which can be accomplished in three easy steps (all of our Quickstarts demonstrate this and our SDKs hide the complexity for you too):

1. Determine how and when you want to [redirect from your application](#application-integration).
2. Set up the appropriate [branding](/architecture-scenarios/implementation/${platform}/${platform}-branding) and/or customized HTML in your Auth0 configuration.
3. Set up your application to [receive and handle the response](#application-integration) from the Authorization Server.
