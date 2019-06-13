---
description: How to setup authentication using client certificates.
topics:
  - connector
  - ad/ldap
  - client-certificates
contentType: how-to
useCase:
  - add-login
  - customize-connections
  - add-idp
---

# Client Certificate Support

In addition to Kerberos, the [AD/LDAP Connector](/connector) also allows users to authenticate using **client certificates**. With this, users authenticate with a certificate installed on their machine or device.

## Configure the AD/LDAP connection

To activate client certificates on an AD/LDAP connection:

1. Go to [Connections > Enterprise](${manage_url}/#/connections/enterprise) and select your AD/LDAP connection.
2. Toggle the **Use client SSL certificate authentication** option in the settings.
3. Provide IP address ranges in the **IP Ranges** field. Only users coming from the given IP ranges are prompted to authenticate using client certificates. Users from different IP ranges are prompted to login with the username/password login form.

![](/media/articles/connector/client-certs/connector-client-cert-enable.png)

## Configure the certificates

Once the AD/LDAP connection has been configured in Auth0, you'll need to configure the certificates in the AD/LDAP Connector. Supporting client certificates will require the following:

 1. An __SSL certificate__ for the **Front Facing Url**, because the interaction between the end user and the Connector will need to happen over HTTPS.
 2. One or more __CA certificates__.
 3. A __Client Certificate__ signed by the CA for each user that needs to authenticate using Client Certificates.

Before uploading certificates to the AD/LDAP connector, convert X509 certificates to Base64. To do this you can use a simple online tool like [this one](https://www.base64decode.org/), or you can use [Certutil.exe](https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/certutil#BKMK_encode) on Windows Server.

The SSL certificate and the CA certificate can be uploaded in the AD/LDAP Connector:

![](/media/articles/connector/client-certs/connector-client-cert-config.png)

For testing purposes you can generate your own self-signed CA and Client Certificates using **makecert.exe** on Windows, which is part of the Windows SDK:

```
SET ClientCertificateName=jon
SET RootCertificateName=FabrikamRootCA
"C:\Program Files (x86)\Microsoft SDKs\Windows\v7.1A\Bin\makecert.exe" -sky exchange -r -n "CN=%RootCertificateName%" -pe -a sha1 -len 2048 -ss My "%RootCertificateName%.cer"
"C:\Program Files (x86)\Microsoft SDKs\Windows\v7.1A\Bin\makecert.exe" -n "CN=%ClientCertificateName%" -pe -sky exchange -m 96 -ss My -in "%RootCertificateName%" -is my -a sha1
```

The important part here is that the Client Certificate's subject must be in the format of `CN=AD_USERNAME`, eg: `CN=jon`.

## End User

In an application we might now start the sign in flow using an AD/LDAP Connection:

```
    auth.signin({
      popup: true,
      connection: 'FabrikamAD',
      scope: 'openid name email'
    }, onLoginSuccess, onLoginFailed);
```

If the user's IP address falls within the configured IP Range, they'll be prompted to authenticate with a Client Certificate:

![Choose Client Certificate](/media/articles/connector/client-certs/connector-client-cert-choose.png)

After choosing the certificate the AD/LDAP Connector will validate it and the user will be logged in:

![Signed In using Client Certificates](/media/articles/connector/client-certs/connector-client-cert-loggedin.png)
