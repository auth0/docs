---
title: MAUIアプリケーションにログインを追加する
description: このチュートリアルは、Auth0を使用して、.NET MAUIアプリケーションにユーザーログインを追加する方法について説明します。
interactive:  true
files:
 - files/MainPage.xaml
github:
  path: https://github.com/auth0-samples/auth0-maui-samples/tree/master/Sample
locale: ja-JP
---

# MAUIアプリケーションにログインを追加する


<p>Auth0を使用すると、アプリケーションに手軽に認証を追加することができます。このガイドは、.NET MAUIアプリケーションに<a href="https://www.nuget.org/packages/Auth0.OidcClient.MAUI/">MAUI</a>用のAuth0 SDKを使ってAuth0を統合し、認証の追加とユーザープロファイル情報の表示を行う方法について説明します。</p><p><div class="alert-container" severity="default"><p>MAUI SDKは、Android、iOS、macOS、Windowsに対応しています。プラットフォーム特有の構成に関しては、以下をお読みください。</p></div></p><p></p>

## Auth0を構成する


<p>Auth0のサービスを利用するには、Auth0 Dashboadに設定済みのアプリケーションがある必要があります。Auth0アプリケーションは、開発中のプロジェクトに対してどのように認証が動作して欲しいかを構成する場所です。</p><h3>アプリケーションを構成する</h3><p>対話型のセレクターを使ってAuth0アプリケーションを新規作成するか、統合したいプロジェクトを表す既存のアプリケーションを選択します。Auth0のすべてのアプリケーションには英数字からなる一意のクライアントIDが割り当てられており、アプリケーションのコードがSDKを通じてAuth0 APIを呼び出す際に使用されます。</p><p>このクイックスタートを使って構成されたすべての設定は、<a href="https://manage.auth0.com/#/">Dashboard</a>のアプリケーションを自動更新します。今後、アプリケーションの管理もDashboardで行えます。</p><p>完了済みの構成を見てみたい場合は、サンプルアプリケーションをご覧ください。</p><h3>Callback URLを構成する</h3><p>Callback URLとは、Auth0がユーザーを認証後にリダイレクトするアプリケーション内URLです。設定されていない場合、ユーザーはログイン後にアプリケーションに戻りません。</p><p><div class="alert-container" severity="default"><p>サンプルプロジェクトに沿って進めている場合は、<code>myapp://callback</code>に設定してください。</p></div></p><h3>ログアウトURLを構成する</h3><p>ログアウトURLとは、Auth0がユーザーをログアウト後にリダイレクトするアプリケーション内URLです。設定されていない場合、ユーザーはアプリケーションからログアウトできず、エラーを受け取ります。</p><p><div class="alert-container" severity="default"><p>サンプルプロジェクトに沿って進めている場合は、<code>myapp://callback</code>に設定してください。</p></div></p>

## Auth0 SDKをインストールする


<p>MAUIアプリケーションで、Auth0認証を手軽に実装できるように、Auth0は<a href="https://www.nuget.org/packages/Auth0.OidcClient.MAUI/">MAUI</a>のSDKを提供しています。</p><p>NuGetパッケージ マネージャー（［Tools（ツール）］ -&gt; ［Library Package Manager（ライブラリーパッケージマネージャー）］ -&gt; ［Package Manager Console（パッケージマネージャーコンソール）］）を使って<code>Auth0.OidcClient.MAUI</code>パッケージをインストールしてください。</p><p>NuGetパッケージマネージャーコンソール（<code>Install-Package</code>）や<code>dotnet</code> CLI（<code>dotnet add</code>）を代わりに使用することもできます。</p><p><pre><code>Install-Package Auth0.OidcClient.MAUI

</code></pre>

</p><p><pre><code>dotnet add package Auth0.OidcClient.MAUI

</code></pre>

</p>

## プラットフォーム特定の構成


<p>SDKをAndroidとWindowsで使うためにはプラットフォーム特定の構成が必要です。</p><h3>Android</h3><p><code>WebAuthenticatorCallbackActivity</code>を展開する新しいアクティビティを作成します：</p><p><pre><code class="language-csharp">[Activity(NoHistory = true, LaunchMode = LaunchMode.SingleTop, Exported = true)]

[IntentFilter(new[] { Intent.ActionView },

              Categories = new[] { Intent.CategoryDefault, Intent.CategoryBrowsable },

              DataScheme = CALLBACK_SCHEME)]

public class WebAuthenticatorActivity : Microsoft.Maui.Authentication.WebAuthenticatorCallbackActivity

{

    const string CALLBACK_SCHEME = &quot;myapp&quot;;

}

</code></pre>

</p><p>上記のアクティビティは、ログイン後にAuth0がAndroidアプリケーションへリダイレクトで戻る時に、アプリケーションが<code>myapp://callback</code> URLをハンドリングできることを保証します。</p><h3>Windows</h3><p>Auth0にリダイレクトで戻された後、アプリケーションが適切に再アクティブ化されるには、2つのことを行う必要があります：</p><ul><li><p>対応するプロトコルを<code>Package.appxmanifest</code>に加えます。この場合、設定は<code>myapp</code>になっていますが、お好きなものに変更できます（関連するすべてのAuth0 URLも確実に更新してください）。</p></li></ul><p><pre><code class="language-xml">&lt;Applications&gt;

  &lt;Application Id=&quot;App&quot; Executable=&quot;$targetnametoken$.exe&quot; EntryPoint=&quot;$targetentrypoint$&quot;&gt;

    &lt;Extensions&gt;

      &lt;uap:Extension Category=&quot;windows.protocol&quot;&gt;

        &lt;uap:Protocol Name=&quot;myapp&quot;/&gt;

      &lt;/uap:Extension&gt;

    &lt;/Extensions&gt;

  &lt;/Application&gt;

&lt;/Applications&gt;

</code></pre>

</p><ul><li><p>Windows固有の<code>App.xaml.cs</code>ファイルで<code>Activator.Default.CheckRedirectionActivation()</code>を呼び出します。</p></li></ul><p><pre><code class="language-csharp">public App()

{

  if (Auth0.OidcClient.Platforms.Windows.Activator.Default.CheckRedirectionActivation())

    return;



  this.InitializeComponent();

}

</code></pre>

</p>

## Auth0Clientをインスタンス化する {{{ data-action="code" data-code="MainPage.xaml.cs#3:10" }}}


<p>Auth0をアプリケーションに統合するには、Auth0ドメイン、クライアントID、要求されたスコープを含む<code>Auth0ClientOptions</code>のインスタンスを渡して<code>Auth0Client</code>クラスをインスタンス化します。また、Auth0が構成したURLを使って確実にアプリケーションにリダイレクトするよう、<code>RedirectUri</code>と<code>PostLogoutRedirectUri</code>も構成する必要があります。</p><p><pre><code class="language-csharp">using Auth0.OidcClient;



var client = new Auth0Client(new Auth0ClientOptions

{

    Domain = &quot;${account.namespace}&quot;,

    ClientId = &quot;${account.clientId}&quot;,

    RedirectUri = &quot;myapp://callback&quot;,

    PostLogoutRedirectUri = &quot;myapp://callback&quot;,

    Scope = &quot;openid profile email&quot;

});

</code></pre>

</p><p>SDKは初期設定で、AndroidにはChrome Custom Tabs、iOS・macOSにはASWebAuthenticationSessionを利用し、Windowsではシステムの既定ブラウザーが開きます。</p><p><div class="checkpoint">MAUIクイックスタート - 手順4「チェックポイント」 <div class="checkpoint-default"><p><code>Auth0Client</code>が適切にインスタンス化されました。アプリケーションを実行して次の点を確認します：</p><ul><li><p><code>Auth0Client</code>が<code>MainPage</code>で正しくインスタンス化されている。</p></li><li><p>アプリケーションがAuth0に関連したエラーを投入していない。</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Sorry about that. Here are a couple things to double-check:</p><ul><li><p>make sure the correct application is selected</p></li><li><p>did you save after entering your URLs?</p></li><li><p>make sure the domain and client ID are imported correctly</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p></div>

  </div></p>

## アプリケーションにログインを追加する {{{ data-action="code" data-code="MainPage.xaml.cs#25:25" }}}


<p>Auth0アプリケーションとAuth0 SDKの構成が完了したら、プロジェクトのためにログインをセットアップする必要があります。これを実現するには、SDKの<code>LoginAsync()</code>メソッドを使用して、ユーザーをAuth0のユニバーサルログインページにリダイレクトするログインボタンを作成します。</p><p><pre><code class="language-csharp">var loginResult = await client.LoginAsync();

</code></pre>

</p><p>エラーがなければ、<code>LoginAsync()</code>が返す<code>LoginResult</code>で<code>User</code>、<code>IdentityToken</code>、<code>AccessToken</code>、<code>RefreshToken</code>にアクセスすることができます。</p><p><div class="checkpoint">MAUIクイックスタート - 手順5「チェックポイント」 <div class="checkpoint-default"><p>ユーザー名とパスワードを使ってログインやサインアップができるようになりました。</p><p>ログインボタンをクリックして次の点を確認します：</p><ul><li><p>アプリケーションによってAuth0ユニバーサルログインページにリダイレクトされる。</p></li><li><p>ログインまたはサインアップできる。</p></li><li><p>Auth0によってアプリケーションにリダイレクトされる。</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Sorry about that. Here&#39;s something to double-check:</p><ul><li><p>you called <code>LoginAsync</code> as expected</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p></div>

  </div></p>

## アプリケーションにログアウトを追加する {{{ data-action="code" data-code="MainPage.xaml.cs#32:32" }}}


<p>プロジェクトにログインしたユーザーには、ログアウトする方法も必要です。SDKの<code>LogoutAsync()</code>メソッドを使用してログアウトボタンを作成します。ユーザーはログアウトすると、Auth0ログアウトエンドポイントにリダイレクトされてから、即座に、このクイックスタートで先ほどセットアップしたログアウトURLにリダイレクトで戻されます。</p><p><pre><code class="language-csharp">await client.LogoutAsync();

</code></pre>

</p><p><div class="checkpoint">MAUIクイックスタート - 手順6「チェックポイント」 <div class="checkpoint-default"><p>アプリケーションを実行してログアウトボタンをクリックし、次の点を確認します：</p><ul><li><p>アプリケーションによって、アプリケーションの設定で［Allowed Logout URLs（許可されているログアウトURL）］の1つに指定されているアドレスへリダイレクトされる。</p></li><li><p>アプリケーションにログインしていない。</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Sorry about that. Here are a couple things to double-check:</p><ul><li><p>you configured the correct Logout URL</p></li><li><p>you called <code>LogoutAsync</code> as expected.</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p></div>

  </div></p>

## ユーザープロファイル情報を表示する {{{ data-action="code" data-code="MainPage.xaml.cs#55:58" }}}


<p>ユーザーがログインやログアウトできるようになったら、認証済のユーザーに関連付けられた<a href="https://auth0.com/docs/users/concepts/overview-user-profile">プロファイル情報</a>を取得できるようにしたいと考えるはずです。たとえば、ログインしたユーザーの名前やプロフィール写真をプロジェクトに表示したいかもしれません。</p><p>MAUI用のAuth0 SDKでは、<code>LoginResult.User</code>プロパティを通じてユーザー情報を提供します。</p>
