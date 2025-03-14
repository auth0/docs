---
title: Androidアプリケーションにログインを追加する
description: このガイドでは、AndroidアプリケーションにAuth0 Android SDKを使ってAuth0を統合する方法を説明します。
interactive:  true
files:
 - files/build
 - files/strings
 - files/MainActivity
github:
  path: https://github.com/auth0-samples/auth0-android-sample/tree/master/00-Login-Kt
locale: ja-JP
---

# Androidアプリケーションにログインを追加する


<p></p>

## Auth0を構成する


<p>Auth0のサービスを利用するには、Auth0 Dashboadに設定済みのアプリケーションがある必要があります。Auth0アプリケーションは、プロジェクトに認証を構成する場所です。</p><h3>アプリケーションを構成する</h3><p>対話型のセレクターを使ってAuth0アプリケーションを新規作成するか、統合したいプロジェクトを表す既存のアプリケーションを選択します。Auth0のすべてのアプリケーションには英数字からなる一意のクライアントIDが割り当てられており、アプリケーションのコードがSDKを通じてAuth0 APIを呼び出す際に使用されます。</p><p>このクイックスタートを使って構成されたすべての設定は、<a href="https://manage.auth0.com/#/">Dashboard</a>のアプリケーションを自動更新します。今後、アプリケーションの管理もDashboardで行えます。</p><p>代わりに完了済みの構成を見てみたい場合は、サンプルアプリケーションをご覧ください。</p><h3>Callback URLを構成する</h3><p>Callback URLとは、Auth0によって認証後のユーザーをダイレクトするアプリケーションURLです。この値を設定していない場合、ユーザーはログイン後にアプリケーションに戻りません。</p><p><div class="alert-container" severity="default"><p>サンプルプロジェクトに沿って進めている場合は、<code>demo://{yourDomain}/android/YOUR_APP_PACKAGE_NAME/callback</code>に設定してください。</p></div></p><h3>ログアウトURLを構成する</h3><p>ログアウトURLとは、Auth0によってログアウト後のユーザーをリダイレクトするアプリケーションURLです。この値を設定していない場合、ユーザーはアプリケーションからログアウトできず、エラーを受け取ります。</p><p><div class="alert-container" severity="default"><p>サンプルプロジェクトに沿って進めている場合は、<code>demo://{yourDomain}/android/YOUR_APP_PACKAGE_NAME/callback</code>に設定してください。</p></div></p>

## Auth0 Android SDKをインストールする {{{ data-action="code" data-code="build.gradle#18:18" }}}


<p><a href="https://github.com/auth0/Auth0.Android">Auth0 Android</a> SDKをプロジェクトに追加します。ライブラリーはAuth0のAuthentication APIとManagement APIに要求を行います。</p><p>アプリの<code>build.gradle</code>依存関係セクションで、以下を追加します。</p><p><pre><code class="language-javascript">implementation 'com.auth0.android:auth0:2. '

</code></pre>

</p><p>AndroidとKotlinのプラグインのそれぞれに対して、Java 8+バイトコードをターゲットにするようにします。</p>

## マニフェストのプレースホルダーを追加する {{{ data-action="code" data-code="build.gradle#10:12" }}}


<p>SDKにはマニフェストのプレースホルダーが必要です。Auth0は内部でプレースホルダーを使用して、認証のCallback URLを捉える<code>intent-filter</code>を定義します。Auth0テナントのドメインとCallback URLスキームを設定する必要があります。</p><p>アクティビティーに特別な<code>intent-filter</code>を宣言する必要はありません。これは、マニフェストのプレースホルダーをAuth0<b>ドメイン</b>と<b>スキーム</b>の値で定義したため、ライブラリーがリダイレクトを処理します。</p><p><div class="alert-container" severity="default"><p>ここでは、<code>auth0Scheme</code>に<code>demo</code>の値を使用したため、カスタムURLスキームをログイン後にAuth0がリダイレクトするURLに使用することができます。<a href="https://auth0.com/docs/applications/enable-android-app-links">Androidアプリのリンク</a>を使用したい場合は、<code>https</code>を使用する方法もあります。この値の設定に関する詳細情報は、<a href="https://github.com/auth0/Auth0.Android#a-note-about-app-deep-linking">Auth0.Android SDKのREADME</a>をお読みください。</p></div></p>

## アプリケーションを構成する {{{ data-action="code" data-code="strings.xml#2:3" }}}


<p>SDKが正しく機能するためには、次のプロパティを<code>strings.xml</code>で設定しなければなりません：</p><ul><li><p><code>com_auth0_domain</code>：Auth0テナントのドメインです。通常、Auth0 Dashboardにあるアプリケーションの［Settings（設定）］の［Domain（ドメイン）］フィールドで確認できます。<a href="https://auth0.com/docs/custom-domains">カスタムドメイン</a>を使用している場合は、その値を代わりに設定してください。</p></li><li><p><code>com_auth0_client_id</code>：このクイックスタートで前にセットアップしたAuth0アプリケーションのIDです。Auth0 Dashboardにあるアプリケーションの［Settings（設定）］の［Client ID（クライアントID）］フィールドで確認できます。</p></li></ul><p><code>AndroidManifest.xml</code>ファイルが<code>android.permissions.INTERNET</code>のアクセス許可を指定していることを確認します。</p><p><pre><code class="language-javascript">&lt;uses-permission android:name=&quot;android.permission.INTERNET&quot; /&gt;

</code></pre>

</p><p>Android Studio内で<b>Sync Project with Gradle Files</b>を実行するか、コマンドラインから<code>./gradlew clean assembleDebug</code>を実行します。</p><p><div class="alert-container" severity="default"><p>Gradleの使用に関する詳細は、<a href="https://gradle.org/getting-started-android-build/">Gradleの公式のドキュメンテーション</a>を確認してください。</p></div></p>

## アプリケーションにログインを追加する {{{ data-action="code" data-code="MainActivity.kt#6:38" }}}


<p>アプリケーションに認証をセットアップするには、<a href="https://auth0.com/docs/hosted-pages/login">ユニバーサルログイン</a>が最も手軽な方法です。最良のエクスペリエンス、高い安全性、幅広い機能を活用するためにも、ユニバーサルログインの使用をお勧めします。</p><p><code>onCreate</code>メソッドで、<code>Auth0</code>クラスの新しいインスタンスを作成し、ユーザー資格情報を保持します。</p><p><code>loginWithBrowser</code>メソッドを作成し、<code>WebAuthProvider</code>クラスを使用して、<a href="https://manage.auth0.com/#/">Auth0 Dashboard</a>のアプリケーションで有効にした接続で認証します。ここでは、初期設定の一部として<code>auth0Scheme</code>マニフェストのプレースホルダーで使用されたスキーム値を渡すことができます。</p><p><code>WebAuthProvider#start</code>関数を呼び出した後、ブラウザーが起動し、ログインページが表示されます。ユーザーが認証を行うと、Callback URLが呼び出されます。Callback URLには、認証プロセスの最終結果が含まれています。</p><p><div class="checkpoint">Androidクイックスタート手順5「チェックポイント」 <div class="checkpoint-default"><p><code>loginWithBrowser</code>を呼び出すアプリケーションにボタンを追加します。このボタンをクリックすると、Androidアプリケーションによって<a href="https://auth0.com/universal-login">Auth0ユニバーサルログイン</a>ページにリダイレクトされ、ユーザー名とパスワードまたはソーシャルプロバイダーを使ってログインまたはサインアップできるようになったことを確認します。</p><p>完了したら、Auth0がアプリにリダイレクトで戻されることを確認します。</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>If your application did not launch successfully:</p><ul><li><p>Ensure you set the Allowed Callback URLs are correct</p></li><li><p>Verify you saved your changes after entering your URLs</p></li><li><p>Make sure the domain and cliend ID values imported correctly</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p></div>

  </div></p>

## アプリケーションにログアウトを追加する {{{ data-action="code" data-code="MainActivity.kt#40:52" }}}


<p><code>WebAuthProvider</code>を使用して、認証時にブラウザーで設定されたクッキーを削除すると、ユーザーは次回の認証試行時に、資格情報を再入力するよう求められます。</p><p><code>logout</code>メソッドをアプリに追加してユーザーのセッションを削除し、アプリからログアウトします。ここでは、初期設定の一部として<code>auth0Scheme</code>マニフェストのプレースホルダーで使用されたスキーム値を渡すことができます。</p><p><code>WebAuthProvider</code>クラスを使用して、ログアウトを実装します。この呼び出しによってブラウザーが開き、ユーザーはログアウトエンドポイントに移動されます。ユーザーがログアウトをキャンセルする場合は、ユーザーを前のURLにリダイレクトすることを検討してください。</p><p><div class="checkpoint">Androidクイックスタート手順6「チェックポイント」 <div class="checkpoint-default"><p><code>logout</code>を呼び出し、ユーザーをアプリケーションからログアウトするアプリにボタンを追加します。このボタンをクリックすると、Androidアプリがユーザーをログアウトページにリダイレクトしてからもう一度リダイレクトで戻すこと、そして、アプリケーションにログインしていないことを確認します。</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>If your application did not logout successfully:</p><ul><li><p>Ensure the Allowed Logout URLs are set properly</p></li><li><p>Verify you saved your changes after entering your URLs</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p></div>

  </div></p>

## ユーザープロファイル情報を表示する {{{ data-action="code" data-code="MainActivity.kt#54:70" }}}


<p><code>AuthenticationAPIClient</code>クラスを使用して、<a href="https://auth0.com/docs/users/user-profiles#user-profile-management-api-access">Auth0からユーザーのプロファイルを取得します</a>。これには以下のものが必要です。</p><ul><li><p>ログインフェーズから返されるアクセストークン</p></li><li><p><code>WebAuthProvider.login</code>に<code>profile</code>スコープが含まれる必要がある</p></li></ul><p>ユーザーのメールアドレスを取得する必要がある場合は、<code>email</code>スコープを指定する必要があります。</p><p><div class="alert-container" severity="default"><p>このクイックスタートで、上のログイン手順中にデフォルトで<code>openid profile email</code>スコープが設定されます。</p></div></p><p>以下に、ユーザーのプロファイルを取得して画面上に表示するために使用できる関数を示します。</p><p><div class="checkpoint">Androidクイックスタート手順7「チェックポイント」 <div class="checkpoint-default"><p>ログイン後に<code>showUserProfile</code>関数を呼び出します。<code>onSuccess</code>コールバックがユーザーのプロファイル情報を返すことを確認します。</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>If your application did not return user profile information:</p><ul><li><p>Verify the <code>accessToken</code> is valid</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p></div>

  </div></p>
