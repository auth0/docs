---
public: false

image: "/media/landings/jwt-when-to-use/jwt-when-to-use.png"
imageAlt: "JSON Web Tokens are useful for Authentication and Information Exchange"
imagePosition: "center"
budicon: 288
color: "#EACA2C"
title: "When should you use JSON Web Tokens?"
---

These are some scenarios where JSON Web Tokens are useful:

- **Authentication**: This is the typical scenario for using JWT, once the user is logged in, each subsequent request will include the JWT, allowing the user to access routes, services, and resources that are permitted with that token. Single Sign On is a feature that widely uses JWT nowadays, because of its small overhead and its ability to be easily used among systems of different domains.

- **Information Exchange**: JWTs are a good way of securely transmitting information between parties, because as they can be signed, for example using a public/private key pair, you can be sure that the sender is who he says he is. Additionally, as the signature is calculated using the header and the payload, you can also verify that the content hasn't changed.
