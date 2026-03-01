---
description: Authentication and delegated authorization for single page applications.
classes: video-page
image: https://cdn2.auth0.com/docs/media/articles/learn-identity/learn-identity-og-image.jpg
public: false
---
<!-- markdownlint-disable-->
# Single Page Apps

Authentication and delegated authorization for single page applications.

<div class="video-wrapper" data-video="0pi7bt90c9"></div>

[<i class="icon icon-budicon-529"></i> Lab 4: Single-Page Applications](/identity-labs/04-single-page-app)

## Jump to Section

Jump to a section in the video for explanation on a specific topic.

<div class="video-transcript video-bookmarks" id="wistia-video-bookmarks">
  <ul>
    <li><a href="#wistia_0pi7bt90c9?time=12">Single Page Apps (SPA)</a></li>
    <ul>
      <li><a href="#wistia_0pi7bt90c9?time=151">Modeling SPAs in OAuth2 and OIDC</a></li>
      <li><a href="#wistia_0pi7bt90c9?time=216">Choosing between token and cookie based strategies depending on where the API lives</a></li>
    </ul>
    <li><a href="#wistia_0pi7bt90c9?time=274">Implicit grant</a></li>
    <ul>
      <li><a href="#wistia_0pi7bt90c9?time=294">Definition of “implicit” in OAuth2</a></li>
      <li><a href="#wistia_0pi7bt90c9?time=314">Classic use of “implicit” in the context of SPAs</a></li>
      <li><a href="#wistia_0pi7bt90c9?time=384.5">Mechanics of implicit + fragment token delivery</a></li>
      <li><a href="#wistia_0pi7bt90c9?time=436.2">Considerations on implicit flow usage today</a></li>
      <li><a href="#wistia_0pi7bt90c9?time=462">Issues with implicit + fragment for requesting access tokens</a></li>
      <li><a href="#wistia_0pi7bt90c9?time=512.5">Challenges renewing tokens in SPAs</a></li>
    </ul>
    <li><a href="#wistia_0pi7bt90c9?time=573.5">Implicit grant + fragment diagram</a></li>
    <ul>
      <li><a href="#wistia_0pi7bt90c9?time=664">Authorization request</a></li>
      <ul>
        <li><a href="#wistia_0pi7bt90c9?time=711.7">OAuth2 state parameter</a></li>
      </ul>
      <li><a href="#wistia_0pi7bt90c9?time=853">Authorization response</a></li>
      <ul>
        <li><a href="#wistia_0pi7bt90c9?time=902">Session cookie establishment</a></li>
      </ul>
      <li><a href="#wistia_0pi7bt90c9?time=941.5">Considerations on requesting ID token, access tokens for calling API</a></li>
    </ul>
    <li><a href="#wistia_0pi7bt90c9?time=997">Renewing tokens in SPAs</a></li>
    <ul>
      <li><a href="#wistia_0pi7bt90c9?time=1077">Silent (no user interaction) token request via iframe</a></li>
      <ul>
        <li><a href="#wistia_0pi7bt90c9?time=1105">Prompt=none</a></li>
        <li><a href="#wistia_0pi7bt90c9?time=1128">Response_mode=web_message</a></li>
      </ul>
      <li><a href="#wistia_0pi7bt90c9?time=1182.5">Authorization response</a></li>
      <li><a href="#wistia_0pi7bt90c9?time=1253">Issues with the iframe token renewal approach</a></li>
      <ul>
        <li><a href="#wistia_0pi7bt90c9?time=1269">ITP2 in Safari</a></li>
      </ul>
    </ul>
    <li><a href="#wistia_0pi7bt90c9?time=1335">Implicit flow response_type=token deprecation</a></li>
    <li><a href="#wistia_0pi7bt90c9?time=1455">New OAuth2 SPA best practice: code + PKCE</a></li>
    <ul>
      <li><a href="#wistia_0pi7bt90c9?time=1507.5">Requirements for refresh tokens in SPAs</a></li>
      <li><a href="#wistia_0pi7bt90c9?time=1550">Renewing tokens in SPAs with Auth0 today (code in iframe)</a></li>
    </ul>
    <li><a href="#wistia_0pi7bt90c9?time=1614.5">Alternative topologies for securing SPAs</a></li>
    <ul>
      <li><a href="#wistia_0pi7bt90c9?time=1641.3">Using cookies</a></li>
      <li><a href="#wistia_0pi7bt90c9?time=1910.7">Proxy pattern with a backend</a></li>
    </ul>
  </ul>
</div>

<div class="video-transcript-expand" onClick="(function() {
  $('.video-transcript').toggleClass('expanded');
  $('.video-transcript-expand i').attr('class', $('.video-transcript').hasClass('expanded') ? 'icon-budicon-462' : 'icon-budicon-460');
})()">Expand Links <i class="icon-budicon-460"></i></div>

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
</ul>
