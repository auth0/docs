---
title: Ruby on Rails APIに認可を追加する
description: このチュートリアルでは、カスタムAuth0Clientクラス内のjwt Gemを使って、アクセストークンの検証を実施します。
interactive:  true
files:
 - files/app/controllers/application_controller
 - files/app/lib/auth0_client
 - files/app/controllers/concerns/secured
 - files/app/controllers/public_controller
 - files/app/controllers/private_controller
github:
  path: https://github.com/auth0-samples/auth0-rubyonrails-api-samples/tree/master/01-Authentication-RS256
locale: ja-JP
---

# Ruby on Rails APIに認可を追加する


<p>このチュートリアルでは、カスタム<code>Auth0Client</code>クラス内の<a href="https://github.com/jwt/ruby-jwt"><b>jwt</b></a> Gemを使って、アクセストークンの検証を実施します。<code>Secured</code>と呼ばれるConcernを使って、受信アクセストークンからの認証を必要とするエンドポイントを認可します。</p><p>Auth0 DashboardでAPIをまだ作成していない場合は、対話型のセレクターを使ってAuth0 APIを新規作成します。そうでない場合は、プロジェクトに既存のAPIを選択します。</p><p>Auth0 Dashboardを使って初めてAPIをセットアップする場合には、<a href="https://auth0.com/docs/get-started/auth0-overview/set-up-apis">使用の開始ガイド</a>を確認してください。</p><p>それぞれのAuth0 APIにはAPI識別子があり、アプリケーションにアクセストークンの検証で使用されます。</p><p><div class="alert-container" severity="default"><p><b>Auth0を初めてご利用ですか？</b><a href="https://auth0.com/docs/overview">Auth0の仕組み</a>と、OAuth 2.0フレームワークを用いた<a href="https://auth0.com/docs/api-auth">API認証と認可の実装</a>について説明します。</p></div></p><p></p>

## アクセス許可を定義する


<p>アクセス許可は、ユーザーの代わりに、提供されたアクセストークンを使ってどのようにしてリソースにアクセスできるのかを定義できるようにします。たとえば、ユーザーがマネージャーアクセスレベルを持つ場合には、<code>messages</code>リソースに対して読み出しアクセスを付与し、管理者アクセスレベルを持つ場合には、書き込みアクセスを付与することができます。</p><p>Auth0 Dashboardの<a href="https://manage.auth0.com/#/apis">［APIs］</a>セクションにある<b>［Permissions（権限）］</b>ビューで使用可能なアクセス許可を定義することができます。</p><img src="//images.ctfassets.net/cdy7uua7fh8z/1s3Yp5zqJiKiSWqbPSezNO/acef814282795bef6921535f044f96e9/Quickstarts_API.png" alt="［Auth0 Dashboard］>［Applications（アプリケーション）］>［APIs］>［Specific API（特定のAPI］>［Permissions（権限）］タブ" /><p><div class="alert-container" severity="default"><p>以下の例では<code>read:messages</code>スコープを使用します。</p></div></p>

## 依存関係をインストールする


<p><b>jwt </b>Gemをインストールします。</p><p><pre><code class="language-powershell">gem 'jwt'

    bundle install

</code></pre>

</p><p></p>

## Auth0Clientクラスを作成する {{{ data-action="code" data-code="app/controllers/concerns/secured.rb" }}}


<p><code>Auth0Client</code>と呼ばれるクラスを作成します。このクラスは、リクエストの<code>Authorization</code>ヘッダーから得た受信アクセストークンをデコードし検証します。</p><p><code>Auth0Client</code>クラスはAuth0テナントの公開鍵を取得し、これを使ってアクセストークンの署名を検証します。<code>Token</code>構造体は<code>validate_permissions</code>メソッドを定義し、必要なスコープの配列を指定してアクセストークン内の特定の<code>scope</code>を検索し、トークンのペイロードに存在するかを確認します。</p>

## Secured concernを定義する {{{ data-action="code" data-code="app/controllers/concerns/secured.rb" }}}


<p>受信リクエストの<code>Authorization</code>ヘッダー内でアクセストークンを検索する<code>Secured</code>と呼ばれるConcernを作成します。</p><p>トークンが存在する場合、<code>Auth0Client.validate_token</code>は<code>jwt</code> Gemを使用してトークンの署名を確認し、トークンのクレームを検証します。</p><p>Concernには、アクセストークンが有効であることを検証するほか、トークンにリクエストされたリソースにアクセスするのに十分な<b>スコープ</b>があることを確認するためのメカニズムも整備されています。この例では、<code>Auth0Client</code>クラスから<code>Token.validate_permissions</code>メソッドを呼び出すことで、ブロックを受け取りアクセス許可を確認する<code>validate_permissions</code>メソッドを定義します。</p><p><code>/private-scoped</code>ルートでは、定義されたスコープはペイロードに入ってくるスコープと交差され、別の配列から1つ以上の項目が含まれているかを判定します。</p>

## ApplicationControllerにSecure concernを含める {{{ data-action="code" data-code="app/controllers/application_controller.rb" }}}


<p>アプリケーションコントローラーに<code>Secure</code> concernを追加すると、認可を必要とするコントローラーで<code>before_action</code>フィルターのみを使用すればよいことになります。</p>

## パブリックエンドポイントを作成する {{{ data-action="code" data-code="app/controllers/public_controller.rb" }}}


<p>パブリックエンドポイント<code>/api/public</code>を処理するようにコントローラーを作成します。</p><p><code>/public</code>エンドポイントでは認可は必要でないため、<code>before_action</code>は必要ありません。</p>

## プライベートエンドポイントを作成する {{{ data-action="code" data-code="app/controllers/private_controller.rb" }}}


<p><code>/api/private</code>と<code>/api/private-scoped</code>というプライベートエンドポイントを処理するようにコントローラーを作成します。</p><p><code>/api/private</code>は、追加スコープのないアクセストークンを含む認証された要求に使用することができます。</p><p><code>/api/private-scoped</code>は、<code>read:messages</code>スコープが付与されたアクセストークンを含む認証された要求に使用することができます。</p><p>保護されたエンドポイントは<code>Secured</code> concernから<code>authorize</code>メソッドを呼び出す必要があります。そのためには、<code>before_action :authorize</code>を使用します。これによって、<code>Secured.authorize</code>メソッドが<code>PrivateController</code>の各アクションの前に呼び出されます。</p><h3>APIを呼び出す</h3><p>APIを呼び出すにはアクセストークンが必要です。テスト用のアクセストークンは、<a href="https://manage.auth0.com/#/apis">API設定</a>の<b>［Test（テスト）］</b>ビューから取得することができます。</p><img src="//images.ctfassets.net/cdy7uua7fh8z/6jeVBuypOGX5qMRXeJn5ow/dd20eb74e1e9079287762ce33dcf8e2d/Quickstart_Example_App_API.png" alt="［Auth0 Dashboard］>［Applications（アプリケーション）］>［API］>［Specific API（特定のAPI］>［Test（テスト）］タブ" /><p>要求の<code>Authorization</code>ヘッダーにアクセストークンを指定します。</p><p><pre><code class="language-bash">curl --request GET \

  --url http://${account.namespace}/api_path \

  --header 'authorization: Bearer YOUR_ACCESS_TOKEN_HERE'

</code></pre>

</p><p><div class="checkpoint">Ruby on rails手順7「チェックポイント」 <div class="checkpoint-default"><p>アプリケーションの構成が完了したら、アプリケーションを実行して次の点を確認します：</p><ul><li><p><code>GET /api/public</code>が認証を必要としない要求に使用できる。</p></li><li><p><code>GET /api/private</code>が認証された要求に使用できる。</p></li><li><p><code>GET /api/private-scoped</code>が<code>read:messages</code>スコープが付与されたアクセストークンを含む認証された要求に使用できる。</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>If your application did not start successfully:</p><ul><li><p>Verify you added the token as the <code>Authorization</code> header</p></li><li><p>Ensure the token has the correct scopes. Verify with <a href="https://jwt.io/">jwt.io</a>.</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p></div>

  </div></p>
