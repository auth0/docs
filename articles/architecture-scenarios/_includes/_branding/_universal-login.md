[Universal Login](/universal-login) is the recommended method for authenticating users, and it centers around use of the Login page. You can customize the Login page via the Dashboard to support your organization's branding requirements [Simple customizations](/universal-login#simple-customization) can be made that include changes to the logo, primary color, or background color, as well as more [advanced customizations](/universal-login#advanced-customization) that require you to directly modify the script powering the page itself.

::: panel Best Practice
If you choose to customize Universal Login page script then we strongly recommend that you make use of version control, and deploy to your Auth0 tenant via [deployment automation](/architecture-scenarios/implementation/${platform}/${platform}-deployment) or one of the [alternative strategies](/universal-login/version-control).
:::

Auth0 widgets, such as Lock (https://auth0.com/lock), integrate seamlessly with Universal Login to provide out-of-box support for user login and sign up; Lock also has built-in support for multiple languages which can be leveraged to satisfy the requirements of an [international audience](/libraries/lock/v11/i18n). Alternatively the Auth0 JavaScript SDK (/libraries/auth0js) can be utilized when providing for a fully customized UX, using technologies such as React or Angular.  

::: warning
[Universal Login advanced customization](/universal-login#advanced-customization) allows you to modify page script for greater customization flexibility. However you will be responsible for maintaining the page thereafter, including updating the version of any Auth0 widget - such as Lock - or Auth0 SDK used. You should also exercise caution regarding the use of third-party JavaScript on your Login Page, since sensitive security-related information often flows through the page and the introduction of cross-site scripting ([XSS](/security/common-threats#cross-site-request-forgery)) vulnerabilities is of particular concern.
:::
