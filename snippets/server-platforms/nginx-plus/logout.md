```
# openid_connect_configuration.conf
map $host $oidc_logout_redirect {
    default "https://${account.namespace}/v2/logout";
}
```
