# Obtaining Consumer and Secret Keys for Twitter

To configure a Twitter connection you will need to register Auth0 with Twitter.

##1. Create a new Twitter application

Log in to Twitter, and [create a new Twitter application](https://apps.twitter.com/app/new):

![](../media/articles/twitter-clientid/twitter-api-1.png)

Your callback URL into Auth0 is:

	https://@@account.namespace@@/login/callback

Once the application is created, go to Settings tab and make sure to check the __"Allow this application to be used to Sign in with Twitter"__ option.

---

##2. Complete information about your instance of Auth0

To reveal your consumer secret, click on **manage keys and access tokens**:

![](../media/articles/twitter-clientid/twitter-api-2.png)

Copy these values and enter them in the [Auth0 dashboard](https://manage.auth0.com/#/connections/social):

![](../media/articles/twitter-clientid/twitter-api-3.png)
