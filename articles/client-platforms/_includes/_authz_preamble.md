The previous step covers how to protect the resources served by your API such that only users who have authenticated in your application are able to access them. Protecting your data resources in this way is sufficient if you want to restrict access in a catch-all fashion. However, by itself, it doesn't provide any means to make decisions about which resouces a _particular_ user should and should not have access to. The term **Authorization**--in the context of this tutorial--is about how decisions regarding data access for certain users is made, and also the mechanisms that are used to enforce these decisions.

## Access Control in Single Page Apps

Distinguishing between different users and controlling what they do and do not have access to is typically known as access control. The way that access control is implemented depends on the needs of your application, but a common scenario is to introduce a set of groups. These groups might include something like administrators, paid users, and unpaid users, each with differing levels of access to data.

For single page applications that get their data from APIs, there are two major things that need to be considered when authorization and access control are introduced:

1. The particular data being requested from the API should only be released if the user making the request is authorized to access it
2. The user should only be able to access client-side routes if they have an appropriate access level to do so

The first point is a server-side concern. Your API needs to be crafted such that when a user makes a request for data, a decision is made as to whether that user should be able to access the resource they are requesting. Typically this is accomplished using a database lookup for the user's role when their request arrives at a server endpoint. However, since Auth0 uses JSON Web Tokens for authentication, this can be done using a claim in the token payload, preventing the need to do such a lookup.

The second point is the concern of your client-side application. To protect routes on the client side, the role that is assigned to the authenticated user can be used as an indication that the user should or should not be able to access a given route. A `role` claim can be included in the user's `id_token`, which can then be decoded on the client-side for the application to use.