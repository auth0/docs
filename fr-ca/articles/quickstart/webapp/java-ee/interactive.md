---
title: Ajouter une connexion à votre application web Java EE
description: Ce tutoriel montre comment ajouter une connexion utilisateur à une application web Java EE.
interactive:  true
files:
 - files/src/main/webapp/WEB-INF/web
 - files/src/main/java/com/auth0/example/security/Auth0AuthenticationConfig
 - files/src/main/java/com/auth0/example/web/LoginServlet
 - files/src/main/java/com/auth0/example/web/HomeServlet
 - files/src/main/java/com/auth0/example/web/LogoutServlet
github:
  path: https://github.com/auth0-samples/auth0-java-ee-sample/tree/master/01-Login
locale: fr-CA
---

# Ajouter une connexion à votre application web Java EE


<p>Ce tutoriel montre comment ajouter une connexion utilisateur à une application web Java EE. Nous vous recommandons de vous connecter pour suivre ce démarrage rapide avec les exemples configurés pour votre compte.</p><h2>Configuration requise</h2><p>Ce tutoriel et le projet d’exemple ont été testés avec les éléments suivants :</p><ul><li><p>Java 11</p></li></ul><p></p><p></p>

## Configuration d’Auth0


<h3>Obtenez vos clés d’application</h3><p>Après votre inscription à Auth0, une nouvelle application a été créée pour vous, ou vous avez pu en créer une. Vous aurez besoin de quelques informations sur cette application pour communiquer avec Auth0. Vous pouvez obtenir ces détails dans la section <a href="https://manage.auth0.com/#/applications">Paramètres de l’application</a> d’Auth0 Dashboard.</p><img src="//images.ctfassets.net/cdy7uua7fh8z/1NtemqhRTHLFgWkGyAVSC6/ae66506a56ffab891e8a36e1344e6376/uwp.png" alt="" /><p>Les informations suivantes sont nécessaires :</p><ul><li><p><b>Domain (Domaine)</b></p></li><li><p><b>Client ID (Identifiant client)</b></p></li><li><p><b>Client Secret (Secret client)</b></p></li></ul><p><div class="alert-container" severity="default"><p>En téléchargeant l’exemple en haut de cette page, les détails vous seront automatiquement fournis.</p></div></p><h3>Configuration des callback URL</h3><p>Une callback URL est une URL dans votre application où Auth0 redirige l’utilisateur après qu’il se soit authentifié. La callbackc URL de votre application doit être ajoutée au champ <b>Allowed Callback URLs (Callback URL autorisées)</b> dansples <a href="https://manage.auth0.com/#/applications">Paramètres de l’application</a>. Si ce champ n’est pas défini, les utilisateurs ne pourront pas se connecter à l’application et obtiendront un message d’erreur.</p><p><div class="alert-container" severity="default"><p>Si vous suivez l’exemple de projet que vous avez téléchargé à partir du haut de cette page, la Callback URL que vous devez ajouter au champ <b>Allowed Callback URLs (URL de déconnexion autorisées)</b> est <code>http://localhost:3000/callback</code>.</p></div></p><h3>Configuration des URL de déconnexion</h3><p>Une URL de déconnexion est une URL de votre application à laquelle Auth0 peut retourner après la déconnexion de l’utilisateur du serveur d’autorisation. Elle est indiquée dans le paramètre de requête <code>returnTo</code>. L’URL de déconnexion de votre application doit être ajoutée au champ <b>Allowed Logout URLs (URL de déconnexion autorisées)</b> dans les <a href="https://manage.auth0.com/#/applications">paramètres de l’application</a>. Si ce champ n’est pas défini, les utilisateurs ne pourront pas se déconnecter de l’application et obtiendront un message d’erreur.</p><p><div class="alert-container" severity="default"><p>Si vous suivez l’exemple de projet que vous avez téléchargé à partir du haut de cette page, l’URL de déconnexion que vous devez ajouter au champ <b>Allowed Logout URLs (URL de déconnexion autorisées)</b> est <code>http://localhost:3000/</code>.</p></div></p><p></p>

## Configurer Java EE pour utiliser Auth0 {{{ data-action="code" data-code="src/main/webapp/WEB-INF/web.xml" }}}


<h3>Configurez les dépendances</h3><p>Pour intégrer votre application Java EE avec Auth0, ajoutez les dépendances suivantes :</p><ul><li><p><b>javax.javaee-api</b> : L’API Java EE 8 est nécessaire pour écrire des applications à l’aide de Java EE 8. L’implémentation réelle est fournie par le conteneur d’application : elle n’a donc pas besoin d’être incluse dans le fichier WAR.</p></li><li><p><b>javax.security.entreprise</b> : L’API de sécurité Java EE 8 permet de gérer les problèmes de sécurité dans une application EE. Comme la dépendance <code>javax.javaee-api</code>, l’implémentation est fournie par le conteneur d’application : elle n’est donc pas incluse dans le fichier WAR.</p></li><li><p><b>auth0-java-mvc-commons</b> : Le <a href="https://github.com/auth0/auth0-java-mvc-common">Kit de développement logiciel (SDK) Java MVC Auth0</a> vous permet d’utiliser Auth0 avec Java pour les applications Web MVC côté serveur. Il génère l’URL d’autorisation que votre application doit appeler pour authentifier un utilisateur à l’aide d’Auth0.</p></li></ul><p>Si vous utilisez Maven, ajoutez les dépendances à votre <code>pom.xml</code> :<code> </code></p><p><code></code><pre><code class="language-xml">&lt;!-- pom.xml --&gt;

&lt;dependency&gt;

 &lt;groupId&gt;com.auth0&lt;/groupId&gt;

 &lt;artifactId&gt;mvc-auth-commons&lt;/artifactId&gt;

 &lt;version&gt;[1.0, 2.0)&lt;/version&gt;

&lt;/dependency&gt;

&lt;dependency&gt;

 &lt;groupId&gt;javax&lt;/groupId&gt;

 &lt;artifactId&gt;javaee-api&lt;/artifactId&gt;

 &lt;version&gt;8.0.1&lt;/version&gt;

 &lt;scope&gt;provided&lt;/scope&gt;

&lt;/dependency&gt;

&lt;dependency&gt;

 &lt;groupId&gt;javax.security.enterprise&lt;/groupId&gt;

 &lt;artifactId&gt;javax.security.enterprise-api&lt;/artifactId&gt;

 &lt;version&gt;1.0&lt;/version&gt;

 &lt;scope&gt;provided&lt;/scope&gt;

&lt;/dependency&gt;

</code></pre>

</p><p>Si vous utilisez Gradle, ajoutez-les à votre <code>build.gradle</code> :</p><p><pre><code class="language-powershell">// build.gradle



providedCompile 'javax:javaee-api:8.0.1'

providedCompile 'javax.security.enterprise:javax.security.enterprise-api:1.0'

implementation 'com.auth0:mvc-auth-commons:1. '

</code></pre>

</p><h3>Configurez votre application Java EE </h3><p><div class="alert-container" severity="default"><p>L’exemple qui accompagne ce tutoriel est écrit en JSP et testé avec le serveur d’application <a href="https://wildfly.org/">WildFly</a>. Il se peut que vous deviez adapter certaines des étapes si vous travaillez avec un conteneur d’application ou des technologies différents.</p></div></p><p>Votre application Java EE a besoin de certaines informations pour authentifier les utilisateurs avec votre application Auth0. Le fichier descripteur de déploiement <code>web.xml </code> peut être utilisé pour stocker ces informations, bien que vous puissiez les stocker dans un autre emplacement sécurisé.</p><p>Ces informations seront utilisées pour configurer la bibliothèque <b>auth0-java-mvc-commons</b> afin de permettre aux utilisateurs de se connecter à votre application. Pour en savoir plus sur la bibliothèque, y compris ses différentes options de configuration, consultez le fichier <a href="https://github.com/auth0/auth0-java-mvc-common/blob/master/README.md">README</a> de la bibliothèque.</p><p><div class="tablew"><table class="table"><thead>

<tr>

<th>**Vérifier les attributs remplis**</th>

</tr>

</thead>

<tbody>

<tr>

<td>Si vous avez téléchargé cet exemple en utilisant le bouton **Download Sample**, les attributs <code>domain</code>, <code>clientId</code> et <code>clientSecret</code> seront remplis pour vous. Vous devez vérifier que les valeurs sont correctes, surtout si vous avez plusieurs applications Auth0 dans votre compte.</td>

</tr>

</tbody>

</table></div></p><p></p>

## Configurer la sécurité Java EE {{{ data-action="code" data-code="src/main/java/com/auth0/example/security/Auth0AuthenticationConfig.java" }}}


<p>L’API de Java EE 8 Security a introduit l’interface <code>HttpAuthenticationMechanism</code> pour permettre aux applications d’obtenir les identifiants d’un utilisateur. Des implémentations par défaut existent pour l’authentification de base et l’authentification basée sur le formulaire, et il est facile de configurer une stratégie d’authentification personnalisée.</p><p>Pour s’authentifier avec Auth0, il faut fournir des implémentations personnalisées des interfaces suivantes :</p><ul><li><p>HttpAuthenticationMechanism : responsable de la gestion du flux d’authentification pour les utilisateurs qui reviennent d’Auth0. (<a href="https://javaee.github.io/javaee-spec/javadocs/javax/security/enterprise/authentication/mechanism/http/HttpAuthenticationMechanism.html">JavaDoc</a>).</p></li><li><p>IdentityStore : responsable de la validation des identifiants de l’utilisateur (<a href="https://javaee.github.io/javaee-spec/javadocs/javax/security/enterprise/identitystore/IdentityStore.html">JavaDoc</a>).</p></li><li><p>CallerPrincipal : représente le principal de l’appelant de la requête HTTP en cours (<a href="https://javaee.github.io/javaee-spec/javadocs/javax/security/enterprise/CallerPrincipal.html">JavaDoc</a>).</p></li><li><p>Credential : représente l’identifiant que l’appelant utilisera pour s’authentifier (<a href="https://javaee.github.io/javaee-spec/javadocs/javax/security/enterprise/credential/Credential.html">JavaDoc</a>).</p></li></ul><p>Tout d’abord, mettez vos paramètres Auth0 à la disposition de l’application en créant un bean @ApplicationScoped pour récupérer les valeurs du contexte Web et les rendre disponibles via des getters (accesseurs).</p><p>Ensuite, créez un <code>CallerPrincipal</code> personnalisé qui représente l’appelant de la requête en cours :</p><p><pre><code class="language-javascript">// src/main/java/com/auth0/example/security/Auth0JwtPrincipal.java



public class Auth0JwtPrincipal extends CallerPrincipal {

    private final DecodedJWT idToken;



    Auth0JwtPrincipal(DecodedJWT idToken) {

        super(idToken.getClaim(&quot;name&quot;).asString());

        this.idToken = idToken;

    }



    public DecodedJWT getIdToken() {

        return this.idToken;

    }

}

</code></pre>

</p><p>Vous pouvez maintenant mettre en œuvre un <code>Credential</code> personnalisé qui sera utilisé pour représenter les identifiants de l’utilisateur. Il contiendra des informations sur le principal :</p><p><pre><code class="language-javascript">// src/main/java/com/auth0/example/security/Auth0JwtCredential.java



class Auth0JwtCredential implements Credential {

    private Auth0JwtPrincipal auth0JwtPrincipal;



    Auth0JwtCredential(String token) {

        DecodedJWT decodedJWT = JWT.decode(token);

        this.auth0JwtPrincipal = new Auth0JwtPrincipal(decodedJWT);

    }



    Auth0JwtPrincipal getAuth0JwtPrincipal() {

        return auth0JwtPrincipal;

    }

}

</code></pre>

</p><p>Vous avez maintenant défini les classes qui représentent le principal et l’identifiant d’un appelant. Ensuite, créez une implémentation personnalisée de <code>IdentityStore</code>. Cette classe sera chargée de valider les identifiants de l’utilisateur :</p><p><pre><code class="language-javascript">// src/main/java/com/auth0/example/security/Auth0JwtIdentityStore.java



@ApplicationScoped

public class Auth0JwtIdentityStore implements IdentityStore {



    @Override

    public CredentialValidationResult validate(final Credential credential) {

        CredentialValidationResult result = CredentialValidationResult.NOT_VALIDATED_RESULT;

        if (credential instanceof Auth0JwtCredential) {

            Auth0JwtCredential auth0JwtCredential = (Auth0JwtCredential) credential;

            result = new CredentialValidationResult(auth0JwtCredential.getAuth0JwtPrincipal());

        }

        return result;

    }

}

</code></pre>

</p><p>Si le <code>credential</code> est un <code>Auth0Credential</code>, l’utilisateur appelant est authentifié et valide, et un <code>CredentialValidationResult</code> créé avec le credential est renvoyé pour indiquer le succès. S’il ne s’agit pas d’un <code>Auth0Credential</code>, un <code>CredentialValidationResult.NOT_VALIDATED_RESULT</code> est renvoyé.</p><p>Avant d’implémenter l’interface <code>HttpAuthenticationMechanism</code> qui utilisera tous ces collaborateurs, créez un bean qui fournira une instance configurée du <code>AuthenticationController</code> de la trousse SDK Auth0 Java MVC. Le <code>AuthenticationController</code> est utilisé pour construire l’URL d’autorisation où les utilisateurs se connecteront, et gérer l’échange de jetons pour authentifier les utilisateurs.</p><ul><li><p>Si votre application Auth0 est configurée pour utiliser l’algorithme de signature <b>RS256 </b> (par défaut lors de la création d’une nouvelle application Auth0), vous devez configurer un <code>JwkProvider</code> pour récupérer la clé publique utilisée pour vérifier la signature du jeton. Voir le référentiel <a href="https://github.com/auth0/jwks-rsa-java">jwks-rsa-java</a> pour connaître les options de configuration supplémentaires.</p></li><li><p>Si votre application Auth0 est configurée pour utiliser l’algorithme de signature <b>HS256</b>, il n’est pas nécessaire de configurer le <code>JwkProvider</code>.</p></li></ul><p><div class="alert-container" severity="default"><p>Pour en savoir plus sur les algorithmes de signature disponibles, consultez la <a href="https://auth0.com/docs/tokens/concepts/signing-algorithms">documentation</a>.</p></div></p><p>L’exemple ci-dessous montre comment configurer le <code>AuthenticationController</code> pour l’utiliser avec l’algorithme de signature <b>RS256</b> :</p><p><pre><code class="language-javascript">// src/main/java/com/auth0/example/security/Auth0AuthenticationProvider.java



@ApplicationScoped

public class Auth0AuthenticationProvider {



    @Produces

    public AuthenticationController authenticationController(Auth0AuthenticationConfig config) {

        JwkProvider jwkProvider = new JwkProviderBuilder(config.getDomain()).build();

        return AuthenticationController.newBuilder(config.getDomain(), config.getClientId(), config.getClientSecret())

                .withJwkProvider(jwkProvider)

                .build();

    }

}

</code></pre>

</p><p>Enfin, mettez en œuvre un <code>HttpAuthenticationMechanism</code> personnalisé</p><p><code></code><pre><code class="language-javascript">// src/main/java/com/auth0/example/security/Auth0AuthenticationMechanism.java



@ApplicationScoped

@AutoApplySession

public class Auth0AuthenticationMechanism implements HttpAuthenticationMechanism {

    private final AuthenticationController authenticationController;

    private final IdentityStoreHandler identityStoreHandler;



    @Inject

    Auth0AuthenticationMechanism(AuthenticationController authenticationController, IdentityStoreHandler identityStoreHandler) {

        this.authenticationController = authenticationController;

        this.identityStoreHandler = identityStoreHandler;

    }



    @Override

    public AuthenticationStatus validateRequest(HttpServletRequest httpServletRequest,

                                                HttpServletResponse httpServletResponse,

                                                HttpMessageContext httpMessageContext) throws AuthenticationException {



        // Exchange the code for the ID token, and notify container of result.

        if (isCallbackRequest(httpServletRequest)) {

            try {

                Tokens tokens = authenticationController.handle(httpServletRequest, httpServletResponse);

                Auth0JwtCredential auth0JwtCredential = new Auth0JwtCredential(tokens.getIdToken());

                CredentialValidationResult result = identityStoreHandler.validate(auth0JwtCredential);

                return httpMessageContext.notifyContainerAboutLogin(result);

            } catch (IdentityVerificationException e) {

                return httpMessageContext.responseUnauthorized();

            }

        }

        return httpMessageContext.doNothing();

    }



    private boolean isCallbackRequest(HttpServletRequest request) {

        return request.getRequestURI().equals(&quot;/callback&quot;) &amp;&amp; request.getParameter(&quot;code&quot;) != null;

    }

}

</code></pre>

</p><p>La classe a priorité sur la méthode <code>validateRequest</code>, qui est appelée à chaque demande adressée à notre application et qui est chargée de notifier au conteneur l’état de l’authentification.</p><p>Cet exemple utilise le <a href="https://auth0.com/docs/flows/concepts/auth-code">flux de code d’autorisation</a> pour échanger un code d’autorisation contre un jeton au cours du processus d’authentification. Si cette requête est adressée au point de terminaison <code>/callback</code> et contient le paramètre de requête <code>code</code>, elle effectue quelques opérations importantes :</p><ul><li><p>Elle appelle la méthode <code>handle</code> du <code>AuthenticationController</code> pour échanger le code d’autorisation contre un jeton d’identification et un jeton d’accès.</p></li><li><p>Elle utilise le jeton d’identification pour créer un nouveau <code>Auth0Credential</code>.</p></li><li><p>Elle appelle la méthode <code>validate</code> de l’implémentation personnalisée <code>IdentityStore</code> pour obtenir le résultat de la validation.</p></li><li><p>Elle informe le conteneur de l’application de l’état de la connexion.</p></li></ul><p>Si la ressource demandée n’est pas <code>/callback</code>, elle renvoie <code>httpMessageContext.doNothing()</code> pour permettre la poursuite du traitement de la demande. Vous verrez bientôt comment utiliser les informations d’authentification lors du déclenchement de l’authentification et de l’affichage des vues Web.</p><p>Enfin, notez que l’annotation <code>@AutoApplySession</code> a été ajoutée pour permettre au conteneur de créer une session pour l’utilisateur authentifié.</p>

## Déclencher l’authentification {{{ data-action="code" data-code="src/main/java/com/auth0/example/web/LoginServlet.java" }}}


<p>Pour permettre à un utilisateur de se connecter, créez un Servlet qui traitera les requêtes au chemin <code>/login</code>.</p><p>Le <code>LoginController</code> est responsable de rediriger la requête vers l’URL d’autorisation appropriée, où l’utilisateur peut s’authentifier avec Auth0. Il utilise le <code>AuthenticationController</code> du SDK Auth0 Java MVC pour construire le bon URL d’autorisation, en utilisant les valeurs de configuration injectées via <code>Auth0AuthenticationConfig</code>. Par défaut, cet exemple demande les permissions <code>&quot;openid profile email&quot;</code> pour permettre à l’application de récupérer les informations de profil de base auprès de l’utilisateur authentifié. Vous pouvez en savoir plus sur ces permissions dans la documentation <a href="https://auth0.com/docs/scopes/current/oidc-scopes">OpenID Connect Scopes</a>.</p><p>Une fois que l’utilisateur a entré ses identifiants et autorisé les permissions demandées, Auth0 enverra une requête au <code>callbackUrl</code>, incluant un paramètre de requête <code>code</code> qui peut être échangé contre un jeton ID et un jeton d’accès. Rappelons que le <code>Auth0HttpAuthenticationMechanism</code> créé ci-dessus gère cet échange afin qu’il puisse notifier le conteneur d’applications du statut d’authentification. Cela permet au Servlet qui gère les requêtes vers le chemin <code>/callback</code> de simplement transférer la requête à la ressource initialement demandée avant de se connecter, ou simplement de rediriger vers la page d’accueil :</p><p><pre><code class="language-javascript">// src/main/com/auth0/example/web/CallbackServlet.java



@WebServlet(urlPatterns = {&quot;/callback&quot;})

public class CallbackServlet extends HttpServlet {



    @Override

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {

        String referer = (String) request.getSession().getAttribute(&quot;Referer&quot;);

        String redirectTo = referer != null ? referer : &quot;/&quot;;



        response.sendRedirect(redirectTo);

    }

}

</code></pre>

</p>

## Afficher les informations de l’utilisateur {{{ data-action="code" data-code="src/main/java/com/auth0/example/web/HomeServlet.java" }}}


<p>Vous pouvez utiliser <code>Auth0JwtPrincipal</code> pour obtenir des informations sur le profil de l’utilisateur authentifié. L’exemple de code <code>HomeServlet.java</code> montre comment utiliser les demandes sur le <a href="https://auth0.com/docs/tokens/id-token">ID token (Jeton d’identification)</a> pour définir les données de profil comme attribut de requête.</p><p>Vous pouvez ensuite utiliser ces informations de profil dans votre vue pour afficher des informations sur l’utilisateur :</p><p><pre><code class="language-html">&lt;!-- src/main/webapp/WEB-INF/jsp/fragments/navbar.jspf --&gt;



&lt;c:choose&gt;

 &lt;c:when test=&quot;{empty profile}&quot;&gt;

&lt;li&gt;

 &lt;form action=&quot;/login&quot; method=&quot;GET&quot;&gt;

&lt;input type=&quot;submit&quot; value=&quot;Login&quot;/&gt;

 &lt;/form&gt;

&lt;/li&gt;

 &lt;/c:when&gt;

 &lt;c:otherwise&gt;

&lt;li&gt;

 &lt;a href=&quot;#&quot;&gt;

&lt;!-- Profile image should be set to the profile picture from the id token --&gt;

&lt;img src=&quot;{profile.get('picture').asString()}&quot; alt=&quot;Profile picture&quot;/&gt;

 &lt;/a&gt;

 &lt;div&gt;

&lt;!-- Show the user's full name from the id token here --&gt;

&lt;div&gt;&quot;{profile.get('name').asString()}&quot;&lt;/div&gt;

&lt;a href=&quot;/profile&quot;&gt;Profile&lt;/a&gt;

&lt;a href=&quot;/logout&quot;&gt;Log out&lt;/a&gt;

 &lt;/div&gt;

&lt;/li&gt;

 &lt;/c:otherwise&gt;

&lt;/c:choose&gt;

</code></pre>

</p><p></p><p></p>

## Gérer la déconnexion {{{ data-action="code" data-code="src/main/java/com/auth0/example/web/LogoutServlet.java" }}}


<p>Pour déconnecter un utilisateur, vous devez effacer la session d’application et déconnecter l’utilisateur d’Auth0. Cette opération est gérée dans le <code>LogoutServlet</code>.</p><p>Commencez par effacer la session en appelant <code>request.getSession().invalidate()</code>. Créez ensuite l’URL de déconnexion, en veillant à inclure le paramètre de requête <code>returnTo</code>, vers lequel l’utilisateur sera redirigé après la déconnexion. Enfin, redirigez la réponse vers l’URL de déconnexion de l’application.</p>

## Exécuter l’exemple


<p>Pour construire et exécuter l’exemple, exécutez l’objectif Maven wildfly:run pour démarrer un serveur d’application WildFly intégré avec cette application déployée. Voir la documentation <a href="https://docs.jboss.org/wildfly/plugins/maven/latest/">Plugiciel WildFly Maven</a> pour plus d’informations.</p><p>Si vous utilisez Linux ou MacOS :</p><p><pre><code class="language-powershell">./mvnw clean wildfly:run

</code></pre>

</p><p>Windows :</p><p><pre><code class="language-powershell">mvnw.cmd clean wildfly:run

</code></pre>

</p><p>Pointez votre navigateur sur <code>http:</code><code>//localhost:3000.</code> Suivez le lien <b>Log In (Connexion)</b> pour vous connecter ou vous inscrire à votre locataire Auth0.</p><img src="//images.ctfassets.net/cdy7uua7fh8z/5Lp4Zahxd2v6wSJmy9JaM4/2fc68529fe5299c1fc514e3f28a8c998/Login_Screen_-_French.png" alt="null" /><p>Une fois la connexion réussie, vous verrez l’image du profil de l’utilisateur et un menu déroulant à l’endroit où se trouvait le lien Log In (Connexion). Vous pouvez alors consulter la page de profil de l’utilisateur en cliquant sur le lien <b>Profile (Profil)</b>. Vous pouvez vous déconnecter en cliquant sur le lien <b>Logout (Déconnexion)</b> dans le menu déroulant.</p>
