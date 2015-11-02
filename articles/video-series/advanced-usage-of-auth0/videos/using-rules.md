---
name: Using Auth0 Rules
description: "In this video, you'll learn how to create and use existing Rules at Auth0 to customize your authentication pipeline"
timeInSeconds: 273
videoId: 5efcne65tf
---
Auth0 provides a simple way to customize the login process with a feature we call 'Rules'.
Rule's are code snippets, written in JavaScript, that can be tailored to handle your specific requirements.
The rules you decide to use, can do unique things, for example: you could limit logins to people located within a certain geographical region, you could add additional information to a users profile, you could record a login event with a third party service and much more!. 

## Let's try our first rule: Adding roles to a user
So let’s look at  how easy it is to add custom rules to your login process. 
Let’s say we’d like to add a specific user to an ‘admin’ role, when they login, based on their email address.
This is easily accomplished by creating a custom Rule in the Auth0 dashboard.
To do this we’ll click on the ‘Rules’ link in the menu and then the ‘Create Your First Rule’ button.  When you start a new ‘Rule’ you’ll be prompted to either pick an ‘Empty’ rule, allowing you to build a rule from scratch or choose one of the existing templates that you can then adapt to suit your needs.
Let’s pick the ‘Set roles to a user’ template, found under the ‘access control’ heading.
A rule is just a function that is passed 3 parameters: The first parameter is the user object as it comes from the identity provider, the second parameter is the context object which contains information about the current login attempt like whether it was done from a mobile device and to which application the user is trying to login. The last parameter is the callback function that must be called from within the rule with either success or error. If there’s an error, that error will get shown to the user in Lock, the Auth0 Login Box.
This template has a function assigned to the variable, ‘addRolesToUser’, which we can modify to meet our specific requirements.  The way the template is written, it will simply check the email of the user and assign roles based on their email address, however keep in mind, you could easily change this to query one of your databases or make an api call to an external server as needed.
For now we’ll keep it simple and just modify the conditional logic, to check for the email address ‘arthur.zero@mail.com’. So now when Arthur logs in he’ll be assigned the ‘admin’ role, but all other users will be assigned the ‘user’ role.  We can manually test this by clicking the ‘Try this Rule’ button. Before running the test, you can modify the user and context objects that will be passed to our new rule as test data.  Let’s plug this user's user id and email into the user object to use as test data, then we’ll click the ‘Try’ button, and as you can see in the output area, the ‘Admin’ role is assigned to the user's profile.  
The next question you probably have is, where in my application can I access the user’s assigned roles?
This is made available by default, in the user's profile, that is provided by Auth0 after a successful login.
To show this to you, I’ll use the simple application I created in the ‘Create your first app’ screencast.  I’ll make one small modification to this app, logging the user's profile to the console, so we can inspect it.
Now let's save this file, open this app in my browser and log in.  Next we’ll look at the console in chrome developer tools, and as you can see the assigned roles are included in the user's profile.

## My second rule: Sending events to MixPanel
Let’s add another rule to send a ‘sign in’ event to ‘mixpanel’, a third party analytic platform.
We’ll head back over to the rules area of the Auth0 dashboard, and we’ll click the ‘New Rule’ button, but this time we’ll use the ‘Tracks login events’ template, under the ‘web hook’ heading.  
Now we’ll simply add our mixpanel provided token into the rule.  Next we’ll try it out.  
Now let’s look at the mixpanel admin area under the ‘live view’ section, and as you can see we have a ‘sign in’ event.
One of the benefits of using ‘rules’ to trigger events like the one we just setup, is improved reporting accuracy.  The reason being, server triggered events complete with a high degree of confidence, whereas client side initiated events, which are commonly used, fail much more frequently due to outside factors such as blocking firewalls, browser extensions or client side code errors.

Let’s try this with the web app we used a few moments ago, but I’ll place our web app and mix panel on the screen, side by side, so we can see the event logged in mixpanel in realtime when I login.
I’ll refresh the page, login again, and over in mixpanel, you see a new ‘Sign in’ event show up.
As you can see, Rules are a great way to extend Auth0’s login process to suit your specific needs, and they are easy to create with many ready to use templates


