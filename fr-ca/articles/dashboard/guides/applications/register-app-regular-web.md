---
title: Register Regular Web Applications
description: Learn how to register and configure a regular web application using the Auth0 Management Dashboard. These may include traditional web applications that perform most of their application logic on the server (e.g., Express.js, ASP.NET).
topics:
  - applications
  - regular-web-app
  - dashboard
contentType: 
  - how-to
useCase:
  - build-an-app
  - add-login
  - call-api
---
# Register Regular Web Applications

To integrate Auth0 with a [regular web app](/applications), you must first register your app with Auth0. This guide will show you how to register a regular web application using Auth0's Dashboard.

<%= include('./_includes/_register-app-part1', { application_type: 'regular web', application_type_create: 'Regular Web App' }) %>
 
<%= include('./_includes/_register-app-part2', { application_type: 'regular web', application_type_create: 'Regular Web App' }) %> 

3. Scroll down and locate the **Trust Token Endpoint IP Header** setting, enable it, and click **Save Changes**. When enabled, this protects against brute-force attacks.

<%= include('./_includes/_register-app-next-steps') %>