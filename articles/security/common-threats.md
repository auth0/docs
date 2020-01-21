---
description: Describes different types of cyber attacks and what steps can be taken to prevent them.
topics:
  - security
  - security-bulletins
  - prevention
  - common-threats
  - MitM
  - CSRF
  - XSRF
  - replay
contentType:
  - reference
useCase:
  - development
---

# Common Threats and How to Prevent Them

## Man-in-the-Middle (MitM) attacks

One type of threat is a Man-in-the-middle attack, sometimes called a bucket brigade attack. With this attack the attacker gets between two parties, where each party thinks they are interacting over a private connection, but it is actually being controlled by the third-party attacker. For this type of attack to succeed the attacker must create mutual authentication between both parties.

Usually MitM attacks involve the attacker using a WiFi router to intercept a user's communication. The user connects to the attacker's router then visits a website and logs in with their confidential credentials. The attacker saves that user's login credentials for which they can then use to impersonate the user.

Some MitM attacks can also modify the data transmitted between the application and the server. Attacks can occur from new PC trial and preinstalled software, software update tools, and other software vulnerabilities. In a worst case scenario this could result in remote code execution, backdooring the system, installing malware, and so on. This could also lead to the compromise of other network assets.

### Preventing MitM attacks

To help defend against this type of attack it is important to use strong encryption and authentication between the application and the server. Using encryption the server authenticates the application's request by presenting a digital certificate, and only then can the connection be established.  For example, HTTPS uses the secure sockets layer (SSL) capability of the browser to mask web traffic. To decrypt HTTPS, a man-in-the-middle attacker would have to obtain the keys used to encrypt the network traffic.

With the configuration of TLS on your servers we suggest using the [Mozilla OpSec recommendations](https://wiki.mozilla.org/Security/Server_Side_TLS) which use TLSv1.2. Mozilla also provides an [SSL Configuration Generator](https://mozilla.github.io/server-side-tls/ssl-config-generator/), to use this first choose which platform your server is running and then choose the most modern configuration based on what your application base can support. The more modern configurations provide stronger ciphers to help prevent attacks.

## Replay attacks

Replay attacks allow attackers to:

* Gain access to a network and information which would not have been easily accessible 
* Complete a duplicate transaction

These are attacks on the security protocol using replays of data transmission from a different sender into the intended receiving system. The attacks fool the participants into believing they have successfully completed the data transmission. 

A replay attack is also known as a playback attack.

### Preventing Replay attacks

Replay attacks can be avoided by using session tokens. However, if these credentials are stolen from local storage (like during an XSS attack), there are ways to prevent someone from holding on to a valid token forever:

* Set a short expiration time for tokens
* Provide a way to blacklist tokens that have been used (and possibly even the users)
* Use one-time passwords

The [JWT](/tokens/concepts/jwts) spec provides the `jti` field as a way to prevent replay attacks. Though Auth0 tokens currently don't return the `jti`, you can blacklist using the `jti` to prevent a token being used more than a specified number of times. In this way, you are implementing something similar to a <dfn data-key="nonce">nonce</dfn> (think of the token's signature as the nonce). If a token gets stolen or it gets used more than the specified number of times, it should be blacklisted. This prevents a valid token from being used maliciously. Once the token expires, the attacker will no longer be able to impersonate the user.

You can also avoid replay attacks by using one-time passwords. With Auth0, you can use <dfn data-key="passwordless">[Passwordless Authentication](/passwordless)</dfn>, which relies on single-use codes and email links instead of traditional passwords. Auth0 also provides <dfn data-key="multifactor-authentication">multi-factor authentication (MFA)</dfn> which uses one-time passwords as a second-factor authentication which can be sent via push notifications and texts.

## Cross-site Request Forgery

A Cross-site Request Forgery (CSRF or XSRF) attack occurs when a malicious program causes a user's web browser to perform an unwanted action on a trusted site on which the user is currently authenticated. This type of attack specifically targets state-changing requests to initiate a type of action instead of getting user data because the attacker has no way to see the response of the forged request.

### Preventing CSRF attacks

One way to verify the requests that are being sent is to utilize the OAuth 2.0 protocol `state` parameter to authenticate the response. For more information, see [State Parameter](/protocols/oauth-state).
