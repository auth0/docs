---
toc: true
description: Server-side SSO with regular web applications.
languages:
  - name: Node
    url: node
  - name: Ruby
    url: ruby
---

# Server-side SSO (Regular Web Apps)

To log a user in silently (i.e. without displaying the Lock screen) the following conditions need to be met:

1. The Client needs to be configured to **Use Auth0 instead of the IdP to do Single Sign On** in the [Clients section of the Auth0 Management Dashboard](${manage_url}/#/clients)
2. An SSO cookie must exist for the tenant's domain. In other words the user must have signed in previously, and the SSO cookie which was saved is still valid.
3. When calling the Auth0 authentication endpoint, the connection name is passed along for which the user must be signed in. This connection name is the same as the one specified in the SSO cookie. You can pass the connection name along either as a parameter when calling the `login` function of the [Auth0 Ruby SDK](https://github.com/auth0/ruby-auth0), or by passing the `connection` query string parameter when calling the `/authorize` endpoint of the [Authentication API](/api/authentication)

## The SSO scenario

In our SSO scenario, let's say we have 2 applications

* App 1: app1.com (Single Page App)
* App 2: app2.com (Regular Web app)

If a user logs in to either of these applications, and then subsequently navigates from this application to the other application, we would want the user to be logged in automatically.

In this document we will be looking specifically how to achieve this in a Regular Web Application

The user logs in on a Single Page Application (app1.com) and clicks on a link that should take them to a particular URL on app2.com. In this case, you can create an endpoint on the target application that will redirect to the URL the user wanted to go after SSO. For example:

```text
http://localhost:4000/auth/sso?connection=Username-Password-Authentication&target_url=/dashboard
```

This endpoint would check if the user is already logged in to this app. If they are, then redirect to the target URL. If the user is not logged in to the application, then redirect to Auth0 for SSO, passing along the name of the connection to use.

Here is an example in Rails:

```ruby
def sso
  if request.params['target_url'].present? then
    # should actually constrain this to make sure it is a local redirect, or only expected redirects.
  else
    redirect_to '/auth/failure?message=target_url is required for this endpoint'
    return
  end
  if not request.params['connection'].present? then
    redirect_to '/auth/failure?message=connection is required for this endpoint'
    return
  end

  if session[:userinfo].present? then
    # User is already logged in, just redirect
    redirect_to params['target_url']
  else 
    session[:target_url] = request.params['target_url']
    # Redirect to login 
    redirect_to getAuthUrl(connection: request.params['connection'])
  end
end
```

For more details, take a look at this SSO sample of a regular web app using Ruby on Rails.

<%= include('../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-rubyonrails-sso-sample',
  path: ''
}) %>
