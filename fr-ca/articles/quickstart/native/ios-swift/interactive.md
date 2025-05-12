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
  path: Sample-01
locale: fr-CA
---

# Ajouter une connexion à votre application iOS ou macOS


<p>Ce guide explique comment ajouter l’authentification et accéder aux informations du profil utilisateur dans n’importe quelle application iOS/macOS à l’aide du SDK <a href="https://github.com/auth0/Auth0.swift" target="_blank" rel="noreferrer noopener">Auth0.swift</a>.</p><p>Pour utiliser ce guide rapide, vous devez :</p><ul><li><p>vous inscrire à un compte Auth0 gratuit ou vous connecter à Auth0.</p></li><li><p>avoir une application iOS/macOS existante que vous souhaitez intégrer. Vous pouvez également consulter ou télécharger une application faisant office d’exemple lorsque vous vous connectez.</p></li></ul><p></p><p></p>

## Configuration d’Auth0


<p>Pour utiliser les services Auth0, vous devez avoir une application configurée dans Auth0 Dashboard. L’application Auth0 est l’endroit où vous allez configurer le fonctionnement de l’authentification pour l’application que vous développez.</p><h3>Configurer une application Auth0</h3><p>Utilisez le sélecteur interactif pour créer une nouvelle application Auth0 ou sélectionnez une application Auth0 <b>native</b> existante. Auth0 attribue à chaque application un ID client unique alphanumérique que votre application utilise pour appeler les API Auth0 via la trousse SDK.</p><p>Tous les paramètres que vous configurez à l’aide de ce démarrage rapide met automatiquement à jour votre application Auth0 dans le <a href="https://manage.auth0.com/#/" target="_blank" rel="noreferrer noopener">Dashboard</a>, qui est l’endroit où vous pourrez gérer vos applications à l’avenir.</p><p>Consultez un exemple d’application si vous préférez explorer une configuration complète.</p><h3>Configuration des Callback URL et des URL de déconnexion.</h3><p>Auth0 fait appel aux Callback URL et aux URL de déconnexion pour rediriger les utilisateurs vers votre application. Auth0 fait appel à une URL de rappel après avoir authentifié l’utilisateur et à une URL de déconnexion après avoir supprimé le témoin de session. Si vous ne définissez pas les Callback URL et les URL de déconnexion, les utilisateurs ne pourront pas se connecter et se déconnecter de l’application, et votre application produira une erreur.</p><p><div class="alert-container" severity="default"><p>Sur iOS 17.4+ et macOS 14.4+, il est possible d’utiliser des liens universels comme callback URL et URL de déconnexion. Lorsqu’activé, Auth0.swift reviendra à l’utilisation d’un schéma d’URL personnalisé sur les anciennes versions iOS/MacOS.</p><p><b>Cette fonctionnalité nécessite un Xcode 15.3+ et un compte Apple Developer payant.</b></p></div></p><p>Ajoutez les URL suivantes aux <b>URL de rappel</b> et <b>URL de déconnexion</b>, selon la plateforme de votre app. Si vous avez un <a data-contentfulid="UYjAbgxX33g81azZ6VHWc-fr-CA">domaine personnalisé</a>, utilisez-le à la place du domaine de votre locataire Auth0.</p><h4>iOS</h4><p><pre><code>https://${account.namespace}/ios/YOUR_BUNDLE_IDENTIFIER/callback,

YOUR_BUNDLE_IDENTIFIER://${account.namespace}/ios/YOUR_BUNDLE_IDENTIFIER/callback

</code></pre>

</p><h4>macOS</h4><p><pre><code>https://${account.namespace}/macos/YOUR_BUNDLE_IDENTIFIER/callback,

YOUR_BUNDLE_IDENTIFIER://${account.namespace}/macos/YOUR_BUNDLE_IDENTIFIER/callback

</code></pre>

</p><p>Par exemple, si l’identifiant de votre ensemble iOS est <code>com.example.MyApp</code> et votre domaine Auth0 est <code>example.us.auth0.com</code>, cette valeur sera alors :</p><p><pre><code>https://example.us.auth0.com/ios/com.example.MyApp/callback,

com.example.MyApp://example.us.auth0.com/ios/com.example.MyApp/callback

</code></pre>

</p><h3>Configurer le domaine associé</h3><p><div class="alert-container" severity="warning"><p>Cette étape nécessite un compte Apple Developer payant. Il est nécessaire d’utiliser des liens universels comme callback URL et URL de déconnexion. Ignorez cette étape pour utiliser plutôt un schéma d’URL personnalisé.</p></div></p><h4>Configurer l’ID Team et l’identifiant de l’ensemble</h4><p>Allez à la <a href="https://manage.auth0.com/dashboard/us/#/applications/" target="_blank" rel="noreferrer noopener">page des paramètres</a> de votre application Auth0, faites défiler jusqu’en bas, et ouvrez <b>Advanced Settings (Paramètres avancés) &gt; (Paramètres de l’appareil)</b>. Dans la section <b>iOS</b>, définissez <b>Team ID</b> sur votre Apple <a href="https://developer.apple.com/help/account/manage-your-team/locate-your-team-id/" target="_blank" rel="noreferrer noopener">Apple Team ID</a> et <b>App ID</b> sur l’identifiant de l’ensemble de votre application.</p><img src="//images.ctfassets.net/cdy7uua7fh8z/62v9bB3bUVMw9XLND5lcMI/a44aa1441c4a91d615accddb0c23ea80/IOS_Settings_-_French.png" alt="Auth0 Dashboard> Applications > Applications > [Native App] > Settings tab (Onglet des paramètres) > Advanced Settings (Paramètres avancés) > Device Settings tab (Onglet des paramètres de l’appareil)" /><p>Cette action ajoutera votre application au fichier <code>apple-app-site-association</code> de votre locataire Auth0.</p><h4>Ajouter la capacité de domaine associé</h4><p>Dans Xcode, allez à l’<a href="https://developer.apple.com/documentation/xcode/adding-capabilities-to-your-app#Add-a-capability" target="_blank" rel="noreferrer noopener">onglet</a><b>Signing and Capabilities (Signature et capacités)</b> des paramètres cibles de votre application, puis appuyez sur le bouton <b>+ Capability (Capacité)</b>. Sélectionnez ensuite <b>Associated Domains (Domaines associés)</b>.</p><img src="//images.ctfassets.net/cdy7uua7fh8z/72eVE104zKB5Q4NPnx6MCa/66c81ee64f104583bd00b9916778f989/ios-xcode-capabilities.png" alt="Xcode> Onglet Signing and Capabilities (Signature et capacités) > Add New (Ajouter nouveau) > Associated Domains (Domaines associés)" /><p>Ajoutez l’<a href="https://developer.apple.com/documentation/xcode/configuring-an-associated-domain#Define-a-service-and-its-associated-domain" target="_blank" rel="noreferrer noopener">entry</a> suivante sous <b>Associated Domains (Domaines associés)</b> :</p><p><pre><code>webcredentials:labs-fundtraining.us.auth0.com

</code></pre>

</p><p>Si vous avez un <a data-contentfulid="UYjAbgxX33g81azZ6VHWc-fr-CA">domaine personnalisé</a>, utilisez-le à la place du domaine de votre locataire Auth0.</p><p><div class="alert-container" severity="default"><p>Pour que le domaine associé fonctionne, votre application doit être signée avec votre certificat d’équipe <b>même lors de la construction du simulateur iOS</b>. Assurez-vous d’utiliser l’équipe Apple dont l’ID d’équipe est configuré dans la page des paramètres de votre application Auth0.</p></div></p>

## Installer la trousse SDK


<h3>Utilisation du gestionnaire de packages Swift</h3><p>Ouvrez l’élément de menu suivant dans Xcode :</p><p><b>File (Fichier) &gt; Add Package Dependencies (Ajouter des dépendances de package)...</b></p><p>Dans la zone de recherche <b>Search or Enter Package URL (Rechercher ou saisir l’URL du package)</b> entrez cette URL :</p><p><pre><code>https://github.com/auth0/Auth0.swift

</code></pre>

</p><p>Ensuite, sélectionnez la règle de dépendance et appuyez sur <b>Add Package (Ajouter le package)</b>.</p><p><div class="alert-container" severity="default"><p>Pour plus d’informations sur SPM consultez la <a href="https://developer.apple.com/documentation/xcode/adding-package-dependencies-to-your-app" target="_blank" rel="noreferrer noopener"> documentation officielle</a>.</p></div></p><h3>Utilisation de Cocoapods</h3><p>Ajoutez la ligne suivante à votre <code>Podfile</code> :</p><p><pre><code class="language-ruby">pod 'Auth0', '~&gt; 2.0'

</code></pre>

</p><p>Ensuite, exécutez <code>pod install</code>.</p><p><div class="alert-container" severity="default"><p>Pour plus d’informations sur CocoaPods, consultez la <a href="https://guides.cocoapods.org/using/getting-started.html" target="_blank" rel="noreferrer noopener">documentation officielle</a>.</p></div></p><h3>Utilisation de Carthage</h3><p>Ajoutez la ligne suivante à votre <code>Cartfile</code> :</p><p><pre><code class="language-swift">github &quot;auth0/Auth0.swift&quot; ~&gt; 2.0

</code></pre>

</p><p>Ensuite, exécutez <code>carthage bootstrap --use-xcframeworks</code>.</p><p><div class="alert-container" severity="default"><p>Pour en savoir plus sur Carthage, consultez la <a href="https://github.com/Carthage/Carthage#getting-started" target="_blank" rel="noreferrer noopener">documentation officielle</a>.</p><p></p></div></p>

## Configuration de la trousse SDK {{{ data-action="code" data-code="Auth0.plist" }}}


<p>La trousse SDK Auth0.swift a besoin de votre <b>domain (domaine)</b> Auth0 et de votre <b>Client ID (Identifiant client)</b>. Ces valeurs se trouvent dans la <a href="https://manage.auth0.com/dashboard/us/#/applications/" target="_blank" rel="noreferrer noopener">page des paramètres</a> de votre application Auth0.</p><ul><li><p><b>domain (domaine)</b> : Le domaine de votre locataire Auth0. Si vous avez un <a data-contentfulid="UYjAbgxX33g81azZ6VHWc-fr-CA">domaine personnalisé</a>, utilisez-le à la place du domaine de votre locataire Auth0.</p></li><li><p><b>Client ID (Identifiant client)</b> L’identifiant alphanumérique unique de l’application Auth0 que vous avez configuré précédemment dans ce démarrage rapide.</p></li></ul><p>Créez un fichier <code>plist</code> nommé <code>Auth0.plist</code> dans votre ensemble d’application contenant les valeurs du domaine Auth0 et de l’identifiant client.</p><p><div class="alert-container" severity="default"><p>Vous pouvez également configurer la trousse SDK de manière programmatique. Consultez <a href="https://github.com/auth0/Auth0.swift#configure-client-id-and-domain-programmatically" target="_blank" rel="noreferrer noopener">README</a> pour en savoir plus.</p></div></p><p><div class="checkpoint">Démarrage rapide iOS Swift - Étape 3 - Point de contrôle <div class="checkpoint-default"><p>Vous avez configuré la trousse SDK Auth0.swift. Exécutez votre application afin de vérifier qu’elle ne produit pas d’erreurs liées à la trousse SDK.</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Si votre application génère des erreurs liées à la trousse SDK :</p><ul><li><p>Assurez-vous d’avoir sélectionné la bonne application Auth0</p></li><li><p>Vérifiez que vous avez enregistré vos mises à jour d’URL</p></li><li><p>Assurez-vous d’avoir défini correctement le domaine Auth0 et l’identifiant client</p></li></ul><p>Vous rencontrez toujours des problèmes? Consultez notre <a href="https://github.com/auth0/Auth0.swift#documentation" target="_blank" rel="noreferrer noopener">documentation</a> ou la <a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">page de notre communauté</a> pour obtenir de l’aide.</p></div>

  </div></p><p></p>

## Ajouter une fonctionnalité de connexion à votre application {{{ data-action="code" data-code="MainView.swift#20:31" }}}


<p>Importez le module <code>Auth0</code> dans le fichier où vous souhaitez présenter la page de connexion. Ensuite, présentez la page <a data-contentfulid="67MpEy8zCywwI8YMkn5jy1-fr-CA">Universal Login (Connexion universelle)</a> dans l’action de votre bouton <b>Login (Connexion)</b>.</p><p><div class="alert-container" severity="default"><p>Vous pouvez utiliser async/await ou Combine au lieu de l’API basée sur les rappels. Consultez <a href="https://github.com/auth0/Auth0.swift#web-auth-login-ios--macos" target="_blank" rel="noreferrer noopener">README</a> pour en savoir plus.</p></div></p><img src="//images.ctfassets.net/cdy7uua7fh8z/3ZRDXpjlUXEcQpXq6Q00L1/f3a4616c28881bbb5a3711fcbbf1f7b1/Staff0_Login_screen_-_French.png" alt="Un exemple d’écran de connexion universelle pour une application iOS." /><p><div class="checkpoint">Démarrage rapide iOS Swift – Étape 4 – Point de contrôle <div class="checkpoint-default"><p>Appuyez sur le bouton <b>Login (Connexion)</b> et vérifiez que :</p><ul><li><p>Une <a href="https://github.com/auth0/Auth0.swift#sso-alert-box-ios--macos" target="_blank" rel="noreferrer noopener">boîte d’alerte</a> s’affiche demandant le consentement.</p></li><li><p>Sélectionner <b>Continue (Continuer)</b> ouvre la page de connexion universelle dans un modal Safari.</p></li><li><p>Vous pouvez vous connecter ou vous inscrire en utilisant un nom d’utilisateur et un mot de passe ou un fournisseur social.</p></li><li><p>Le modal Safari se ferme automatiquement par la suite.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Si la connexion échoue ou génère des erreurs :</p><ul><li><p>Vérifiez que vous avez saisi la bonne URL de rappel</p></li><li><p>Assurez-vous de définir correctement le domaine Auth0 et l’identifiant client</p></li></ul><p>Vous rencontrez toujours des problèmes? Consultez notre <a href="https://github.com/auth0/Auth0.swift#documentation" target="_blank" rel="noreferrer noopener">documentation</a> ou la <a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">page de notre communauté</a> pour obtenir de l’aide.</p></div>

  </div></p><p></p>

## Ajouter une fonctionnalité de déconnexion à votre application {{{ data-action="code" data-code="MainView.swift#34:45" }}}


<p>Maintenant que vous pouvez vous connecter à votre application, vous avez besoin d’un moyen de vous <a href="https://auth0.com/docs/authenticate/login/logout" target="_blank" >déconnecter</a>. Dans l’action de votre bouton <b>Logout (Déconnexion)</b>, faites usage de la méthode <code>clearSession()</code> pour effacer le témoin de session de la connexion universelle.</p><p><div class="checkpoint">Démarrage rapide iOS Swift - Étape 5 - Point de contrôle <div class="checkpoint-default"><p>Appuyez sur le bouton <b>Logout (Déconnexion)</b> et vérifiez que :</p><ul><li><p>Une boîte d’alerte s’affiche demandant le consentement.</p></li><li><p>Choisir <b>Continue (Poursuivre)</b> ouvre une page dans une boîte de dialogue modale Safari.</p></li><li><p>La boîte de dialogue modale Safari se ferme automatiquement par la suite.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Si la déconnexion échoue ou génère des erreurs :</p><ul><li><p>Vérifiez que vous avez saisi la bonne URL de rappel</p></li><li><p>Assurez-vous de définir correctement le domaine Auth0 et l’identifiant client</p></li></ul><p>Vous rencontrez toujours des problèmes? Consultez notre <a href="https://github.com/auth0/Auth0.swift#documentation" target="_blank" rel="noreferrer noopener">documentation</a> ou la <a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">page de notre communauté</a> pour obtenir de l’aide.</p></div>

  </div></p>

## Accéder aux informations du profil utilisateur {{{ data-action="code" data-code="User.swift#11:14" }}}


<p>L’instance <code>Credentials</code> que vous avez obtenue après vous être connecté inclut un <a data-contentfulid="7eGepxAjz89d1F7i1aP4ch-fr-CA">jeton d’ID</a>. Le jeton d’ID contient les informations de profil associées à l’utilisateur connecté, telles que son courriel et sa photo de profil. Vous pouvez utiliser ces informations pour personnaliser l’interface utilisateur de votre application.</p><p>La trousse SDK Auth0.swift inclut un <a href="https://github.com/auth0/JWTDecode.swift" target="_blank" rel="noreferrer noopener">utilitaire</a> pour décoder les <a href="https://jwt.io/" target="_blank" rel="noreferrer noopener">JWT</a>, comme le jeton d’ID. Commencez par importer le module <code>JWTDecode</code> dans le fichier où vous souhaitez accéder aux informations du profil utilisateur. Ensuite, utilisez la méthode <code>decode(jwt:)</code> pour décoder le jeton d’ID et accéder aux demandes qu’il contient.</p><p><div class="alert-container" severity="default"><p>Vous pouvez récupérer les dernières informations utilisateur avec la méthode <code>userInfo(withAccessToken:)</code>. Consultez les <a href="https://github.com/auth0/Auth0.swift/blob/master/EXAMPLES.md#retrieve-user-information" target="_blank" rel="noreferrer noopener">EXAMPLES (EXEMPLES)</a> pour en savoir plus.</p></div></p><p><div class="checkpoint">Démarrage rapide iOS Swift - Étape 6 - Point de contrôle <div class="checkpoint-default"><p>Vérifiez que vous pouvez accéder à <code>email</code>, <code>picture</code>, ou à toute autre <a data-contentfulid="2dKoj5wVle1Wz3mWrrQ2Dr-en-US">demande</a> après vous être connecté.</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Si vous ne pouvez pas accéder aux informations de l’utilisateur :</p><ul><li><p>Vérifiez que vous avez importé le module <code>JWTDecode</code> dans lequel vous appelez la méthode <code>decode(jwt:)</code></p></li><li><p>Vérifiez l’orthographe de vos requêtes.</p></li></ul><p>Vous rencontrez toujours des problèmes? Consultez notre <a href="https://github.com/auth0/Auth0.swift#documentation" target="_blank" rel="noreferrer noopener">documentation</a> ou visitez nos <a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">forums communautaires</a> pour obtenir de l’aide.</p></div>

  </div></p>
