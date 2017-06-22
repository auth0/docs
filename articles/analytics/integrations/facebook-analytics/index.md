---
description: This article explains how to install and configure the Facebook Analytics for Auth0 integration.
---
# Facebook Analytics for Auth0

This article explains how to install and configure the **Facebook Analytics for Auth0** integration. You can use this integration on your own page that is using [Lock](/libraries/lock) or you can use this on the [hosted Lock pages](/hosted-pages/login). Additionally, you will find instructions on how to configure funnels and reports inside of Facebook Analytics to get the most out of this integration.

## Install

In order to add the integration to your app you simply need to reference the `Auth0 Analytics.js` script on any pages in your app that have Auth0 Lock. The script must be referenced after Lock and must have the configuration options set before the script reference.

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
The script version above uses a placeholder version `X.Y.Z`. In order to determine the latest release view the [releases in github](https://github.com/auth0/auth0-analytics.js/releases/). For example, to reference release 1.2.0 use `https://cdn.auth0.com/js/analytics/1.2.0/analytics.min.js`.
:::

### Setup

There are several ways you can use the Facebook Analytics integration. If you already have either the Facebook Tracking Pixel or the Facebook Javascript SDK referenced on your site you simply set the script to use the `preload` option as shown below. If you don't have either script loaded you simply need to set your Facebook Analytics App ID using the Facebook Javascript SDK configuration below.

### Using Facebook Javascript SDK (Recommended)

The simpliest configuration is to let the Analytics script load the Facebook Javascript SDK. In order to do this you only need to provide your Facebook Analytics App ID to the analytics options as shown below.

```
<script>
window.auth0AnalyticsOptions = {
  'facebook-analytics': {
    id: 'YOUR_APP_ID'
  }
}
</script>
```

If you have already loaded the Facebook Javascript SDK on your site, you just need to tell Auth0 Analytics to not load it again as shown below.

```
<script>
window.auth0AnalyticsOptions = {
  'facebook-analytics': {
    preloaded: true
  }
}
</script>
```

### Using Facebook Pixel

If you already have the Facebook Pixel installed on your site you can use that configuration mode. Note that with the Facebook Pixel, certain features of Facebook Analytics are not availible. The configuration for using the pixel is shown below.

```
<script>
window.auth0AnalyticsOptions = {
  'facebook-pixel': {
    preloaded: true
  }
}
</script>
```

<%= include('../_usage', { name: "Facebook Analytics" }) %>

## Reporting

For the most up to date information on using Facebook Analytics we recemmend reviewing their [documentation](https://www.facebook.com/help/analytics/1710582659188030). You will most likely want to create funnels to measure the success of your aquistion and registration flows using these new events. Details on creating funnels can be found [here](https://www.facebook.com/help/analytics/935921203105136).
