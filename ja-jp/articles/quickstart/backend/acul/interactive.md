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
locale: ja-JP
---

# Build a Login ID screen using ACUL


<p>`</p>

## Configure Auth0


<p>To use Auth0 services, you’ll need to have an application set up in the Auth0 Dashboard. The Auth0 application is where you will configure how you want authentication to work for the project you are developing.</p><h3>Configure an application</h3><p>Use the interactive selector to create a new Auth0 application or select an existing application that represents the project you want to integrate with. Every application in Auth0 is assigned an alphanumeric, unique client ID that your application code will use to call Auth0 APIs through the SDK.</p><p>Any settings you configure using this quickstart will automatically update for your Application in the <a href="https://manage.auth0.com/#/" target="_blank" rel="noreferrer noopener">Dashboard</a>, which is where you can manage your Applications in the future.</p><p>If you would rather explore a complete configuration, you can view a sample application instead.</p><h3>Configure Callback URLs</h3><p>A callback URL is a URL in your application that you would like Auth0 to redirect users to after they have authenticated. If not set, users will not be returned to your application after they log in.</p><p><div class="alert-container" severity="default"><p>サンプルプロジェクトに沿って進めている場合は、<code>http://localhost:3000</code>に設定してください。</p></div></p><h3>Configure Logout URLs</h3><p>A logout URL is a URL in your application that you would like Auth0 to redirect users to after they have logged out. If not set, users will not be able to log out from your application and will receive an error.</p><p><div class="alert-container" severity="default"><p>サンプルプロジェクトに沿って進めている場合は、<code>http://localhost:3000</code>に設定してください。</p></div></p><h3>Configure Allowed Web Origins</h3><p>An Allowed Web Origin is a URL that you want to be allowed to access to your authentication flow. This must contain the URL of your project. If not properly set, your project will be unable to silently refresh authentication tokens, so your users will be logged out the next time they visit your application or refresh a page.</p><p><div class="alert-container" severity="default"><p>サンプルプロジェクトに沿って進めている場合は、<code>http://localhost:3000</code>に設定してください。</p></div></p>

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

</p><p><div class="checkpoint">ACULのログインID画面の手順2 - チェックポイント <div class="checkpoint-default"><ol><li><p>アプリケーションを開きます（デフォルト：<a href="http://localhost:3000/" target="_blank" rel="noreferrer noopener">http://localhost:3000</a>）</p></li><li><p>サンプルアプリにある<b>［Log In（ログイン）］</b>ボタンを選択します。</p></li><li><p>Auth0のドメインにリダイレクトされるはずです。</p></li></ol><p><b>ログイン</b>したら、空のページが表示されるはずです。</p><p>これは期待通りです！Auth0はカスタムUIアセットを読み込もうとしていますが、それらはまだ作成されていません。</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>空のページではなく、デフォルトのAuth0のページが表示された場合には以下を行います。</p><ol><li><p>カスタムドメインが正しく構成されていることを確認します。</p></li><li><p>アプリケーションがカスタムドメインを使用していることを確認します。</p></li></ol><p></p></div>

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

</p><p><div class="alert-container" severity="default"><p>The assets are served from localhost during development. </p><p>For production, you&#39;ll need to serve these assets from a CDN or static hosting service.</p></div></p><p><div class="checkpoint">ACULのログインID画面のクイックスタートにある手順4のチェックポイント <div class="checkpoint-default"><p><b>［Log In（ログイン）］</b>を選択すると、［<code>Hello World</code>］ページが表示されます。</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>ボイラープレートアプリケーションをインストールした後で、必ず<a href="https://github.com/auth0/universal-login" target="_blank" rel="noreferrer noopener">ACUL JS SDK</a>をインストールしてください。</p></div>

  </div></p><h3>Build the ACUL Login ID screen </h3><p>Change directory to the <code>auth0-acul-react-boilerplate/src/screens/loginId/ </code>and edit the <code>index.tsx</code> file.</p><p>Rebuild the application with the following command:</p><p><pre><code class="language-powershell">npm run build

</code></pre>

</p><p><div class="checkpoint">ACULのログインID画面のクイックスタートにある手順4のアプリ再構築のチェックポイント <div class="checkpoint-default"><p><b>［Log In（ログイン）］</b>を選択します。</p><p>以下のようにカスタマイズされたログインページが表示されるはずです。</p><img src="//images.ctfassets.net/cdy7uua7fh8z/1RGhZSvF6omC3hH5ewzqQO/6ccb62962617d84cede8795d8ee3979d/Screenshot_2025-02-12_at_14.37.25.png" alt="" /><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"></div>

  </div></p>
