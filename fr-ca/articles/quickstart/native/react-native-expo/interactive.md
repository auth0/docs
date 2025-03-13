---
title: Ajouter une fonctionnalité de connexion à votre application Expo
description: Ce guide explique comment intégrer Auth0, ajouter l’authentification et afficher les informations de profil utilisateur dans n’importe quelle application Expo à l’aide de la trousse SDK React Native Auth0.
interactive:  true
files:
 - files/App
 - files/app
github:
  path: https://github.com/auth0-samples/auth0-react-native-sample/tree/master/00-Login
locale: fr-CA
---

# Ajouter une fonctionnalité de connexion à votre application Expo


<p>Ce guide rapide est destiné au cadre Expo. Pour intégrer Auth0 dans votre application React Native, reportez-vous au <a data-contentfulid="1wLtNQQy4UsKwDEEhJkGeJ-fr-CA">Guide rapide React Native</a>.</p><p><div class="alert-container" severity="warning"><p>Cette trousse SDK n’est pas compatible avec l’application &quot;Expo Go&quot;. Elle est uniquement compatible avec les versions Custom Dev Client et EAS.</p></div></p><p></p>

## Configurer Auth0


<p>Pour utiliser les services Auth0, vous devez avoir une application installée dans Auth0 Dashboard. Vous allez configurer l’authentification pour votre projet dans l&#39;application Auth0.</p><h3>Configurer une application</h3><p>Utilisez le sélecteur interactif pour créer une nouvelle application Auth0 ou sélectionner une application existante qui représente le projet avec lequel vous souhaitez vous intégrer. Dans Auth0, il est attribué à chaque application un identificateur client unique alphanumérique que votre code d’application utilisera pour appeler les API Auth0 via la trousse SDK.</p><p>Tous les paramètres que vous configurez à l’aide de ce guide rapide seront automatiquement mis à jour pour votre application dans le <a href="https://manage.auth0.com/">Dashboard</a>, qui vous permettra de gérer vos applications.</p><p>Consultez un exemple d&#39;application si vous préférez explorer une configuration complète.</p><h3>Configurer des URL Callback et de déconnexion</h3><p>Auth0 fait appel aux URL Callback et de déconnexion pour rediriger les utilisateurs vers votre application. Auth0 fait appel à une Callback URL après avoir authentifié l’utilisateur et à une URL de déconnexion après avoir supprimé le témoin de session. Si vous ne définissez pas les URL Callback et de déconnexion, les utilisateurs ne pourront pas se connecter et se déconnecter de l’application, et votre application produira une erreur.</p><p>Ajoutez l’URL correspondante aux <b>URL Callback</b> et aux <b>URL de déconnexion</b>, en fonction de la plateforme de votre application. Si vous utilisez un <a data-contentfulid="UYjAbgxX33g81azZ6VHWc-fr-CA">domaine personnalisé</a>, utilisez la valeur de votre domaine personnalisé au lieu du domaine de votre locataire Auth0.</p><h4>iOS</h4><p><code>BUNDLE_IDENTIFIER.auth0://{yourDomain}/ios/BUNDLE_IDENTIFIER/callback</code></p><h4>Android</h4><p><code>PACKAGE_NAME.auth0://{yourDomain}/android/PACKAGE_NAME/callback</code></p><p><div class="alert-container" severity="default"><p>Si vous suivez notre exemple de projet, utilisez la valeur suivante :</p><ul><li><p>iOS : <code>com.auth0samples.auth0://{yourDomain}/ios/com.auth0samples/callback</code></p></li><li><p>Android : <code>com.auth0samples.auth0://{yourDomain}/android/com.auth0samples/callback</code></p></li></ul><p></p></div></p>

## Installer des dépendances


<p>Dans cette section, vous apprendrez comment installer le module React Native Auth0.</p><p><div class="alert-container" severity="default"><p>Veuillez vous reporter à la <a href="https://facebook.github.io/react-native/">documentation officielle</a> pour plus de détails sur React Native.</p></div></p><h3>Yarn</h3><p><code>yarn add react-native-auth0</code></p><p><div class="alert-container" severity="default"><p>Pour en savoir plus sur <code>yarn</code>, consultez leur <a href="https://yarnpkg.com/en/docs">documentation officielle</a>.</p></div></p><h3>npm</h3><p><code>npm install react-native-auth0 --save</code></p>

## Configuration du Auth0 Config Plugin {{{ data-action="code" data-code="app.json#10:15" }}}


<p>Le package Auth0 exécute du code natif personnalisé qui doit être configuré au moment de la compilation. Utilisez le <a href="https://docs.expo.dev/guides/config-plugins/">Expo Config Plugin</a> pour y parvenir.</p><p>Le plugiciel <code>react-native-auth0</code> sera ajouté dans <a href="https://docs.expo.dev/workflow/configuration/">Expo config</a>.</p>

## Générer le code source natif {{{ data-action="code" data-code="app.json#31:36" }}}


<p>Vous devez générer le code natif pour que la configuration ci-dessus soit définie. Pour ce faire, exécutez la commande suivante :</p><p><code>expo prebuild</code></p><p>Vous serez invité à fournir le <a href="https://github.com/expo/fyi/blob/main/android-package.md">package Android</a> et <a href="https://github.com/expo/fyi/blob/main/bundle-identifier.md">l’identificateur du bundle iOS</a> si ils ne sont pas déjà présents dans la configuration d’Expo.</p><p><pre><code>? What would you like your Android package name to be? &gt; com.auth0samples # or your desired package name



? What would you like your iOS bundle identifier to be? &gt; com.auth0samples # or your desired bundle identifier

</code></pre>

</p><p>Ces valeurs sont utilisées pour définir les URL Callback et de déconnexion.</p><p></p>

## Configurer le composant Auth0Provider {{{ data-action="code" data-code="App.js#46:48" }}}


<p>L&#39;appel <code>useAuth0</code> s’appuie sur un contexte React pour fournir une gestion d’état. Ce contexte est fourni par le composant <code>Auth0Provider</code>.</p><p>Importez l&#39;appel <code>useAuth0</code> et le composant <code>Auth0Provider</code> du package <code>react-native-auth0</code> :</p><p><pre><code class="language-javascript">import {useAuth0, Auth0Provider} from 'react-native-auth0';

</code></pre>

</p><p>Pour que la trousse SDK fonctionne correctement, vous devez intégrer votre application dans le composant <code>Auth0Provider</code> et définir les propriétés suivantes :</p><ul><li><p><code>domain</code> : le domaine de votre locataire Auth0. En général, vous le trouvez dans Auth0 Dashboard sous les <b>Application Settings (Paramètres d&#39;application)</b> du champ <b>Domain (Domaine)</b>. Si vous utilisez un <a data-contentfulid="UYjAbgxX33g81azZ6VHWc-fr-CA">domaine personnalisé</a>, définissez-le plutôt sur la valeur de votre domaine personnalisé.</p></li><li><p><code>clientId</code> : l&#39;identificateur client de l’application Auth0 que vous avez configuré précédemment dans ce guide rapide. Il se trouve dans Auth0 Dashboard sous les <b>Settings (Paramètres)</b> de votre application, dans le champ <b>Client ID (Identificateur client)</b>.</p></li></ul><p><div class="checkpoint">Expo - Étape 5 - Configurer le composant Auth0Provider <div class="checkpoint-default"><p>Votre composant <code>Auth0Provider</code> devrait maintenant être correctement configuré. Exécutez votre application pour vérifier que :</p><ul><li><p>la trousse SDK est initialisée correctement,</p></li><li><p>votre application ne génère aucune erreur liée à Auth0.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>If your application did not launch successfully:</p><ul><li><p>make sure the correct application is selected</p></li><li><p>did you save after entering your URLs?</p></li><li><p>ensure your domain and client ID values are correct</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p><p></p></div>

  </div></p>

## Ajouter une fonctionnalité de connexion à votre application {{{ data-action="code" data-code="App.js#8:14" }}}


<p>Authentifiez l’utilisateur en appelant la méthode <code>authorize</code> fournie par l&#39;appel <code>useAuth0</code>. Cette action redirige l’utilisateur vers la page de <a data-contentfulid="67MpEy8zCywwI8YMkn5jy1-fr-CA">Connexion universelle</a> Auth0 pour authentification, puis vers votre application.</p><p>Pour confirmer que l’utilisateur a bien ouvert une session, vérifiez que la propriété <code>user</code> fournie par le crochet n’est pas <code>null</code>.</p><p><div class="checkpoint">Expo - Étape 6 - Ajouter une fonctionnalité de connexion à votre application <div class="checkpoint-default"><p>Ajoutez un bouton qui appelle <code>authorize</code> lorsqu’on clique dessus. Vérifiez que vous êtes redirigé vers la page de connexion, puis vers votre application.</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>If your application did not launch successfully:</p><ul><li><p>ensure you set the Allowed Callback URLs are correct</p></li><li><p>verify you saved your changes after entering your URLs</p></li><li><p>make sure the domain and client ID values are imported correctly</p></li><li><p>if using Android, ensure that the manifest placeholders have been set up correctly, otherwise the redirect back to your app may not work</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p></div>

  </div></p>

## Ajouter une fonctionnalité de déconnexion à votre application {{{ data-action="code" data-code="App.js#16:22" }}}


<p>Pour déconnecter l’utilisateur, redirigez-le vers le point de terminaison Auth0 en appelant <code>clearSession</code>. Cela supprimera leur session du serveur d’autorisations et déconnectera l’utilisateur de l’application.</p><p><div class="checkpoint">Expo - Étape 7 - Ajouter une fonctionnalité de déconnexion à votre application <div class="checkpoint-default"><p>Ajoutez un bouton de déconnexion qui appelle <code>clearSession</code> et observez que vous êtes redirigé vers le point de terminaison Auth0 et vice versa. Vous ne devriez plus être connecté à votre application.</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>If your application did not log out successfully:</p><ul><li><p>ensure the Allowed Logout URLs are set properly</p></li><li><p>verify you saved your changes after entering your URLs</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p></div>

  </div></p>

## Afficher les informations du profil utilisateur {{{ data-action="code" data-code="App.js#32:34" }}}


<p>L&#39;appel <code>useAuth0</code> expose un objet <code>user</code> qui contient des informations sur l’utilisateur authentifié. Vous pouvez utiliser cette option pour accéder aux informations du profil utilisateur sur l’utilisateur authentifié qui a été décodé à partir de <a href="https://auth0.com/docs/secure/tokens/id-tokens">ID token (Jeton d&#39;actualisation)</a>.</p><p>Si un utilisateur n’a pas été authentifié, cette propriété sera <code>null</code>.</p><p><div class="checkpoint">Expo - Étape 8 - Afficher les informations du profil utilisateur <div class="checkpoint-default"><p>Connectez-vous et inspectez la propriété <code>user</code> du résultat. Vérifiez les informations du profil utilisateur actuelles, telles que son <code>email</code> ou <code>name</code>.</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"></div>

  </div></p>
