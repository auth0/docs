# SAML

## Login

<h5 class="code-snippet-title">Examples</h5>

```http
GET https://${account.namespace}/{client_id}?connection=
```

```shell
shell
```

```javascript
javascript
```

```csharp
csharp
```

Redirect a user to the login page for the specified connection.

The SAML protocol is mostly used for third-party SaaS applications (e.g. Salesforce, Box, etc.). Auth0 supports SP and IDP Initiated Sign On.

### Query Parameters

| Parameter        | Type       | Description |
|:-----------------|:-----------|:------------|
| `client_id`      | string     | the `client_id` of your app |
| `connection`     | string     | the name of an identity provider configured to your app (optional, see remarks) |

<aside class="notice">
All the parameters of the SAML response can be modified with <a href='/rules'>rules </a>
</aside>

### Remarks

* This endpoint optionally accepts a `connection` parameter to login with the specified provider. If no connection is specified, the [Auth0 Login Page](/login_page) is shown.

* The SAML request `AssertionConsumerServiceURL` will be used to `POST` back the assertion. It must match the application's `callback_URL`.

## Metadata

<h5 class="code-snippet-title">Examples</h5>

```http
GET https://${account.namespace}/samlp/metadata/{client_id}
```

```shell
shell
```

```javascript
javascript
```

```csharp
csharp
```

This endpoint returns the SAML 2.0 metadata.

### Query Parameters

| Parameter        | Type       | Description |
|:-----------------|:-----------|:------------|
| `client_id`      | string     | the `client_id` of your app |


## Callback

<h5 class="code-snippet-title">Examples</h5>

```http
POST https://${account.namespace}/login/callback?connection=
```

```shell
shell
```

```javascript
javascript
```

```csharp
csharp
```

This endpoint accepts an IdP-Initiated Sign On SAMLResponse from a SAML Identity Provider. The connection corresponding to the identity provider is specified in the querystring. The user will be redirected to the application that is specified in the SAML Provider IdP-Initiated Sign On section.

### Query Parameters

| Parameter        | Type       | Description |
|:-----------------|:-----------|:------------|
| `connection`     | string     | the name of an identity provider configured to your app |
| `SAMLResponse`   | string     | an IdP-Initiated Sign On SAML Response |
