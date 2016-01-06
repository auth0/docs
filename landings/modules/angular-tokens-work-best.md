---
public: false

image: "/media/landings/angular-tokens-work-best/angular-tokens-work-best.png"
imageAlt: "Tokens offer a better way to add authentication to your AngularJS application"
imagePosition: "center"
budicon: 83
color: "#68BF95"
title: "Tokens Work Best for Single Page Apps"
---
AngularJS applications work differently than traditional round-trip applications. Like other Single Page App (SPA) frameworks, AngularJS apps typically rely on data APIs which are accessed by sending XHR requests from the client to the server. 

Adding user authentication to AngularJS apps is also different. Traditional applications use session-based authentication which works by keeping the user’s authentication state saved in memory on the server, but this [doesn’t work so well for SPAs](https://auth0.com/blog/2015/09/28/5-steps-to-add-modern-authentication-to-legacy-apps-using-jwts/).

Tokens offer a better way to add authentication to your AngularJS application. Several different types of authentication tokens can work, but [JSON Web Tokens](jwt.io/introduction) are the best solution.