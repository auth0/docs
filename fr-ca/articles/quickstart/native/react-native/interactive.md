---
title: Ajouter une connexion à votre application React Native
description: Ce tutoriel explique comment ajouter la connexion utilisateur à une application React Native à l’aide d’Auth0.
interactive:  true
files:
 - files/app
github:
  path: https://github.com/auth0-samples/auth0-react-native-sample/tree/master/00-Login
locale: fr-CA
---

# Ajouter une connexion à votre application React Native


<p>Ce guide rapide est destiné au framework React Native. Pour intégrer Auth0 dans votre application Expo, référez-vous au <a href="https://auth0.com/docs/quickstart/native/react-native-expo/interactive">Guide rapide Expo</a>.</p><p></p>

## Configurer Auth0


<p>Pour utiliser les services Auth0, vous devez avoir une application installée dans Auth0 Dashboard. L’application Auth0 est l’endroit où vous allez configurer l’authentification pour votre projet.</p><h3>Configurer une application</h3><p>Utilisez le sélecteur interactif pour créer une nouvelle application Auth0 ou sélectionner une application existante qui représente le projet avec lequel vous souhaitez effectuer l’intégration. Dans Auth0, il est attribué à chaque application un identifiant client unique alphanumérique que votre code d’application utilisera pour appeler les API Auth0 via la trousse SDK.</p><p>Tous les paramètres que vous configurez à l’aide de ce guide rapide seront automatiquement mis à jour pour votre application dans le <a href="https://manage.auth0.com/#/">Dashboard</a>, qui est l’endroit où vous pourrez gérer vos applications à l’avenir.</p><p>Pour explorer une configuration complète, examinez l’application faisant office d’exemple dans votre tableau de bord.</p><h3>Configuration des callback URL et des URL de déconnexion.</h3><p>Auth0 fait appel aux callback URL et aux URL de déconnexion pour rediriger les utilisateurs vers votre application. Auth0 fait appel à une Callback URL après avoir authentifié l’utilisateur et à une URL de déconnexion après avoir supprimé le témoin de session. Si vous ne définissez pas les callback URL et les URL de déconnexion, les utilisateurs ne pourront pas se connecter et se déconnecter de l’application, et votre application produira une erreur.</p><p>Ajoutez l’URL correspondante aux <b>callback URL</b> et aux URL de <b>déconnexion</b>, en fonction de la plateforme de votre application. Si vous utilisez un <a data-contentfulid="UYjAbgxX33g81azZ6VHWc-fr-CA">domaine personnalisé</a>, utilisez la valeur de votre domaine personnalisé au lieu du domaine de votre locataire Auth0.</p><h4>iOS</h4><p><pre><code>BUNDLE_IDENTIFIER.auth0://${account.namespace}/ios/BUNDLE_IDENTIFIER/callback

</code></pre>

</p><h4>Android</h4><p><pre><code>PACKAGE_NAME.auth0://${account.namespace}/android/PACKAGE_NAME/callback

</code></pre>

</p><p><div class="alert-container" severity="default"><p>Si vous suivez notre exemple de projet, utilisez l’URL suivante :</p><ul><li><p><b>iOS</b> :</p><p><code>com.auth0samples.auth0://labs-fundtraining.us.auth0.com/ios/com.auth0samples/callback</code></p></li><li><p><b>Android</b> :</p><p><code>com.auth0samples.auth0://labs-fundtraining.us.auth0.com/android/com.auth0samples/callback</code></p></li></ul><p></p></div></p><p></p>

## Installer les dépendances


<p>Dans cette section, vous installerez le module React Native Auth0.</p><p><div class="alert-container" severity="default"><p>Veuillez vous référer à la <a href="https://facebook.github.io/react-native/">documentation officielle</a> pour plus de détails sur React Native.</p></div></p><h3>Yarn</h3><p><pre><code>yarn add react-native-auth0

</code></pre>

</p><p><div class="alert-container" severity="default"><p>Pour en savoir plus sur yarn, consultez la <a href="https://yarnpkg.com/en/docs"> documentation officielle</a>.</p></div></p><h3>npm</h3><p><pre><code>npm install react-native-auth0 --save

</code></pre>

</p><h3>Étape iOS supplémentaire : installez le module Pod.</h3><p>Notre trousse SDK nécessite une cible de déploiement iOS minimum de 13.0. Dans le fichier `ios/Podfile`` de votre projet, assurez-vous que votre cible de plateforme est définie sur 13.0.</p><p><pre><code>platform :ios '13.0'

</code></pre>

</p><p>CocoaPods est l’outil de gestion de package iOS que le framework React Native utilise pour s’installer dans votre projet. Pour que le module natif iOS fonctionne avec votre application iOS, installez d’abord la bibliothèque Pod. Si vous êtes familier avec les anciennes versions de la trousse SDK React Native, cela est similaire à la précédente liaison d’un module natif. Le processus est désormais simplifié :</p><p>Changez de répertoire dans le dossier <code>ios</code> et exécutez <code>pod install</code>.</p><p><pre><code class="language-ruby">cd ios

pod install

</code></pre>

</p><p></p>

## Intégrer Auth0 dans votre application


<p>Tout d’abord, vous devez fournir un moyen à vos utilisateurs de se connecter. Nous recommandons d’utiliser la <a data-contentfulid="67MpEy8zCywwI8YMkn5jy1-fr-CA">page de connexion</a> hébergée par Auth0.</p><img src="//images.ctfassets.net/cdy7uua7fh8z/3ZRDXpjlUXEcQpXq6Q00L1/f3a4616c28881bbb5a3711fcbbf1f7b1/Staff0_Login_screen_-_French.png" alt="Un exemple d’écran de connexion universelle pour une application iOS." /><h3>Configurer Android</h3><p>Ouvrez le fichier <code>build.gradle</code> dans le répertoire de votre application (généralement dans <code>android/app/build.gradle</code>) et ajoutez les espaces réservés au manifeste suivants. La valeur de <code>auth0Domain</code> doit contenir les paramètres de l’application Auth0 tels qu’ils sont configurés ci-dessus.</p><p><pre><code class="language-groovy">android {

    defaultConfig {

        // Add the next line

        manifestPlaceholders = [auth0Domain: &quot;${account.namespace}&quot;, auth0Scheme: &quot;<%= "${applicationId}.auth0" %>&quot;]

    }

    ...

}

</code></pre>

</p><p><div class="alert-container" severity="default"><p>Au moment de l’exécution, la valeur <code>applicationId</code> se mettra automatiquement à jour avec le nom ou l’identifiant de package de votre application (p. ex., <code>com.example.app</code>). Vous pouvez modifier cette valeur à partir du fichier <code>build.gradle</code>. Vous pouvez également la vérifier en haut de votre fichier <code>AndroidManifest.xml</code>.</p></div></p><h3>Configurer iOS</h3><p>Dans le fichier <code>ios/&lt;YOUR PROJECT&gt;/AppDelegate.mm</code>, ajoutez ce qui suit :</p><p><pre><code>#import &lt;React/RCTLinkingManager.h&gt;



- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url

            options:(NSDictionary&lt;UIApplicationOpenURLOptionsKey, id&gt; *)options

{

  return [RCTLinkingManager application:app openURL:url options:options];

}

</code></pre>

</p><p><div class="alert-container" severity="default"><p>Ce fichier sera <code>ios/&lt;YOUR PROJECT&gt;/AppDelegate.m</code> pour les applications utilisant l’<a href="https://reactnative.dev/docs/next/new-architecture-app-intro#ios---use-objective-c-mm-extension">ancienne architecture</a>.</p></div></p><p>Ensuite, ajoutez un URLScheme à l’aide de l’identifiant de l’ensemble de votre application.</p><p>Dans le dossier <code>ios</code>, ouvrez le fichier <code>Info.plist</code> et localisez la valeur de <code>CFBundleIdentifier</code>.</p><p><pre><code class="language-xml">&lt;key&gt;CFBundleIdentifier&lt;/key&gt;

&lt;string&gt;$(PRODUCT_BUNDLE_IDENTIFIER)&lt;/string&gt;

</code></pre>

</p><p>Sous cette valeur, enregistrez une entrée de type URL en utilisant la valeur de <code>CFBundleIdentifier</code> comme valeur pour <code>CFBundleURLSchemes</code>.</p><p><pre><code class="language-xml">&lt;key&gt;CFBundleURLTypes&lt;/key&gt;

&lt;array&gt;

 &lt;dict&gt;

 &lt;key&gt;CFBundleTypeRole&lt;/key&gt;

 &lt;string&gt;None&lt;/string&gt;

 &lt;key&gt;CFBundleURLName&lt;/key&gt;

 &lt;string&gt;auth0&lt;/string&gt;

 &lt;key&gt;CFBundleURLSchemes&lt;/key&gt;

 &lt;array&gt;

 &lt;string&gt;$(PRODUCT_BUNDLE_IDENTIFIER).auth0&lt;/string&gt;

 &lt;/array&gt;

 &lt;/dict&gt;

&lt;/array&gt;

</code></pre>

</p><p><div class="alert-container" severity="default"><p>Si votre application a été générée à l’aide de React Native CLI, la valeur par défaut de <code>$(PRODUCT_BUNDLE_IDENTIFIER)</code> correspond dynamiquement à <code>org.reactjs.native.example.$(PRODUCT_NAME:rfc1034identifier)</code>. Pour l’application faisant office d’exemple, cette valeur correspond à <code>com.auth0samples</code>.</p></div></p><p>Dans une étape ultérieure, vous utiliserez cette valeur pour définir les callback URL de rappel ci-dessous. Vous pouvez la modifier en utilisant XCode avec les étapes suivantes :</p><ul><li><p>Ouvrez le fichier <code>ios/&lt;YOUR PROJECT&gt;.xcodeproj </code> ou exécutez <code>xed ios </code>dans un terminal depuis la racine de l’application.</p></li><li><p>Ouvrez l’onglet des paramètres de construction de votre projet ou de la cible souhaitée et recherchez la section contenant « Identifiant de l’ensemble ».</p></li><li><p>Remplacez la valeur « Identifiant de l’ensemble » par l’identifiant de l’ensemble de votre application de votre choix.</p></li></ul><p>Pour des informations supplémentaires, veuillez consulter la <a href="https://facebook.github.io/react-native/docs/linking">documentation de React Native</a>.</p>

## Configurer le composant Auth0Provider {{{ data-action="code" data-code="app.js#46:48" }}}


<p>Le hook <code>useAuth0</code> s’appuie sur un contexte React pour fournir une gestion d’état. Ce contexte est fourni par le composant <code>Auth0Provider</code>.</p><p>Importer le hook <code>useAuth0</code> et le composant <code>Auth0Provider</code> du package <code>react-native-auth0</code> :</p><p><pre><code class="language-javascript">import {useAuth0, Auth0Provider} from 'react-native-auth0';

</code></pre>

</p><p>Pour que la trouse SDK fonctionne correctement, vous devez envelopper votre application dans le composant <code>Auth0Provider</code> et définir les propriétés suivantes :</p><ul><li><p><code>domain</code> : Le domaine de votre locataire Auth0. En général, vous le trouvez dans Auth0 Dashboard sous vos paramètres d’application dans le champ Domaine. Si vous utilisez un <a data-contentfulid="UYjAbgxX33g81azZ6VHWc-fr-CA">domaine personnalisé</a>, définissez-le plutôt sur la valeur de votre domaine personnalisé.</p></li><li><p><code>clientId</code>: L’ID de l’application Auth0 que vous avez configurée précédemment dans ce démarrage rapide. Celui-ci figure dans Auth0 Dashboard, sous l’onglest des paramètres de votre application du champ ID client.</p></li></ul><p><div class="checkpoint">Démarrage rapide React Native – Étape 4 – Point de contrôle <div class="checkpoint-default"><p>Vous venez de configurer le composant <code>Auth0Provider</code>. Executez votre application pour vérifier que :</p><ul><li><p>La trousse SDK s’initialise correctement.</p></li><li><p>Votre application ne génère aucune erreur liée à Auth0.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>

If your application did not launch successfully:</p><ul><li><p>make sure the correct application is selected</p></li><li><p>did you save after entering your URLs?</p></li><li><p>ensure your domain and client ID values are correct</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p></div>

  </div></p>

## Ajouter une fonctionnalité de connexion à votre application {{{ data-action="code" data-code="app.js#8:14" }}}


<p>Authentifiez l’utilisateur en appelant la méthode <code>authorize</code> fournie par le hook <code>useAuth0</code>. Cette méthode redirige l’utilisateur vers la page de <a data-contentfulid="67MpEy8zCywwI8YMkn5jy1-fr-CA">Connexion universelle</a> Auth0 pour authentification, puis le renvoie à votre application.</p><p>Pour confirmer que l’utilisateur a bien ouvert une session, vérifiez que la propriété <code>user</code> fournie par le hook n’est pas <code>null</code>.</p><p><div class="checkpoint">Démarrage rapide React Native – Étape 5 – Point de contrôle <div class="checkpoint-default"><p>Ajoutez un bouton qui appelle <code>authorize</code> lorsqu’on clique dessus. Vérifiez que vous êtes redirigé vers la page de connexion, puis renvoyé vers votre application.</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>If your application did not launch successfully:</p><ul><li><p>Ensure you set the Allowed Callback URLs are correct</p></li><li><p>Verify you saved your changes after entering your URLs</p></li><li><p>Make sure the domain and client ID values are imported correctly</p></li><li><p>If using Android, ensure you set up the manifest placeholders correctly, otherwise the redirect back to your app may not work</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p></div>

  </div></p>

## Ajouter une fonctionnalité de déconnexion à votre application {{{ data-action="code" data-code="app.js#16:22" }}}


<p>Pour déconnecter l’utilisateur, redirigez-le vers le point de terminaison de déconnexion Auth0 en appelant <code>clearSession</code>. Cette action supprimera la session de l’utilisateur du serveur d’autorisation et le déconnectera de l’application.</p><p><div class="checkpoint">Démarrage rapide React Native – Étape 6 – Point de contrôle <div class="checkpoint-default"><p>Ajoutez un bouton qui appelle <code>clearSession</code> et observez si vous êtes redirigé vers le point de terminaison de déconnexion Auth0, puis renvoyé de nouveau. Vous ne devriez plus être connecté à votre application.</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>If your application did not log out successfully:</p><ul><li><p>Ensure the Allowed Logout URLs are set properly</p></li><li><p>Verify you saved your changes after entering your URLs</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p></div>

  </div></p>

## Afficher les informations du profil utilisateur {{{ data-action="code" data-code="app.js#28:34" }}}


<p>Le hook <code>useAuth0</code> expose un objet <code>user</code> qui contient des informations sur l’utilisateur authentifié. Vous pouvez utiliser cette option pour accéder aux informations décodées du profil utilisateur concernant l’utilisateur authentifié à partir du <a data-contentfulid="7eGepxAjz89d1F7i1aP4ch-fr-CA">jeton d’ID</a>.</p><p>Si un utilisateur n’a pas été authentifié, cette propriété sera <code>null</code>.</p><p><div class="checkpoint">Démarrage rapide React Native – Étape 7 – Point de contrôle <div class="checkpoint-default"><p>Connectez-vous et inspectez la propriété <code>user</code> sur le résultat. Vérifiez les informations de profil utilisateur actuel, telles que son <code>email</code> ou <code>name</code>.</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"></div>

  </div></p>
