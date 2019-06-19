---
description: How to obtain and use access and refresh tokens for delegated authorization.
classes: video-page
---
# Calling an API

The canonical OAuth2 scenario! How to obtain and use access and refresh tokens for delegated authorization.

<!-- <div class='video-wrapper'>yw6hmdhnft</div> -->

<script src="https://fast.wistia.com/embed/medias/yw6hmdhnft.jsonp" async></script>
<script src="https://fast.wistia.com/assets/external/E-v1.js" async></script>

<div class="wistia_responsive_padding" style="padding:100.0% 0 0 0;position:relative;"><div class="wistia_responsive_wrapper" style="height:100%;left:0;position:absolute;top:0;width:100%;"><div class="wistia_embed wistia_async_yw6hmdhnft seo=false videoFoam=true" style="height:100%;position:relative;width:100%"><div class="wistia_swatch" style="height:100%;left:0;opacity:0;overflow:hidden;position:absolute;top:0;transition:opacity 200ms;width:100%;"><img src="https://fast.wistia.com/embed/medias/yw6hmdhnft/swatch" style="filter:blur(5px);height:100%;object-fit:contain;width:100%;" alt="" onload="this.parentNode.style.opacity=1;" /></div></div></div></div>

## Bookmarks

<div class="video-transcript">
  <ul>
    <li><a href="#wistia_yw6hmdhnft?time=28">Code grant definition</a></li>
    <ul>
      <li><a href="#wistia_yw6hmdhnft?time=103">scopes and the true meaning of delegated authorization</a></li>
      <li><a href="#wistia_yw6hmdhnft?time=190">code grant needs secrets</a></li>
      <li><a href="#wistia_yw6hmdhnft?time=224">offline_access scope</a></li>
    </ul>
    <li><a href="#wistia_yw6hmdhnft?time=314">Code grant diagram</a></li>
    <ul>
      <li><a href="#wistia_yw6hmdhnft?time=402">authorization request message</a></li>
      <li><a href="#wistia_yw6hmdhnft?time=562">audience parameter (mistake in the slide, ? instead of &)</a></li>
      <ul>
        <li><a href="#wistia_yw6hmdhnft?time=638">“scope stuffing”</a></li>
        <li><a href="#wistia_yw6hmdhnft?time=685">resources indicator</a></li>
      </ul>
      <li><a href="#wistia_yw6hmdhnft?time=712">authorization response</a></li>
      <li><a href="#wistia_yw6hmdhnft?time=772">redeeming the authorization code</a></li>
      <ul>
        <li><a href="#wistia_yw6hmdhnft?time=819">grant_type parameter</a></li>
        <li><a href="#wistia_yw6hmdhnft?time=918">response from the token endpoint</a></li>
      </ul>
      <li><a href="#wistia_yw6hmdhnft?time=946">expires_in and why clients should never write code to look inside the access token</a></li>
      <li><a href="#wistia_yw6hmdhnft?time=1054">calling an API with an access token</a></li>
    </ul>
    <li><a href="#wistia_yw6hmdhnft?time=1167">Authorization terminology</a></li>
    <ul>
      <li><a href="#wistia_yw6hmdhnft?time=1205">permissions</a></li>
      <li><a href="#wistia_yw6hmdhnft?time=1241">privileges</a></li>
      <li><a href="#wistia_yw6hmdhnft?time=1268">scopes</a></li>
      <li><a href="#wistia_yw6hmdhnft?time=1300">effective permissions</a></li>
    </ul>
    <li><a href="#wistia_yw6hmdhnft?time=1462">Refresh token diagram</a></li>
    <ul>
      <li><a href="#wistia_yw6hmdhnft?time=1477">what are refresh tokens and why do we need them?</a></li>
      <li><a href="#wistia_yw6hmdhnft?time=1553">requesting refresh tokens: offline_access scope</a></li>
      <li><a href="#wistia_yw6hmdhnft?time=1623">using a refresh token</a></li>
      <ul>
        <li><a href="#wistia_yw6hmdhnft?time=1759">refresh token expiration</a></li>
        <li><a href="#wistia_yw6hmdhnft?time=1798">refresh token rotation</a></li>
      </ul>
    </ul>
    <li><a href="#wistia_yw6hmdhnft?time=1875">Refresh tokens and sessions</a></li>
    <li><a href="#wistia_yw6hmdhnft?time=1927">Refresh tokens and persistence, token caching</a></li>
    <li><a href="#wistia_yw6hmdhnft?time=2008">Access tokens vs ID tokens recap</a></li>
    <ul>
      <li><a href="#wistia_yw6hmdhnft?time=2126">do not use ID tokens for calling APIs</a></li>
    </ul>
    <li><a href="#wistia_yw6hmdhnft?time=2270">Getting ID tokens on the back channel</a></li>
    <ul>
      <li><a href="#wistia_yw6hmdhnft?time=2333">validating ID tokens obtained on the back channel</a></li>
    </ul>
    <li><a href="#wistia_yw6hmdhnft?time=2410">Userinfo endpoint</a></li>
    <li><a href="#wistia_yw6hmdhnft?time=2556">Userinfo usage diagram</a></li>
    <ul>
      <li><a href="#wistia_yw6hmdhnft?time=2586">formatless access token</a></li>
      <li><a href="#wistia_yw6hmdhnft?time=2675">userinfo response</a></li>
    </ul>
    <li><a href="#wistia_yw6hmdhnft?time=2697">Hybrid grant</a></li>
    <li><a href="#wistia_yw6hmdhnft?time=2766">Trusted subsystem</a></li>
    <li><a href="#wistia_yw6hmdhnft?time=2940">Client credentials grant diagram</a></li>
    <ul>
      <li><a href="#wistia_yw6hmdhnft?time=3042">confusing client credentials with the client credentials grant</a></li>
      <li><a href="#wistia_yw6hmdhnft?time=3093">no refresh token needed for the client credentials grant</a></li>
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

  <li>
    <span class="video-time"><i class="icon icon-budicon-494"></i>34:56</span>
    <i class="video-icon icon icon-budicon-676"></i>
    <a href="/learn-identity/03-web-sign-in">Web Sign-In</a>
    <p>Authentication for web applications using Open ID Connect and ID token validation.</p>
  </li>
</ul>
