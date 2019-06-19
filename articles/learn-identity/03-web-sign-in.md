---
description: Open ID Connect and OAuth specifications, roles, and grants.
classes: video-page
---
# Web Sign-In

Authentication for web applications using Open ID Connect and ID token validation.

<!-- <div class='video-wrapper'>pdlav16113</div> -->

<script src="https://fast.wistia.com/embed/medias/k4rwcky3p5.jsonp" async></script>
<script src="https://fast.wistia.com/assets/external/E-v1.js" async></script>

<div class="wistia_responsive_padding" style="padding:100.0% 0 0 0;position:relative;"><div class="wistia_responsive_wrapper" style="height:100%;left:0;position:absolute;top:0;width:100%;"><div class="wistia_embed wistia_async_k4rwcky3p5 seo=false videoFoam=true" style="height:100%;position:relative;width:100%"><div class="wistia_swatch" style="height:100%;left:0;opacity:0;overflow:hidden;position:absolute;top:0;transition:opacity 200ms;width:100%;"><img src="https://fast.wistia.com/embed/medias/k4rwcky3p5/swatch" style="filter:blur(5px);height:100%;object-fit:contain;width:100%;" alt="" onload="this.parentNode.style.opacity=1;" /></div></div></div></div>

## Bookmarks

<div class="video-transcript">
  <ul>
    <li><a href="#wistia_k4rwcky3p5?time=32">Confidential clients - definition</a></li>
    <li><a href="#wistia_k4rwcky3p5?time=251">The grant used for web sign in: implicit with form_post</a></li>
    <li><a href="#wistia_k4rwcky3p5?time=396">Web sign in - detailed walkthrough and diagram</a></li>
    <ul>
      <li><a href="#wistia_k4rwcky3p5?time=448">request protected route on web app</a></li>
      <li><a href="#wistia_k4rwcky3p5?time=474">authorization request</a></li>
      <ul>
        <li><a href="#wistia_k4rwcky3p5?time=525">client ID</a></li>
        <li><a href="#wistia_k4rwcky3p5?time=542">response_type</a></li>
        <li><a href="#wistia_k4rwcky3p5?time=564">response_mode</a></li>
        <li><a href="#wistia_k4rwcky3p5?time=620">redirect_uri</a></li>
        <li><a href="#wistia_k4rwcky3p5?time=725">scope</a></li>
        <li><a href="#wistia_k4rwcky3p5?time=769">nonce</a></li>
        <li><a href="#wistia_k4rwcky3p5?time=813">default response_mode per response_type</a></li>
      </ul>
      <li><a href="#wistia_k4rwcky3p5?time=845">authorization request (continued)</a></li>
      <li><a href="#wistia_k4rwcky3p5?time=895">authorization response</a></li>
      <ul>
        <li><a href="#wistia_k4rwcky3p5?time=905">authorization server session cookie</a></li>
        <li><a href="#wistia_k4rwcky3p5?time=938">ID token returned in the form</a></li>
      </ul>
      <li><a href="#wistia_k4rwcky3p5?time=983">token validation and web app session creation</a></li>
    </ul>
    <li><a href="#wistia_k4rwcky3p5?time=1075">Anatomy of an ID token</a></li>
    <ul>
      <li><a href="#wistia_k4rwcky3p5?time=1192">JWT.io</a></li>
      <li><a href="#wistia_k4rwcky3p5?time=1210">JWT header</a></li>
      <li><a href="#wistia_k4rwcky3p5?time=1243">validation claims: issuer, audience, iat, expiration</a></li>
      <li><a href="#wistia_k4rwcky3p5?time=1309">identity claims, profile</a></li>
    </ul>
    <li><a href="#wistia_k4rwcky3p5?time=1340">Principles of token validation</a></li>
    <ul>
      <li><a href="#wistia_k4rwcky3p5?time=1359">subject confirmation</a></li>
      <ul>
        <li><a href="#wistia_k4rwcky3p5?time=1407">bearer tokens</a></li>
        <li><a href="#wistia_k4rwcky3p5?time=1436">proof of possession</a></li>
      </ul>
      <li><a href="#wistia_k4rwcky3p5?time=1560">validating tokens according to format</a></li>
      <li><a href="#wistia_k4rwcky3p5?time=1691">signature checks</a></li>
      <li><a href="#wistia_k4rwcky3p5?time=1711">“infrastructural” claims (issuer, audience, expiration)</a></li>
      <li><a href="#wistia_k4rwcky3p5?time=1764">validating tokens via introspection</a></li>
      <li><a href="#wistia_k4rwcky3p5?time=1858">attention points with introspection</a></li>
    </ul>
    <li><a href="#wistia_k4rwcky3p5?time=1912">Metadata and discovery</a></li>
    <ul>
      <li><a href="#wistia_k4rwcky3p5?time=1974">discovery doc retrieval at middleware init</a></li>
      <li><a href="#wistia_k4rwcky3p5?time=1990">requesting the discovery doc</a></li>
      <li><a href="#wistia_k4rwcky3p5?time=2004">discovery doc content</a></li>
      <li><a href="#wistia_k4rwcky3p5?time=2051">keys collection</a></li>
    </ul>
  </ul>
</div>

<div class="video-transcript-expand" onClick="(function() {
  $('.video-transcript').toggleClass('expanded');
  $('.video-transcript-expand i').attr('class', $('.video-transcript').hasClass('expanded') ? 'icon-budicon-462' : 'icon-budicon-460');
})()">Expand Bookmarks <i class="icon-budicon-460"></i></div>

## Up Next

<ul class="up-next">
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

## Previous

<ul class="up-next">
  <li>
    <span class="video-time"><i class="icon icon-budicon-494"></i>48:54</span>
    <i class="video-icon icon icon-budicon-676"></i>
    <a href="/learn-identity/01-introduction-to-identity">Introduction to Identity</a>
    <p>A whirlwind tour of identity, protocols, open standards, SSO, OAuth2, and Open ID Connect.</p>
  </li>

  <li>
    <span class="video-time"><i class="icon icon-budicon-494"></i>14:58</span>
    <i class="video-icon icon icon-budicon-676"></i>
    <a href="/learn-identity/02-oidc-and-oauth">OIDC and OAuth</a>
    <p>Open ID Connect and OAuth specifications, roles, and grants.</p>
  </li>
</ul>
