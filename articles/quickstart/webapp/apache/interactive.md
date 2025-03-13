---
title: Apache
description: This tutorial demonstrates how to configure Apache to add authentication and authorization to your web app.
interactive:  true
files:
 - files/auth_openidc
github:
  path: https://github.com/zmartzone/mod_auth_openidc/releases
locale: en-US
---

# Apache


<p>This tutorial demonstrates how to configure Apache to add authentication and authorization to your web app. We recommend that you log in to follow this quickstart with examples configured for your account.</p><h2>System Requirements</h2><p>This tutorial and sample project have been tested with the following:</p><ul><li><p>Apache 2.4</p></li></ul><p></p>

## Install and Enable mod_auth_openidc Module


<p>First, install the <code>mod_auth_openidc</code> module for Apache.</p><p>You can get the binaries from <a href="https://github.com/zmartzone/mod_auth_openidc/releases">GitHub</a> and install them for your OS. If your OS isn&#39;t compatible with any of the binaries, you can still <a href="https://github.com/zmartzone/mod_auth_openidc/blob/master/INSTALL">build it from source</a>.</p><p>Once you&#39;ve installed the module, enable it for Apache with the <code>a2enmod</code> command. To learn more, read <a href="https://manpages.ubuntu.com/manpages/focal/man8/a2enmod.8.html">a2enmod on Ubuntu Manpage</a>:</p><p><code>a2enmod auth_openidc</code></p><p><div class="alert-container" severity="default"><p>For Windows, you can use <a href="https://github.com/enderandpeter/win-a2enmod#installation">this Powershell script</a> to get <code>a2enmod</code> working on your system.</p></div></p><p></p>

## Configure the Module with Your Auth0 Account Information {{{ data-action="code" data-code="auth_openidc.conf#1:12" }}}


<p>Update your new configuration file (<code>auth_openidc.conf</code>), located in the <code>/etc/apache2/mods-available</code> folder.</p><p><div class="alert-container" severity="default"><p>For Windows, you must use the <code>/apache/conf/httpd.conf</code> file.</p></div></p>

## Configure Auth0


<p>In the Auth0 Dashboard:</p><ol><li><p>Go to <b>Applications</b> &gt; <b>Applications</b>, and then select your application from the list.</p></li><li><p>Switch to the <b>Settings</b> view, and then locate the <b>Application URIs</b> section.</p></li><li><p>Add the value of <code>OIDCRedirectURI</code> to <b>Allowed Callback URLs</b>.</p></li><li><p>Locate <b>Advanced Settings</b> at the bottom of the page.</p></li><li><p>Switch to the <b>OAuth</b> view.</p></li><li><p>Set <b>JSON Web Token (JWT) Signature Algorithm</b> to <code>RS256</code>.</p></li></ol><p></p>

## Authorization {{{ data-action="code" data-code="auth_openidc.conf#14:18" }}}


<p>You can configure Apache to protect a specific location based on the value of a claim in the user’s ID token by adding a <code>Location</code> block to your <code>auth_openidc.conf</code> file.</p><p>For example, you could create an <a data-contentfulid="7DxotebjaRuNGHQgMr27ob-en-US">Action</a> that reads the user’s <a data-contentfulid="75kXKddeVMg7dRLtpPCOAn-en-US">roles</a>, and then adds a claim that grants access to a protected location:</p><p><pre><code class="language-javascript">exports.onExecutePostLogin = async (event, api) =&gt; {

  const roles = event.authorization.roles; // ['user', 'admin']



  if (roles.includes('admin')) {

    api.idToken.setCustomClaim('folder', 'admin');

  }

};

</code></pre>

</p>
