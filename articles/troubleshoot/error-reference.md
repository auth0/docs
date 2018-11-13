---
description: Error reference
toc: true
topics:
  - troubleshooting
  - errors
contentType:
  - reference
useCase:
  - troubleshooting
---

# Error Reference

Use this reference when you receive error messages displayed in any of the following locations:

* Displayed in browser
* Displayed in developer tools network tab
* Displayed in developer tools console tab
* Response (HTML) error shown in a page
* Response from an Authorization Server

## Browser errors

### Mismatch error

#### What went wrong?

If you do not set any callback URL, your users will see a mismatch error when they log in. 

#### Example

#### Fix

A callback URL is a URL in your application where Auth0 redirects the user after they have authenticated. You need to whitelist the callback URL for your app in the **Allowed Callback URLs** field in your [Application Settings](${manage_url}/#/applications/${account.clientId}/settings). 

#### See also

## Network tab errors

## Console tab errors

## HTML errors

## Authorization Server response errors

## Keep reading

* 