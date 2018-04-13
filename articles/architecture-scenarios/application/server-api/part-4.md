---
description: Conclusion for the Server + API architecture scenario
toc: true
---

# Server + API: Conclusion

In this document we covered a simple scenario: an API, used to import timesheet entries in ExampleCo's systems, and a cron job, used by external contractors to send in their timesheets using this API.

We learned about the Client Credentials Grant, what an Access Token is, how to configure an API in Auth0, how to configure a Machine to Machine Application to communicate securely with this API, how to define and secure our API endpoints, how to use the provided libraries to validate the Access Token and how to retrieve a new one from Auth0.

We started by describing the business case and the requirements and went on explaining how each requirement can be met and the thought process behind each choice that was made.

We used Node.js for the API implementation and Python for the non interactive server process, hopefully though after going through this document you are able to build this using the technologies you prefer.

<%= include('./_stepnav', {
 prev: ["3. Application Implementation", "/architecture-scenarios/application/server-api/part-3"]
}) %>
