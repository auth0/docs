---
description: Authentication and delegated authorization for desktop and mobile applications and a public client overview.
classes: video-page
image: https://cdn2.auth0.com/docs/media/articles/learn-identity/learn-identity-og-image.jpg
public: false
---
<!-- markdownlint-disable-->
# Desktop and Mobile Apps

Authentication and delegated authorization for desktop and mobile applications and a public client overview.

<div class="video-wrapper" data-video="dq3c4pz9lb"></div>

## Related Identity Lab

[<i class="icon icon-budicon-529"></i> Lab 3: Mobile Applications](/identity-labs/03-mobile-native-app)

## Jump to Section

Jump to a section in the video for explanation on a specific topic.

<div class="video-transcript video-bookmarks" id="wistia-video-bookmarks">
  <ul>
    <li><a href="#wistia_dq3c4pz9lb?time=30">Public clients</a></li>
    <ul>
      <li><a href="#wistia_dq3c4pz9lb?time=44">Definition of a public client</a></li>
      <li><a href="#wistia_dq3c4pz9lb?time=141.5">Native clients identity vs user identity</a></li>
      <li><a href="#wistia_dq3c4pz9lb?time=207">Client ID is not a secret</a></li>
    </ul>
    <li><a href="#wistia_dq3c4pz9lb?time=256">Authorization code grant and public clients</a></li>
    <ul>
      <li><a href="#wistia_dq3c4pz9lb?time=290">Driving interactive authentication using browser surfaces</a></li>
      <li><a href="#wistia_dq3c4pz9lb?time=328">Embedded browser/webview; browser controls</a></li>
      <li><a href="#wistia_dq3c4pz9lb?time=447">System browsers on iOS and Android</a></li>
      <li><a href="#wistia_dq3c4pz9lb?time=520">Need PKCE when using system browsers</a></li>
      <li><a href="#wistia_dq3c4pz9lb?time=620">System browser in desktop apps is not easy</a></li>
      <li><a href="#wistia_dq3c4pz9lb?time=804.2">No browser available on the device requires the device flow</a></li>
    </ul>
    <li><a href="#wistia_dq3c4pz9lb?time=859">Authorization code + PKCE diagram</a></li>
    <ul>
      <li><a href="#wistia_dq3c4pz9lb?time=936">Authorization request from the system browser</a></li>
      <ul>
        <li><a href="#wistia_dq3c4pz9lb?time=1002">Refresh token somewhat represents a session between client and resource</a></li>
        <li><a href="#wistia_dq3c4pz9lb?time=1027">Redirect URI using a protocol scheme for handling system browser-app communication</a></li>
        <li><a href="#wistia_dq3c4pz9lb?time=1073">PKCE code challenge</a></li>
      </ul>
      <li><a href="#wistia_dq3c4pz9lb?time=1115">Authorization response</a></li>
      <li><a href="#wistia_dq3c4pz9lb?time=1148">Returning the code from the system browser to the app</a></li>
      <li><a href="#wistia_dq3c4pz9lb?time=1193">Redeeming the authorization code</a></li>
      <ul>
        <li><a href="#wistia_dq3c4pz9lb?time=1244">PKCE code verifier</a></li>
        <li><a href="#wistia_dq3c4pz9lb?time=1271">Token endpoint response</a></li>
      </ul>
      <li><a href="#wistia_dq3c4pz9lb?time=1301">Challenges with refresh tokens without secrets</a></li>
      <li><a href="#wistia_dq3c4pz9lb?time=1340">Using a refresh token for getting a new access token in native clients</a></li>
      <li><a href="#wistia_dq3c4pz9lb?time=1380">Mitigating issues with the use of bearer tokens and secret-less refresh tokens</a></li>
      <ul>
        <li><a href="#wistia_dq3c4pz9lb?time=1398">Token binding</a></li>
        <li><a href="#wistia_dq3c4pz9lb?time=1473.5">Mutual TLS (MTLS)</a></li>
      </ul>
      <li><a href="#wistia_dq3c4pz9lb?time=1541.5">Refresh tokens play the function of session artifacts for native clients and APIs</a></li>
    </ul>  
    <li><a href="#wistia_dq3c4pz9lb?time=1580">Resource Owner Password Grant (ROPG)</a></li>
    <ul>
      <li><a href="#wistia_dq3c4pz9lb?time=1619.5">Dangers and limitations of use of raw credentials</a></li>
      <li><a href="#wistia_dq3c4pz9lb?time=1855">How to address requests for ROPG from customers</a></li>
      <li><a href="#wistia_dq3c4pz9lb?time=1930">One exception in which ROPG might be temporarily acceptable</a></li>
    </ul>
    <li><a href="#wistia_dq3c4pz9lb?time=2038.4">ROPG diagram</a></li>
    <ul>
      <li><a href="#wistia_dq3c4pz9lb?time=2090">Authorization request</a></li>
      <li><a href="#wistia_dq3c4pz9lb?time=2119">Authorization response</a></li>
    </ul>
    <li><a href="#wistia_dq3c4pz9lb?time=2154">Other grants</a></li>
    <ul>
      <li><a href="#wistia_dq3c4pz9lb?time=2168.5">Device profile grant</a></li>
      <li><a href="#wistia_dq3c4pz9lb?time=2282">Token exchange flow</a></li>
      <li><a href="#wistia_dq3c4pz9lb?time=2363">Assertion profile</a></li>
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

  <li>
    <span class="video-time"><i class="icon icon-budicon-494"></i>53:12</span>
    <i class="video-icon icon icon-budicon-676"></i>
    <a href="/videos/learn-identity/04-calling-an-api">Calling an API</a>
    <p>How to obtain and use access and refresh tokens for delegated authorization in a traditional web application.</p>
  </li>
</ul>
