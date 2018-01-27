---
description: Details on the WS-Federation protocol and how this is used by Auth0.
---
# WS-Federation

WS-Federation is supported both for apps (for example, any WIF based app) and for identity providers (such as ADFS or ACS).

## For apps
All registered apps in Auth0 get a WS-Fed endpoint of the form:

```text
https://${account.namespace}/wsfed/${account.clientId}
```

The metadata endpoint that you can use to configure the __Relying Party__:

```text
https://${account.namespace}/wsfed/${account.clientId}/FederationMetadata/2007-06/FederationMetadata.xml
```

All options for WS-Fed are available under the [advanced settings](${manage_url}/#/applications/${account.clientId}/settings) for an App.

Claims sent in the SAML token, as well as other lower level settings of WS-Fed & SAML-P can also be configured with the `samlConfiguration` object through [rules](/saml-configuration).

The following optional parameters can be used when redirecting to the WS-Fed endpoint:

* `wreply`: Callback URL
* `wctx`: Your application's state
* `whr`: The name of the connection (to skip the login page)

```text
https://${account.namespace}/wsfed/${account.clientId}?whr=google-oauth2
```

## For IdP
If you are connecting a WS-Fed IdP (such as ADFS, Azure ACS and IdentityServer), then the easiest is to use the __ADFS__ connection type. Using this you just enter the server address. Auth0 will probe for the __Federation Metadata__ endpoint and import all the required parameters: certificates, URLs, and so on

::: note
You can also upload a Federation Metadata file.
:::

If both primary and secondary certificates are present in the __Federation Metadata__, then both would work. Connection parameters can be updated anytime (by clicking on __Edit__ and __Save__). This allows simple certificate rollover.
