---
title: Apache
description: Ce tutoriel montre comment configurer Apache pour ajouter l’authentification et l’autorisation à votre application web.
interactive:  true
files:
 - files/auth_openidc
github:
  path: https://github.com/zmartzone/mod_auth_openidc/releases
locale: fr-CA
---

# Apache


<p>Ce tutoriel montre comment configurer Apache pour ajouter l’authentification et l’autorisation à votre application web. Nous vous recommandons de vous connecter pour suivre ce démarrage rapide avec les exemples configurés pour votre compte.</p><h2>Configuration requise</h2><p>Ce tutoriel et le projet d’exemple ont été testés avec les éléments suivants :</p><ul><li><p>Apache 2.4</p></li></ul><p></p>

## Installer et activer le module mod_auth_openidc


<p>Tout d’abord, installez le module <code>mod_auth_openidc</code> pour Apache.</p><p>Vous pouvez obtenir les binaires sur <a href="https://github.com/zmartzone/mod_auth_openidc/releases">GitHub</a> et les installer pour votre système d’exploitation. Si votre système d’exploitation n’est pas compatible avec les binaires, vous pouvez toujours <a href="https://github.com/zmartzone/mod_auth_openidc/blob/master/INSTALL">le construire à partir de la source</a>.</p><p>Une fois le module installé, activez-le pour Apache avec la commande <code>a2enmod</code>. Pour en savoir plus, lisez la page de manuel <a href="https://manpages.ubuntu.com/manpages/focal/man8/a2enmod.8.html">a2enmod sur Ubuntu</a> :</p><p><code>a2enmod auth_openidc</code></p><p><div class="alert-container" severity="default"><p>Pour Windows, vous pouvez utiliser <a href="https://github.com/enderandpeter/win-a2enmod#installation">ce script Powershell</a> pour faire fonctionner <code>a2enmod</code> sur votre système.</p></div></p><p></p>

## Configurer le module avec les informations de votre compte Auth0 {{{ data-action="code" data-code="auth_openidc.conf#1:12" }}}


<p>Mettez à jour votre nouveau fichier de configuration (<code>auth_openidc.conf</code>), situé dans le dossier <code>/etc/apache2/mods-available</code>.</p><p><div class="alert-container" severity="default"><p>Pour Windows, vous devez utiliser le fichier <code>/apache/conf/httpd.conf</code>.</p></div></p>

## Configurer Auth0


<p>Dans Auth0 Dashboard :</p><ol><li><p>Rendez-vous dans <b>Applications</b> &gt; <b>Applications</b>, puis sélectionnez votre application dans la liste.</p></li><li><p>Passez à la vue <b>Settings (Paramètres)</b>, puis localisez la section <b>Application URIs (URI d’application)</b>.</p></li><li><p>Ajoutez la valeur de <code>OIDCRedirectURI</code> à <b>Allowed Callback URLs (URL de rappel autorisées)</b>.</p></li><li><p>Localisez <b>Advanced Settings (Paramètres avancés)</b> au bas de la page.</p></li><li><p>Passez à la vue <b>OAuth</b>.</p></li><li><p>Définissez <b>JSON Web Token (JWT) Signature Algorithm (Algorithme de signature du jeton Web JSON [JWT])</b> sur <code>RS256</code>.</p></li></ol><p></p>

## Autorisation {{{ data-action="code" data-code="auth_openidc.conf#14:18" }}}


<p>Vous pouvez configurer Apache pour protéger un emplacement spécifique basé sur la valeur d’une revendication dans le jeton d’identification de l’utilisateur en ajoutant un bloc <code>Location</code> à votre fichier <code>auth_openidc.conf</code>.</p><p>Par exemple, vous pouvez créer une <a data-contentfulid="7DxotebjaRuNGHQgMr27ob-fr-CA">Action</a> qui lit les <a data-contentfulid="75kXKddeVMg7dRLtpPCOAn-fr-CA">rôles</a> de l’utilisateur, puis ajoute une revendication qui accorde l’accès à un emplacement protégé :</p><p><pre><code class="language-javascript">exports.onExecutePostLogin = async (event, api) =&gt; {

  const roles = event.authorization.roles; // ['user', 'admin']



  if (roles.includes('admin')) {

    api.idToken.setCustomClaim('folder', 'admin');

  }

};

</code></pre>

</p>
