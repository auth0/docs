---
description: Signing and encrypting SAML requests
  topics:
    - saml
    - sso
contentType:
  - how-to
useCase:
  - add-idp
---

# Special Configuration Scenarios: Signing and Encrypting SAML Requests

To increase the security of your transactions, you can sign or encrypt both your requests and your responses in the <dfn data-key="security-assertion-markup-language">SAML</dfn> protocol. In this article you'll find configurations for specific scenarios, separated under two use cases:

- Auth0 as the SAML **service provider** (i.e. a SAML **Connection**)
- Auth0 as the SAML **identity provider** (i.e. an **Application** configured with the **SAML Web App Addon**)

## Auth0 as the SAML Service Provider

These scenarios apply when Auth0 is the SAML Service Provider, i.e. Auth0 connects to a SAML identity provider by creating a SAML connection.

### Sign the SAML Authentication Request

If Auth0 is the SAML **service provider**, you can sign the authentication request Auth0 sends to the IdP as follows:

1. For the Connection in which you're interested, navigate to **Enterprise** -> **SAMLP Identity Provider** -> **Settings**.
2. Enable the **Sign Request** toggle.
3. Download the certificate beneath the **Sign Request** toggle and provide it to the IdP so that it can validate the signature.

#### Enable/Disable Deflate Encoding

By default, SAML authentication requests are sent via HTTP-Redirect and use deflate encoding, which puts the signature in a query parameter.

To turn off deflate encoding, you can make a [PATCH call to the Management API's Update a Connection endpoint](/api/management/v2#!/Connections/patch_connections_by_id) and set the `deflate` option to `false`.

::: note
Updating the `options` object for a connection overrides the whole `options` object. To keep previous connection options, get the existing `options` object and add new key/values to it.
:::

Endpoint: `https://${account.namespace}/api/v2/connections/YOUR_CONNECTION_ID`

Payload: 

```json
{
	{ 
		"options" : {
			[...], // all the other connection options
		  "deflate": false
	}
}
```

### Use a custom certificate to sign requests

By default, Auth0 uses the tenant private key to sign SAML requests (when the **Sign Request** toggle is enabled). You can also provide your own private/public key pair to sign requests coming from a specific connection.

You can generate your own certificate and private key using this command:

```shell
openssl req -x509 -nodes -sha256 -days 3650 -newkey rsa:2048 -keyout private_key.key -out certificate.crt
```

Changing the key used to sign requests in the connection can't be done on the Dashboard UI, so you will have to use the [Update a Connection endpoint](/api/management/v2#!/Connections/patch_connections_by_id) from the Management API v2, and add a `signing_key` property to the `options` object, as shown in the payload example below.

::: note
Updating the `options` object for a connection overrides the whole `options` object. To keep previous connection options, get the existing `options` object and add new key/values to it.
:::

Endpoint: `https://${account.namespace}/api/v2/connections/YOUR_CONNECTION_ID`

Payload:

```json
{
	{ 
		"options" : {
			[...], // all the other connection options
		  "signing_key": {
				"key":"-----BEGIN PRIVATE KEY-----\n...{your private key here}...\n-----END PRIVATE KEY-----",
				"cert":"-----BEGIN CERTIFICATE-----\n...{your public key cert here}...\n-----END CERTIFICATE-----"
			}
	}
}
```

See [Working with private and public keys as strings](#working-with-certificates-as-strings) for details on how to get the private key and certificate formatted as a JSON string to use in the payload.

### Receive Signed SAML Authentication Responses

If Auth0 is the SAML **service provider**, all SAML responses from your identity provider should be signed to indicate it hasn't been tampered with by an unauthorized third-party.

You will need to configure Auth0 to validate the responses' signatures by:

* Obtaining a signing certificate from the IdP
* Loading the certificate from the IdP into your Auth0 Connection (in the Management Dashboard, go to the **Upload Certificate** section for your Connection by navigating to **Connections** -> **Enterprise** -> **SAMLP Identity Provider** -> **Settings**)

Auth0 can accept a signed response for the assertion, the response, or both.

### Receive Encrypted SAML Authentication Assertions

If Auth0 is the SAML **service provider**, it may need to receive encrypted assertions from an identity provider. To do this, you must provide tenant's public key certificate to the IdP. The IdP encrypts the SAML assertion using the public key and sends it to Auth0, which decrypts it using the tenant's private key.

To retrieve the certificate you need to send to your IdP from the [Management Dashboard](${manage_url}), go to **Connections** -> **Enterprise** -> **SAMLP Identity Provider** and click on the **Setup Instructions** button next to the connection.

Navigate to the section titled **Encrypted Assertions** and download the certificate in the format requested by the IdP.

### Use your own key pair to decrypt encrypted responses

As noted above, Auth0 will by default use your tenant's private/public key pair to handle encryption. You can also provide your own public/private key pair if an advanced scenario requires so.

Changing the key pair used to encrypt and decrypt requests in the connection can't be done on the Dashboard UI, so you will have to use the [Update a Connection endpoint](/api/management/v2#!/Connections/patch_connections_by_id) from the Management API v2, and add a `decryptionKey` property to the `options` object, as shown in the payload example below.

::: note
Updating the `options` object for a connection overrides the whole `options` object. To keep previous connection options, get the existing `options` object and add new key/values to it.
:::

Endpoint: `https://${account.namespace}/api/v2/connections/YOUR_CONNECTION_ID`

Payload:

```json
{
	{ 
		"options" : {
			[...], // all the other connection options
		  "decryptionKey": {
				"key":"-----BEGIN PRIVATE KEY-----\n...{your private key here}...\n-----END PRIVATE KEY-----",
				"cert":"-----BEGIN CERTIFICATE-----\n...{your public key cert here}...\n-----END CERTIFICATE-----"
			}
	}
}
```

The SAML metadata available for the connection will be updated with the provided certificate, so that the identity provider can pick it up to sign the SAML response. 

## Auth0 as the SAML Identity Provider

This scenarios apply when Auth0 is the SAML Identity Provider for an application. This is represented in the dashboard by an **Application** that has the SAML Web App Addon enabled.

### Sign the SAML Responses/Assertions

If Auth0 is the SAML **identity provider**, it will sign SAML assertions with the tenant's private key and provide the service provider with the public key/certificate necessary to validate the signature.

To retrieve the certificate you need to send to your IdP from the [Management Dashboard](${manage_url}):

1. Go to **Applications** -> **Settings** -> **Show Advanced Settings**.
2. Scroll to the *Certificates* section, and click **Download Certificate* to obtain the signing certificate you need to provide to your IdP.
3. Send your certificate to the service provider.

By default, Auth0 signs the SAML **assertion** within the response. If you want to sign the SAML **response** instead, follow this instructions:

1. In the [Management Dashboard](${manage_url}), navigate to **Applications**. Find the Application you're interested in go to **Addons** > SAML2 WEB APP > Settings.
2. Look for the `"signResponse"` key. Add it or uncommented if required, and set its value to `true` (the default value is `false`). The configuration should look like this:

```json
{
  [...], // other settings
  "signResponse": true
}
```

#### Change the signing key for SAML responses

Auth0 will by default use the private/public key pair assigned to your tenant to sign SAML responses or assertions. For very specific scenarios you might wish to provide your own key pair. You can do so with a rule like this:

```javascript
function (user, context, callback) {
  // replace with the ID of the application that has the SAML Web App Addon enabled
	// for which you want to change the signing key pair.
	var samlIdpClientId = 'YOUR_SAML_APP_CLIENT_ID';
  // only for a specific client
  if (context.clientID !== samlIdpClientId) {
    return callback(null, user, context);
  }

	// provide your own private key and certificate here  
  context.samlConfiguration.cert = "-----BEGIN CERTIFICATE-----\nnMIIC8jCCAdqgAwIBAgIJObB6jmhG0QIEMA0GCSqGSIb3DQEBBQUAMCAxHjAcBgNV[..all the other lines..]-----END CERTIFICATE-----\n";
  context.samlConfiguration.key = "-----BEGIN PRIVATE KEY-----\nnMIIC8jCCAdqgAwIBAgIJObB6jmhG0QIEMA0GCSqGSIb3DQEBBQUAMCAxHjAcBgNV[..all the other lines..]-----END PRIVATE KEY-----\n";
      
  callback(null, user, context);
}
```

Take a look at [Working with certificates as strings](#working-with-certificates-as-strings) for information on how to turn the private key and certificate files into strings that you can use in a rule.

### Receive Signed SAML Authentication Requests

If Auth0 is the SAML **identity provider**, it can received requests signed with the service provider's private key. Auth0 will then use the service providers' public key/certificate to validate the signature.

To configure signature validation, you'll need to download the service provider's certificate with the public key and store the value in the `signingCert` key of the SAML Web App Addon `options` JSON object. You can find the `options` JSON object field in the [Management Dashboard](${manage_url}) by going to **Applications** > **Addons** > **SAML2 WEB APP** > **Settings**.

The configuration should look like this:

```json
{
  [...], // other settings
  "signingCert": "-----BEGIN CERTIFICATE-----\nMIIC8jCCAdqgAwIBAgIJObB6jmhG0QIEMA0GCSqGSIb3DQEBBQUAMCAxHjAcBgNV\n[..all the other lines..]-----END CERTIFICATE-----\n"
}
```

### Send Encrypted SAML Authentication Assertions

If Auth0 is the SAML **identity provider**, you can use [Rules](/rules) to encrypt the SAML assertions it sends.

You'll need to obtain the certificate and the public key from the service provider. If you only got the certificate, you can derive the public key using `openssl`. Assuming that the certificate file is named `certificate.pem` you can do:

```shell
openssl x509 -in certificate.pem -pubkey -noout > public_key.pem
```

Once you get the certificate and public key files, you'll need to [turn them into strings](#working-with-certificates-as-strings) to use them in a rule. The rule will look like this:

```js
function (user, context, callback) {
  // this rule sets a specific public key to encrypt the SAML assertion generated from Auth0 
  if (context.clientID === 'THE_CLIENT_ID_OF_THE_APP_WITH_THE_SAML_APP_ADDON') {
	  context.samlConfiguration = (context.samlConfiguration || {});
    context.samlConfiguration.encryptionPublicKey = "-----BEGIN PUBLIC KEY-----\nnMIIC8jCCAdqgAwIBAgIJObB6jmhG0QIEMA0GCSqGSIb3DQEBBQUAMCAxHjAcBgNV\n[..all the other lines..]-----END PUBLIC KEY-----\n";
    context.samlConfiguration.encryptionCert = "-----BEGIN CERTIFICATE-----\nnnMIIC8jCCAdqgAwIBAgIJObB6jmhG0QIEMA0GCSqGSIb3DQEBBQUAMCAxHjAcBgNV\n[..all the other lines..]-----END CERTIFICATE-----\n";
	}
  callback(null, user, context);
}
```

The following algorithms are used:

* AES256 (`http://www.w3.org/2001/04/xmlenc#aes256-cbc`) for assertion encryption
* RSA-OAEP (including MGF1 with SHA1, `http://www.w3.org/2001/04/xmlenc#rsa-oaep-mgf1p`) for key transport

## Working with certificates as strings

When working with certificates or keys in rules or Management API v2 requests, you will most likely require a string representation of the file.

If you open a certificate file (`cer`, `pem`) with a text editor, you'll see something like this:

```
-----BEGIN CERTIFICATE-----
MIICzDCCAbQCCQDH8GvxPIeH+DANBgkqhkiG9w0BAQsFADAoMQswCQYDVQQGEwJh
cjEZMBcGA1UEAwwQaHR0cHM6Ly9uaWNvLmNvbTAeFw0xOTA0MDgxODA3NTVaFw0y
//
// more lines of base64-encoded information
//
nSWyabd+LiBGtLTMB+ZLbOIi3EioWPGw/nHOI8jzPrqhiCLuZCSQmiqrLQYNsc1W
-----END CERTIFICATE-----
```

The lines between the `-----BEGIN CERTIFICATE-----` header and `-----END CERTIFICATE-----` footer contain base64-encoded binary information. Public keys and private keys (`.key` files) will look similar, with just a different header/footer.

For a string representation of a certificate/key file, you will need to concatenate everything in one line, with a `\n` (escaped new-line) sequence replacing the actual new lines in the file. So from the above sample you'd obtain something like this:

```
"-----BEGIN CERTIFICATE-----\nMIICzDCCAbQCCQDH8GvxPIeH+DANBgkqhkiG9w0BAQsFADAoMQswCQYDVQQGEwJh\n[..all the other lines..]-----END CERTIFICATE-----\n"
```
