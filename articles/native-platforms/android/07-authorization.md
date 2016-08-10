---
title: Authorization
description: This tutorial will show you how to use the Auth0 authentication API in your Android project to create a custom login screen.
seo_alias: android
---

 
This is a simple quickstart that will show you how to use Auth0 to create access roles for your users. This way you can authorize or deny content to different users.
 
::: panel-info System Requirements
This tutorial and seed project have been tested with the following:
 
* AndroidStudio 2.0
* Emulator - Nexus5X - Android 6.0 
:::
 
<%= include('../../_includes/_github', {
  link: 'https://github.com/inaka/auth0-android-sample/tree/07-Authorization',
}) %> 
 
### Before Starting
 
Be sure that you have completed the [user profile](04-user-profile.md) quickstart.
 
### 1. Create a Rule to assing roles
 
First, you need to create a rule that assigns your users either an `admin` role, or a single `user` role. To do so, go to the [new rule page](${uiURL}/#/rules/new) and select the "*Set Roles To A User*" template, under *Access Control*. Then, replace this line from the default script:

```java
if (user.email.indexOf('@example.com') > -1)
```   
to match the condition that fits your needs. 
     
By default, it says that if the user email contains `@example` he will be given an `admin` role, otherwise a regular `user` role.
   
> You can define more roles other than `admin` and `user`, depending on your product requirements.
   
> In the demo app, we use @admin.com to validate, like the next rule:
 
```
  var addRolesToUser = function(user, cb) {
    if (user.email.indexOf('@admin.com') > -1) {
      cb(null, ['admin']);
    } else {
      cb(null, ['user']);
    }
  };
```
 
### 2. Test the rule in your project
 
Once you have the user profile (as explained in the [user profile](04-user-profile.md) tutorial), you can save it and access it at any point.
   
Inside it, you will have the Role, and you will be ready to perform the Access Control.
   
   
```java
List<String> roles = (List<String>) mUserProfile.getAppMetadata().get("roles");
 
if(roles.contains("admin")){
 // perform any action
}; 			
```
   
> Notice that you'll find the `roles` information within the `appMetadata` hashmap and not in the `userMetadata`... that's because of what's defined inside the rule.
   
### 3. Do your stuff
   
At this point, you are able to distinguish the users' roles in your app and authorize or deny (depending on the user) access to a certain feature.
  
  
### Done!
 
You've already implemented the Authorization tutorial with Auth0 for your Android project!
 