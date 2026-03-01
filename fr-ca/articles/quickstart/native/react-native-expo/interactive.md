---
title: Ajouter une fonctionnalité de connexion à votre application Expo
description: Ce guide explique comment intégrer Auth0, ajouter l’authentification et afficher les informations de profil utilisateur dans n’importe quelle application Expo à l’aide de la trousse SDK React Native Auth0.
interactive:  true
files:
 - files/App
 - files/app
github:
  path: 00-Login
locale: fr-CA
---

# Ajouter une fonctionnalité de connexion à votre application Expo


<p>Ce guide rapide est destiné au cadre Expo. Pour intégrer Auth0 dans votre application React Native, reportez-vous au <a data-contentfulid="1wLtNQQy4UsKwDEEhJkGeJ-fr-CA">Guide rapide React Native</a>.</p><p><div class="alert-container" severity="warning"><p>Cette trousse SDK n’est pas compatible avec l’application &quot;Expo Go&quot;. Elle est uniquement compatible avec les versions Custom Dev Client et EAS.</p></div></p><p></p>

## Configuration d’Auth0


<p>Pour utiliser les services Auth0, vous devez avoir une application installée dans Auth0 Dashboard. L’application Auth0 est l’endroit où vous allez configurer l’authentification pour votre projet.</p><h3>Configurer une application</h3><p>Utilisez le sélecteur interactif pour créer une nouvelle application Auth0 ou sélectionner une application existante qui représente le projet avec lequel vous souhaitez effectuer l’intégration. Dans Auth0, il est attribué à chaque application un identifiant client unique alphanumérique que votre code d’application utilisera pour appeler les API Auth0 via la trousse SDK.</p><p>Tous les paramètres que vous configurez à l’aide de ce démarrage rapide seront automatiquement mis à jour pour votre application dans le <a href="https://manage.auth0.com/" target="_blank" rel="noreferrer noopener">Dashboard</a>, qui est l’endroit où vous pourrez gérer vos Applications à l’avenir.</p><p>Si vous préférez explorer une configuration complète, consultez plutôt un exemple d’application.</p><h3>Configuration des URL de rappel et des URL de déconnexion.</h3><p>Auth0 fait appel aux Callback URL et aux URL de déconnexion pour rediriger les utilisateurs vers votre application. Auth0 fait appel à une URL de rappel après avoir authentifié l’utilisateur et à une URL de déconnexion après avoir supprimé le témoin de session. Si vous ne définissez pas les Callback URL et les URL de déconnexion, les utilisateurs ne pourront pas se connecter et se déconnecter de l’application, et votre application produira une erreur.</p><p>Ajoutez l’URL correspondante aux <b>URL de rappel</b> et aux <b>URL de déconnexion</b>, en fonction de la plateforme de votre application. Si vous utilisez un <a data-contentfulid="UYjAbgxX33g81azZ6VHWc-fr-CA">domaine personnalisé</a>, utilisez la valeur de votre domaine personnalisé au lieu du domaine de votre locataire Auth0.</p><h4>iOS</h4><p><code>BUNDLE_IDENTIFIER.auth0://{yourDomain}/ios/BUNDLE_IDENTIFIER/callback</code></p><h4>Android</h4><p><code>PACKAGE_NAME.auth0://{yourDomain}/android/PACKAGE_NAME/callback</code></p><p><code></code><div class="alert-container" severity="default"><p>Si vous suivez notre exemple de projet, utilisez la valeur suivante :</p><ul><li><p>iOS : <code>com.auth0samples.auth0://{yourDomain}/ios/com.auth0samples/callback</code></p></li><li><p>Android : <code>com.auth0samples.auth0://{yourDomain}/android/com.auth0samples/callback</code></p></li></ul><p></p></div></p>

## Installer les dépendances


<p>Dans cette section, vous apprendrez comment installer le module React Native Auth0.</p><p><div class="alert-container" severity="default"><p>Veuillez vous reporter à la <a href="https://facebook.github.io/react-native/" target="_blank" rel="noreferrer noopener">documentation officielle</a> pour plus de détails sur React Native.</p></div></p><h3>Yarn</h3><p><code>yarn add react-native-auth0</code></p><p><div class="alert-container" severity="default"><p>Pour en savoir plus sur <code>yarn</code>, consultez leur <a href="https://yarnpkg.com/en/docs" target="_blank" rel="noreferrer noopener">documentation officielle</a>.</p></div></p><h3>npm</h3><p><code>npm install react-native-auth0 --save</code></p>

## Configuration du plugiciel Auth0 Config {{{ data-action="code" data-code="app.json#10:15" }}}


<p>Le package Auth0 exécute du code natif personnalisé qui doit être configuré au moment de la génération. Utilisez le <a href="https://docs.expo.dev/guides/config-plugins/" target="_blank" rel="noreferrer noopener">plugiciel Expo Config</a> pour y parvenir.</p><p>Le plugiciel <code>react-native-auth0</code> sera ajouté dans <a href="https://docs.expo.dev/workflow/configuration/" target="_blank" rel="noreferrer noopener">Expo config</a>.</p>

## Générer le code source natif {{{ data-action="code" data-code="app.json#31:36" }}}


<p>Vous devez générer le code natif pour que la configuration ci-dessus soit définie. Pour ce faire, exécutez la commande suivante :</p><p><code>expo prebuild</code></p><p>Vous serez invité à fournir le <a href="https://github.com/expo/fyi/blob/main/android-package.md" target="_blank" rel="noreferrer noopener">package Android</a> et l’<a href="https://github.com/expo/fyi/blob/main/bundle-identifier.md" target="_blank" rel="noreferrer noopener">identificateur du bundle iOS</a> si ils ne sont pas déjà présents dans la configuration d’Expo.</p><p><pre><code>? What would you like your Android package name to be? &gt; com.auth0samples # or your desired package name



? What would you like your iOS bundle identifier to be? &gt; com.auth0samples # or your desired bundle identifier

</code></pre>

</p><p>Ces valeurs sont utilisées pour définir les Callback URL et les URL de déconnexion.</p><p></p>

## Configurer le composant Auth0Provider {{{ data-action="code" data-code="App.js#46:48" }}}


<p>L’appel <code>useAuth0</code> s’appuie sur un contexte React pour fournir une gestion d’état. Ce contexte est fourni par le composant <code>Auth0Provider</code>.</p><p>Importer l’appel <code>useAuth0</code> et le composant <code>Auth0Provider</code> du package <code>react-native-auth0</code> :</p><p><pre><code class="language-javascript">import {useAuth0, Auth0Provider} from 'react-native-auth0';

</code></pre>

</p><p>Pour que la trousse SDK fonctionne correctement, vous devez intégrer votre application dans le composant <code>Auth0Provider</code> et définir les propriétés suivantes :</p><ul><li><p><code>domain</code> : Le domaine de votre locataire Auth0. En général, vous le trouvez dans Auth0 Dashboard sous vos <b>paramètres</b> d’application dans le champ <b>Domain (Domaine)</b>. Si vous utilisez un <a data-contentfulid="UYjAbgxX33g81azZ6VHWc-fr-CA">domaine personnalisé</a>, indiquez dans ce champ votre domaine personnalisé.</p></li><li><p><code>clientId</code> : L’identificateur du client de l’application Auth0 que vous avez configurée précédemment dans ce guide rapide. Vous pouvez le trouver dans Auth0 Dashboard sous vos <b>paramètres</b> d’application dans le champ <b>Client ID (Identificateur client)</b>.</p></li></ul><p><div class="checkpoint">Expo - Étape 5 - Configurer le composant Auth0Provider <div class="checkpoint-default"><p>Votre composant <code>Auth0Provider</code> devrait maintenant être correctement configuré. Exécutez votre application pour vérifier que :</p><ul><li><p>la trousse SDK est correctement initialisée,</p></li><li><p>votre application ne génère aucune erreur liée à Auth0.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Si votre application n’a pas été lancée avec succès :</p><ul><li><p>assurez-vous que la bonne application est sélectionnée</p></li><li><p>avez-vous procédé à un enregistrement après avoir saisi vos URL?</p></li><li><p>assurez-vous que vos valeurs de domaine et d’identifiant client sont correctes</p></li></ul><p>Vous rencontrez toujours des problèmes? Consultez notre <a href="https://auth0.com/docs" target="_blank" >documentation</a> ou la <a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">page de notre communauté</a> pour obtenir de l’aide.</p><p></p></div>

  </div></p>

## Ajouter une fonctionnalité de connexion à votre application {{{ data-action="code" data-code="App.js#8:14" }}}


<p>Authentifiez l’utilisateur en appelant la méthode <code>authorize</code> fournie par le hook <code>useAuth0</code>. Cette action redirige l’utilisateur vers la page <a data-contentfulid="67MpEy8zCywwI8YMkn5jy1-fr-CA">Universal Login (Connexion universelle)</a> Auth0 pour authentification, puis vers votre application.</p><p>Pour confirmer que l’utilisateur s’est connecté avec succès, vérifiez que la propriété <code>user</code> fournie par le hook n’est pas <code>null</code>.</p><p><div class="checkpoint">Expo - Étape 6 - Ajouter une fonctionnalité de connexion à votre application <div class="checkpoint-default"><p>Ajoutez un bouton qui appelle <code>authorize</code> lorsqu’on clique dessus. Vérifiez que vous êtes redirigé vers la page de connexion, puis renvoyé vers votre application.</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Si votre application n’a pas été lancée avec succès :</p><ul><li><p>assurez-vous que les URL de rappel autorisées sont correctement définies</p></li><li><p>vérifiez que vous avez enregistré vos modifications après avoir saisi vos URL</p></li><li><p>assurez-vous que les valeurs de domaine et d’identifiant client sont importées correctement</p></li><li><p>si vous utilisez Android, assurez-vous que les paramètres fictifs du manifeste ont été correctement configurés, sinon la redirection vers votre application risque de ne pas fonctionner</p></li></ul><p>Vous rencontrez toujours des problèmes? Consultez notre <a href="https://auth0.com/docs" target="_blank" >documentation</a> ou la <a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">page de notre communauté</a> pour obtenir de l’aide.</p></div>

  </div></p>

## Ajouter une fonctionnalité de déconnexion à votre application {{{ data-action="code" data-code="App.js#16:22" }}}


<p>Pour déconnecter l’utilisateur, redirigez-le vers le point de terminaison Auth0 en appelant <code>clearSession</code>. Cela supprimera leur session du serveur d’autorisations et déconnectera l’utilisateur de l’application.</p><p><div class="checkpoint">Expo - Étape 7 - Ajouter une fonctionnalité de déconnexion à votre application <div class="checkpoint-default"><p>Ajoutez un bouton qui appelle <code>clearSession</code> et observez si vous êtes redirigé vers le point de terminaison de déconnexion Auth0, puis renvoyé de nouveau. Vous ne devriez plus être connecté à votre application.</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Si votre application ne s’est pas déconnectée avec succès :</p><ul><li><p>assurez-vous que les URL de déconnexion autorisées sont correctement définies</p></li><li><p>vérifiez que vous avez enregistré vos modifications après avoir saisi vos URL</p></li></ul><p>Vous rencontrez toujours des problèmes? Consultez notre <a href="https://auth0.com/docs" target="_blank" >documentation</a> ou la <a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">page de notre communauté</a> pour obtenir de l’aide.</p></div>

  </div></p>

## Afficher les informations du profil utilisateur {{{ data-action="code" data-code="App.js#32:34" }}}


<p>Le hook <code>useAuth0</code> expose un objet <code>user</code> qui contient des informations sur l’utilisateur authentifié. Vous pouvez utiliser cette option pour accéder aux informations du profil utilisateur sur l’utilisateur authentifié qui a été décodé à partir de <a href="https://auth0.com/docs/secure/tokens/id-tokens" target="_blank" >Jeton d’ID</a>.</p><p>Si un utilisateur n’a pas été authentifié, cette propriété sera <code>null</code>.</p><p><div class="checkpoint">Expo - Étape 8 - Afficher les informations du profil utilisateur <div class="checkpoint-default"><p>Connectez-vous et inspectez la propriété <code>user</code> par rapport au résultat. Vérifiez les informations de profil utilisateur actuel, telles que son <code>email</code> ou <code>name</code>.</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"></div>

  </div></p>
