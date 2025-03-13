---
title: Capacitorを用いたIonic Angularアプリケーションにログインを追加する
description: このガイドは、Ionic（Angular）とCapacitorのアプリケーションにAuth0 Angular SDKを使ってAuth0を統合する方法を説明します。
interactive:  true
files:
 - files/app.module
 - files/app.component
 - files/login-button
 - files/logout-button
 - files/user-profile
github:
  path: https://github.com/auth0-samples/auth0-ionic-samples/tree/main/angular
locale: ja-JP
---

# Capacitorを用いたIonic Angularアプリケーションにログインを追加する


<p>Auth0を使用すると、アプリケーションに手軽に認証を追加して、ユーザープロファイル情報にアクセスすることができます。このガイドは、Ionic（Angular）とCapacitorのアプリケーションに<a href="https://github.com/auth0/auth0-angular">Auth0 Angular SDK</a>を使ってAuth0を統合する方法を説明します。</p><p></p>

## 使用を開始する


<p>このクイックスタートは、<a href="https://ionicframework.com/">Ionic</a>アプリケーションが<a href="https://capacitorjs.com/">Capacitor</a>を使ってすでに実行されていることを前提としています。そうでない場合には、<a href="https://capacitorjs.com/docs/getting-started/with-ionic">IonicフレームワークでCapacitorを使用する</a>ガイドを参照しながら簡単なアプリから始めるか、<a href="https://github.com/auth0-samples/auth0-ionic-samples">サンプリアプリ</a>を複製してください。</p><p>また、<a href="https://capacitorjs.com/docs/basics/workflow">Capacitorの開発ワークフロー</a>を理解しておく必要もあります。</p>

## Auth0を構成する


<p>Auth0のサービスを利用するには、Auth0 Dashboadに設定済みのアプリケーションがある必要があります。Auth0アプリケーションは、プロジェクトに対してどのように認証が動作して欲しいかを構成する場所です。</p><p><div class="alert-container" severity="default"><p>以下の説明では、「<code>YOUR_PACKAGE_ID</code>」を実際のアプリケーションのパッケージIDに置き換えてください。これは、<code>capacitor.config.ts</code>ファイルの<code>appId</code>フィールドで見つけて構成することができます。詳細については、<a href="https://capacitorjs.com/docs/config#schema">Capacitorの構成スキーマ</a>を参照してください。</p></div></p><h3>アプリケーションを構成する</h3><p>対話型のセレクターを使ってAuth0アプリケーションを新規作成するか、統合したいプロジェクトを表す既存のアプリケーションを選択します。Auth0のすべてのアプリケーションには英数字からなる一意のクライアントIDが割り当てられており、アプリケーションのコードがSDKを通じてAuth0 APIを呼び出す際に使用されます。</p><p>このクイックスタートを使って構成されたすべての設定は、<a href="https://manage.auth0.com/#/">Dashboard</a>のアプリケーションを自動更新します。今後、アプリケーションの管理もDashboardで行えます。</p><p>完了済みの構成を見てみたい場合は、サンプルアプリケーションをご覧ください。</p><h3>Callback URLを構成する</h3><p>Callback URLとは、Auth0がユーザーを認証後にリダイレクトするアプリケーション内URLです。設定されていない場合、ユーザーはログイン後にアプリケーションに戻りません。</p><p><div class="alert-container" severity="default"><p>サンプルプロジェクトに沿って進めている場合には、次の値に設定します：</p><p><code>YOUR_PACKAGE_ID://{yourDomain}/capacitor/YOUR_PACKAGE_ID/callback</code></p></div></p><h3>ログアウトURLを構成する</h3><p>ログアウトURLとは、Auth0がユーザーをログアウト後にリダイレクトするアプリケーション内URLです。設定されていない場合、ユーザーはアプリケーションからログアウトできず、エラーを受け取ります。</p><p><div class="alert-container" severity="default"><p>サンプルプロジェクトに沿って進めている場合には、次の値に設定します：</p><p><code>YOUR_PACKAGE_ID://{yourDomain}/capacitor/YOUR_PACKAGE_ID/callback</code></p></div></p><h3>許可されているオリジンを構成する</h3><p>ネイティブアプリケーションからAuth0へ要求を送信できるようにするには、<a href="https://manage.auth0.com/#/applications/%7ByourClientId%7D/settings">アプリケーションの設定</a>で次の<b>許可されているオリジン</b>を設定します。</p><p><div class="alert-container" severity="default"><p>サンプルプロジェクトに沿って進めている場合、capacitorにiOSとAndroidでそれぞれ<code>capacitor://localhost, http://localhost</code>を設定します。</p></div></p><p>最後に、アプリケーションの<b>［Application Type（アプリケーションタイプ）］</b>が<b>［Native（ネイティブ）］</b>になっていることを<a href="https://manage.auth0.com/#/applications/%7ByourClientId%7D/settings">アプリケーションの設定</a>で必ず確認してください。</p>

## Auth0 Angular SDKをインストールする


<p>プロジェクトディレクトリで次のコマンドを実行して、Auth0 Angular SDKをインストールします：</p><p><code>npm install @auth0/auth0-angular</code></p><p>SDKはモジュールや認証サービスなど、Auth0をAngularアプリケーションに慣用的に統合しやすくする種類をいくつか公開しています。</p><h3>Capacitorプラグインをインストールする</h3><p>このクイックスタートとサンプルでは、Capacitorの公式プラグインをいくつか使用しています。次のコマンドを使用して、これらをアプリにインストールします：</p><p><code>npm install @capacitor/browser @capacitor/app</code></p><ul><li><p><a href="https://capacitorjs.com/docs/apis/browser"><code>@capacitor/browser</code></a>：デバイスのシステムブラウザーと対話できるようになり、Auth0の認可エンドポイントへのURLを開くために使用されます。</p></li><li><p><a href="https://capacitorjs.com/docs/apis/app"><code>@capacitor/app</code></a>：高レベルのアプリイベントを受け取れるようになるため、Auth0からのコールバックを扱うのに便利です。</p></li></ul><p><div class="alert-container" severity="default"><p>iOSのCapacitorのBrowserプラグインは<a href="https://developer.apple.com/documentation/safariservices/sfsafariviewcontroller"><code>SFSafariViewController</code></a>を使用し、iOS 11以降ではデバイス上のSafariとクッキーを共有しません。つまり、これらのデバイスでは<a data-contentfulid="4f8xlBFWPeXbF5hUlmp8RJ">SSO</a>が機能しません。SSOが必要な場合には、<a href="https://developer.apple.com/documentation/authenticationservices/aswebauthenticationsession">ASWebAuthenticationSession</a>を使用する互換のプラグインを使用してください。</p></div></p>

## 認証モジュールを登録して構成する {{{ data-action="code" data-code="app.module.ts" }}}


<p>SDKは、SDKが機能するために必要なすべてのサービスを含んだ<code>AuthModule</code>をエクスポートします。このモジュールをアプリケーションに登録し、Auth0のドメインとクライアントIDで構成する必要があります。</p><p><code>AuthModule.forRoot</code>関数は以下の構成を使用します。</p><ul><li><p><code>domain</code>：Auth0 Dashboardで作成したアプリケーションの<b>設定</b>にある<code>domain</code>値、またはAuth0の<a data-contentfulid="UYjAbgxX33g81azZ6VHWc-ja-JP">カスタムドメイン機能</a>を使用する場合のカスタムドメインです。</p></li><li><p><code>clientId</code>：Auth0 Dashboardで作成したアプリケーションの<b>設定</b>にあるクライアントID値です。</p></li><li><p><code>useRefreshTokens</code>：AndroidまたはiOSでauth0-angularをIonicと使用するには、リフレッシュトークンを有効にする必要があります。</p></li><li><p><code>useRefreshTokensFallback</code>：AndroidまたはiOSでauth0-angularをIonicと使用するには、iframeのフォールバックを無効にする必要があります。</p></li><li><p><code>authorizationParams.redirect_uri</code>：Auth0で認証した後に、ユーザーをリダイレクトするURLです。</p></li></ul><p><div class="alert-container" severity="warning"><p>アプリケーションの閉開後に認証を継続するには、SDKを構成する際に<code>cacheLocation</code>を<code>localstorage</code>に設定することをお勧めします。ただし、<a href="/docs/libraries/auth0-single-page-app-sdk#change-storage-options">localstorageにトークンを保管するリスク</a>を理解してください。また、状況によってはlocalstorageのデータが思いがけず復元される可能性もあるため、Capacitorアプリ内では<b>一次的</b>なものとして扱ってください。<a href="https://capacitorjs.com/docs/guides/storage#why-cant-i-just-use-localstorage-or-indexeddb">Capacitorドキュメントに記載のストレージに関するガイド</a>をお読みください。</p><p>さらに、より安全で永続的なストレージの仕組みが要件である場合、SDKを使用すると、<a href="https://github.com/auth0/auth0-spa-js/blob/master/EXAMPLES.md#creating-a-custom-cache">カスタムのキャッシュを実装</a>してトークンを保管することができます。</p><p><b>注意</b>：<a href="https://capacitorjs.com/docs/apis/storage">CapacitorのStorageプラグイン</a>は、iOSでは<a href="https://developer.apple.com/documentation/foundation/userdefaults">UserDefaults</a>、Androidでは<a href="https://developer.android.com/reference/android/content/SharedPreferences">SharedPreferences</a>によってバックアップされるため、トークンの保管に使用<b>しない</b>ことをお勧めします。これらのAPIを使って保管されたデータは暗号化されません。セキュリティで保護されることもなく、クラウドと同期される可能性があります。</p></div></p><p><div class="checkpoint">IonicとCapacitor（Angular）- 手順4 - 認証モジュールを登録して構成する <div class="checkpoint-default"><p>アプリがAuth0 Angular SDKで構成されました。今度は、アプリケーションを実行して、SDKがエラーなく初期化されること、そして、以前と同じように動作することを確認します。</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Sorry about that. Here&#39;s a couple things to double check:</p><ul><li><p>ensure the correct application is selected</p></li><li><p>did you save after entering your URLs?</p></li><li><p>make sure the domain and Client ID imported correctly</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p></div>

  </div></p>

## アプリケーションにログインを追加する {{{ data-action="code" data-code="login-button.ts" }}}


<p>Capacitorアプリケーションでは、<a href="https://capacitorjs.com/docs/apis/browser">CapacitorのBrowserプラグイン</a>によって、Auth0の<a href="https://auth0.com/universal-login">ユニバーサルログインページ</a>にリダイレクトされます。<code>loginWithRedirect</code>関数の<code>openUrl</code>パラメーターに<code>Browser.open</code>の使用を設定し、デバイスのシステムブラウザーコンポーネント（iOSでは<a href="https://developer.apple.com/documentation/safariservices/sfsafariviewcontroller">SFSafariViewController</a>、Androidでは<a href="https://developer.chrome.com/docs/android/custom-tabs">Chrome Custom Tabs</a>）でURLが開くようにします。</p><p><div class="alert-container" severity="default"><p>SDKの<code>loginWithRedirect</code>メソッドは、デフォルトで<code>window.location.href</code>を使用して、ユーザーのデバイスにあるデフォルトのブラウザーアプリケーションでログインページを開きます。プラットフォームに適切なシステムブラウザーコンポーネントは使用しません。ユーザーが認証でアプリケーションを離れるため、ユーザーエクスペリエンスとしては最適ではありません。</p></div></p><p><div class="checkpoint">IonicとCapacitor（Angular）- 手順5 - アプリケーションにログインを追加する <div class="checkpoint-default"><p><code>loginWithRedirect</code>関数は、SDKにログインフローを開始するように指示します。<code>openUrl</code>パラメーターにログインURLを設定して、<code>Browser.open</code>関数を呼し出し、プラットフォームのシステムブラウザーコンポーネントでログインURLを開きます。これは、ユーザーがアプリケーションにログインする方法を提供します。ユーザーはAuth0のログインページにリダイレクトされ、エラーは一切受け取りません。</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Sorry about that. Here&#39;s a couple things to double check:</p><ul><li><p>ensure that there are no errors in the browser&#39;s console window at the point of login</p></li><li><p>ensure the domain and Client ID are correct according to your Auth0 application in the Dashboard</p></li><li><p>if you are redirected to Auth0 and receive an error page, check the &quot;technical details&quot; section at the bottom for the reason for the failure</p></li></ul><p></p></div>

  </div></p>

## ログインコールバックを処理する {{{ data-action="code" data-code="app.component.ts" }}}


<p>ユーザーがユニバーサルログインページでログインすると、カスタムURLスキームを使ったURLでアプリにリダイレクトされます。<code>appUrlOpen</code>イベントがアプリ内で処理されなければなりません。Auth0 SDKの<code>handleRedirectCallback</code>メソッドを呼び出すと、認証状態を初期化することができます。</p><p>このメソッドは、Auth0からのリダイレクトでのみ使用することができます。正常に機能していることを確認するには、URL内の<code>code</code>と<code>state</code>パラメーターを確認します。</p><p>このイベントが発生した際に、<code>Browser.close()</code>メソッドがブラウザーを閉じるようにします。</p><p><code>appUrlOpen</code>イベントのコールバックが<code>ngZone.run</code>でラップされていることに注意してください。<code>handleRedirectCallback</code>の実行時に発生するオブザーバブルへの変更は、Angularアプリが受け取ります。詳細については、「<a href="https://capacitorjs.com/docs/guides/angular">AngularをCapacitorと使用する</a>」をお読みください。それ以外の場合では、画面がログイン後の認証状態で更新されません。</p><p><div class="alert-container" severity="default"><p>以下の説明では、カスタムURLスキームを使用して、アプリケーション内でコールバックを処理することを前提にしています。このためには、<code>YOUR_PACKAGE_ID</code>を選択したプラットのURLスキームで置き換えて登録します。詳細については、iOSには「<a href="https://developer.apple.com/documentation/xcode/defining-a-custom-url-scheme-for-your-app">カスタムURLスキームを定義する</a>」、Androidには「<a href="https://developer.android.com/training/app-links/deep-linking">アプリコンテンツ用のディープリンクを作成する</a>」をお読みください。</p></div></p><p><div class="checkpoint">IonicとCapacitor（Angular）- 手順6 - ログインコールバックを処理する <div class="checkpoint-default"><p>アプリケーションの<code>App</code>コンポーネントに<code>appUrlOpen</code>を追加して、ログインします。ユーザーが認証して、アプリにログインすると、ブラウザーのウィンドウが閉じます。</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Sorry about that. Here&#39;s a couple things to double check:</p><ul><li><p>check that the custom URL scheme is registered for your chosen platform. On iOS, <a href="https://developer.apple.com/documentation/xcode/defining-a-custom-url-scheme-for-your-app">define a custom URL scheme</a>, or add an <a href="https://developer.android.com/training/app-links/deep-linking">intent filter with your custom scheme</a> for Android</p></li><li><p>if the event fires but you receive an error, check the <a href="https://manage.auth0.com/#/logs">logs in your Auth0 Dashboard</a> for the error code</p></li></ul><p></p></div>

  </div></p>

## アプリケーションにログアウトを追加する {{{ data-action="code" data-code="logout-button.ts" }}}


<p>ユーザーがログインできるようになりました。今度は、<a data-contentfulid="5sl85ipAFaf8i4CH9wD6VA-ja-JP">ログアウトする方法</a>を構成する必要があります。ユーザーをAuth0のログアウトエンドポイントにリダイレクトし、ブラウザー内のセッションをクリアする必要があります。他の場合と同様に、ユーザーがアプリから離れることでユーザーエクスペリエンスが損なわれないように、CapacitorのBrowserプラグインがリダイレクトを処理するようにします。</p><p>Auth0 SDKを使用してIonicとCapacitorで実現するには、以下を行います。</p><ul><li><p>アプリについて、ログアウト後にAuth0のリダイレクト先となるURLを構築します。これは、登録済みのカスタムスキームとAuth0ドメインを使ったURLです。これを、Auth0 Dashboardの<b>［Allowed Logout URLs（許可されているログアウトURL）］</b>の構成に追加します。</p></li><li><p><code>logout</code>を呼び出し、<code>logoutParams.returnTo</code>パラメーターにリダイレクト先のURLを渡して、SDKからログアウトします。</p></li><li><p>CapacitorのBrowserプラグインを使用して<code>Browser.open</code>でURLを開くコールバックに、<code>openUrl</code>パラメーターを設定します。</p></li></ul><p><div class="alert-container" severity="default"><p>ログインの手順と同様に、<code>logout</code>を呼び出す際に<code>openUrl</code>を設定しないと、SDKがユーザーをログアウトURLにリダイレクトするのに、デバイスのデフォルトのブラウザーアプリケーションが使用されるため、ユーザーエクスペリエンスとしては最適ではありません。</p></div></p><p><div class="checkpoint">IonicとCapacitor（Angular）- 手順7 - アプリケーションにログアウトを追加する <div class="checkpoint-default"><p>ユーザーがアプリケーションからログアウトする方法を提供します。Auth0にリダイレクトしてから、<code>returnTo</code>パラメーターで指定したアドレスへ移動することを確認します。ユーザーがアプリケーションにログインしていないことを確認します。</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Sorry about that. Here&#39;s a couple things to double check:</p><ul><li><p>check that the URL you provided to in the <code>returnTo</code> parameter is registered as an allowed callback URL in your Auth0 Dashboard</p></li></ul><p></p></div>

  </div></p>

## ユーザープロファイルを表示する {{{ data-action="code" data-code="user-profile.ts" }}}


<p>Auth0 SDKは必要な任意のコンポーネントについて、名前やプロフィール写真など、ログイン済みのユーザーに関連付けられた<a data-contentfulid="2ClGWANGeRoTkg5Ax2gOVK-ja-JP">プロファイル情報</a>を取得し、ユーザーインターフェイスをパーソナライズします。プロファイル情報は、<code>AuthService</code>が公開する<code>user$</code>プロパティを介して使用することができます。</p><p><div class="checkpoint">IonicとCapacitor（Angular）- 手順8 - ユーザープロファイルを表示する <div class="checkpoint-default"><p>ユーザーがアプリ内でユーザープロファイルの詳細を表示できる手段を提供し、ログインした後に自分のプロファイル情報を取得して画面に表示できることを確認します。</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Sorry about that. Here&#39;s a couple things to double check:</p><ul><li><p>check that you are only reading the user&#39;s profile when <code>isLoading</code> is <code>false</code></p></li><li><p>check that <code>user</code> resolves to an object and is not <code>undefined</code></p></li></ul><p></p></div>

  </div></p>
