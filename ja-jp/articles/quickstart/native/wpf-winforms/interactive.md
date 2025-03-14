---
title: WPFまたはWinFormsアプリケーションにログインを追加する
description: このチュートリアルは、Auth0を使用して、WPFやWinFormsアプリケーションにユーザーログインを追加する方法について説明します。
interactive:  true
files:
 - files/MainWindow.xaml
github:
  path: https://github.com/auth0-samples/auth0-WinFormsWPF-oidc-samples/tree/master/Quickstart/00-Starter-Seed
locale: ja-JP
---

# WPFまたはWinFormsアプリケーションにログインを追加する


<p>Auth0を使用すると、アプリケーションに手軽に認証を追加することができます。このガイドは、WPFやWinFormsアプリケーションに<a href="https://www.nuget.org/packages/Auth0.OidcClient.WPF/">WPF</a>または<a href="https://www.nuget.org/packages/Auth0.OidcClient.WinForms">WinForms</a>用のAuth0 SDKを使ってAuth0を統合し、認証の追加とユーザープロファイル情報の表示を行う方法について説明します。</p><p>このクイックスタートを使用するには、以下の手順に従います：</p><ul><li><p>Auth0の無料アカウントにサインアップするか、Auth0にログインします。</p></li><li><p>統合したいWPFまたはWinFormsプロジェクトを用意します。または、ログインした後に、サンプルアプリケーションを表示してダウンロードすることもできます。</p></li></ul><p></p><p></p>

## Auth0を構成する


<p>Auth0のサービスを利用するには、Auth0 Dashboadに設定済みのアプリケーションがある必要があります。Auth0アプリケーションは、開発中のプロジェクトに対してどのように認証が動作して欲しいかを構成する場所です。</p><h3>アプリケーションを構成する</h3><p>対話型のセレクターを使ってAuth0アプリケーションを新規作成するか、統合したいプロジェクトを表す既存のアプリケーションを選択します。Auth0のすべてのアプリケーションには英数字からなる一意のクライアントIDが割り当てられており、アプリケーションのコードがSDKを通じてAuth0 APIを呼び出す際に使用されます。</p><p>このクイックスタートを使って構成されたすべての設定は、<a href="https://manage.auth0.com/#/">Dashboard</a>のアプリケーションを自動更新します。今後、アプリケーションの管理もDashboardで行えます。</p><p>完了済みの構成を見てみたい場合は、サンプルアプリケーションをご覧ください。</p><h3>Callback URLを構成する</h3><p>Callback URLとは、Auth0がユーザーを認証後にリダイレクトするアプリケーション内URLです。設定されていない場合、ユーザーはログイン後にアプリケーションに戻りません。</p><p><div class="alert-container" severity="default"><p>サンプルプロジェクトに沿って進めている場合は、<code>http://{yourDomain}:4200/mobile</code>に設定してください。</p></div></p><h3>ログアウトURLを構成する</h3><p>ログアウトURLとは、Auth0がユーザーをログアウト後にリダイレクトするアプリケーション内URLです。設定されていない場合、ユーザーはアプリケーションからログアウトできず、エラーを受け取ります。</p><p><div class="alert-container" severity="default"><p>サンプルプロジェクトに沿って進めている場合は、<code>http://{yourDomain}:4200/mobile</code>に設定してください。</p></div></p>

## Auth0 SDKをインストールする


<p>WPFおよびWinFormsアプリケーションで、Auth0認証が手軽に実装できるように、Auth0は<a href="https://www.nuget.org/packages/Auth0.OidcClient.WPF/">WPF</a>と<a href="https://www.nuget.org/packages/Auth0.OidcClient.WinForms">WinForms</a>のSDKを提供しています。</p><p>NuGetパッケージマネージャー（［Tools（ツール）］ -&gt; ［Library Package Manager（ライブラリーパッケージマネージャー）］ -&gt; ［Package Manager Console（パッケージマネージャーコンソール）］) を使用して、WPFまたはWindows Formsアプリケーションのどちらをビルドするかに応じて、<code>Auth0.OidcClient.WPF</code>または<code>Auth0.OidcClient.WinForms</code>パッケージをインストールします。</p><p>NuGetパッケージマネージャーコンソール（<code>Install-Package</code>）や<code>dotnet</code> CLI（<code>dotnet add</code>）を代わりに使用することもできます。</p><p><pre><code>Install-Package Auth0.OidcClient.WPF

Install-Package Auth0.OidcClient.WinForms

</code></pre>

</p><p><pre><code>dotnet add Auth0.OidcClient.WPF

dotnet add Auth0.OidcClient.WinForms

</code></pre>

</p>

## Auth0Clientをインスタンス化する {{{ data-action="code" data-code="MainWindow.xaml.cs#13:22" }}}


<p>Auth0をアプリケーションに統合するには、Auth0ドメインとクライアントIDを含むAuth0ClientOptionsのインスタンスを渡して、Auth0Clientクラスをインスタンス化します。</p><p>SDKは初期設定で、.NET6以降には<a href="https://learn.microsoft.com/en-us/microsoft-edge/webview2/">WebView2</a>を利用し、.NET6より前のバージョンを使用するアプリケーションは古いWebViewに依存します。</p><p><div class="checkpoint">WPF/WinFormsクイックスタート - 手順3「チェックポイント」 <div class="checkpoint-default"><p><code>Auth0Client</code>が適切にインスタンス化されました。アプリケーションを実行して次の点を確認します：</p><ul><li><p><code>Auth0Client</code>が正しくインスタンス化されている。</p></li><li><p>アプリケーションがAuth0に関連したエラーを投入していない。</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Sorry about that. Here are a couple things to double-check:</p><ul><li><p>make sure the correct application is selected</p></li><li><p>did you save after entering your URLs?</p></li><li><p>make sure the domain and client ID are imported correctly</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p></div>

  </div></p>

## アプリケーションにログインを追加する {{{ data-action="code" data-code="MainWindow.xaml.cs#24:35" }}}


<p>Auth0アプリケーションとAuth0 SDKの構成が完了したら、プロジェクトのためにログインをセットアップする必要があります。これを実現するには、SDKの<code>LoginAsync()</code>メソッドを使用して、ユーザーをAuth0のユニバーサルログインページにリダイレクトするログインボタンを作成します。ユーザーが認証に成功すると、このクイックスタートで前にセットアップしたCallback URLへリダイレクトされます。</p><p>エラーがなければ、<code>LoginAsync()</code>が返す<code>LoginResult</code>で<code>User</code>、<code>IdentityToken</code>、<code>AccessToken</code>、<code>RefreshToken</code>にアクセスすることができます。</p><p><div class="checkpoint">WPF/WinFormsクイックスタート - 手順4「チェックポイント」 <div class="checkpoint-default"><p>ユーザー名とパスワードを使ってログインやサインアップができるようになりました。</p><p>ログインボタンをクリックして次の点を確認します：</p><ul><li><p>WPFまたはWinFormsアプリケーションによってAuth0ユニバーサルログインページにリダイレクトされる。</p></li><li><p>ログインまたはサインアップできる。</p></li><li><p>Auth0によってアプリケーションにリダイレクトされる。</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Sorry about that. Here&#39;s something to double-check:</p><ul><li><p>you called <code>LoginAsync</code> as expected</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p></div>

  </div></p>

## アプリケーションにログアウトを追加する {{{ data-action="code" data-code="MainWindow.xaml.cs#37:40" }}}


<p>プロジェクトにログインしたユーザーには、ログアウトする方法も必要です。SDKの<code>LogoutAsync()</code>メソッドを使用してログアウトボタンを作成します。ユーザーはログアウトすると、Auth0ログアウトエンドポイントにリダイレクトされてから、即座に、このクイックスタートで先ほどセットアップしたログアウトURLにリダイレクトで戻されます。</p><p><div class="checkpoint">WPF/WinFormsクイックスタート - 手順5「チェックポイント」 <div class="checkpoint-default"><p>アプリケーションを実行してログアウトボタンをクリックし、次の点を確認します：</p><ul><li><p>WPFまたはWinFormsアプリケーションによって、アプリケーションの設定で［Allowed Logout URLs（許可されているログアウトURL）］の1つに指定したアドレスへリダイレクトされる。</p></li><li><p>アプリケーションにログインしていない。</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Sorry about that. Here are a couple things to double-check:</p><ul><li><p>you configured the correct Logout URL</p></li><li><p>you called <code>LogoutAsync</code> as expected.</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p></div>

  </div></p>

## ユーザープロファイル情報を表示する {{{ data-action="code" data-code="MainWindow.xaml.cs#30:33" }}}


<p>ユーザーがログインやログアウトできるようになったら、認証済のユーザーに関連付けられた<a data-contentfulid="2ClGWANGeRoTkg5Ax2gOVK-ja-JP">プロファイル情報</a>を取得できるようにしたいと考えるはずです。たとえば、ログインしたユーザーの名前やプロフィール写真をプロジェクトに表示したいかもしれません。</p><p>WPF・WinForms用のAuth0 SDKでは、<code>LoginResult.User</code>プロパティを通じてユーザー情報を提供します。</p><p><div class="checkpoint">WPF/WinFormsクイックスタート - 手順6「チェックポイント」 <div class="checkpoint-default"><p>ログイン後にユーザーの名前やその他のユーザープロパティが表示されることを確認してください。</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Sorry about that. Here are a couple things to double-check:</p><ul><li><p>the <code>LoginResult.IsError</code> is false</p></li><li><p>if the <code>LoginResult.IsError</code> isn&#39;t false, be sure to check <code>LoginResult.Error</code> for details.</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p></div>

  </div></p>
