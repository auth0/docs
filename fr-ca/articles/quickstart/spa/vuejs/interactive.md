---
title: Ajouter une connexion à votre application Vue
description: Ce guide explique comment intégrer Auth0, ajouter l’authentification et afficher les informations de profil utilisateur dans n’importe quelle application Vue à l’aide de la trousse SDK Vue Auth0.
interactive:  true
files:
 - files/index
 - files/login
 - files/logout
 - files/profile
github:
  path: https://github.com/auth0-samples/auth0-vue-samples/tree/master/01-Login
locale: fr-CA
---

# Ajouter une connexion à votre application Vue


<p></p><p>Auth0 vous permet d’ajouter l’authentification à presque tous les types d’applications. Ce guide explique comment intégrer Auth0, ajouter l’authentification et afficher les informations de profil utilisateur dans n’importe quelle application Vue à l’aide de la trousse SDK Vue Auth0.</p><p><div class="alert-container" severity="warning"><p>Ce guide rapide est conçu pour l’utilisation de <a href="https://github.com/auth0/auth0-vue">Vue Auth0</a> avec des applications Vue 3. Si vous utilisez Vue 2, veuillez plutôt consulter le <a href="https://github.com/auth0/auth0-vue/blob/main/tutorial/vue2-login.md">tutoriel Vue 2 avec la trousse SDK Auth0 SPA</a> ou le guide <a href="https://developer.auth0.com/resources/guides/spa/vue/basic-authentication/v2-javascript">Vue.js Authentication 2 By Example</a>.</p></div></p><p>Pour utiliser ce guide rapide, vous aurez besoin de :</p><ul><li><p>Un compte Auth0 gratuit ou une connexion à Auth0.</p></li><li><p>Un projet Vue fonctionnel avec lequel vous souhaitez vous intégrer OU vous pouvez télécharger un exemple d’application après vous être connecté.</p></li></ul><p></p>

## Configurer Auth0


<p>Pour utiliser les services Auth0, vous devez avoir une application installée dans Auth0 Dashboard. L’application Auth0 est l’endroit où vous allez configurer le fonctionnement de l’authentification pour le projet que vous développez.</p><h3>Configurer une application</h3><p>Utilisez le sélecteur interactif pour créer une nouvelle application Auth0 ou sélectionner une application existante qui représente le projet avec lequel vous souhaitez vous intégrer. Dans Auth0, il est attribué à chaque application un identificateur client unique alphanumérique que votre code d’application utilisera pour appeler les API Auth0 via la trousse SDK.</p><p>Tous les paramètres que vous configurez à l’aide de ce guide rapide seront automatiquement mis à jour pour votre application dans le <a href="https://manage.auth0.com/dashboard/us/dev-1-2s2aq0/">Dashboard</a>, qui vous permettra de gérer vos applications.</p><p>Si vous préférez explorer une configuration complète, vous pouvez plutôt consulter une application faisant office d’exemple.</p><h3>Configuration des Callback URL</h3><p>Une Callback URL est une URL intégrée dans votre application vers laquelle vous souhaitez qu’Auth0 redirige les utilisateurs après leur authentification. Si elle n’est pas définie, les utilisateurs ne seront pas redirigés vers votre application après s’être connectés.</p><p><div class="alert-container" severity="default"><p>Si vous suivez notre projet à titre d’exemple, définissez ceci sur <code>http://localhost:3000</code>.</p></div></p><h3>Configuration des URL de déconnexion</h3><p>Une URL de déconnexion est une URL intégrée dans votre application vers laquelle vous souhaitez qu’Auth0 redirige les utilisateurs après leur déconnexion. Si elle n’est pas définie, les utilisateurs ne pourront pas se déconnecter de votre application et recevront un message d’erreur.</p><p><div class="alert-container" severity="default"><p>Si vous suivez notre projet à titre d’exemple, définissez ceci sur <code>http://localhost:3000</code>.</p></div></p><h3>Configurer Allowed Web Origins (Origines Web autorisées)</h3><p>Une origine Web autorisée est une URL que vous souhaitez autoriser à accéder à votre flux d’authentification.  Elle doit contenir l’URL de votre projet. Si elle n’est pas correctement configurée, votre projet ne pourra pas actualiser silencieusement les jetons d’authentification, ce qui entraînera la déconnexion de vos utilisateurs lors de leur prochaine visite à votre application ou lors de l’actualisation d’une page.</p><p><div class="alert-container" severity="default"><p>Si vous suivez notre projet à titre d’exemple, définissez ceci sur <code>http://localhost:3000</code>.</p></div></p>

## Installer la trousse SDK Vue Auth0 {{{ data-action="code" data-code="index.js" }}}


<p>Auth0 propose une trousse <a href="https://github.com/auth0/auth0-vue">SDK Vue</a> pour simplifier le processus d’implémentation de l’authentification et de l’autorisation Auth0 dans les applications Vue 3.</p><p>Installez la trousse SDK Vue Auth0 en exécutant les commandes suivantes dans votre terminal :</p><p><pre><code class="language-bash">cd &lt;your-project-directory&gt;

npm install @auth0/auth0-vue

</code></pre>

</p><h3>Enregistrer le plugiciel</h3><p>Pour que la trousse SDK fonctionne, vous devez enregistrer le plugiciel dans votre application Vue à l’aide des propriétés suivantes :</p><ul><li><p><code>domain</code> : Le domaine de votre locataire Auth0. Cette valeur se trouve dans Auth0 Dashboard sous les Settings (Paramètres) de votre application dans le champ Domain (Domaine). Si vous utilisez un <a href="https://auth0.com/docs/custom-domains">domaine personnalisé</a>, définissez ceci plutôt sur la valeur de votre domaine personnalisé.</p></li><li><p><code>clientId</code>: L’identificateur de l’application Auth0 que vous avez configurée précédemment dans ce guide rapide. Vous le trouverez dans Auth0 Dashboard sous les paramètres de votre application dans le champ Client ID (Identificateur client).</p></li><li><p><code>authorizationParams.redirect_uri</code> : L’URL dans votre application vers laquelle vous souhaitez qu’Auth0 redirige les utilisateurs après leur authentification. Cela correspond à l’URL de rappel que vous avez configurée précédemment dans ce guide rapide. Cette valeur se trouve dans Auth0 Dashboard, sous les Settings (Paramètres) de votre application, dans le champ Callback URLs (Callback URL). Assurez-vous que ce que vous saisissez dans votre code correspond à ce que vous avez configuré précédemment, au cas contraire, vos utilisateurs verront une erreur.</p></li></ul><p>Le plugiciel enregistrera la trousse SDK en utilisant à la fois <code>provide</code> et <code>app.config.globalProperties</code>. Cela permet d’activer à la fois la <a href="https://vuejs.org/guide/introduction.html#composition-api">Composition API</a> et l&#39;<a href="https://vuejs.org/guide/introduction.html#options-api">Options API</a>.</p><p><div class="checkpoint">Guide rapide Vue - Étape 2 - Point de contrôle <div class="checkpoint-default"><p>Le plugiciel est maintenant configuré. Exécutez votre application pour vérifier que :</p><ul><li><p>La trousse SDK est initialisée correctement.</p></li><li><p>Votre application ne génère aucune erreur liée à Auth0.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>If your application did not start successfully:</p><ul><li><p>Verify you selected the correct application</p></li><li><p>Save your changes after entering your URLs</p></li><li><p>Verify the domain and Client ID imported correctly</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p></div>

  </div></p>

## Ajouter une fonctionnalité de connexion à votre application {{{ data-action="code" data-code="login.js" }}}


<p>Vous allez ensuite configurer une connexion pour votre projet. Vous utiliserez la fonction <code>loginWithRedirect</code> de la trousse SDK exposée à la valeur de retour de <code>useAuth0</code>, à laquelle vous pouvez accéder dans la fonction de configuration de votre composant. Elle redirigera les utilisateurs vers la page de connexion universelle Auth0 et, après l’authentification de l’utilisateur, elle le redirigera vers la callback URL que vous avez configurée plus tôt dans ce guide rapide.</p><h3>Utilisation de l’Options API</h3><p>Si vous utilisez l’Options API, vous pouvez utiliser la même méthode <code>loginWithRedirect</code> à partir de la propriété globale <code>$auth0</code> via l’accesseur <code>this</code>.</p><p><div class="checkpoint">Guide rapide Vue - Étape 3 - Point de contrôle <div class="checkpoint-default"><p>Vous devriez maintenant être en mesure de vous connecter en utilisant la connexion universelle Auth0.</p><p>Appuyez sur le bouton de connexion et vérifiez que :</p><ul><li><p>votre application Vue vous redirige vers la page de connexion universelle d’Auth0,</p></li><li><p>vous pouvez vous connecter ou vous inscrire.</p></li><li><p>Auth0 vous redirige vers votre application en utilisant la valeur <code>authorizationParams.redirect_uri </code> que vous avez utilisée pour configurer le plugiciel. </p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>If you were not able to log in using Auth0 Universal Login:</p><ul><li><p>Verify you configured the correct <code>authorizationParams.redirect_uri</code></p></li><li><p>Verify the domain and Client ID are set correctly</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p></div>

  </div></p>

## Ajouter une fonctionnalité de déconnexion à votre application {{{ data-action="code" data-code="logout.js" }}}


<p>Les utilisateurs qui se connectent à votre projet auront également besoin d’un moyen de se déconnecter. Quand les utilisateurs se déconnectent, votre application les redirige vers votre point de terminaison de <a href="https://auth0.com/docs/api/authentication?javascript#logout">Auth0 logout (Déconnexion Auth0)</a>, qui les redirige ensuite vers le paramètre <code>logoutParams.returnTo</code> spécifié.</p><p>Utilisez la fonction <code>logout</code> exposée sur la valeur de retour de <code>useAuth0</code>, à laquelle vous pouvez accéder dans la fonction <code>setup</code> de votre composant, pour déconnecter l’utilisateur de votre application.</p><p></p><h3>Utilisation de l’Options API</h3><p>Avec l’Options API, vous pouvez utiliser la même méthode <code>logout</code> à partir de la propriété globale <code>$auth0</code> via l’accesseur <code>this</code>.</p><p><div class="checkpoint">Guide rapide Vue - Étape 4 - Point de contrôle <div class="checkpoint-default"><p>Executez votre application et cliquez sur le bouton de déconnexion, puis vérifiez que :</p><ul><li><p>votre application Vue vous redirige vers l’adresse <code>logoutParams.returnTo</code>,</p></li><li><p>vous n’êtes plus connecté à votre application.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"></div>

  </div></p>

## Afficher les informations du profil utilisateur {{{ data-action="code" data-code="profile.js" }}}


<p>Vous allez ensuite configurer la manière de récupérer les <a href="https://auth0.com/docs/users/concepts/overview-user-profile">informations de profil</a> associées aux utilisateurs authentifiés. Par exemple, vous voudrez peut-être pouvoir afficher le nom ou la photo de profil d’un utilisateur connecté dans votre projet. Une fois l’utilisateur authentifié, la trousse SDK extrait les informations du profil utilisateur et les stocke en mémoire. L’application peut accéder au profil utilisateur à l’aide de la propriété reactive <code>user</code>. Pour accéder à cette propriété, examinez la fonction <code>setup</code> de votre composant et trouvez la valeur de retour de <code>userAuth0</code>.</p><p>La propriété <code>user</code> contient des informations sensibles relatives à l’identité de l’utilisateur. Elle n’est disponible qu’en fonction de l’état d’authentification de l’utilisateur. Pour éviter les erreurs de rendu, vous devez toujours :</p><ul><li><p>Utiliser la propriété <code>isAuthenticated</code> pour déterminer si Auth0 a authentifié l’utilisateur avant que Vue ne rende un composant qui consomme la propriété <code>user</code>.</p></li><li><p>Vous assurer que la trousse SDK a fini de se charger en vérifiant que <code>isLoading</code> est false avant d’accéder à la propriété <code>isAuthenticated</code>.</p></li></ul><h3>Utilisation de l’Options API</h3><p>Pour l’Options API, utilisez les mêmes propriétés réactives <code>user</code>, <code>isLoading</code> et <code>isAuthenticated</code> de la propriété globale <code>$auth0</code> via l’accesseur <code>this</code>.</p><p><div class="checkpoint">Vue - Étape 5 - Point de contrôle <div class="checkpoint-default"><p>Verifiez que :</p><ul><li><p>vous pouvez afficher le <code>user</code> ou l’une des propriétés de l’utilisateur correctement dans un composant, après vous être connecté</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>If you are having issues with the <code>user</code> properties:</p><ul><li><p>Verify you added the <code>isLoading</code> check before accessing the <code>isAuthenticated</code> property</p></li><li><p>Verify you added the <code>isAuthenticated</code> check before accessing the <code>user</code> property</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p></div>

  </div></p>
