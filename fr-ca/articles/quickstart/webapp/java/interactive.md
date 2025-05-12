---
title: Ajouter une fonctionnalité de connexion à votre Application Java Servlet
description: Ce guide explique comment intégrer Auth0 dans n’importe quelle application Java Servlet, nouvelle ou existante.
interactive:  true
files:
 - files/web
 - files/AuthenticationControllerProvider
 - files/LoginServlet
 - files/CallbackServlet
 - files/HomeServlet
 - files/LogoutServlet
github:
  path: 01-Login
locale: fr-CA
---

# Ajouter une fonctionnalité de connexion à votre Application Java Servlet


<p>Auth0 vous permet d’ajouter rapidement l’authentification et de pouvoir accéder aux informations relatives au profil utilisateur dans votre application. Ce guide explique comment intégrer Auth0 dans n’importe quelle application Java Servlet, nouvelle ou existante.</p><p></p>

## Configuration d’Auth0


<p>Pour utiliser les services Auth0, vous devez avoir une application installée dans Auth0 Dashboard. L’application Auth0 est l’endroit où vous allez configurer le fonctionnement de l’authentification pour le projet que vous développez.</p><h3>Configurer une application</h3><p>Utilisez le sélecteur interactif pour créer une nouvelle application Auth0 ou sélectionner une application existante qui représente le projet avec lequel vous souhaitez effectuer l’intégration. Dans Auth0, chaque application se voit attribuer un identifiant client unique alphanumérique que votre code d’application utilisera pour appeler les API Auth0 via la trousse SDK.</p><p>Tous les paramètres que vous configurez à l’aide de ce guide de démarrage rapide seront automatiquement mis à jour pour votre application dans le <a href="https://manage.auth0.com/#/" target="_blank" rel="noreferrer noopener">Tableau de bord</a>, qui est l’endroit où vous pourrez gérer vos applications à l’avenir.</p><p>Si vous préférez explorer une configuration complète, consultez plutôt un exemple d’application.</p><h3>Configuration des URL de rappel</h3><p>Une URL de rappel est une URL intégrée dans votre application vers laquelle vous souhaitez qu’Auth0 redirige les utilisateurs après leur authentification. Si elle n’est pas définie, les utilisateurs ne seront pas redirigés vers votre application après s’être connectés.</p><p><div class="alert-container" severity="default"><p>Si vous suivez notre exemple de projet, définissez cette URL comme suit : <code>http://localhost:3000</code><code>/callback</code>.</p></div></p><h3>Configuration des URL de déconnexion</h3><p>Une URL de déconnexion est une URL intégrée dans votre application vers laquelle vous souhaitez qu’Auth0 redirige les utilisateurs après leur déconnexion. Si elle n’est pas définie, les utilisateurs ne pourront pas se déconnecter de votre application et recevront un message d’erreur.</p><p><div class="alert-container" severity="default"><p>Si vous suivez notre exemple de projet, définissez cette URL comme suit : <code>http://localhost:3000/logout</code>.</p></div></p>

## Intégrer Auth0 dans votre application


<h3>Régler les dépendances.</h3><p>Pour intégrer votre application Java avec Auth0, ajoutez les dépendances suivantes :</p><ul><li><p><b>javax.servlet-api</b></p><p>: est la bibliothèque qui vous permet de créer des servlets Java. Vous devez ensuite ajouter une dépendance de serveur comme Tomcat ou Gretty, selon votre choix. Consultez notre code d’exemple pour plus d’informations.</p></li><li><p><b>auth0-java-mvc-commons</b> : est la <a href="https://github.com/auth0/auth0-java-mvc-common" target="_blank" rel="noreferrer noopener">bibliothèque Java</a> qui vous permet d’utiliser Auth0 avec Java pour des applications Web MVC côté serveur. Elle génère l’URL d’autorisation que vous devez appeler pour authentifier et valide le résultat reçu au retour afin d’obtenir finalement les <a href="https://auth0.com/docs/tokens" target="_blank" >jetons Auth0</a> qui identifient l’utilisateur.</p></li></ul><p>Si vous utilisez Gradle, ajoutez-les à votre <code>build.gradle</code> :</p><p><pre><code>// build.gradle



compile 'javax.servlet:javax.servlet-api:3.1.0'

compile 'com.auth0:mvc-auth-commons:1.+'W

</code></pre>

</p><p>Si vous utilisez Maven, ajoutez-les à votre fichier <code>pom.xml</code> :</p><p><pre><code>&lt;!-- pom.xml --&gt;



&lt;dependency&gt;

  &lt;groupId&gt;com.auth0&lt;/groupId&gt;

  &lt;artifactId&gt;mvc-auth-commons&lt;/artifactId&gt;

  &lt;version&gt;[1.0, 2.0)&lt;/version&gt;

&lt;/dependency&gt;

&lt;dependency&gt;

  &lt;groupId&gt;javax.servlet&lt;/groupId&gt;

  &lt;artifactId&gt;javax.servlet-api&lt;/artifactId&gt;

  &lt;version&gt;3.1.0&lt;/version&gt;

&lt;/dependency&gt;

</code></pre>

</p>

## Configurer votre application Java {{{ data-action="code" data-code="web.xml" }}}


<p>Votre application Java a besoin de certaines informations pour s’authentifier auprès de votre compte Auth0. Les exemples lisent ces informations à partir du fichier descripteur de déploiement <code>src/main/webapp/WEB-INF/web.xml</code>, mais vous pouvez les stocker ailleurs.</p><p>Ces informations seront utilisées pour configurer la bibliothèque <b>auth0-java-mvc-commons</b> afin de permettre aux utilisateurs de se connecter à votre application. Pour en savoir plus sur la bibliothèque, y compris ses différentes options de configuration, consultez la <a href="https://github.com/auth0/auth0-java-mvc-common/blob/master/README.md" target="_blank" rel="noreferrer noopener">documentation de la bibliothèque</a>.</p><h3>Vérifier les attributs remplis</h3><p>Si vous avez téléchargé cet exemple en utilisant le bouton <b>Download Sample (Télécharger l’exemple)</b>, les attributs <code>domain</code>, <code>clientId</code> et <code>clientSecret</code> seront remplis pour vous. Vous devez vérifier que les valeurs sont correctes, surtout si vous avez plusieurs applications Auth0 dans votre compte.</p><h3>Structure du projet</h3><p>L’exemple de projet, qui peut être téléchargé en utilisant le bouton <b>Download Sample (Télécharger l’exemple)</b> a la structure suivante :</p><p><pre><code>- src

-- main

---- java

------ com

-------- auth0

---------- example

------------ Auth0Filter.java

------------ AuthenticationControllerProvider.java

------------ HomeServlet.java

------------ CallbackServlet.java

------------ LoginServlet.java

------------ LogoutServlet.java

---- webapp

------ WEB-INF

-------- jsp

---------- home.jsp

-------- web.xml

- build.gradle

</code></pre>

</p><p>Le projet contient un seul JSP : <code>home.jsp</code> qui affichera les jetons associés à l’utilisateur après une connexion réussie et proposera l’option de déconnexion.</p><p>Le projet contient un WebFilter : le <code>Auth0Filter.java</code> qui vérifiera l’existence de jetons avant de donner à l’utilisateur accès à notre chemin protégé <code>/portal/*</code>. Si les jetons n’existent pas, la requête sera redirigée vers <code>LoginServlet</code>.</p><p>Le projet contient également quatre servlets :</p><ul><li><p><code>LoginServlet.java</code> : Appelé lorsque l’utilisateur essaie de se connecter. Le servlet utilise les paramètres <code>client_id</code> et <code>domain</code> pour créer une URL d’autorisation valide et y redirige l’utilisateur.</p></li><li><p><code>CallbackServlet.java</code> : Le servlet enregistre les requêtes adressées à notre URL de rappel et traite les données pour obtenir les identifiants. Après une connexion réussie, les identifiants sont ensuite enregistrés dans la HttpSession de la requête.</p></li><li><p><code>HomeServlet.java</code> : Le servlet lit les jetons précédemment enregistrés et les affiche sur la ressource <code>home.jsp</code>.</p></li><li><p><code>LogoutServlet.java</code> : Appelé lorsque l’utilisateur clique sur le lien de déconnexion. Le servlet invalide la session de l’utilisateur et redirige l’utilisateur vers la page de connexion, gérée par <code>LoginServlet</code>.</p></li><li><p><code>AuthenticationControllerProvider.java</code> : Responsable de la création et de la gestion d’une seule instance de <code>AuthenticationController</code></p></li></ul><p></p>

## Créer l’AuthenticationController {{{ data-action="code" data-code="AuthenticationControllerProvider.java#5:26" }}}


<p>Pour permettre aux utilisateurs de s’authentifier, créez une instance de l’<code>AuthenticationController</code> fournie par la trousse SDK <code>auth0-java-mvc-commons</code> en utilisant le <code>domain</code>, <code>clientId</code>, et <code>clientSecret</code>. L’exemple présente comment configurer le composant pour l’utiliser avec des jetons signés à l’aide de l’algorithme de signature asymétrique RS256, en précisant un <code>JwkProvider</code> pour récupérer la clé publique utilisée pour vérifier la signature du jeton. Consultez le <a href="https://github.com/auth0/jwks-rsa-java" target="_blank" rel="noreferrer noopener">référentiel jwks-rsa-java</a> pour en savoir plus sur les options de configuration supplémentaires. Si vous utilisez HS256, il n’est pas nécessaire de configurer <code>JwkProvider</code>.</p><p><div class="alert-container" severity="default"><p><code>AuthenticationController</code> ne stocke aucun contexte et est destiné à être réutilisé. Une création inutile peut entraîner la génération de ressources supplémentaires, ce qui peut avoir une incidence sur les performances.</p></div></p>

## Redirection de connexion {{{ data-action="code" data-code="LoginServlet.java#21:23" }}}


<p>Pour permettre aux utilisateurs de se connecter, votre application les redirigera vers la page de <a data-contentfulid="67MpEy8zCywwI8YMkn5jy1-fr-CA">Connexion universelle</a>. En utilisant l’instance <code>AuthenticationController</code> , vous pouvez générer l’URL de redirection en appelant la méthode <code>buildAuthorizeUrl(HttpServletRequest request</code>, <code>HttpServletResponse response</code>, <code>String redirectUrl)</code>. L’URL de redirection doit être celle qui a été ajoutée aux <b>URL de rappel autorisées</b> de votre application Auth0.</p>

## Gérer les jetons {{{ data-action="code" data-code="CallbackServlet.java#16:37" }}}


<p>Après que l’utilisateur s’est connecté, le résultat sera reçu dans notre <code>CallbackServlet</code> via une requête HTTP GET ou POST. Comme nous utilisons le flux de code d’autorisation (par défaut), une requête GET sera envoyée. Si vous avez configuré la bibliothèque pour le flux implicite, une requête POST sera plutôt envoyée.</p><p>La requête contient le contexte d’appel que la bibliothèque a précédemment défini en générant l’URL d’autorisation avec <code>AuthenticationController</code>. Lorsqu’il est passé au contrôleur, vous recevez soit une instance <code>Tokens</code> valide soit une Exception indiquant ce qui a mal tourné. En cas d’appel réussi, vous devez enregistrer les identifiants afin de pouvoir y accéder ultérieurement. Vous pouvez utiliser <code>HttpSession</code> de la requête en utilisant la classe <code>SessionsUtils</code> comprise dans la bibliothèque.</p><p><div class="alert-container" severity="default"><p>Il est recommandé d’enregistrer le moment où nous avons demandé les jetons ainsi que la valeur <code>expiresIn</code> reçue, afin que la prochaine fois que nous utiliserons le jeton, nous puissions vérifier s’il a déjà expiré ou s’il est encore valide. Pour les besoins de cet exemple, nous ignorerons cette validation.</p></div></p>

##  Afficher la page d’accueil {{{ data-action="code" data-code="HomeServlet.java#4:14" }}}


<p>Maintenant que l’utilisateur est authentifié (les jetons existent), <code>Auth0Filter</code> leur permettra d’accéder à nos ressources protégées. Dans le <code>HomeServlet</code> nous obtenons les jetons de la session de la requête et les définissons comme l’attribut <code>userId</code> afin qu’ils puissent être utilisés dans le code JSP.</p>

## Gérer la déconnexion {{{ data-action="code" data-code="LogoutServlet.java#13:30" }}}


<p>Pour gérer adéquatement la déconnexion, nous devons effacer la session et déconnecter l’utilisateur d’Auth0. Cette opération est gérée dans <code>LogoutServlet</code> de notre exemple d’application.</p><p>Tout d’abord, nous effaçons la session en appelant <code>request.getSession().invalidate()</code>. Nous générons ensuite l’URL de déconnexion, en veillant à inclure le paramètre de requête <code>returnTo</code> qui est l’endroit où l’utilisateur sera redirigé après la déconnexion. Enfin, nous redirigeons la réponse vers notre URL de déconnexion.</p>

## Exécuter l’exemple


<p>Pour exécuter l’exemple à partir d’un terminal, placez-vous dans le dossier racine du projet et exécutez la ligne suivante :</p><p><code>./gradlew clean app</code></p><p>Après quelques secondes, l’application sera accessible sur <code>http://localhost:3000/</code>. Essayez d’accéder à la ressource protégée <a href="http://localhost:3000/portal/home" target="_blank" rel="noreferrer noopener">http://localhost:3000/portal/home</a> et notez comment vous êtes redirigé par <code>Auth0Filter</code> vers la page de connexion Auth0. Le gadget logiciel affiche toutes les connexions via réseaux sociaux et de bases de données que vous avez définies pour cette application dans le <a href="https://manage.auth0.com/#/" target="_blank" rel="noreferrer noopener">tableau de bord</a>.</p><img src="//images.ctfassets.net/cdy7uua7fh8z/7L6lZ6xCi1L7sJBFZUPb9g/215ad0b724c138290b0b217edb5ddf96/Login_Screen_-_French.png" alt="null" /><p>Vous serez en mesure de voir le contenu de la page d’accueil après une authentification réussie.</p><img src="//images.ctfassets.net/cdy7uua7fh8z/FzK3jxfSGoeIDYQamxnJl/6b608e39ff39e044644193cfd2ee0f69/java-step-9-2.png" alt="null" /><p>Déconnectez-vous en cliquant sur le bouton <b>logout (déconnexion)</b> en haut à droite de la page d’accueil.</p>
