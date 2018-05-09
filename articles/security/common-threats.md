---
description: This page describes different types of cyber attacks and what steps can be taken to prevent them.
---

# Common Threats and How to Prevent Them

## Man-in-the-Middle (MitM) Attacks

One type of threat is a Man-in-the-middle attack, sometimes called a bucket brigade attack. With this attack the attacker gets between two parties, where each party thinks they are interacting over a private connection, but it is actually being controlled by the third-party attacker. For this type of attack to succeed the attacker must create mutual authentication between both parties.

Usually MitM attacks involve the attacker using a WiFi router to intercept a user's communication. The user connects to the attacker's router then visits a website and logs in with their confidential credentials. The attacker saves that user's login credentials for which they can then use to impersonate the user.

Some MitM attacks can also modify the data transmitted between the application and the server. Attacks can occur from new PC trial and preinstalled software, software update tools, and other software vulnerabilities. In a worst case scenario this could result in remote code execution, backdooring the system, installing malware, and so on. This could also lead to the compromise of other network assets.

### Preventing MitM attacks

To help defend against this type of attack it is important to use strong encryption and authentication between the application and the server. Using encryption the server authenticates the application's request by presenting a digital certificate, and only then can the connection be established.  For example, HTTPS uses the secure sockets layer (SSL) capability of the browser to mask web traffic. To decrypt HTTPS, a man-in-the-middle attacker would have to obtain the keys used to encrypt the network traffic.

With the configuration of TLS on your servers we suggest using the [Mozilla OpSec recommendations](https://wiki.mozilla.org/Security/Server_Side_TLS) which use TLSv1.2. Mozilla also provides an [SSL Configuration Generator](https://mozilla.github.io/server-side-tls/ssl-config-generator/), to use this first choose which platform your server is running and then choose the most modern configuration based on what your application base can support. The more modern configurations provide stronger ciphers to help prevent attacks.

## Replay Attacks

Another type of attacks is a replay attacks, also sometimes called a playback attack. With this type of network attack an attacker spies on a data exchange such as a login authentication, then the attacker takes this information to the receiver. This does not necessarily happen in real-time. With a replay attack the attacker gives the proof of identity by impersonating a user with stolen credentials.

### Preventing Replay Attacks

Replay attacks are usually avoided by using session tokens. But if these credentials are stolen from local storage (such as from an XSS attack), there are alternatives that you could use to avoid someone having infinite tokens:

1. Set expirations for tokens
2. Provide a way to blacklist tokens that have been used (perhaps even a user)

The [JWT](/jwt) spec provides the `jti` field as a way to prevent replay attacks. Though Auth0 tokens don't currently don't return a jti, you can blacklist a jti to prevent a token being used more than X times. In this way you are kind of implementing a nonce (think of the token's signature as the nonce). If a token gets stolen, it should be blacklisted (or the nth token that has been issued after it) and wait for it to expire. Once it expires the attacker will no longer be able to impersonate the user.

Replay attacks can also be avoided by using one-time passwords. With Auth0 you can use [Passwordless Authentication](/passwordless) and only use one-time passwords instead of traditional passwords. Auth0 also provides [Multifactor Authentication](multifactor-authentication) which uses one-time passwords as a 2nd factor authentication which can be sent via push notifications, texts and more.

## Cross-site Request Forgery (XSRF or CSRF)

This is a type of attack which occurs when a malicious program causes a user's web browser to perform an unwanted action on a trusted site that the user is currently authenticated. This type of attack specifically target state-changing requests to initiate a type of action instead of getting user data because the attacker has no way to see the response of the forged request.

### Preventing Cross-site Request Forgery (XSRF or CSRF)

One way to verify the requests that are being sent is to utilize the state parameter to authenticate the response. [Click here to learn more about using the state parameter.](/protocols/oauth-state)
