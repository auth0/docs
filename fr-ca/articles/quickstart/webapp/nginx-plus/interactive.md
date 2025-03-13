---
title: NGINX Plus
description: Ce tutoriel explique comment utiliser le module nginx-openid-connect pour ajouter une authentification et une autorisation à votre serveur NGINX.
interactive:  true
files:
 - files/nginx
 - files/openid_connection_configuration
 - files/openid_connect
 - files/frontend
github:
  path: https://github.com/nginxinc/nginx-openid-connect
locale: fr-CA
---

# NGINX Plus


<p>Ce tutoriel explique comment utiliser le module nginx-openid-connect pour ajouter une authentification et une autorisation à votre serveur NGINX. Nous vous recommandons de vous connecter pour suivre ce démarrage rapide avec les exemples configurés pour votre compte.</p><h2>Configuration requise</h2><p>Ce tutoriel et le projet initial ont été testés avec la fonctionnalité suivante :</p><ul><li><p>NGINX Plus R24</p></li></ul><p></p><p></p>

## Installer et activer le module nginx-plus-module-njs {{{ data-action="code" data-code="nginx.conf" }}}


<p>Vous devez d’abord installer le module <code>nginx-plus-module-njs</code> pour NGINX Plus.</p><p>Suivez le guide d’installation des modules dynamiques pour installer les packages dans votre système d’exploitation hôte.</p><p>Pour les distributions Linux qui utilisent le gestionnaire de packages <code>yum</code>, il est possible d’installer le module de la manière suivante :</p><p><code>sudo yum install nginx-plus-module-njs jq</code></p><p>Une fois le module installé, vous devez l’activer pour NGINX en ajoutant la ligne suivante au début de votre fichier <code>/etc/nginx/nginx.conf</code> :</p><p><code>load_module modules/ngx_http_js_module.so;</code></p>

## Vérifier le dépôt de modèles nginx-openid-connect


<p>Clonez le dépôt <code>nginx-openid-connect</code>. Ce dépôt est accompagné d’un modèle de configuration.</p><p><code>git clone https://github.com/nginxinc/nginx-openid-connect</code></p>

## Configurer NGINX avec les détails de votre application Auth0 {{{ data-action="code" data-code="openid_connection_configuration.conf" }}}


<p>Exécutez le script configure.sh dans le dossier nginx-openid-connect pour remplir le modèle de configuration pour votre application Auth0 :</p><p><pre><code>./configure.sh --auth_jwt_key request \

  --client_id ${account.clientId} \

  --pkce_enable \

  https://${account.namespace}/.well-known/openid-configuration

</code></pre>

</p><p>Puis, ajoutez <a href="/docs/api/authentication#auth0-logout">l’URL de déconnexion de votre locataire</a> à votre fichier <code>openid_connect_configuration.conf</code>.</p>

## Configuration de l’en-tête Accept-Encoding pour les points de terminaison du jeton et JWKS {{{ data-action="code" data-code="openid_connect.server_conf" }}}


<p>Ajoutez l’en-tête <code>Accept-Encoding</code> et définissez la valeur <code>gzip</code> dans votre fichier <code>openid_connect.server_conf</code> .</p>

## Copier les fichiers de configuration OpenID Connect


<p>Copiez vos quatre fichiers de configuration dans le dossier <code>conf.d</code>.</p><p><pre><code>sudo cp openid_connect.js \ 

   frontend.conf \

   openid_connect_configuration.conf \

   openid_connect.server_conf /etc/nginx/conf.d

</code></pre>

</p>

## Configuration des paramètres de l’application Auth0


<p>Dans Auth0 Dashboard :</p><ol><li><p>Rendez-vous dans <b>Applications</b> &gt; <b>Applications</b>, puis sélectionnez votre application dans la liste.</p></li><li><p>Passez à la vue <b>Paramètres</b> .</p></li><li><p>Dans la section <b>URI de l’application</b>, ajoutez https://{yourDomain}/_codexch aux <b>Callback URL autorisées</b> (.</p></li><li><p>Passez à la vue <b>Identifiants</b>.</p></li></ol><p>Dans la section <b>Authentification des applications</b>, définissez <b>Méthode d’authentification</b> sur « None ».</p>

## Transmettre les en-têtes à l’application en amont {{{ data-action="code" data-code="frontend.conf" }}}


<p>Ajoutez des en-têtes supplémentaires du jeton d’ID (JWT) à la cible en amont dans votre fichier <code>/etc/nginx/conf.d/frontend.conf</code>.</p>
