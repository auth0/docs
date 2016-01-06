---
public: false

image: "/media/landings/mfa-options/mfa-options.png"
imageAlt: "Multifactor Authentication (MFA) options."
imagePosition: "center"
budicon: 288
color: "#44C7F4"
title: "Multifactor Options"
---

Some of the most used multifactor options are:

* **Time-based One-Time Password (TOTP)**: It generates a one-time password using a shared secret key and the current time. These passwords are short-lived (between 30 to 60 seconds), and require that the server and device clocks to be synchronized. For example, Google Authenticator. 

* **SMS verification**: This method uses one thing that the user always carries with himself, his mobile phone. Therefore, when the user attempt to log in, an SMS will be sent to the registered phone number with a one-time code that will be used to validate his identity. One example of this, is Duo.

* **Hardware token**: These are small devices that may be connected (such as USB dongles), or disconnected (devices with a built-in screen). They hold the same secret shared key as the server, and use it to generate the password. For example, Yubikey.
