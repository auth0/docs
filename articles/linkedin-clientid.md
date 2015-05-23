# Obtaining an API Key and Secret Key for LinkedIn

To configure LinkedIn OAuth2 connections you will need to register Auth0 with LinkedIn on their [developer portal](http://developer.linkedin.com/).

##1. Log in into the developer portal
Go to the [developer portal](http://developer.linkedin.com/) and login with your LinkedIn credentials:

![](../media/articles/linkedin-clientid/linkedin-devportal-1.png)

Then select __API Keys__ under the support menu option:

![](../media/articles/linkedin-clientid/linkedin-devportal-2.png)

---

##2. Complete information about your instance of Auth0

Create a new application and complete the form:

![](../media/articles/linkedin-clientid/linkedin-devportal-3.png)

---

##3. Setup your callback URL into Auth0:

	https://@@account.namespace@@/login/callback

![](../media/articles/linkedin-clientid/linkedin-devportal-4.png)

---

##4. Get your API Key and Key Secret

Once the application is registered, enter your new `API Key` and `Key Secret` into the connection settings in Auth0.



