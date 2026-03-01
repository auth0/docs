---
name: openid_connection_configuration.conf
language: 
---
    
```
map $host $oidc_logout_redirect {
    default "https://${account.namespace}/v2/logout";
}
```
