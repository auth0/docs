---
title: Auth0 Data Processing
description: How Auth0 processes data in its possession
---
# Auth0 Data Processing

This document discusses what data Auth0 has, as well as how it processes this data.

## Data Auth0 Possesses

All of the data Auth0 has about an end user is located in the Auth0 user profile. The specific attributes contained in the user profile vary based on customer implementation and are based on a number of factors, such as connection type, user consent during the authentication flow, and whether you've augmented the user profiles with additional information.

## Where Auth0 Data is Stored

The Auth0 user profile information is stored in Auth0 when you use a database connection. If a user logs in using any other type of connection, the basic profile attributes are cached in Auth0 and updated during each subsequent login.

## How Auth0 Uses the Data It Stores

The personal data stored in Auth0 is used only for the purposes of providing its services, namely authenticating users

## What Happens to Data When an End User's Account is Deleted

See [Right to be Forgotten](/compliance/features-aiding-compliance#right-to-be-forgotten).

<%= include('./_stepnav', {
 prev: ["Go back", "/compliance"]
}) %>