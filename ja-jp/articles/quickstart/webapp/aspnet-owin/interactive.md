---
title: ASP.NET OWINアプリケーションにログインを追加する
description: このガイドは、新規または既存のASP.NET OWINアプリケーションにMicrosoft.Owin.Security.OpenIdConnect Nugetパッケージを使ってAuth0を統合する方法を説明します。
interactive:  true
files:
 - files/Web
 - files/Startup
 - files/AccountController
github:
  path: Quickstart/Sample
locale: ja-JP
---

# ASP.NET OWINアプリケーションにログインを追加する


<p>Auth0を使用すると、アプリケーションに手軽に認証を追加して、ユーザープロファイル情報にアクセスすることができます。このガイドは、新規または既存のASP.NET OWINアプリケーションに<code>Microsoft.Owin.Security.OpenIdConnect</code> Nugetパッケージを使ってAuth0を統合する方法を説明します。</p><p></p>

## Auth0を構成する


<p>Auth0のサービスを利用するには、Auth0 Dashboadに設定済みのアプリケーションがある必要があります。Auth0アプリケーションは、開発中のプロジェクトに対してどのように認証が動作して欲しいかを構成する場所です。</p><h3>アプリケーションを構成する</h3><p>対話型のセレクターを使ってAuth0アプリケーションを新規作成するか、統合したいプロジェクトを表す既存のアプリケーションを選択します。Auth0のすべてのアプリケーションには英数字からなる一意のクライアントIDが割り当てられており、アプリケーションのコードがSDKを通じてAuth0 APIを呼び出す際に使用されます。</p><p>このクイックスタートを使って構成されたすべての設定は、<a href="https://manage.auth0.com/#/" target="_blank" rel="noreferrer noopener">Dashboard</a>のアプリケーションを自動更新します。今後、アプリケーションの管理もDashboardで行えます。</p><p>完了済みの構成を見てみたい場合は、サンプルアプリケーションをご覧ください。</p><h3>Callback URLを構成する</h3><p>Callback URLとは、Auth0がユーザーを認証後にリダイレクトするアプリケーション内URLです。設定されていない場合、ユーザーはログイン後にアプリケーションに戻りません。</p><p><div class="alert-container" severity="default"><p>サンプルプロジェクトに沿って進めている場合は、<code>http://localhost:3000</code><code>/callback</code>に設定してください。</p></div></p><h3>ログアウトURLを構成する</h3><p>ログアウトURLとは、Auth0がユーザーをログアウト後にリダイレクトするアプリケーション内URLです。設定されていない場合、ユーザーはアプリケーションからログアウトできず、エラーを受け取ります。</p><p><div class="alert-container" severity="default"><p>サンプルプロジェクトに沿って進めている場合は、<code>http://localhost:3000</code>に設定してください。</p></div></p>

## プロジェクトを構成する {{{ data-action="code" data-code="Web.config" }}}


<h3>NuGetからインストールする</h3><p>Auth0をASP.NET OWINに統合するには、<code>Microsoft.Owin.Security.OpenIdConnect</code>および<code>Microsoft.Owin.Security.Cookies</code> NuGetパッケージが使用できます。</p><p><pre><code>Install-Package Microsoft.Owin.Security.OpenIdConnect

Install-Package Microsoft.Owin.Security.Cookies

</code></pre>

</p><p><div class="alert-container" severity="default"><p>OWINクッキーミドルウェアとSystem.Webクッキーを同時に構成すると不具合が発生します。この問題の影響を抑えるには、詳細について<a href="https://github.com/aspnet/AspNetKatana/wiki/System.Web-response-cookie-integration-issues" target="_blank" rel="noreferrer noopener">「System.Web cookie integration issues（System.Webクッキーの統合不具合）」ドキュメント</a>でご確認ください。</p></div></p><h3>資格情報を構成する</h3><p>SDKが適切に動作するためには、<code>Web.config</code>で次のプロパティを設定します：</p><ul><li><p><code>auth0:Domain</code>：Auth0テナントのドメインです。Auth0 Dashboardにあるアプリケーションの<b>［Settings（設定）］</b>の［Domain（ドメイン）］フィールドで確認できます。<a href="https://auth0.com/docs/custom-domains" target="_blank" >カスタムドメイン</a>を使用している場合は、この値をカスタムドメインの値に設定してください。</p></li><li><p><code>auth0:ClientId</code>：Auth0 Dashboardで作成したAuth0アプリケーションのIDです。Auth0 Dashboardにあるアプリケーションの<b>［Settings（設定）］</b>の［Client ID（クライアントID）］フィールドで確認できます。</p></li></ul><p></p>

## ミドルウェアを構成する {{{ data-action="code" data-code="Startup.cs#18:74" }}}


<p>ASP.NET OWINアプリケーションで認証を有効にするには、StartupクラスのConfigurationメソッドに移動し、クッキーミドルウェアとOIDCミドルウェアを構成します。</p><p>認証の作動にはクッキーミドルウェアとOpenID Connectミドルウェアの両方が（この順番で）要求されるため、どちらも必ず登録してください。OpenID ConnectミドルウェアはAuth0による認証をハンドリングします。ユーザーの認証が完了すると、そのIDはクッキーミドルウェアに保存されます。</p><p>コードスニペットではAuthenticationTypeが<b>Auth0</b>に設定されています。次のセクションでAuthenticationTypeを使用しOpenID Connectミドルウェアにチャレンジして、認証フローを開始します。RedirectToIdentityProvider通知イベントが正しい<a data-contentfulid="5sl85ipAFaf8i4CH9wD6VA-ja-JP">ログアウトURL</a>を構築します。</p>

## アプリケーションにログインを追加する {{{ data-action="code" data-code="AccountController.cs#7:16" }}}


<p>ユーザーによるASP.NET OWINアプリケーションへのログインを許可するには、コントローラーに<code>Login</code>アクションを追加します。</p><p><code>HttpContext.GetOwinContext().Authentication.Challenge</code>を呼び出し、認証スキームとして<code>&quot;Auth0&quot;</code>を渡します。これにより、以前登録されたOIDC認証ハンドラーが発動されます。対応する<code>AuthenticationProperties</code>（<code>RedirectUri</code>含む）を必ず指定してください。</p><p><code>HttpContext.GetOwinContext().Authentication.Challenge</code>の呼び出し成功後、ユーザーはAuth0にリダイレクトされます。その後アプリケーションにリダイレクトで戻された際に、OIDCミドルウェアとクッキーミドルウェアの両方にサインインしています。これにより、ユーザーは後続の要求でも認証されるようになります。</p><p><div class="checkpoint">ASP.NET（OWIN） - 手順4 - チェックポイント <div class="checkpoint-default"><p>Loginの構成が完了したら、アプリケーションを実行して次の点を確認します：</p><ul><li><p><code>Login</code>アクションに移動すると、Auth0にリダイレクトされる。</p></li><li><p>資格情報を入力すると、リダイレクトでアプリケーションに戻る。</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>すみません。いくつかの点をもう一度確認してください。</p><ul><li><p>正しいアプリケーションが選択されていることを確認します</p></li><li><p>URLを入力した後で保存しましたか？</p></li><li><p>ドメインとクライアントIDが正しく構成されていることを確認します</p></li></ul><p>まだお困りですか？当社提供の<a href="https://auth0.com/docs" target="_blank" >ドキュメント</a>または<a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">コミュニティページ</a>で詳しい情報を確認してください。</p></div>

  </div></p>

## アプリケーションにログアウトを追加する {{{ data-action="code" data-code="AccountController.cs#34:39" }}}


<p>ユーザーをアプリケーションからログアウトさせるには、コントローラーのアクションから<code>HttpContext.GetOwinContext().Authentication.SignOut</code>を<code>CookieAuthenticationDefaults.AuthenticationType</code>認証スキームで呼び出します。</p><p>さらに、ユーザーをAuth0からログアウトさせたい場合は（この際にシングルサインオンに依拠している他のアプリケーションからもログアウトさせる可能性があります）、 <code>HttpContext.GetOwinContext().Authentication.SignOut</code>を<code>&quot;Auth0&quot;</code>認証スキームで呼び出します。</p><p><div class="checkpoint">ASP.NET（OWIN） - 手順5 - チェックポイント <div class="checkpoint-default"><p>Logoutの構成が完了したら、アプリケーションを実行して次の点を確認します：</p><ul><li><p><code>Logout</code>アクションに移動すると、ユーザーがログアウトする。</p></li><li><p>ログアウト中Auth0にリダイレクトし、その後ログアウト中にただちにアプリケーションにリダイレクトで戻る。</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>すみません。いくつかの点をもう一度確認してください。</p><ul><li><p>正しいアプリケーションが選択されていることを確認します</p></li><li><p>URLを入力した後で保存しましたか？</p></li><li><p>ドメインとクライアントIDが正しく構成されていることを確認します</p></li></ul><p>まだお困りですか？当社提供の<a href="https://auth0.com/docs" target="_blank" >ドキュメント</a>または<a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">コミュニティページ</a>で詳しい情報を確認してください。</p></div>

  </div></p>

## ユーザープロファイル情報を表示する {{{ data-action="code" data-code="AccountController.cs#18:32" }}}


<p>ミドルウェアはAuth0からトークンを取得すると、IDトークンからユーザー情報とクレームを抽出し、<code>ClaimsIdentity</code>として利用できるようにします。抽出した情報にはコントローラーの<code>User</code>プロパティを使ってアクセスします。</p><p>ユーザープロファイルを作成するには、<code>User</code>からユーザーの名前、メールアドレス、プロファイル画像を取得し、コントローラー内からビューに渡します。</p><p><div class="checkpoint">ASP.NET（OWIN） - 手順6 - チェックポイント <div class="checkpoint-default"><p>ユーザープロファイルを表示するようアクションをセットアップし終えたら、アプリケーションを実行して次の点を確認します：</p><ul><li><p>ログイン成功後に<code>Profile</code>アクションに移動すると、ユーザープロファイルが表示される。</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>すみません。いくつかの点をもう一度確認してください。</p><ul><li><p>正しいアプリケーションが選択されていることを確認します</p></li><li><p>ドメインとクライアントIDが正しく構成されていることを確認します</p></li><li><p>スコープとして<code>openid profile email</code>を設定しましたか？</p></li></ul><p>まだお困りですか？当社提供の<a href="https://auth0.com/docs" target="_blank" >ドキュメント</a>または<a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">コミュニティページ</a>で詳しい情報を確認してください。</p></div>

  </div></p>
