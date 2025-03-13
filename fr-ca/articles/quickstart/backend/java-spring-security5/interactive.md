---
title: Ajouter l’autorisation à votre application Spring Boot
description: Ce guide explique comment intégrer Auth0 à n’importe quelle application Spring Boot, nouvelle ou ancienne.
interactive:  true
files:
 - files/application
 - files/SecurityConfig
 - files/Message
 - files/APIController
github:
  path: https://github.com/auth0-samples/auth0-spring-security5-api-sample/tree/master/01-Authorization-MVC
locale: fr-CA
---

# Ajouter l’autorisation à votre application Spring Boot


<p>Auth0 vous permet d’ajouter rapidement une autorisation à votre application. Ce guide explique comment intégrer Auth0 à n’importe quelle application Spring Boot, nouvelle ou ancienne.</p><p>Si vous n’avez pas encore créé d’API dans votre Auth0 Dashboard, vous pouvez utiliser le sélecteur interactif pour créer une nouvelle API Auth0 ou sélectionner une API existante qui représente le projet avec lequel vous souhaitez vous intégrer.</p><p>Consultez <a href="https://auth0.com/docs/get-started/auth0-overview/set-up-apis">notre guide de démarrage</a> pour configurer votre première API via Auth0 Dashboard.</p><p>Chaque API Auth0 utilise l’identifiant d’API, dont votre application a besoin pour valider le jeton d’accès.</p><p><div class="alert-container" severity="default"><p><b>Vous ne connaissez pas Auth0?</b> Découvrez <a href="https://auth0.com/docs/overview">Auth0</a> et <a href="https://auth0.com/docs/api-auth">l’implémentation de l’authentification et de l’autorisation d’API</a> en utilisant le cadre d’applications OAuth 2.0.</p></div></p><p></p>

## Définir les autorisations


<p>Les autorisations vous permettent de définir comment les ressources peuvent être accessibles au nom de l’utilisateur avec un jeton d’accès en particulier. Par exemple, vous pouvez choisir d’accorder un accès en lecture à la ressource <code>messages</code> si les utilisateurs ont le niveau d’accès gestionnaire et un accès en écriture à cette ressource s’ils ont le niveau d’accès administrateur.</p><p>Vous pouvez définir les autorisations autorisées dans la vue <b>Permissions (Autorisations)</b> de la section <a href="https://manage.auth0.com/dashboard/us/dev-1-2s2aq0/apis">APIs (API)</a> d&#39;Auth0 Dashboard.</p><img src="//images.ctfassets.net/cdy7uua7fh8z/1s3Yp5zqJiKiSWqbPSezNO/677a3405b2853f5fdf9e42f6e83ceba7/Quickstarts_API_-_French.png" alt="Auth0 Dashboard> Applications > APIs (API) > [Specific API (API précise)] > Onglet Permissions (Autorisations)" /><p><div class="alert-container" severity="default"><p>Cet exemple utilise la permission <code>read:messages</code>.</p></div></p>

## Configurer l’exemple de projet {{{ data-action="code" data-code="application.yml#1:6" }}}


<p>L’exemple de projet utilise un fichier <code>/src/main/resources/application.yml</code>, qui le configure pour utiliser le <b>domaine</b> et l’<b>identificateur API</b> Auth0 corrects pour votre API. Si vous téléchargez le code à partir de cette page, il sera automatiquement configuré. En revanche, si vous clonez l’exemple à partir de GitHub, vous devrez le remplir manuellement.</p><p></p>

## Installer des dépendances {{{ data-action="code" data-code="application.yml#1:6" }}}


<p>Si vous utilisez Gradle, vous pouvez ajouter les dépendances nécessaires en utilisant le <a href="https://docs.spring.io/spring-boot/docs/current/gradle-plugin/reference/html/">plugiciel Gradle de Spring Boot</a> et le <a href="https://docs.spring.io/dependency-management-plugin/docs/current/reference/html/">plugiciel de gestion des dépendances</a> pour résoudre les problèmes de versions de dépendances :</p><p><pre><code>// build.gradle



    plugins {

        id 'java'

        id 'org.springframework.boot'

        version '3.1.5'

        id 'io.spring.dependency-management'

        version '1.1.3'

    }



    dependencies {

        implementation 'org.springframework.boot:spring-boot-starter-web'

        implementation 'com.okta.spring:okta-spring-boot-starter:3.0.5'

    }

</code></pre>

</p><p>Si vous utilisez Maven, ajoutez les dépendances Spring à votre fichier <code>pom.xml</code> :</p><p><pre><code class="language-xml">// pom.xml



&lt;parent&gt;

 &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;

 &lt;artifactId&gt;spring-boot-starter-parent&lt;/artifactId&gt;

 &lt;version&gt;3.1.5&lt;/version&gt;

 &lt;relativePath/&gt;

&lt;/parent&gt;

&lt;dependencies&gt;

 &lt;dependency&gt;

 &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;

 &lt;artifactId&gt;spring-boot-starter-web&lt;/artifactId&gt;

 &lt;/dependency&gt;

 &lt;dependency&gt;

 &lt;groupId&gt;com.okta.spring&lt;/groupId&gt;

 &lt;artifactId&gt;okta-spring-boot-starter&lt;/artifactId&gt;

 &lt;version&gt;3.0.5&lt;/version&gt;

 &lt;/dependency&gt;

&lt;/dependencies&gt;

</code></pre>

</p>

## Configurer le serveur de ressources {{{ data-action="code" data-code="SecurityConfig.java" }}}


<p>Pour configurer l’application en tant que serveur de ressources et valider les JWT, créez une classe qui fournira une instance de <code>SecurityFilterChain</code> et ajoutez l’annotation <code>@Configuration</code>.</p><h3>Protéger les points de terminaison des API</h3><p>Les routes ci-dessous sont disponibles pour les demandes suivantes :</p><ul><li><p><code>GET /api/public</code> : disponible pour les requêtes non authentifiées</p></li><li><p><code>GET /api/private</code> : disponible pour les requêtes authentifiées contenant un jeton d’accès sans permission supplémentaire</p></li><li><p><code>GET /api/private-scoped</code> : disponible pour les requêtes authentifiées contenant un jeton d’accès dont la permission <code>read:messages</code> est accordée</p></li></ul><p>L’exemple ci-dessous montre comment sécuriser les méthodes de l’API à l’aide de l’objet <code>HttpSecurity</code> fourni dans la méthode <code>filterChain()</code> de la classe <code>SecurityConfig</code>. Les adaptateurs de routes limitent l’accès en fonction du niveau d’autorisation requis.</p><p><div class="alert-container" severity="default"><p>Par défaut, Spring Security crée une <code>GrantedAuthority</code> pour chaque permission dans la demande <code>scope</code> du JWT. Cette permission permet d’utiliser la méthode <code>hasAuthority(&quot;SCOPE_read:messages&quot;)</code> pour restreindre l’accès à un JWT valide qui contient la permission <code>read:messages</code>.</p></div></p>

## Créer l’objet de domaine {{{ data-action="code" data-code="Message.java#1:4" }}}


<p>Pour que votre point de terminaison renvoie un objet JSON, utilisez un enregistrement Java. Les variables membres de cet objet sont sérialisées dans la valeur clé de votre objet JSON. Créez un nouvel enregistrement appelé <code>Message</code> comme exemple d’objet de domaine à renvoyer lors des appels à l’API.</p>

## Créer le contrôleur d’API {{{ data-action="code" data-code="APIController.java" }}}


<p>Créez une nouvelle classe appelée <code>APIController</code> pour gérer les demandes vers les points de terminaison. L’<code>APIController</code> possède trois routes définies dans la section <a href="https://auth0.com/docs/quickstart/backend/java-spring-security5/interactive#configure-the-resource-server">Protect API Endpoints (Protéger les points de terminaison des API)</a>. Dans cet exemple, toutes les origines sont autorisées par l’annotation <code>@CrossOrigin</code>. Les applications réelles doivent configurer <code>CORS</code> en fonction de leur cas d’utilisation.</p>

## Exécuter l’application {{{ data-action="code" data-code="APIController.java" }}}


<p>Pour développer et exécuter le projet exemple, exécutez la tâche Gradle <code>bootRun</code>.</p><p>Linux ou macOS :</p><p><code>./gradlew bootRun</code></p><p>Windows :</p><p><code>gradlew.bat bootRun</code></p><p>Si vous configurez votre propre application en utilisant Maven et le plugiciel <a href="https://docs.spring.io/spring-boot/docs/current/reference/html/build-tool-plugins-maven-plugin.html">Spring Boot Maven</a>, vous pouvez exécuter l’objectif <code>spring-boot:run</code>.</p><p>Linux ou macOS :</p><p><code>mvn spring-boot:run</code></p><p>Windows :</p><p><code>mvn.cmd spring-boot:run</code></p><p><div class="checkpoint">API Spring Boot - Étape 7 - Point de contrôle <div class="checkpoint-default"><p>L’exemple d’application sera disponible à l’adresse <code>http://localhost:3010/</code>. Pour en savoir plus sur la manière de tester et d’utiliser votre API, consultez l’article <a href="https://auth0.com/docs/quickstart/backend/java-spring-security5/02-using">Utiliser votre API</a>.</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>If your application did not launch successfully:</p><ul><li><p>Use the <a href="https://auth0.com/docs/quickstart/backend/java-spring-security5/03-troubleshooting">Troubleshooting</a> section to check your configuration.</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p></div>

  </div></p>
