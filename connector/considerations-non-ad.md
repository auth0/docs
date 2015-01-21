# OpenLDAP and non-AD Considerations

The connector comes by default highly optimized for **Active Directory**. To configure for OpenLDAP or other LDAPs directories you will have to add these settings in the **config.json** file:

```
  "LDAP_USER_BY_NAME": "(cn={0})",
  "LDAP_SEARCH_QUERY": "(&(objectClass=person)(cn={0}))",
  "LDAP_SEARCH_ALL_QUERY": "(objectClass=person)",
```

In some cases instead of **cn** it might be better to use **uid**.
