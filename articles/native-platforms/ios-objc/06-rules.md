---
title: Rules
description: This tutorial will show you how to create a basic rule that you can use in your app.
---

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:

* CocoaPods 1.0.0
* XCode 7.3 (7D175)
* Simulator - iPhone 6 - iOS 9.3 (13E230)
  :::

<%= include('../../includes/github', { link: 'https://github.com/auth0-samples/auth0-ios-objc-sample/tree/master/06-Rules', }) %>

Rules are one of the cool features of Auth0. The reason behind that coolness is their flexibility, which gives you the ability to extend what Auth0 has to offer. They are just JavaScript functions which work like middlewares. To see a detailed description, please refer to [the full documentation](/rules).

### 1. Create a Rule

To create a rule, just go to the [new rule page](${uiURL}/#/rules/new). You can create it from scratch or use an existing template. These templates are written by Auth0 team to assist you complete common tasks.

Let's use the template called "*Add country to the user profile*", under the *Enrich Profile* section:

![Add country template](/media/articles/rules/rule-choose-add-country-template.png)

This rule just gets the `country_name` from the context and adds it as a new `country` attribute to the user profile.

![Country rule sample](/media/articles/angularjs2/rule-country-show.png)

This is just a starting template, you can edit it to meet your business needs. Once you are done, save the rule and that's it. Whenever you login, the rule will be executed, and the country will be added.

### 2. Test the Rule

To see the created rule results, just implement a login and fetch the user profile information (you can check out how to do it in the [login tutorial](01-login.md)).

You can access the `country` added by the rule within the `extraInfo` dictionary from the `A0UserProfile` object, like so:

```objc
#import <Lock/Lock.h>
```

```objc
NSString *userCountry = self.userProfile.extraInfo[@"country"];
```

### Done!

That's it. You've just experienced how to implement a basic rule. This is just one of all the cool things you can do with them. Go ahead and create any that fits your needs.