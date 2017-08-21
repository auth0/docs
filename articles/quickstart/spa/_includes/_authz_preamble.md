This tutorial shows you how to control authorization in your client-side single page application.

## Access Control in Single Page Apps

Access control is the control over what different users can see in your application and which routes they can access.
With Auth0, you can implement access control by using scopes granted to users.

To set up access control in your application, define the following restrictions:
* The data from an API can only be released if the user is authorized to access it. 
* The user can access specific routes and UI elements in your application only if they have the appropriate access level.

The previous step used the `read:messages` scope for accessing API resources. This scope indicates that the user can only view the data. You can consider users with this scope as regular users. If you want to give some users permission to edit the data, you can add the `write:messages` scope. 

::: note
You can give your scopes any names and map them to any access levels you want. 
:::