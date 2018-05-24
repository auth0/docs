---
title: Troubleshooting the Authorization Extension
description: How to troubleshoot the Authorization Extension
tags:
  - extensions
  - authorization_v2
---

# Authorization Extension: Troubleshoot Issues

The following are some issues you might see when setting up the Authorization Extension, as well as some tips to help you identify the cause.

## The authentication results in a token that contains groups information, but not roles or permissions information.

If this happens, chances are that you created roles and permissions for one application, but your users are authenticating using another application. For example, let's say that you created all your roles/permissions against Website A. However, you also create another website application in Auth0 for Website B. Then, you use the `client_id` and `client_secret` for Website B, instead of those for Website A, in your app.

Alternatively, you might see this if you click the **Try** button in the Auth0 Dashboard on a Connection that contains one of your users. This will execute an authentication flow using the Auth0 _global application_, but this is not the same as the application you configured in the extension.

## My application is not shown in the drop-down menu when setting up the extension.

The supported application types for the Authorization extension are: **Native**, **Single Page Web Applications** and **Regular Web Applications**. Applications with no type assigned and **Machine to Machine Applications** are not supported.