---
title: Ajouter une connexion à votre application Next.js
description: Ce guide explique comment intégrer Auth0 à n’importe quelle application Next.js, nouvelle ou existante, à l’aide de la trousse SDK Next.js Auth0.
interactive:  true
files:
 - files/.env
 - files/src/lib/auth0
 - files/src/middleware
 - files/src/app/page
github:
  path: https://github.com/auth0-samples/auth0-nextjs-samples/tree/main/Sample-01
locale: fr-CA
---

# Ajouter une connexion à votre application Next.js


<p>Ce guide explique comment intégrer Auth0 à n’importe quelle application Next.js, nouvelle ou existante, à l’aide de la trousse SDK Next.js Auth0. Nous vous recommandons de vous connecter pour suivre ce guide de démarrage rapide avec les exemples configurés pour votre compte.</p><p></p>

## Configurer Auth0


<p>Pour utiliser les services Auth0, vous devez avoir une application installée dans Auth0 Dashboard. L’application Auth0 est l’endroit où vous allez configurer le fonctionnement de l’authentification pour le projet que vous développez.</p><h3>Configurer une application</h3><p>Utilisez le sélecteur interactif pour créer une nouvelle application Auth0 ou sélectionner une application existante qui représente le projet avec lequel vous souhaitez vous intégrer. Dans Auth0, il est attribué à chaque application un identificateur client unique alphanumérique que votre code d’application utilisera pour appeler les API Auth0 via la trousse SDK.</p><p>Tous les paramètres que vous configurez à l’aide de ce guide rapide seront automatiquement mis à jour pour votre application dans le <a href="https://manage.auth0.com/#/">Dashboard</a>, qui vous permettra de gérer vos applications.</p><p>Si vous préférez explorer une configuration complète, vous pouvez plutôt consulter une application faisant office d’exemple.</p><h3>Configuration des Callback URL</h3><p>Une Callback URL est une URL intégrée dans votre application vers laquelle vous souhaitez qu’Auth0 redirige les utilisateurs après leur authentification. Si elle n’est pas définie, les utilisateurs ne seront pas redirigés vers votre application après s’être connectés.</p><p><div class="alert-container" severity="default"><p>Si vous suivez notre projet à titre d’exemple, définissez ceci sur <code>http://localhost:3000/api/auth/callback</code>.</p></div></p><h3>Configuration des URL de déconnexion</h3><p>Une URL de déconnexion est une URL intégrée dans votre application vers laquelle vous souhaitez qu’Auth0 redirige les utilisateurs après leur déconnexion. Si elle n’est pas définie, les utilisateurs ne pourront pas se déconnecter de votre application et recevront un message d’erreur.</p><p><div class="alert-container" severity="default"><p>Si vous suivez notre projet à titre d’exemple, définissez ceci sur <code>http://localhost:3000</code>.</p><p></p></div></p>

## Installer la trousse SDK Next.js Auth0


<p>Exécutez la commande suivante dans le répertoire de votre projet pour installer la trousse SDK Next.js Auth0 :</p><p><code>npm install @auth0/nextjs-auth0</code></p><p>La trousse SDK expose des méthodes et des variables qui vous aident à intégrer Auth0 à votre application Next.js en utilisant les <a href="https://nextjs.org/docs/app/building-your-application/routing/route-handlers">gestionnaires de route</a> côté dorsal et le <a href="https://reactjs.org/docs/context.html">contexte React</a> avec les <a href="https://reactjs.org/docs/hooks-overview.html">appels React</a> côté frontal.</p>

## Configuration de la trousse SDK {{{ data-action="code" data-code=".env.local" }}}


<p>Dans le répertoire racine de votre projet, ajoutez le fichier <code>.env.local</code> avec les <a href="https://nextjs.org/docs/basic-features/environment-variables">variables d’environnement</a> suivantes :</p><ul><li><p><code>AUTH0_SECRET</code> : valeur secrète longue utilisée pour chiffrer le témoin de session. Vous pouvez générer une chaîne appropriée en utilisant <code>openssl rand -hex 32</code> sur la ligne de commande.</p></li><li><p><code>AUTH0_BASE_URL</code> : URL de base de votre application.</p></li><li><p><code>AUTH0_ISSUER_BASE_URL</code> : URL de votre domaine de locataire Auth0. Si vous utilisez un <a href="https://auth0.com/docs/custom-domains">domaine personnalisé avec Auth0</a>, utilisez la valeur de votre domaine personnalisé au lieu de la valeur indiquée dans l’onglet Settings (Paramètres).</p></li><li><p><code>AUTH0_CLIENT_ID</code> : identifiant client de votre application Auth0.</p></li><li><p><code>AUTH0_CLIENT_SECRET</code> : secret client de votre application Auth0.</p></li></ul><p>La trousse SDK lira ces valeurs à partir de l’environnement du processus Node.js et se configurera automatiquement.</p>

## Ajouter le gestionnaire de route dynamique {{{ data-action="code" data-code="src/lib/auth0.ts" }}}


<p><div class="alert-container" severity="default"><p>Ce guide rapide s’adresse au <a href="https://nextjs.org/docs/app">routeur d’application</a> Next.js. Si vous utilisez le <a href="https://nextjs.org/docs/pages">routeur Pages</a>, consultez l’exemple dans le <a href="https://github.com/auth0/nextjs-auth0#page-router">README</a> de la trousse SDK.</p></div></p><p>Créez un fichier dans <code>app/api/auth/[auth0]/route.js</code>. Il s’agit de votre fichier Route Handler (Gestionnaire de route) avec un <a href="https://nextjs.org/docs/app/building-your-application/routing/route-handlers#dynamic-route-segments">Dynamic Route Segment (Segment de route dynamique)</a>.</p><p>Ensuite, importez la méthode <code>handleAuth</code> de la trousse SDK et appelez-la à partir de l’exportation <code>GET</code>. Cette opération crée les routes suivantes :</p><ul><li><p><code>/api/auth/login</code> : la route utilisée pour se connecter avec Auth0.</p></li><li><p><code>/api/auth/logout</code> : la route utilisée pour déconnecter l’utilisateur.</p></li><li><p><code>/api/auth/callback</code> : la route vers laquelle Auth0 redirigera l’utilisateur après une connexion réussie.</p></li><li><p><code>/api/auth/me</code> : la route à partir de laquelle le profil utilisateur doit être récupéré.</p></li></ul><p></p>

## Ajouter le composant UserProvider {{{ data-action="code" data-code="src/middleware.ts" }}}


<p>Côté frontal, la trousse SDK utilise React Context pour gérer l’état d’authentification de vos utilisateurs. Pour que cet état soit accessible à toutes vos pages, vous devez remplacer le <a href="https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required">Root Layout component (composant Disposition racine)</a> et envelopper la balise <code>&lt;body&gt;</code> avec un <code>UserProvider</code> dans le fichier <code>app/layout.jsx</code>.</p><p>L’état d’authentification exposé par <code>UserProvider</code> est accessible dans n’importe quel composant client à l’aide de l’appel <code>useUser()</code>.</p><p><div class="checkpoint">Next.js - Étape 5 - Point de contrôle <div class="checkpoint-default"><p>Maintenant que vous avez ajouté le Route handler (Gestionnaire de route) et <code>UserProvider</code>, exécutez votre application pour vérifier qu’elle ne génère pas d’erreurs liées à Auth0.</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"></div>

  </div></p>

## Ajouter une connexion à votre application {{{ data-action="code" data-code="src/app/page.tsx" }}}


<p>Les utilisateurs peuvent désormais se connecter à votre application en visitant Gestionnaire de route <code>/api/auth/login</code> fourni par la trousse SDK. Ajoutez un lien qui pointe vers la route de connexion à l’aide d’une <b>anchor tag (balise d’ancrage)</b>. En cliquant sur ce lien, vos utilisateurs seront redirigés vers la page de connexion universelle d’Auth0, où Auth0 pourra les authentifier. Une fois l’authentification réussie, Auth0 redirigera vos utilisateurs vers votre application.</p><p><div class="alert-container" severity="default"><p>Les prochaines règles de liaison pourraient suggérer d’utiliser le composant <code>Link</code> au lieu d’une balise d’ancrage. Le composant <code>Link</code> est destiné à effectuer des <a href="https://nextjs.org/docs/api-reference/next/link">transitions côté client entre les pages</a>. Comme le lien pointe vers une route API et non vers une page, vous devez le conserver en tant que balise d’ancrage.</p></div></p><p><div class="checkpoint">Next.js - Étape 6 - Point de contrôle <div class="checkpoint-default"><p>Ajoutez le lien de connexion à votre application.</p><ul><li><p>Lorsque vous cliquez dessus, vérifiez que votre application Next.js vous redirige vers la page <a href="https://auth0.com/universal-login">Connexion universelle Auth0</a> et que vous pouvez maintenant vous connecter ou vous inscrire en utilisant un nom d’utilisateur et un mot de passe ou un fournisseur social.</p></li><li><p>Une fois l’opération terminée, vérifiez qu’Auth0 vous redirige vers votre application.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"></div>

  </div></p><img src="//images.ctfassets.net/cdy7uua7fh8z/7L6lZ6xCi1L7sJBFZUPb9g/215ad0b724c138290b0b217edb5ddf96/Login_Screen_-_French.png" alt="null" /><p><div class="alert-container" severity="default"><p>Auth0 active le fournisseur social Google par défaut sur les nouveaux locataires et vous offre des clés de développeur pour tester la connexion avec des <a href="https://auth0.com/docs/connections/identity-providers-social">fournisseurs d’identité sociale</a>. Toutefois, ces clés de développeur présentent certaines limitations qui peuvent entraîner un comportement différent de votre application. Pour plus de détails sur ce comportement et comment le résoudre, consultez le document <a href="https://auth0.com/docs/connections/social/devkeys#limitations-of-developer-keys">Tester les connexions sociales avec des clés de développeur Auth0</a>.</p></div></p>

## Ajouter une fonctionnalité de déconnexion à votre application


<p>Maintenant que vous pouvez vous connecter à votre application Next.js, vous avez besoin <a href="https://auth0.com/docs/logout/log-users-out-of-auth0">d’un moyen de vous déconnecter</a>. Ajoutez un lien qui pointe vers la route API <code>/api/auth/logout</code>. En cliquant dessus, vous redirigez vos utilisateurs vers votre <a href="https://auth0.com/docs/api/authentication?javascript#logout">point de terminaison de déconnexion Auth0</a> (<code>https://YOUR_DOMAIN/v2/logout</code>), puis vous les redirigez immédiatement vers votre application.</p><p><div class="checkpoint">Next.js - Étape 7 - Point de contrôle <div class="checkpoint-default"><p>Ajoutez le lien de déconnexion à votre application. Lorsque vous cliquez dessus, vérifiez que votre application Next.js vous redirige vers l’adresse que vous avez indiquée comme l’une des « Allowed Logout URLs (URL de déconnexions autorisées) » dans les « Paramètres ».</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Sorry about that. Here&#39;s a couple of things to double check:</p><ul><li><p>are your environment variables populated correctly?</p></li><li><p>make sure that &quot;Allowed Callback URLs&quot; is configured correctly in your tenant</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p></div>

  </div></p>
