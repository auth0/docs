---
title: Build a Login ID screen using ACUL
description: Learn how to build a Login screen using ACUL
interactive:  true
files:
 - files/settings
 - files/auth_config
 - files/index
github:
  path: Sample-01
locale: fr-CA
---

# Build a Login ID screen using ACUL


<p>`</p>

## Configure Auth0


<p>To use Auth0 services, you’ll need to have an application set up in the Auth0 Dashboard. The Auth0 application is where you will configure how you want authentication to work for the project you are developing.</p><h3>Configure an application</h3><p>Use the interactive selector to create a new Auth0 application or select an existing application that represents the project you want to integrate with. Every application in Auth0 is assigned an alphanumeric, unique client ID that your application code will use to call Auth0 APIs through the SDK.</p><p>Any settings you configure using this quickstart will automatically update for your Application in the <a href="https://manage.auth0.com/#/" target="_blank" rel="noreferrer noopener">Dashboard</a>, which is where you can manage your Applications in the future.</p><p>If you would rather explore a complete configuration, you can view a sample application instead.</p><h3>Configure Callback URLs</h3><p>A callback URL is a URL in your application that you would like Auth0 to redirect users to after they have authenticated. If not set, users will not be returned to your application after they log in.</p><p><div class="alert-container" severity="default"><p>Si vous suivez notre exemple de projet, définissez cette URL comme suit : <code>http://localhost:3000</code>.</p></div></p><h3>Configure Logout URLs</h3><p>A logout URL is a URL in your application that you would like Auth0 to redirect users to after they have logged out. If not set, users will not be able to log out from your application and will receive an error.</p><p><div class="alert-container" severity="default"><p>Si vous suivez notre exemple de projet, définissez cette URL comme suit : <code>http://localhost:3000</code>.</p></div></p><h3>Configure Allowed Web Origins</h3><p>An Allowed Web Origin is a URL that you want to be allowed to access to your authentication flow. This must contain the URL of your project. If not properly set, your project will be unable to silently refresh authentication tokens, so your users will be logged out the next time they visit your application or refresh a page.</p><p><div class="alert-container" severity="default"><p>Si vous suivez notre exemple de projet, définissez cette URL comme suit : <code>http://localhost:3000</code>.</p></div></p>

## Configure ACUL for Login ID screen {{{ data-action="code" data-code="settings.json" }}}


<p>Use <a href="https://github.com/auth0/auth0-cli" target="_blank" rel="noreferrer noopener">Auth0 CLI</a> to enable ACLU Login ID screen in your tenant. 



In the root directory of your project, save the settings.json file.</p><p>Enable ACUL by running the following command in your terminal:</p><p><code></code><pre><code class="language-powershell">auth0 ul customize --rendering-mode advanced --prompt login-id --screen login-id --settings-file ./settings.json

</code></pre>

</p><p><div class="alert-container" severity="default"><p><b>Development Setup</b>: This example is using localhost (127.0.0.1:8080) for development. </p><p>For production, you will need to update these URLs to point to your CDN or static hosting service.</p></div></p>

## Initiate Universal Login {{{ data-action="code" data-code="auth_config.json" }}}


<p>Use one of the sample apps provided by Auth0 to initiate Universal Login</p><p>In the root folder of your project, clone the Auth0 sample application using the following command:



<pre><code class="language-powershell">git clone https://github.com/auth0-samples/auth0-react-samples

</code></pre>

</p><p>Change directory to the <code>auth0-react-samples/Sample-01 </code>folder and install the sample application using the following command:</p><p><pre><code class="language-powershell">cd auth0-react-samples/Sample-01

npm install

</code></pre>

</p><p>Change directory  to the <code>auth0-react-samples/Sample-01/src</code> folder and add the <code>auth_config.json</code> file. Edit the file to add your tenant&#39;s Custom Domain.</p><p>Run the application</p><p><pre><code class="language-powershell">npm run dev

</code></pre>

</p><p><div class="checkpoint">Étape 2 : Point de contrôle – Écran d’identification de connexion ACUL <div class="checkpoint-default"><ol><li><p>Ouvrez votre application (par défaut : <a href="http://localhost:3000/" target="_blank" rel="noreferrer noopener">http://localhost:3000</a>)</p></li><li><p>Sélectionnez le bouton <b>Log In (Connexion)</b> sur l’exemple d’application</p></li><li><p>Vous devriez être redirigé vers votre domaine Auth0</p></li></ol><p><b>Connectez-vous</b>, vous devriez voir une page blanche.</p><p>C’est normal! Cela signifie qu’Auth0 tente de charger vos ressources d’interface utilisateur personnalisées, que nous n’avons pas encore créées.</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Si vous voyez la page Auth0 par défaut au lieu d’une page vierge :</p><ol><li><p>Vérifiez si votre domaine personnalisé est correctement configuré.</p></li><li><p>Assurez-vous que votre application utilise le domaine personnalisé.</p></li></ol><p></p></div>

  </div>

</p><p>

 </p><p>

</p><p></p>

## Build a custom interface for login-id screen {{{ data-action="code" data-code="index.tsx" }}}


<p>Run a single-page application to build custom login screens. </p><h3>Configure the Boilerplate application</h3><p>1. In the root folder of your project, open a new terminal and clone the Auth0 boilerplate application using the following command:</p><p><pre><code class="language-javascript">git clone https://github.com/auth0-samples/auth0-acul-react-boilerplate

</code></pre>

</p><p>2. Change directory to the <code>auth0-acul-react-boilerplate</code> folder and install the application and the <a href="https://github.com/auth0/universal-login" target="_blank" rel="noreferrer noopener">ACUL JS SDK</a>.</p><p><pre><code class="language-javascript">// open the directory where you git clone the boilerplate

cd auth0-acul-react-boilerplate &amp;&amp; npm i



// Install the ACUL JS SDK

npm install @auth0/auth0-acul-js

</code></pre>

</p><p>3. Build the application</p><p><pre><code class="language-powershell">npm run build

</code></pre>

</p><p>4. Serve the assets</p><p><pre><code class="language-javascript">npx http-server dist -p 8080

</code></pre>

</p><p><div class="alert-container" severity="default"><p>The assets are served from localhost during development. </p><p>For production, you&#39;ll need to serve these assets from a CDN or static hosting service.</p></div></p><p><div class="checkpoint">Démarrage rapide – Étape 4 : Point de contrôle – Écran d’identification de connexion ACUL <div class="checkpoint-default"><p>Après avoir sélectionné <b>Log In (Connexion)</b>, vous êtes accueilli par une page <code>« Bonjour tout le monde »</code>.</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Assurez-vous d’avoir installé la <a href="https://github.com/auth0/universal-login" target="_blank" rel="noreferrer noopener">trousse SDK ACUL JS</a> après avoir installé l’application standard.</p></div>

  </div></p><h3>Build the ACUL Login ID screen </h3><p>Change directory to the <code>auth0-acul-react-boilerplate/src/screens/loginId/ </code>and edit the <code>index.tsx</code> file.</p><p>Rebuild the application with the following command:</p><p><pre><code class="language-powershell">npm run build

</code></pre>

</p><p><div class="checkpoint">Démarrage rapide – Étape 4 : Point de contrôle Recréer l’application – Écran d’identification de connexion ACUL <div class="checkpoint-default"><p>Sélectionnez <b>Log In (Connexion)</b>.</p><p>Vous devriez maintenant voir une page de connexion personnalisée semblable à celle-ci :</p><img src="//images.ctfassets.net/cdy7uua7fh8z/1RGhZSvF6omC3hH5ewzqQO/6ccb62962617d84cede8795d8ee3979d/Screenshot_2025-02-12_at_14.37.25.png" alt="" /><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"></div>

  </div></p>
