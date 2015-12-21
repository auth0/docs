---
public: false
budicon: 640
image: "/media/landings/rtokens-security-considerations/rtokens-security-considerations.png"
imageAlt: "It is important to keep Refresh Tokens secure"
imagePosition: "center"
color: "#4E92DF"
title: "Security Considerations"
---
**Refresh Tokens** are long-lived. This means when a client gets one from a server, this token must be stored securely to keep it from being used by potential attackers, for this reason it is not safe to store them in the browser. If a **Refresh Token** is leaked, it may be used to obtain new **Access Tokens** (and access protected resources) until it is either blacklisted or it expires (which may take a long time). **Refresh Tokens** must be issued to a single authenticated client to prevent use of leaked tokens by other parties. **Access Tokens** must also be kept secret, but due to its shorter life, security considerations are less critical.