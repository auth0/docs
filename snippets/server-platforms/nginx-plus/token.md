```
# openid_connect.server_conf
location = /_token {
    internal;
    ...
    proxy_set_header    Content-Type "application/x-www-form-urlencoded"
    proxy_set_header    Accept-Encoding "gzip"          # this is required
    ...
}
```
