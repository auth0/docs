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

To increase the security of your transactions, you can sign or encrypt both your requests and your responses in the SAML protocol. Bellow you will find configurations for specific scenarios, separated under two use cases:

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

**Note**: as always when updating the `options` object for a connection, the whole options object will be overridden, so you need to get first the existing `options` object for the connection and add the new key/value to it.

### Use a custom certificate to sign requests

By default, Auth0 will use the tenant private key to sign SAML requests (when the **Sign Request** toggle is enabled). You can, however, provide your own private/public key pair to do the signing for requests coming from a specific connection.

You can generate your own certificate and private key using this command:

```
openssl req -x509 -nodes -sha256 -days 3650 -newkey rsa:2048 -keyout private_key.key -out certificate.crt
```

Changing the key used to sign requests in the connection can't be done directly on the Dashboard UI, so you will have to use the [Update a Connection endpoint](/api/management/v2#!/Connections/patch_connections_by_id) from the Management API v2, and add a `signing_key` property to the `options` object, as shown in the payload example below.

**Note**: as always when updating the `options` object for a connection, the whole options object will be overridden, so you need to get first the existing `options` object for the connection and add the new key/value to it.

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

You will then need to configure Auth0 to validate the responses' signatures by:

* Obtaining a signing certificate from the IdP
* Loading the certificate from the IdP into your Auth0 Connection (in the Management Dashboard, go to the **Upload Certificate** section for your Connection by navigating to **Connections** -> **Enterprise** -> **SAMLP Identity Provider** -> **Settings**)

Auth0 can accept a signed response for the assertion, the response, or both.

### Receive Encrypted SAML Authentication Assertions

If Auth0 is the SAML **service provider**, it may need to receive encrypted assertions from an identity provider. To do this, you must provide Auth0's public key and certificate to the IdP. The IdP encrypts the SAML assertion using the public key and sends it to Auth0, which decrypts it using the private key.

To retrieve the certificate you need to send to your IdP from the [Management Dashboard](${manage_url}), go to **Connections** -> **Enterprise** -> **SAMLP Identity Provider** and click on the **Setup Instructions** button next to the connection.

Navigate to the section titled **Encrypted Assertions** and download the certificate in the format requested by the IdP.

## Auth0 as the SAML Identity Provider

This scenarios apply when Auth0 is the SAML Identity Provider for an application. This is represented in the dashboard by an **Application** that has the SAML Web App Addon enabled.

### Sign the SAML Authentication Responses/Assertions

If Auth0 is the SAML **identity provider**, it can sign responses/assertions with its private key and provide the service provider with the public key/certificate necessary to validate the signature.

To retrieve the certificate you need to send to your IdP from the [Management Dashboard](${manage_url}):

1. Go to **Applications** -> **Settings** -> **Show Advanced Settings**.
2. Scroll to the *Certificates* section, and click **Download Certificate* to obtain the signing certificate you need to provide to your IdP.
3. Send your certificate to the service provider.

Next, you'll need make sure that the SAML assertion is *not* signed (you can sign either the assertion or the response, but not both). Here's how to unsign the SAML Assertion:

1. In the [Management Dashboard](${manage_url}), navigate to **Applications**. Find the Application you're interested in go to **Addons** > SAML2 WEB APP > Settings.
2. By default, `signResponse` is true. As such, uncomment this line and set the value to `false`. Your SAML assertion will no longer be signed.

### Receive Signed SAML Authentication Requests

If Auth0 is the SAML **identity provider**, it can received requests signed with the service provider's private key. Auth0 will then use the service providers' public key/certificate to validate the signature.

To configure signature validation, you'll need to download the service provider's public key and store the value in the `signingCert` key. You can find the `signingCert` field in the [Management Dashboard](${manage_url}) by going to **Applications** > **Addons** > **SAML2 WEB APP** > **Settings**.

The configuration should look like this:

```json
{
  [...], // other settings
  "signingCert": "-----BEGIN PUBLIC KEY-----\nMIGf...bpP/t3\n+JGNGIRMj1hF1rnb6QIDAQAB\n-----END PUBLIC KEY-----\n"
}
```

### Send Encrypted SAML Authentication Assertions

If Auth0 is the SAML **identity provider**, you can use [Rules](/rules) to encrypt the SAML assertions it sends.

You'll need to obtain the certificate and the public key from the service provider. If you only got the certificate, you can derive the public key using `openssl`. Assuming that the certificate file is named `certificate.pem` you can do:

```
openssl x509 -in certificate.pem -pubkey -noout > public_key.pem
```

Once you get the certificate and public key files, you'll need to [turn them into strings](#working-with-certificates-as-strings) to use them in a rule. The rule will look like this:

```js
function (user, context, callback) {
  // this rule sets a specific public key to encrypt the SAML assertion generated from Auth0 
  if (context.clientID === 'THE_CLIENT_ID_OF_THE_APP_WITH_THE_SAML_APP_ADDON') {
	  context.samlConfiguration = (context.samlConfiguration || {});
    context.samlConfiguration.encryptionPublicKey = "-----BEGIN PUBLIC KEY-----\nMIGf...bpP/t3\n+JGNGIRMj1hF1rnb6QIDAQAB\n-----END PUBLIC KEY-----\n";
    context.samlConfiguration.encryptionCert = "-----BEGIN CERTIFICATE-----\nMII...u84\n-----END CERTIFICATE-----\n";
	}
  callback(null, user, context);
}
```

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
