---
description: How to setup authentication using client certificates.
---

# Client Certificate Support

In addition to Kerberos, the AD/LDAP Connector also allows users to authenticate using __client certificates__. With this, users authenticate with a certificate installed on their machine or device.

## Configuration

To activate Client Certificates on an LDAP connection, simply enable the option in the dashboard:

![](/media/articles/connector/client-certs/connector-client-cert-enable.png)

> Note that you'll also need to configure the IP Ranges. Only users coming from these IP Ranges will be prompted to authenticate using Client Certificates. Users that originate from different IP Ranges will be presented with the traditional username/password login form.

Once this has been configured in Auth0 you'll need to configure the certificates in the AD/LDAP Connector. Supporting Client Certificates will require the following:

 1. An __SSL certificate__ for the **Front Facing Url**, because the interaction between the end user and the Connector will need to happen over HTTPS.
 2. One or more __CA certificates__.
 3. A __Client Certificate__ signed by the CA for each user that needs to authenticate using Client Certificates.

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
