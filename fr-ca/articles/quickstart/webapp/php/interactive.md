---
title: Ajouter une connexion à votre application PHP
description: Ce guide explique comment intégrer Auth0, ajouter l’authentification et afficher les informations de profil utilisateur dans n’importe quelle application PHP à l’aide de la trousse SDK Auth0 PHP.
interactive:  true
files:
 - files/index
 - files/login
 - files/logout
 - files/profile
 - files/router
 - files/callback
github:
  path: https://github.com/auth0-samples/auth0-php-web-app/tree/main/app
locale: fr-CA
---

# Ajouter une connexion à votre application PHP


<p>Auth0 vous permet d’ajouter rapidement l’authentification à presque tous les types d’application. Ce guide explique comment intégrer Auth0, ajouter l’authentification et afficher les informations de profil utilisateur dans n’importe quelle application PHP à l’aide de la trousse SDK Auth0 PHP.</p><p>Pour utiliser ce guide rapide, vous devez :</p><ul><li><p>Vous inscrire à un compte Auth0 gratuit ou vous connecter à Auth0.</p></li><li><p>Disposer d’un projet PHP fonctionnel avec lequel vous souhaitez vous intégrer. Vous pouvez également consulter ou télécharger une application faisant office d’exemple lorsque vous vous connectez.</p></li></ul><p></p><p></p>

## Configurer Auth0


<p>Pour utiliser les services Auth0, vous devez avoir une application installée dans Auth0 Dashboard. L’application Auth0 est l’endroit où vous allez configurer le fonctionnement de l’authentification pour le projet que vous développez.</p><h3>Configurer une application</h3><p>Utilisez le sélecteur interactif pour créer une nouvelle application Auth0 ou sélectionner une application existante qui représente le projet avec lequel vous souhaitez vous intégrer. Dans Auth0, il est attribué à chaque application un identificateur client unique alphanumérique que votre code d’application utilisera pour appeler les API Auth0 via la trousse SDK.</p><p>Tous les paramètres que vous configurez à l’aide de ce guide rapide seront automatiquement mis à jour pour votre application dans le <a href="https://manage.auth0.com/#/">Dashboard</a>, qui vous permettra de gérer vos applications.</p><p>Si vous préférez explorer une configuration complète, vous pouvez plutôt consulter une application faisant office d’exemple.</p><h3>Configuration des Callback URL</h3><p>Une Callback URL est une URL intégrée dans votre application vers laquelle vous souhaitez qu’Auth0 redirige les utilisateurs après leur authentification. Si elle n’est pas définie, les utilisateurs ne seront pas redirigés vers votre application après s’être connectés.</p><p><div class="alert-container" severity="default"><p>Si vous suivez notre projet à titre d’exemple, définissez ceci sur <code>http://localhost:3000/callback</code>.</p></div></p><h3>Configuration des URL de déconnexion</h3><p>Une URL de déconnexion est une URL intégrée dans votre application vers laquelle vous souhaitez qu’Auth0 redirige les utilisateurs après leur déconnexion. Si elle n’est pas définie, les utilisateurs ne pourront pas se déconnecter de votre application et recevront un message d’erreur.</p><p><div class="alert-container" severity="default"><p>Si vous suivez notre projet à titre d’exemple, définissez ceci sur <code>http://localhost:3000</code>.</p><p></p></div></p><h3>Configurer Allowed Web Origins (Origines Web autorisées)</h3><p>Une origine Web autorisée est une URL que vous souhaitez autoriser à accéder à votre flux d’authentification.  Elle doit contenir l’URL de votre projet. Si elle n’est pas configurée adéquatement, votre projet ne pourra pas actualiser silencieusement les jetons d’authentification, ce qui entraînera la déconnexion de vos utilisateurs la prochaine fois qu&#39;ils visiteront votre application ou lors de l’actualisation d’une page.</p><p><div class="alert-container" severity="default"><p>Si vous suivez notre projet à titre d’exemple, définissez ceci sur <code>http://localhost:3000</code>.</p><p></p></div></p>

## Installer la trousse SDK Auth0 PHP {{{ data-action="code" data-code="index.php" }}}


<p>Auth0 fournit une trousse <a href="https://github.com/auth0/auth0-PHP">SDK PHP</a> (Auth0-PHP) pour simplifier le processus de mise en œuvre de l’authentification et de l’autorisation Auth0 dans les applications PHP.</p><p>La trousse SDK Auth0 PHP nécessite l’installation des bibliothèques HTTP compatibles <a href="https://www.php-fig.org/psr/psr-17/">PSR-17</a> et <a href="https://www.php-fig.org/psr/psr-18/">PSR-18</a> pour la gestion des requêtes réseau. Si vous ne disposez pas de bibliothèques, vous pouvez installer des choix fiables en exécutant les commandes suivantes dans votre terminal :</p><p><pre><code class="language-powershell">cd &lt;your-project-directory&gt;

composer require symfony/http-client nyholm/psr7

</code></pre>

</p><p>Installez maintenant la trousse SDK PHP Auth0 en exécutant la commande suivante dans votre terminal :</p><p><pre><code class="language-powershell">composer require auth0/auth0-php

</code></pre>

</p><h3>Configurer la trousse SDK Auth0</h3><p>Créez un nouveau fichier dans votre application, appelé <code>index.php</code>, et copiez le code du panneau interactif à droite sous l’onglet <b>index.php</b>.</p><p>Pour que la trousse SDK fonctionne correctement, vous devez définir les propriétés suivantes dans la trousse SDK Auth0 lors de l’initialisation :</p><ul><li><p><code>domain</code> : Le domaine de votre locataire Auth0. En général, vous le trouvez dans Auth0 Dashboard sous vos paramètres d’application dans le champ Domain (Domaine). Si vous utilisez un <a href="https://auth0.com/docs/custom-domains">domaine personnalisé</a>, définissez-le plutôt sur la valeur de votre domaine personnalisé.</p></li><li><p><code>clientId</code>: L’identificateur de l’application Auth0 que vous avez configurée précédemment dans ce guide rapide. Vous pouvez le trouver dans Auth0 Dashboard, dans la rubrique des paramètres de votre application, dans le champ Client ID (ID client).</p></li><li><p><code>clientSecret</code>: Le secret de l’application Auth0 que vous avez configurée précédemment dans ce guide rapide. Vous pouvez le trouver dans Auth0 Dashboard, dans la rubrique des paramètres de votre application, dans le champ Client Secret (Secret client).</p></li><li><p><code>redirectUri</code>: L’URL dans votre application vers laquelle vous souhaitez qu’Auth0 redirige les utilisateurs après leur authentification. Cela correspond à la Callback URL que vous avez configurée précédemment dans ce guide rapide. Vous pouvez également trouver cette valeur dans Auth0 Dashboard, dans la rubrique des paramètres de votre application, dans le champ Callback URLs (Callback URL). Assurez-vous que ce que vous saisissez dans votre code correspond à ce que vous avez configuré précédemment, au cas contraire, vos utilisateurs verront une erreur.</p></li><li><p><code>cookieSecret</code>: Valeur secrète longue utilisée pour chiffrer le témoin de session. Vous pouvez générer une chaîne appropriée en exécutant <code>openssl rand -hex 32</code> dans votre terminal.</p></li></ul><p><div class="checkpoint">PHP - Étape 2 - Point de contrôle <div class="checkpoint-default"><p>Votre trousse SDK Auth0 devrait maintenant être correctement configuré. Exécutez votre application pour vérifier que :</p><ul><li><p>La trousse SDK est initialisée correctement.</p></li><li><p>Votre application ne génère aucune erreur liée à Auth0.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"></div>

  </div></p>

## Créer des routes {{{ data-action="code" data-code="router.php" }}}


<p>Installez maintenant une bibliothèque de routage, pour aider à diriger les requêtes entrantes vers votre application. Cette étape n’est pas obligatoire, mais elle simplifie la structure de l’application pour les besoins de ce guide rapide.</p><p><pre><code class="language-powershell">composer require steampixel/simple-php-router

</code></pre>

</p><p>Créez un nouveau fichier dans votre application, appelé <code>router.php</code>, pour définir nos routes, et copiez le code du panneau interactif à droite.</p>

## Ajouter une fonctionnalité de connexion à votre application {{{ data-action="code" data-code="login.php" }}}


<p>À présent que vous avez configuré votre application Auth0 et la trousse SDK PHP Auth0, vous devez configurer la connexion pour votre projet. Pour ce faire, vous utiliserez la méthode <code>login()</code> de la trousse SDK pour créer un bouton de connexion qui redirige les utilisateurs vers la page de connexion universelle Auth0. Une fois un utilisateur authentifié avec succès, il est redirigé vers la Callback URL que vous avez configurée précédemment dans ce guide rapide.</p><p>Créez un nouveau fichier dans votre application, appelé <code>login.php</code>, pour gérer le processus de connexion, et copiez le code du panneau interactif à droite, qui contient la logique nécessaire à la connexion.</p><p><div class="checkpoint">PHP - Étape 4 - Point de contrôle <div class="checkpoint-default"><p>Vous devez désormais pouvoir vous connecter ou vous inscrire en utilisant un nom d’utilisateur et un mot de passe.</p><p>Cliquez sur le lien de connexion et vérifiez que :</p><ul><li><p>Votre application vous redirige vers la page Connexion universelle Auth0.</p></li><li><p>Vous pouvez vous connecter ou vous inscrire.</p></li><li><p>Auth0 vous redirige vers votre application en utilisant la valeur de <code>redirectUri</code> que vous avez utilisée pour configurer la trousse SDK.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Sorry about that. Here&#39;s a couple things to double check:</p><ul><li><p>You configured the correct <code>redirectUri</code>.</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p></div>

  </div></p>

## Ajouter une fonctionnalité de déconnexion à votre application {{{ data-action="code" data-code="logout.php" }}}


<p>Les utilisateurs qui se connectent à votre projet auront également besoin d’un moyen de se déconnecter. Nous allons gérer un bouton de déconnexion à l’aide de la méthode <code>logout()</code> de la trousse SDK. Lorsque les utilisateurs se déconnecteront, ils seront redirigés vers votre point de terminaison <a href="https://auth0.com/docs/api/authentication?http#logout">Auth0 logout</a> qui par la suite les redirigera immédiatement vers l’URL de déconnexion que vous avez configurée précédemment dans ce guide rapide.</p><p>Créez un nouveau fichier dans votre application, appelé <code>logout.php</code>, pour gérer le processus, et copiez le code du panneau interactif, qui contient la logique nécessaire à la déconnexion. Ensuite, mettez à jour votre fichier <code>index.php</code> pour y intégrer le nouveau bouton de déconnexion.</p><p><div class="checkpoint">PHP - Section 5 - Point de contrôle <div class="checkpoint-default"><p>Exécutez votre application et cliquez sur le bouton de déconnexion, vérifiez que :</p><ul><li><p>Votre application vous redirige vers l’adresse que vous avez spécifiée comme l’une des URL de déconnexion autorisées dans les paramètres de votre application.</p></li><li><p>Vous n’êtes plus connecté à votre application.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Sorry about that. Here&#39;s a couple things to double check:</p><ul><li><p>You configured the correct Logout URL.</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p></div>

  </div></p>

## Afficher les informations du profil utilisateur {{{ data-action="code" data-code="profile.php" }}}


<p>Vu que vos utilisateurs peuvent désormais se connecter et se déconnecter, vous voudrez probablement pouvoir récupérer les <a href="https://auth0.com/docs/users/concepts/overview-user-profile">informations de profil</a> associées aux utilisateurs authentifiés. Par exemple, vous voudrez peut-être pouvoir afficher le nom ou la photo de profil d’un utilisateur connecté dans votre projet.</p><p>Le SDK PHP Auth0 fournit des informations sur les utilisateurs via la méthode <code>getCredentials()</code>. Examinez le code <code>profile.php</code> dans le panneau interactif pour voir un exemple de la façon de l’utiliser.</p><p>Étant donné que la méthode contient des informations sensibles liées à l’identité de l’utilisateur, sa disponibilité dépend du statut d’authentification de l’utilisateur. Pour éviter les erreurs de rendu, vous devez toujours vérifier si la méthode <code>getCredentials()</code> renvoie un <code>object</code> ou <code>null</code> pour déterminer si Auth0 a authentifié l’utilisateur avant que votre application ne consomme les résultats.</p><p><div class="checkpoint">PHP - Étape 6 - Point de contrôle <div class="checkpoint-default"><p>Verifiez que :</p><ul><li><p>vous pouvez afficher le <code>nickname</code> ou toute autre propriété de l’utilisateur adéquatement, après vous être connecté.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Sorry about that. Here&#39;s a couple things to double check:</p><ul><li><p>You created the <code>profile.php</code> file and are logged in.</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p></div>

  </div></p>
