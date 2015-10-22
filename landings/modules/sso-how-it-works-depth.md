---
sitemap: false

image: "/media/landings/sso-how-it-works/diagram-single-sign-on.png"
imageAlt: "Single Sign On allows you to login just once."
imagePosition: "center"
budicon: 329
color: "#4E92DF"
title: "How It Works"
---

Single Sign On works by having a **central service**, which all the applications trust. When you login for the first time a cookie gets created on this central service. Then, whenever you try to access a second application, you get redirected to the central service, if you already have a cookie there, you will get redirected directly to the app with a token, without login prompts, which means you're already logged in.

For example, consider Google as a the central service. Google implements Single Sign On in its services. Once you are logged in, you will be able to access Gmail, Youtube, and Google Docs without entering your credentials again.

Imagine the same, but with your own Enterprise applications and cloud apps!
