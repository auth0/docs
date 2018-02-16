---
title: GDPR Compliance: Data Portability
description: This article discusses how customers can export user data in order to comply with data portability GDPR requirements
toc: true
---
# GDPR Compliance: Data Portability

According to Article 20 of GDPR, users have the right to receive the personal data concerning them in a structured, commonly used and machine-readable format.

You can export user data, stored in the Auth0 user store, either manually or programmatically. Raw data from Auth0 can be exported in JSON format (which is machine-readable).

## Export data manually

To export a user's data manually from the Dashboard:

1. Go to [Dashboard > Users](${manage_url}/#/users)
1. Search for the user and drill down on their name
1. Click the **Raw JSON** tab. Here you can see the complete user profile in JSON format
1. Click **Copy JSON**. The profile is copied to your clipboard
1. Paste the clipboard contents to an editor and save

## Export data using the API

You can export a user's full profile using our Management API. The response will be in JSON format. There are several endpoints you can use, depending on your use case and the search criteria you want to use:

- [Search for a user using their email address](/users/search#users-by-email)
- [Search for a user using their ID](/users/search#users-by-id)
- [Search for a set of users](/users/search#users)
- [Export a list of your users](/users/search#user-export)

<%= include('../_stepnav', {
 prev: ["Go back", "/compliance/gdpr/features-aiding-compliance"],
 navHeader: "Auth0 Features and GDPR Compliance"
}) %>