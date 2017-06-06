---
toc: true
title: Cross-Origin Authentication
description: An explanation of cross-origin authentication in Auth0 and its compatibility with browsers
---

# Cross-Origin Authentication

**(TODO - Needs an intro - "what is cross-origin auth")**

## Configure Your Client for Cross-Origin Auth

To use cross-origin auth, you first need to configure your client to allow for it. At the present time, this is accomplished by sending a PATCH request to [Auth0's Management API]().

Get an access token in the [Auth0 dashboard](${manage_url}), navigate to APIs > Auth0 Management API > API Explorer. Copy the token that is presented at the top of the page.

Send a PATCH Request Using a REST client such as [Postman](), or simply by using cURL, send a PATCH request to `https://${account.namespace}/api/v2/clients/${account.clientID}` and include `cross_origin_auth: true` in the body. Include the valid access token acquired previously as the Authorization header with the `Bearer` scheme. The resulting header looks like this: `'Authorization': 'Bearer <access-token>'`.

## Default Behavior

"3rd party cookies enabled" is the default setting for all browsers.
 
## How it Works

* When 3rd party cookies are **enabled**, the cookie is set in the `/co/authenticate` call. This cookie is then sent to the `authorize` call.
* When 3rd party cookies are **disabled**, since no cookie is sent to the `authorize` call, it runs the iframe workflow described [here](https://github.com/jaredhanson/draft-oauth-cotc/blob/2d559d0e0ab231bfc7474ad715332953348a3620/Draft-1.0.txt#L134). **(TODO - Are we going to put this elsewhere, or are we linking to a personal GitHub doc?)**

## How it Fails

Chrome and Opera both fail with 3rd party cookies disabled because this same setting also disables access to local/session storage ("site data"):

![Cross-Origin Authentication](/media/articles/cross-origin/cross-origin2.png)
 
When the iframe calls the callback code to verify the token, it just fails silently:

![Cross-Origin Authentication](/media/articles/cross-origin/cross-origin1.png)

## Browser Testing Matrix

This testing matrix demonstrates which browsers can use cross-origin authentication when their 3rd party cookies are enabled, and when they are disabled.

<!-- markdownlint-disable MD033 -->
<table class="table"> 
  <thead> 
    <tr> 
      <th><strong>OS</strong></th>
      <th><strong>Browser</strong></th>
      <th><strong>3rd party cookies enabled</strong></th>
      <th><strong>3rd party cookies disabled</strong></th> 
    </tr> 
  </thead> 
  <tbody> 
    <tr> 
      <td>Windows</td>
      <td>IE</td>
      <td class="success" align="center">Yes</td> 
      <td class="success" align="center">Yes</td> 
    </tr>
    <tr> 
      <td>Windows</td>
      <td>Edge</td>
      <td class="success" align="center">Yes</td> 
      <td class="success" align="center">Yes</td> 
    </tr>
    <tr> 
      <td>Windows</td>
      <td>Firefox</td>
      <td class="success" align="center">Yes</td> 
      <td class="success" align="center">Yes</td> 
    </tr>
    <tr> 
      <td>Windows</td>
      <td>Chrome</td>
      <td class="success" align="center">Yes</td> 
      <td class="danger" align="center">No</td> 
    </tr>
    <tr> 
      <td>Windows</td>
      <td>Opera</td>
      <td class="success" align="center">Yes</td> 
      <td class="danger" align="center">No</td> 
    </tr>
    <tr> 
      <td>macOS Sierra</td>
      <td>Safari</td>
      <td class="success" align="center">Yes</td> 
      <td class="success" align="center">Yes</td> 
    </tr>
    <tr> 
      <td>macOS Sierra</td>
      <td>Firefox</td>
      <td class="success" align="center">Yes</td> 
      <td class="success" align="center">Yes</td> 
    </tr>
    <tr> 
      <td>macOS Sierra</td>
      <td>Chrome</td>
      <td class="success" align="center">Yes</td> 
      <td class="danger" align="center">No</td> 
    </tr>
    <tr> 
      <td>macOS Sierra</td>
      <td>Opera</td>
      <td class="success" align="center">Yes</td> 
      <td class="danger" align="center">No</td> 
    </tr>
    <tr> 
      <td>iOS (iPhone)</td>
      <td>Safari</td>
      <td class="success" align="center">Yes</td> 
      <td class="success" align="center">Yes</td> 
    </tr> 
    <tr> 
      <td>iOS (iPhone)</td>
      <td>Chrome</td>
      <td class="success" align="center">Yes</td> 
      <td class="success" align="center">Yes</td> 
    </tr> 
    <tr> 
      <td>iOS (iPhone)</td>
      <td>Firefox</td>
      <td class="success" align="center">Yes</td> 
      <td class="success" align="center">Yes</td>  
    </tr> 
    <tr> 
      <td>iOS (iPad)</td>
      <td>Safari</td>
      <td class="success" align="center">Yes</td> 
      <td class="success" align="center">Yes</td>  
    </tr> 
    <tr> 
      <td>iOS (iPad)</td>
      <td>Chrome</td>
      <td class="success" align="center">Yes</td> 
      <td class="success" align="center">Yes</td> 
    </tr> 
    <tr> 
      <td>Android Galaxy S7</td>
      <td>Chrome</td>
      <td class="success" align="center">Yes</td> 
      <td class="danger" align="center">No</td> 
    </tr> 
    <tr> 
      <td>Android Galaxy S7</td>
      <td>Firefox</td>
      <td class="success" align="center">Yes</td> 
      <td class="success" align="center">Yes</td> 
    </tr>    
  </tbody> 
</table> 
<!-- markdownlint-enable MD033 -->
