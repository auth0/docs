---
description: How to obtain and use access and refresh tokens for delegated authorization in a traditional web application.
classes: video-page
image: https://cdn2.auth0.com/docs/media/articles/learn-identity/learn-identity-og-image.jpg
public: false
---
<!-- markdownlint-disable-->
# Calling an API

How to obtain and use access and refresh tokens for delegated authorization in a traditional web application.

<div class="video-wrapper" data-video="yw6hmdhnft"></div>

## Related Identity Lab

[<i class="icon icon-budicon-529"></i> Lab 2: Calling an API](/identity-labs/02-calling-an-api)

## Jump to Section

Jump to a section in the video for explanation on a specific topic.

<div class="video-transcript video-bookmarks" id="wistia-video-bookmarks">
  <ul>
    <li><a href="#wistia_yw6hmdhnft?time=28">Code grant definition</a></li>
    <ul>
      <li><a href="#wistia_yw6hmdhnft?time=110">Scopes and the true meaning of delegated authorization</a></li>
      <li><a href="#wistia_yw6hmdhnft?time=192">Code grant needs secrets</a></li>
      <li><a href="#wistia_yw6hmdhnft?time=224">Offline_access scope</a></li>
    </ul>
    <li><a href="#wistia_yw6hmdhnft?time=314">Code grant diagram</a></li>
    <ul>
      <li><a href="#wistia_yw6hmdhnft?time=402">Authorization request message</a></li>
      <li><a href="#wistia_yw6hmdhnft?time=563">Audience parameter (mistake in the slide, ? instead of &)</a></li>
      <ul>
        <li><a href="#wistia_yw6hmdhnft?time=638.5">“Scope stuffing”</a></li>
        <li><a href="#wistia_yw6hmdhnft?time=685">Resources indicator</a></li>
      </ul>
      <li><a href="#wistia_yw6hmdhnft?time=712">Authorization response</a></li>
      <li><a href="#wistia_yw6hmdhnft?time=772">Redeeming the authorization code</a></li>
      <ul>
        <li><a href="#wistia_yw6hmdhnft?time=819">Grant_type parameter</a></li>
        <li><a href="#wistia_yw6hmdhnft?time=918">Response from the token endpoint</a></li>
      </ul>
      <li><a href="#wistia_yw6hmdhnft?time=946">Expires_in and why clients should never write code to look inside the access token</a></li>
      <li><a href="#wistia_yw6hmdhnft?time=1054">Calling an API with an access token</a></li>
    </ul>
    <li><a href="#wistia_yw6hmdhnft?time=1167">Authorization terminology</a></li>
    <ul>
      <li><a href="#wistia_yw6hmdhnft?time=1205">Permissions</a></li>
      <li><a href="#wistia_yw6hmdhnft?time=1241">Privileges</a></li>
      <li><a href="#wistia_yw6hmdhnft?time=1268">Scopes</a></li>
      <li><a href="#wistia_yw6hmdhnft?time=1300">Effective permissions</a></li>
    </ul>
    <li><a href="#wistia_yw6hmdhnft?time=1464.5">Refresh token diagram</a></li>
    <ul>
      <li><a href="#wistia_yw6hmdhnft?time=1476">What are refresh tokens and why do we need them?</a></li>
      <li><a href="#wistia_yw6hmdhnft?time=1553">Requesting refresh tokens: offline_access scope</a></li>
      <li><a href="#wistia_yw6hmdhnft?time=1623">Using a refresh token</a></li>
      <ul>
        <li><a href="#wistia_yw6hmdhnft?time=1759">Refresh token expiration</a></li>
        <li><a href="#wistia_yw6hmdhnft?time=1798">Refresh token rotation</a></li>
      </ul>
    </ul>
    <li><a href="#wistia_yw6hmdhnft?time=1875">Refresh tokens and sessions</a></li>
    <li><a href="#wistia_yw6hmdhnft?time=1927">Refresh tokens and persistence, token caching</a></li>
    <li><a href="#wistia_yw6hmdhnft?time=2007.5">Access tokens vs ID tokens recap</a></li>
    <ul>
      <li><a href="#wistia_yw6hmdhnft?time=2126">Do not use ID tokens for calling APIs</a></li>
    </ul>
    <li><a href="#wistia_yw6hmdhnft?time=2270.6">Getting ID tokens on the back channel</a></li>
    <ul>
      <li><a href="#wistia_yw6hmdhnft?time=2332.5">Validating ID tokens obtained on the back channel</a></li>
    </ul>
    <li><a href="#wistia_yw6hmdhnft?time=2410">Userinfo endpoint</a></li>
    <li><a href="#wistia_yw6hmdhnft?time=2556">Userinfo usage diagram</a></li>
    <ul>
      <li><a href="#wistia_yw6hmdhnft?time=2586">Formatless access token</a></li>
      <li><a href="#wistia_yw6hmdhnft?time=2676">Userinfo response</a></li>
    </ul>
    <li><a href="#wistia_yw6hmdhnft?time=2697">Hybrid grant</a></li>
    <li><a href="#wistia_yw6hmdhnft?time=2766.5">Trusted subsystem</a></li>
    <li><a href="#wistia_yw6hmdhnft?time=2941">Client credentials grant diagram</a></li>
    <ul>
      <li><a href="#wistia_yw6hmdhnft?time=3042">Confusing client credentials with the client credentials grant</a></li>
      <li><a href="#wistia_yw6hmdhnft?time=3093">No refresh token needed for the client credentials grant</a></li>
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

  <li>
    <span class="video-time"><i class="icon icon-budicon-494"></i>34:56</span>
    <i class="video-icon icon icon-budicon-676"></i>
    <a href="/videos/learn-identity/03-web-sign-in">Web Sign-In</a>
    <p>Authentication for web applications using OpenID Connect.</p>
  </li>
</ul>
