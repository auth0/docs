---
title: Cookies
description: Understand what cookies are and how they can be used with sessions to track user authentication.
toc: true
topics:
  - cookies
  - sessions
  - authentication
contentType: concept
useCase:
  - build-an-app
---
# Cookies

Cookies are strings of data that a web server sends to the browser. When a browser requests an object from the same domain in the future, the browser will send the same string of data back to the origin server.

The data is sent from the web server in the form of an HTTP header called "Set-Cookie". The browser sends the cookie back to the server in an HTTP header called "Cookie".

There are two different types of cookies - session cookies and persistent cookies. If a cookie does not contain an expiration date, it is considered a session cookie. Session cookies are stored in memory and never written to disk. When the browser closes, the cookie is permanently lost from this point on. If the cookie contains an expiration date, it is considered a persistent cookie. On the date specified in the expiration, the cookie will be removed from the disk.


Session cookies

Webpages have no memories. A user going from page to page will be treated by the website as a completely new visitor. Session cookies enable the website you are visiting to keep track of your movement from page to page so you don't get asked for the same information you've already given to the site. Cookies allow you to proceed through many pages of a site quickly and easily without having to authenticate or reprocess each new area you visit.

Session cookies allow users to be recognized within a website so any page changes or item or data selection you do is remembered from page to page. The most common example of this functionality is the shopping cart feature of any e-commerce site. When you visit one page of a catalog and select some items, the session cookie remembers your selection so your shopping cart will have the items you selected when you are ready to check out. Without session cookies, if you click CHECKOUT, the new page does not recognize your past activities on prior pages and your shopping cart will always be empty.

You can adjust your session cookies through the settings feature of your browser.

Without cookies, websites and their servers have no memory. A cookie, like a key, enables swift passage from one place to the next. Without a cookie every time you open a new web page the server where that page is stored will treat you like a completely new visitor.

Websites typically use session cookies to ensure that you are recognised when you move from page to page within one site and that any information you have entered is remembered. For example, if an e-commerce site did not use session cookies then items placed in a shopping basket would disappear by the time you reach the checkout. You can choose to accept session cookies by changing the settings in your browser.

## Using sessions with authentication

When you build an application that requires authentication, you can use sessions and cookies to determine if a user is authenticated each time a request is made. To do this, you can choose to [use either stateful or stateless cookies]().

### Stateful cookies

Stateful cookies contain a pointer to a database record that stores the session information.

**Pros**:

* Have no limitations on amount of session information stored.
* Can easily clear a user's session--just remove the record from the database.

**Cons**:

* Requires a database to store the session data (but most web applications already have this).
* Increases latency because you have to make database calls to read the session (and sometimes write it) for each HTTP request a user makes.
* Can be challenging to scale when you have many users and therefore many reads/writes to your database.

### Stateless cookies

Stateless cookies are self-contained; they include all session information that you need (for authenticated users, the user ID) and reside on the client. To prevent external tampering, stateless cookies should be encrypted (or at least signed).

**Pros**:

* Can implement easily; doesn’t require a special backend.
* Reduces latency because you don't have to call a database.
* Easy to scale.

**Cons**:
* Must restrict stored session information because cookies are limited in size (max 4KB in most browsers). Although session information may be split between multiple cookies, we don't recommend it.
* Makes it difficult to revoke a session, because there is no record in a database you can delete; you’ll need to find other methods to forcefully clear a session.
* If using multiple web servers, must make sure all servers have the key to encrypt/decrypt or sign the cookie.