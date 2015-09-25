---
title: Using Passwordless Authentication in a Regular Web App with SMS
connection: SMS
image:
alias:
  - sms
  - spa
  - single-page-app
---

# Authenticate users with a one time code via SMS in a SPA

<%= include('./_introduction-sms', { isMobile: true }) %>

## Setup

<%= include('./_setup-sms-twilio') %>

## Implementation

### Use Auth0 UI widget (Lock)

<%= include('./_init-passwordless-lock') %>

You can then trigger the login widget with the following code:

```js
TBD
```

This will open a dialog that asks the user for a phone number.

![](/media/articles/connections/passwordless/passwordless-sms-enter-phone-web.png)

Then Auth0 will use Twilio to send an SMS to the user containing the one time code:

![](/media/articles/connections/passwordless/passwordless-sms-receive-code-web.png)

Lock will ask for the code that has been sent over the text message to the given number. The code will be used as a one-time password to log in:

![](/media/articles/connections/passwordless/passwordless-sms-enter-code-web.png)

### Use your own UI

TBD