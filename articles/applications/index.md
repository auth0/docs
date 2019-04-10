---
description: Explains the basics of creating and using Auth0 Applications.
toc: true
topics:
  - applications
contentType: 
    - index
    - concept
useCase:
  - build-an-app
---
# Applications

Applications are primarily meant for human interaction, as opposed to APIs, which provide data to applications through a standardized messaging system.

The term _application_ does not imply any particular implementation characteristics. For example, your application could be a native app that executes on a mobile device, a single-page app that executes on a browser, or a regular web app that executes on a server.

Auth0 categorizes applications in three ways:


* **Auth0 application type**: To add authentication to your application, you must first register it with Auth0 and select an application type. Auth0 recognizes four application types: Regular Web App, Single-Page App, Native App, and Machine-to-Machine (M2M) App. For more info, see [Auth0 Application Types](/applications/concepts/app-types-auth0).
* **Confidential versus public**: According to the [OAuth 2.0 spec](https://tools.ietf.org/html/rfc6749#section-2.1), applications can be classified as either public or confidential depending on whether or not the application is able to hold credentials securely. Confidential applications can hold credentials securely, while public applications cannot. For more info, see [Application Types: Confidential vs. Public](/applications/concepts/app-types-confidential-public).
* **First-party versus third-party**: First-party and third-party refer to the ownership of the application. First-party applications are those controlled by the same organization or person who owns the Auth0 domain. Third-party applications enable external parties or partners to securely access protected resources behind your API. For more info, see [Application Types: First-party vs. Third-party](/applications/concepts/app-types-first-third-party).

  
## Keep reading

* Auth0 stores log data of both actions taken in the dashboard by the administrators, as well as authentications made by your users. The logs include many of the actions performed by the user, like failing to login to an application or requesting a password change. For more details, refer to: [Logs](/logs).

  * If you use a third-party application for log management, like Sumo Logic, Splunk or Loggly, you can use Auth0 Extensions to export your logs there. For details on the available extensions and how to configure them, see [Extensions](/extensions).

* Auth0 allows you to programmatically create applications, as described in the [OIDC Dynamic Client Registration 1.0 specification](https://openid.net/specs/openid-connect-registration-1_0.html). See [Dynamic Client Registration](/api-auth/dynamic-client-registration).

* For guidance on setting up a more complex configuration that involves two separate domains or allows users to log in differently for different applications, see [Multiple Tenants](/applications/concepts/multiple-tenants).

* Learn how to [remove an application using the Auth0 Dashboard](/applications/guides/remove-application-dashboard) or the [Management API](/applications/guides/remove-application-mgmt-api).

* Learn how to [rotate an application's Client Secret using the Auth0 Dashboard](/applications/guides/rotate-client-secret-dashboard) or the [Management API](/applications/guides/rotate-client-secret-mgmt-api).
