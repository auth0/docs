---
description: This article explains how to install and configure the Google Analytics for Auth0 integration.
tags:
  - google
  - analytics
---
# Google Analytics for Auth0

This article explains how to install and configure the **Google Analytics for Auth0** integration. You can use this integration on your own page that is using Lock or you can use this on the hosted Lock pages. Additionally, you will find instructions on how to configure funnels and reports inside of Google Analytics to get the most out of this integration.

<%= include('../_install', { name: "Google Analytics" }) %>

## Setup

There are several ways you can use the Google Analytics integration. If you already have the Google Analytics Script on your site, configure Auth0 Analytics with the `preload` option as shown below. If you don't have Google Analytics loaded you need to set your Google Analytics ID using the Google Analytics configuration below.

### Google Analytics Script Already Loaded (Recommended)

If you have already loaded the Google Analytics script loaded on your site, configure Auth0 Analytics to not load it again as shown below.

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

If you are not using Google Analytics already you can have the Auth0 Analytics script load Google Analytics for you. To do this you need to set your Google Analytics ID in the options as shown below.

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

For the most up to date information on using Google Analytics, check out the [Google Analytics documentation](https://support.google.com/analytics).
