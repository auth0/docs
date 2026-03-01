---
title: Ajouter une fonctionnalité de connexion à votre application Go
description: Ce guide explique comment intégrer Auth0 à n’importe quelle application Web Go, nouvelle ou existante.
interactive:  true
files:
 - files/auth
 - files/callback
 - files/env
 - files/go
 - files/isAuthenticated
 - files/login
 - files/logout
 - files/main
 - files/router
 - files/user
github:
  path: 01-Login
locale: fr-CA
---

# Ajouter une fonctionnalité de connexion à votre application Go


<p>Auth0 vous permet d’ajouter l’authentification et de pouvoir accéder aux informations relatives au profil de l’utilisateur dans votre application. Ce guide explique comment intégrer Auth0 à n’importe quelle application Web Go, nouvelle ou existante.</p><p></p>

## Configuration d’Auth0


<p>Pour utiliser les services Auth0, vous devez avoir une application installée dans Auth0 Dashboard. L’application Auth0 est l’endroit où vous allez configurer le fonctionnement de l’authentification pour le projet que vous développez.</p><h3>Configurer une application</h3><p>Utilisez le sélecteur interactif pour créer une nouvelle application Auth0 ou sélectionner une application existante qui représente le projet avec lequel vous souhaitez effectuer l’intégration. Dans Auth0, chaque application se voit attribuer un identifiant client unique alphanumérique que votre code d’application utilisera pour appeler les API Auth0 via la trousse SDK.</p><p>Tous les paramètres que vous configurez à l’aide de ce guide de démarrage rapide seront automatiquement mis à jour pour votre application dans le <a href="https://manage.auth0.com/dashboard/us/auth0-dsepaid/" target="_blank" rel="noreferrer noopener">Tableau de bord</a>, qui est l’endroit où vous pourrez gérer vos applications à l’avenir.</p><p>Si vous préférez explorer une configuration complète, consultez plutôt un exemple d’application.</p><h3>Configuration des URL de rappel</h3><p>Une URL de rappel est une URL intégrée dans votre application vers laquelle vous souhaitez qu’Auth0 redirige les utilisateurs après leur authentification. Si elle n’est pas définie, les utilisateurs ne seront pas redirigés vers votre application après s’être connectés.</p><p><div class="alert-container" severity="default"><p>Si vous suivez notre exemple de projet, définissez cette URL comme suit : <code>http://localhost:3000</code><code>/callback</code>.</p></div></p><h3>Configuration des URL de déconnexion</h3><p>Une URL de déconnexion est une URL intégrée dans votre application vers laquelle vous souhaitez qu’Auth0 redirige les utilisateurs après leur déconnexion. Si elle n’est pas définie, les utilisateurs ne pourront pas se déconnecter de votre application et recevront un message d’erreur.</p><p><div class="alert-container" severity="default"><p>Si vous suivez notre exemple de projet, définissez cette URL comme suit : <code>http://localhost:3000</code>.</p></div></p>

## Installer les dépendances {{{ data-action="code" data-code="go.mod" }}}


<p>Créez un fichier <code>go.mod</code> pour lister toutes les dépendances de votre application.</p><p>Pour intégrer Auth0 dans une application Go, ajoutez les packages <code>coreos/go-oidc/v3</code> et <code>x/oauth2</code>.</p><p>En plus des packages OIDC et OAuth2, ajoutez <code>joho/godotenv</code>, <code>gin-gonic/gin</code>, et <code>gin-contrib/sessions</code>.</p><p><div class="alert-container" severity="default"><p>Cet exemple utilise <code>gin</code> pour le routage, mais vous pouvez utiliser le routeur de votre choix.</p></div></p><p>Enregistrez le fichier <code>go.mod</code> avec les dépendances nécessaires et installez-les en utilisant la commande suivante dans votre terminal :</p><p><code>go mod download</code></p>

## Configurer les variables d’environnement {{{ data-action="code" data-code=".env" }}}


<p>Vous devez définir les variables d’environnement suivantes dans <code>.env</code> à la racine de votre répertoire de projet :</p><ul><li><p><b>AUTH0_DOMAIN</b> : Le domaine de votre locataire Auth0. Trouvez votre domaine Auth0 dans Auth0 Dashboard sous les paramètres de votre application dans le champ Domain (Domaine). Pour les domaines personnalisés, définissez-le plutôt sur la valeur de votre <a data-contentfulid="UYjAbgxX33g81azZ6VHWc-fr-CA">domaine personnalisé</a>.</p></li><li><p><b>AUTH0_CLIENT_ID</b> : L’identificateur de l’application Auth0 que vous avez configurée précédemment dans ce guide rapide. Vous le trouverez dans Auth0 Dashboard sous les paramètres de votre application dans le champ Client ID (Identificateur client).</p></li><li><p><b>AUTH0_CLIENT_SECRET</b> : Le secret de l’application Auth0 que vous avez configurée précédemment dans ce guide rapide. Vous le trouverez dans Auth0 Dashboard, sous les paramètres de votre application dans le champ Client Secret (Secret client).</p></li><li><p><b>AUTH0_CALLBACK_URL</b> : L’URL utilisée par Auth0 pour rediriger l’utilisateur après une authentification réussie.</p></li></ul><p></p>

## Configurez les packages OAuth2 et OpenID Connect {{{ data-action="code" data-code="auth.go" }}}


<p>Ensuite, configurez les packages OAuth2 et OpenID Connect</p><p>Créez un fichier nommé <code>auth.go</code> dans le dossier <code>platform/authenticator</code>. Dans ce package, créez une méthode pour configurer et renvoyer les clients <a href="https://godoc.org/golang.org/x/oauth2" target="_blank" rel="noreferrer noopener">OAuth2</a> et <a href="https://godoc.org/github.com/coreos/go-oidc" target="_blank" rel="noreferrer noopener">OIDC</a>, et une autre pour vérifier un jeton d’ID.</p>

## Configurer vos routes d’application {{{ data-action="code" data-code="router.go" }}}


<p>Créez un fichier nommé <code>router.go</code> dans le dossier <code>platform/router</code>. Dans ce package, créez une méthode pour configurer et renvoyer nos routes en utilisant <a href="https://github.com/gin-gonic/gin" target="_blank" rel="noreferrer noopener">github.com/gin-gonic/gin</a>. Vous passerez une instance de <code>Authenticator</code> à la méthode pour l’utiliser avec les gestionnaires <code>login (connexion)</code> et <code>callback (rappel)</code>.</p><p></p>

## Ajouter une fonctionnalité de connexion à votre application {{{ data-action="code" data-code="login.go" }}}


<p>Pour que l’utilisateur s’authentifie, nous devons créer une fonction gestionnaire pour traiter la route<code>/login</code>.</p><p>Créez un fichier nommé <code>login.go</code> dans le dossier <code>web/app/login</code> et ajoutez une fonction <code>Handler</code>. Lors de l’exécution du gestionnaire, l’utilisateur sera redirigé vers Auth0 où il pourra saisir ses identifiants.</p><p>Pour appeler la route <code>/login</code> ajoutez un lien vers <code>/login</code> dans le modèle <code>home.html</code> situé dans le directory <code>web/template</code>.</p><p></p>

## Gérer le rappel d’authentification {{{ data-action="code" data-code="callback.go" }}}


<p>Une fois que les utilisateurs se sont authentifiés en utilisant la page de connexion universelle d’Auth0, ils reviendront à l’application à la route <code>/callback</code>.</p><p>Créez un fichier nommé <code>callback.go</code> dans le dossier <code>web/app/callback</code> et ajoutez une fonction <code>Handler</code>.</p><p>Ce gestionnaire prendra la chaîne de requête <code>code</code> fournie par Auth0 et l’échangera contre un jeton d’ID et un jeton d’accès.</p><p>Si le jeton d’ID est valide, il stockera les informations de profil et le jeton d’accès dans la session. Les informations de profil sont basées sur les demandes contenues dans le jeton d’ID. Le stockage de session permet à l’application d’accéder à ces informations selon les besoins.</p>

## Afficher les informations du profil utilisateur {{{ data-action="code" data-code="user.go" }}}


<p>Maintenant que vos utilisateurs peuvent se connecter, vous voulez probablement pouvoir récupérer et utiliser les <a data-contentfulid="2ClGWANGeRoTkg5Ax2gOVK-fr-CA">informations de profil</a> associées aux utilisateurs authentifiés.</p><p>Vous pouvez accéder à ces informations de profil, telles que leur pseudonyme ou leur photo de profil, à partir du <code>profile</code> qui a été sauvegardé dans la session précédemment.</p><p>Créez un gestionnaire pour le point de terminaison <code>/user</code> dans <code>web/app/user/user.go</code> et renvoyez le fichier HTML correspondant. Comme le <code>profile</code> passe à <code>ctx.HTML()</code>, vous pouvez accéder aux informations de profil, telles que <code>picture</code> et <code>nickname</code> à l’intérieur de ce même fichier HTML.</p><p>Un exemple de fichier HTML de ce type pourrait ressembler à l’exemple ci-dessous, mais vous pouvez récupérer n’importe quelle information de profil, y compris des demandes personnalisées.</p><p></p>

## Ajouter une fonctionnalité de déconnexion à votre application {{{ data-action="code" data-code="logout.go" }}}


<p>Pour déconnecter l’utilisateur, effacez les données de la session et redirigez l’utilisateur vers le point de terminaison de déconnexion Auth0. Vous trouverez plus d’informations à ce sujet dans la <a href="https://auth0.com/docs/logout" target="_blank" >documentation sur la déconnexion</a>.</p><p>Créez un fichier nommé <code>logout.go</code> dans le dossier <code>web/app/logout</code>, et ajoutez la fonction <code>Handler</code> pour rediriger l’utilisateur vers le point de terminaison de déconnexion Auth0.</p><p>L’URL <code>returnTo</code> doit figurer dans la liste des URL de déconnexion autorisées de la section des paramètres de l’application. Pour plus d’informations, consultez <a href="https://auth0.com/docs/logout/guides/redirect-users-after-logout" target="_blank" >Rediriger les utilisateurs après la déconnexion</a>.</p><p>Créez un fichier nommé <code>user.js</code> dans le dossier <code>web/static/js</code>, et ajoutez le code pour supprimer le témoin d’un utilisateur connecté.</p><p></p><p></p>

## Protéger les routes {{{ data-action="code" data-code="isAuthenticated.go" }}}


<p>La pratique recommandée veut que certaines routes ne soient accessibles qu’aux utilisateurs authentifiés. Lorsque des utilisateurs non authentifiés essaient d’accéder à des routes protégées, votre application devrait les rediriger.</p><p>Dans ce cas, vous devez mettre en œuvre un intergiciel pour accéder à la requête HTTP. La fonction d’intergiciel détermine si la requête doit être dirigée vers le gestionnaire de point de terminaison ou si elle doit être bloquée.</p><p>Créez un fichier nommé <code>isAuthenticated.go</code> dans <code>platform/middleware</code> et ajoutez une fonction qui vérifie si l’utilisateur est authentifié ou non, en fonction de la clé de session de <code>profile</code>. Si l’utilisateur n’est pas authentifié, l’intergiciel le redirigera vers la racine de l’application.</p><p>L’intergiciel créé, nous pouvons le configurer pour toute route nécessitant une authentification en l’ajoutant au routeur.</p><p></p>

## Lancer votre application {{{ data-action="code" data-code="main.go" }}}


<p>L’authentificateur et le routeur configurés, nous pouvons connecter les éléments à l’aide du point d’entrée de notre application. Dans <code>main.go</code>, créez une instance de l’authentificateur et du routeur, qui reçoit l’instance de l’authentificateur.</p><p>Si vous utilisez un fichier <code>.env</code> , vous devez appeler <code>godotenv.Load()</code> au tout début de la fonction <code>main()</code>.</p><p>Lancez votre application en utilisant la commande suivante dans votre terminal :</p><p><code>go run main.go</code></p>
