---
title: Blazor Serverアプリケーションにログインを追加する
description: このガイドは、新規または既存のBlazor ServerアプリケーションにAuth0.AspNetCore.Authentication SDKを使ってAuth0を統合する方法を説明します。
interactive:  true
files:
 - files/Login.cshtml
 - files/Logout.cshtml
 - files/Profile
 - files/Program
github:
  path: Quickstart/Sample
locale: ja-JP
---

# Blazor Serverアプリケーションにログインを追加する


<p>Auth0を使用すると、アプリケーションに手軽に認証を追加して、ユーザープロファイル情報にアクセスすることができます。このガイドは、新規または既存のBlazor Serverアプリケーションに<b>Auth0.AspNetCore.Authentication</b> SDKを使ってAuth0を統合する方法を説明します。</p><p></p>

## Auth0を構成する


<p>Auth0のサービスを利用するには、Auth0 Dashboadに設定済みのアプリケーションがある必要があります。Auth0アプリケーションは、開発中のプロジェクトに対してどのように認証が動作して欲しいかを構成する場所です。</p><h3>アプリケーションを構成する</h3><p>対話型のセレクターを使ってAuth0アプリケーションを新規作成するか、統合したいプロジェクトを表す既存のアプリケーションを選択します。Auth0のすべてのアプリケーションには英数字からなる一意のクライアントIDが割り当てられており、アプリケーションのコードがSDKを通じてAuth0 APIを呼び出す際に使用されます。</p><p>このクイックスタートを使って構成されたすべての設定は、<a href="https://manage.auth0.com/dashboard/us/auth0-dsepaid/" target="_blank" rel="noreferrer noopener">Dashboard</a>のアプリケーションを自動更新します。今後、アプリケーションの管理もDashboardで行えます。</p><p>完了済みの構成を見てみたい場合は、サンプルアプリケーションをご覧ください。</p><h3>Callback URLを構成する</h3><p>Callback URLとは、Auth0がユーザーを認証後にリダイレクトするアプリケーション内URLです。設定されていない場合、ユーザーはログイン後にアプリケーションに戻りません。</p><p><div class="alert-container" severity="default"><p>サンプルプロジェクトに沿って進めている場合は、<code>http://localhost:3000</code><code>/callback</code>に設定してください。</p></div></p><h3>ログアウトURLを構成する</h3><p>ログアウトURLとは、Auth0がユーザーをログアウト後にリダイレクトするアプリケーション内URLです。設定されていない場合、ユーザーはアプリケーションからログアウトできず、エラーを受け取ります。</p><p><div class="alert-container" severity="default"><p>サンプルプロジェクトに沿って進めている場合は、<code>http://localhost:3000</code>に設定してください。</p></div></p>

## SDKをインストールして構成する {{{ data-action="code" data-code="Program.cs" }}}


<h3>NuGetからインストールする</h3><p>Auth0をBlazor Serverと統合するには、<code>Auth0.AspNetCore.Authentication</code><a href="https://www.nuget.org/packages/Auth0.AspNetCore.Authentication/" target="_blank" rel="noreferrer noopener">NuGetパッケージ</a>をアプリケーションにインストールすることでSDKを使用できます。</p><p></p><h3>ミドルウェアを構成する</h3><p>Blazor Serverアプリケーションで認証を可能にするには、SDKが提供するミドルウェアを使います。<code>Program.cs</code>ファイルに移動して<code>builder.Services.AddAuth0WebAppAuthentication()</code>を呼び出し、SDKのミドルウェアを登録します。</p><p><code>Domain</code>と<code>ClientId</code>は必ず構成してください。SDKがどのAuth0テナントとアプリケーションを使用すべきかを認識するために必要となるフィールドです。</p><p>認証と認可が<code>Program.cs</code>ファイルで有効になったことを確認します。</p>

## ログイン {{{ data-action="code" data-code="Login.cshtml.cs" }}}


<p>Blazor Serverアプリケーションにユーザーをログインさせるには、<code>LoginModel</code>を<code>Pages</code>ディレクトリに追加します。</p><p><code>LoginModel</code>の<code>OnGet</code>メソッド内で<code>HttpContext.ChallengeAsync()</code>を呼び出し、<code>Auth0Constants.AuthenticationScheme</code>を認証スキームとして渡します。これにより当社のSDKが内部に登録しているOIDC認証ハンドラーが発動されます。関連する<code>authenticationProperties</code>も必ず指定してください。構築は<code>LoginAuthenticationPropertiesBuilder</code>で行えます。</p><p><code>HttpContext.ChallengeAsync()</code>の呼び出し成功後、ユーザーはAuth0にリダイレクトされます。その後アプリケーションにリダイレクトで戻された際に、OIDCミドルウェアとクッキーミドルウェアの両方にサインインしています。これにより、ユーザーは後続の要求でも認証されるようになります。</p><p><div class="checkpoint">ASP.NET Core Blazor Server - 手順3 - チェックポイント <div class="checkpoint-default"><p>Loginの構成が完了したら、アプリケーションを実行して次の点を確認します：</p><ul><li><p><code>Login</code>ページに移動すると、Auth0にリダイレクトされる。</p></li><li><p>資格情報を入力すると、リダイレクトでアプリケーションに戻る。</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>すみません。いくつかの点をもう一度確認してください。</p><ul><li><p>正しいアプリケーションが選択されていることを確認します</p></li><li><p>URLを入力した後で保存しましたか？</p></li><li><p>ドメインとクライアントIDが正しく構成されていることを確認します</p></li></ul><p>まだお困りですか？当社提供の<a href="https://auth0.com/docs" target="_blank" >ドキュメント</a>または<a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">コミュニティページ</a>で詳しい情報を確認してください。</p></div>

  </div></p>

## ユーザープロファイルを表示する {{{ data-action="code" data-code="Profile.razor" }}}


<p>ミドルウェアはAuth0からトークンを取得すると、IDトークンからユーザー情報とクレームを抽出し、<code>AuthenticationState</code>を介して利用できるようにします。これは<code>CascadingParameter</code>として追加できます。</p><p>ユーザーの名前や追加クレーム（メールアドレスや画像など）を表示するカスタムのユーザープロファイルページは、<code>AuthenticationState</code>の<code>User</code>プロパティから関連情報を取得し、Blazorコード内からビューに渡すことで作成できます。</p><p><div class="checkpoint">ASP.NET Core Blazor Server - 手順4 - チェックポイント <div class="checkpoint-default"><p>ユーザープロファイルを表示するようセットアップし終えたら、アプリケーションを実行して次の点を確認します：</p><ul><li><p>ログイン成功後にプロファイルを含んだエンドポイントに移動すると、ユーザーのプロファイルが表示される。</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>すみません。いくつかの点をもう一度確認してください。</p><ul><li><p>正しいアプリケーションが選択されていることを確認します</p></li><li><p>URLを入力した後で保存しましたか？</p></li><li><p>ドメインとクライアントIDが正しく構成されていることを確認します</p></li></ul><p>まだお困りですか？当社提供の<a href="https://auth0.com/docs" target="_blank" >ドキュメント</a>または<a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">コミュニティページ</a>で詳しい情報を確認してください。</p></div>

  </div></p>

## ログアウト {{{ data-action="code" data-code="Logout.cshtml.cs" }}}


<p><code>LogoutModel</code>の<code>OnGet</code>メソッド内から<code>HttpContext.SignOutAsync</code>を<code>CookieAuthenticationDefaults.AuthenticationScheme</code>認証スキームで呼び出すと、ユーザーをアプリケーションからログアウトさせられます。</p><p>さらに、ユーザーをAuth0からもログアウトさせたい場合は（これによりシングルサインオンに依拠している他のアプリケーションからもログアウトさせる可能性があります）、<code>HttpContext.SignOutAsync</code>を<code>Auth0Constants.AuthenticationScheme</code>認証スキームで呼び出します。また、<code>LogoutAuthenticationPropertiesBuilder</code>を使って構築できる適切な<code>authenticationProperties</code>も同じ認証スキームで呼び出します。</p><p></p><p><div class="checkpoint">ASP.NET Core Blazor Server - 手順5 - チェックポイント <div class="checkpoint-default"><p>Logoutの構成が完了したら、アプリケーションを実行して次の点を確認します：</p><ul><li><p><code>Logout</code>ページに移動すると、ユーザーがログアウトする。</p></li><li><p>Auth0からもログアウトすると、Auth0にリダイレクトされ、即座にアプリケーションにリダイレクトで戻される。</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>すみません。いくつかの点をもう一度確認してください。</p><ul><li><p>正しいアプリケーションが選択されていることを確認します</p></li><li><p>URLを入力した後で保存しましたか？</p></li><li><p>ドメインとクライアントIDが正しく構成されていることを確認します</p></li></ul><p>まだお困りですか？当社提供の<a href="https://auth0.com/docs" target="_blank" >ドキュメント</a>または<a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">コミュニティページ</a>で詳しい情報を確認してください。</p></div>

  </div></p>
