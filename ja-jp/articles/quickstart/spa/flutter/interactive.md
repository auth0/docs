---
title: Flutterアプリケーションにログインを追加する
description: このガイドでは、FlutterアプリケーションにAuth0 Flutter SDKを使ってAuth0を統合する方法を説明します。
interactive:  true
files:
 - files/main_view
 - files/profile_view
github:
  path: sample
locale: ja-JP
---

# Flutterアプリケーションにログインを追加する


<p>Auth0を使用すると、アプリケーションに手軽に認証を追加して、ユーザープロファイル情報にアクセスすることができます。このガイドでは、Flutterアプリケーションに<a href="https://github.com/auth0/auth0-flutter" target="_blank" rel="noreferrer noopener">Auth0 Flutter SDK</a>を使ってAuth0を統合する方法を説明します。</p><p><div class="alert-container" severity="default"><p>Flutter SDKは現在、Android、iOS、またはWebプラットフォームで実行されるFlutterアプリケーションのみに対応しています。</p></div></p><p>このクイックスタートでは、すでに<a href="https://flutter.dev/" target="_blank" rel="noreferrer noopener">Flutter</a>アプリケーションが問題なく作動しているものとします。そうでない場合は、<a href="https://docs.flutter.dev/get-started/install" target="_blank" rel="noreferrer noopener">Flutter「入門」ガイド</a>をチェックして、シンプルなアプリの始め方を確認してください。</p><p><a href="https://docs.flutter.dev/reference/flutter-cli" target="_blank" rel="noreferrer noopener">Flutterコマンドラインツール</a>の知識も必要になります。</p><p></p>

## Auth0を構成する


<p>Auth0にサインアップすると、新しいアプリケーションが作成されたか、あるいは既に作成していた可能性があります。Auth0と通信するためのアプリケーションに関する詳細が必要になります。これらの詳細は、Auth0 Dashboardの<a href="https://manage.auth0.com/#/applications" target="_blank" rel="noreferrer noopener">アプリケーションの設定</a>セクションで入手することができます。</p><img src="//images.ctfassets.net/cdy7uua7fh8z/6SC7KnyzCyO8cwXQfril1X/d19b92723640171d9d6945e197d4e193/My_App_-_Settings_-_Japanese.png" alt="null" /><p><div class="alert-container" severity="default"><p>ネイティブまたはシングルページアプリケーションでデフォルトのアプリを使用する場合は、<b>［Token Endpoint Authentication Method（トークンエンドポイント認証方法）］</b>を<code>None</code>に更新し、<b>［Application Type（アプリケーションタイプ）］</b>を<code>SPA</code>または<code>Native</code>に設定していることを確認します。</p></div></p><p>必要な情報は以下のとおりです。</p><ul><li><p><b>Domain（ドメイン）</b></p></li><li><p><b>Client ID（クライアントID）</b></p></li></ul><p><div class="alert-container" severity="default"><p>このページの上部からサンプルをダウンロードする場合、これらの詳細は入力されています。</p></div></p><h3>Callback URLを構成する</h3><p>Callback URLとは、Auth0によって認証後のユーザーをリダイレクトするアプリケーション内URLです。アプリのCallback URLは、<a href="https://manage.auth0.com/#/applications" target="_blank" rel="noreferrer noopener">アプリケーションの設定</a>で<b>［Allowed Callback URLs（許可されているコールバックURL）］</b>フィールドに追加される必要があります。このフィールドが設定されていない場合、ユーザーはアプリケーションにログインできず、エラーが返されます。</p><p><div class="alert-container" severity="default"><p>このページの上部からダウンロードしたサンプルプロジェクトに沿って進めている場合には、<b>［Allowed Callback URLs（許可されているコールバックURL）］</b>に<code>http://localhost:3000</code>を設定します。</p></div></p><h3>ログアウトURLを構成する</h3><p>ログアウトURLとは、ユーザーが認可サーバーからログアウトした後にAuth0が戻ることができるアプリケーション内URLです。これは、<code>returnTo</code>クエリパラメーターで指定されています。アプリのログアウトURLは、<a href="https://manage.auth0.com/#/applications" target="_blank" rel="noreferrer noopener">アプリケーションの設定</a>で<b>［Allowed Logout URLs（許可されているログアウトURL）］</b>フィールドに追加される必要があります。このフィールドが設定されていない場合、ユーザーはアプリケーションからログアウトできず、エラーが返されます。</p><p><div class="alert-container" severity="default"><p>このページの上部からダウンロードしたサンプルプロジェクトに沿って進めている場合には、<b>［Allowed Logout URLs（許可されているログアウトURL）］</b>フィールドに追加する必要があるログアウトURLは<code>http://localhost:3000</code>です。</p></div></p><h3>許可されているWebオリジンを構成する</h3><p>アプリのURLを<a href="https://manage.auth0.com/#/applications/%7ByourClientId%7D/settings" target="_blank" rel="noreferrer noopener">アプリケーションの設定</a>で<b>［Allowed Web Origins（許可されているWebオリジン）］</b>フィールドに追加する必要があります。ここでアプリケーションURLを登録しないと、アプリケーションは認証トークンを暗黙でリフレッシュできず、ユーザーがアプリケーションを再び訪問した時、またはページを再読み込みした時にログアウトした状態になってしまいます。</p><p><div class="alert-container" severity="default"><p>このページの上部からダウンロードしたサンプルプロジェクトに沿って進めている場合には、<b>［Allowed Web Origins（許可されているWebオリジン）］</b>を<code>http://localhost:3000</code>に設定します。</p></div></p><p></p>

## Auth0 Flutter SDKをインストールする


<p>Auth0 Flutter SDKをプロジェクトに追加します：</p><p><pre><code class="language-javascript">flutter pub add auth0_flutter

</code></pre>

</p><p>以下のスクリプトタグを<code>index.html</code>ページに追加します：</p><p><pre><code class="language-javascript">&lt;script src=&quot;https://cdn.auth0.com/js/auth0-spa-js/2.0/auth0-spa-js.production.js&quot; defer&gt;&lt;/script&gt;

</code></pre>

</p>

## アプリケーションにログインを追加する {{{ data-action="code" data-code="main_view.dart" }}}


<p>アプリに認証をセットアップするには、<a href="https://auth0.com/docs/authenticate/login/auth0-universal-login" target="_blank" >ユニバーサルログイン</a>が最も手軽な方法です。最良のエクスペリエンス、高い安全性、幅広い機能を活用するためにも、ユニバーサルログインの使用をお勧めします。</p><p><code>Auth0Web</code>クラスを使用して、Auth0のユニバーサルログインをFlutter Webアプリに統合します。<code>loginWithRedirect()</code>を使用して、ユーザーをAuth0のユニバーサルログインページにリダイレクトします。</p><p><div class="alert-container" severity="default"><p>通常、<code>redirectUrl</code>パラメーターを<code>loginWithRedirect</code>に指定する必要があります。この操作を省くと、Auth0はデフォルトで構成されていない、<a href="https://auth0.com/docs/authenticate/login/auth0-universal-login/configure-default-login-routes" target="_blank" >デフォルトのログインルート</a>を使用することになります。</p></div></p><p>ユーザーはログインすると、リダイレクトでアプリケーションに戻されます。次に、起動中に<code>onLoad</code>を呼び出し、付与された資格情報を処理することで、このユーザーのIDとアクセストークンにアクセスすることができます。</p><p><pre><code class="language-javascript">auth0.onLoad().then((final credentials) =&gt; setState(() {

    // Handle or store credentials here

    _credentials = credentials;

  }));

</code></pre>

</p><p><div class="checkpoint">Flutter web手順3「チェックポイント」 <div class="checkpoint-default"><p><code>loginWithRedirect()</code>を呼び出してアプリにユーザーをログインするボタンをアプリに追加します。認証のためにAuth0へリダイレクトされてから、アプリケーションに戻されることを確認します。</p><p><code>onLoad</code>を呼び出した結果、<code>credentials</code>にアクセスできることと、IDとアクセストークンにアクセスできることを確認します。</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>アプリケーションが正常に起動しなかった場合は以下を行います。</p><ul><li><p>［Allowed Callback URLs（許可されているCallback URL）］が正しく設定されていることを確認します</p></li><li><p>URLを入力した後で保存したことを確認します</p></li><li><p>ドメインとクライアントIDの値が正常にインポートされていることを確認します</p></li></ul><p>まだお困りですか？当社提供の<a href="https://auth0.com/docs" target="_blank" >ドキュメント</a>または<a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">コミュニティページ</a>で詳しい情報を確認してください。</p></div>

  </div></p>

## アプリケーションにログアウトを追加する


<p>ユーザーをログアウトさせるには、Auth0 Flutter SDKの<code>logout()</code>を呼び出してログインセッションをクリアし、ユーザーをAuth0のログアウトエンドポイントにリダイレクトします。<a href="https://auth0.com/docs/authenticate/login/logout" target="_blank" >Auth0からのログアウトについて詳しい情報をお読みください</a>。</p><p><div class="alert-container" severity="default"><p>通常、<code>logout</code>を呼び出すときに<code>returnToUrl</code>を指定しますが、そうしない場合、Auth0は <a href="https://auth0.com/docs/authenticate/login/logout/redirect-users-after-logout" target="_blank" >［Allowed Logout URLs（許可されているログアウトURL）］リストの最初のURLにデフォルトで指定されます</a>。</p></div></p><p><div class="checkpoint">Flutter web手順4「チェックポイント」 <div class="checkpoint-default"><p><code>logout()</code>を呼び出し、ユーザーをアプリケーションからログアウトするアプリにボタンを追加します。このボタンを選択すると、Flutterアプリがログアウトエンドポイントにリダイレクトしてからもう一度戻ることを確認します。アプリケーションにはログインされていないはずです。</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>アプリケーションが正常にログアウトしなかった場合は以下を行います。</p><ul><li><p>［Allowed Logout URLs（許可されているログアウトURL）］が正しく設定されていることを確認します</p></li><li><p>URLを入力した後で保存したことを確認します</p></li></ul><p>まだお困りですか？当社提供の<a href="https://auth0.com/docs" target="_blank" >ドキュメント</a>または<a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">コミュニティページ</a>で詳しい情報を確認してください。</p></div>

  </div></p>

## ユーザープロファイル情報を表示する {{{ data-action="code" data-code="profile_view.dart" }}}


<p>ユーザープロファイルは、ページが読み込まれるとユーザープロファイルプロパティを自動的に取得し、アプリケーション起動中に<code>onLoad</code>を呼び出すことでアクセス・保存することができます。<code>onLoad</code>から返されたオブジェクトには、すべてのユーザープロファイルプロパティのある<code>user</code>プロパティが含まれています。これらはIDトークンをデコードすることで内部で入力されます。</p><p><div class="checkpoint">Flutter web手順5「チェックポイント」 <div class="checkpoint-default"><p>ログインして、結果の<code>user</code>プロパティを調査します。<code>email</code>や<code>name</code>など、現在のユーザーのプロファイル情報を確認します。</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>アプリケーションがユーザープロファイル情報を返さなかった場合には以下を行います。</p><ul><li><p>IDトークンが有効であることを確認します</p></li></ul><p>まだお困りですか？当社提供の<a href="https://auth0.com/docs" target="_blank" >ドキュメント</a>または<a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">コミュニティページ</a>で詳しい情報を確認してください。</p></div>

  </div></p>
