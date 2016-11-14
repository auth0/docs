---
title: Rules
description: This tutorial will show you how to add customized Auth0 rules to your app.
seo_alias: android
budicon: 173
---

Rules are functions written in JavaScript that are executed in Auth0 as part of the transaction every time a user authenticates to your application. For more information about Auth0 rules, please refer to [the full documentation](/rules).

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-android-sample',
  path: '06-Rules',
  requirements: [
    'Android Studio 2.2',
    'Android SDK 24',
    'Emulator - Nexus 5X - Android 6.0'
  ]
}) %>

## Before Starting

Make sure you have completed either the [Login](01-login) or the [Custom Login](02-custom-login) examples.

## Create a Rule

To create a rule, you need to go to the [new rule page](${manage_url}/#/rules/new). From there, you can either use a predefined template or create one from scratch.

In this example we will use "*Add country to the user profile*" template, under the *Enrich Profile* section:

![Add country template](/media/articles/rules/rule-choose-add-country-template.png)

This rule gets the `country_name` from the context and adds it as a new `country` attribute to the user profile.

![Country rule sample](/media/articles/angularjs2/rule-country-show.png)

This is just a basic template. You can edit it to meet your business needs. Once you are done, save the rule and that's it. Whenever your users log in, the rule will be executed and their country will be added.

## Test the Rule

To see the newly created rule working, just implement a login and check the user profile information (you can find out how to do this in the [user profile tutorial](04-user-profile)).

You can access the `country` added by the rule within the `extraInfo` hashmap from the `userProfile` object you receive in the callback (named payload by default):

```java
client.tokenInfo(${account.clientId})
    .start(new BaseCallback<UserProfile, AuthenticationException>() {

  @Override
  public void onSuccess(final UserProfile userProfile) {
    runOnUiThread(new Runnable() {
      public void run() {
        // Get the country from the user profile
        if (payload.getExtraInfo().containsKey("country")){
          String country = (String) payload.getExtraInfo().get("country");
          //Show the country
        }
      }
    });
  }

  @Override
  public void onFailure(AuthenticationException error) {

  }
});
```
