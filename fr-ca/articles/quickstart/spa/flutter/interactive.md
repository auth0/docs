---
title: Ajouter une fonctionnalité de connexion à votre application Flutter
description: Ce guide explique comment intégrer Auth0 à une application Flutter à l’aide de la trousse SDK Auth0 Flutter.
interactive:  true
files:
 - files/main_view
 - files/profile_view
github:
  path: sample
locale: fr-CA
---

# Ajouter une fonctionnalité de connexion à votre application Flutter


<p>Auth0 vous permet d’ajouter rapidement l’authentification et d’accéder aux informations relatives au profil de l’utilisateur dans votre application. Ce guide explique comment intégrer Auth0 à une application Flutter à l’aide de la trousse <a href="https://github.com/auth0/auth0-flutter" target="_blank" rel="noreferrer noopener">SDK Auth0 Flutter</a>.</p><p><div class="alert-container" severity="default"><p>La trousse SDK Flutter ne prend actuellement en charge que les applications Flutter s’exécutant sur les plateformes Android, iOS ou Web.</p></div></p><p>Ce guide rapide suppose que vous avez déjà une application <a href="https://flutter.dev/" target="_blank" rel="noreferrer noopener">Flutter</a> installée et active. Si ce n’est pas le cas, consultez les <a href="https://docs.flutter.dev/get-started/install" target="_blank" rel="noreferrer noopener">guides de démarrage de Flutter</a> pour commencer l’utilisation d’une application simple.</p><p>Vous devez également être familiarisé avec l’<a href="https://docs.flutter.dev/reference/flutter-cli" target="_blank" rel="noreferrer noopener">outil de ligne de commande Flutter</a>.</p><p></p>

## Configuration d’Auth0


<p>Lorsque vous vous êtes inscrit à Auth0, une nouvelle application a été créée pour vous, ou vous auriez pu en créer une nouvelle. Vous aurez besoin de quelques informations à propos de cette application pour communiquer avec Auth0. Vous pouvez obtenir ces informations dans la section <a href="https://manage.auth0.com/#/applications" target="_blank" rel="noreferrer noopener">Paramètres d’application</a> d’Auth0 Dashboard.</p><img src="//images.ctfassets.net/cdy7uua7fh8z/6SC7KnyzCyO8cwXQfril1X/7f204d6b4eb87562043e7f1083aca651/My_App_-_Settings_-_French.png" alt="null" /><p><div class="alert-container" severity="default"><p>Si vous utilisez l’application par défaut avec une application native ou une application à page unique, veillez à mettre à jour la <b>méthode d’authentification du point de terminaison des jetons</b> en la réglant sur <code>None</code> et à définir le <b>type d’application</b> sur <code>SPA</code> ou <code>Native</code>.</p></div></p><p>Les informations suivantes sont nécessaires :</p><ul><li><p><b>Domaine</b></p></li><li><p><b>Identifiant client</b></p></li></ul><p><b></b><div class="alert-container" severity="default"><p>Si vous téléchargez l’exemple en haut de cette page, les détails sont renseignés pour vous.</p></div></p><h3>Configuration des URL de rappel</h3><p>Une URL de rappel est une URL intégrée dans votre application vers laquelle Auth0 redirige l’utilisateur après qu’il s’est authentifié. L’URL de rappel de votre application doit être ajoutée au champ <b>URL de rappel autorisées</b> dans les <a href="https://manage.auth0.com/#/applications" target="_blank" rel="noreferrer noopener">Paramètres d’application</a>. Si ce champ n’est pas défini, les utilisateurs ne pourront pas se connecter à l’application et obtiendront un message d’erreur.</p><p><div class="alert-container" severity="default"><p>Si vous suivez l’exemple de projet que vous avez téléchargé en haut de cette page, vous devez définir l’<b>URL de rappel autorisée</b> sur <code>http://localhost:3000</code>.</p></div></p><h3>Configuration des URL de déconnexion</h3><p>Une URL de déconnexion est une URL intégrée dans votre application vers laquelle Auth0 peut se rediriger une fois que l’utilisateur a été déconnecté du serveur d’autorisations. Cette URL est spécifiée dans le paramètre de requête <code>returnTo</code>. L’URL de déconnexion de votre application doit être ajoutée au champ <b>URL de déconnexions autorisées</b> dans les <a href="https://manage.auth0.com/#/applications" target="_blank" rel="noreferrer noopener">Application Settings (Paramètres d’application)</a>. Si ce champ n’est pas défini, les utilisateurs ne pourront pas se déconnecter de l’application et obtiendront un message d’erreur.</p><p><div class="alert-container" severity="default"><p>Si vous suivez l’exemple de projet que vous avez téléchargé en haut de cette page, l’URL de déconnexion que vous devez ajouter au champ <b>URL de déconnexions autorisées</b> est <code>http://localhost:3000</code>.</p></div></p><h3>Configurer les origines Web autorisées</h3><p>Vous devez ajouter l’URL de votre application au champ <b>Origines Web autorisées</b> dans vos <a href="https://manage.auth0.com/#/applications/%7ByourClientId%7D/settings" target="_blank" rel="noreferrer noopener">Application Settings (Paramètres d’application)</a>. Si vous n’enregistrez pas l’URL de votre application ici, l’application ne pourra pas actualiser silencieusement les jetons d’authentification et vos utilisateurs seront déconnectés la prochaine fois qu’ils visiteront l’application ou qu’ils actualiseront la page.</p><p><div class="alert-container" severity="default"><p>Si vous suivez l’exemple de projet que vous avez téléchargé en haut de cette page, vous devez définir l’option <b>Origines Web autorisées</b> sur <code>http://localhost:3000</code>.</p></div></p><p></p>

## Installer la trousse SDK Flutter Auth0


<p>Ajoutez la trousse SDK Flutter Auth0 au projet :</p><p><pre><code class="language-javascript">flutter pub add auth0_flutter

</code></pre>

</p><p>Ajoutez l’étiquette de script suivante à votre page <code>index.html</code> :</p><p><pre><code class="language-javascript">&lt;script src=&quot;https://cdn.auth0.com/js/auth0-spa-js/2.0/auth0-spa-js.production.js&quot; defer&gt;&lt;/script&gt;

</code></pre>

</p>

## Ajouter une fonctionnalité de connexion à votre application {{{ data-action="code" data-code="main_view.dart" }}}


<p>La <a href="https://auth0.com/docs/authenticate/login/auth0-universal-login" target="_blank" >connexion universelle</a> est le moyen le plus simple de mettre en place l’authentification dans votre application. Nous recommandons de l’utiliser pour une meilleure expérience, une meilleure sécurité et un plus grand nombre de fonctionnalités.</p><p>Intégrez la connexion universelle Auth0 dans votre application Flutter (Web) en utilisant la classe <code>Auth0Web</code>. Redirigez vos utilisateurs vers la page de connexion universelle Auth0 en utilisant <code>loginWithRedirect()</code>.</p><p><div class="alert-container" severity="default"><p>Vous devrez normalement définir le paramètre <code>redirectUrl</code> sur <code>loginWithRedirect</code>. Si ce paramètre n’est pas spécifié, Auth0 utilisera la <a href="https://auth0.com/docs/authenticate/login/auth0-universal-login/configure-default-login-routes" target="_blank" >route de connexion par défaut</a>, qui n’est pas configurée par défaut.</p></div></p><p>Lorsqu’un utilisateur se connecte, il est redirigé vers votre application. Vous pouvez alors accéder à l’identificateur et aux jetons d’accès de cet utilisateur en appelant <code>onLoad</code> lors du démarrage et en gérant les informations d’identification qui vous sont communiquées :</p><p><pre><code class="language-javascript">auth0.onLoad().then((final credentials) =&gt; setState(() {

    // Handle or store credentials here

    _credentials = credentials;

  }));

</code></pre>

</p><p><div class="checkpoint">Flutter Web – Étape 3 – Point de contrôle <div class="checkpoint-default"><p>Ajoutez un bouton à votre application qui appelle <code>loginWithRedirect()</code> et déconnecte l’utilisateur de votre application. Vérifiez que vous êtes redirigé vers Auth0 pour l’authentification, puis renvoyé vers votre application.</p><p>Vérifiez que vous pouvez accéder aux <code>credentials</code> après avoir appelé <code>onLoad</code> et que vous pouvez accéder à l’identifiant et aux jetons d’accès.</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Si votre application n’a pas été lancée avec succès :</p><ul><li><p>Assurez-vous que les URL de rappel autorisées sont correctement définies</p></li><li><p>Vérifiez que vous avez enregistré vos modifications après avoir saisi vos URL</p></li><li><p>Assurez-vous que les valeurs de domaine et d’identifiant client sont importées correctement</p></li></ul><p>Vous rencontrez toujours des problèmes? Consultez notre <a href="https://auth0.com/docs" target="_blank" >documentation</a> ou la <a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">page de notre communauté</a> pour obtenir de l’aide.</p></div>

  </div></p>

## Ajouter une fonctionnalité de déconnexion à votre application


<p>Pour déconnecter les utilisateurs, redirigez-les vers le point de terminaison Auth0 pour effacer leur session de connexion en appelant la trousse SDK Flutter Auth0 <code>logout()</code>. <a href="https://auth0.com/docs/authenticate/login/logout" target="_blank" >En savoir plus sur la déconnexion d’Auth0</a>.</p><p><div class="alert-container" severity="default"><p>Vous devez normalement spécifier <code>returnToUrl</code> lorsque vous appelez <code>logout</code>, sinon Auth0 <a href="https://auth0.com/docs/authenticate/login/logout/redirect-users-after-logout" target="_blank" >utilisera par défaut la première URL de la liste URL de déconnexion autorisées</a>.</p></div></p><p><div class="checkpoint">Flutter (Web) - Étape 4 - Point de contrôle <div class="checkpoint-default"><p>Ajoutez un bouton à votre application qui appelle <code>logout()</code> et déconnecte l’utilisateur de votre application. Lorsque vous le sélectionnez, vérifiez que votre application Flutter vous redirige vers le point de terminaison de déconnexion et vice-versa. Vous ne devriez pas être connecté à votre application.</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Si votre application n’a pas réussi à se déconnecter :</p><ul><li><p>Assurez-vous que les URL de déconnexion autorisées sont correctement définies</p></li><li><p>Vérifiez que vous avez enregistré vos modifications après avoir saisi vos URL</p></li></ul><p>Vous rencontrez toujours des problèmes? Consultez notre <a href="https://auth0.com/docs" target="_blank" >documentation</a> ou la <a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">page de notre communauté</a> pour obtenir de l’aide.</p></div>

  </div></p>

## Afficher les informations du profil utilisateur {{{ data-action="code" data-code="profile_view.dart" }}}


<p>Le profil utilisateur récupère automatiquement les propriétés du profil utilisateur lors du chargement de la page. Il est possible d’y accéder et de les stocker en appelant <code>onLoad</code> lors du démarrage de l’application. L’objet retourné à partir de <code>onLoad</code> contient une propriété <code>user</code> avec toutes les propriétés du profil utilisateur. Cette propriété est alimentée en interne par le décodage du jeton d’ID.</p><p><div class="checkpoint">Flutter (Web) - Étape - Point de contrôle <div class="checkpoint-default"><p>Connectez-vous et inspectez la propriété <code>user</code> par rapport au résultat. Vérifiez les informations de profil utilisateur actuel, telles que son <code>email</code> ou <code>name</code>.</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Si votre application n’a pas renvoyé d’informations sur le profil utilisateur :</p><ul><li><p>Vérifiez la validité du jeton d’ID</p></li></ul><p>Vous rencontrez toujours des problèmes? Consultez notre <a href="https://auth0.com/docs" target="_blank" >documentation</a> ou la <a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">page de notre communauté</a> pour obtenir de l’aide.</p></div>

  </div></p>
