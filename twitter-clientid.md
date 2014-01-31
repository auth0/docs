# Obtaining a Consumer and Secret Keys for Twitter

To configure a Twitter connection you will need to register Auth0 with Twitter.

##1. Log in into Twitter's Developers site
Log in into [Twitter's Developer site](https://dev.twitter.com), select __My Applications__ and click on the __Create an New Appliction__ button:

![](img/twitter-api-1.png)

![](img/twitter-api-2.png)

---

##2. Complete information about your instance of Auth0

Your callback URL into Auth0 is:

	https://@@account.namespace@@/login/callback

![](img/twitter-api-3.png)

Once the application is created, go to Settings tab and make sure to check the __"Allow this application to be used to Sign in with Twitter"__ option.

---

##3. Get your Consumer Key and Consumer Secret

Go back to Details tab, and enter your new `Consumer Key` and `Consumer Secret` into the connection settings in Auth0.

![](img/twitter-api-4.png)

![](img/twitter-api-5.png)