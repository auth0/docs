---
public: false

image: "/media/landings/rtokens-how-they-work/rtokens-how-they-work.png"
imageAlt: "Refresh tokens are used to renew Access Tokens"
imagePosition: "center"
imageExtraClass: "code"
budicon: 329
color: "#68BF95"
title: "How Refresh Tokens work"
---
Whenever an **Access Token** is required to access a protected resource, a client may use a **Refresh Token** to get a new **Access Token** issued by the _Authentication Server_. Although **Access Tokens** can be renewed at any time using **Refresh Tokens**, they should be renewed when old ones have expired, or when getting access to a new resource for the first time.
**Refresh Tokens** can also expire but are rather long-lived. They are usually subject to strict storage requirements to ensure they are not leaked. Nevertheless, they can be blacklisted by the authorization server.
