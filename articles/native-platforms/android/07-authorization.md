 ---
 title: Auth0 Android Quickstarts - Authorization
 description: This tutorial will show you how to use the Auth0 authentication API in your Android project to create a custom login screen.
 seo_alias: android
 ---
 
 ## Android - Authorization Tutorial
 
 This is a simple quickstart that will show you how to use Auth0 to create access roles for your users. This way you can authorize or deny content to different users.
 
 ::: panel-info System Requirements
 This tutorial and seed project have been tested with the following:
 
 * AndroidStudio 2.0
 * Emulator - Nexus5X - Android 6.0 
   :::
 
 
 ### Before Starting
 
 Be sure that you have completed the [User Profile](04-user-profile.md) Quickstart.
 
 ### 1. Create a Rule to assing roles
 
 First, you need to create a rule that assigns your users either an `admin` role, or a single `user` role. To do so, go to the [new rule page](https://manage.auth0.com/#/rules/new) and select the "*Set Roles To A User*" template, under *Access Control*. Then, replace this line from the default script:
 
  
   ``` 
   if (user.email.indexOf('@admin.com') > -1)
   ```
   
   to match the condition that fits your needs. 
     
   By default, it says that if the user email contains `@admin.com` he will be given an `admin` role, otherwise a regular `user` role.
   
   > You can define more roles other than `admin` and `user`, depending on your product requirements.
 
 ### 2. Test the rule in your project
 
 Once you have the user profile (as explained in the [user profile](04-user-profile.md) tutorial), you can save it, an access it whenever you need it.
   
 Inside it, you will have the Role, and you will be ready to perform the Access Control.
   
   
   ```android
   String role = mUserProfile.getAppMetadata().get("roles").toString();
 
         if(role.contains("admin")){
         // perform any action
 };
 			
   ```
   
   > Notice that you'll find the `roles` information within the `appMetadata` hashmap and not in the `userMetadata`... that's because of what's defined inside the rule.
   
 ### 3. Do your stuff
   
   At this point, you are able to distinguish the users' roles in your app and authorize or deny (depending on the user) access to a certain feature.
  
  
 ### Done!
 
 You've already implemented the Authorization tutorial with Auth0 for your Android project!
 