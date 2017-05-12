The previous step covers how to protect the resources served by your API such that only users who have authenticated in your application (and who are properly authorized) can access them. While this deals with protecting data resources, it is likely that you will also need to limit access to client-side routes in your application based on a user's role.

## Access Control in Single Page Apps

Distinguishing between different users and controlling what they do and do not have access to is typically known as access control. The way that access control is implemented depends on the needs of your application, but a common scenario is to introduce a set of groups. These groups might include something like administrators, paid users, and unpaid users, each with different permissions around access to application resources.

For single page applications that get their data from APIs, there are two major things that need to be considered when authorization and access control are introduced:

1. The particular data being requested from the API should only be released if the user making the request is authorized to access it
2. The user should only be able to access client-side routes if they have an appropriate access level to do so

The first point is a server-side concern and was covered in the previous step with the use of `scope`s.

The second point is the concern of your client-side application. To protect routes on the client side, the role that is assigned to the authenticated user can be used as an indication that the user should or should not be able to access a given route. A `role` claim can be included in the user's `id_token`, which can then be decoded on the client-side for the application to use.