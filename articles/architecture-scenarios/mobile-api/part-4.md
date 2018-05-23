---
description: Conclusion for the Mobile + API architecture scenario
---

# Mobile + API: Conclusion

In this document we covered a simple scenario: an API, used by a mobile application to allow employees to capture their timesheets.

We learned about the Authorization Code Grant with PKCE, what an Access Token is, how to configure an API in Auth0, how to configure a mobile application to communicate securely with this API, how to define and secure our API endpoints, how to use the provided libraries to validate the Access Token and how to retrieve a new one from Auth0.

We started by describing the business case and the requirements and went on explaining how each requirement can be met and the thought process behind each choice that was made.

We used Node.js for the API implementation and Android for the mobile application. Hopefully though after going through this document you are able to build this using the technologies you prefer.

Don't forget to check back for new business cases and more complex architecture scenarios!

<%= include('./_stepnav', {
 prev: ["3. API + Mobile Implementation", "/architecture-scenarios/application/mobile-api/part-3"]
}) %>
