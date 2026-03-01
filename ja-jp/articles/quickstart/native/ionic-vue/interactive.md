---
title: CapacitorアプリでIonic Vueにログインを追加する
description: このガイドは、Ionic（Vue）とCapacitrorのアプリケーションにAuth0 Vue SDKを使ってAuth0を統合する方法を説明します。
interactive:  true
files:
 - files/main
 - files/LoginButton
 - files/LogoutButton
 - files/App
 - files/UserProfile
github:
  path: vue
locale: ja-JP
---

# CapacitorアプリでIonic Vueにログインを追加する


<p>Auth0を使用すると、アプリケーションに手軽に認証を追加して、ユーザープロファイル情報にアクセスすることができます。このガイドは、Ionic（Vue）とCapacitrorのアプリケーションに<a href="https://github.com/auth0/auth0-vue" target="_blank" rel="noreferrer noopener">Auth0 Vue SDK</a>を使ってAuth0を統合する方法を説明します。</p><p></p>

## 使用を開始する


<p>このクイックスタートは、<a href="https://ionicframework.com/" target="_blank" rel="noreferrer noopener">Ionic</a>アプリケーションが<a href="https://capacitorjs.com/" target="_blank" rel="noreferrer noopener">Capacitor</a>を使ってすでに実行されていることを前提としています。そうでない場合には、<a href="https://capacitorjs.com/docs/getting-started/with-ionic" target="_blank" rel="noreferrer noopener">IonicフレームワークでCapacitorを使用する</a>ガイドを参照しながら簡単なアプリから始めるか、<a href="https://github.com/auth0-samples/auth0-ionic-samples" target="_blank" rel="noreferrer noopener">サンプルアプリ</a>を複製してください。</p><p>また、<a href="https://capacitorjs.com/docs/basics/workflow" target="_blank" rel="noreferrer noopener">Capacitorの開発ワークフロー</a>を理解しておく必要もあります。</p>

## Auth0を構成する


<p>Auth0のサービスを利用するには、Auth0 Dashboadに設定済みのアプリケーションがある必要があります。Auth0アプリケーションは、プロジェクトに対してどのように認証が動作して欲しいかを構成する場所です。</p><p><div class="alert-container" severity="default"><p>以下の説明では、<code>YOUR_PACKAGE_ID</code>を実際のアプリケーションのパッケージIDに置き換えてください。これは、<code>capacitor.config.ts</code>ファイルの<code>appId</code>フィールドで見つけて構成することができます。詳細については、<a href="https://capacitorjs.com/docs/config#schema" target="_blank" rel="noreferrer noopener">Capacitorの構成スキーマ</a>を参照してください。</p></div></p><h3>アプリケーションを構成する</h3><p>対話型のセレクターを使ってAuth0アプリケーションを新規作成するか、統合したいプロジェクトを表す既存のアプリケーションを選択します。Auth0のすべてのアプリケーションには英数字からなる一意のクライアントIDが割り当てられており、アプリケーションのコードがSDKを通じてAuth0 APIを呼び出す際に使用されます。</p><p>このクイックスタートを使って構成されたすべての設定は、<a href="https://manage.auth0.com/#/" target="_blank" rel="noreferrer noopener">Dashboard</a>のアプリケーションを自動更新します。今後、アプリケーションの管理もDashboardで行えます。</p><p>代わりに完了済みの構成を見てみたい場合は、サンプルアプリケーションをご覧ください。</p><h3>Callback URLを構成する</h3><p>Callback URLとは、Auth0がユーザーを認証後にリダイレクトするアプリケーション内URLです。設定されていない場合、ユーザーはログイン後にアプリケーションに戻りません。</p><p><div class="alert-container" severity="default"><p>サンプルプロジェクトに沿って進めている場合は、<code>YOUR_PACKAGE_ID://{yourDomain}/capacitor/YOUR_PACKAGE_ID/callback</code>に設定してください。</p></div></p><h3>ログアウトURLを構成する</h3><p>ログアウトURLとは、Auth0がユーザーをログアウト後にリダイレクトするアプリケーション内URLです。設定されていない場合、ユーザーはアプリケーションからログアウトできず、エラーを受け取ります。</p><p><div class="alert-container" severity="default"><p>サンプルプロジェクトに沿って進めている場合は、<code>YOUR_PACKAGE_ID://{yourDomain}/capacitor/YOUR_PACKAGE_ID/callback</code>に設定してください。</p></div></p><h3>許可されているオリジンを構成する</h3><p>ネイティブアプリケーションからAuth0へ要求を送信できるようにするには、<a href="https://manage.auth0.com/#/applications/%7ByourClientId%7D/settings" target="_blank" rel="noreferrer noopener">アプリケーションの設定</a>で次の<b>許可されているオリジン</b>を設定します。</p><p><div class="alert-container" severity="default"><p>サンプルプロジェクトに沿って進めている場合、iOSとAndroidでそれぞれ<code>capacitor://localhost, http://localhost</code>を設定します。</p></div></p><p>最後に、アプリケーションの<b>［Application Type（アプリケーションタイプ）］</b>が<b>［Native（ネイティブ）］</b>になっていることを<a href="https://manage.auth0.com/#/applications/%7ByourClientId%7D/settings" target="_blank" rel="noreferrer noopener">アプリケーションの設定</a>で必ず確認してください。</p>

## Auth0 Vue SDKをインストールする


<p>プロジェクトディレクトリで次のコマンドを実行して、Auth0 Vue SDKをインストールします：</p><p><code>npm install @auth0/auth0-vue</code></p><p>SDKはモジュールや認証サービスなど、Auth0をVueアプリケーションに慣用的に統合しやすくする種類をいくつか公開しています。</p><h3>Capacitorプラグインをインストールする</h3><p>このクイックスタートとサンプルでは、Capacitorの公式プラグインをいくつか使用しています。次のコマンドを使用して、これらをアプリにインストールします：</p><p>npm install @capacitor/browser @capacitor/app</p><ul><li><p><a href="https://capacitorjs.com/docs/apis/browser" target="_blank" rel="noreferrer noopener"><code>@capacitor/browser</code></a>：デバイスのシステムブラウザーと対話できるようになり、Auth0の認可エンドポイントへのURLを開くために使用されます</p></li><li><p><a href="https://capacitorjs.com/docs/apis/app" target="_blank" rel="noreferrer noopener"><code>@capacitor/app</code></a>：高レベルのアプリイベントを受け取れるようになるため、Auth0からのコールバックを扱うのに便利です</p></li></ul><p><div class="alert-container" severity="default"><p>iOSのCapacitorのBrowserプラグインは<a href="https://developer.apple.com/documentation/safariservices/sfsafariviewcontroller" target="_blank" rel="noreferrer noopener"><code>SFSafariViewController</code></a>を使用し、iOS 11以降ではデバイス上のSafariとクッキーを共有しません。つまり、これらのデバイスでは<a href="https://auth0.com/docs/sso" target="_blank" >SSO</a>が機能しません。SSOが必要な場合には、<a href="https://developer.apple.com/documentation/authenticationservices/aswebauthenticationsession" target="_blank" rel="noreferrer noopener">ASWebAuthenticationSession</a>を使用する互換性のあるプラグインを使用してください。</p></div></p>

## CreateAuht0プラグインを構成する {{{ data-action="code" data-code="main.ts" }}}


<p>SDKは、SDKが機能するために必要なすべてのサービスを含んだコンポーザブル、<code>createAuth0</code>をエクスポートします。このコンポーザブルをアプリケーションに登録し、Auth0のドメインとクライアントIDで構成する必要があります。</p><p><code>createAuth0</code>コンポーザブルは以下の構成を取ります。</p><ul><li><p><code>domain</code>：Auth0 Dashboardで作成したアプリケーションの<b>［Settings（設定）］</b>にある<code>domain</code>値、またはAuth0の<a href="http://localhost:3000/docs/custom-domains" target="_self" >カスタムドメイン機能</a>を使用する場合のカスタムドメインです。</p></li><li><p><code>clientId</code>：Auth0 Dashboardで作成したアプリケーションの<b>［Settings（設定）］</b>にあるクライアントID値です。</p></li><li><p><code>useRefreshTokens</code>：AndroidまたはiOSでauth0-vueをIonicと使用するには、リフレッシュトークンを有効にする必要があります。</p></li><li><p><code>useRefreshTokensFallback</code>：AndroidまたはiOSでauth0-vueをIonicと使用するには、iframeのフォールバックを無効にする必要があります。</p></li><li><p><code>authorizationParams.redirect_uri</code>：Auth0で認証した後に、ユーザーをリダイレクトするURLです。</p></li></ul><p><div class="alert-container" severity="warning"><p>アプリケーションの閉開後に認証を継続するには、SDKを構成する際に<code>cacheLocation</code>を<code>localstorage</code>に設定することをお勧めします。ただし、<a href="https://auth0.com/docs/libraries/auth0-single-page-app-sdk#change-storage-options" target="_blank" >localstorageにトークンを保管するリスク</a>を理解してください。また、状況によってはlocalstorageのデータが思いがけず復元される可能性もあるため、Capacitorアプリ内では<b>一次的</b>なものとして扱ってください。<a href="https://capacitorjs.com/docs/guides/storage#why-cant-i-just-use-localstorage-or-indexeddb" target="_blank" rel="noreferrer noopener">Capacitorドキュメントに記載のストレージに関するガイド</a>をお読みください。</p><p>さらに、より安全で永続的なストレージの仕組みが要件である場合、SDKを使用すると、<a href="https://github.com/auth0/auth0-spa-js/blob/master/EXAMPLES.md#creating-a-custom-cache" target="_blank" rel="noreferrer noopener">カスタムのキャッシュを実装</a>してトークンを保管することができます。</p><p><b>注意</b>：<a href="https://capacitorjs.com/docs/apis/storage" target="_blank" rel="noreferrer noopener">CapacitorのStorageプラグイン</a>は、iOSでは<a href="https://developer.apple.com/documentation/foundation/userdefaults" target="_blank" rel="noreferrer noopener">UserDefaults</a>、Androidでは<a href="https://developer.android.com/reference/android/content/SharedPreferences" target="_blank" rel="noreferrer noopener">SharedPreferences</a>によってバックアップされるため、トークンの保管に使用<b>しない</b>ことをお勧めします。これらのAPIを使って保管されたデータは暗号化されません。セキュリティで保護されることもなく、クラウドと同期される可能性があります。</p></div></p><p><div class="checkpoint">ionic クイックスタート - 手順4「チェックポイント」 <div class="checkpoint-default"><p>アプリがAuth0 Vue SDKで構成されました。今度は、アプリケーションを実行して、SDKがエラーなく初期化されること、そして、以前と同じように動作することを確認します。</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>すみません。いくつかの点をもう一度確認してください。</p><ul><li><p>正しいアプリケーションが選択されていることを確認します</p></li><li><p>URLを入力した後で保存しましたか？</p></li><li><p>ドメインとクライアントIDが正常にインポートされていることを確認します</p></li></ul><p>まだお困りですか？当社提供の<a href="https://auth0.com/docs" target="_blank" >ドキュメント</a>または<a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">コミュニティページ</a>で詳しい情報を確認してください。</p></div>

  </div></p>

## アプリケーションにログインを追加する {{{ data-action="code" data-code="LoginButton.vue" }}}


<p>Capacitorアプリケーションでは、<a href="https://capacitorjs.com/docs/apis/browser" target="_blank" rel="noreferrer noopener">CapacitorのBrowserプラグイン</a>によって、Auth0の<a href="https://auth0.com/universal-login" target="_blank" >ユニバーサルログインページ</a>にリダイレクトされます。<code>loginWithRedirect</code>関数の<code>openUrl</code>パラメーターに<code>Browser.open</code>の使用を設定し、デバイスのシステムブラウザーコンポーネント（iOSでは<a href="https://developer.apple.com/documentation/safariservices/sfsafariviewcontroller" target="_blank" rel="noreferrer noopener">SFSafariViewController</a>、Androidでは<a href="https://developer.chrome.com/docs/android/custom-tabs" target="_blank" rel="noreferrer noopener">Chrome Custom Tabs</a>）でURLが開くようにします。</p><p><div class="alert-container" severity="default"><p>SDKの<code>loginWithRedirect</code>メソッドは、デフォルトで<code>window.location.href</code>を使用して、ユーザーのデバイスにあるデフォルトのブラウザーアプリケーションでログインページを開きます。プラットフォームに適切なシステムブラウザーコンポーネントは使用しません。ユーザーが認証でアプリケーションを離れるため、ユーザーエクスペリエンスとしては最適ではありません。</p></div></p><p><div class="checkpoint">ionic手順5「チェックポイント」 <div class="checkpoint-default"><p><code>loginWithRedirect</code>関数は、SDKにログインフローを開始するように指示します。<code>openUrl</code>パラメーターを設定して、<code>Browser.open</code>関数を呼び出し、プラットフォームのシステムブラウザーコンポーネントでログインURLを開きます。これは、ユーザーがアプリケーションにログインする方法を提供します。ユーザーはAuth0のログインページにリダイレクトされ、エラーは一切受け取りません。</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>すみません。いくつかの点をもう一度確認してください。</p><ul><li><p>ログイン時にブラウザーのコンソールウィンドウでエラーが発生しないことを確認します</p></li><li><p>Auth0アプリケーションについて、DashboardでドメインとクライアントIDが正しいことを確認します</p></li><li><p>Auth0へのリダイレクトでエラーページを受け取った場合には、下部にある技術詳細セクションで失敗の理由を確認します</p></li></ul><p></p></div>

  </div></p>

## ログインコールバックを処理する {{{ data-action="code" data-code="App.vue" }}}


<p>ユーザーがユニバーサルログインページでログインすると、カスタムURLスキームを使ったURLでアプリにリダイレクトされます。<code>appUrlOpen</code>イベントがアプリ内で処理されなければなりません。Auth0 SDKの<code>handleRedirectCallback</code>メソッドを呼び出すと、認証状態を初期化することができます。</p><p>このメソッドは、Auth0からのリダイレクトでのみ使用することができます。正常に機能していることを確認するには、URL内の<code>code</code>と<code>state</code>パラメーターを確認します。</p><p>このイベントが発生した際に、<code>Browser.close()</code>メソッドがブラウザーを閉じるようにします。</p><p><div class="alert-container" severity="default"><p>以下の説明では、カスタムURLスキームを使用して、アプリケーション内でコールバックを処理することを前提にしています。このためには、<code>YOUR_PACKAGE_ID</code>を選択したプラットフォームのURLスキームで置き換えて登録します。詳細については、iOSには「<a href="https://developer.apple.com/documentation/xcode/defining-a-custom-url-scheme-for-your-app" target="_blank" rel="noreferrer noopener">カスタムURLスキームを定義する</a>」、Androidには「<a href="https://developer.android.com/training/app-links/deep-linking" target="_blank" rel="noreferrer noopener">アプリコンテンツ用のディープリンクを作成する</a>」をお読みください。</p></div></p><p><div class="checkpoint">ionic手順6「チェックポイント」 <div class="checkpoint-default"><p>アプリケーションの<code>App</code>コンポーネントセットアップに<code>appUrlOpen</code>を追加して、ログインします。ユーザーが認証して、アプリにログインすると、ブラウザーのウィンドウが閉じます。</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>すみません。いくつかの点をもう一度確認してください。</p><ul><li><p>選択したプラットフォームにカスタムURLスキームが登録されていることを確認します。iOSでは<a href="https://developer.apple.com/documentation/xcode/defining-a-custom-url-scheme-for-your-app" target="_blank" rel="noreferrer noopener">カスタムURLスキームを定義</a>し、Androidでは<a href="https://developer.android.com/training/app-links/deep-linking" target="_blank" rel="noreferrer noopener">所定のカスタムスキームを指定したインテントフィルター</a>を追加します</p></li><li><p>イベントが起きたのにエラーを受け取った場合は、<a href="https://manage.auth0.com/#/logs" target="_blank" rel="noreferrer noopener">Auth0 Dashboardのログ</a>でエラーの理由を確認します</p></li></ul><p></p></div>

  </div></p>

## アプリケーションにログアウトを追加する {{{ data-action="code" data-code="LogoutButton.vue" }}}


<p>ユーザーがログインできるようになりました。今度は、<a href="https://auth0.com/docs/logout/guides/logout-auth0" target="_blank" >ログアウトする方法</a>を構成する必要があります。ユーザーをAuth0のログアウトエンドポイントにリダイレクトし、ブラウザー内のセッションをクリアする必要があります。他の場合と同様に、ユーザーがアプリから離れることでユーザーエクスペリエンスが損なわれないように、CapacitorのBrowserプラグインがリダイレクトを処理するようにします。</p><p>Auth0 SDKを使用してIonicとCapacitorで実現するには、以下を行います。</p><ul><li><p>アプリについて、ログアウト後にAuth0のリダイレクト先となるURLを構築します。これは、登録済みのカスタムスキームとAuth0ドメインを使ったURLです。これを、Auth0 Dashboardの<b>［Allowed Logout URLs（許可されているログアウトURL）］</b>の構成に追加します。</p></li><li><p><code>logout</code>を呼び出し、<code>logoutParams.returnTo</code>パラメーターにリダイレクト先のURLを渡して、SDKからログアウトします。</p></li><li><p>CapacitorのBrowserプラグインを使用して<code>Browser.open</code>でURLを開くコールバックに、<code>openUrl</code>パラメーターを設定します。</p></li></ul><p><div class="alert-container" severity="default"><p>ログインの手順と同様に、<code>logout</code>を呼び出す際に<code>openUrl</code>を設定しないと、SDKがユーザーをログアウトURLにリダイレクトするのに、デバイスのデフォルトのブラウザーアプリケーションが使用されるため、ユーザーエクスペリエンスとしては最適ではありません。</p></div></p><p><div class="checkpoint">ionic手順7「チェックポイント」 <div class="checkpoint-default"><p>ユーザーがアプリケーションからログアウトする方法を提供します。Auth0にリダイレクトしてから、<code>returnTo</code>パラメーターで指定したアドレスへ移動することを確認します。アプリケーションにログインしていないことを確認します。</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>すみません。いくつかの点をもう一度確認してください。</p><ul><li><p><code>returnTo</code>パラメーターに指定したURLがAuth0 Dashboardで［Allowed Callback URLs（許可されているCallback URL）］に登録済みであることを確認します</p></li></ul><p></p></div>

  </div></p><p></p>

## ユーザープロファイルを表示する {{{ data-action="code" data-code="UserProfile.vue" }}}


<p>Auth0 Vue SDKは必要な任意のコンポーネントについて、名前やプロフィール写真など、ログイン済みのユーザーに関連付けられた<a href="https://auth0.com/docs/users/concepts/overview-user-profile" target="_blank" >ユーザープロファイル</a>を取得し、ユーザーインターフェイスをパーソナライズします。プロファイル情報は、<code>useAuth0()</code>コンポーザブルが公開する<code>user</code>プロパティを介して使用することができます。</p><p>SDKの初期化は非同期に行われます。<code>isLoading</code>と<code>user</code>プロパティを確認して、ユーザープロファイルを保護する必要があります。<code>isLoading</code>が<code>false</code>になり、<code>user</code>が値を持つと、ユーザープロファイルを利用することができます。</p><p><div class="checkpoint">ionic手順8「チェックポイント」 <div class="checkpoint-default"><p>ユーザーがアプリ内でユーザープロファイルの詳細を表示できる手段を提供し、ログインした後に自分のプロファイル情報を取得して画面に表示できることを確認します。</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"></div>

  </div></p>
