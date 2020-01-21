---
title: Configure Global Variables for Rules
description: Learn how to configure global variables for rules using the Auth0 Management Dashboard. Global variables are available to all rules via the configuration object.
topics:
  - rules
  - variables
  - dashboard
contentType: 
    - how-to
useCase:
  - build-an-app
  - call-api
  - secure-api
---
# Configure Global Variables for Rules

This guide will show you how to configure global variables for [rules](/rules) using Auth0's Dashboard.

1. Navigate to the [Rules](${manage_url}/#/rules) page in the [Auth0 Dashboard](${manage_url}/), and locate the **Settings** section.

2. Enter a variable key/value pair, and click **Add**.

The entered value is now available to all rules via the global `configuration` object and can be referenced using the value in the **Code Snippet** column.
