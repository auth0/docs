---
title: Using Passwordless Authentication on a Regular Web App with e-mails
connection: Email
image:
alias:
  - email
  - node
---

# Passwordless Authentication via e-mail on Regular Web Apps

## Authenticate users with a one time code via e-mail

<%= include('./_introduction-email', { isMobile: false }) %>

### Setup

<%= include('./_setup-email') %>

<%= include('../../client-platforms/_callback') %>

## Implementation

### Use Auth0 UI widget (Lock)

<%= include('./_init-passwordless-lock') %>

Then you can trigger the login like this:

```js
TBD
```

This will first open a dialog that asks the user for an email address. 

![](/media/articles/connections/passwordless/passwordless-email-receive-code-web.png)

Then, it will ask for a code that has been sent in an email to the given address. The code will be used as a one-time password to log in.

![](/media/articles/connections/passwordless/passwordless-email-enter-code-web.png)

After the user enters the code he received by email, lock will authenticate it and call the callback function, where you will have the the id_token and profile available.

### Use your own UI

TBD

## Authenticate users with Magic Link via e-mail

<%= include('./_introduction-email-magic-link') %>

### Use Auth0 UI widget (Lock)

<%= include('./_init-passwordless-lock') %>

Then you can trigger the passwordless authentication using a magic like like this:

```js
function login(){
  lock.magiclink();
}
```
#### Magic Link

TBD

### Use your own UI

TBD