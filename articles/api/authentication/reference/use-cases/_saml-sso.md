# SAML SSO

The SAML protocol is used for 3rd party SaaS applications mostly, like Salesforce and Box. Auth0 supports SP and IDP Initiated Sign On. For more information refer to: [SAML](/protocols/saml).

## Accept a SAML Request

<h5 class="code-snippet-title">Examples</h5>

```http
GET https://${account.namespace}/${account.client_id}?connection={connection}
```

```shell
curl --request GET \
  --url 'https://${account.namespace}/${account.client_id}' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data '"connection"=""'
```

```javascript
```

Use this endpoint to accept a SAML request to initiate a login.

Optionally, it accepts a connection parameter to login with a specific provider. If no connection is specified, the [Auth0 Login Page](/login_page) will be shown.

The query parameters are:

| Parameter        | Type       | Description |
|:-----------------|:-----------|:------------|
| `client_id`      | string     | the `client_id` of your client |
| `connection`     | string     | the name of an identity provider configured to your client (optional) |

Note the following:
- All the parameters of the SAML response can be modified with [Rules](/rules).
- The SAML request `AssertionConsumerServiceURL` will be used to `POST` back the assertion. It must match the application's `callback_URL`.


## IdP-Initiated SSO Flow

<h5 class="code-snippet-title">Examples</h5>

```http
POST https://${account.namespace}/login/callback?connection={connection}
Content-Type: 'application/x-www-form-urlencoded'
{
  SAMLResponse=PHNhbWxwOlJlc3BvbnNlIHhtbG5zOnNhbWxwPSJ1cm46b2FzaXM6bmFtZXM6dGM...
}
```

```shell
curl --request GET \
  --url 'https://${account.namespace}/login/callback' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data '"SAMLResponse"="PHNhbWxwOlJlc3BvbnNlIHhtbG5zOnNhbWxwPSJ1cm46b2FzaXM6bmFtZXM6dGM..."'
```

```javascript

```

This endpoint accepts an IdP-Initiated Sign On SAMLResponse from a SAML Identity Provider. The connection corresponding to the identity provider is specified in the querystring. The user will be redirected to the application that is specified in the SAML Provider IdP-Initiated Sign On section.

The query parameters are:

| Parameter        | Type       | Description |
|:-----------------|:-----------|:------------|
| `connection`     | string     | the name of an identity provider configured to your client |
| `SAMLResponse`   | string     | an IdP-Initiated Sign On SAML Response |
