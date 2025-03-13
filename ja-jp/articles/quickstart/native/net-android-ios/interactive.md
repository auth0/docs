---
title: .NET AndroidまたはiOSアプリケーションにログインを追加する
description: このチュートリアルは、Auth0を使用して、.NET AndroidまたはiOSアプリケーションにユーザーログインを追加する方法について説明します。
interactive:  true
files:
 - files/MainActivity
 - files/AppDelegate
 - files/MyViewController
github:
  path: https://github.com/auth0-samples/auth0-xamarin-oidc-samples/tree/master/Quickstart/01-Login
locale: ja-JP
---

# .NET AndroidまたはiOSアプリケーションにログインを追加する


<p>Auth0を使用すると、アプリケーションに手軽に認証を追加することができます。このガイドは、.NET AndroidまたはiOSアプリケーションに<a href="https://www.nuget.org/packages/Auth0.OidcClient.AndroidX/">Android</a>や<a href="https://www.nuget.org/packages/Auth0.OidcClient.iOS">iOS</a>用のAuth0 SDKを使ってAuth0を統合し、認証の追加とユーザープロファイル情報の表示を行う方法について説明します。</p><p><div class="alert-container" severity="default"><p>このクイックスタートは、<code>Xamarin.Android</code>と<code>Xamarin.iOS</code>の次世代である.NET AndroidとiOSについて説明します。現在、<code>Xamarin.Android</code>や<code>Xamarin.iOS</code>を使用している場合は、統合が同一でSDKにも互換性があるため、このガイドに従ってください。</p></div></p><p>このクイックスタートを使用するには、以下の手順に従います：</p><ul><li><p>Auth0の無料アカウントにサインアップするか、Auth0にログインします。</p></li><li><p>統合したいAndroidまたはiOSのプロジェクトで、.NET 6以降を使用したものを用意します。または、ログインした後に、サンプルアプリケーションを表示してダウンロードすることもできます。</p></li></ul><p></p><p></p>

## Auth0を構成する


<p>Auth0のサービスを利用するには、Auth0 Dashboadに設定済みのアプリケーションがある必要があります。Auth0アプリケーションは、プロジェクトに対してどのように認証が動作して欲しいかを構成する場所です。</p><h3>アプリケーションを構成する</h3><p>対話型のセレクターを使って「ネイティブアプリケーション」を新規作成するか、統合したいプロジェクトを表す既存のアプリケーションを選択します。Auth0のすべてのアプリケーションには英数字からなる一意のクライアントIDが割り当てられており、アプリケーションのコードがSDKを通じてAuth0 APIを呼び出す際に使用されます。</p><p>このクイックスタートを使って構成されたすべての設定は、<a href="https://manage.auth0.com/#/">Dashboard</a>のアプリケーションを自動更新します。今後、アプリケーションの管理もDashboardで行えます。</p><p>完了済みの構成を見てみたい場合は、サンプルアプリケーションをご覧ください。</p><h3>Callback URLを構成する</h3><p>Callback URLとは、Auth0がユーザーを認証後にリダイレクトするアプリケーション内URLです。設定されていない場合、ユーザーはログイン後にアプリケーションに戻りません。</p><p><div class="alert-container" severity="default"><p>サンプルプロジェクトに沿って進めている場合は、プラットフォームに応じて、これを次のURLの1つに設定します：</p><ul><li><p><b>Android</b>：<code>YOUR_PACKAGE_NAME://{yourDomain}/android/YOUR_PACKAGE_NAME/callback</code></p></li><li><p><b>iOS</b>：<code>YOUR_BUNDLE_ID://{yourDomain}/ios/YOUR_BUNDLE_ID/callback</code></p></li></ul><p></p></div></p><h3>ログアウトURLを構成する</h3><p>ログアウトURLとは、Auth0がユーザーをログアウト後にリダイレクトするアプリケーション内URLです。設定されていない場合、ユーザーはアプリケーションからログアウトできず、エラーを受け取ります。</p><p><div class="alert-container" severity="default"><p>サンプルプロジェクトに沿って進めている場合は、プラットフォームに応じて、これを次のURLの1つに設定します：</p><ul><li><p><b>Android</b>：<code>YOUR_PACKAGE_NAME://{yourDomain}/android/YOUR_PACKAGE_NAME/callback</code></p></li><li><p><b>iOS</b>：<code>YOUR_BUNDLE_ID://{yourDomain}/ios/YOUR_BUNDLE_ID/callback</code></p></li></ul><p></p></div></p><p>最後に、アプリケーションの<b>［Application Type（アプリケーションタイプ）］</b>が<b>［Native（ネイティブ）］</b>になっていることを<a href="https://manage.auth0.com/#/applications/">アプリケーションの設定</a>で必ず確認してください。</p>

## Auth0 SDKをインストールする


<p>.NET AndroidとiOSアプリケーションで、Auth0認証が手軽に実装できるように、Auth0は<a href="https://www.nuget.org/packages/Auth0.OidcClient.AndroidX/">Android</a>と<a href="https://www.nuget.org/packages/Auth0.OidcClient.iOS">iOS</a>のSDKを提供しています。</p><p>NuGetパッケージマネージャ（［Tools（ツール）］ -&gt; ［Library Package Manager（ライブラリーパッケージマネージャー）］ -&gt; ［Package Manager Console（パッケージマネージャーコンソール）］）を使用して、AndroidまたはiOSアプリケーションのどちらをビルドするかに応じて、<code>Auth0.OidcClient.AndroidX</code>または<code>Auth0.OidcClient.iOS</code>パッケージをインストールします。</p><p>NuGetパッケージマネージャーコンソール（<code>Install-Package</code>）や<code>dotnet</code> CLI（<code>dotnet add</code>）を代わりに使用することもできます。</p><p><pre><code>Install-Package Auth0.OidcClient.AndroidX

Install-Package Auth0.OidcClient.iOS

</code></pre>

</p><p><pre><code>dotnet add Auth0.OidcClient.AndroidX

dotnet add Auth0.OidcClient.iOS

</code></pre>

</p>

## Auth0Clientをインスタンス化する


<p>Auth0をアプリケーションに統合するには、Auth0のドメインとクライアントIDを含む<code>Auth0ClientOptions</code>のインスタンスを渡して、<code>Auth0Client</code>クラスをインスタンス化します。</p><p><pre><code class="language-csharp">using Auth0.OidcClient;



var client = new Auth0Client(new Auth0ClientOptions {

  Domain = &quot;${account.namespace}&quot;,

  ClientId = &quot;${account.clientId}&quot;

}, this);

</code></pre>

</p><p>SDKは初期設定で、AndroidにはChrome Custom Tabs、iOSにはASWebAuthenticationSessionを利用します。</p><p><div class="checkpoint">.NET Android/iOSクイックスタート - 手順3「チェックポイント」 <div class="checkpoint-default"><p><code>Auth0Client</code>が適切にインスタンス化されました。アプリケーションを実行して次の点を確認します：</p><ul><li><p><code>Auth0Client</code>のインスタンスが<code>Activity</code>（Android）または<code>UIViewController</code>（iOS）で正しく作成されている。</p></li><li><p>アプリケーションがAuth0に関連したエラーを投入していない。</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Sorry about that. Here are a couple things to double-check:</p><ul><li><p>make sure the correct application is selected</p></li><li><p>did you save after entering your URLs?</p></li><li><p>make sure the domain and client ID are imported correctly</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p></div>

  </div></p>

## Androidを構成する {{{ data-action="code" data-code="MainActivity.cs#2:9" }}}


<p>ユーザーが認証に成功すると、このクイックスタートで前にセットアップしたCallback URLへリダイレクトされます。</p><p>Androidデバイスでコールバックを扱うには、Callback URLを扱うインテントを登録する必要があります。これを手軽に実現するには、認証フローをインスタンス化するためにLoginAsyncメソッドを呼び出したのと同じアクティビティーにインテントを登録します。</p><p>必ず、サンプルコードにある<code>YOUR_ANDROID_PACKAGE_NAME</code>は実際のアプリケーションのパッケージ名（<code>com.mycompany.myapplication</code>など）で置き換えてください。また、<code>DataScheme</code>、<code>DataHost</code>、<code>DataPathPrefix</code>のテキストがすべて小文字であることを確認してください。アクティビティーには<code>LaunchMode = LaunchMode.SingleTask</code>を設定します。設定しないと、Callback URLが呼び出されるたびに、システムがアクティビティーの新しいインスタンスを作成します。</p><p>また、<code>Activity</code>クラスにある<code>OnNewIntent</code>イベントでインテントを扱う必要があります。<code>ActivityMediator</code>シングルトンの<code>Send</code>メソッドを呼び出して受け取ったURLを渡し、Auth0のOIDCクライアントに認証フローを終わらせるよう通知する必要があります。</p><p><pre><code class="language-csharp">protected override void OnNewIntent(Intent intent)

    {

        base.OnNewIntent(intent);

        ActivityMediator.Instance.Send(intent.DataString);

    }

</code></pre>

</p>

## iOSを構成する {{{ data-action="code" data-code="AppDelegate.cs#6:11" }}}


<p>ユーザーが認証に成功すると、このクイックスタートで前にセットアップしたCallback URLへリダイレクトされます。</p><p>iOSデバイスでコールバックを扱うには、以下を行います：</p><ol><li><p>アプリケーションの<code>Info.plist</code>ファイルをVisual Studioで開いて、<b>［Advanced（詳細）］</b>タブに移動します。</p></li><li><p><b>［URL Types（URLタイプ）］</b>にある<b>［Add URL Type（URLタイプの追加）］</b>ボタンをクリックします。</p></li><li><p><b>識別子</b>をAuth0、<b>URLスキーマ</b>をアプリケーションの<code>バンドル識別子</code>、<b>ロール</b>を<code>［None（なし）］</code>に設定します。</p></li></ol><p>これは、URLタイプを追加した後でXML表記された<code>info.plist</code>ファイルの例です：</p><p><pre><code class="language-xml">&lt;key&gt;CFBundleURLTypes&lt;/key&gt;

&lt;array&gt;

 &lt;dict&gt;

 &lt;key&gt;CFBundleTypeRole&lt;/key&gt;

 &lt;string&gt;None&lt;/string&gt;

 &lt;key&gt;CFBundleURLName&lt;/key&gt;

 &lt;string&gt;Auth0&lt;/string&gt;

 &lt;key&gt;CFBundleURLSchemes&lt;/key&gt;

 &lt;array&gt;

 &lt;string&gt;YOUR_BUNDLE_IDENTIFIER&lt;/string&gt;

 &lt;/array&gt;

 &lt;/dict&gt;

&lt;/array&gt;

</code></pre>

</p><p>さらに、<code>AppDelegate</code>クラスにある<code>OpenUrl</code>イベントでCallback URLを扱う必要があります。<code>ActivityMediator</code>シングルトンの<code>Send</code>メソッドを呼び出して受け取ったURLを渡し、Auth0のOIDCクライアントに認証フローを終わらせるよう通知する必要があります。</p>

## アプリケーションにログインを追加する


<p>Auth0アプリケーションとAuth0 SDKの構成が完了したら、プロジェクトのためにログインをセットアップする必要があります。これを実現するには、SDKの<code>LoginAsync()</code>メソッドを使用して、ユーザーをAuth0のユニバーサルログインページにリダイレクトするログインボタンを作成します。</p><p><pre><code class="language-csharp">var loginResult = await client.LoginAsync();

</code></pre>

</p><p>エラーがなければ、<code>LoginAsync()</code>が返す<code>LoginResult</code>で<code>User</code>、<code>IdentityToken</code>、<code>AccessToken</code>、<code>RefreshToken</code>にアクセスすることができます。</p><p><div class="checkpoint">.NET Android/iOSクイックスタート - 手順6「チェックポイント」 <div class="checkpoint-default"><p>ユーザー名とパスワードを使ってログインやサインアップができるようになりました。</p><p>ログインボタンをクリックして次の点を確認します：</p><ul><li><p>AndroidまたはiOSアプリケーションによってAuth0のユニバーサルログインページにリダイレクトされる。</p></li><li><p>ログインまたはサインアップできる。</p></li><li><p>Auth0によってアプリケーションにリダイレクトされる。</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Sorry about that. Here&#39;s something to double-check:</p><ul><li><p>you called <code>LoginAsync</code> as expected</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p></div>

  </div></p>

## アプリケーションにログアウトを追加する


<p>プロジェクトにログインしたユーザーには、ログアウトする方法も必要です。SDKの<code>LogoutAsync()</code>メソッドを使用してログアウトボタンを作成します。ユーザーはログアウトすると、Auth0ログアウトエンドポイントにリダイレクトされてから、即座に、このクイックスタートで先ほどセットアップしたログアウトURLにリダイレクトで戻されます。</p><p><pre><code class="language-csharp">await client.LogoutAsync();

</code></pre>

</p><p><div class="checkpoint">.NET Android/iOSクイックスタート - 手順7「チェックポイント」 <div class="checkpoint-default"><p>アプリケーションを実行して、ログアウトボタンをクリックします。以下の点を確認します：</p><ul><li><p>AndroidまたはiOSアプリケーションによって、アプリケーションの設定で［Allowed Logout URLs（許可されているログアウトURL）］の1つに指定されているアドレスへリダイレクトされる。</p></li><li><p>アプリケーションにログインしていない。</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Sorry about that. Here are a couple things to double-check:</p><ul><li><p>you configured the correct Logout URL</p></li><li><p>you called <code>LogoutAsync</code> as expected.</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p></div>

  </div></p>

## ユーザープロファイル情報を表示する


<p>ユーザーがログインやログアウトできるようになったら、認証済のユーザーに関連付けられた<a data-contentfulid="2ClGWANGeRoTkg5Ax2gOVK-ja-JP">プロファイル情報</a>を取得できるようにしたいと考えるはずです。たとえば、ログインしたユーザーの名前やプロフィール写真をプロジェクトに表示したいかもしれません。</p><p>AndroidまたはiOS用のAuth0 SDKでは、<code>LoginResult.User</code>プロパティを通じてユーザー情報を提供します。</p><p><pre><code class="language-swift">if loginResult.IsError == false {

  var user = loginResult.User

  var name = user.FindFirst(c =&gt; c.Type == &quot;name&quot;)?.Value

  var email = user.FindFirst(c =&gt; c.Type == &quot;email&quot;)?.Value

  var picture = user.FindFirst(c =&gt; c.Type == &quot;picture&quot;)?.Value

}

</code></pre>

</p>
