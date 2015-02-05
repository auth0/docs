
---
# How to Start

This tutorial will walk you through the process of connecting a very basic application up to Auth0 for social authentication and help you get familiar with the Auth0 user interface.

There are **9 sections** to this sample and a troubleshooting section at the end.

1. Establish an Auth0 account
2. Register an application
3. Set up a connection
4. Turn connection on for application
5. Create the HTML page for a test application.
6. Test your sample application.

# 1. Establish an Auth0 account

If you do not already have an Auth0 account, create one as described below.

Go to **http://auth0.com** and click on the **"Create Free Account"** button.

You can enter an email address and password or you can sign in with a social provider such as Google, LinkedIn or a Microsoft Account.  

Once you've created an account and logged in, you'll be at the Auth0 **Dashboard**.

![](https://cdn.auth0.com/docs/img/howto-1.png)


# 2. Register an Application

In this section you will register an application with Auth0. (You will create the application in a later step.)  Registering an application in Auth0 gives you a client ID and a client secret that your application will use to identify itself to Auth0.  The application registration also specifies what type of authentication your applicaiton will use.


**In the Auth0 dashboard:**

1. Click on **"Apps/APIs"** link at left.

2. Click on the red **"+ NEW APP/API"** button on the right.

3. In the **Name** field, enter a name like "My-First-App".

4. Press the blue **"SAVE"** button.

You will now see a screen with your application name at the top and four tabs (Quick Start, Settings, Add Ons, and Connections) underneath the application name. You will initially be placed in the Quick Start tab.  This tab is designed to give you code samples that show how to integrate your application with Auth0. For this tutorial, we'll start with a simple single page application written in JavaScript.  You can then come back later and register other applications and select other technologies to get code samples for them.

5. Click on the number 1 in the circle to select "Application Type".
6. Click on the yellow square icon for "Single Page App".
7. For the front end, choose "Vanilla JS"
8. On the next screen, choose the red "NO, SKIP THIS" button.

The resulting screen will show the snippets of JavaScript code to include in your application.  You will create the application in a later step.

9. Click on the **"Settings"** tab (near the top of the screen).

This will show you the settings for your application.  You will see the name you gave your application, the domain, and the client ID.  Note the domain and client ID field.

10. Click on the **"Quick Start"** tab to return to the code samples.  Scroll down to view the section titled, **"2. Create the Auth0Lock instance"**.  

Note that the call to Auth0Lock in the sample code is populated with your domain name and client ID to make it easy for you to create your application.

11. Click on the **"Settings"** tab to return to that tab.

In the **"Allowed Callback URLs"** field, enter "http://jwt.io".  The Allowed Callback URLs field is where you list the URLs to which control will be returned after authentication.  Normally you would enter a URL for your application, but for this tutorial we'll redirect to a site that will display the JWT (JASON Web Token) issues as a result of the authentication.

12. Click on the blue **"SAVE CHANGES"** button at the bottom of the screen.




# 3. Set up a connection

In this section you will configure a connection. A connection is an authentication mechanism.  Auth0 supports many types of connection mechanisms, such as social authentication via Google, Facebook, LinkedIn, etc, or enterprise authentication mechanisms such as AD, LDAP directories, SAML Identity Providers or WS-Fed providers.  Auth0 also supports authentication against databases.


**In the Auth0 dashboard:**

1. Click on **"Connections"** link at left.
2. In the list of options below "Connections", click on **"Social"**
3. In the upper left of the screen, click on the circle toggle for **"Google"** so that it is green for "on"

Notice that when you turn a connection type on, a red "try" link appears.  Auth0 provides try buttons wherever possible to help you incrementally try out different components used by your application, to make sure they work.  Click on the try button and you will see a Google authentication window appears.  

Depending on whether you have a Google login session or not, you may be prompted for Google login credentials.  Then you can click on the blue "Accept" button and a screen should appear that says "It works!!!".  You can turn on and try other connection types if you wish.



# 4. Turn connection on for application

In this section you will ensure the connection you just set up is turned on for your application.

**In the Auth0 dashboard:**

1. Click on **"Apps/APIs"** link at left.
2. Click on the name of the application you registered in section 2.
3. Click on the **"Connections"** tab (under the application name)
4. Make sure that the toggle circle to the right of Google is green for 'on'.

The connections that are turned on here will affect the login options displayed on the Lock (login widget) screen.  The sample code you create in a section below will call the Lock widget.  The Lock widget is part of Auth0.


# 5. Create the HTML page for a test application

In this section you will create a very simple HTML page that invokes the **Auth0 Lock Widget** which will trigger the login sequence.  

Create an HTML page and insert the following HTML and javascript code:


```
    <!DOCTYPE html PUBLIC "-//IETF//DTD HTML 2.0//EN">
    <HTML>
    <BODY>
    <p> Click on the button to log in </p>

    <script src="https://cdn.auth0.com/js/lock-6.2.min.js"></script>
    <script type="text/javascript">
      var lock = new Auth0Lock('{YOUR-APP-CLIENT-ID}', '@@acount.namespace@@');
  
      function signin() {
        lock.show({
            callbackURL: 'http://jwt.io' 
          , responseType: 'token'
          , authParams: {
            scope: 'openid profile'
          }
        });
      }
    </script>
    <button onclick="signin()">Login</button>
    </HTML>
    </BODY>

```

Make sure you replace `{YOUR-APP-CLIENT-ID}` with the actual value of the app you registered in step 2 above.  

The client ID for your application can be found in the **Auth0 dashboard** by going to __"Apps/APIs"__ link and clicking on the __"Settings"__ (gear) icon to the right of your application name.

Save this file in a place where you can access it via a browser.
For this example, we'll call it **"helloworld.html"**.

# 6. Test your sample application

In this step, you will test your sample HTML application that uses the Auth0 Lock widget and the connection you set up above to implement authentication against a social provider, namely Google in this case.

* Open the HTML file created above with a browser. You should first see a white page with a login button on it.

* Click on the **login** button.

The **Auth0 Lock** widget should appear with a button ("g+") to trigger authentication with a Google provider.  If you turned on any other connections, you may have additional buttons, such as for Facebook or Linked In.

If you have other connections turned on for your application, your **Auth0 Lock Widget** may look slightly different.  

Click on the "g+" button and log in with Google account credentials.  If your authentication is successful, you'll be redirected to the jwt.io page, and the JASON Web Token created by Auth0 will be displayed for you.


Note that whether you are prompted for credentials by the social provider depends on whether you still have an active session there.

From the "try" test you did earlier, you may still have an active session at the  Provider.  If this is the case, you may not be prompted to log in again and will simply be redirected to the jwt.io page.

If sufficient time has passed, or if you delete your browser cookies before initiating the test, then you will be prompted to login when redirected to the  Provider.  

# 7. View User Information

In this section you will see the information available about users and login sessions.

**In the Auth0 dashboard:**

1. Click on **"Users"** link at left.

You will see a list of users who have logged in, when they last logged in, how many times they've logged in and which connection they used.

2. Click on a user in the "Name" column.

3. There are four tabs of information.  You will be on the "Details" tab at first.  This will show you additional user profile details about the user.  

4. Click on the "Devices", "History", and "Location" tabs to see the information available to you about users who have logged in via Auth0.

# 8. Create a New User

In this section you will create a new user. This new user will be created in the Auth0 database for your account.  You will use this user to test a rule in a later section.

**In the Auth0 dashboard:**

1. Click on **"Users"** link at left.

You will see a list of users who have logged in, when they last logged in, how many times they've logged in and which connection they used.

2. Click on the red "+ NEW USER" button in the upper right.

3. Enter an email address for the user, such as user1@xxxxx.com (can be fictitious if you prefer).

4. Enter a password. 

5. For the "Connection" field choose "Username-Password-Authentication".

6. Click on the blue "SAVE" button at the bottom.

# 9. Set Password Strength

In this section you will adjust the strength of passwords allowed.
This new user will use username-password authentication against the local Auth0 database which is turned on for each account by default.  

1. Click on the "Connections" link at left, and then on "Database" in the expanded list under "Connections".  You will see an entry for "Username-Password-Authentication".

2. Click on the password strength button (shield icon) in the row for "Username-Password-Authentication".

3. Move the slider to the right or left to adjust the password strength.  Note that the password criteria are displayed below the slider as you adjust it.

# 10. Create Another New User

In this section you will create another new user to test the password strength you just set.  This new user will also be created in the Auth0 database for your account.

**In the Auth0 dashboard:**

1. Click on **"Users"** link at left.

You will see a list of users who have logged in, when they last logged in, how many times they've logged in and which connection they used.

2. Click on the red "+ NEW USER" button in the upper right.

3. Enter an email address for the user such as user2@xxxxx.com (can be fictitious).

4. Enter a password. (Try to enter a password that doesn't meet the password strength you set and see what happens)

5. For the "Connection" field choose "Username-Password-Authentication".

6. Click on the blue "SAVE" button at the bottom.



# 11. Create a Rule

In this section we will explore the Rules capability within Auth0 which is a simple but quite powerful way to extend the capabilities.

Documentation on rules can be found at:
__http://auth0.com/docs/rules__

**In the Auth0 dashboard:**

1. Click on **"Rules"** link at left.

2. Click on the red **"+ NEW RULE"** button in upper right

Notice that there are a lot of rule templates to help you get started.

3. Click on the "Whitelist" button (to the right) in the "Access Control" section.

you will see a screen with code already provided for a whitelist and all you need to do is change the "user1@mail.com" and "user2@mail.com" names to real names.  

4. Change "user1@mail.com" to the email address you entered for the first user you created in section 9 above.  

5. Remove the comma and 'user2@mail.com' so that there is only one email address in the whitelist.
 
6. Press the blue "SAVE" button.

7. Press the red "TRY THIS RULE" button


#12. Customize the Lock Widget

In this section you'll explore how to customize the Lock widget.

Documentation on how to customize the lock widget can be found at:
__https://github.com/auth0/lock/wiki/Auth0Lock-customization__

One very simple change you can make is to the text that appears on the Lock widget.

In your sample html page created in section 5, add a line for the 'dict' parameter to your 'signin' function.  The example below adds one line for the 'dict' parameter to change the text on the Lock widget to "Log me in pronto!".

```
    function signin() {
        lock.show({
            callbackURL: 'http://jwt.io'
          , dict: {signin:{title:"Log me in pronto!"}} 
          , responseType: 'token'
          , authParams: {
            scope: 'openid profile'
          }
        });
    }
```

#13. Use the Auth0 API Explorer

In this section we'll show you how to use the Auth0 API Explorer

Documentation on the API explorer can be found at:
__https://auth0.com/docs/apiv2__


#14. Call the Auth0 API from your Code

In this section we'll show you how to call the Auth0 API from code

#15. Implement Logout

In this section we'll revisit and augment the code in our sample to more fully handle a real-world use case.

Documentation on how to implement logout can be found at:
__https://auth0.com/docs/logout__

#16. Additional Tutorials

The tutorials shown below will help you explore further