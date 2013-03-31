# Obtaining an API Key and Secret Key for LinkedId

To configure LinkedIn OAuth2 connections you will need to register Auth0 with LinkedIn on their [developer portal](http://developer.linkedin.com/).

##1. Log in into the developer portal
Go to the [developer portal](http://developer.linkedin.com/) and login with your LinkedIn credentials:

![](img/linkedin-devportal-1.png)

Then select __API Keys__ under the support menu option:

![](img/linkedin-devportal-2.png)

---

##2. Complete information about your instance of Auth0

Create a new application and complete the form:

![](img/linkedin-devportal-3.png)

---

##3. Setup your callback URL into Auth0:

	http://@@account.namespace@@/login/callback

![](img/linkedin-devportal-4.png)

> This step is optional

---

##4. Get your API Key and Key Secret

Once the application is registered, enter your new `API Key` and `Key Secret` into the connection settings in Auth0.

![](img/linkedin-devportal-5.png)

![](img/linkedin-devportal-6.png)


