# Modifying the Connector Settings

## Using the Admin Console

### Launch the AD/LDAP Connector Admin Console

The Connector Admin screen can be launched by bringing up a browser on the AD/LDAP connector server and connecting to: __http://localhost:8357__

### Modify Configuration Settings

Once you have launched the Connector Admin Console  you can modify the LDAP settings:

![](https://cdn.auth0.com/docs/img/connector-configuration.png)

Click **Save** when you are done modifying the LDAP configuration.

### Connector Test

Once you submit the above information, the connector will perform a series of tests:

![](https://cdn.auth0.com/docs/img/connector-configuration-saved.png)

Make sure that all tests are in green.

For an explanation of each test, see the "Troubleshooting" section of the [AD/LDAP installation instructions](/connector/install)

Your AD/LDAP connector will connect using the new directory parameters after changes are made that pass all the tests.  If any test fails, the changes will not be saved.

## Profile Mapper

To modify the mapping of profile attributes from AD/LDAP attributes to attributes in the Auth0 user profile, launch the Connector Admin Console as described above and click on **"Profile Mapper"**

This displays an editor screen with a short description at the top.  The body of   the editor screen displays a javascript function which maps attributes from a source directory service, represented by the `raw_data` variable, into a variable that gets returned to populate the Auth0 User Profile.  The first part of the function instantiates a variable called "profile" and has a mapping for the core portion of the Auth0 User Profile.  Additional attributes can be set below that using syntax of the form:

```
profile['department'] = raw_data['companydept'];
```

where "department" is the name of the attribute in the Auth0 user profile and "companydept" is the name of the attribute in the source directory service, AD.

## Import / Export

The Import/Export feature of the Connector Admin Console can be used to export the configuration of the AD/LDAP Connector or import a previously exported configuration.  This is useful for deployments with more than one node of the AD/LDAP connector deployed for high availability.  The configuration can be set up and tested on one node, and then exported from there and imported into the second and subsequent nodes.

## Troubleshooting

The Troubleshooting feature of the Connector Admin Console can be used to detect issues with the environment that may prevent the AD/LDAP connector from working properly.  It will check things like network connectivity, clock skew, etc.

This feature will also display the contents of the AD/LDAP connector log file.

## Search
The Search feature of the Connector Admin Console is designed to allow the testing of search queries used by the AD/LDAP connector against the target AD/LDAP directory.  This can be an aid in debugging search filters used in the AD/LDAP connector configuration file, `config.json`, (see below).

## Update
The Update feature of the Connector Admin Console provides a convenient way to update the AD/LDAP connector to a new version.

## Using the configuration file

The `config.json` file is the AD/LDAP Connector's configuration file.  It can be edited to make changes that are not possible via the AD/LDAP Connector Admin Console. The file is located in the install directory for the AD/LDAP Connector. The following settings are supported in this file:

 - `AD_HUB`: The Auth0 endpoint to which the connector will connect. This value is maintained by the connector.
 - `CA_CERT`: An authority certificate or array of authority certificates to check the remote host against.
 - `CLIENT_CERT_AUTH`: Specifies if **Client Certificate Authentication** is enabled or not. This value is configured in Auth0 and maintained by the connector.
 - `CONNECTION`: The name of the connection in Auth0 which is linked to this instance of the connector. This value is maintained by the connector.
 - `CONNECTIONS_API_V2_KEY`: An APIv2 token which is used to [get information about the connection in Auth0](/apiv2#!/connections/get_connections). Set this when you need to troubleshoot the connector, this will compare the local certificate to the one configured in Auth0 and detect a possible mismatch.
 - `FIREWALL_RULE_CREATED`: Will be set to `true` once the Firewall rule has been created for the Kerberos Server (only when Kerberos is enabled).
 - `GROUPS`: Include the user's groups when enriching the profile. Default: `true`.
 - `GROUP_PROPERTY`: The attribute of the group object that will be used when adding the groups to a user. Default: `cn`.
 - `GROUPS_CACHE_SECONDS`: Total time in seconds to cache a user's groups. Default: 600 seconds.
 - `GROUPS_TIMEOUT_SECONDS`: The timeout in seconds for searching all groups a user belongs to. Default: 20 seconds.
 - `HTTP_PROXY`: The URL of a proxy server if one is required to connect from the AD/LDAP Connector to Auth0.
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
 - `LDAP_URL`: The LDAP connection string, eg: `ldap://fabrikam-dc.fabrikam.local`
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
