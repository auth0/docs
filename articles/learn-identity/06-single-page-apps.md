---
description: Authentication and delegated authorization for single page applications.
classes: video-page
---
# Single Page Apps

Authentication and delegated authorization for single page applications.

<div class="video-wrapper" data-video="0pi7bt90c9" data-padding="100% 0 0"></div>

## Bookmarks

<div class="video-transcript">
  <ul>
    <li><a href="#wistia_0pi7bt90c9?time=11">Single Page Apps (SPA)</a></li>
    <ul>
      <li><a href="#wistia_0pi7bt90c10?time=151">modeling SPAs in OAuth2 and OIDC</a></li>
      <li><a href="#wistia_0pi7bt90c11?time=216">choosing between token and cookie based strategies depending on where the API lives</a></li>
    </ul>
    <li><a href="#wistia_0pi7bt90c12?time=273">Implicit grant</a></li>
    <ul>
      <li><a href="#wistia_0pi7bt90c13?time=294">definition of “implicit” in oauth2</a></li>
      <li><a href="#wistia_0pi7bt90c14?time=314">classic use of “implicit” in the context of SPAs</a></li>
      <li><a href="#wistia_0pi7bt90c15?time=384">mechanics of implicit + fragment token delivery</a></li>
      <li><a href="#wistia_0pi7bt90c16?time=436">considerations on implicit flow usage today</a></li>
      <li><a href="#wistia_0pi7bt90c17?time=462">issues with implicit+fragment for requesting access tokens</a></li>
      <li><a href="#wistia_0pi7bt90c18?time=512">challenges renewing tokens in SPAs</a></li>
    </ul>
    <li><a href="#wistia_0pi7bt90c19?time=573">Implicit grant + fragment diagram</a></li>
    <ul>
      <li><a href="#wistia_0pi7bt90c20?time=664">authorization request</a></li>
      <ul>
        <li><a href="#wistia_0pi7bt90c21?time=711">OAuth2 state parameter</a></li>
      </ul>
      <li><a href="#wistia_0pi7bt90c22?time=852">authorization response</a></li>
      <ul>
        <li><a href="#wistia_0pi7bt90c23?time=902">session cookie establishment</a></li>
      </ul>
      <li><a href="#wistia_0pi7bt90c24?time=941">considerations on requesting ID token, access tokens for calling API</a></li>
    </ul>
    <li><a href="#wistia_0pi7bt90c25?time=993">Renewing tokens in SPAs</a></li>
    <ul>
      <li><a href="#wistia_0pi7bt90c26?time=1077">silent (no user interaction) token request via iframe</a></li>
      <ul>
        <li><a href="#wistia_0pi7bt90c27?time=1106">prompt=none</a></li>
        <li><a href="#wistia_0pi7bt90c28?time=1128">response_mode=web_message</a></li>
      </ul>
      <li><a href="#wistia_0pi7bt90c29?time=1182">authorization response</a></li>
      <li><a href="#wistia_0pi7bt90c30?time=1253">issues with the iframe token renewal approach</a></li>
      <ul>
        <li><a href="#wistia_0pi7bt90c31?time=1269">ITP2 in Safari</a></li>
      </ul>
    <ul>
    <li><a href="#wistia_0pi7bt90c32?time=1335">Implicit flow response_type=token deprecation</a></li>
    <li><a href="#wistia_0pi7bt90c33?time=1451">New OAuth2 SPA best practice: code + PKCE</a></li>
    <ul>
      <li><a href="#wistia_0pi7bt90c34?time=1508">requirements for refresh tokens in SPAs</a></li>
      <li><a href="#wistia_0pi7bt90c35?time=1550">renewing tokens in SPAs with Auth0 today (code in iframe)</a></li>
    </ul>
    <li><a href="#wistia_0pi7bt90c36?time=1615">Alternative topologies for securing SPAs</a></li>
    <ul>
      <li><a href="#wistia_0pi7bt90c37?time=1642">using cookies</a></li>
      <li><a href="#wistia_0pi7bt90c38?time=1910">proxy pattern with a backend</a></li>
    </ul>
  </ul>
</div>

<div class="video-transcript-expand" onClick="(function() {
  $('.video-transcript').toggleClass('expanded');
  $('.video-transcript-expand i').attr('class', $('.video-transcript').hasClass('expanded') ? 'icon-budicon-462' : 'icon-budicon-460');
})()">Expand Bookmarks <i class="icon-budicon-460"></i></div>

## Previous

<ul class="up-next">
  <li>
    <span class="video-time"><i class="icon icon-budicon-494"></i>48:54</span>
    <i class="video-icon icon icon-budicon-676"></i>
    <a href="/learn-identity/01-introduction-to-identity">Introduction to Identity</a>
    <p>A whirlwind tour of identity history, concepts, and terminology: protocols, open standards, SSO, OAuth2, OpenID Connect and more.</p>
  </li>

  <li>
    <span class="video-time"><i class="icon icon-budicon-494"></i>14:58</span>
    <i class="video-icon icon icon-budicon-676"></i>
    <a href="/learn-identity/02-oidc-and-oauth">OpenID Connect and OAuth2</a>
    <p>OpenID Connect and OAuth specifications, roles, and grants.</p>
  </li>

  <li>
    <span class="video-time"><i class="icon icon-budicon-494"></i>34:56</span>
    <i class="video-icon icon icon-budicon-676"></i>
    <a href="/learn-identity/03-web-sign-in">Web Sign-In</a>
    <p>Authentication for web applications using OpenID Connect.</p>
  </li>

  <li>
    <span class="video-time"><i class="icon icon-budicon-494"></i>53:12</span>
    <i class="video-icon icon icon-budicon-676"></i>
    <a href="/learn-identity/04-calling-an-api">Calling an API</a>
    <p>How to obtain and use access and refresh tokens for delegated authorization in a traditional web application.</p>
  </li>

  <li>
    <span class="video-time"><i class="icon icon-budicon-494"></i>41:01</span>
    <i class="video-icon icon icon-budicon-676"></i>
    <a href="/learn-identity/05-desktop-and-mobile-apps">Desktop and Mobile Apps</a>
    <p>Authentication and delegated authorization for desktop and mobile applications and a public client overview.</p>
  </li>
</ul>
