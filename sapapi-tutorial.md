# Using Auth0 with SAP Netweaver Gateway APIs

> This integration is in __experimental mode__. Contact us oif you have questions.

As with any other add-on API enabled in the dahsboard, Auth0 will return a SAP Netweaver Gateway token through the [Delegation](/auth-api#delegated) endpoint. This allows you to exchange an Auth0 token (the JWT issued when a user authenticates with Auth0 with any supported [Identity Provider](identityproviders)) for another one that you can then use to call the SAP API.

> Under the hood, Auth0 uses [SAML 2.0 Bearer Assertion Flow for OAuth 2.0](http://help.sap.com/saphelp_nw74/helpdata/en/12/41087770d9441682e3e02958997846/content.htm) to obtain an `access_token`. All details of construction of the right SAML token are taken care of by Auth0.

![](https://docs.google.com/drawings/d/1cG4mJy742ZW1ixcMdh3XZmRPxRJldt5pax5ktfb6Ff4/pub?w=744&amp;h=425)

To enable calling the `SAP API` from any app, just turn on the integration on the <a href="@@uiAppAddonsURL@@" target="_new">Application Add-ons</a> section and follow the instructions displayed.


## How to use the API

```
POST https://@@account.namespace@@/delegation
Content-Type: 'application/json'
{
  "client_id":   "@@account.clientId@@",
  "grant_type":  "urn:ietf:params:oauth:grant-type:jwt-bearer",
  "id_token":    "{YOUR_ID_TOKEN}",
  "target":      "@@account.clientId@@",
  "scope":       "openid",		//Not used
  "api_type":	 "sap_api",
  "sap_scope":   "SAP SCOPE"	//Optional
}
```

The `sap_scope` parameter is optional. The parameter in the request always takes precedence over the value configured on the dashboard.

A successful result would look like this:

```
{
  "access_token":"AFBWmAGzHtKjj......rzwcxRGuOIdmH7",
  "token_type":"Bearer",
  "expires_in":"600",
  "scope":"SAP_SCOPE"
}
```

You can then use this `access_token` to call SAP's APIs.
