---
description: A whirlwind tour of identity history, concepts, and terminology - protocols, open standards, SSO, OAuth2, OpenID Connect and more.
classes: video-page
image: https://cdn2.auth0.com/docs/media/articles/learn-identity/learn-identity-og-image.jpg
public: false
---
<!-- markdownlint-disable-->
# Introduction to Identity

A whirlwind tour of identity history, concepts, and terminology: protocols, open standards, SSO, OAuth2, OpenID Connect and more.

<div class="video-wrapper" data-video="pdlav16113"></div>

## Jump to Section

Jump to a section in the video for explanation on a specific topic.

<div class="video-transcript video-bookmarks" id="wistia-video-bookmarks">
  <ul>
    <li><a href="#wistia_pdlav16113?time=32">What is the problem with identity?</a></li>
    <li><a href="#wistia_pdlav16113?time=255">What can Auth0 do for you?</a></li>
    <li><a href="#wistia_pdlav16113?time=352">Identity, protocols and open standards</a></li>
    <li><a href="#wistia_pdlav16113?time=485">Specs most relevant for our work at Auth0</a></li>
    <li><a href="#wistia_pdlav16113?time=540">Introducing the history part of the presentation</a></li>
    <li><a href="#wistia_pdlav16113?time=580">User passwords in every app</a></li>
    <ul>
      <li><a href="#wistia_pdlav16113?time=600">Digital identity</a></li>
      <li><a href="#wistia_pdlav16113?time=722">Shared secrets, raw creds</a></li>
      <li><a href="#wistia_pdlav16113?time=768">Passwords and jellyfish</a></li>
    </ul>
    <li><a href="#wistia_pdlav16113?time=853">Directories</a></li>
    <ul>
      <li><a href="#wistia_pdlav16113?time=970">Directory</a></li>
      <li><a href="#wistia_pdlav16113?time=1068">Perimeter</a></li>
    </ul>
    <li><a href="#wistia_pdlav16113?time=1108">Cross domain SSO</a></li>
    <ul>
      <li><a href="#wistia_pdlav16113?time=1148">Shadow accounts</a></li>
      <li><a href="#wistia_pdlav16113?time=1242">Kerberos</a></li>
      <li><a href="#wistia_pdlav16113?time=1260">SAML</a></li>
      <li><a href="#wistia_pdlav16113?time=1293">Middleware</a></li>
      <li><a href="#wistia_pdlav16113?time=1346">Trust</a></li>
      <li><a href="#wistia_pdlav16113?time=1552">Security token</a></li>
      <li><a href="#wistia_pdlav16113?time=1571">Digital signature</a></li>
      <li><a href="#wistia_pdlav16113?time=1630">Claims</a></li>
      <li><a href="#wistia_pdlav16113?time=1757">Representing a session with a cookie</a></li>
    </ul>
    <li><a href="#wistia_pdlav16113?time=1817">The password sharing anti-pattern</a></li>
    <ul>
      <li><a href="#wistia_pdlav16113?time=1948">Problem 1: sharing credentials with the wrong entity</a></li>
      <li><a href="#wistia_pdlav16113?time=1990">Problem 2: more privileges than necessary</a></li>
    </ul>  
    <li><a href="#wistia_pdlav16113?time=2048">Delegated authorization: OAuth2</a></li>
    <ul>
      <li><a href="#wistia_pdlav16113?time=2086">Authorization server</a></li>
      <li><a href="#wistia_pdlav16113?time=2150">OAuth2 is NOT an authentication protocol</a></li>
      <li><a href="#wistia_pdlav16113?time=2209">Consent</a></li>
      <li><a href="#wistia_pdlav16113?time=2234">Authorization code</a></li>
      <li><a href="#wistia_pdlav16113?time=2257">Client registration, client secret</a></li>
      <li><a href="#wistia_pdlav16113?time=2301">Access token, scope</a></li>
    </ul>      
    <li><a href="#wistia_pdlav16113?time=2409">Layering sign in on top of OAuth2: OpenID Connect</a></li>
    <ul>
      <li><a href="#wistia_pdlav16113?time=2526">Confused deputy problem</a></li>
      <li><a href="#wistia_pdlav16113?time=2627">OpenID Connect</a></li>
      <li><a href="#wistia_pdlav16113?time=2664">ID token</a></li>
    </ul>
    <li><a href="#wistia_pdlav16113?time=2753">Auth0: an intermediary keeping complexity at bay</a></li>
  </ul>

</div>

<div class="video-transcript-expand" onClick="(function() {
  $('.video-transcript').toggleClass('expanded');
  $('.video-transcript-expand i').attr('class', $('.video-transcript').hasClass('expanded') ? 'icon-budicon-462' : 'icon-budicon-460');
})()">Expand Links <i class="icon-budicon-460"></i></div>

## Up Next

<ul class="up-next">
  <li>
    <span class="video-time"><i class="icon icon-budicon-494"></i>14:58</span>
    <i class="video-icon icon icon-budicon-676"></i>
    <a href="/videos/learn-identity/02-oidc-and-oauth">OpenID Connect and OAuth2</a>
    <p>OpenID Connect and OAuth specifications, roles, and grants.</p>
  </li>

  <li>
    <span class="video-time"><i class="icon icon-budicon-494"></i>34:56</span>
    <i class="video-icon icon icon-budicon-676"></i>
    <a href="/videos/learn-identity/03-web-sign-in">Web Sign-In</a>
    <p>Authentication for web applications using OpenID Connect.</p>
  </li>

  <li>
    <span class="video-time"><i class="icon icon-budicon-494"></i>53:12</span>
    <i class="video-icon icon icon-budicon-676"></i>
    <a href="/videos/learn-identity/04-calling-an-api">Calling an API</a>
    <p>How to obtain and use access and refresh tokens for delegated authorization in a traditional web application.</p>
  </li>

  <li>
    <span class="video-time"><i class="icon icon-budicon-494"></i>41:01</span>
    <i class="video-icon icon icon-budicon-676"></i>
    <a href="/videos/learn-identity/05-desktop-and-mobile-apps">Desktop and Mobile Apps</a>
    <p>Authentication and delegated authorization for desktop and mobile applications and a public client overview.</p>
  </li>

  <li>
    <span class="video-time"><i class="icon icon-budicon-494"></i>37:29</span>
    <i class="video-icon icon icon-budicon-676"></i>
    <a href="/videos/learn-identity/06-single-page-apps">Single Page Apps</a>
    <p>Authentication and delegated authorization for single page applications.</p>
  </li>
</ul>
