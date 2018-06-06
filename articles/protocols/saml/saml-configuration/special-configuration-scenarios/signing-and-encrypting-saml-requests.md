---
description: Signing and encrypting SAML requests
  tags:
    - saml
    - sso
---

# Special Configuration Scenarios: Signing and Encrypting SAML Requests

To increase the security of your transactions, you can sign or encrypt both your requests and your responses.

## Sign the SAML Authentication Request

If Auth0 is the SAML **service provider**, you can sign the authentication request Auth0 sends to the IdP as follows:

1. For the Connection in which you're interested, navigate to **Enterprise** -> **SAMLP Identity Provider** -> **Settings**.
2. Enable the **Sign Request** toggle.
3. Download the certificate beneath the **Sign Request** toggle and provide it to the IdP so that it can validate the signature.

### Enable/Disable Deflate Encoding

By default, SAML authentication requests are sent via HTTP-Redirect and use deflate encoding, which puts the signature in a query parameter.

To turn off deflate encoding, you can make a [PATCH call to the Management API's Update a Connection endpoint](/api/management/v2#!/Connections/patch_connections_by_id) and set the `deflate` option to `false`.

```har
{
	"method": "PATCH",
	"url": "https://${account.namespace}/api/v2/connections/YOUR_CONNECTION_ID",
	"httpVersion": "HTTP/1.1",
	"cookies": [],
	"headers": [{
		"name": "Authorization",
		"value": "Bearer MGMT_API_ACCESS_TOKEN"
	}],
	"queryString": [],
	"postData": {
		"mimeType": "application/json",
		"text": "{ \"name\": \"CONNECTION_NAME\", \"options\": \"{\"validation\": \"object\", \"passwordPolicy\": \"\", \"password_history\": \"object\", \"password_no_personal_info\": \"object\", \"password_dictionary\": \"object\", \"deflate\": \"false\",}\" }"
	},
	"headersSize": -1,
	"bodySize": -1,
	"comment": ""
}
```

## Sign the SAML Authentication Responses/Assertions

If Auth0 is the SAML **identity provider**, it can sign responses/assertions with its private key and provide the service provider with the public key/certificate necessary to validate the signature.

To retrieve the certificate you need to send to your IdP from the [Management Dashboard](${manage_url}):

1. Go to **Applications** -> **Settings** -> **Show Advanced Settings**.
2. Scroll to the *Certificates* section, and click **Download Certificate* to obtain the signing certificate you need to provide to your IdP.
3. Send your certificate to the service provider.

Next, you'll need make sure that the SAML assertion is *not* signed (you can sign either the assertion or the response, but not both). Here's how to unsign the SAML Assertion:

1. In the [Management Dashboard](${manage_url}), navigate to **Applications**. Find the Application you're interested in go to **Addons** > SAML2 WEB APP > Settings.
2. By default, `signResponse` is true. As such, uncomment this line and set the value to `false`. Your SAML assertion will no longer be signed.

## Receive Signed SAML Authentication Requests

If Auth0 is the SAML **identity provider**, it can received requests signed with the service provider's private key. Auth0 will then use the service providers' public key/certificate to validate the signature.

To configure signature validation, you'll need to download the service provider's public key and store the value in the `signingCert` key. You can find the `signingCert` field in the [Management Dashboard](${manage_url}) by going to **Applications** > **Addons** > **SAML2 WEB APP** > **Settings**.

The configuration should look like this:

```json
{
  [...], // other settings
  "signingCert": "-----BEGIN PUBLIC KEY-----\nMIGf...bpP/t3\n+JGNGIRMj1hF1rnb6QIDAQAB\n-----END PUBLIC KEY-----\n"
}
```

## Receive Signed SAML Authentication Responses

If Auth0 is the SAML **service provider**, all SAML responses from your identity provider should be signed to indicate it hasn't been tampered with by an unauthorized third-party.

You will then need to configure Auth0 to validate the responses' signatures by:

* Obtaining a signing certificate from the IdP
* Loading the certificate from the IdP into your Auth0 Connection (in the Management Dashboard, go to the **Upload Certificate** section for your Connection by navigating to **Connections** -> **Enterprise** -> **SAMLP Identity Provider** -> **Settings**)

Auth0 can accept a signed response for the assertion, the response, or both.

## Send Encrypted SAML Authentication Assertions

If Auth0 is the SAML **identity provider**, you can use [Rules](/rules) to encrypt the SAML assertions it sends.

You'll need to obtain the public key/certificate from the service provider.

Here is a sample snippet of Rules code.

```js
function (user, context, callback) {

  context.samlConfiguration = (context.samlConfiguration || {});
  context.samlConfiguration.encryptionPublicKey = "-----BEGIN PUBLIC KEY-----\nMIGf...bpP/t3\n+JGNGIRMj1hF1rnb6QIDAQAB\n-----END PUBLIC KEY-----\n";
  context.samlConfiguration.encryptionCert = "-----BEGIN CERTIFICATE-----\nMII...u84\n-----END CERTIFICATE-----\n";

  callback(null, user, context);
}
```

## Receive Encrypted SAML Authentication Assertions

If Auth0 is the SAML **service provider**, it may need to receive encrypted assertions from an identity provider. To do this, you must provide Auth0's public key and certificate to the IdP. The IdP encrypts the SAML assertion using the public key and sends it to Auth0, which decrypts it using the private key.

To retrieve the certificate you need to send to your IdP from the [Management Dashboard](${manage_url}), go to **Connections** -> **Enterprise** -> **SAMLP Identity Provider** and click on the **Setup Instructions** button next to the connection.

Navigate to the section titled **Encrypted Assertions** and download the certificate in the format requested by the IdP.
