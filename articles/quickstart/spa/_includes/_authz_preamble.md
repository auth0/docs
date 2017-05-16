The previous step covers how to protect the resources served by your API such that only users who have authenticated in your application (and who are properly authorized) can access them. While this deals with protecting data resources from your server, it is likely that you will also need some way to control authorization in your client-side SPA.

## Access Control in Single Page Apps

Distinguishing between different users and controlling what they do and do not have access to is typically known as access control. The way that access control is implemented depends on the needs of your application, but with Auth0 the most common approach is to use the `scope`s granted to a user to make decisions about what they see in the application and which routes they have access to.

For single page applications that get their data from APIs, there are two major things that need to be considered when authorization and access control are introduced:

1. The particular data being requested from the API should only be released if the user making the request is authorized to access it
2. The user should only be able to access client-side routes and see certain UI elements if they have an appropriate access level to do so

The previous step used a `scope` of `read:messages` for access to API resources. Since this `scope` indicates that the user has read-only access to data, it might be considered that the user has some kind of "regular user" access level. If you wanted some users to have write access to the same resource, and therefore an "administrator" access level, you might consider introducing a `scope` of `write:messages`.