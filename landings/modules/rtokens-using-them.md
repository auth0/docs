---
public: false
budicon: 546
color: "#EB5424"
title: "Using Refresh Tokens"
---

This is a simple example of how **Refresh Tokens** can be obtained and used. Using a simple **CURL command** as the client.

The OAuth2 token endpoint could be (**/oauth/token**), which handles issuing of all types of grants (access and refresh tokens).

Assuming there is a user '_test_' with password '_test_' and a client '_testclient_' with a client secret '_secret_', a sample request of a new **Access Token/Refresh Token** pair could be the following:

```
$ curl -X POST -H 'Authorization: Basic dGVzdGNsaWVudDpzZWNyZXQ=' -d 'grant_type=password&username=test&password=test' localhost:3000/oauth/token

{
    "token_type":"bearer",
    "access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiVlx1MDAxNcKbwoNUwoonbFPCu8KhwrYiLCJpYXQiOjE0NDQyNjI1NDMsImV4cCI6MTQ0NDI2MjU2M30.MldruS1PvZaRZIJR4legQaauQ3_DYKxxP2rFnD37Ip4",
    "expires_in":20,
    "refresh_token":"fdb8fdbecf1d03ce5e6125c067733c0d51de209c"
}
```

The authorization header contains the client id and secret encoded as BASE64 (_testclient:secret_).

When the **Access Token** expires, you can use the **Refresh Token** to get a new **Access Token** by using the token endpoint as shown below:

```
curl -X POST -H 'Authorization: Basic dGVzdGNsaWVudDpzZWNyZXQ=' -d 'refresh_token=fdb8fdbecf1d03ce5e6125c067733c0d51de209c&grant_type=refresh_token' localhost:3000/oauth/token

{
    "token_type":"bearer",
    "access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiVlx1MDAxNcKbwoNUwoonbFPCu8KhwrYiLCJpYXQiOjE0NDQyNjI4NjYsImV4cCI6MTQ0NDI2Mjg4Nn0.Dww7TC-d0teDAgsmKHw7bhF2THNichsE6rVJq9xu_2s",
    "expires_in":20,
    "refresh_token":"7fd15938c823cf58e78019bea2af142f9449696a"
}
```

> Notice in the above command, that the _grant_type_ is the **Refresh Token** and not the user/password pair. As the result of this command a new **Access Token** is returned.