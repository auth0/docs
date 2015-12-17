---
public: false

image: "/media/landings/sso-how-it-works/diagram-single-sign-on.png"
imageAlt: "Single Sign On allows you to login just once."
imagePosition: "center"
budicon: 329
color: "#4E92DF"
title: "How It Works"
---

Single Sign On works by having a **central server**, which all the applications trust. When you login for the first time a cookie gets created on this central server. Then, whenever you try to access a second application, you get redirected to the central server, if you already have a cookie there, you will get redirected directly to the app with a token, without login prompts, which means you're already logged in.

For example, Google implements Single Sign On in its services. Google's central server is _https://accounts.google.com_ . Once you are logged in this server, you will be able to access **Gmail**, **Youtube**, and **Google Docs** without entering your credentials again.

Imagine having the same experience but with your own Enterprise and/or Cloud applications!
