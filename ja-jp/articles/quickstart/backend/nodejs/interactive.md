---
title: Express.js APIアプリケーションに認可を追加する
description: このガイドは、新規または既存のExpress.js APIアプリケーションにexpress-oauth2-jwt-bearerパッケージを使ってAuth0を統合する方法を説明します。
interactive:  true
files:
 - files/server
github:
  path: https://github.com/auth0-samples/auth0-express-api-samples/tree/master/01-Authorization-RS256
locale: ja-JP
---

# Express.js APIアプリケーションに認可を追加する


<p>このガイドは、新規または既存のExpress.js APIアプリケーションに<code>express-oauth2-jwt-bearer</code>パッケージを使ってAuth0を統合する方法を説明します。</p><p>Auth0 DashboardでAPIをまだ作成していない場合は、対話型のセレクターを使ってAuth0 APIを新規作成します。そうでない場合は、既存のプロジェクトAPIを選択します。</p><p>Auth0 Dashboardを使って初めてAPIをセットアップする場合には、<a href="https://auth0.com/docs/get-started/auth0-overview/set-up-apis">使用の開始ガイド</a>を確認してください。それぞれのAuth0 APIにはAPI識別子があり、アプリケーションにアクセストークンの検証で使用されます。</p><p><div class="alert-container" severity="default"><p><b>Auth0を初めてご利用ですか？</b><a href="https://auth0.com/docs/overview">Auth0の仕組み</a>と、OAuth 2.0フレームワークを用いた<a href="https://auth0.com/docs/api-auth">API認証と認可の実装</a>について説明します。</p></div></p><p></p>

## アクセス許可を定義する


<p>アクセス許可は、ユーザーの代わりに、提供されたアクセストークンを使ってどのようにしてリソースにアクセスできるのかを定義できるようにします。たとえば、ユーザーがマネージャーアクセスレベルを持つ場合には、<code>messages</code>リソースに対して読み出しアクセスを付与し、管理者アクセスレベルを持つ場合には、書き込みアクセスを付与することができます。</p><p>Auth0 Dashboardの<a href="https://manage.auth0.com/#/apis">［APIs］</a>セクションにある<b>［Permissions（権限）］</b>ビューで使用可能なアクセス許可を定義することができます。</p><img src="//images.ctfassets.net/cdy7uua7fh8z/5EnGfdqLVZ8fuIxbUn7gm1/ee4278d6ae1910497771f3b9762c86f8/Quickstarts_API.png" alt="null" /><p><div class="alert-container" severity="default"><p>以下の例では<code>read:messages</code>スコープを使用します。</p></div></p>

## 依存関係をインストールする


<p>まず、<code>npm</code>でSDKをインストールします。</p><p><pre><code class="language-powershell">npm install --save express-oauth2-jwt-bearer

</code></pre>

</p>

## ミドルウェアを構成する {{{ data-action="code" data-code="server.js#1:10" }}}


<p>ドメインとAPI識別子を使って、<code>express-oauth2-jwt-bearer</code>を構成します。</p><p>右に示した<code>checkJwt</code>ミドルウェアは、要求に含まれるユーザーのアクセストークンが有効かを確認します。トークンが有効でない場合、ユーザーがエンドポイントにアクセスしようとすると、「401 Authorization」というエラーが発生します。</p><p>ミドルウェアは、トークンに要求されたリソースにアクセスするだけの十分なスコープがあるかを確認しません。</p>

## APIエンドポイントを保護する {{{ data-action="code" data-code="server.js#12:32" }}}


<p>有効なJWTを必須して個々のルートを保護するには、<code>express-oauth2-jwt-bearer</code>から構築された<code>checkJwt</code>ミドルウェアでルートを構成します。</p><p>特定のスコープを検索するために、個々のルートを構成することができます。これを実現するには、<code>requiresScope</code>メソッドで別のミドルウェアをセットアップします。必要なスコープを提供し、認可を追加したいルートにミドルウェアを適用します。</p><p><code>checkJwt</code>と<code>requiredScopes</code>ミドルウェアを保護したいルートに渡します。</p><p>この構成では、<code>read:messages</code>スコープを持つアクセストークンのみがエンドポイントにアクセスすることができます。</p><h3>APIを呼び出す</h3><p>APIを呼び出すにはアクセストークンが必要です。テスト用のアクセストークンは、<a href="https://manage.auth0.com/#/apis">API設定</a>の<b>［Test（テスト）］</b>ビューから取得することができます。</p><img src="//images.ctfassets.net/cdy7uua7fh8z/5HUMcKGXoNOvdJNXFI73oi/f50dd78093814054a81903d1e478f3aa/API_access_tokens.png" alt="null" /><p>要求の<code>Authorization</code>ヘッダーにアクセストークンを指定します。</p><p><pre><code>curl --request GET \

  --url http://${account.namespace}/api_path \

  --header 'authorization: Bearer YOUR_ACCESS_TOKEN_HERE'

</code></pre>

</p><p><div class="checkpoint">Node JS API手順4「チェックポイント」 <div class="checkpoint-default"><p>アプリケーションの構成が完了したら、アプリケーションを実行して次の点を確認します：</p><ul><li><p><code>GET /api/public</code>が認証を必要としない要求に使用できる。</p></li><li><p><code>GET /api/private</code>が認証された要求に使用できる。</p></li><li><p><code>GET /api/private-scoped</code>が<code>read:messages</code>スコープが付与されたアクセストークンを含む認証された要求に使用できる。</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>If your application did not start successfully:</p><ul><li><p>Verify you added the token as the <code>Authorization</code> header</p></li><li><p>Ensure the token has the correct scopes. Verify with <a href="https://jwt.io/">jwt.io</a>.</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p></div>

  </div></p>
