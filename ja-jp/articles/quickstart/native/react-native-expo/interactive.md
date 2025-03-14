---
title: Expoアプリケーションにログインを追加する
description: このガイドでは、ExpoアプリケーションにAuth0 React Native SDKを使ってAuth0を統合し、認証の追加とユーザープロファイル情報の表示を行う方法について説明します。
interactive:  true
files:
 - files/App
 - files/app
github:
  path: https://github.com/auth0-samples/auth0-react-native-sample/tree/master/00-Login
locale: ja-JP
---

# Expoアプリケーションにログインを追加する


<p>このクイックスタートは、Expoフレームワーク用です。React NativeアプリケーションにAuth0を統合するには、「<a data-contentfulid="1wLtNQQy4UsKwDEEhJkGeJ-ja-JP">React Nativeクイックスタート</a>」を参照してください。</p><p><div class="alert-container" severity="warning"><p>このSDKは「Expo Go」アプリと互換性がありません。互換性があるのはカスタム開発クライアントとEASビルドのみです。</p></div></p><p></p>

## Auth0を構成する


<p>Auth0のサービスを利用するには、Auth0 Dashboadに設定済みのアプリケーションがある必要があります。Auth0アプリケーションは、プロジェクトに認証を構成する場所です。</p><h3>アプリケーションを構成する</h3><p>対話型のセレクターを使ってAuth0アプリケーションを新規作成するか、統合したいプロジェクトを表す既存のアプリケーションを選択します。Auth0のすべてのアプリケーションには英数字からなる一意のクライアントIDが割り当てられており、アプリケーションのコードがSDKを通じてAuth0 APIを呼び出す際に使用されます。</p><p>このクイックスタートを使って構成されたすべての設定は、<a href="https://manage.auth0.com/">Dashboard</a>のアプリケーションを自動更新します。今後、アプリケーションの管理もDashboardで行えます。</p><p>完了済みの構成を見てみたい場合は、サンプルアプリケーションをご覧ください。</p><h3>Callback URLとログアウトURLを構成する</h3><p>Auth0はCallback URLとログアウトURLを呼び出して、ユーザーをアプリケーションにリダイレクトで戻します。Auth0は、ユーザーを認証した後にCallback URLを呼び出し、セッションのクッキーを削除した後にログアウトURLを呼び出します。Callback URLとログアウトURLを設定しないと、ユーザーはアプリにログインやログアウトが行えなくなり、アプリケーションにエラーが発生します。</p><p>アプリのプラットフォームに合わせて、対応するURLを<b>Callback URL</b>と<b>ログアウトURL</b>に追加します。<a data-contentfulid="UYjAbgxX33g81azZ6VHWc-ja-JP">カスタムドメイン</a>を使っている場合は、Auth0テナントのドメインではなく、カスタムドメインの値を使用してください。</p><h4>iOS</h4><p><code>BUNDLE_IDENTIFIER.auth0://{yourDomain}/ios/BUNDLE_IDENTIFIER/callback</code></p><h4>Android</h4><p><code>PACKAGE_NAME.auth0://{yourDomain}/android/PACKAGE_NAME/callback</code></p><p><div class="alert-container" severity="default"><p>サンプルプロジェクトに沿って進めている場合には、次の値を使用します：</p><ul><li><p>iOS：<code>com.auth0samples.auth0://{yourDomain}/ios/com.auth0samples/callback</code></p></li><li><p>Android：<code>com.auth0samples.auth0://{yourDomain}/android/com.auth0samples/callback</code></p></li></ul><p></p></div></p>

## 依存関係をインストールする


<p>このセクションでは、React Native Auth0モジュールをインストールする方法について説明します。</p><p><div class="alert-container" severity="default"><p>React Nativeの追加情報については、<a href="https://facebook.github.io/react-native/">公式ドキュメント</a>を参照してください。</p></div></p><h3>Yarn</h3><p><code>yarn add react-native-auth0</code></p><p><div class="alert-container" severity="default"><p><code>yarn</code>の詳細については、<a href="https://yarnpkg.com/en/docs">公式ドキュメント</a>を確認してください。</p></div></p><h3>npm</h3><p><code>npm install react-native-auth0 --save</code></p>

## Auth0構成プラグインをセットアップする {{{ data-action="code" data-code="app.json#10:15" }}}


<p>Auth0パッケージはカスタムネイティブコードを実行し、これはビルド時に構成しておく必要があります。これを実現するには、<a href="https://docs.expo.dev/guides/config-plugins/">Expo構成プラグイン</a>を使用します。</p><p><code>react-native-auth0</code>プラグインが<a href="https://docs.expo.dev/workflow/configuration/">Expo構成</a>に追加されます。</p>

## ネイティブソースコードを生成する {{{ data-action="code" data-code="app.json#31:36" }}}


<p>上記の構成を設定するには、ネイティブコードを生成する必要があります。これを行うには、次のコマンドを実行します：</p><p><code>expo prebuild</code></p><p>Expoの構成に存在しない場合には、<a href="https://github.com/expo/fyi/blob/main/android-package.md">Androidパッケージ</a>と<a href="https://github.com/expo/fyi/blob/main/bundle-identifier.md">iOSバンドル識別子</a>の提供が促されます。</p><p><pre><code>? What would you like your Android package name to be? &gt; com.auth0samples # or your desired package name



? What would you like your iOS bundle identifier to be? &gt; com.auth0samples # or your desired bundle identifier

</code></pre>

</p><p>これらの値は、Callback URLとログアウトURLの設定に使用されます。</p><p></p>

## Auth0Providerコンポーネントを構成する {{{ data-action="code" data-code="App.js#46:48" }}}


<p><code>useAuth0</code>フックはReact Contextに依存して状態を管理します。このコンテキストは<code>Auth0Provider</code>コンポーネントが提供します。</p><p><code>react-native-auth0</code>パッケージから<code>useAuth0</code>フックと<code>Auth0Provider</code>コンポーネントをインポートします：</p><p><pre><code class="language-javascript">import {useAuth0, Auth0Provider} from 'react-native-auth0';

</code></pre>

</p><p>SDKが正しく機能するためには、アプリケーションを<code>Auth0Provider</code>コンポーネントでラップし、次のプロパティを設定しなければなりません：</p><ul><li><p><code>domain</code>：Auth0テナントのドメインです。通常、Auth0 Dashboardにある<b>アプリケーションの設定</b>の<b>［Domain（ドメイン）］</b>フィールドで確認できます。<a data-contentfulid="UYjAbgxX33g81azZ6VHWc-ja-JP">カスタムドメイン</a>を使用している場合には、この値をカスタムドメインの値に設定してください。</p></li><li><p><code>clientId</code>：このクイックスタートで前にセットアップした、Auth0アプリケーションのクライアントIDです。これは、Auth0 Dashboardにある<b>アプリケーションの設定</b>の<b>［Client ID（クライアントID）］</b>フィールドで確認できます。</p></li></ul><p><div class="checkpoint">Expo - 手順5 - Auth0Providerコンポーネントを構成する <div class="checkpoint-default"><p><code>Auth0Provider</code>コンポーネントが構成されました。アプリケーションを実行して次の点を確認します：</p><ul><li><p>SDKが正しく初期化している</p></li><li><p>アプリケーションがAuth0に関連したエラーを投入していない</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>If your application did not launch successfully:</p><ul><li><p>make sure the correct application is selected</p></li><li><p>did you save after entering your URLs?</p></li><li><p>ensure your domain and client ID values are correct</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p><p></p></div>

  </div></p>

## アプリケーションにログインを追加する {{{ data-action="code" data-code="App.js#8:14" }}}


<p>ユーザーを認証するには、<code>useAuth0</code>フックが提供する<code>authorize</code>メソッドを呼び出します。これは、認証のためにユーザーをAuth0の<a data-contentfulid="67MpEy8zCywwI8YMkn5jy1-ja-JP">ユニバーサルログイン</a>ページへリダイレクトし、アプリへ戻します。</p><p>ユーザーのログインが成功したことを確認するには、フックの提供する<code>user</code>プロパティが<code>null</code>でないことを確認してください。</p><p><div class="checkpoint">Expo - 手順6 - アプリケーションにログインを追加する <div class="checkpoint-default"><p>クリックで<code>authorize</code>を呼び出すボタンコンポーネントを追加します。ログインページにリダイレクトされてから、アプリケーションに戻されることを確認します。</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>If your application did not launch successfully:</p><ul><li><p>ensure you set the Allowed Callback URLs are correct</p></li><li><p>verify you saved your changes after entering your URLs</p></li><li><p>make sure the domain and client ID values are imported correctly</p></li><li><p>if using Android, ensure that the manifest placeholders have been set up correctly, otherwise the redirect back to your app may not work</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p></div>

  </div></p>

## アプリケーションにログアウトを追加する {{{ data-action="code" data-code="App.js#16:22" }}}


<p>ユーザーをログアウトさせるには、<code>clearSession</code>を呼び出して、ユーザーをAuth0のログアウトエンドポイントにリダイレクトします。そうすると、ユーザーのセッションが認可サーバーから削除され、ユーザーがアプリケーションからログアウトされます。</p><p><div class="checkpoint">Expo - 手順7 - アプリケーションにログアウトを追加する <div class="checkpoint-default"><p><code>clearSession</code>を呼び出すログアウトボタンを追加して、Auth0のログアウトエンドポイントにリダイレクトされ、再び戻されることを確認してください。アプリケーションにはログインされていないはずです。</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>If your application did not log out successfully:</p><ul><li><p>ensure the Allowed Logout URLs are set properly</p></li><li><p>verify you saved your changes after entering your URLs</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p></div>

  </div></p>

## ユーザープロファイル情報を表示する {{{ data-action="code" data-code="App.js#32:34" }}}


<p><code>useAuth0</code>フックは、認証済みユーザーの情報を含む<code>user</code>オブジェクトを公開します。これを使用すれば、認証済みユーザーについてデコードされたユーザープロファイル情報に、<a href="https://auth0.com/docs/secure/tokens/id-tokens">IDトークン</a>からアクセスできます。</p><p>ユーザーが認証されていない場合、このプロパティは<code>null</code>になります。</p><p><div class="checkpoint">Expo - 手順8 - ユーザープロファイル情報を表示する <div class="checkpoint-default"><p>ログインして、結果の<code>user</code>プロパティを調査します。<code>email</code>や<code>name</code>など、現在のユーザーのプロファイル情報を確認します。</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"></div>

  </div></p>
