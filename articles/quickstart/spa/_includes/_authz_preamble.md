The previous step covers how to protect the resources served by your API such that only users who have authenticated in your application (and who are properly authorized) can access them. While this deals with protecting data resources from your server, it is likely that you will also need some way to control authorization in your client-side single page application.

## Access Control in Single Page Apps

Distinguishing between different users and controlling what they can and cannot access is typically known as access control. The way that access control is implemented depends on the needs of your application, but with Auth0 the most common approach is to use the `scope`s granted to a user as a way to make decisions about what they can see in the application and which routes they have access to.

For single page applications which get their data from APIs, there are two major things that need to be considered when authorization and access control are introduced:

1. The particular data being requested from the API should only be released if the user making the request is authorized to access it
2. The user should only be able to access client-side routes and see certain UI elements if they have an appropriate access level to do so

The previous step used a `scope` of `read:messages` for access to API resources. Since this `scope` indicates that the user has read-only access to data, it might be considered that the user has some kind of "regular user" access level. If you wanted some users to have write access to the same resource, and therefore some kind of "administrator" access level, you might consider introducing a `scope` of `write:messages`.

::: note
Auth0 makes no assumptions about how the `scope`s for your API map to various access levels, nor is there any restriction on what you call your `scope`s and access levels. These details are at your discretion.
:::
