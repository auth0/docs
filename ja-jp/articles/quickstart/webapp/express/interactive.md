---
title: Expressアプリケーションにログインを追加する
description: このガイドは、Node.js ExpressアプリケーションにExpress OpenID Connect SDKを使ってAuth0を統合し、ユーザーのログイン、ログアウト、およびプロファイルを追加する方法を説明します。
interactive:  true
files:
 - files/server
github:
  path: https://github.com/auth0-samples/auth0-express-webapp-sample/tree/master/01-Login
locale: ja-JP
---

# Expressアプリケーションにログインを追加する


<p>Auth0を使用すると、アプリケーションに手軽に認証を追加することができます。このガイドは、Node.js ExpressアプリケーションにExpress OpenID Connect SDKを使ってAuth0を統合し、ユーザーのログイン、ログアウト、およびプロファイルを追加する方法を説明します。</p><p></p>

## Auth0を構成する


<p>Auth0のサービスを利用するには、Auth0 Dashboadに設定済みのアプリケーションがある必要があります。Auth0アプリケーションは、開発中のプロジェクトに対してどのように認証が動作して欲しいかを構成する場所です。</p><h3>アプリケーションを構成する</h3><p>対話型のセレクターを使ってAuth0アプリケーションを新規作成するか、統合したいプロジェクトを表す既存のアプリケーションを選択します。Auth0のすべてのアプリケーションには英数字からなる一意のクライアントIDが割り当てられており、アプリケーションのコードがSDKを通じてAuth0 APIを呼び出す際に使用されます。</p><p>このクイックスタートを使って構成されたすべての設定は、<a href="https://manage.auth0.com/#/">Dashboard</a>のアプリケーションを自動更新します。今後、アプリケーションの管理もDashboardで行えます。</p><p>完了済みの構成を見てみたい場合は、サンプルアプリケーションをご覧ください。</p><h3>Callback URLを構成する</h3><p>Callback URLとは、Auth0がユーザーを認証後にリダイレクトするアプリケーション内URLです。設定されていない場合、ユーザーはログイン後にアプリケーションに戻りません。</p><p><div class="alert-container" severity="default"><p>サンプルプロジェクトに沿って進めている場合は、<code>http://localhost:3000</code><code>/callback</code>に設定してください。</p></div></p><h3>ログアウトURLを構成する</h3><p>ログアウトURLとは、Auth0がユーザーをログアウト後にリダイレクトするアプリケーション内URLです。設定されていない場合、ユーザーはアプリケーションからログアウトできず、エラーを受け取ります。</p><p><div class="alert-container" severity="default"><p>サンプルプロジェクトに沿って進めている場合は、<code>http://localhost:3000/logout</code>に設定してください。</p></div></p>

## ExpressのOpenID Connect SDKをインストールする {{{ data-action="code" data-code="server.js#2:16" }}}


<p>アプリケーションには、Auth0がメンテナンスするOIDC準拠のExpress向けSDKである<a href="https://github.com/auth0/express-openid-connect"><code>express-openid-connect</code></a>パッケージが必要です。</p><p>ターミナルで以下のコマンドを実行してExpress OpenID Connect SDKをインストールします：</p><p><pre><code class="language-bash">cd &lt;your-project-directory&gt;

npm install express-openid-connect

</code></pre>

</p><h3>ルーターを構成する</h3><p>Express OpenID Connect SDKライブラリーは、認証ルートをアプリケーションに結びつけるために、<code>auth</code>ルーターを提供します。以下の構成キーでルーターを構成する必要があります：</p><ul><li><p><code>authRequired</code> - すべてのルートに対して認証が必要かを制御します。</p></li><li><p><code>auth0Logout</code> - Auth0ログアウト機能を使います。</p></li><li><p><code>baseURL</code> - アプリケーションが作動するURLです。</p></li><li><p><code>secret</code> - 長くて無作為な文字列です。</p></li><li><p><code>issuerBaseURL</code> - 安全なURLとしてのドメインで、<a href="https://manage.auth0.com/#/applications/%7ByourClientId%7D/settings">アプリケーションの設定</a>で確認できます。</p></li><li><p><code>clientID</code> - <a href="https://manage.auth0.com/#/applications/%7ByourClientId%7D/settings">アプリケーションの設定</a>で確認できるクライアントIDです。</p></li></ul><p>その他の構成オプションについては、<a href="https://auth0.github.io/express-openid-connect">APIドキュメント</a>をご覧ください。</p><p><div class="alert-container" severity="default"><p><code>LONG_RANDOM_STRING</code>に適した文字列は、コマンドラインの<code>openssl rand -hex 32</code>で生成できます。</p></div></p><p><div class="checkpoint">Express - 手順2 - ExpressのOpenID Connect SDKをインストールする - チェックポイント <div class="checkpoint-default"><p>ユーザーはライブラリーによって提供された<code>/login</code>ルートを訪れることで、アプリケーションにログインできるようになりました。プロジェクトを<code>localhost:3000</code>で実行している場合のリンクは、<a href="http://localhost:3000/login"><code>http://localhost:3000/login</code></a>です。</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Sorry about that. You should check the error details on the Auth0 login page to make sure you have entered the callback URL correctly.</p><p>Still having issues? Check out our <a href="https://auth0.com/docs">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p></div>

  </div></p>

## ユーザープロファイルを表示する {{{ data-action="code" data-code="server.js#25:28" }}}


<p>ユーザーのプロファイルを表示するには、アプリケーションに保護されたルートがなければなりません。</p><p>認証を必要とするルートに<code>requiresAuth</code>ミドルウェアを追加してください。このミドルウェアを使用するすべてのルートは有効なユーザーセッションをチェックし、ない場合にはユーザーをログインへリダイレクトします。</p><p><div class="checkpoint">Express - 手順3 - ユーザープロファイルを表示する - チェックポイント <div class="checkpoint-default"><p>ユーザーはライブラリーによって提供された<code>/logout</code>ルートを訪れることで、アプリケーションからログアウトできます。プロジェクトを<code>localhost:3000</code>で実行している場合のリンクは、<a href="http://localhost:3000/logout"><code>http://localhost:3000/logout</code></a>です。</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Sorry about that. You should check that you configured the logout URL correctly.</p><p>Still having issues? Check out our <a href="https://auth0.com/docs">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p></div>

  </div></p>
