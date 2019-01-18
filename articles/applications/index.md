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

The term application does not imply any particular implementation characteristics. For example, your application could be a native app that executes on a mobile device, a single-page app that executes on a browser, or a regular web app that executes on a server.

Auth0 categorizes applications in three ways:


* [Auth0 application type](): To add authentication to your application, you must first register it with Auth0 and select an application type.
* [Public versus Confidential](): 
* [First-party versus Third-party](): First-party and third-party refer to the ownership of the application. This has implications in terms of who has administrative access to your Auth0 domain. First-party applications are those controlled by the same organization or person who owns the Auth0 domain. Third-party applications are controlled by someone who most likely should not have administrative access to your Auth0 domain. Third-party applications enable external parties or partners to access protected resources behind your API securely.



## Applications in Auth0

To add authentication to your application, you must first register it with Auth0 and select an application type. Auth0 recognizes four application types:

- **Native/Mobile Apps**: Mobile, desktop, or hybrid apps that run natively in a device (e.g., Android, iOS, Ionic, Windows, OS/X). Learn to [configure your Native/Mobile App using the Dashboard](/applications/native).

- **Single Page Apps (SPAs)**: JavaScript front-end applications that run in a browser (e.g., Angular, jQuery, React). Learn to [configure your Single Page App using the Dashboard](/applications/spa).

- **Regular Web Apps**: Traditional web applications that run on a server (e.g., ASP .NET, Java, Ruby on Rails, Node.js). Learn to [configure your Regular Web App using the Dashboard](/applications/webapps).

- **Machine-to-Machine (M2M) Apps**: Non-interactive applications, such as command-line tools, daemons, IoT devices, or services running on your back-end. Typically, you use this option if you have a service that requires access to an API. Learn to [configure your M2M App using the Dashboard](/applications/machine-to-machine).




  
  ## Keep reading
  * Auth0 stores log data of both actions taken in the dashboard by the administrators, as well as authentications made by your users. The logs include many of the actions performed by the user like failing to login to an application or requesting a password change. For more details, refer to: [Logs](/logs).

* If you use a third-party application for log management, like Sumo Logic, Splunk or Loggly, you can use Auth0 Extensions to export your logs there. For details on the available extensions and how to configure them refer to: [Extensions](/extensions).

  * Auth0 allows you to programmatically create applications, as described in the [OIDC Dynamic Client Registration 1.0 specification](https://openid.net/specs/openid-connect-registration-1_0.html). See [Dynamic Client Registration](/api-auth/dynamic-client-registration).
