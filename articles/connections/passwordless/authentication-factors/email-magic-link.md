---
title: Passwordless Authentication with Magic Links
description: Passwordless Authentication with Magic Links
toc: true
topics:
    - connections
    - passwordless
    - authentication
---
# Passwordless Authentication with Magic Links

When implementing passwordless authentication with "magic links", the user is sent an email with a link in it. This link will allow them to login directly when clicking on it. It is similar in function to them getting an email with a one-time-use code in it, returning to your app, and entering the code, but without having to actually perform those steps.

With magic link transactions, both the initial request and its response **must take place in the same browser or the transaction will fail**. This is particularly relevant for iOS users, who cannot change their default web browser. For example, the user might make the initial request using the Chrome browser, but when the user opens the magic link in their email, iOS automatically opens it in Safari (the default browser). If this happens, the transaction will fail.

<%= include('../_includes/_introduction-email-magic-link') %>

<%= include('../_includes/_setup-email') %>
