---
title: Why you should always use access tokens to secure an API
description: Explains the differences between access token and ID token and why the later should never be used to secure an API.
---

# Why you should always use access tokens to secure an API

There is much confussion on the Web as to the differences between the OpenID Connect and OAuth 2.0 specifications, and their respective tokens. As a result many developers publish insecure applications, compromising their users security. The contradicting implementations between identity providers do not help either.

This article is an attempt to clear what is what and convince you that you should always use an access token to secure an API, and never an ID token.

## Two complementary specifications

OpenID Connect is used for __user authentication__. It enables you to verify the identity of a user and get some basic profile information.

OAuth 2.0 is used to __grant authorization__. It enables you to 