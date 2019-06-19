---
description: A whirlwind tour of identity, protocols, open standards, SSO, OAuth2, and Open ID Connect.
classes: video-page
---
# Introduction to Identity

A whirlwind tour of identity, protocols, open standards, SSO, OAuth2, and Open ID Connect.

<div class="video-wrapper" data-video="pdlav16113"></div>

## Bookmarks

<div class="video-transcript">
  <ul>
    <li><a href="#wistia_pdlav16113?time=32">What is the problem with identity?</a></li>
    <li><a href="#wistia_pdlav16113?time=255">What can Auth0 do for you?</a></li>
    <li><a href="#wistia_pdlav16113?time=352">Identity, protocols and open standards</a></li>
    <li><a href="#wistia_pdlav16113?time=485">Specs most relevant for our work at Auth0</a></li>
    <li><a href="#wistia_pdlav16113?time=540">Introducing the history part of the presentation</a></li>
    <li><a href="#wistia_pdlav16113?time=580">User passwords in every app</a></li>
    <ul>
      <li><a href="#wistia_pdlav16113?time=600">digital identity</a></li>
      <li><a href="#wistia_pdlav16113?time=722">shared secrets, raw creds</a></li>
      <li><a href="#wistia_pdlav16113?time=768">passwords and jellyfish</a></li>
    </ul>
    <li><a href="#wistia_pdlav16113?time=853">Directories</a></li>
    <ul>
      <li><a href="#wistia_pdlav16113?time=970">directory</a></li>
      <li><a href="#wistia_pdlav16113?time=1068">perimeter</a></li>
    </ul>
    <li><a href="#wistia_pdlav16113?time=1108">Cross domain SSO</a></li>
    <ul>
      <li><a href="#wistia_pdlav16113?time=1148">shadow accounts</a></li>
      <li><a href="#wistia_pdlav16113?time=1242">Kerberos</a></li>
      <li><a href="#wistia_pdlav16113?time=1260">SAML</a></li>
      <li><a href="#wistia_pdlav16113?time=1293">middleware</a></li>
      <li><a href="#wistia_pdlav16113?time=1346">trust</a></li>
      <li><a href="#wistia_pdlav16113?time=1552">security token</a></li>
      <li><a href="#wistia_pdlav16113?time=1571">digital signature</a></li>
      <li><a href="#wistia_pdlav16113?time=1630">claims</a></li>
      <li><a href="#wistia_pdlav16113?time=1757">representing a session with a cookie</a></li>
    </ul>
    <li><a href="#wistia_pdlav16113?time=1817">The password sharing antipattern</a></li>
    <ul>
      <li><a href="#wistia_pdlav16113?time=1948">Problem 1: sharing credentials with the wrong entity</a></li>
      <li><a href="#wistia_pdlav16113?time=1990">Problem 2: more privileges than necessary</a></li>
    </ul>  
    <li><a href="#wistia_pdlav16113?time=2040">Delegated authorization: OAuth2</a></li>
    <ul>
      <li><a href="#wistia_pdlav16113?time=2088">authorization server</a></li>
      <li><a href="#wistia_pdlav16113?time=2150">OAuth2 is NOT an authentication protocol</a></li>
      <li><a href="#wistia_pdlav16113?time=2209">consent</a></li>
      <li><a href="#wistia_pdlav16113?time=2234">authorization code</a></li>
      <li><a href="#wistia_pdlav16113?time=2257">client registration, client secret</a></li>
      <li><a href="#wistia_pdlav16113?time=2300">access token, scope</a></li>
    </ul>      
    <li><a href="#wistia_pdlav16113?time=2409">Layering sign in on OAuth2: OpenID Connect</a></li>
    <ul>
      <li><a href="#wistia_pdlav16113?time=2526">confused deputy problem</a></li>
      <li><a href="#wistia_pdlav16113?time=2626">OIDC</a></li>
      <li><a href="#wistia_pdlav16113?time=2664">ID token</a></li>
    </ul>
    <li><a href="#wistia_pdlav16113?time=2753">Auth0: an intermediary keeping complexity at bay</a></li>
    <li><a href="#wistia_pdlav16113?time=2880">Wrap</a></li>
  </ul>

</div>

<div class="video-transcript-expand" onClick="(function() {
  $('.video-transcript').toggleClass('expanded');
  $('.video-transcript-expand i').attr('class', $('.video-transcript').hasClass('expanded') ? 'icon-budicon-462' : 'icon-budicon-460');
})()">Expand Bookmarks <i class="icon-budicon-460"></i></div>

## Up Next

<ul class="up-next">
  <li>
    <span class="video-time"><i class="icon icon-budicon-494"></i>14:58</span>
    <i class="video-icon icon icon-budicon-676"></i>
    <a href="/learn-identity/02-oidc-and-oauth">OIDC and OAuth</a>
    <p>Open ID Connect and OAuth specifications, roles, and grants.</p>
  </li>

  <li>
    <span class="video-time"><i class="icon icon-budicon-494"></i>34:56</span>
    <i class="video-icon icon icon-budicon-676"></i>
    <a href="/learn-identity/03-web-sign-in">Web Sign-In</a>
    <p>Authentication for web applications using Open ID Connect and ID token validation.</p>
  </li>

  <li>
    <span class="video-time"><i class="icon icon-budicon-494"></i>53:12</span>
    <i class="video-icon icon icon-budicon-676"></i>
    <a href="/learn-identity/04-calling-an-api">Calling an API</a>
    <p>How to obtain and use access and refresh tokens for delegated authorization.</p>
  </li>

  <li>
    <span class="video-time"><i class="icon icon-budicon-494"></i>41:01</span>
    <i class="video-icon icon icon-budicon-676"></i>
    <a href="/learn-identity/05-desktop-and-mobile-apps">Desktop and Mobile Apps</a>
    <p>Authentication and delegated authorization for desktop and mobile applications and a public client overview.</p>
  </li>

  <li>
    <span class="video-time"><i class="icon icon-budicon-494"></i>37:29</span>
    <i class="video-icon icon icon-budicon-676"></i>
    <a href="/learn-identity/06-single-page-apps">Single Page Apps</a>
    <p>Authentication and delegated authorization for single page applications.</p>
  </li>
</ul>
