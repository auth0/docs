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

With magic link transactions, both the initial request and its response must take place in the same browser or the transaction will fail. This is particularly relevant for iOS users, who cannot change their default web browser. For example, the user might make the initial request using Chrome, but when the user opens the magic link in their email, iOS opens it in Safari, the default browser. If this happens, the transaction will fail.

<%= include('../_includes/_introduction-email') %>

<%= include('../_includes/_setup-email') %>
