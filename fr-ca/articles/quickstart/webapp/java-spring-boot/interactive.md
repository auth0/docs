---
title: Ajouter une fonctionnalité de connexion à votre application Spring Web
description: Ce guide explique comment intégrer Auth0 à une application Spring Boot à l’aide de la trousse SDK Spring Boot Auth0.
interactive:  true
files:
 - files/application
 - files/SecurityConfig
 - files/index
 - files/HomeController
 - files/SecurityConfigWithLogout
github:
  path: mvc-login
locale: fr-CA
---

# Ajouter une fonctionnalité de connexion à votre application Spring Web


<p><div class="alert-container" severity="default"><h3>Vous utilisez Spring WebFlux?</h3><p>Ce tutoriel utilise <a href="https://docs.spring.io/spring/docs/current/spring-framework-reference/web.html" target="_blank" rel="noreferrer noopener">Spring MVC</a>. Si vous utilisez <a href="https://docs.spring.io/spring/docs/current/spring-framework-reference/web-reactive.html#spring-web-reactive" target="_blank" rel="noreferrer noopener">Spring WebFlux</a>, les étapes pour ajouter l’authentification sont similaires, mais certains détails d’implémentation sont différents. Reportez-vous au <a href="https://github.com/auth0-samples/auth0-spring-boot-login-samples/tree/master/webflux-login" target="_blank" rel="noreferrer noopener">Code d’exemple Spring Boot WebFlux</a> pour voir comment intégrer Auth0 à votre application Spring Boot WebFlux.</p></div></p><p></p>

## Configuration d’Auth0


<p>Pour utiliser les services Auth0, vous devez avoir une application installée dans Auth0 Dashboard. L’application Auth0 est l’endroit où vous allez configurer le fonctionnement de l’authentification pour le projet que vous développez.</p><h3>Configurer une application</h3><p>Utilisez le sélecteur interactif pour créer une nouvelle application Auth0 ou sélectionner une application existante qui représente le projet avec lequel vous souhaitez effectuer l’intégration. Dans Auth0, chaque application se voit attribuer un identifiant client unique alphanumérique que votre code d’application utilisera pour appeler les API Auth0 via la trousse SDK.</p><p>Tous les paramètres que vous configurez à l’aide de ce guide de démarrage rapide seront automatiquement mis à jour pour votre application dans le <a href="https://manage.auth0.com/#/" target="_blank" rel="noreferrer noopener">Tableau de bord</a>, qui est l’endroit où vous pourrez gérer vos applications à l’avenir.</p><p>Si vous préférez explorer une configuration complète, consultez plutôt un exemple d’application.</p><h3>Configuration des URL de rappel</h3><p>Une URL de rappel est une URL intégrée dans votre application vers laquelle vous souhaitez qu’Auth0 redirige les utilisateurs après leur authentification. Si elle n’est pas définie, les utilisateurs ne seront pas redirigés vers votre application après s’être connectés.</p><p><div class="alert-container" severity="default"><p>Si vous suivez notre projet à titre d’exemple, définissez ceci sur</p><p><code>http://localhost:3000/login/oauth2/code/okta</code>.</p></div></p><h3>Configuration des URL de déconnexion</h3><p>Une URL de déconnexion est une URL intégrée dans votre application vers laquelle vous souhaitez qu’Auth0 redirige les utilisateurs après leur déconnexion. Si elle n’est pas définie, les utilisateurs ne pourront pas se déconnecter de votre application et recevront un message d’erreur.</p><p><div class="alert-container" severity="default"><p>Si vous suivez notre projet à titre d’exemple, définissez ceci sur</p><p><code>http://localhost:3000</code>.</p><p></p></div></p>

## Configurer l’application Sprint Boot


<h3>Ajouter les dépendances Spring</h3><p>Pour intégrer votre application Spring Boot avec Auth0, incluez <a href="https://github.com/okta/okta-spring-boot/" target="_blank" rel="noreferrer noopener">Okta Spring Boot Starter</a> dans les dépendances de votre application.</p><p><div class="alert-container" severity="default"><p>Ce guide utilise <a href="https://www.thymeleaf.org/" target="_blank" rel="noreferrer noopener">Thymeleaf</a> et le <a href="https://github.com/thymeleaf/thymeleaf-extras-springsecurity" target="_blank" rel="noreferrer noopener">module d’intégration Spring Security</a> pour la couche d’affichage. Si vous utilisez une technologie d’affichage différente, la configuration et les composants de Spring Security restent les mêmes.</p></div></p><p>Si vous utilisez Gradle, vous pouvez inclure ces dépendances comme indiqué ci-dessous.</p><p><pre><code class="language-javascript">plugins {

 id 'java'

 id 'org.springframework.boot' version '3.1.4'

 id 'io.spring.dependency-management' version '1.1.3'

}



implementation 'com.okta.spring:okta-spring-boot-starter:3.0.5'

implementation 'org.springframework.boot:spring-boot-starter-web'

implementation 'org.springframework.boot:spring-boot-starter-thymeleaf'

implementation 'org.thymeleaf.extras:thymeleaf-extras-springsecurity6'

implementation 'nz.net.ultraq.thymeleaf:thymeleaf-layout-dialect'

</code></pre>

</p><p>Si vous utilisez Maven :</p><p><pre><code class="language-xml">&lt;parent&gt;

 &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;

 &lt;artifactId&gt;spring-boot-starter-parent&lt;/artifactId&gt;

 &lt;version&gt;3.1.4&lt;/version&gt;

 &lt;relativePath/&gt;

&lt;/parent&gt;



&lt;dependencies&gt;

 &lt;dependency&gt;

&lt;groupId&gt;com.okta&lt;/groupId&gt;

&lt;artifactId&gt;okta-spring-boot-starter&lt;/artifactId&gt;

&lt;version&gt;3.0.5&lt;/version&gt;

 &lt;/dependency&gt;

 &lt;dependency&gt;

&lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;

&lt;artifactId&gt;spring-boot-starter-web&lt;/artifactId&gt;

 &lt;/dependency&gt;

 &lt;dependency&gt;

&lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;

&lt;artifactId&gt;spring-boot-starter-oauth2-client&lt;/artifactId&gt;

 &lt;/dependency&gt;

 &lt;dependency&gt;

&lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;

&lt;artifactId&gt;spring-boot-starter-thymeleaf&lt;/artifactId&gt;

 &lt;/dependency&gt;

 &lt;dependency&gt;

&lt;groupId&gt;org.thymeleaf.extras&lt;/groupId&gt;

&lt;artifactId&gt;thymeleaf-extras-springsecurity6&lt;/artifactId&gt;

 &lt;/dependency&gt;

 &lt;dependency&gt;

&lt;groupId&gt;nz.net.ultraq.thymeleaf&lt;/groupId&gt;

&lt;artifactId&gt;thymeleaf-layout-dialect&lt;/artifactId&gt;

 &lt;/dependency&gt;

&lt;/dependencies&gt;

</code></pre>

</p>

## Configurer Spring Security {{{ data-action="code" data-code="application.yml" }}}


<p>Okta Spring Boot Starter facilite la configuration de votre application avec Auth0. L’exemple ci-dessous utilise un fichier <code>application.yml</code>, mais vous pouvez également utiliser des fichiers de propriétés ou tout autre <a href="https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#boot-features-external-config" target="_blank" rel="noreferrer noopener">mécanisme d’externalisation pris en charge</a>.</p><p><pre><code>#src/main/resources/application.yml



okta:

  oauth2:

    issuer: https://${account.namespace}/

    client-id: ${account.clientId}

    client-secret: ${account.clientSecret}



#The sample and instructions above for the callback and logout URL configuration use port 3000.

#If you wish to use a different port, change this and be sure your callback and logout URLs are

#configured with the correct port.

server:

  port: 3000

</code></pre>

</p>

## Ajouter une fonctionnalité de connexion à votre application {{{ data-action="code" data-code="SecurityConfig.java" }}}


<p>Pour permettre aux utilisateurs de se connecter avec Auth0, créez une classe qui enregistrera une <a href="https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/web/SecurityFilterChain.html" target="_blank" rel="noreferrer noopener">SecurityFilterChain</a> et ajoutez l’annotation <code>@Configuration</code>.</p><p><div class="alert-container" severity="default"><p>Vous pouvez configurer l’instance <a href="https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/config/annotation/web/builders/HttpSecurity.html" target="_blank" rel="noreferrer noopener">HttpSecurity</a> pour qu’elle exige une authentification sur tous les chemins ou seulement sur certains d’entre eux. Par exemple, pour exiger l’authentification sur tous les chemins à l’exception de la page d’accueil :</p><p><code> http

    .authorizeHttpRequests(authorize -&gt; authorize

        .requestMatchers(&quot;/&quot;).permitAll()

        .anyRequest().authenticated()

    );</code></p></div></p>

## Ajouter une page d’accueil {{{ data-action="code" data-code="index.html" }}}


<p>Okta Spring Boot Starter utilisera la configuration client que vous avez définie précédemment pour gérer la connexion lorsqu’un utilisateur visite le chemin /<code>/oauth2/authorization/okta</code> de votre application. Vous pouvez l’utiliser pour créer un lien de connexion dans votre application.</p><p>Cette page renvoie les attributs de l’utilisateur lorsque celui-ci s’authentifie. Vous utiliserez le lien <code>/logout</code> dans le modèle pour mettre en œuvre la fonctionnalité de déconnexion.</p>

## Ajouter un contrôleur {{{ data-action="code" data-code="HomeController.java" }}}


<p>Créez un contrôleur pour traiter la demande entrante. Ce contrôleur crée la page <code>index.html</code>. Lorsque l’utilisateur s’authentifie, l’application récupère les attributs d’information du profil utilisateur pour créer la page.</p><p><div class="checkpoint">Spring Boot - Étape 6 - Point de contrôle <div class="checkpoint-default"><p>Lorsque vous cliquez sur le lien de connexion, vérifiez que l’application vous redirige vers la page <a href="https://auth0.com/universal-login" target="_blank" >Connexion universelle Auth0</a> et que vous pouvez maintenant vous connecter ou vous inscrire en utilisant un nom d’utilisateur et un mot de passe, ou un réseau social.</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"></div>

  </div></p><img src="//images.ctfassets.net/cdy7uua7fh8z/7L6lZ6xCi1L7sJBFZUPb9g/215ad0b724c138290b0b217edb5ddf96/Login_Screen_-_French.png" alt="null" /><p><div class="alert-container" severity="default"><p>Auth0 active le fournisseur social Google par défaut sur les nouveaux locataires et vous offre des clés de développeur pour tester la connexion avec des <a href="https://auth0.com/docs/connections/identity-providers-social" target="_blank" >fournisseurs d’identité sociale</a>. Toutefois, ces clés de développeur présentent certaines limitations qui peuvent entraîner un comportement différent de votre application. Pour plus de détails sur ce comportement et comment le résoudre, consultez le document <a href="https://auth0.com/docs/connections/social/devkeys#limitations-of-developer-keys" target="_blank" >Tester les connexions sociales avec des clés de développeur Auth0</a>.</p></div></p>

## Ajouter une fonctionnalité de déconnexion à votre application {{{ data-action="code" data-code="SecurityConfigWithLogout.java" }}}


<p>Maintenant que les utilisateurs peuvent se connecter à votre application, ils ont besoin d’un <a href="https://auth0.com/docs/logout/guides/logout-auth0" target="_blank" >moyen de se déconnecter</a>. Par défaut, lorsque la déconnexion est activée, Spring Security déconnecte l’utilisateur de votre application et efface la session. Pour permettre une déconnexion réussie de Auth0, vous pouvez fournir un <code>LogoutHandler</code> pour rediriger les utilisateurs vers votre <a href="https://auth0.com/docs/api/authentication?javascript#logout" target="_blank" >point de terminaison de déconnexion Auth0</a> (<code>https://{yourDomain}/v2/logout</code>) et ensuite les rediriger immédiatement vers votre application.</p><p>Dans la classe <code>SecurityConfig</code>, fournissez un <code>LogoutHandler</code> qui redirige vers le point de terminaison de déconnexion Auth0, et configurez <code>HTTPSecurity</code> pour ajouter le gestionnaire de déconnexion.</p><p><div class="checkpoint">Spring Boot - Étape 7 - Point de contrôle <div class="checkpoint-default"><p>Lorsque vous cliquez sur le lien de déconnexion, l’application doit vous rediriger vers l’adresse que vous avez spécifiée comme l’une des « URL de déconnexion autorisées » dans les « Paramètres d’application » et vous n’êtes plus connecté à votre application.</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"></div>

  </div></p>
