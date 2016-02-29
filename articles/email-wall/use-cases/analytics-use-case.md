---
description: "Learn how Auth0 helps with your decision-making process, and makes it easy to gather data about your users. Explore a specific example of User Analytics, including code snippets."
fourKeyConcepts: 
  - 
    icon: css-class-bud-icon
    text: "The Problem: How can I get more data about my users?"
  - 
    icon: css-class-bud-icon
    text: "The Solution: Auth0 Redirect Rules & Social Login"
  - 
    icon: css-class-bud-icon
    text: "The Details: Walking Through a Specific Analytics Example"
  - 
    icon: css-class-bud-icon
    text: "The Result: Just a Few Dozen Lines of Code to More Insight"
hash: user-analytics
logoUrl: "/media/articles/email-wall/use-cases/analytics/logo.png"
iconUrl: "/media/articles/email-wall/use-cases/analytics/logo.png"
bgColor: "#222228"
longDescription: "Thanks to the rise of social networks and Big Data, every day it is easier to collect up-to-date and richer information about your customers. Information that can help your business with direct marketing, site selection, customer relationship management, and much more. Customer analytics help make key business decisions via market segmentation and predictive analysis, and Identity lies at the heart of this powerful business accelerator."
sitemap: false
title: "Powering User Analytics With Identity"
seo_description: "Learn how Auth0 helps with your decision-making process, and makes it easy to gather data about your users. Explore a specific example of User Analytics, including code snippets."
type: use-case
---

# Powering User Analytics With Identity
## THE PROBLEM
InnovaShoes is a footwear manufacturer that sells its products through an online store. The company plans to launch a new line of male running shoes with cutting-edge technology.  As part of this launch, InnovaShoes will launch a marketing campaign targeted at existing male customers who have shown interest in fitness. The campaign has three goals:

- Send a preorder email about the new running shoes to male customers of their online store. Additionally, they want to segment these users by age and by interest in fitness, as men between 20 and 40 years old are more likely to have both the interest and disposable income to buy  a premium fitness product.
- They want to know which registered users have not returned after registering, to offer them a special discount enticing them back.
- Lastly, as they know that many of their customers use Twitter, InnovaShoes want to better understand how customers who use this social network feel about the company.

InnovaShoes wants to gather the necessary information about the users of its online store to execute their marketing campaign, and they reason that the best time to collect this data will be at registration and log in time. That is where identity management, and in particular, Auth0 can help.

## THE SOLUTION
The better InnovaShoes knows its customers, the more they can tailor the customer experience, bringing them more value. **Social logins** let the company leverage the data gathered by Facebook, Twitter, and other social networks to enhance knowledge of customers, and treat them as individuals. Adding social logins to applications is very straightforward with **Auth0**, and is a good starting point for getting customer data. Social logins have several perks, including:

- **Better quality email addresses**: The social network provider is in charge of verifying the user's email. If the provider shares this information, you will get a real email address rather than the fake address that some users provide when registering in web applications.

- **Access to richer user profiles**: Social network providers often can provide additional information about users, such as location, interests, and birthday. Using this data, you can target personalized, relevant content to users.

- **Up-to-date profiles**: Users often will not keep their profiles updated on less-visited websites, but they keep their social network profiles current. Social logins can give you more accurate information about your customers.

- **Better login security**: When users don’t have to create yet another username and password, they’re more likely to use good practices in choosing hard-to-guess passwords and use multi-factor authentication for the few sites such as social networks that hold their identity information. Your customers are tired of the username and password treadmill - that’s why they’ll “Login with Facebook”.

This information is very useful for obtaining data and demographics about your users, which in turn is useful for targeted marketing campaigns or in product management decisions. 

### How do you get User Analytics?

Auth0 includes a powerful feature called “rules” - little snippets of Javascript code that run as part of every authentication - that let you extend the platform any way you need to, and implement advanced features. It is this extensibility that will be the secret to InnovaShoes’ implementation.

When users register for the online store using a social login, InnovaShoes can use a rule that calls an API for a service such as FullContact to extend the information of the user— location, age, gender, income bracket, social network memberships  and so on, and in addition calls the social network’s API to enhance the user’s profile with interests, likes, social graph, etc. Create a rule to access powerful third-party social analysis APIs - for example, invoking a sentiment analysis service to evaluate users’ tweets that mention **@InnovaShoes**.  Create yet another rule that saves the user's information your chosen analytics platform, whether it is saved in a data warehouse and analyzed with a BI product suite,, streamed to a Big Data analytics platform based on Hadoop, loaded into a full-text indexing service, extracted to a SaaS analytics product - whatever your data scientists and marketing team needs.

The following snippet shows the basic information of an Auth0's user profile:

```
{
    "email": "johndoe@gmail.com",
    "email_verified": false,
    "updated_at": "2016-01-18T19:42:13.322Z",
    "picture": "https://s.gravatar.com/avatar/1fda90f0e712deed531294cd044a2d05?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fkl.png",
    "user_id": "auth0|569d401336afe17803eba2ba",
    "name": "johndoe@gmail.com",
    "nickname": "johndoe",
    "identities": [
        {
            "user_id": "569d401336afe17803eba2ba",
            "provider": "auth0",
            "connection": "Username-Password-Authentication",
            "isSocial": false
        }
    ],
    "created_at": "2016-01-18T19:42:11.846Z",
    "last_ip": "174.66.196.104",
    "last_login": "2016-01-18T19:42:13.322Z",
    "logins_count": 1,
    "blocked_for": []
}
```

> Notice how some of this information is immediately useful for the campaign. For example, by using the `last_login property Innovashoes can determine whether a user has not logged in for a while, and send them an offer if they return to the store.

You can use the [**FullContact** API](https://www.fullcontact.com/developer/)to obtain extended information about your users, such as the social networks associated with their email address. To do so, you can use the FullContact template when creating a new rule in the Auth0 management dashboard.

Combined together, this information can help you perform more complex analysis needed for the campaign - such as figuring out who of your customers are the 20 - 40 year old males (FullContact) who are interested in fitness (Facebook). With this extended profile you can connect to a database or indexing/search service—such as **ElasticSearch**—to store the data of the registered users. This can be done using a rule, or in a different process using a _cron job_ as shown in [this example](https://github.com/auth0/auth0-dashboard-widget/blob/master/webtasks/dashboard_cron.js).
If you decide to save the user's information from a rule, you will get analytics in real-time. On the other hand, if you use a cron job, you will get the analytics only as frequently as the job is run. You should decide which is the best approach for your case/needs, taking into consideration the possibility that if you have millions of users, saving real-time information could be a huge load and your service may not be able to handle it.

> You can even send this information directly to a SaaS Analytics provider such as [Azure Stream Analytics](https://azure.microsoft.com/en-us/services/stream-analytics/), [RapidMiner](https://rapidminer.com/), a Hadoop instance, or wherever you want.

Each time a user logs in, that event is a strong signal of engagement. You can learn even more about their preferences and interests by using Auth0 rules to record each authentication event in your analytics system and then correlating these events with other signals such as items placed into their shopping cart, pages visited, comments left, and so on. This idea of “progressive discovery” is a powerful way to build a comprehensive profile of a user over time, both by asking them for information and by observing their behavior.

Once the necessary information is stored, you can create a dashboard with widgets that shape your analytics into an easy-to-read form. The following [repository](https://github.com/auth0/auth0-dashboard-widget) contains the source code of a simple dashboard that directly accesses user profiles in Auth0, and which you can take as a starting point to create your own.

Your data scientists of marketing metrics experts may have their own preferred method of visualizing user data and derived analysis, based on your unique needs. Auth0’s API-driven, easily extended platform fits right into any analytics platform, no matter how straightforward or complex. Auth0 doesn’t saddle you with pre-built, inflexible analytics and visualizations as part of your identity platform - we leave analytics and decision support tools to experts in those fields, but we integrate with those best-of-breed solutions with only a few lines of Javascript.

![Sample Analytics dashboard](/media/articles/email-wall/use-cases/analytics/analytics-dashboard.png)

_Sample Analytics dashboard_

Finally, you can add another rule that sends the Twitter handle of a user—if available—to an API that searches the user's tweets mentioning  @InnovaShoes and assess their sentiment. With this information, the marketing department can send an email to users who tweeted a negative sentiment about the company to try to fix or neutralize the situation.

To get near real-time statistics, you could buffer high-frequency authentication events using a queue component such as the open source RabbitMQ, and have a rule that sends the login information to it: the queue will then push the information into the data warehouse, analytics platform, or SaaS analytics solution. This is shown in the following diagram.

![Use Case Architecture with Real-time analytics](/media/articles/email-wall/use-cases/analytics/use-case-architecture-with-queue.png)

_Use Case Architecture with Real-time analytics_

## CONCLUSION
Auth0 is powerful authentication platform, not an analytics engine, so it does not provide elaborate analytics right out of the box. However, Auth0’s rules engine gives you the flexibility to easily extract whatever data you need from authentication events, and enhance user profile data through web APIs as users register and authenticate. With this powerful, real-time capability, you can implement any analytics scenario you can imagine. Auth0 includes an ever-growing list of rule templates divided by categories. The power is there for you to use in delivering an even more personalized experience for your customers through advanced user analytics. Adding **social login** to your applications takes only minutes, and provides rich, up-to-date information about your users. By combining both capabilities, you're presented with an endless realm of possibilities for discovering new ways to engage your users.

![Creating a new rule using templates](/media/articles/email-wall/use-cases/analytics/rule-templates.png)

_Creating a new rule using templates_

Intrigued by the possibilities? Want some help in figuring out how best to leverage Auth0’s analytics flexibility? Help is just a [Slack chat](http://chat.auth0.com/) or [email](mailto:support@auth0.com) away, to get you past any hurdles quickly and mining user data for more insights.

Try it out today! Auth0 has plans for everyone's needs, including a free-forever plan that supports up to 7,000 active users and two social identity providers. For more information check the [Pricing page](https://auth0.com/pricing), or [contact the Auth0 sales team](mailto:sales@auth0.com) if you have any questions or custom needs.


## APPENDIX A: PROTOTYPE CODE
Here are some sample code snippets that are useful for implementing the logic described in this use case.

### Profile Enrichment Rule

The rule that calls the FullContact API to enrich the user profile can be seen in the following code:

```
function (user, context, callback) {
  var FULLCONTACT_KEY = 'YOUR FULLCONTACT API KEY';

  // skip if no email
  if(!user.email) return callback(null, user, context);
  // skip if fullcontact metadata is already there
  if(user.user_metadata && user.user_metadata.fullcontact) return callback(null, user, context);
  request({
    url: 'https://api.fullcontact.com/v2/person.json',
    qs: {
      email:  user.email,
      apiKey: FULLCONTACT_KEY
    }
  }, function (error, response, body) {
    if (error || (response && response.statusCode !== 200)) {

      // swallow fullcontact api errors and just continue login
      return callback(null, user, context);
    }


    // if we reach here, it means fullcontact returned info and we'll add it to the metadata
    user.user_metadata = user.user_metadata || {};
    user.user_metadata.fullcontact = JSON.parse(body);

    auth0.users.updateUserMetadata(user.user_id, user.user_metadata);
    return callback(null, user, context);
  });
}
```

> This is a simplified version of the FullContact template provided by Auth0. This version does not have Slack integration to log errors.

As seen in the preceding code, when information about the user is found, it will be added to the **user.user_metadata.fullcontact** property.

### How to create a function that gets the user's age from an enriched user profile

The following code shows how to create a method that gets user age from the user's enriched profile. You can get other information about the user in a similar fashion.

```
function getAge(user) {
    if (user.age) {
        return user.age;
    }

    var fullContactInfo = user.user_metadata.fullContactInfo || user.app_metadata.fullContactInfo;

    if (fullContactInfo && fullContactInfo.age) {
        return fullContactInfo.age;
    }
    if (fullContactInfo && fullContactInfo.demographics && fullContactInfo.demographics.age) {
        return fullContactInfo.demographics.age;
    }
    if (fullContactInfo && fullContactInfo.demographics && fullContactInfo.demographics.birthDate) {
        return moment().diff(fullContactInfo.demographics.birthDate, 'years');
    }

    if (user.dateOfBirth) {
        return moment().diff(user.dateOfBirth, 'years');
    }

    if (user.birthday) {
        return moment().diff(user.birthday, 'years');
    }

    return null;
}
```

### Rule to get the Twitter handle of the user and send it to the Sentiment API

The following rule shows how you can obtain the Twitter handle of a user and send the data to the Sentiment API. This process should be done only once per user; for that reason we are setting the **sentiment_initialized** variable to true when the user is processed.

```
function (user, context, callback) {
  user.app_metadata = user.app_metadata || {};
  if (user.app_metadata.sentiment_initialized) {
    return callback(null, user, context);
  }
  
  var twitterHandle = getTwitterHandle(user);

  if (!twitterHandle) {
    return callback(null, user, context);
  }

  // You should make your requests over SSL to protect your app secrets.
  request.post({
    url: 'https://innovashoes.com/twittersentiment',
    json: {
      twitterHandle: twitterHandle,
      secretToken: ";ojhsajk;h;Kh:Jh",
    },
    timeout: 15000
  }, function(err, response, body){
    if (err) return callback(new Error(err));
    user.app_metadata.sentiment_initialized = true;
    auth0.users.updateAppMetadata(user.user_id, user.app_metadata)
      .then(function(){
        callback(null, user, context);
      })
      .catch(function(err){
        callback(err);
      });
  });
}

function getTwitterHandle(user) {
    var fullContactInfo = user.user_metadata.fullContactInfo || user.app_metadata.fullContactInfo;
    if (fullContactInfo && fullContactInfo.socialProfiles) {
      for (var key in fullContactInfo.socialProfiles) {
        if (fullContactInfo.socialProfiles[key].type === 'twitter'){
          return fullContactInfo.socialProfiles[key].username;
        }            
       }
    }
    return null;
}
```


### Dashboard sample code
You can find the dashboard sample code in this [repository](https://github.com/auth0/auth0-dashboard-widget). You can use it as a starting point and build your own. The readme file will provide you with information to run the example. You can view a live version [here](http://auth0.github.io/auth0-dashboard-widget/).

