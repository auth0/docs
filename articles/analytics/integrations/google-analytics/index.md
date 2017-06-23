---
description: This article explains how to install and configure the Google Analytics for Auth0 integration.
---
# Google Analytics for Auth0

This article explains how to install and configure the Google Analytics for Auth0 integration. You can use this integration on your own page that is using Lock or you can use this on the hosted Lock pages. Additionally, you will find instructions on how to configure funnels and reports inside of Google Analytics to get the most out of this integration.

## Install

In order to add the integration to your app you simply need to reference the Auth0 Analytics.js script on any pages in your app that have Auth0 Lock. The script must be refernced after Lock and must have the configuration options set before the script reference.

```
<script>
window.auth0AnalyticsOptions = {
  // Options
}
</script>
<script src="https://cdn.auth0.com/js/lock/10.x/lock.min.js"></script>
<script src="https://cdn.auth0.com/js/analytics/X.Y.Z/analytics.min.js"></script>
```

::: note
The script version above uses a placeholder version `X.Y.Z`. In order to determine the latest release view the [releases in github](https://github.com/auth0/auth0-analytics.js/releases/). For example, to reference release 1.2.0 use `https://cdn.auth0.com/js/analytics/1.2.0/analytics.min.js`
:::

### Setup

There are several ways you can use the Google Analytics integration. If you already have either the Google Analytics Script on your site you simply set the configuration options to use `preload` mode as shown below. If you don't have Google Analytics loaded you simply need to set your Google Analytics ID using the Google Analytics configuration below.

### Google Analytics Script Already Loaded (Recommended)

If you have already loaded the Google Analytics script loaded on your site, you just need to tell Auth0 Analytics to not load it again as shown below.

```
<script>
window.auth0AnalyticsOptions = {
  'google-analytics': {
    preloaded: true
  }
}
</script>
```

### No Google Analytics Script

If you are not using Google Analytics already you can have the Auth0 Analytics script load Google Analytics for you. In order to do this you simply need to set your Google Analytics ID in the options as shown below.

```
<script>
window.auth0AnalyticsOptions = {
  'google-analytics': {
    id: 'YOUR_GA_ID'
  }
}
</script>
```

<%= include('../_usage', { name: "Google Analytics" }) %>

## Reporting

For the most up to date information on using Google Analytics we recemmend reviewing their [documentation](https://support.google.com/analytics).
