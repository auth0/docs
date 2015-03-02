# Modifying the Connector on Windows

## Launch the AD/LDAP Connector Admin Console 


The Connector Admin screen can be launched by bringing up a browser on the AD/LDAP connector server and connecting to: 

__http://localhost:8357__


## Modify Configuration Settings


Once you have launched the Connector Admin Console  you can modify the LDAP settings:

![](https://cdn.auth0.com/docs/img/adldap-connector-admin-settings.png)

For an explanation of each field, see the "Link to LDAP" section of the [AD/LDAP installation instructions](@@env.BASE_URL@@/connector/install)


Click **Save** when you are done modifying the LDAP configuration.


## Connector Test 


Once you submit the above information, the connector will perform a series of tests:

![](https://cdn.auth0.com/docs/img/adldap-connector-admin-settings-ok.png)

Make sure that all tests are in green.

For an explanation of each test, see the "Troubleshooting" section of the [AD/LDAP installation instructions](@@env.BASE_URL@@/connector/install)



Your AD/LDAP connector will connect using the new directory parameters after changes are made that pass all the tests.  If any test fails, the changes will not be saved.
