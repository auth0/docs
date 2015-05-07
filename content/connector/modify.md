# Modifying the Connector Settings

## Using the configuration file

The `config.json` is the AD/LDAP Connector's configuration file in which the following settings are supported:

 - `AD_HUB`: The Auth0 endpoint to which the connector will connect. This value is maintained by the connector.
 - `CA_CERT`: An authority certificate or array of authority certificates to check the remote host against.
 - `CLIENT_CERT_AUTH`: Specifies if **Client Certificate Authentication** is enabled or not. This value is configured in Auth0 and maintained by the connector.
 - `CONNECTION`: The name of the connection in Auth0 which is linked to this instance of the connector. This value is maintained by the connector.
 - `CONNECTIONS_API_V2_KEY`: An APIv2 token which is used to [get information about the connection in Auth0](https://auth0.com/docs/apiv2#!/connections/get_connections). Set this when you need to troubleshoot the connector, this will compare the local certificate to the one configured in Auth0 and detect a possible mismatch.
 - `FIREWALL_RULE_CREATED`: Will be set to `true` once the Firewall rule has been created for the Kerberos Server (only when Kerberos is enabled).
 - `GROUPS`: Include the user's groups when enriching the profile. Default: `true`.
 - `GROUP_PROPERTY`: The attribute of the group object that will be used when adding the groups to a user. Default: `cn`.
 - `GROUPS_CACHE_SECONDS`: Total time in seconds to cache a user's groups. Default: 600 seconds.
 - `GROUPS_TIMEOUT_SECONDS`: The timeout in seconds for searching all groups a user belongs to. Default: 20 seconds.
 - `KERBEROS_AUTH`: Specifies if **Kerberos Authentication** is enabled or not. This value is configured in Auth0 and maintained by the connector.
 - `LAST_SENT_THUMBPRINT`: Thumbprint of the last certificate which was sent to Auth0.
 - `LDAP_BASE`: Defines the location in the directory from which the LDAP search begins. Eg: `DC=fabrikam,DC=local`
 - `LDAP_BASE_GROUPS`: Defines the location in the directory from wich the LDAP search for groups begins.
 - `LDAP_BIND_PASSWORD`: The password of the LDAP user. This setting will automatically be removed after the connector has been initialized.
 - `LDAP_BIND_CREDENTIALS`: The encrypted password of the LDAP user. This setting will automatically be added after the connector has been initialized.
 - `LDAP_BIND_USER`: The user for which we will bind a connection to LDAP.
 - `LDAP_HEARTBEAT_SECONDS`: The keep-alive in seconds to keep the LDAP connection open.
 - `LDAP_SEARCH_ALL_QUERY`: The LDAP query used to list all users in the LDAP store. Default: `(objectCategory=person)`;
 - `LDAP_SEARCH_GROUPS`: The LDAP query used to find groups in the LDAP store. Default: `(member:1.2.840.113556.1.4.1941:={0})`.
 - `LDAP_SEARCH_QUERY`: The LDAP query used to find users in the LDAP store. Default: `(&(objectCategory=person)(anr={0}))`;
 - `LDAP_USER_BY_NAME`: The LDAP query used to find the user during authentication. This setting allows you to specify which attribute will be considered as the user's username, like the common name, the sAMAccountName, UPN, ... Default: `(sAMAccountName={0})`.
 - `PORT`: The port on which the server will run when Kerberos or Client Certificate Authentication is enabled.
 - `PROVISIONING_TICKET`: The Auth0 provisioning ticket used to communicate with Auth0.
 - `REALM`: The Auth0 realm, eg: `urn:auth0:fabrikam`. This value is maintained by the connector.
 - `SERVER_URL`: The default connector URL will be `server-name:port`, but this setting allows you to overwrite this (eg: `connector.mycompany.com`).
 - `SESSION_SECRET`: The session secret used to encrypt the session cookie.
 - `SITE_NAME`: When Client Certificate Authentication is enabled, but not possible the AD Connector will show a fallback login page. This setting allows you to specify the title that will show on top of the page. Default: name of the AD connection.
 - `SSL_KEY_PASSWORD`: The password for the SSL certificate.
 - `SSL_PFX`: Base64 encoded certificate to use for SSL.
 - `TENANT_SIGNING_KEY`: Your Auth0 tenant used to verify JWTs (eg: when a user authenticates, we verify that the authentication request comes from Auth0 using a JWT).
 - `WSFED_ISSUER`: The issuer being set in the WS-Federation responses. If a connection is configured with email domains, the first email domain configured in Auth0 will be used as issuer. Default: `urn:auth0`.

## Using the Admin Console

### Launch the AD/LDAP Connector Admin Console 

The Connector Admin screen can be launched by bringing up a browser on the AD/LDAP connector server and connecting to: 

__http://localhost:8357__

### Modify Configuration Settings

Once you have launched the Connector Admin Console  you can modify the LDAP settings:

![](https://cdn.auth0.com/docs/img/adldap-connector-admin-settings.png)

For an explanation of each field, see the "Link to LDAP" section of the [AD/LDAP installation instructions](@@env.BASE_URL@@/connector/install)

Click **Save** when you are done modifying the LDAP configuration.

### Connector Test 

Once you submit the above information, the connector will perform a series of tests:

![](https://cdn.auth0.com/docs/img/adldap-connector-admin-settings-ok.png)

Make sure that all tests are in green.

For an explanation of each test, see the "Troubleshooting" section of the [AD/LDAP installation instructions](@@env.BASE_URL@@/connector/install)

Your AD/LDAP connector will connect using the new directory parameters after changes are made that pass all the tests.  If any test fails, the changes will not be saved.
