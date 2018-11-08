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

- For **Application Type**, choose Regular Web App

You can explore all available settings at [Dashboard Reference: Application Settings](/reference/dashboard/settings-applications). 

### Advanced Settings

- Be sure that **Trust Token Endpoint IP Header** is enabled to protect against brute-force attacks on the token endpoint.

You can explore all available settings at [Dashboard Reference: Advanced Application Settings](/reference/dashboard/settings-applications-advanced). 
