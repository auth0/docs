---
title: Ajouter une connexion à votre application Android
description: Ce guide explique comment intégrer Auth0 à une application Android en utilisant la trousse SDK Auth0 Android.
interactive:  true
files:
 - files/build
 - files/strings
 - files/MainActivity
github:
  path: https://github.com/auth0-samples/auth0-android-sample/tree/master/00-Login-Kt
locale: fr-CA
---

# Ajouter une connexion à votre application Android


<p></p>

## Configurer Auth0


<p>Pour utiliser les services Auth0, vous devez avoir une application installée dans Auth0 Dashboard. Vous allez configurer l’authentification pour votre projet dans l’application Auth0.</p><h3>Configurer une application</h3><p>Utilisez le sélecteur interactif pour créer une nouvelle application Auth0 ou sélectionner une application existante qui représente le projet avec lequel vous souhaitez vous intégrer. Dans Auth0, il est attribué à chaque application un identificateur client unique alphanumérique que votre code d’application utilisera pour appeler les API Auth0 via la trousse SDK.</p><p>Tous les paramètres que vous configurez à l’aide de ce guide rapide seront automatiquement mis à jour pour votre application dans le <a href="https://manage.auth0.com/#/">Dashboard</a>, qui vous permettra de gérer vos applications.</p><p>Consultez un exemple d’application si vous préférez explorer une configuration complète.</p><h3>Configuration des Callback URL</h3><p>Une Callback URL est l’URL de l’application vers laquelle Auth0 dirigera vos utilisateurs une fois qu’ils se seront authentifiés. Si vous ne définissez pas cette valeur, Auth0 ne renverra pas les utilisateurs vers votre application après leur connexion.</p><p><div class="alert-container" severity="default"><p>Si vous suivez notre projet à titre d’exemple, définissez ceci sur <code>demo://{yourDomain}/android/YOUR_APP_PACKAGE_NAME/callback</code>.</p></div></p><h3>Configuration des URL de déconnexion</h3><p>Une URL de déconnexion est l’URL de l’application vers laquelle Auth0 redirigera vos utilisateurs une fois qu’ils se seront déconnectés. Si vous ne définissez pas cette valeur, les utilisateurs ne pourront pas se déconnecter de votre application et recevront un message d’erreur.</p><p><div class="alert-container" severity="default"><p>Si vous suivez notre projet à titre d’exemple, définissez ceci sur <code>demo://{yourDomain}/android/YOUR_APP_PACKAGE_NAME/callback</code></p></div></p>

## Installer la trousse SDK Android Auth0 {{{ data-action="code" data-code="build.gradle#18:18" }}}


<p>Ajoutez la trousse SDK <a href="https://github.com/auth0/Auth0.Android">Android Auth0</a> à votre projet. La bibliothèque adressera des demandes aux Authentication et Management API d’Auth0.</p><p>Dans la section dépendances du <code>build.gradle</code> de votre application, ajoutez ce qui suit :</p><p><pre><code class="language-javascript">implementation 'com.auth0.android:auth0:2. '

</code></pre>

</p><p>Veillez à cibler le code Java 8+ pour les plugiciels Android et Kotlin respectivement.</p>

## Ajouter des paramètres fictifs dans le manifeste {{{ data-action="code" data-code="build.gradle#10:12" }}}


<p>La trousse SDK nécessite des espaces réservés dans le manifeste. Auth0 utilise des espaces réservés en interne pour définir un <code>intent-filter</code>, qui capture la Callback URL d’authentification. Vous devez définir le domaine du locataire Auth0 et le schéma de la Callback URL.</p><p>Vous n’avez pas besoin de déclarer un <code>intent-filter</code> spécifique pour votre activité car vous avez défini les paramètres fictifs dans le manifeste avec vos valeurs Auth0 <b>Domaine</b> et <b>Schéma</b> et la bibliothèque traitera la redirection pour vous.</p><p><div class="alert-container" severity="default"><p>Nous avons utilisé la valeur <code>demo</code> pour <code>auth0Scheme</code> ici, afin qu’un schéma d’URL personnalisé puisse être utilisé pour l’URL vers laquelle Auth0 redirige après la connexion. L’alternative est <code>https</code> si vous voulez utiliser des <a href="https://auth0.com/docs/applications/enable-android-app-links">liens vers les applications Android</a>. Vous pouvez en savoir plus sur la définition de cette valeur dans le <a href="https://github.com/auth0/Auth0.Android#a-note-about-app-deep-linking">SDK README d’Auth0.Android</a>.</p></div></p>

## Configuration de votre application {{{ data-action="code" data-code="strings.xml#2:3" }}}


<p>Pour que la trousse SDK fonctionne correctement, définissez les propriétés suivantes dans <code>strings.xml</code> :</p><ul><li><p><code>com_auth0_domain</code>: le domaine de votre locataire Auth0. En général, vous le trouvez dans Auth0 Dashboard sous vos paramètres d’application dans le champ Domain (Domaine). Si vous utilisez un <a href="https://auth0.com/docs/custom-domains">domaine personnalisé</a>, définissez-le plutôt sur la valeur de votre domaine personnalisé.</p></li><li><p><code>com_auth0_client_id</code>: identificateur de l’application Auth0 que vous avez configurée précédemment dans ce guide rapide. Vous pouvez la trouver dans Auth0 Dashboard, dans la rubrique des paramètres de votre application, dans le champ Client ID..</p></li></ul><p>Assurez-vous que le fichier <code>AndroidManifest.xml</code> spécifie l’autorisation <code>android.permissions.INTERNET</code> :</p><p><pre><code class="language-javascript">&lt;uses-permission android:name=&quot;android.permission.INTERNET&quot; /&gt;

</code></pre>

</p><p>Exécutez <b>Sync Project with Gradle Files</b> dans Android Studio ou exécutez <code>./gradlew clean assembleDebug</code> à partir de la ligne de commande.</p><p><div class="alert-container" severity="default"><p>Pour en savoir plus sur l’utilisation de Gradle, consultez la <a href="https://gradle.org/getting-started-android-build/">documentation officielle de Gradle</a>.</p></div></p>

## Ajouter une fonctionnalité de connexion à votre application {{{ data-action="code" data-code="MainActivity.kt#6:38" }}}


<p>La <a href="https://auth0.com/docs/hosted-pages/login">connexion universelle</a> est le moyen le plus simple de mettre en place l’authentification dans votre application. Nous recommandons de l’utiliser pour une meilleure expérience, une meilleure sécurité et un plus grand nombre de fonctionnalités.</p><p>Dans la méthode <code>onCreate</code>, créez une nouvelle instance de la classe <code>Auth0</code> qui contiendra les informations d’identification de l’utilisateur.</p><p>Créez une méthode <code>loginWithBrowser</code> et utilisez la classe <code>WebAuthProvider</code> pour vous authentifier avec n’importe quelle connexion que vous avez activée sur votre application dans <a href="https://manage.auth0.com/#/">Auth0 dashboard</a>. Ici, vous pouvez passer la valeur du schéma qui a été utilisée dans l’espace réservé du manifeste <code>auth0Scheme</code> dans le cadre de la configuration initiale.</p><p>Après avoir appelé la fonction <code>WebAuthProvider#start</code>, le navigateur se lance et affiche la page de connexion. Une fois l’utilisateur authentifié, la Callback URL est appelée. La Callback URL contient le résultat final du processus d’authentification.</p><p><div class="checkpoint">Guide rapide Android - Étape 5 - Point de contrôle <div class="checkpoint-default"><p>Ajoutez un bouton à votre application qui appelle <code>loginWithBrowser</code>. Lorsque vous cliquez dessus, vérifiez que votre application Android vous redirige vers la page de <a href="https://auth0.com/universal-login">connexion universelle Auth0</a> et que vous pouvez maintenant vous connecter ou vous inscrire en utilisant un nom d’utilisateur et un mot de passe, ou encore un réseau social.</p><p>Une fois l’opération terminée, vérifiez qu’Auth0 vous redirige vers votre application.</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>If your application did not launch successfully:</p><ul><li><p>Ensure you set the Allowed Callback URLs are correct</p></li><li><p>Verify you saved your changes after entering your URLs</p></li><li><p>Make sure the domain and cliend ID values imported correctly</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p></div>

  </div></p>

## Ajouter une fonctionnalité de déconnexion à votre application {{{ data-action="code" data-code="MainActivity.kt#40:52" }}}


<p>Utilisez <code>WebAuthProvider</code> pour supprimer le témoin défini par le navigateur au moment de l’authentification, de sorte que les utilisateurs soient obligés de saisir à nouveau leurs identifiants la prochaine fois qu’ils essaient de s’authentifier.</p><p>Ajoutez une méthode <code>logout</code> à votre application pour supprimer la session de l’utilisateur et le déconnecter de l’application. Ici, vous pouvez passer la valeur du schéma qui a été utilisée dans le paramètre fictif du manifeste <code>auth0Scheme</code> dans le cadre de la configuration initiale.</p><p>Utilisez la classe <code>WebAuthProvider</code> pour mettre en œuvre la déconnexion. Cet appel ouvre le navigateur et dirige l’utilisateur vers le point de terminaison de déconnexion. Si l’utilisateur annule la déconnexion, envisagez de le rediriger vers l’URL précédente.</p><p><div class="checkpoint">Guide rapide Android - Étape 6 - Point de contrôle <div class="checkpoint-default"><p>Ajoutez un bouton à votre application qui appelle <code>logout</code> et déconnecte l’utilisateur de votre application. Lorsque vous cliquez sur ce bouton, vérifiez que votre application Android vous redirige vers la page de déconnexion et vous renvoie, et que vous n’êtes plus connecté à votre application.</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>If your application did not logout successfully:</p><ul><li><p>Ensure the Allowed Logout URLs are set properly</p></li><li><p>Verify you saved your changes after entering your URLs</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p></div>

  </div></p>

## Afficher les informations du profil utilisateur {{{ data-action="code" data-code="MainActivity.kt#54:70" }}}


<p>Utilisez la classe <code>AuthenticationAPIClient</code> pour <a href="https://auth0.com/docs/users/user-profiles#user-profile-management-api-access">récupérer le profil utilisateur auprès de Auth0</a>. Pour ce faire, les éléments suivants sont nécessaires :</p><ul><li><p>Le jeton d’accès renvoyé par la phase de connexion</p></li><li><p>Le <code>WebAuthProvider.login</code> doit contenir la permission <code>profile</code></p></li></ul><p>Vous devez spécifier la permission <code>email</code> si vous avez besoin de récupérer l’adresse électronique de l’utilisateur.</p><p><div class="alert-container" severity="default"><p>Ce guide rapide définit par défaut les permissions <code>openid profile email</code> lors de l’étape de connexion ci-dessus.</p></div></p><p>L’exemple suivant démontre une fonction qui peut être utilisée pour récupérer le profil utilisateur et l’afficher à l’écran :</p><p><div class="checkpoint">Guide rapide Android - Étape 7 - Point de contrôle <div class="checkpoint-default"><p>Appelez la fonction <code>showUserProfile</code> après la connexion. Vérifiez que le callback <code>onSuccess</code> renvoie les informations du profil utilisateur.</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>If your application did not return user profile information:</p><ul><li><p>Verify the <code>accessToken</code> is valid</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p></div>

  </div></p>
