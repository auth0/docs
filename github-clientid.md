# Obtaining a ClientId and Client Secret for GitHub

To configure a GitHub connection you will need to register Auth0 with GitHub.

##1. Add a new Application
Log in into GitHub and [register an new Application](https://github.com/settings/applications/new):

![](img/github-addapp-1.png)

---

##2. Complete information about your instance of Auth0

![](img/github-addapp-2.png)

The callback address for your app should be:

	https://@@account.namespace@@/login/callback

---

##3. Get your ClientId and ClientSecret

Once the application is registered, enter your new `ClientId` and `ClientSecret` into the connection settings in Auth0.

![](img/github-addapp-3.png)

![](img/github-addapp-4.png)

