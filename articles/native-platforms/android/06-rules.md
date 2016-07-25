---
title: Rules
description: This tutorial will show you how to add customized rules to your app.
seo_alias: android
---

<%= include('../../_includes/_github', {
  link: 'https://github.com/inaka/auth0-android-sample/tree/06-rules',
}) %>

Rules are functions written in JavaScript that are executed in Auth0 as part of the transaction every time a user authenticates to your application. This way, you can enhance Auth0 capabilities customizing it up to your needs. To see a detailed description, please refer to [the full documentation](/rules).

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:

* AndroidStudio 2.0
* Emulator - Nexus5X - Android 6.0 
  :::


### Before Starting

Make sure you have completed either the [Login](01-login.md) or the [Custom Login](02-custom-login.md) examples.

 
### 1. Create a Rule
 
To create a rule, you just need to go to the [new rule page](${uiURL}/#/rules/new). From there, you can either use a predefined template or create one from scratch.
  
In this example we will use "*Add country to the user profile*" template, under the *Enrich Profile* section:
  
![Add country template](/media/articles/rules/rule-choose-add-country-template.png)
  
This rule gets the `country_name` from the context and adds it as a new `country` attribute to the user profile.
  
![Country rule sample](/media/articles/angularjs2/rule-country-show.png)
  
This is just a basic template. You can edit it to meet your business needs. Once you are done, save the rule and that's it. Whenever you login, the rule will be executed, and the country will be added.
  
  ### 2. Test the Rule
  
To see the newly created rule working, just implement a login and check the user profile information (you can check out how to do it in the [user profile tutorial](04-user-profile.md)).
  
You can access the `country` added by the rule within the `extraInfo` hashmap from the `payload` object you receive in the callback:
  
```java
client.tokenInfo(${account.clientId})
	  .start(new BaseCallback<UserProfile>() {

	@Override
	public void onSuccess(final UserProfile payload) {
		MainActivity.this.runOnUiThread(new Runnable() {
			public void run() {
				// Get the country from the user profile
				String country = payload.getExtraInfo().get("country").toString());
			}
		});
	}
	@Override
	public void onFailure(Auth0Exception error) {
	
	}
});
```
  
  ### Done!
  
That's it. This is one of the most common and basic rules to implement. Feel free to experiment with the others!