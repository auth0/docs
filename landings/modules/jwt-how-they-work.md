---
public: false
image: "/media/landings/jwt-how-it-works/jwt-how-it-works.png"
imageAlt: "How JSON Web Tokens work"
imageExtraClass: "code"
imagePosition: "center"
budicon: 329
color: "#4E92DF"
title: "How JSON Web Tokens work?"
---

In authentication, when the user successfully logs in using his credentials, a JSON Web Token will be returned and must be saved locally (typically in local storage, but cookies can be also used), instead of the traditional approach of creating a session in the server and returning a cookie.

Whenever the user wants to access a protected route, it should send the JWT, typically in the **Authorization** header using the **Bearer** schema. Therefore the content of the header should look like the following.

`Authorization: Bearer <token>`

This is a stateless authentication mechanism as the user state is never saved in the server memory.
The server's protected routes will check for a valid JWT in the Authorization header, and if there is, the user will be allowed. As JWTs are self-contained, all the necessary information is there, reducing the need of going back and forward to the database.

This allows to fully rely on data APIs that are stateless and even make requests to downstream services. It doesn't matter which domains are serving your APIs, as Cross-Origin Resource Sharing (CORS) won't be an issue as it doesn't use cookies.