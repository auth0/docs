It’s important to start by distinguishing between Authentication, Authorization, and Access Control. Your Auth0 tenant (the Authorization Server) is typically responsible for Authentication and some or all of Authorization. Access Control however must be the responsibility of the Application or API itself, because access control is almost always contextual: 

* **Authentication**: the process of determining if the user is who they say they are.
* **Authorization**: the proceess of determining what the user is allowed to do in the system.
* **Access Control**: the process of limiting a user to only the actions permitted, based on a combination of who the user is, what they are allowed to do in the system, and their consent.

For application level Authorization - typically referred to as Access Control - custom claims can be added to an OpenID Connect (OIDC) [ID Token](/tokens/id-token) via use of Auth0’s Rule [extensibility mechanism](#id-token-claims), and you will need to decide what that information might be in order for your application to make access control decisions.

::: warning
When deciding what data to include in OIDC tokens, you need to consider token size, especially if you are passing the token in the URL. Even if you are not passing tokens in the URL, there are other things that you will also need to consider - such as the potential of exposing sensitive PII (Personally Identifiable Information).
:::