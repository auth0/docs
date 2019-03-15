---
description: This article explains how to install and configure the Google Analytics for Auth0 integration.
topics:
  - google
  - analytics
contentType: how-to
useCase:
  - manage-analytics
  - analyze-external-analytics
---
# Google Analytics for Auth0

This article explains how to install and configure the **Google Analytics for Auth0** integration. You can use this integration on your own page that is using Lock or you can use this as part of a [customized Universal Login page](/universal-login#advanced-customization).

Additionally, you will find instructions on how to configure funnels and reports inside of Google Analytics to get the most out of this integration.

## Setup and install

To add the Google Analytics integration to your app:

1. Set your Analytics configuration options
2. Include a reference to the `auth0-analytics.js` script on your Login pages/pages with Auth0 Lock

### Step 1: Set your Analytics configuration options

First, set your Analytics configuration options. You must set this *before* you include the references to the Lock and Auth0 Analytics libraries (which we cover in the section immediately following).

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

### Step 2: Include the script reference to auth0-analytics.js

Next, include the script reference to the `auth0-analytics.js`. This needs to be included **after** the call to Lock.

```javascript
<script src="${lock_url}"></script>
<script src="https://cdn.auth0.com/js/analytics/X.Y.Z/analytics.min.js"></script>
```

::: note
The script version above uses a placeholder version `X.Y.Z`. For example, to reference release 1.3.1 use `https://cdn.auth0.com/js/analytics/1.3.1/analytics.min.js`. You can [find the latest release's version number](https://github.com/auth0/auth0-analytics.js/releases/) on GitHub.
:::

<%= include('../_usage', { name: "Google Analytics" }) %>

## Reporting

For the most up-to-date information on using Google Analytics, see the [Google Analytics documentation](https://support.google.com/analytics).
