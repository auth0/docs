---
title: Ajouter une fonctionnalité de connexion à votre application Python Flask
description: Ce guide explique comment intégrer Auth0 à une application PythonºFlask, à l’aide de la trousse SDK Authlib.
interactive:  true
files:
 - files/server
 - files/templates/home
github:
  path: 01-Login
locale: fr-CA
---

# Ajouter une fonctionnalité de connexion à votre application Python Flask


<p>Auth0 vous permet d’ajouter l’authentification et de pouvoir accéder aux informations relatives au profil de l’utilisateur dans votre application. Ce guide explique comment intégrer Auth0 à une application Python <a href="https://flask.palletsprojects.com/" target="_blank" rel="noreferrer noopener">Flask</a>, à l’aide de la trousse SDK <a href="https://authlib.org/" target="_blank" rel="noreferrer noopener">Authlib</a>.</p><p></p>

## Configuration d’Auth0


<p>Pour utiliser les services Auth0, vous devez avoir une application installée dans Auth0 Dashboard. L’application Auth0 est l’endroit où vous allez configurer le fonctionnement de l’authentification pour le projet que vous développez.</p><h3>Configurer une application</h3><p>Utilisez le sélecteur interactif pour créer une nouvelle application Auth0 ou sélectionner une application existante qui représente le projet avec lequel vous souhaitez effectuer l’intégration. Dans Auth0, chaque application se voit attribuer un identifiant client unique alphanumérique que votre code d’application utilisera pour appeler les API Auth0 via la trousse SDK.</p><p>Tous les paramètres que vous configurez à l’aide de ce guide de démarrage rapide seront automatiquement mis à jour pour votre application dans le <a href="https://manage.auth0.com/#/" target="_blank" rel="noreferrer noopener">Tableau de bord</a>, qui est l’endroit où vous pourrez gérer vos applications à l’avenir.</p><p>Si vous préférez explorer une configuration complète, consultez plutôt un exemple d’application.</p><h3>Configurer les URL de rappel</h3><p>Une URL de rappel est une URL intégrée dans votre application vers laquelle vous souhaitez qu’Auth0 redirige les utilisateurs après leur authentification. Si elle n’est pas définie, les utilisateurs ne seront pas redirigés vers votre application après s’être connectés.</p><p><div class="alert-container" severity="default"><p>Si vous suivez notre projet à titre d’exemple, définissez ceci sur <code>http://localhost:3000/callback</code>.</p></div></p><h3>Configuration des URL de déconnexion</h3><p>Une URL de déconnexion est une URL intégrée dans votre application vers laquelle vous souhaitez qu’Auth0 redirige les utilisateurs après leur déconnexion. Si elle n’est pas définie, les utilisateurs ne pourront pas se déconnecter de votre application et recevront un message d’erreur.</p><p><div class="alert-container" severity="default"><p>Si vous suivez notre projet à titre d’exemple, définissez ceci sur <code>http://localhost:3000</code>.</p><p></p></div></p>

## Installer les dépendances


<p>Créez un fichier <code>requirements.txt</code> dans le répertoire de votre projet :</p><p><pre><code class="language-powershell"># 📁 requirements.txt -----



flask&gt;=2.0.3

python-dotenv&gt;=0.19.2

authlib&gt;=1.0

requests&gt;=2.27.1

</code></pre>

</p><p>Exécutez la commande suivante depuis votre shell pour activer les dépendances suivantes dans votre projet :</p><p><pre><code class="language-powershell">pip install -r requirements.txt

</code></pre>

</p>

## Configurez votre fichier .env


<p>Ensuite, créez un fichier <code>.env</code> dans votre répertoire de projet. Ce fichier contiendra les clés de vos clients et d’autres détails de configuration.</p><p><pre><code># 📁 .env -----



AUTH0_CLIENT_ID=${account.clientId}

AUTH0_CLIENT_SECRET=${account.clientSecret}

AUTH0_DOMAIN=${account.namespace}

APP_SECRET_KEY=

</code></pre>

</p><ul><li><p>Générez une chaîne pour <code>APP_SECRET_KEY</code> en utilisant <code>openssl rand -hex 32</code> depuis votre shell.</p></li></ul><p></p>

## Configurez votre application {{{ data-action="code" data-code="templates/home.html" }}}


<p>Ensuite, configurez votre application. Créez un fichier <code>server.py</code> dans le répertoire de votre projet; ce fichier contiendra la logique de votre application.</p><p>Importez toutes les bibliothèques nécessaires à votre application.</p><p>Chargez le fichier de configuration <code>.env</code> que vous avez créé à l’étape précédente.</p><p>Configurez Authlib pour gérer l’authentification de votre application avec Auth0. Apprenez-en davantage sur les options de configuration possibles pour la méthode <code>register()</code> d’Authlib OAuth dans <a href="https://docs.authlib.org/en/latest/client/frameworks.html#using-oauth-2-0-to-log-in" target="_blank" rel="noreferrer noopener">leur documentation.</a></p>

## Configurez vos routes {{{ data-action="code" data-code="server.py" }}}


<p>Dans cet exemple, vous ajouterez quatre routes à l’application : connexion, callback, déconnexion et accueil.</p><p>Lorsque les visiteurs de votre application se rendent sur la route <code>/login</code>, votre application les dirige vers la page de connexion Auth0.</p><p>Une fois vos utilisateurs connectés avec Auth0, votre application les dirige vers la route <code>/callback</code>. Cette route enregistre la session de l’utilisateur et permet de ne plus avoir à se reconnecter lorsqu’il revient.</p><p>La route <code>/logout</code> permet aux utilisateurs de se déconnecter de votre application. Cette route efface la session de l’utilisateur dans votre application et redirige vers le point de terminaison de déconnexion d’Auth0 pour s’assurer que la session n’est plus enregistrée. Ensuite, l’application redirige l’utilisateur vers votre route d’accueil.</p><p>Votre route <code>/home</code> affiche les détails d’un utilisateur authentifié ou permet aux visiteurs de s’identifier.</p>

## Ajouter des modèles


<p>Créez ensuite le fichier de modèle utilisé dans la route d’accueil (lors des appels <code>render_template()</code>).</p><p>Créez un nouveau sous-répertoire dans le dossier de votre projet, nommé <code>templates</code>, et créez <code>home.html</code> dans ce répertoire. Collez le contenu à droite dans ce fichier.</p>

## Exécuter votre application


<p>Pour exécuter votre application, naviguez jusqu’à la racine du répertoire de votre projet et ouvrez un terminal. Exécutez la commande suivante :</p><p><pre><code class="language-python">python3 server.py

</code></pre>

</p><p><div class="checkpoint">Python - Étape 7 - Point de contrôle <div class="checkpoint-default"><p>Visitez <a href="http://localhost:3000/" target="_blank" rel="noreferrer noopener">http://localhost:3000</a> pour des raisons de vérification. Un bouton de connexion devrait vous permettre de vous connecter à Auth0, puis de revenir à votre application pour consulter les informations relatives à votre profil.</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Si votre application n’a pas démarré avec succès :</p><ul><li><p>Vérifiez les erreurs éventuelles dans la console.</p></li><li><p>Vérifiez que le domaine et l’identifiant client ont été importés correctement.</p></li><li><p>Vérifiez la configuration de votre locataire.</p></li></ul><p>Vous rencontrez toujours des problèmes? Consultez notre <a href="https://auth0.com/docs" target="_blank" >documentation</a> ou la <a href="https://community.auth0.com" target="_blank" rel="noreferrer noopener">page de notre communauté</a> pour obtenir de l’aide.</p><p></p></div>

  </div></p>
