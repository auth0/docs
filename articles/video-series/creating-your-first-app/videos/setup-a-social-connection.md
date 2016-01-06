---
name: Setup a Social Connection
description: "In this video, you'll learn how you can configure any Social Identity Provider with Auth0."
timeInSeconds: 177
videoId: k3j81ck3nl
---
In this video, we’ll setup your first social connection.  You can see the full list of social connections available for you to use, by clicking ‘Connections’ and then ‘Social’ in the navigation menu

To enable a new social connection, you’ll simply click the toggle button on the provider you want to use, then you’ll need to configure the connection.
After enabling a connection, a form will open up, prompting you to enter the required configurations.
Usually you’ll need a client id and a client secret, which you’ll need to get from the social provider.
Clicking the ‘How to obtain a clientID’ link will open a page that provides simple instructions on how to obtain this information for the provider you're setting up. .

## Github instructions
We’ll go ahead and follow the instructions for github as an example, but keep in mind the process for setting up other providers such as google and twitter, is nearly identical with slight variations in how to setup the application on the provider's side
To start using github as a provider, we’ll create a new github application, then we’ll specify the main url and callback url github should use.  Auth0 shows you the callback url you should use in the instructions, which we’ll copy onto the clipboard and then paste into the github form.
After we’ve registered our new application, github provides you with a unique client id and secret, which we’ll copy and paste back into the github configuration form for Auth0.

## Choosing the attributes & Permissions
In the bottom section of the form, you see an attributes and permissions groups.
Depending on what your application will do, you may need to choose one or more of these options.
Basically checking attributes will result in the chosen attributes being returned as part of the users profile, and checking permissions will result in new abilities your application can perform with the access token that’s returned by the provider.
So for example let’s say your application needs the email address of the logged in user and your application will provide the ability to follow other github users, which will be achieved by calling the github api on behalf of the user.
In this scenario you’ll need to select two checkboxes:
Under the attributes section you’ll check the ‘email address’ checkbox, and then under the permissions section you’ll check the ‘follow’ checkbox.
Ok let’s save our changes.

## Trying out Github
Now lets test our github provider, which we can do by clicking the ‘Try’ button.
If you’ve configured the github provider correctly, you’ll see a Github ‘Authorize application’ page.  This is the same page your users will see the first time they use Github with your application.
As you can see in the ‘Review permissions’ section, github shows the user that your application will be able to access their private emails as well as follow and unfollow other github users.
We’ll go ahead and click the ‘Authorize Application’ button and if everything is setup correctly, we’ll get redirected to a page that confirms our connection to Github is working.  Additionally we’ll see the users profile information, that our application will receive after the user logs in with github.  As you can see, the private email address we requested is included in the profile.
Now if we close this window, and return to the dashboard, we see that our account now has 1 new signup and one new user.


Stay tuned for the next screencast where we’ll show you how to setup a User & Password connection



