# Client Certificate Support

Besides Kerberos the AD/LDAP Connector also enables users to authenticate using client certificates where users can have a certificate installed on their machine or device and use that certificate to authenticate (instead of a username and password).

## Configuration

To activate Client Certificates on an LDAP connection, simply enable the option in the dashboard:

![](/media/articles/connector/client-certs/connector-client-cert-enable.png)

Once this has been configured in Auth0 you'll need to configure the certificates in the AD/LDAP Connector. Supporting Client Certificates will require the following:

 1. An SSL certificate for the **Front Facing Url**, because the interaction between the end user and the connector will need to happen over HTTPS.
 2. One or more CA certificates
 3. A Client Certificate signed by the CA for each user that needs to authenticate using Client Certificates

The SSL certificate and the CA certificate can be uploaded

![](/media/articles/connector/client-certs/connector-client-cert-config.png)


## Flow

Depending on the location of the user the authentication flow will be different when Kerberos is enabled. Let's take Fabrikam as an example. Since Fabrikam uses the SaaS version of Auth0 they configured their Public IP Address (`24.12.34.56/32`) in the connection.

Users connecting from within the building will all originate from `24.12.34.56` (as configured on the connection). When they authenticate, the users can follow the Kerberos flow and have a SSO experience.

**Note:** For this to work, the network must allow the users to connect to the AD/LDAP Connector on the port configured in the `config.json` file.

![](/media/articles/connector/kerberos/connector-kerberos-flow.png)

On the other hand, when users are not in the corporate network (eg: at a customer) they won't be able to access the AD/LDAP Connector directly. The users will need to enter their username/password and Auth0 will validate these credentials with the AD/LDAP Connector (which will in turn talk to Active Directory).

![](/media/articles/connector/kerberos/connector-credentials-flow.png)

## End-user Experience

Users on a domain-joined machine, coming from the configured IP addres range:

![Login Kerberos](/media/articles/connector/kerberos/office-365-idp-login-kerberos.gif)

Users that are not in the corporate network will need to enter their AD credentials:

![Login External](/media/articles/connector/kerberos/office-365-idp-login-external.gif)

