---
description: Explains the basics of creating and using Auth0 Regular Web Applications applications.
toc: true
---
# Regular Web Applications

You'll need to define a Regular Web Application if you want to integrate Auth0 with traditional web applications (using technologies like ASP.NET, Java, Ruby on Rails, or Node.js) running on a server.

<%= include('./_configure', { application_type: 'Regular Web', application_type_create: 'Regular Web Applications' }) %>

## Settings

- **Application Type**: The type of application you are implementing. If you're working with a traditional web app that has the ability to refresh its pages, use a Regular Web Applications.

<%= include('./application-settings/_token-endpoint-auth-method') %>

<%= include('./application-settings/_settings-pt2') %>

### Advanced Settings

<%= include('./application-settings/_adv-settings') %>

<%= include('./application-settings/_trust-token-endpoint-ip-header') %>
