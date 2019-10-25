---
description: Learn how to install and configure the Facebook Analytics for Auth0 integration.
topics:
  - facebook
  - analytics
contentType: how-to
useCase:
  - manage-analytics
  - analyze-external-analytics
---
# Integrate Facebook Analytics with Auth0

Install and configure the **Facebook Analytics for Auth0** integration on your own page that is using [Lock](/libraries/lock) or the [hosted Lock pages](/hosted-pages/login). You can configure funnels and reports inside of Facebook Analytics to get the most out of this integration.

<%= include('../_includes/_install', { name: "Facebook Analytics" }) %>

## Setup

If you already have either the Facebook Tracking Pixel or the Facebook Javascript SDK referenced on your site, configure Auth0 Analytics with the `preload` option as shown below. If you don't have either script loaded you need to set your Facebook Analytics App ID using the Facebook Javascript SDK configuration below.

We recommend [creating funnels](https://www.facebook.com/help/analytics/935921203105136) to measure the success of your acquisition and registration flows using these new events.

### Configure Facebook Javascript SDK (Recommended)

The simplest configuration is to let the Analytics script load the Facebook Javascript SDK. You can do this by providing your Facebook Analytics App ID to the analytics options as shown below.

```
<script>
window.auth0AnalyticsOptions = {
  'facebook-analytics': {
    id: 'YOUR_APP_ID'
  }
}
</script>
```

If you have already loaded the Facebook Javascript SDK on your site, configure Auth0 Analytics to not load it again as shown below.

```
<script>
window.auth0AnalyticsOptions = {
  'facebook-analytics': {
    preloaded: true
  }
}
</script>
```

### Configure Facebook Pixel

If you already have the Facebook Pixel installed on your site you can use that configuration mode. Note that with the Facebook Pixel, certain features of Facebook Analytics are not available. The configuration for using the pixel is shown below.

```
<script>
window.auth0AnalyticsOptions = {
  'facebook-pixel': {
    preloaded: true
  }
}
</script>
```

<%= include('../_includes/_usage', { name: "Facebook Analytics" }) %>

## Keep reading

[Facebook Analytics documentation](https://www.facebook.com/help/analytics/1710582659188030)

