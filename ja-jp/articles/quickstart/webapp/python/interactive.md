---
title: Python Flaskアプリケーションにログインを追加する
description: このガイドでは、Python FlaskアプリケーションにAuthlib SDKを使ってAuth0を統合する方法を説明します。
interactive:  true
files:
 - files/server
 - files/templates/home
github:
  path: https://github.com/auth0-samples/auth0-python-web-app/tree/master/01-Login
locale: ja-JP
---

# Python Flaskアプリケーションにログインを追加する


<p>Auth0を使用すると、アプリケーションに認証を追加して、ユーザープロファイル情報にアクセスすることができます。このガイドでは、Python <a href="https://flask.palletsprojects.com/">Flask</a>アプリケーションに<a href="https://authlib.org/">Authlib</a> SDKを使ってAuth0を統合する方法を説明します。</p><p></p>

## Auth0を構成する


<p>Auth0のサービスを利用するには、Auth0 Dashboadでセットアップしたアプリケーションが必要です。Auth0アプリケーションは、開発中のプロジェクトに対してどのように認証が動作して欲しいかを構成する場所です。</p><h3>アプリケーションを構成する</h3><p>対話型のセレクターを使ってAuth0アプリケーションを新規作成するか、統合したいプロジェクトを表す既存のアプリケーションを選択します。Auth0のすべてのアプリケーションには英数字からなる一意のクライアントIDが割り当てられており、アプリケーションのコードがSDKを通じてAuth0 APIを呼び出す際に使用されます。</p><p>このクイックスタートを使って構成されたすべての設定は、<a href="https://manage.auth0.com/#/">Dashboard</a>のアプリケーションを自動更新します。今後、アプリケーションの管理もDashboardで行えます。</p><p>代わりに完了済みの構成を見てみたい場合は、サンプルアプリケーションをご覧ください。</p><h3>Callback URLを構成する</h3><p>Callback URLとは、Auth0がユーザーを認証後にリダイレクトするアプリケーション内URLです。設定されていない場合、ユーザーはログイン後にアプリケーションに戻りません。</p><p><div class="alert-container" severity="default"><p>サンプルプロジェクトに沿って進めている場合は、<code>http://localhost:3000/callback</code>に設定してください。</p></div></p><h3>ログアウトURLを構成する</h3><p>ログアウトURLとは、Auth0がユーザーをログアウト後にリダイレクトするアプリケーション内URLです。設定されていない場合、ユーザーはアプリケーションからログアウトできず、エラーを受け取ります。</p><p><div class="alert-container" severity="default"><p>サンプルプロジェクトに沿って進めている場合は、<code>http://localhost:3000</code>に設定してください。</p><p></p></div></p>

## 依存関係をインストールする


<p>プロジェクトディレクトリに<code>requirements.txt</code>ファイルを作成します：</p><p><pre><code class="language-powershell"># 📁 requirements.txt -----



flask&gt;=2.0.3

python-dotenv&gt;=0.19.2

authlib&gt;=1.0

requests&gt;=2.27.1

</code></pre>

</p><p>シェルから以下のコマンドを実行し、プロジェクトで依存関係が利用できるようにします：</p><p><pre><code class="language-powershell">pip install -r requirements.txt

</code></pre>

</p>

## .envファイルを構成する


<p>次に、プロジェクトのディレクトリに<code>.env</code>ファイルを作成します。このファイルにはクライアントキーやその他の構成情報が含まれます。</p><p><pre><code># 📁 .env -----



AUTH0_CLIENT_ID=${account.clientId}

AUTH0_CLIENT_SECRET=${account.clientSecret}

AUTH0_DOMAIN=${account.namespace}

APP_SECRET_KEY=

</code></pre>

</p><ul><li><p>シェルから<code>openssl rand -hex 32</code>を使って、<code>APP_SECRET_KEY</code>の文字列を生成します。</p></li></ul><p></p>

## アプリケーションをセットアップする {{{ data-action="code" data-code="templates/home.html" }}}


<p>次に、アプリケーションをセットアップします。プロジェクトディレクトリで<code>server.py</code>ファイルを作成します。このファイルにはアプリケーションロジックが含まれます。</p><p>アプリケーションに必要なすべてのライブラリーをインポートします。</p><p>前の手順で作成した構成<code>.env</code>ファイルを読み込みます。</p><p>Auth0でアプリケーションの認証を処理するためにAuthlibを構成します。AuthlibのOAuth <code>register()</code>メソッドで使用できる構成オプションの詳細については、<a href="https://docs.authlib.org/en/latest/client/frameworks.html#using-oauth-2-0-to-log-in">Authlibのドキュメント</a></p>

## ルートをセットアップする {{{ data-action="code" data-code="server.py" }}}


<p>この例では、アプリケーションにlogin、callback、logout、homeの4つのルートを追加します。</p><p>アプリ訪問者が<code>/login</code>ルートにアクセスすると、アプリケーションはユーザーをAuth0ログインページに遷移します。</p><p>ユーザーがAuth0でログインした後、アプリケーションはユーザーを<code>/callback</code>ルートに遷移します。このルートはユーザーのためにセッションを保存し、戻ってきた時に再度ログインする必要性を回避します。</p><p><code>/logout</code>ルートは、ユーザーをアプリケーションからサインアウトさせます。アプリのユーザーセッションを消去し、Auth0ログアウトエンドポイントにリダイレクトして、セッションがもう保存されていないことを保証します。その後、アプリケーションはユーザーをホームルートにリダイレクトします。</p><p><code>/</code>ホームルートは認証されたユーザーの詳細を表示したり、訪問者のサインインを許可したりします。</p>

## テンプレートを追加する


<p>次に、（<code>render_template()</code>の呼び出し中に）ホームルートで使用されるテンプレートファイルを作成します。</p><p><code>templates</code>という名前のプロジェクトフォルダーに新しいサブディレクトリを作成し、ディレクトリに<code>home.html</code>を作成します。コンテンツを右から対象ファイルに貼り付けます。</p>

## アプリケーションを実行する


<p>アプリケーションを実行するには、プロジェクトディレクトリのルートに移動し、ターミナルを開きます。次のコマンドを実行します：</p><p><pre><code class="language-python">python3 server.py

</code></pre>

</p><p><div class="checkpoint">Python手順7「チェックポイント」 <div class="checkpoint-default"><p>検証するには<a href="http://localhost:3000/">http://localhost:3000</a>を訪問します。ログインのためにAuth0へルートするログインボタンがあり、ログイン後アプリケーションに戻るとプロファイル情報を確認できます。</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>If your application did not start successfully:</p><ul><li><p>Verify any errors in the console.</p></li><li><p>Verify the domain and Client ID imported correctly.</p></li><li><p>Verify your tenant configuration.</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs">documentation</a> or visit our <a href="https://community.auth0.com">community page</a> to get more help</p><p></p></div>

  </div></p>
