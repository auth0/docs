---
title: Flask APIアプリケーションに認可を追加する
description: このガイドは、Flaskを使ってビルドされた新規または既存のPython APIにAuth0を統合する方法を説明します。
interactive:  true
files:
 - files/validator
 - files/server
github:
  path: https://github.com/auth0-samples/auth0-python-api-samples/tree/master/00-Starter-Seed
locale: ja-JP
---

# Flask APIアプリケーションに認可を追加する


<p>このガイドは、<a href="https://flask.palletsprojects.com/">Flask</a>を使ってビルドされた新規または既存のPython APIにAuth0を統合する方法を説明します。</p><p>Auth0 DashboardでAPIをまだ作成していない場合は、対話型のセレクターを使ってAuth0 APIを新規作成します。そうでない場合は、統合したいプロジェクトを表す既存のAPIを選択することができます。</p><p>または、Auth0 Dashboardを使って初めてAPIをセットアップする方法を<a href="https://auth0.com/docs/get-started/auth0-overview/set-up-apis">使用の開始ガイド</a>で確認することもできます。</p><p>Auth0にあるAPIはそれぞれAPI識別子を使って構成され、アプリケーションのコードはAPI識別子をオーディエンスとしてアクセストークンを検証します。</p><p><div class="alert-container" severity="default"><p><b>Auth0を初めてご利用ですか？</b><a href="https://auth0.com/docs/overview">Auth0の仕組み</a>と、OAuth 2.0フレームワークを用いた<a href="https://auth0.com/docs/api-auth">API認証と認可の実装</a>について説明します。</p></div></p><p></p>

## アクセス許可を定義する


<p>アクセス許可は、ユーザーの代わりに、提供されたアクセストークンを使ってどのようにしてリソースにアクセスできるのかを定義できるようにします。たとえば、ユーザーがマネージャーアクセスレベルを持つ場合には、<code>messages</code>リソースに対して読み出しアクセスを付与し、管理者アクセスレベルを持つ場合には、書き込みアクセスを付与することができます。</p><p>Auth0 Dashboardの<a href="https://manage.auth0.com/#/apis">［APIs］</a>セクションにある<b>［Permissions（権限）］</b>ビューで使用可能なアクセス許可を定義することができます。</p><img src="//images.ctfassets.net/cdy7uua7fh8z/1s3Yp5zqJiKiSWqbPSezNO/acef814282795bef6921535f044f96e9/Quickstarts_API.png" alt="［Auth0 Dashboard］>［Applications（アプリケーション）］>［APIs］>［Specific API（特定のAPI］>［Permissions（権限）］タブ" /><p><div class="alert-container" severity="default"><p>以下の例では<code>read:messages</code>スコープを使用します。</p></div></p>

## 依存関係をインストールする


<p><code>requirements.txt</code>に次の依存関係を追加します：</p><p><pre><code class="language-powershell"># /requirements.txt



    flask

    Authlib

</code></pre>

</p>

## JWTバリデーターを作成する {{{ data-action="code" data-code="validator.py" }}}


<p><a href="https://github.com/lepture/authlib">Authlib</a>という名前のライブラリーを使用して、<a href="https://docs.authlib.org/en/latest/flask/1/resource-server.html">ResourceProtector</a>を作成します。これは<a href="https://flask.palletsprojects.com/patterns/viewdecorators/">Flaskデコレーター</a>の一種で、該当するバリデーターを使ってリソース（APIルート）を保護します。</p><p>バリデーターは、リソースに渡すアクセストークンに有効な署名とクレームがあることを検証します。</p><p>AuthLibの<code>JWTBearerTokenValidator</code>バリデーターに多少の変更を加えて、<a href="https://auth0.com/docs/secure/tokens/access-tokens/validate-access-tokens">アクセストークンの検証</a>要件が満たされるようにします。</p><p><code>Auth0JWTBearerTokenValidator</code>を作成するには、<code>domain</code>と<code>audience</code>（API識別子）に渡すことが必要です。そうすると、トークンの署名を検証するのに必要な公開鍵が取得され、<code>JWTBearerTokenValidator</code>クラスに渡されます。</p><p>そして、クラスの<code>claims_options</code>をオーバーライドし、トークンのexpiry、audience、issueクレームが要件を満たして有効であることを確認します。</p>

## Flaskアプリケーションを作成する {{{ data-action="code" data-code="server.py" }}}


<p>次に、3つのAPIルートを使ってFlaskアプリケーションを作成します。</p><ul><li><p><code>/api/public</code>：認証を必要としないパブリックエンドポイントです。</p></li><li><p><code>/api/private</code>：有効なJWTアクセストークンを必要とするプライベートエンドポイントです。</p></li><li><p><code>/api/private-scoped</code>：与えられた<code>scope</code>を含む有効なJWTアクセストークンを必要とするプライベートエンドポイントです。</p></li></ul><p>保護されたルートには<code>require_auth</code>デコレーターがあり、これは、以前に作成した<code>Auth0JWTBearerTokenValidator</code>を使用する<code>ResourceProtector</code>です。</p><p><code>Auth0JWTBearerTokenValidator</code>を作成するには、テナントのドメインと以前に作成したAPIのAPI識別子に渡します。</p><p><code>private_scoped</code>ルートの<code>require_auth</code>デコレーターは、追加の引数である<code>&quot;read:messages&quot;</code>を受け付けます。これは、以前に作成したアクセス許可（スコープ）について、アクセストークンをチェックします。</p><h3>APIを呼び出す</h3><p>APIを呼び出すにはアクセストークンが必要です。テスト用のアクセストークンは、<a href="https://manage.auth0.com/#/apis">API設定</a>の<b>［Test（テスト）］</b>ビューから取得することができます。</p><img src="//images.ctfassets.net/cdy7uua7fh8z/6jeVBuypOGX5qMRXeJn5ow/dd20eb74e1e9079287762ce33dcf8e2d/Quickstart_Example_App_API.png" alt="［Auth0 Dashboard］>［Applications（アプリケーション）］>［API］>［Specific API（特定のAPI］>［Test（テスト）］タブ" /><p>要求の<code>Authorization</code>ヘッダーにアクセストークンを指定します。</p><p><pre><code>curl --request GET \

  --url http://${account.namespace}/api_path \

  --header 'authorization: Bearer YOUR_ACCESS_TOKEN_HERE'

</code></pre>

</p>
