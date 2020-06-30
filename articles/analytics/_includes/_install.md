## Install

To add the <%- name %> integration to your app, include a reference to the `Auth0 Analytics.js` script on any pages with Auth0 Lock. Include the script reference **after**** Lock *and* set the configuration options before the script reference.

```
<script>
// set configuration options
window.auth0AnalyticsOptions = {
  // options
}

// include reference to the Analytics library AFTER Lock
</script>
<script src="${lock_url}"></script>
<script src="https://cdn.auth0.com/js/analytics/X.Y.Z/analytics.min.js"></script>
```

::: note
The script version above uses a placeholder version `X.Y.Z`. For example, to reference release, 1.3.1 use `https://cdn.auth0.com/js/analytics/1.3.1/analytics.min.js`. You can [find the latest release's version number](https://github.com/auth0/auth0-analytics.js/releases/) on GitHub.
:::
