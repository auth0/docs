---
title: Client Secret
description: Learn about client secrets.
topics:
  - applications
  - client-secrets
contentType: 
  - concept
useCase:
  - build-an-app
---

# Client Secret

A client secret is a secret known only to your application and the authorization server. It protects your resources by only granting [tokens](/tokens) to authorized requestors. 

Protect your client secrets and never include them in mobile or browser-based apps. If your client secret is ever compromised, you should [rotate to a new one](/dashboard/guides/applications/rotate-client-secret) and update all authorized apps with the new client secret.