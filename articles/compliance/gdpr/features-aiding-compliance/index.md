---
title: "How Auth0 can help with GDPR"
description: This article discusses the Auth0 features that can help customers comply with GDPR requirements
toc: true
topics:
    - compliance
    - gdpr
contentType: 
    - concept
    - index
useCase: compliance
---
# How Auth0 Can Help With GDPR Compliance

In this article, you will find a list of GDPR regulations and how Auth0 can help you comply with them.

<%= include('./_legal-warning.md') %>

## Conditions for consent

According to Article 7 of GDPR, you must:
- ask users to consent on the processing of their personal data in a clear and easily accessible form
- be able to show that the user has consented, and
- provide an easy way to withdraw consent at any time

You can use Auth0 to ask your users for consent upon signup (using either Lock or a custom form) and save this information at the user profile. You can later update this information using the Management API.

For details, see [Conditions for consent](/compliance/gdpr/features-aiding-compliance/user-consent).

## Right to access, correct, and erase data

According to Articles 15, 16, 17, and 19 of GDPR, users have the right to: 
- get a copy of their personal data you are processing
- ask for rectifications if they are inaccurate, and 
- ask you to delete their personal data

With Auth0, you can access, edit, and delete user information, either manually or using our API. 

For details, see [Right to access, correct, and erase data](/compliance/gdpr/features-aiding-compliance/right-to-access-data).

## Data minimization

According to Article 5 of GDPR:
- the personal data you collect must be limited to what is necessary for processing
- must be kept only as long as needed, and
- appropriate security must be ensured during data processing, including protection against unauthorised or unlawful processing and against accidental loss, destruction, or damage

There are several Auth0 features than can help you achieve these goals, like account linking, user profile encryption, and more.

For details, see [Data minimization](/compliance/gdpr/features-aiding-compliance/data-minimization).

## Data portability

According to Article 20 of GDPR, users have the right to receive the personal data concerning them in a structured, commonly used and machine-readable format. 

You can export user data, stored in the Auth0 user store, either manually or programmatically. Raw data from Auth0 can be exported in JSON format (which is machine-readable). 

For details, see [Data portability](/compliance/gdpr/features-aiding-compliance/data-portability).

## Protect and secure user data

According to Article 32 of GDPR, you must implement appropriate measures to ensure a level of security, including  (but not limited to):
- data encryption
- ongoing confidentiality
- data integrity, and 
- availability and resilience of processing systems and services

There are several Auth0 features than can help you meet this requirement, like user profile encryption, brute-force protection, breached password detection, step-up authentication, and more. 

For details, see [Protect and secure user data](/compliance/gdpr/features-aiding-compliance/protect-user-data).
