---
description: Learn how to install and configure the Google Analytics for Auth0 integration.
topics:
  - google
  - analytics
contentType: how-to
useCase:
  - manage-analytics
  - analyze-external-analytics
---
# Integrate Google Analytics with Auth0

This article explains how to install and configure the **Google Analytics for Auth0** integration. You can use this integration on your own page that is using Lock. You can configure funnels and reports inside of Google Analytics to get the most out of this integration.

## Setup

1. Set analytics configuration options *before* you include the references to the Lock and Auth0 Analytics libraries.

    ```javascript
    <script>
    window.auth0AnalyticsOptions = {
    'google-analytics': {
        id: 'YOUR_GA_ID',
        preloaded: true
    }
    }
    </script>
    ```

2. Include the script reference to the `auth0-analytics.js`. This needs to be included *after* the call to Lock.

    ```javascript
    <script src="${lock_url}"></script>
    <script src="https://cdn.auth0.com/js/analytics/X.Y.Z/analytics.min.js"></script>
    ```

::: note
The script version above uses a placeholder version `X.Y.Z`. For example, to reference release 1.3.1 use `https://cdn.auth0.com/js/analytics/1.3.1/analytics.min.js`. You can [find the latest release's version number](https://github.com/auth0/auth0-analytics.js/releases/) on GitHub.
:::

<%= include('../_includes/_usage', { name: "Google Analytics" }) %>

## Keep reading

[Google Analytics documentation](https://support.google.com/analytics)
