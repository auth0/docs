---
title: NGINX Plus
description: This tutorial demonstrates how to use the nginx-openid-connect module to add authentication and authorization to your NGINX server.
interactive:  true
files:
 - files/nginx
 - files/openid_connection_configuration
 - files/openid_connect
 - files/frontend
locale: en-US
---

# NGINX Plus


<p>This tutorial demonstrates how to use the nginx-openid-connect module to add authentication and authorization to your NGINX server. We recommend that you log in to follow this quickstart with examples configured for your account.</p><h2>System requirements</h2><p>This tutorial and seed project have been tested with the following:</p><ul><li><p>NGINX Plus R24</p></li></ul><p></p><p></p>

## Install and enable nginx-plus-module-njs module {{{ data-action="code" data-code="nginx.conf" }}}


<p>First, you need to install the <code>nginx-plus-module-njs</code> module for NGINX Plus.</p><p>Follow the dynamic module installation guide to install packages in your host OS.</p><p>For Linux distributions that use <code>yum</code> package manager, you can install the module like so:</p><p><code>sudo yum install nginx-plus-module-njs jq</code></p><p>Once you&#39;ve installed it, you need to enable it for NGINX by adding the following line near the top of your <code>/etc/nginx/nginx.conf</code> file:</p><p><code>load_module modules/ngx_http_js_module.so;</code>

</p>

## Checkout nginx-openid-connect template repository


<p>Clone the <code>nginx-openid-connect</code> repository. This repository comes with a template configuration.</p><p><code>git clone https://github.com/nginxinc/nginx-openid-connect</code></p>

## Configure NGINX with your Auth0 application details {{{ data-action="code" data-code="openid_connection_configuration.conf" }}}


<p>Run the configure.sh script inside the nginx-openid-connect folder to populate the template configuration for your Auth0 application:</p><p><pre><code>./configure.sh --auth_jwt_key request \

  --client_id ${account.clientId} \

  --pkce_enable \

  https://${account.namespace}/.well-known/openid-configuration

</code></pre>

</p><p>Next, add your <a href="/docs/api/authentication#auth0-logout" target="_self" >tenant’s logout URL</a> to your <code>openid_connect_configuration.conf</code> file.</p>

## Configure Accept-Encoding header for token and JWKS endpoints {{{ data-action="code" data-code="openid_connect.server_conf" }}}


<p>Add the <code>Accept-Encoding</code> header and set the value to <code>gzip</code> in your <code>openid_connect.server_conf</code> file.</p>

## Copy OpenID Connect configuration files


<p>Copy your four configuration files to the <code>conf.d</code> folder.</p><p><pre><code>sudo cp openid_connect.js \ 

   frontend.conf \

   openid_connect_configuration.conf \

   openid_connect.server_conf /etc/nginx/conf.d

</code></pre>

</p>

## Configure Auth0 application settings


<p>In the Auth0 Dashboard:</p><ol><li><p>Go to <b>Applications</b> &gt; <b>Applications</b>, and then select your application from the list.</p></li><li><p>Switch to the <b>Settings</b> view.</p></li><li><p>In the <b>Application URIs</b> section, add <code>https://${account.namespace}/_codexch</code> to <b>Allowed Callback URLs</b>.</p></li><li><p>Switch to the <b>Credentials</b> view.</p></li></ol><p>In the <b>Application Authentication</b> section, set <b>Authentication Method</b> to None.</p>

## Pass headers to upstream application {{{ data-action="code" data-code="frontend.conf" }}}


<p>Add additional headers from the ID token (JWT) to the upstream target in your <code>/etc/nginx/conf.d/frontend.conf</code> file.</p>
