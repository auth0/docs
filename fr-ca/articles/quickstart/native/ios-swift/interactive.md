---
title: Ajouter une connexion à votre application iOS ou macOS
description: Ce guide explique comment intégrer Auth0 à n’importe quelle application iOS/macOS à l’aide du SDK Auth0.swift.
interactive:  true
files:
 - files/Auth0
 - files/MainView
 - files/ProfileView
 - files/User
github:
  path: https://github.com/auth0-samples/auth0-ios-swift-sample/tree/master/Sample-01
locale: fr-CA
---

# Ajouter une connexion à votre application iOS ou macOS


<p>Ce guide explique comment ajouter l’authentification et accéder aux informations du profil utilisateur dans n’importe quelle application iOS/macOS à l’aide du SDK <a href="https://github.com/auth0/Auth0.swift">Auth0.swift</a>.</p><p>Pour utiliser ce guide rapide, vous devez:</p><ul><li><p>Vous inscrire pour avoir un compte Auth0 gratuit ou vous connecter à Auth0.</p></li><li><p>Avoir une application iOS/macOS existante que vous souhaitez intégrer Vous pouvez également consulter ou télécharger une application faisant office d’exemple lorsque vous vous connectez.</p></li></ul><p></p><p></p>

## Configurer Auth0


<p>Pour utiliser les services Auth0, vous devez avoir une application configurée dans Auth0 Dashboard. L’application Auth0 est l’endroit où vous allez configurer le fonctionnement de l’authentification pour l’application que vous développez.</p><h3>Configurer une application Auth0.</h3><p>Utilisez le sélecteur interactif pour créer une nouvelle application Auth0 ou sélectionner une application Auth0 <b>Native</b> existante. Auth0 attribue à chaque application un ID client unique alphanumérique que votre application utilise pour appeler les API Auth0 via la trousse SDK.</p><p>Tous les paramètres que vous configurez à l’aide de ce démarrage rapide met automatiquement à jour votre application Auth0 dans le <a href="https://manage.auth0.com/#/">Dashboard</a>, qui est l’endroit où vous pourrez gérer vos applications à l’avenir.</p><p>Consultez un exemple d’application si vous préférez explorer une configuration complète.</p><h3>Configuration des callback URL et des URL de déconnexion.</h3><p>Auth0 fait appel aux  callback URL et aux URL de déconnexion pour rediriger les utilisateurs vers votre application. Auth0 fait appel à la callback URL après avoir authentifié l’utilisateur et l’URL de déconnexion après avoir supprimé le témoin de session. Si vous ne définissez pas les callback URL et les URL de déconnexion, les utilisateurs ne pourront pas se connecter et se déconnecter de l’application, et votre application produira une erreur.</p><p><div class="alert-container" severity="default"><p>Sur iOS 17.4+ et macOS 14.4+, il est possible d’utiliser des liens universels comme callback URL et URL de déconnexion. Lorsqu’activé, Auth0.swift reviendra à l’utilisation d’un schéma d’URL personnalisé sur les anciennes versions iOS/MacOS.</p><p><b>Cette fonctionnalité nécessite un Xcode 15.3+ et un compte Apple Developer payant.</b></p></div></p><p>Ajoutez les URL suivantes aux <b>callback URL</b> et aux <b>URL de déconnexion</b>, en fonction de la plateforme de votre application. Si vous avez un <a data-contentfulid="UYjAbgxX33g81azZ6VHWc-fr-CA">domaine personnalisé</a>, utilisez-le à la place du domaine de votre locataire Auth0.</p><h4>iOS</h4><p><pre><code>https://${account.namespace}/ios/YOUR_BUNDLE_IDENTIFIER/callback,

YOUR_BUNDLE_IDENTIFIER://${account.namespace}/ios/YOUR_BUNDLE_IDENTIFIER/callback

</code></pre>

</p><h4>macOS</h4><p><pre><code>https://${account.namespace}/macos/YOUR_BUNDLE_IDENTIFIER/callback,

YOUR_BUNDLE_IDENTIFIER://${account.namespace}/macos/YOUR_BUNDLE_IDENTIFIER/callback

</code></pre>

</p><p>Par exemple, si l’identifiant de votre ensemble iOS est <code>com.example.MyApp</code> et votre domaine Auth0 est <code>example.us.auth0.com</code>, cette valeur sera alors :</p><p><pre><code>https://example.us.auth0.com/ios/com.example.MyApp/callback,

com.example.MyApp://example.us.auth0.com/ios/com.example.MyApp/callback

</code></pre>

</p><h3>1. Configurer le domaine associé.</h3><p><div class="alert-container" severity="warning"><p>Cette étape nécessite un compte Apple Developer payant. Il est nécessaire d’utiliser des liens universels comme callback URL et URL de déconnexion. Ignorez cette étape pour utiliser plutôt un schéma d’URL personnalisé.</p></div></p><h4>Configurer l’ID Team et l’identifiant de l’ensemble</h4><p>Allez à la <a href="https://manage.auth0.com/dashboard/us/#/applications/">page des paramètres</a> de votre application Auth0, faites défiler jusqu’en bas, et ouvrez <b> Advanced Settings (Paramètres avancés) &gt; Device Settings ( Paramètres de l’appareil)</b>. Dans la section <b>iOS</b> , définissez <b>Team ID</b> sur votre <a href="https://developer.apple.com/help/account/manage-your-team/locate-your-team-id/">Apple Team ID</a> et <b>App ID</b> sur l’identifiant de l’ensemble de votre application.</p><img src="//images.ctfassets.net/cdy7uua7fh8z/62v9bB3bUVMw9XLND5lcMI/a44aa1441c4a91d615accddb0c23ea80/IOS_Settings_-_French.png" alt="Auth0 Dashboard> Applications > Applications > [Native App] > Settings tab (Onglet des paramètres) > Advanced Settings (Paramètres avancés) > Device Settings tab (Onglet des paramètres de l’appareil)" /><p>Cette action ajoutera votre application au fichier <code>apple-app-site-association</code> de votre locataire Auth0.</p><h4>Ajoutez la capacité de domaine associé.</h4><p>Dans Xcode, allez à l’onglet <b>Signing and Capabilities (Signature et capacités)</b> des paramètres cibles de votre application, puis appuyez sur le bouton <b>+ Capability (capacité)</b> Puis sélectionnez <b>Domaines associés</b>.</p><img src="//images.ctfassets.net/cdy7uua7fh8z/72eVE104zKB5Q4NPnx6MCa/66c81ee64f104583bd00b9916778f989/ios-xcode-capabilities.png" alt="Xcode> Onglet Signing and Capabilities (Signature et capacités) > Add New (Ajouter nouveau) > Associated Domains (Domaines associés)" /><p>Ensuite, ajoutez l’<a href="https://developer.apple.com/documentation/xcode/configuring-an-associated-domain#Define-a-service-and-its-associated-domain">entrée</a> suivante sous <b>Domaines associé</b> :</p><p><pre><code>webcredentials:labs-fundtraining.us.auth0.com

</code></pre>

</p><p>Si vous avez un <a data-contentfulid="UYjAbgxX33g81azZ6VHWc-fr-CA">domaine personnalisé</a>, utilisez-le à la place du domaine de votre locataire Auth0.</p><p><div class="alert-container" severity="default"><p>Pour que le domaine associé fonctionne, votre application doit être signée avec votre certificat d’équipe <b>même lors de la construction du simulateur iOS</b>. Assurez-vous d’utiliser l’équipe Apple dont l’ID d’équipe est configuré dans la page des paramètres de votre application Auth0.</p></div></p>

## Installer la trousse SDK


<h3>Utilisation du gestionnaire de packages Swift</h3><p>Ouvrez l’élément de menu suivant dans Xcode :</p><p><b>File (Fichier) &gt; Add Package Dependencies (Ajouter des dépendances de package)...</b></p><p>Dans la zone de recherche <b>Search or Enter Package URL (Rechercher ou saisir l’URL du package)</b> entrez cette URL :</p><p><pre><code>https://github.com/auth0/Auth0.swift

</code></pre>

</p><p>Ensuite, sélectionnez la règle de dépendance et appuyez sur <b>Add Package (Ajouter le package)</b>.</p><p><div class="alert-container" severity="default"><p>Pour plus d’informations sur SPM consultez la <a href="https://developer.apple.com/documentation/xcode/adding-package-dependencies-to-your-app"> documentation officielle</a>.</p></div></p><h3>Utilisation de Cocoapods</h3><p>Ajoutez la ligne suivante à votre <code>Podfile</code> :</p><p><pre><code class="language-ruby">pod 'Auth0', '~&gt; 2.0'

</code></pre>

</p><p>Ensuite, exécutez <code>pod install</code>.</p><p><div class="alert-container" severity="default"><p>Pour plus d’informations sur CocoaPods, consultez la <a href="https://guides.cocoapods.org/using/getting-started.html">documentation officielle</a>.</p></div></p><h3>Utilisation de Carthage</h3><p>Ajoutez la ligne suivante à votre <code>Cartfile</code> :</p><p><pre><code class="language-swift">github &quot;auth0/Auth0.swift&quot; ~&gt; 2.0

</code></pre>

</p><p>Ensuite, exécutez <code>carthage bootstrap --use-xcframeworks</code>.</p><p><div class="alert-container" severity="default"><p>Pour en savoir plus sur Carthage, consultez la <a href="https://github.com/Carthage/Carthage#getting-started">documentation officielle</a>.</p><p></p></div></p>

## Configurer la trousse SDK {{{ data-action="code" data-code="Auth0.plist" }}}


<p>La trousse SDK Auth0.swift a besoin de votre <b>domaine</b> Auth0 et de votre <b>ID client</b>. Ces valeurs se trouvent dans la <a href="https://manage.auth0.com/dashboard/us/#/applications/">page des paramètres</a> de votre application Auth0.</p><ul><li><p><b>domain</b> : Le domaine de votre locataire Auth0. Si vous avez un <a data-contentfulid="UYjAbgxX33g81azZ6VHWc-fr-CA">domaine personnalisé</a>, utilisez-le à la place du domaine de votre locataire Auth0.</p></li><li><p><b>ID client</b> : L’ID alphanumérique unique de l’application Auth0 que vous avez configuré précédemment dans ce démarrage rapide.</p></li></ul><p>Créez un fichier <code>plist</code> nommé <code>Auth0.plist</code> dans votre ensemble d’application contenant les valeurs du domaine Auth0 et de l’ID client.</p><p><div class="alert-container" severity="default"><p>Vous pouvez également configurer la trousse SDK de manière programmatique. Consultez <a href="https://github.com/auth0/Auth0.swift#configure-client-id-and-domain-programmatically">README</a> pour en savoir plus.</p></div></p><p><div class="checkpoint">Démarrage rapide iOS Swift – Étape 3 – Point de contrôle <div class="checkpoint-default"><p>Vous avez configuré la trousse SDK Auth0.swift. Exécutez votre application afin de vérifier qu’elle ne produit pas d’erreurs liées à la trousse SDK.</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>If your app produces errors related to the SDK:</p><ul><li><p>Make sure you selected the correct Auth0 application</p></li><li><p>Verify you saved your URL updates</p></li><li><p>Ensure you set the Auth0 domain and Client ID correctly</p></li></ul><p>Still having issues? Check out our <a href="https://github.com/auth0/Auth0.swift#documentation">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p></div>

  </div></p><p></p>

## Ajouter une fonctionnalité de connexion à votre application {{{ data-action="code" data-code="MainView.swift#20:31" }}}


<p>Importez le module <code>Auth0</code> dans le fichier où vous souhaitez afficher la page de connexion. Ensuite, affichez la page <a data-contentfulid="67MpEy8zCywwI8YMkn5jy1-fr-CA">Connexion universelle</a> dans l’action de votre bouton <b>Login (connexion)</b>.</p><p><div class="alert-container" severity="default"><p>Vous pouvez utiliser async/await ou Combine au lieu de l’API basée sur les rappels. Consultez <a href="https://github.com/auth0/Auth0.swift#web-auth-login-ios--macos">README</a> pour apprendre davantage.</p></div></p><img src="//images.ctfassets.net/cdy7uua7fh8z/3ZRDXpjlUXEcQpXq6Q00L1/f3a4616c28881bbb5a3711fcbbf1f7b1/Staff0_Login_screen_-_French.png" alt="Un exemple d’écran de connexion universelle pour une application iOS." /><p><div class="checkpoint">Démarrage rapide iOS Swift – Étape 4 – Point de contrôle <div class="checkpoint-default"><p>Appuyez sur le bouton <b>Login (Connexion)</b> et vérifiez que :</p><ul><li><p>Une <a href="https://github.com/auth0/Auth0.swift#sso-alert-box-ios--macos">boîte d’alerte</a> s’affiche demandant le consentement.</p></li><li><p>Choisir <b>Continue (Continuer) </b>ouvre la page de connexion universelle dans un modal Safari.</p></li><li><p>Vous pouvez vous connecter ou vous inscrire en utilisant un nom d’utilisateur et un mot de passe ou un fournisseur social.</p></li><li><p>Le modal Safari se ferme automatiquement par la suite.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>If login fails or produces errors:</p><ul><li><p>Verify you entered the correct callback URL</p></li><li><p>Ensure you set the Auth0 domain and Client ID correctly</p></li></ul><p>Still having issues? Check out our <a href="https://github.com/auth0/Auth0.swift#documentation">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p></div>

  </div></p><p></p>

## Ajouter une fonctionnalité de déconnexion à votre application {{{ data-action="code" data-code="MainView.swift#34:45" }}}


<p>Maintenant que vous pouvez vous connecter à votre application, vous avez besoin d’un moyen de vous <a href="https://auth0.com/docs/authenticate/login/logout">log out (déconnecter)</a>. Dans l’action de votre bouton <b>Logout (Déconnexion)</b> , faites usage de la méthode <code>clearSession()</code> pour effacer le témoin de session de la connexion universelle.</p><p><div class="checkpoint">Démarrage rapide iOS Swift – Étape 5 – Point de contrôle <div class="checkpoint-default"><p>Appuyez sur le bouton <b>Logout (Connexion)</b> et vérifiez que :</p><ul><li><p>Une boîte d’alerte s’affiche demandant le consentement.</p></li><li><p>Choisir <b>Continue (Continuer) </b>ouvre une page dans un modal Safari.</p></li><li><p>Le modal Safari se ferme automatiquement par la suite.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>If logout fails or produces errors:</p><ul><li><p>Verify you entered the correct callback URL</p></li><li><p>Ensure you set the Auth0 domain and Client ID correctly</p></li></ul><p>Still having issues? Check out our <a href="https://github.com/auth0/Auth0.swift#documentation">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p></div>

  </div></p>

## Accéder aux informations du profil utilisateur {{{ data-action="code" data-code="User.swift#11:14" }}}


<p>L’instance <code>Credentials</code> que vous avez obtenue après vous être connecté inclut un <a data-contentfulid="7eGepxAjz89d1F7i1aP4ch-fr-CA">ID token (jeton d’ID)</a>. Le jeton d’ID contient les informations de profil associées à l’utilisateur connecté, telles que son courriel et sa photo de profil. Vous pouvez utiliser ces informations pour personnaliser l’interface utilisateur de votre application.</p><p>La trousse SDK Auth0.swift inclut un <a href="https://github.com/auth0/JWTDecode.swift">utilitaire</a> pour décoder les <a href="https://jwt.io/">JWT</a> comme le jeton d’ID. Commencez par importer le module <code>JWTDecode</code> dans le fichier où vous souhaitez accéder aux informations du profil utilisateur. Ensuite, utilisez la méthode <code>decode(jwt:)</code> pour décoder le jeton d’ID et accéder aux demandes qu’il contient.</p><p><div class="alert-container" severity="default"><p>Vous pouvez récupérer les dernières informations utilisateur avec la méthode <code>userInfo(withAccessToken:)</code>. Consultez les <a href="https://github.com/auth0/Auth0.swift/blob/master/EXAMPLES.md#retrieve-user-information">EXAMPLES (EXEMPLES)</a> pour en savoir plus.</p></div></p><p><div class="checkpoint">Démarrage rapide iOS Swift – Étape 6 – Point de contrôle <div class="checkpoint-default"><p>Vérifiez que vous pouvez accéder à <code>email</code>, <code>picture</code>, ou à toute autre <a data-contentfulid="2dKoj5wVle1Wz3mWrrQ2Dr">demande</a> après vous être connecté.</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>If you cannot access the user information:</p><ul><li><p>Verify you imported the <code>JWTDecode</code> module where you invoke the <code>decode(jwt:)</code> method</p></li><li><p>Make sure you spelled your claims correctly</p></li></ul><p>Still having issues? Check out our <a href="https://github.com/auth0/Auth0.swift#documentation">documentation</a> or visit our <a href="https://community.auth0.com/">community forums</a> to get more help.</p></div>

  </div></p>
