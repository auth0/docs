---
description: Regular web app scenario conclusion
toc: true
---
# SSO for Regular Web Apps: Conclusion

In this tutorial we covered a simple scenario: a regular web app, hosted in the cloud, using Auth0 for authentication, while utilizing the existing Active Directory user store. We learned what OpenID Connect offers and why it was preferable for this business case, how the Authentication Flow works, what an ID Token is and how to validate and manipulate it, how to configure applications and connections on Auth0 dashboard, how to implement user login and logout using Lock, and how session management and access control works.

We started by describing the business case and the requirements and went on explaining how each requirement can be met and the thought process behind each choice that was made.

We used ASP .NET Core for the sample web app implementation, hopefully though after going through this document you are able to build such a web app using the framework you prefer.

<%= include('./_stepnav', {
 prev: ["3. Application Implementation", "/architecture-scenarios/application/web-app-sso/part-3"]
}) %>
