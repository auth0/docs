<!--markdownlint-disable MD002 MD041 -->

## Install the Auth0 Angular SDK

Run the following command within your project directory to install the Auth0 Angular SDK:


<% if (typeof v2 === 'undefined' || v2 === false) { %>
```bash
npm install @auth0/auth0-angular
```
<% } else { %>
```bash
npm install @auth0/auth0-angular@beta
```
<% } %>

The SDK exposes several types that help you integrate Auth0 with your Angular application idiomatically, including a module and an authentication service.