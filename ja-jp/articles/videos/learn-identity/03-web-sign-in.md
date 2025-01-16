---
description: Authentication for web applications using OpenID Connect.
classes: video-page
image: https://cdn2.auth0.com/docs/media/articles/learn-identity/learn-identity-og-image.jpg
public: false
---
<!-- markdownlint-disable-->
# Web Sign-In

Authentication for web applications using OpenID Connect.

<div class="video-wrapper" data-video="k4rwcky3p5"></div>

## Related Identity Lab

[<i class="icon icon-budicon-529"></i> Lab 1: Web Sign-On](/identity-labs/01-web-sign-in)

## Jump to Section

Jump to a section in the video for explanation on a specific topic.

<div class="video-transcript video-bookmarks" id="wistia-video-bookmarks">
  <ul>
    <li><a href="#wistia_k4rwcky3p5?time=33">Confidential clients - definition</a></li>
    <li><a href="#wistia_k4rwcky3p5?time=252">The grant used for web sign in: implicit with form_post</a></li>
    <li><a href="#wistia_k4rwcky3p5?time=400">Web sign in - detailed walkthrough and diagram</a></li>
    <ul>
      <li><a href="#wistia_k4rwcky3p5?time=455">Request protected route on web app</a></li>
      <li><a href="#wistia_k4rwcky3p5?time=474">Authorization request</a></li>
      <ul>
        <li><a href="#wistia_k4rwcky3p5?time=525">Client ID</a></li>
        <li><a href="#wistia_k4rwcky3p5?time=542">Response_type</a></li>
        <li><a href="#wistia_k4rwcky3p5?time=564">Response_mode</a></li>
        <li><a href="#wistia_k4rwcky3p5?time=620">Redirect_uri</a></li>
        <li><a href="#wistia_k4rwcky3p5?time=725">Scope</a></li>
        <li><a href="#wistia_k4rwcky3p5?time=769">Nonce</a></li>
        <li><a href="#wistia_k4rwcky3p5?time=818">Default response_mode per response_type</a></li>
      </ul>
      <li><a href="#wistia_k4rwcky3p5?time=845">Authorization request (continued)</a></li>
      <li><a href="#wistia_k4rwcky3p5?time=895">Authorization response</a></li>
      <ul>
        <li><a href="#wistia_k4rwcky3p5?time=906">Authorization server session cookie</a></li>
        <li><a href="#wistia_k4rwcky3p5?time=938">ID token returned in the form</a></li>
      </ul>
      <li><a href="#wistia_k4rwcky3p5?time=983">Token validation and web app session creation</a></li>
    </ul>
    <li><a href="#wistia_k4rwcky3p5?time=1076">Anatomy of an ID token</a></li>
    <ul>
      <li><a href="#wistia_k4rwcky3p5?time=1193">JWT.io</a></li>
      <li><a href="#wistia_k4rwcky3p5?time=1208">JWT header</a></li>
      <li><a href="#wistia_k4rwcky3p5?time=1243">Validation claims: issuer, audience, iat, expiration</a></li>
      <li><a href="#wistia_k4rwcky3p5?time=1309">Identity claims, profile</a></li>
    </ul>
    <li><a href="#wistia_k4rwcky3p5?time=1340">Principles of token validation</a></li>
    <ul>
      <li><a href="#wistia_k4rwcky3p5?time=1359">Subject confirmation</a></li>
      <ul>
        <li><a href="#wistia_k4rwcky3p5?time=1408">Bearer tokens</a></li>
        <li><a href="#wistia_k4rwcky3p5?time=1436">Proof of possession</a></li>
      </ul>
      <li><a href="#wistia_k4rwcky3p5?time=1560">Validating tokens according to format</a></li>
      <li><a href="#wistia_k4rwcky3p5?time=1692">Signature checks</a></li>
      <li><a href="#wistia_k4rwcky3p5?time=1711">"Infrastructural" claims (issuer, audience, expiration)</a></li>
      <li><a href="#wistia_k4rwcky3p5?time=1764">Validating tokens via introspection</a></li>
      <li><a href="#wistia_k4rwcky3p5?time=1859">Attention points with introspection</a></li>
    </ul>
    <li><a href="#wistia_k4rwcky3p5?time=1913">Metadata and discovery</a></li>
    <ul>
      <li><a href="#wistia_k4rwcky3p5?time=1977">Discovery doc retrieval at middleware init</a></li>
      <li><a href="#wistia_k4rwcky3p5?time=1990">Requesting the discovery doc</a></li>
      <li><a href="#wistia_k4rwcky3p5?time=2004">Discovery doc content</a></li>
      <li><a href="#wistia_k4rwcky3p5?time=2051">Keys collection</a></li>
    </ul>
  </ul>
</div>

<div class="video-transcript-expand" onClick="(function() {
  $('.video-transcript').toggleClass('expanded');
  $('.video-transcript-expand i').attr('class', $('.video-transcript').hasClass('expanded') ? 'icon-budicon-462' : 'icon-budicon-460');
})()">Expand Links <i class="icon-budicon-460"></i></div>

## Up Next

<ul class="up-next">
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

## Previous

<ul class="up-next">
  <li>
    <span class="video-time"><i class="icon icon-budicon-494"></i>48:54</span>
    <i class="video-icon icon icon-budicon-676"></i>
    <a href="/videos/learn-identity/01-introduction-to-identity">Introduction to Identity</a>
    <p>A whirlwind tour of identity history, concepts, and terminology: protocols, open standards, SSO, OAuth2, OpenID Connect and more.</p>
  </li>

  <li>
    <span class="video-time"><i class="icon icon-budicon-494"></i>14:58</span>
    <i class="video-icon icon icon-budicon-676"></i>
    <a href="/videos/learn-identity/02-oidc-and-oauth">OpenID Connect and OAuth2</a>
    <p>OpenID Connect and OAuth specifications, roles, and grants.</p>
  </li>
</ul>
