---
description: Conclusion for the SPA + API architecture scenario
toc: true
---

# SPA + API: Conclusion

In this document we covered a simple scenario involving an API used by a Single Page Application (SPA) to allow employees to capture their timesheets.

We learned about the Implicit Grant, what an Access Token is, how to configure an API in Auth0, how to configure a SPA application to communicate securely with this API, how to define and secure our API endpoints, how to use the provided libraries to validate the Access Token and how to retrieve a new one from Auth0.

We started by describing the business case and the requirements and went on explaining how each requirement can be met and the thought process behind each choice that was made.

We used Node.js for the API implementation and Angular for the SPA. Hopefully though after going through this document you are able to build this using the technologies you prefer.

<%= include('./_stepnav', {
 prev: ["3. API + SPA Implementation", "/architecture-scenarios/application/spa-api/part-3"]
}) %>