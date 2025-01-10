---
title: Passwordless Authentication User Guide
topics:
    - connections
    - passwordless
contentType:
    - concept
    - how-to
    - reference
useCase: customize-connections
---
# User Guide: Passwordless

If you are using an app that allows for <dfn data-key="passwordless">**Passwordless** authentication</dfn>, you can register using either your **email address** or your **mobile phone number** instead of a login/password combination. Depending on which piece of information you provide, you will then access the app using a link that has been emailed to you or by providing a code that has been emailed or sent to you via SMS.

* [Register and Authenticate Using Email](#register-and-authenticate-using-email)
* [Register and Authenticate Using SMS](#register-and-authenticate-using-sms)
* [Troubleshooting](#troubleshooting)

## Register and Authenticate Using Email

![](/media/articles/connections/passwordless/passwordless-email-request-web.png)

If you provide your **email address**, you will receive an email containing either:

* a link you click on to authenticate yourself, or;
* a code you provide to the app to authenticate yourself.

### Authentication Using a Magic Link Received via Email

You may opt to register and authenticate yourself using a magic link sent via email. Upon receipt, you will need to click on the link to access the app.

![](/media/articles/connections/passwordless/passwordless-email-receive-link.png)

<%= include('./_includes/_single-browser-magic-link') %>


### Authentication Using a One-time Use Code Received via Email

You may opt to register and authenticate yourself using a one-time use code that you receive via email.

![](/media/articles/connections/passwordless/passwordless-email-receive-code-web.png)

Once received, you can return to the app to enter the code and authenticate yourself.

![](/media/articles/connections/passwordless/passwordless-email-enter-code-web.png)

## Register and Authenticate Using SMS

![](/media/articles/connections/passwordless/passwordless-sms-enter-phone-web.png)

If you provide your **mobile phone number**, you will receive a code that you will provide to the app to validate yourself.

<div class="phone-mockup"><img src="/media/articles/connections/passwordless/passwordless-sms-receive-code-web.png" alt="SMS one-time code"/></div>

The code can then be used as a one-time password to log in.

![](/media/articles/connections/passwordless/passwordless-sms-enter-code-web.png)
