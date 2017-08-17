This tutorial shows you how to control authorization in your client-side single page application.

## Access Control in Single Page Apps

Access control is control over what different users can access.
Depending on what you need for your application, you can implement access control in different ways. With Auth0, the typical approach is to use scopes granted to users to control what they can see in your application and which routes they can access. 

You need to keep in mind two things for your application: 
* The data from API can only be released if the user is authorized to access it. 
* The user can access specific routes and UI elements in your application only if they have the appropriate access level.

The previous step used a scope of `read:messages` for accessing API resources. This scope indicates that the user can only view the data. You can consider users with this scope as regular users. If you want to give some users permission to edit the data, you can add a `write:messages` scope. 

::: note
You can give your scopes any names and map them to any access levels you want. 
:::