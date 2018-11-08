---
description: Learn to register and configure regular web applications using the Auth0 Dashboard.
toc: true
topics:
  - applications
contentType: 
    - how-to
useCase:
  - build-an-app
  - add-login
  - call-api
---
# Register a Regular Web Application

To integrate Auth0 with a traditional web application running on a server with the ability to refresh its pages (e.g., ASP.NET, Java, Ruby on Rails, Node.js), you must first register your app as a Regular Web App.

<%= include('./_configure', { application_type: 'Regular Web', application_type_create: 'Regular Web Applications' }) %>

## Settings

For a Regular Web App, you must do the following:

- For **Application Type**, choose Regular Web App

<%= include('./application-settings/_token-endpoint-auth-method') %>

You can explore all available settings at [Dashboard Reference: Application Settings](/reference/dashboard/settings-applications). 

### Advanced Settings

If you're developing a mobile application, you can provide the necessary iOS/Android parameters in the Advanced Settings area:

<%= include('./application-settings/_trust-token-endpoint-ip-header') %>

You can explore all available settings at [Dashboard Reference: Advanced Application Settings](/reference/dashboard/settings-applications-advanced). 
