---
title: iOSまたはmacOSアプリケーションにログインを追加する
description: このガイドは、iOSやmacOSアプリにAuth0.swift SDKを使ってAuth0を統合する方法を説明します。
interactive:  true
files:
 - files/Auth0
 - files/MainView
 - files/ProfileView
 - files/User
github:
  path: Sample-01
locale: ja-JP
---

# iOSまたはmacOSアプリケーションにログインを追加する


<p>このガイドは、<a href="https://github.com/auth0/Auth0.swift" target="_blank" rel="noreferrer noopener">Auth0.swift</a> SDKを使って、iOSやmacOSアプリで認証の追加とユーザプロファイル情報へのにアクセスを行う方法について説明します。</p><p>このクイックスタートを使用するには、以下の手順に従います：</p><ul><li><p>Auth0の無料アカウントにサインアップするか、Auth0にログインします。</p></li><li><p>統合したいiOSまたはmacOSのアプリを準備します。または、ログインした後に、サンプルアプリを表示してダウンロードすることもできます。</p></li></ul><p></p><p></p>

## Auth0を構成する


<p>Auth0のサービスを利用するには、Auth0 Dashboadに設定済みのアプリケーションが必要です。Auth0アプリケーションは、開発中のアプリに対してどのように認証が動作して欲しいかを構成する場所です。</p><h3>Auth0アプリケーションを構成する</h3><p>対話型のセレクターを使ってAuth0アプリケーションを新規作成するか、既存の<b>ネイティブ</b>のAuth0アプリケーションを選択します。Auth0のすべてのアプリケーションには英数字からなる一意のクライアントIDが割り当てられており、アプリがSDKを通じてAuth0 APIを呼び出す際に使用されます。</p><p>このクイックスタートを使って構成されたすべての設定は、<a href="https://manage.auth0.com/#/" target="_blank" rel="noreferrer noopener">Dashboard</a>のAuth0アプリケーションを自動更新します。今後、アプリケーションの管理もDashboardで行えます。</p><p>完了済みの構成を見てみたい場合は、サンプルアプリをご覧ください。</p><h3>Callback URLとログアウトURLを構成する</h3><p>Auth0はリダイレクトでユーザーをアプリに戻すため、Callback URLとログアウトURLを呼び出します。Auth0は、ユーザーを認証した後にCallback URLを呼び出し、セッションのクッキーを削除した後にログアウトURLを呼び出します。Callback URLとログインURLを設定しないと、ユーザーはアプリにログインやログアウトが行えなくなり、アプリにエラーが発生します。</p><p><div class="alert-container" severity="default"><p>iOS 17.4以降とmacOS 14.4以降では、ユニバーサルリンクをCallback URLおよびログアウトURLとして使用できます。有効になっている場合、古いバージョンのiOS/macOSでは、Auth0.swiftはフォールバックとしてカスタムURLスキームを使用します。</p><p><b>この機能にはXcode 15.3以降と有料のApple Developerアカウントが必要です。</b></p></div></p><p>アプリのプラットフォームに応じて、以下の<b>Callback URL</b>と<b>ログアウトURL</b>を追加してください。<a data-contentfulid="UYjAbgxX33g81azZ6VHWc-ja-JP">カスタムドメイン</a>がある場合は、Auth0テナントのドメインに代わってそちらを使用します。</p><h4>iOS</h4><p><pre><code>https://${account.namespace}/ios/YOUR_BUNDLE_IDENTIFIER/callback,

YOUR_BUNDLE_IDENTIFIER://${account.namespace}/ios/YOUR_BUNDLE_IDENTIFIER/callback

</code></pre>

</p><h4>macOS</h4><p><pre><code>https://${account.namespace}/macos/YOUR_BUNDLE_IDENTIFIER/callback,

YOUR_BUNDLE_IDENTIFIER://${account.namespace}/macos/YOUR_BUNDLE_IDENTIFIER/callback

</code></pre>

</p><p>たとえば、iOSのバンドル識別子が<code>com.example.MyApp</code>でAuth0ドメインが<code>example.us.auth0.com</code>の場合には、次の値になります：</p><p><pre><code>https://example.us.auth0.com/ios/com.example.MyApp/callback,

com.example.MyApp://example.us.auth0.com/ios/com.example.MyApp/callback

</code></pre>

</p><h3>関連ドメインを構成する</h3><p><div class="alert-container" severity="warning"><p>この手順では有料のApple Developerアカウントが必要になります。Callback URLおよびログアウトURLとしてユニバーサルリンクを使用する必要があります。代わりにカスタムURLスキームを使用する場合はこの手順をスキップしてください。</p></div></p><h4>チームIDとバンドル識別子を構成する</h4><p>Auth0アプリケーションの<a href="https://manage.auth0.com/dashboard/us/#/applications/" target="_blank" rel="noreferrer noopener">設定ページ</a>に移動して最後までスクロールし、 <b>［Advanced Settings（詳細設定）］&gt;［Device Settings（デバイス設定）］</b>を開きます。<b>［iOS］</b>セクションで<b>［Team ID（チームID）］</b>に<a href="https://developer.apple.com/help/account/manage-your-team/locate-your-team-id/" target="_blank" rel="noreferrer noopener">Apple Team ID</a>を、<b>［App ID（アプリID）］</b>にアプリのバンドルIDを設定します。</p><img src="//images.ctfassets.net/cdy7uua7fh8z/62v9bB3bUVMw9XLND5lcMI/1b20d248b400f75e1bf1174a7d0d0ba0/IOS_Settings_-_Japanese.png" alt="Auth0 Dashboard> ［Applications（アプリケーション）］ > ［Applications（アプリケーション）］ > ［Native App（ネイティブアプリ）］ > ［Settings（設定）］タブ > ［Advanced Settings（詳細設定）］ > ［Device Settings（デバイス設定）］タブ" /><p>これで、アプリがAuth0テナントの<code>apple-app-site-association</code>ファイルに追加されます。</p><h4>関連ドメインの機能を追加する</h4><p>Xcodeで、アプリのターゲット設定の<b>［Signing &amp; Capabilities（署名と機能）］</b><a href="https://developer.apple.com/documentation/xcode/adding-capabilities-to-your-app#Add-a-capability" target="_blank" rel="noreferrer noopener">タブ</a>に移動し、<b>［+ Capability（＋機能）］</b>ボタンを押します。それから<b>［Associated Domains（関連ドメイン）］</b>を選択します。</p><img src="//images.ctfassets.net/cdy7uua7fh8z/72eVE104zKB5Q4NPnx6MCa/66c81ee64f104583bd00b9916778f989/ios-xcode-capabilities.png" alt="［Xcode］> ［Signing & Capabilities（署名と機能）］タブ > ［Add New（新規追加）］ > ［Associated Domains（関連ドメイン）］" /><p>次に、以下の <a href="https://developer.apple.com/documentation/xcode/configuring-an-associated-domain#Define-a-service-and-its-associated-domain" target="_blank" rel="noreferrer noopener">エントリー</a>を<b>［Associated Domains（関連ドメイン）］</b>の下に追加します：</p><p><pre><code>webcredentials:labs-fundtraining.us.auth0.com

</code></pre>

</p><p><a data-contentfulid="UYjAbgxX33g81azZ6VHWc-ja-JP">カスタムドメイン</a>がある場合は、Auth0テナントのドメインではなくそちらを使用してください。</p><p><div class="alert-container" severity="default"><p>関連ドメインが動作するためには、<b>iOSシミュレーター用に構築されている場合でも</b>、アプリが自分のチーム証明書で署名されている必要があります。Apple Teamには必ず、Auth0アプリケーションの設定ページで構成されたチームIDのものを使用してください。</p></div></p>

## SDKをインストールする


<h3>Swift Package Managerを使用する</h3><p>Xcodeで以下のメニュー項目を開きます：</p><p><b>［File（ファイル）］ &gt; ［Add Package Dependencies...（パッケージの依存関係を追加する...）］</b></p><p><b>［Search or Enter Package URL（パッケージURLを検索または入力）］</b>検索ボックスに次のURLを入力します：</p><p><pre><code>https://github.com/auth0/Auth0.swift

</code></pre>

</p><p>それから依存ルールを選択して<b>［Add Package（パッケージを追加）］</b>を押します。</p><p><div class="alert-container" severity="default"><p>SPMの詳細については、<a href="https://developer.apple.com/documentation/xcode/adding-package-dependencies-to-your-app" target="_blank" rel="noreferrer noopener">公式ドキュメント</a>を確認してください。</p></div></p><h3>CocoaPodsを使用する</h3><p>以下のラインを<code>Podfile</code>に追加します：</p><p><pre><code class="language-ruby">pod 'Auth0', '~&gt; 2.0'

</code></pre>

</p><p>それから<code>pod install</code>を実行します。</p><p><div class="alert-container" severity="default"><p>CocoaPodsの詳細は、<a href="https://guides.cocoapods.org/using/getting-started.html" target="_blank" rel="noreferrer noopener">公式ドキュメント</a>を確認してください。</p></div></p><h3>Carthageを使用する</h3><p>以下のラインを<code>Cartfile</code>に追加します：</p><p><pre><code class="language-swift">github &quot;auth0/Auth0.swift&quot; ~&gt; 2.0

</code></pre>

</p><p>それから<code>carthage bootstrap --use-xcframeworks</code>を実行します。</p><p><div class="alert-container" severity="default"><p>Carthageの詳細については、<a href="https://github.com/Carthage/Carthage#getting-started" target="_blank" rel="noreferrer noopener">公式ドキュメント</a>を確認してください。</p><p></p></div></p>

## SDKを構成する {{{ data-action="code" data-code="Auth0.plist" }}}


<p>Auth0.swiftのSDKにはAuth0<b>domain</b>と<b>Client ID</b>が必要です。これらの値はAuth0アプリケーションの<a href="https://manage.auth0.com/dashboard/us/#/applications/" target="_blank" rel="noreferrer noopener">設定ページ</a>で確認できます</p><ul><li><p><b>domain</b>：Auth0テナントのドメインです。<a data-contentfulid="UYjAbgxX33g81azZ6VHWc-ja-JP">カスタムドメイン</a>がある場合は、Auth0テナントのドメインではなくそちらを使用してください。</p></li><li><p><b>クライアントID</b>：このクイックスタートで前にセットアップした、Auth0アプリケーションの英数字からなる一意のIDです。</p></li></ul><p>Auth0ドメインとクライアントIDの値を含むアプリバンドルに<code>Auth0.plist</code>という名前の<code>plist</code>ファイルを作成します。</p><p><div class="alert-container" severity="default"><p>SDKはプログラムコードによって構成することも可能です。詳細は<a href="https://github.com/auth0/Auth0.swift#configure-client-id-and-domain-programmatically" target="_blank" rel="noreferrer noopener">README</a>をご覧ください。</p></div></p><p><div class="checkpoint">iOS Swiftクイックスタート - 手順3「チェックポイント」 <div class="checkpoint-default"><p>Auth0.swift SDKの構成を完了しました。アプリを実行して、SDKに関連したエラーを出していないことを確認します。</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>アプリでSDK関連のエラーが発生する場合には以下を行います。</p><ul><li><p>正しいAuth0アプリケーションが選択されていることを確認します</p></li><li><p>URLを更新した後で保存したことを確認します</p></li><li><p>Auth0のドメインとクライアントIDが正しく設定されていることを確認します</p></li></ul><p>まだお困りですか？当社提供の<a href="https://github.com/auth0/Auth0.swift#documentation" target="_blank" rel="noreferrer noopener">ドキュメント</a>または<a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">コミュニティページ</a>で詳しい情報を確認してください。</p></div>

  </div></p><p></p>

## アプリケーションにログインを追加する {{{ data-action="code" data-code="MainView.swift#20:31" }}}


<p>ログインページを提示したいファイルに<code>Auth0</code>モジュールをインポートします。それから<b>ログイン</b>ボタンのアクションで<a data-contentfulid="67MpEy8zCywwI8YMkn5jy1-ja-JP">ユニバーサルログイン</a>ページを提示します。</p><p><div class="alert-container" severity="default"><p>コールバックに基づいたAPIの代わりにasync/awaitまたはCombineを使用できます。詳細は<a href="https://github.com/auth0/Auth0.swift#web-auth-login-ios--macos" target="_blank" rel="noreferrer noopener">README</a>をご覧ください。</p></div></p><img src="//images.ctfassets.net/cdy7uua7fh8z/3ZRDXpjlUXEcQpXq6Q00L1/4b6b596983b5f7d257975a5efcc1cafa/login-ios_japanese.png" alt="iOSアプリのユニバーサルログイン画面の例" /><p><div class="checkpoint">iOS Swiftクイックスタート - 手順4「チェックポイント」 <div class="checkpoint-default"><p><b>ログイン</b>ボタンを押して次の点を確認します：</p><ul><li><p><a href="https://github.com/auth0/Auth0.swift#sso-alert-box-ios--macos" target="_blank" rel="noreferrer noopener">アラートボックス</a>が表示され、同意を求める。</p></li><li><p><b>［Continue（続行）］</b>を選択するとSafariモーダルでユニバーサルログインページが開く。</p></li><li><p>ユーザー名とパスワード、またはソーシャルプロバイダーを使って、ログインまたはサインアップできる。</p></li><li><p>その後、Safariモーダルが自動的に閉じる。</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>ログインが失敗するか、エラーが起きる場合には以下を行います。</p><ul><li><p>正しいCallback URLが入力されていることを確認します</p></li><li><p>Auth0のドメインとクライアントIDが正しく設定されていることを確認します</p></li></ul><p>まだお困りですか？当社提供の<a href="https://github.com/auth0/Auth0.swift#documentation" target="_blank" rel="noreferrer noopener">ドキュメント</a>または<a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">コミュニティページ</a>で詳しい情報を確認してください。</p></div>

  </div></p><p></p>

## アプリケーションにログアウトを追加する {{{ data-action="code" data-code="MainView.swift#34:45" }}}


<p>アプリにログインできるようになったら、<a href="https://auth0.com/docs/authenticate/login/logout" target="_blank" >ログアウト</a>する方法が必要です。<b>ログアウト</b>ボタンのアクションで<code>clearSession()</code>メソッドを呼び出し、ユニバーサルログインセッションのクッキーを消去します。</p><p><div class="checkpoint">iOS Swiftクイックスタート - 手順5「チェックポイント」 <div class="checkpoint-default"><p><b>ログアウト</b>ボタンを押して次の点を確認します：</p><ul><li><p>アラートボックスが表示され、同意を求める。</p></li><li><p><b>［Continue（続行）］</b>を選択するとSafariモーダルでページが開く。</p></li><li><p>その直後にSafariモーダルが自動的に閉じる。</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>ログアウトが失敗するか、エラーが起きる場合には以下を行います。</p><ul><li><p>正しいCallback URLが入力されていることを確認します</p></li><li><p>Auth0のドメインとクライアントIDが正しく設定されていることを確認します</p></li></ul><p>まだお困りですか？当社提供の<a href="https://github.com/auth0/Auth0.swift#documentation" target="_blank" rel="noreferrer noopener">ドキュメント</a>または<a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">コミュニティページ</a>で詳しい情報を確認してください。</p></div>

  </div></p>

## ユーザープロファイル情報にアクセスする {{{ data-action="code" data-code="User.swift#11:14" }}}


<p>ログイン後に得る<code>Credentials</code>インスタンスには<a data-contentfulid="7eGepxAjz89d1F7i1aP4ch-ja-JP">IDトークン</a>が含まれます。IDトークンは、ログインしたユーザーに関連するプロファイル情報（メールアドレスやプロフィール写真など）を含みます。これらの詳細情報はアプリのユーザーインターフェイスをパーソナライズするために使用できます。</p><p>Auth0.swiftのSDKには、IDトークンのような<a href="https://jwt.io/" target="_blank" rel="noreferrer noopener">JWT</a>をデコードするための<a href="https://github.com/auth0/JWTDecode.swift" target="_blank" rel="noreferrer noopener">ユーティリティ</a>が含まれています。ユーザープロファイル情報にアクセスしたいファイルへ<code>JWTDecode</code>モジュールをインポートすることで開始します。それから、<code>decode(jwt:)</code>メソッドを使ってIDトークンをデコードし、そこに含まれるクレームにアクセスします。</p><p><div class="alert-container" severity="default"><p>最新のユーザー情報は<code>userInfo(withAccessToken:)</code>メソッドで取得できます。詳細は<a href="https://github.com/auth0/Auth0.swift/blob/master/EXAMPLES.md#retrieve-user-information" target="_blank" rel="noreferrer noopener">EXAMPLES</a>をご覧ください。</p></div></p><p><div class="checkpoint">iOS Swiftクイックスタート - 手順6「チェックポイント」 <div class="checkpoint-default"><p>ログイン後に<code>email</code>、<code>picture</code>、その他すべての<a data-contentfulid="2dKoj5wVle1Wz3mWrrQ2Dr-en-US">クレーム</a>にアクセスできることを確認します。</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>ユーザー情報にアクセスできない場合は以下を行います。</p><ul><li><p><code>decode(jwt:)</code>メソッドを呼び出す<code>JWTDecode</code>モジュールがインポートされていることを確認します</p></li><li><p>クレームの綴りが間違っていないことを確認します</p></li></ul><p>まだお困りですか？当社提供の<a href="https://github.com/auth0/Auth0.swift#documentation" target="_blank" rel="noreferrer noopener">ドキュメント</a>または<a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">コミュニティフォーラム</a>で詳しい情報を確認してください。</p></div>

  </div></p>
