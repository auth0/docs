---
title: Troubleshoot Custom Domains
description: Learn how to troubleshoot issues with custom domains. 
topics:
  - custom-domains
  - certificates
contentType: reference
useCase: 
  - configure-customize-domains
  - configure-auth0-managed-certificates
---

# Troubleshoot Custom Domains

If you are seeing errors, take a look at this video on common issues with Custom Domains, or refer to the below sections for troubleshooting steps for specific scenarios.

<iframe width="560" height="315" src="https://www.youtube.com/embed/f6fkOkS1RFA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Custom domain is still pending verification

It can take up to 48 hours for the DNS to be propagated.

If you continue to see this error in the Dashboard, make sure that the CNAME record is properly configured in your domain management service. You can confirm the configuration of your CNAME record using:

* A tool like [Mxtoolbox](https://mxtoolbox.com/DNSLookup.aspx) or [Google](https://dns.google.com)
* The `dig` command in your terminal

Ensure that the domain name is not already associated with an A record.

Make sure that no errors were made when typing or copying the CNAME record's domain name or value.

## Cloudflare CNAME Flattening

CNAME Flattening affects the Auth0 verification and certificate renewal processes due to the way it handles DNS records. We recommend turning off CNAME Flattening unless it's strictly necessary, according to the [Cloudflare documentation](https://support.cloudflare.com/hc/en-us/articles/200169056-Understand-and-configure-CNAME-Flattening).

## "You should not be hitting this endpoint"
If you see this error when configuring a custom domain, you must perform [additional configuration](/custom-domains/additional-configuration), which varies depending on your setup.

## "Service not found"

If your application issues an `/authorize` request with `audience=https://login.northwind.com/userinfo`, the server will return a `Service not found: https://login.northwind.com/userinfo` error. This is because even if you set a custom domain the API identifier for the `/userinfo` endpoint remains `https://{YOUR_ORIGINAL_AUTH0_DOMAIN}/userinfo`. 

Similarly, using your custom domain in calls to the [Management API](/api/management/v2) will error for the same reason.

To fix this your app should instead use `audience=https://{YOUR_ORIGINAL_AUTH0_DOMAIN}/userinfo`. You can also remove this `audience=[...]/userinfo` parameter altogether if your application is flagged as **OIDC-Conformant** in the **OAuth2** tab of the application's **Advanced Settings**.

## Errors related to Internet Explorer

If you are using Internet Explorer, you may see any of the following error messages:

* "No verifier returned from client"
* "Origin header required"
* "Failed cross origin authentication"

When both the Auth0 domain and the app domain are in the same trusted or local intranet zone, Internet Explorer does *not* treat the request as a cross-domain request and therefore does not send the cross-origins header.

If you see any of these errors and you are using Embedded Login, you can move one of the sites out of the trusted or local intranet zone. To do this:

1. Go to **Internet Options > Security**. 
2. Select the **Local Intranet Zone** tab and go to Sites > Advanced. Add your domain.
3. Return to the **Security** tab, and make sure the proper zone has been selected.
4. Click **Custom Level** and look for **Access data sources across domains** under the **Miscellaneous** section. Check the radio button next to **Enable.**.

Alternatively, you can remove reliance on cross-origin authentication by implementing [Universal Login](/hosted-pages/login).
