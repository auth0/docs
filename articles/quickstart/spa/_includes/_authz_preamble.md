## Access Control in Single Page Applications

In Single Page Applications you use Access Control to define what different users can see, and which routes they can access.
With Auth0, you can implement access control by using scopes granted to users.

To set up access control in your application, enforce the following restrictions:
* The data from an API can only be returned if the user is authorized to access it. This needs to be one when implementing the API.
* The user can access specific routes and UI elements in your application only if they have the appropriate access level.

The previous step used the `read:messages` scope for accessing API resources. This scope indicates that the user can only view the data. You can consider users with this scope regular users. If you want to give some users permission to edit the data, you can add the `write:messages` scope. 

::: note
Read about naming scopes and mapping them to access levels in the [Scopes documentation](/scopes). To learn more about custom scope claims, follow the [User profile claims and scope tutorial](/api-auth/tutorials/adoption/scope-custom-claims).
:::