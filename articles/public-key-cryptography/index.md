---
url: /crypto
---

## Public-key cryptography

With public-key cryptography, there is a pair of keys that are mathematically related to each other: a private key and a public key. The public key is known to everyone and is often linked to an organization or a person, while the private or secret key is known only to its respective owner.

> The linkage of a public key with its respective owner is often signed by a certificate authority to create a certificate. This is an electronic document used to prove ownership of a public key.

::: panel-info Certificates
The linkage of a public key with its respective owner is often signed by a certificate authority to create a certificate. This is an electronic document used to prove ownership of a public key.
:::

These keypairs can be used in a number of innovative ways.  The most common uses are for digitally signing and encrypting messages.  In both cases, an algorithm takes as input a message and one of the keys from the keypair and outputs a result.  The result can then be used by an entity that has the corresponding key from the pair of keys. 

### Signing with a digital signature
This is the electronic equivalent of a handwritten signature. When the sender includes a digital signature to a message, the recipient can validate the sender's identity and that the message has not been tampered with since it was signed.

For a digital signature, the sender signs the message with the private key and the recipient validates the signature with the public key.  Only the holder of the private key can sign the message.

![](media/articles/public-key-cryptography/signing-messages.png)

### Encryption of messages
A sender can encrypt a message when sending it. This converts the message from a readable format, known as clear text (or plain text), to an encoded format, known as ciphertext. The recipient can decode the message upon receipt to convert it back to its earlier, readable format. This prevents the message from being read enroute.

For encrypted messages, the sender encodes the message using the intended recipient’s public key and the recipient then decodes the message using its private key. Only the holder of the private key can decode and view the message.

![](media/articles/public-key-cryptography/encrypting-messages.png)

---

## Auth0 use of public-key cryptography

