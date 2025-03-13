---
title: ASP.NET OWIN Web APIアプリケーションに認可を追加する
description: このチュートリアルは、標準のJWTミドルウェアを使ってASP.NET OWIN APIアプリケーションに認可を追加する方法を説明します。
interactive:  true
files:
 - files/Startup
 - files/OpenIdConnectSigningKeyResolver
 - files/ScopeAuthorizeAttribute
 - files/ApiController
github:
  path: https://github.com/auth0-samples/auth0-aspnet-owin-webapi-samples/tree/master/Quickstart/Sample
locale: ja-JP
---

# ASP.NET OWIN Web APIアプリケーションに認可を追加する


<p>Auth0を使用すると、アプリケーションに認可を追加することができます。このガイドは、新規または既存のASP.NET Owin Web APIアプリケーションに<code>Microsoft.Owin.Security.Jwt</code>パッケージを使ってAuth0を統合する方法を説明します。</p><p>Auth0 DashboardでAPIをまだ作成していない場合は、対話型のセレクターを使ってAuth0 APIを新規作成します。そうでない場合は、プロジェクトに既存のAPIを選択することができます。</p><p>Auth0 Dashboardを使って初めてAPIをセットアップする場合には、<a data-contentfulid="450QmC9wuUtjlt8UQzRgPd-ja-JP">使用の開始ガイド</a>を確認してください。</p><p>それぞれのAuth0 APIにはAPI識別子があり、アプリケーションにアクセストークンの検証で使用されます。</p><p><div class="alert-container" severity="default"><p><b>Auth0を初めてご利用ですか？</b><a data-contentfulid="43RIpZkDhzyy40WfzZvz4y-ja-JP">Auth0の仕組み</a>と、OAuth 2.0フレームワークを用いた<a data-contentfulid="6eZFaxxcNpFYwyEI05AXXA-ja-JP">API認証と認可の実装</a>について説明します。</p></div></p><p></p>

## アクセス許可を定義する


<p>アクセス許可は、ユーザーの代わりに、提供されたアクセストークンを使ってどのようにしてリソースにアクセスできるのかを定義できるようにします。たとえば、ユーザーがマネージャーアクセスレベルを持つ場合には、<code>messages</code>リソースに対して読み取りアクセスを付与し、管理者アクセスレベルを持つ場合には、書き込みアクセスを付与することができます。</p><p>Auth0 Dashboardの<a href="https://manage.auth0.com/#/apis">［API］</a>セクションにある<b>［Permissions（権限）］</b>ビューで使用可能なアクセス許可を定義することができます。以下の例では<code>read:messages</code>スコープを使用します。</p><img src="//images.ctfassets.net/cdy7uua7fh8z/1s3Yp5zqJiKiSWqbPSezNO/acef814282795bef6921535f044f96e9/Quickstarts_API.png" alt="［Auth0 Dashboard］>［Applications（アプリケーション）］>［APIs］>［Specific API（特定のAPI］>［Permissions（権限）］タブ" /><p></p>

## 依存関係をインストールする


<p><code>Microsoft.Owin.Security.Jwt</code> NuGetパッケージをインストールします。このパッケージには、Auth0のアクセストークンをASP.NET Owin Web APIで使用するために必要なOWIN JWTミドルウェアが含まれています。</p><p><pre><code class="language-powershell">Install-Package Microsoft.Owin.Security.Jwt

</code></pre>

</p><p></p>

## ミドルウェアを構成する {{{ data-action="code" data-code="Startup.cs" }}}


<p><code>Startup</code>クラスの<code>Configuration</code>メソッドに移動し、構成した<code>JwtBearerAuthenticationOptions</code>を渡して<code>UseJwtBearerAuthentication</code>の呼び出しを追加します。</p><p><code>JwtBearerAuthenticationOptions</code>では、Auth0 API識別子を<code>ValidAudience</code>プロパティで指定し、Auth0ドメインへのフルパスを<code>ValidIssuer</code>として指定する必要があります。<code>OpenIdConnectSigningKeyResolver</code>のインスタンスを使用するように<code>IssuerSigningKeyResolver</code>を構成して、署名鍵を解決できるようにします。</p><p><div class="alert-container" severity="warning"><p><b>末尾のスラッシュを忘れてはいけません。</b></p><p><code>ValidIssuer</code>に指定したURLの末尾にフォワードスラッシュ（<code>/</code>）があることを必ず確認してください。これは、JWTの発行者クレームと一致しなければなりません。この値の構成を誤ると、APIの呼び出しが正しく認証されません。</p><p><b></b></p></div></p><p></p>

## トークンの署名を検証する {{{ data-action="code" data-code="OpenIdConnectSigningKeyResolver.cs" }}}


<p>OWINのJWTミドルウェアはOpen ID Connect Discoveryをデフォルトでは使用しないため、カスタムの<code>IssuerSigningKeyResolver</code>を提供する必要があります。</p><p><code>OpenIdConnectSigningKeyResolver</code>クラスを作成し、<code>GetSigningKey</code>を実装して、正しい<code>SecurityKey</code>が返されることを確認します。このクラスは、<code>Startup.cs</code>でミドルウェアを構成する際に、<code>TokenValidationParameters.IssuerSigningKeyResolver</code>として使用されます。</p><p></p><p></p>

## スコープを検証する {{{ data-action="code" data-code="ScopeAuthorizeAttribute.cs" }}}


<p>JWTミドルウェアは、要求に含まれたアクセストークンが有効であることを検証しますが、現時点では、トークンが要求されたリソースへのアクセスに十分な<b>scope</b>を持っているのかを確認する手段はありません。</p><p><code>System.Web.Http.AuthorizeAttribute</code>を継承する<code>ScopeAuthorizeAttribute</code>という名前のクラスを作成してください。この属性はAuth0テナントが発行した<code>scope</code>クレームが存在することを確認し、存在する場合には、<code>scope</code>クレームが要求されたスコープを含んでいることを確認します。</p>

## APIエンドポイントを保護する {{{ data-action="code" data-code="ApiController.cs" }}}


<p>以下に示されたルートは次の要求で使用することができます：</p><ul><li><p><code>GET /api/public</code>：認証を必要としない要求に使用することができます。</p></li><li><p><code>GET /api/private</code>：追加スコープのないアクセストークンを含む認証された要求に使用することができます。</p></li><li><p><code>GET /api/private-scoped</code>：<code>read:messages</code>スコープが付与されたアクセストークンを含む認証された要求に使用することができます。</p></li></ul><p>JWTミドルウェアは標準のASP.NETの認証および認可メカニズムと統合できるため、コントローラーのアクションを<code>[Authorize]</code>属性で装飾するだけで、エンドポイントのセキュリティを確保できます。</p><p>アクションを<code>ScopeAuthorize</code>属性で更新し、必要な<code>scope</code>の名前を<code>scope</code>パラメーターに渡します。これにより、特定のAPIエンドポイントを呼び出すために、正しいスコープが利用できることが確実になります。</p><p><div class="checkpoint">ASP.NET API OWINクイックスタート - 手順6「チェックポイント」 <div class="checkpoint-default"><p>アプリケーションの構成が完了したら、アプリケーションを実行して次の点を検証します：</p><ul><li><p><code>GET /api/public </code>が認証を必要としない要求に使用できる。</p></li><li><p><code>GET /api/private </code>が認証された要求に使用できる。</p></li><li><p><code>GET /api/private-scoped </code>が<code>read:messages</code>スコープが付与されたアクセストークンを含む認証された要求に使用できる。</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>If your application did not start successfully:</p><ul><li><p>Ensure your configured the <code>ValidIssuer</code> and <code>ValidAudience</code> values correctly</p></li><li><p>Verify you added the token as the <code>Authorization</code> header</p></li><li><p>Ensure the token has the correct scopes. Verify with <a href="https://jwt.io/">jwt.io</a>.</p></li></ul><p>Still having issues? Check out our <a href="/docs">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p></div>

  </div></p>
