## Install

To add the <%- name %> integration to your app, include a reference to the `Auth0 Analytics.js` script on any pages with Auth0 Lock. Include the script reference after Lock and set the configuration options before the script reference.

```
<script>
window.auth0AnalyticsOptions = {
  // Options
}
</script>
<script src="${lock_url}"></script>
<script src="https://cdn.auth0.com/js/analytics/X.Y.Z/analytics.min.js"></script>
```

::: note
The script version above uses a placeholder version `X.Y.Z`. For example, to reference release 1.2.0 use `https://cdn.auth0.com/js/analytics/1.2.0/analytics.min.js`. To find the latest release, see the [releases on github](https://github.com/auth0/auth0-analytics.js/releases/).
:::