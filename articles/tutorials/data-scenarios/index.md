#Auth0 User Data Storage

Auth0 provides multiple locations for storing different types of data associated with authenticating an app’s users. The purpose of this document is to demonstrate the best practices in using these storage mechanisms efficiently and securely and to give you a look at an end-to-end experience through an application connected to both auth0 and an external database. We created an example application to illustrate the important distinctions a developer must make when storing their user data with Auth0. For this example case, we started with a basic mobile app for iOS (coded in Swift) from the Auth0 seed project for an [iOS mobile app](/quickstart/native/ios-swift). As a backend for the app, we used the Auth0 seed project for a simple [Node.js API](/quickstart/backend/nodejs). As we discuss the different types of data and the best places to store them, we will continue to use this application as the example case. See the mobile/backend [architecture scenario](/architecture-scenarios/application/mobile-api) from our documentation to give you a visual of how the application is structured. 


##Where do I put my authentication data?

Auth0 has a built in database which serves as a way for developers to store their users’ profiles - the basic information associated with authenticating their users, i.e name, email, username, password, and so on. You can also use a [separate database](/connections/database/mysql) to store such information if your needs are different from what the built-in database of Auth0 offers. However, we recommend storing authentication-related data in Auth0’s built in database in order to make things less complicated by allowing you to easily manage user data through Auth0’s dashboard: ${https://manage.auth0.com/#/}.


##Why not put all the app’s data in the Auth0 database?

###Scale

Data that is not related to authentication should go in a separate database connected to your application. It is best not to store such additional data in the Auth0 database because the Auth0 database has limited scalability and your app’s data could exceed that limit. Instead, we recommend using an external database connected to your app for storing non-authentication-related data. This allows you to keep things simple on the Auth0 side, to be able to efficiently manage your user authentication, while leaving the heavy database lifting up to a separate database formatted to efficiently store your extra data. 

###Security

Regardless of their scale, it is important for the two sets of data to remain distinct since they likely require different levels of security. The Auth0 database has a high level of security to protect users’ passwords and personal information with encryption. The security and efficiency of the application’s additional data can be distinguished from that of the application’s users’ authentication information by storing non-authentication-related data in a separate database. This way you can rely on the security of Auth0’s encryption to protect your users’ information and be free to set up your separate database in a way that best suits your app’s data. 

###Convenience 

The two sets of data are also likely accessed with different frequencies, so it makes sense to separate them so that in your code, your access to the authentication data is concentrated in a small chunk, and your access to all other data is grouped separately. This way, if you have issues with authentication, you will know where to start debugging. This is especially true if you use Auth0’s rules to access authentication data when users are logged in, as your rules will be more easily debugged from the Rules tab on Auth0’s dashboard: ${https://manage.auth0.com/#/}.

###Example

 Here is an example of data that is associated with a user but not with authenticating that user in the app: In the case of our mobile music application, the user’s music needs to be saved, so they can find it easily when they log in again. This data is not required in the process of authenticating the user for the app, but favorite songs and artists are personal data that should be associated with the user. So we would want to store this data in a separate database connected to the backend of our mobile app, instead of in the Auth0 database. Here is how we did this:

Using the user’s unique “user_id” from their Auth0 user profile, we can make sure the data is associated with the user in our separate database in order to query by a unique identifier.



The Node.js seed project authenticates requests to the specific URI associated with getting the user’s personal data from the database. This is accomplished through the validation of a JSON Web Token. [Learn](https://auth0.com/learn/token-based-authentication-made-easy/) about token based authentication and how to easily implement JWT in your applications.



We added specific functionality for different data requests coming from our mobile app. For example, upon receiving a GET request to the path “/secured/getFavGenre,” the API calls the function we wrote called “getGenre,” which queries the database for the user’s favorite genre and returns it in the response of the GET request.

This is the function on the client that makes the request to our Heroku-hosted Node.js API. The function “buildAPIRequest” takes the path and the type of HTTP request as parameters and builds a request using the Heroku URL of our Node.js API.

Here is the Express server code from our Node.js API that handles the request to “/secured/getFavGenre” :




##What about metadata?

Metadata is JSON in the user profile that is used to store any extra data to be used in the authentication process by Auth0. There are two kinds of metadata:

###App metadata

 App metadata is used for storing supplementary data associated with authentication that is read-only for the user. Its three most common uses are:

Permissions: Features the user must unlock through their achievement in the application, a special key they are given, or any other exclusive factor that allows certain users to have privileges within the application that others do not.
Plans: Settings that must not be freely changed by the user without confirmation of a subscription. These require the user to pay or provide proof of purchase through the app to alter their in-app experience in some way
External IDs: Used in associating external accounts (not authentication providers) with the provider account that authenticated the user through Auth0

###Example of app metadata

Some data from our music app that would be appropriate to store in app metadata is a music streaming subscription. Another example is the user’s permission to edit the app’s featured playlists. Both of these are appropriate for metadata because they are important in authenticating the user and to customize their experience as they are logged in. What makes them app metadata (instead of user metadata) is that they must not be easily changed by the user. We implemented the permissions example with two Auth0 rules:

 The first sends a request to our Node API which queries the database connected to heroku to check how many plays the user’s playlist has. If the number is 100 or greater, then we assign “playlist editor” as a value in the “roles” array in app_metadata. *SHOW RULE CODE*(code snippet or screenshot?)

The second rule gets the app metadata and assigns the “roles” array to a field of the user object so that it can be accessed without directly accessing the app metadata on the client. This way, the app metadata remains secure and a clever user cannot hack the app to change their app metadata. 
*SHOW RULE CODE*(code snippet or screenshot?)
Is this the reason why we have the second rule? Does this make sense if the user object contains the app metadata itself anyway? Is it an issue of scope and whether you choose to include app_metadata or not?

	 The app recognizes whether the user is a “playlist editor” or not and displays their permission when they are welcomed to the app (we didn’t implement the featured playlist itself for the simplicity of the example).This is a good example of app metadata because in this scenario, the user has no direct control over how many times other people play their playlist, and so they must not be able to change their own permission to edit the app’s featured playlist. This is a special permission they have to “earn” by getting more people to listen to their playlist.

###User metadata

User metadata is extra authentication data determined by the user, such as preferences, customization of their avatar, or anything else that they get to choose which alters their experience in the app upon logging in. 

###Example of user metadata

In the case of our music app, we should consider that the user would want to change their “display name,” which is displayed to other users of the app and to the user when they are welcomed to the app upon authentication. They could also want to change their music streaming settings. Both of these things would be stored in user metadata. We stored the variable “display name” in user metadata and allowed the user to update their display name for the purpose of this example.

We used an Auth0 rule to get the user.user_metadata every time the user logs in to display their “display name”
* SHOW RULE CODE* (code snippet or screenshot?)

	We used the Auth0 Management API v2 to allow the app’s users to alter their metadata via GET and PATCH requests: 

[Get users by id.](https://auth0.com/docs/api/management/v2#!/Users/get_users_by_id)

[Patch users by id.](https://auth0.com/docs/api/management/v2#!/Users/patch_users_by_id)

##Review

Here is a review of the types of data and the best practices for where they go within the context of our example app:

User profiles from Auth0 authentication: 
Auth0 database

Songs, artists, and playlists saved to the user’s music: 
A separate database connected to the backend of the application

User’s permission to edit the app’s featured playlist stored in “roles” variable: 
App metadata
User’s chosen display name that they are free to change stored in “display name” variable:
User metadata



This document is meant to give you a better idea of where to store different types of data both authentication-related and otherwise. Rules are a helpful tool to work with the authentication data of your application in a systematic and simple way. In general the ways Auth0 provides for you to store your users’ data are intended to be used for authentication data only, so if your data seems irrelevant to the authentication process, it is best stored in a separate database. This article should clear up any doubt you have about how to use Auth0’s data storage methods.


If you want to take a closer look at how we implemented our example for this article beyond the Auth0 seed projects, go to github and dive into the code:

[iOS app (client)](https://github.com/eharkins/auth0-swift-data-app)

[Node.js API (server)](https://github.com/eharkins/auth0-node-data-api)
