---
description: How to configure the Connector for OpenLDAP and other directories that are not AD.
---

# Considerations for OpenLDAP and non-AD directories

The Connector comes by default highly optimized for **Active Directory**. To configure it any other LDAP directories (e.g. OpenLDAP) you will have to customize these settings in the **config.json** file:

```
  "LDAP_USER_BY_NAME": "(cn={0})",
  "LDAP_SEARCH_QUERY": "(&(objectClass=person)(cn={0}))",
  "LDAP_SEARCH_ALL_QUERY": "(objectClass=person)",
```

In some cases, instead of **cn** it might be better to use **uid**.

## Example: OpenDJ

With the __OpenDJ Control Panel__ it's possible to retrieve the list of attributes for each user. This list can help you decide which attribute will be used as the username when authenticating with Auth0.

![](/media/articles/connector/considerations-non-ad/opendj-attributes.png)

In this example John's `cn` is **johndoe** and the `mail` field is set to **johndoe@contoso.com**. If your organization wants users to authenticate using their username (`cn`) you can set the `LDAP_USER_BY_NAME` setting to `(cn={0})`, but if users should authenticate using their email address you should set it to `(mail={0})`.