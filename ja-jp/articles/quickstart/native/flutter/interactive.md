---
title: Flutterアプリケーションにログインを追加する
description: このガイドでは、FlutterアプリにAuth0 Flutter SDKを使ってAuth0を統合する方法を説明します。
interactive:  true
files:
 - files/app/build
 - files/main_view
 - files/profile_view
github:
  path: sample
locale: ja-JP
---

# Flutterアプリケーションにログインを追加する


<p>Auth0を使用すると、アプリケーションに手軽に認証を追加して、ユーザープロファイル情報にアクセスできます。このガイドでは、Flutterアプリに<a href="https://github.com/auth0/auth0-flutter" target="_blank" rel="noreferrer noopener">Auth0 Flutter SDK</a>を使ってAuth0を統合する方法を説明します。</p><p><div class="alert-container" severity="default"><p>Flutter SDKは現在、Android、iOS、macOS版のFlutterアプリのみに対応しています。</p></div></p><p>このクイックスタートでは、すでに<a href="https://flutter.dev/" target="_blank" rel="noreferrer noopener">Flutter</a>アプリが問題なく作動しているものとします。そうでない場合は、<a href="https://docs.flutter.dev/get-started/install" target="_blank" rel="noreferrer noopener">Flutter「入門」ガイド</a>をチェックして、シンプルなアプリの始め方をご確認ください。</p><p><a href="https://docs.flutter.dev/reference/flutter-cli" target="_blank" rel="noreferrer noopener">Flutterコマンドラインツール</a>の知識も必要になります。</p><p></p>

## Auth0を構成する


<p>Auth0のサービスを利用するには、Auth0 Dashboadに設定済みのアプリケーションがある必要があります。Auth0アプリケーションは、プロジェクトに対してどのように認証が動作して欲しいかを構成する場所です。</p><h3>Auth0アプリケーションを構成する</h3><p>対話型のセレクターを使ってAuth0アプリケーションを新規作成するか、既存の<b>ネイティブ</b>のAuth0アプリケーションを選択します。Auth0のすべてのアプリケーションには英数字からなる一意のクライアントIDが割り当てられており、アプリケーションのコードがSDKを通じてAuth0 APIを呼び出す際に使用されます。</p><p>このクイックスタートを使って構成されたすべての設定は、<a href="https://manage.auth0.com/dashboard/us/auth0-dsepaid/" target="_blank" rel="noreferrer noopener">Dashboard</a>のアプリケーションを自動更新します。今後、アプリケーションの管理もDashboardで行えます。</p><p>完了済みの構成を見てみたい場合は、サンプルアプリをご覧ください。</p><h3>Callback URLとログアウトURLを構成する</h3><p>Callback URLとログアウトURLは、ユーザーをアプリにリダイレクトで戻すために、Auth0が呼び出すURLです。 Auth0は、ユーザーを認証した後にCallback URLを呼び出し、セッションのクッキーを削除した後にログアウトURLを呼び出します。Callback URLとログアウトURLを設定しないと、ユーザーはアプリにログインやログアウトが行えなくなり、エラーが発生します。</p><p>プラットフォームに合わせて、Callback URLとログアウトURLに以下の値を設定します。</p><p><div class="alert-container" severity="default"><p>Androidでは、<code>SCHEME</code>プレースホルダーの値は<code>https</code>や他のカスタムスキームでも構いません。<code>https</code>スキームでは、<a href="https://auth0.com/docs/get-started/applications/enable-android-app-links-support" target="_blank" >Androidアプリリンク</a>を有効にする必要があります。</p><p>iOS 17.4以降とmacOS 14.4以降では、ユニバーサルリンク（<code>https</code>スキーム）をCallback URLとログアウトURLに使うことができます。有効にすると、SDKは、iOS/macOSの古いバージョンではカスタムURLスキームにフォールバックして、アプリの<a href="https://developer.apple.com/documentation/appstoreconnectapi/bundle_ids" target="_blank" rel="noreferrer noopener">バンドル識別子</a>を使用します。<b>この機能にはXcode 15.3以降と有料のApple Developerアカウントが必要です</b>。</p></div></p><h4>Android</h4><p><code>SCHEME://{yourDomain}/android/YOUR_PACKAGE_NAME/callback</code></p><h4>iOS</h4><p><code>https://{yourDomain}/ios/YOUR_BUNDLE_IDENTIFIER/callback,

YOUR_BUNDLE_IDENTIFIER://{yourDomain}/ios/YOUR_BUNDLE_IDENTIFIER/callback</code></p><h4>macOS</h4><p><code>https://{yourDomain}/macos/YOUR_BUNDLE_IDENTIFIER/callback,

YOUR_BUNDLE_IDENTIFIER://{yourDomain}/macos/YOUR_BUNDLE_IDENTIFIER/callback</code></p><p>たとえば、iOSのバンドル識別子が<code>com.example.MyApp</code>でAuth0ドメインが<code>example.us.auth0.com</code>の場合には、次の値になります：</p><p><code>https://example.us.auth0.com/ios/com.example.MyApp/callback,

com.example.MyApp://example.us.auth0.com/ios/com.example.MyApp/callback</code></p>

## Auth0 Flutter SDKをインストールする


<p>Auth0 Flutter SDKをプロジェクトに追加します：</p><p><code>flutter pub add auth0_flutter</code></p>

## Androidを構成する


<p>Androidプラットフォームが開発対象でない場合には、この手順をスキップしてください。</p><p>SDKにはマニフェストのプレースホルダーが必要です。Auth0は内部でプレースホルダーを使用して、認証のCallback URLを捉える<code>intent-filter</code>を定義します。Auth0テナントのドメインとCallback URLスキームを設定する必要があります。</p><p><a href="https://github.com/auth0-samples/auth0-flutter-samples/tree/main/sample/android" target="_blank" rel="noreferrer noopener">サンプル</a>では、次のプレースホルダーを使用します：</p><ul><li><p><code>auth0Domain</code>：Auth0テナントのドメインです。通常、Auth0 Dashboardにある<b>アプリケーションの設定</b>の<b>［Domain（ドメイン）］</b>フィールドで確認できます。カスタムドメインを使用している場合には、この値をカスタムドメインの値に設定してください。</p></li><li><p><code>auth0Scheme</code>：使用するスキームです。カスタムスキーム、または、<a href="https://auth0.com/docs/applications/enable-android-app-links" target="_blank" >Androidアプリリンク</a>を利用したい場合はhttpsになります。この値の設定に関する詳細情報は、<a href="https://github.com/auth0/Auth0.Android#a-note-about-app-deep-linking" target="_blank" rel="noreferrer noopener">Auth0.Android SDK README</a>をお読みください。</p></li></ul><p><div class="alert-container" severity="default"><p>アクティビティーに特別な<code>intent-filter</code>を宣言する必要はありません。これは、マニフェストのプレースホルダーをAuth0<b>ドメイン</b>と<b>スキーム</b>の値で定義したからです。リダイレクトはライブラリーによって処理されます。</p></div></p><p>Android Studio内で<b>Sync Project with Gradle Files</b>を実行し、変更内容を適用します。</p>

## iOS/macOSを構成する


<p>iOSまたはmacOSプラットフォームが開発対象でない場合には、この手順をスキップしてください。</p><p><div class="alert-container" severity="warning"><p>この手順では、有料のApple Developerアカウントが必要です。Callback URLおよびログアウトURLとしてユニバーサルリンクを使用する必要があります。代わりにカスタムのURLスキームを使用する場合はこの手順をスキップしてください。</p></div></p><h3>チームIDとバンドル識別子を構成する</h3><p>Auth0アプリケーションの<a href="https://manage.auth0.com/#/applications/%7ByourClientId%7D/settings" target="_blank" rel="noreferrer noopener">設定ページ</a>に移動して最後までスクロールし、 <b>［Advanced Settings（詳細設定）］&gt;［Device Settings（デバイス設定）］</b>を開きます。<b>［iOS］</b>セクションで<b>［Team ID（チームID）］</b>に<a href="https://developer.apple.com/help/account/manage-your-team/locate-your-team-id/" target="_blank" rel="noreferrer noopener">Apple Team ID</a>を、<b>［App ID（アプリID）］</b>にアプリのバンドル識別子を設定します。</p><img src="//images.ctfassets.net/cdy7uua7fh8z/7wetuICumueyqt6dbB32ro/34a7981c2cee8a14cdcd01e75df1e50c/IOS_Settings_-_Japanese.png" alt="null" /><p>これで、アプリがAuth0テナントの<code>apple-app-site-association</code>ファイルに追加されます。</p><h3>関連ドメインの機能を追加する</h3><p><code>open ios/Runner.xcworkspace</code>（macOSの場合には<code>open macos/Runner.xcworkspace</code>）を実行し、Xcodeでアプリを開きます。<b>Runner</b>ターゲット設定の<b>［Signing &amp; Capabilities（署名と機能）］</b><a href="https://developer.apple.com/documentation/xcode/adding-capabilities-to-your-app#Add-a-capability" target="_blank" rel="noreferrer noopener">タブ</a>に移動し、<b>［+ Capability（＋機能）］</b>ボタンを押します。それから<b>［Associated Domains（関連ドメイン）］</b>を選択します。</p><img src="//images.ctfassets.net/cdy7uua7fh8z/3GO76kXynaieKs5CSj3UTp/1cc577b56d00bc3bad877e31b848c1ec/ios-xcode-capabilities.png" alt="null" /><p>次に、以下の<a href="https://developer.apple.com/documentation/xcode/configuring-an-associated-domain#Define-a-service-and-its-associated-domain" target="_blank" rel="noreferrer noopener">エントリー</a>を<b>［Associated Domains（関連ドメイン）］</b>の下に追加します。</p><p><code>webcredentials:{yourDomain}</code></p><p><a data-contentfulid="UYjAbgxX33g81azZ6VHWc-ja-JP">カスタムドメイン</a>がある場合は、Auth0ドメインの代わりに、設定ページにあるカスタムドメインを使用してください。</p><p><div class="alert-container" severity="default"><p>関連ドメインが動作するためには、<b>iOSシミュレーター用に構築されている場合でも</b>、アプリが自分のチーム証明書で署名されている必要があります。Apple Teamには必ず、Auth0アプリケーションの設定ページで構成されたチームIDのものを使用してください。</p></div></p>

## アプリケーションにログインを追加する {{{ data-action="code" data-code="main_view.dart#29:40" }}}


<p>アプリに認証をセットアップするには、<a data-contentfulid="67MpEy8zCywwI8YMkn5jy1-ja-JP">ユニバーサルログイン</a>が最も手軽な方法です。最良のエクスペリエンス、高い安全性、幅広い機能を活用するためにも、ユニバーサルログインの使用をお勧めします。</p><p><code>Auth0</code>クラスを使用して、Auth0のユニバーサルログインをFlutterアプリに統合します。<code>webAuthentication().login()</code>を使用して、ユーザーをAuth0のユニバーサルログインページにリダイレクトします。これは<code>Future</code>であるため、ユーザートークンの取得を待ち合わせる必要があります。</p><p><b>Android</b>：カスタムスキームを使用している場合には、このスキームをログインメソッドに渡して、SDKが適切にログインページへ誘導してから戻せるようにします：</p><p><code>await auth0.webAuthentication(scheme: &#39;YOUR CUSTOM SCHEME&#39;).login();</code></p><p>ユーザーがログインすると、アプリへリダイレクトされます。その後、このユーザーのIDとアクセストークンにアクセスできるようになります。</p><p><div class="checkpoint">Flutter - 手順5 - アプリケーションにログインを追加する <div class="checkpoint-default"><p><code>webAuthentication().login()</code>を呼び出してアプリにユーザーをログインするボタンをアプリに追加します。認証のためにAuth0へリダイレクトされてから、アプリケーションに戻されることを確認します。</p><p><code>login</code>を呼び出した結果、トークンにアクセスできることを確認します</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>アプリが正常に起動しなかった場合は以下を行います。</p><ul><li><p>設定した［Allowed Callback URLs（許可されているCallback URL）］が正しいことを確認します</p></li><li><p>URLを入力した後で保存したことを確認します</p></li><li><p>ドメインとクライアントIDの値が正常にインポートされていることを確認します</p></li><li><p>Androidを使用している場合は、アプリに正しくリダイレクトで戻されるように、マニフェストのプレースホルダーが正しくセットアップされていることを確認します</p></li></ul><p>まだお困りですか？当社提供の<a href="https://auth0.com/docs" target="_blank" >ドキュメント</a>または<a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">コミュニティページ</a>で詳しい情報を確認してください。</p></div>

  </div></p>

## アプリケーションにログアウトを追加する {{{ data-action="code" data-code="main_view.dart#45:55" }}}


<p>ユーザーをログアウトさせるには、Auth0 Flutter SDKの<code>webAuthentication().logout()</code>を呼び出してログインセッションをクリアし、ユーザーをAuth0のログアウトエンドポイントにリダイレクトします。<a data-contentfulid="5sl85ipAFaf8i4CH9wD6VA-ja-JP">Auth0からのログアウトについて詳しい情報をお読みください</a>。</p><p><b>Android</b>：カスタムスキームを使用している場合には、このスキームをログアウトメソッドに渡して、SDKがアプリを適切に戻せるようにします：</p><p><code>await auth0.webAuthentication(scheme: &#39;YOUR CUSTOM SCHEME&#39;).logout();</code></p><p><div class="checkpoint">Flutter - 手順6 - アプリケーションにログアウトを追加する <div class="checkpoint-default"><p>アプリに<code>webAuthentication().logout()</code>を呼び出して、ユーザーをアプリからログアウトさせるボタンを追加します。ボタンを選択し、Flutterアプリからログアウトエンドポイントにリダイレクトされ、再び戻されることを確認してください。アプリケーションにはログインされていないはずです。</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>アプリが正常にログアウトしなかった場合は以下を行います。</p><ul><li><p>［Allowed Logout URLs（許可されているログアウトURL）］が正しく設定されていることを確認します</p></li><li><p>URLを入力した後で保存したことを確認します</p></li></ul><p>まだお困りですか？当社提供の<a href="https://auth0.com/docs" target="_blank" >ドキュメント</a>または<a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">コミュニティページ</a>で詳しい情報を確認してください。</p></div>

  </div></p>

## ユーザープロファイル情報を表示する {{{ data-action="code" data-code="profile_view.dart" }}}


<p><code>webAuthentication().login()</code>を呼び出すと、ユーザープロファイルが自動的にユーザープロファイルプロパティを取得します。ログイン手順から返されたオブジェクトには、すべてのユーザープロファイルプロパティのある<code>user</code>プロパティが含まれ、これらはIDトークンをデコードすることで入力されます。</p><p><div class="checkpoint">Flutter - 手順7 - ユーザープロファイル情報を表示する <div class="checkpoint-default"><p>ログインして、結果の<code>user</code>プロパティを調査します。<code>email</code>や<code>name</code>など、現在のユーザーのプロファイル情報を確認します。</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>アプリがユーザープロファイル情報を返さなかった場合には以下を行います。</p><ul><li><p>アクセストークンが有効であることを確認します</p></li></ul><p>まだお困りですか？当社提供の<a href="https://auth0.com/docs" target="_blank" >ドキュメント</a>または<a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">コミュニティページ</a>で詳しい情報を確認してください。</p></div>

  </div></p>
