---
title: Ajouter une fonctionnalité de connexion à votre application Express
description: Ce guide explique comment intégrer Auth0, ajouter la connexion utilisateur, la déconnexion et un profil à une application Node.js Express en utilisant le SDK OpenID Connect Express.
interactive:  true
files:
 - files/server
github:
  path: https://github.com/auth0-samples/auth0-express-webapp-sample/tree/master/01-Login
locale: fr-CA
---

# Ajouter une fonctionnalité de connexion à votre application Express


<p>Auth0 vous permet d’ajouter rapidement l’authentification à presque tous les types d&#39;application. Ce guide explique comment intégrer Auth0, ajouter la connexion utilisateur, la déconnexion et un profil à une application Node.js Express en utilisant le SDK OpenID Connect Express.</p><p></p>

## Configurer Auth0


<p>Pour utiliser les services Auth0, vous devez avoir une application installée dans Auth0 Dashboard. L’application Auth0 est l’endroit où vous allez configurer le fonctionnement de l’authentification pour le projet que vous développez.</p><h3>Configurer une application</h3><p>Utilisez le sélecteur interactif pour créer une nouvelle application Auth0 ou sélectionner une application existante qui représente le projet avec lequel vous souhaitez vous intégrer. Dans Auth0, il est attribué à chaque application un identifiant client unique alphanumérique que votre code d’application utilisera pour appeler les API Auth0 via le SDK.</p><p>Tous les paramètres que vous configurez à l’aide de ce guide rapide seront automatiquement mis à jour pour votre application dans le <a href="https://manage.auth0.com/#/">Dashboard</a>, qui est l’endroit où vous pourrez gérer vos applications à l’avenir.</p><p>Si vous préférez explorer une configuration complète, vous pouvez plutôt consulter une application faisant office d’exemple.</p><h3>Configuration des URL de rappel</h3><p>Une URL de rappel est une URL intégrée dans votre application vers laquelle vous souhaitez qu’Auth0 redirige les utilisateurs après qu’ils se sont authentifiés. Si elle n’est pas définie, les utilisateurs ne seront pas redirigés vers votre application après s’être connectés.</p><p><div class="alert-container" severity="default"><p>Si vous suivez notre exemple de projet, définissez cette URL comme suit : <code>http://localhost:3000</code><code>/callback</code>.</p></div></p><h3>Configurer les URL de déconnexion</h3><p>Une URL de déconnexion est une URL intégrée dans votre application vers laquelle vous souhaitez qu’Auth0 redirige les utilisateurs après leur authentification. Si elle n’est pas définie, les utilisateurs ne pourront pas se déconnecter de votre application et recevront un message d’erreur.</p><p><div class="alert-container" severity="default"><p>Si vous suivez notre exemple de projet, définissez cette URL comme suit : <code>http://localhost:3000/logout</code>.</p></div></p>

## Installer la trousse SDK Express OpenID Connect {{{ data-action="code" data-code="server.js#2:16" }}}


<p>Votre application aura besoin du package <a href="https://github.com/auth0/express-openid-connect"><code>express-openid-connect</code></a>, qui est une trousse SDK conforme à l’OIDC maintenu par Auth0 pour Express.</p><p>Installez la trousse SDK Express OpenID Connect en exécutant les commandes suivantes dans votre terminal :</p><p><pre><code class="language-bash">cd &lt;your-project-directory&gt;

npm install express-openid-connect

</code></pre>

</p><h3>Configurer le routeur</h3><p>La bibliothèque Express OpenID Connect fournit le routeur <code>auth</code> afin de joindre des routes d’authentification à votre application. Vous devez configurer le routeur avec les clés de configuration suivantes :</p><ul><li><p><code>authRequired</code> – Vérifie si l’authentification est requise pour toutes les routes.</p></li><li><p><code>auth0Logout</code> – Utilise la fonctionnalité de déconnexion d’Auth0.</p></li><li><p><code>baseURL</code> – L’URL où l’application est hébergée.</p></li><li><p><code>secret</code> – Une chaîne longue et aléatoire.</p></li><li><p><code>issuerBaseURL</code> – Le domaine sous forme d’URL sécurisée trouvé dans vos <a href="https://manage.auth0.com/#/applications/%7ByourClientId%7D/settings">Paramètres d’application</a>.</p></li><li><p><code>clientID</code> – L’ID client trouvé dans vos <a href="https://manage.auth0.com/#/applications/%7ByourClientId%7D/settings">Paramètres d’application</a>.</p></li></ul><p>Pour des options de configuration supplémentaires, consultez la <a href="https://auth0.github.io/express-openid-connect">documentation API</a>.</p><p><div class="alert-container" severity="default"><p>Vous pouvez générer une chaîne appropriée pour<code>LONG_RANDOM_STRING</code> en utilisant <code>openssl rand -hex 32</code> dans la ligne de commande.</p></div></p><p><div class="checkpoint">Express – Étape 2 – Installer la trousse SDK Express OpenID Connect <div class="checkpoint-default"><p>Un utilisateur peut désormais se connecter à votre application en visitant la route <code>/login</code> fournie par la bibliothèque. Si vous exécutez votre projet sur localhost : <code>localhost:3000</code>, ce lien sera <a href="http://localhost:3000/login"><code>http://localhost:3000/login</code></a>.</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Sorry about that. You should check the error details on the Auth0 login page to make sure you have entered the callback URL correctly.</p><p>Still having issues? Check out our <a href="https://auth0.com/docs">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p></div>

  </div></p>

## Afficher le profil utilisateur {{{ data-action="code" data-code="server.js#25:28" }}}


<p>Pour afficher le profil utilisateur, votre application doit fournir une route protégée.</p><p>Ajoutez l’intergiciel <code>requiresAuth</code> pour les routes qui nécessitent une authentification. Toute route utilisant cet intergiciel vérifiera s’il existe une session utilisateur valide et, si ce n’est pas le cas, redirigera l’utilisateur vers la page de connexion.</p><p><div class="checkpoint">Express – Étape 3 – Afficher le profil utilisateur – Point de contrôle <div class="checkpoint-default"><p>Un utilisateur peut se déconnecter de votre application en visitant la route <code>/logout</code> fournie par la bibliothèque. Si vous exécutez votre projet sur <code>localhost:3000</code>, ce lien sera <a href="http://localhost:3000/logout"><code>http://localhost:3000/logout</code></a>.</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Sorry about that. You should check that you configured the logout URL correctly.</p><p>Still having issues? Check out our <a href="https://auth0.com/docs">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p></div>

  </div></p>
