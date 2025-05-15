---
title: React Nativeアプリケーションにログインを追加する
description: このチュートリアルは、Auth0を使用して、React Nativeアプリケーションにユーザーログインを追加する方法について説明します。
interactive:  true
files:
 - files/app
github:
  path: 00-Login
locale: ja-JP
---

# React Nativeアプリケーションにログインを追加する


<p>このクイックスタートは、React Nativeフレームワーク用です。ExpoアプリケーションにAuth0を統合するには、「<a href="https://auth0.com/docs/quickstart/native/react-native-expo/interactive" target="_blank" >Expoクイックスタート</a>」参照してください。</p><p></p>

## Auth0を構成する


<p>Auth0のサービスを利用するには、Auth0 Dashboadに設定済みのアプリケーションがある必要があります。Auth0アプリケーションは、プロジェクトに認証を構成する場所です。</p><h3>アプリケーションを構成する</h3><p>対話型のセレクターを使ってAuth0アプリケーションを新規作成するか、統合したいプロジェクトを表す既存のアプリケーションを選択します。Auth0のすべてのアプリケーションには英数字からなる一意のクライアントIDが割り当てられており、アプリケーションのコードがSDKを通じてAuth0 APIを呼び出す際に使用されます。</p><p>このクイックスタートを使って構成されたすべての設定は、<a href="https://manage.auth0.com/#/" target="_blank" rel="noreferrer noopener">Dashboard</a>のアプリケーションを自動更新します。今後、アプリケーションの管理もDashboardで行えます。</p><p>完成した構成を詳しく見るには、Dashboardのサンプルアプリケーションをご覧ください。</p><h3>Callback URLとログアウトURLを構成する</h3><p>Auth0はCallback URLとログアウトURLを呼び出して、ユーザーをアプリケーションにリダイレクトで戻します。Auth0は、ユーザーを認証した後にCallback URLを呼び出し、セッションのクッキーを削除した後にログアウトURLを呼び出します。Callback URLとログアウトURLを設定しないと、ユーザーはアプリにログインやログアウトが行えなくなり、アプリケーションにエラーが発生します。</p><p>アプリのプラットフォームに合わせて、対応するURLを<b>Callback URL</b>と<b>ログアウトURL</b>に追加します。<a data-contentfulid="UYjAbgxX33g81azZ6VHWc-ja-JP">カスタムドメイン</a>を使っている場合は、Auth0テナントのドメインではなく、カスタムドメインの値を使用してください。</p><h4>iOS</h4><p><pre><code>BUNDLE_IDENTIFIER.auth0://${account.namespace}/ios/BUNDLE_IDENTIFIER/callback

</code></pre>

</p><h4>Android</h4><p><pre><code>PACKAGE_NAME.auth0://${account.namespace}/android/PACKAGE_NAME/callback

</code></pre>

</p><p><div class="alert-container" severity="default"><p>サンプルプロジェクトに沿って進めている場合は、次の設定を行ってください：</p><ul><li><p><b>iOS</b>：</p><p><code>com.auth0samples.auth0://labs-fundtraining.us.auth0.com/ios/com.auth0samples/callback</code></p></li><li><p><b>Android</b>：</p><p><code>com.auth0samples.auth0://labs-fundtraining.us.auth0.com/android/com.auth0samples/callback</code></p></li></ul><p></p></div></p><p></p>

## 依存関係をインストールする


<p>このセクションでは、React Native Auth0モジュールをインストールします。</p><p><div class="alert-container" severity="default"><p>React Nativeの追加情報については<a href="https://facebook.github.io/react-native/" target="_blank" rel="noreferrer noopener">公式ドキュメント</a>をご覧ください。</p></div></p><h3>Yarn</h3><p><pre><code>yarn add react-native-auth0

</code></pre>

</p><p><div class="alert-container" severity="default"><p>Yarnの詳細については、<a href="https://yarnpkg.com/en/docs" target="_blank" rel="noreferrer noopener">公式ドキュメント</a>をご覧ください。</p></div></p><h3>npm</h3><p><pre><code>npm install react-native-auth0 --save

</code></pre>

</p><h3>追加のiOS手順：モジュールPodをインストールする</h3><p>SDKの必須最低iOSデプロイメントターゲットは13.0です。プロジェクトの「ios/Podfile」でプラットフォームのターゲットが13.0になっていることを確認してください。</p><p><pre><code>platform :ios '13.0'

</code></pre>

</p><p>CocoaPodsは、React Nativeフレームワークがプロジェクトに自己をインストールするために使うiOSパッケージ管理ツールです。iOSネイティブモジュールがiOSアプリで動作するように、最初にライブラリーPodをインストールします。古いReact Native SDKバージョンの知識がある方には、以前のLinking a Nativeモジュールに似ています。プロセスが簡略化されました：</p><p>ディレクトリを<code>ios</code>フォルダーに変更して<code>pod install</code>を実行します。</p><p><pre><code class="language-ruby">cd ios

pod install

</code></pre>

</p><p></p>

## Auth0をアプリケーションに統合する


<p>はじめに、ユーザーがログインする方法を提供する必要があります。Auth0がホストする<a data-contentfulid="67MpEy8zCywwI8YMkn5jy1-ja-JP">ログインページ</a>を使用することをお薦めします。</p><img src="//images.ctfassets.net/cdy7uua7fh8z/3ZRDXpjlUXEcQpXq6Q00L1/4b6b596983b5f7d257975a5efcc1cafa/login-ios_japanese.png" alt="iOSアプリのユニバーサルログイン画面の例" /><h3>Androidを構成する</h3><p>アプリケーションのディレクトリ（<code>android/app/build.gradle</code>が典型的）で<code>build.gradle</code>ファイルを開き、以下のマニフェストプレースホルダーを追加します。<code>auth0Domain</code>の値には、上で構成したようにAuth0アプリケーション設定が含まれなければなりません。</p><p><pre><code class="language-groovy">android {

    defaultConfig {

        // Add the next line

        manifestPlaceholders = [auth0Domain: &quot;${account.namespace}&quot;, auth0Scheme: &quot;<%= "${applicationId}.auth0" %>&quot;]

    }

    ...

}

</code></pre>

</p><p><div class="alert-container" severity="default"><p>ランタイムでは、<code>applicationId</code>の値がアプリケーションのパッケージ名またはIDで自動的に更新します（例：<code>com.example.app</code>）。この値は<code>build.gradle</code>ファイルから変更できます。<code>AndroidManifest.xml</code>ファイルの上部でも確認できます。</p></div></p><h3>iOSを構成する</h3><p><code>ios/&lt;YOUR PROJECT&gt;/AppDelegate.mm</code>ファイルで、以下を追加します：</p><p><pre><code>#import &lt;React/RCTLinkingManager.h&gt;



- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url

            options:(NSDictionary&lt;UIApplicationOpenURLOptionsKey, id&gt; *)options

{

  return [RCTLinkingManager application:app openURL:url options:options];

}

</code></pre>

</p><p><div class="alert-container" severity="default"><p>このファイルは、<a href="https://reactnative.dev/docs/next/new-architecture-app-intro#ios---use-objective-c-mm-extension" target="_blank" rel="noreferrer noopener">古いアーキテクチャ</a>を使ったアプリケーションの<code>ios/&lt;YOUR PROJECT&gt;/AppDelegate.m</code>になります。</p></div></p><p>次に、アプリのバンドルIDを使ってURLSchemeを追加します。</p><p><code>ios</code>フォルダーで<code>Info.plist</code>を開き、<code>CFBundleIdentifier</code>の値を見つけます。</p><p><pre><code class="language-xml">&lt;key&gt;CFBundleIdentifier&lt;/key&gt;

&lt;string&gt;$(PRODUCT_BUNDLE_IDENTIFIER)&lt;/string&gt;

</code></pre>

</p><p>この値の下に、<code>CFBundleIdentifier</code>の値を<code>CFBundleURLSchemes</code>の値として使い、URLタイプのエントリーを登録します。</p><p><pre><code class="language-xml">&lt;key&gt;CFBundleURLTypes&lt;/key&gt;

&lt;array&gt;

 &lt;dict&gt;

 &lt;key&gt;CFBundleTypeRole&lt;/key&gt;

 &lt;string&gt;None&lt;/string&gt;

 &lt;key&gt;CFBundleURLName&lt;/key&gt;

 &lt;string&gt;auth0&lt;/string&gt;

 &lt;key&gt;CFBundleURLSchemes&lt;/key&gt;

 &lt;array&gt;

 &lt;string&gt;$(PRODUCT_BUNDLE_IDENTIFIER).auth0&lt;/string&gt;

 &lt;/array&gt;

 &lt;/dict&gt;

&lt;/array&gt;

</code></pre>

</p><p><div class="alert-container" severity="default"><p>アプリケーションがReact Native CLIで生成された場合、<code>$(PRODUCT_BUNDLE_IDENTIFIER)</code>のデフォルト値は<code>org.reactjs.native.example.$(PRODUCT_NAME:rfc1034identifier)</code>と動的に一致します。サンプルアプリの場合、この値は<code>com.auth0samples</code>と一致します。</p></div></p><p>この値は、この後の手順で、Callback URLを定義するために使用します。以下の手順で、XCodeを用いて変更できます：</p><ul><li><p>アプリのルートからターミナルで<code>ios/&lt;YOUR PROJECT&gt;.xcodeproj</code>ファイルを開くか、<code>xed ios</code>を実行する。</p></li><li><p>プロジェクトまたは希望ターゲットの［Build Settings（ビルド設定）］タブを開いて「Bundle Identifier」を含むセクションを見つける。</p></li><li><p>「Bundle Identifier」値を希望のアプリケーションのバンドルID名と置き換える。</p></li></ul><p>詳細情報は<a href="https://facebook.github.io/react-native/docs/linking" target="_blank" rel="noreferrer noopener">React Nativeドキュメント</a>をご覧ください。</p>

## Auth0Providerコンポーネントを構成する {{{ data-action="code" data-code="app.js#46:48" }}}


<p><code>useAuth0</code>フックはReact Contextに依存して状態を管理します。<code>Auth0Provider</code>コンポーネントがこのコンテキストを提供します。</p><p><code>react-native-auth0</code>パッケージから<code>useAuth0</code>フックと<code>Auth0Provider</code>コンポーネントをインポートします：</p><p><pre><code class="language-javascript">import {useAuth0, Auth0Provider} from 'react-native-auth0';

</code></pre>

</p><p>SDKが正しく機能するためには、アプリケーションを<code>Auth0Provider</code>コンポーネントでラップし、次のプロパティをセットします：</p><ul><li><p><code>domain</code>：Auth0テナントのドメインです。通常、Auth0 Dashboardにあるアプリケーションの設定の［Domain（ドメイン）］フィールドで確認できます。<a data-contentfulid="UYjAbgxX33g81azZ6VHWc-ja-JP">カスタムドメイン</a>を使用している場合は、代わりにその値を設定してください。</p></li><li><p><code>clientId</code>：このクイックスタートで前に設定した、Auth0アプリケーションのIDです。Auth0 Dashboardにあるアプリケーションの［Settings（設定）］タブの［Client ID（クライアントID）］フィールドで確認できます。</p></li></ul><p><div class="checkpoint">React Nativeクイックスタート - 手順4「チェックポイント」 <div class="checkpoint-default"><p><code>Auth0Provider</code>コンポーネントの構成が完了しました。アプリケーションを実行して次の点を確認します：</p><ul><li><p>SDKが正しく初期化している。</p></li><li><p>アプリケーションがAuth0に関連したエラーを投入していない。</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>アプリケーションが正常に起動しなかった場合は以下を行います。</p><ul><li><p>正しいアプリケーションが選択されていることを確認します</p></li><li><p>URLを入力した後で保存しましたか？</p></li><li><p>ドメインとクライアントIDの値が正しいことを確認します</p></li></ul><p>まだお困りですか？当社提供の<a href="https://auth0.com/docs" target="_blank" >ドキュメント</a>または<a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">コミュニティページ</a>で詳しい情報を確認してください。</p></div>

  </div></p>

## アプリケーションにログインを追加する {{{ data-action="code" data-code="app.js#8:14" }}}


<p>ユーザを認証するには、<code>useAuth0</code>フックが提供する<code>authorize</code>メソッドを呼び出します。このメソッドは認証のためにユーザーをAuth0<a data-contentfulid="67MpEy8zCywwI8YMkn5jy1-ja-JP">ユニバーサルログイン</a>ページへリダイレクトし、アプリへ戻します。</p><p>ユーザーのログインが成功したことを確認するには、フックの提供する<code>user</code>プロパティが<code>null</code>でないことを確認してください。</p><p><div class="checkpoint">React Nativeクイックスタート - 手順5「チェックポイント」 <div class="checkpoint-default"><p>クリックで<code>authorize</code>を呼び出すボタンコンポーネントを追加します。ログインページにリダイレクトされてから、アプリケーションに戻されることを確認します。</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>アプリケーションが正常に起動しなかった場合は以下を行います。</p><ul><li><p>設定した［Allowed Callback URLs（許可されているCallback URL）］が正しいことを確認します</p></li><li><p>URLを入力した後で保存したことを確認します</p></li><li><p>ドメインとクライアントIDの値が正常にインポートされていることを確認します</p></li><li><p>Androidを使用している場合は、アプリに正しくリダイレクトで戻されるように、マニフェストのプレースホルダーが正しくセットアップされていることを確認します</p></li></ul><p>まだお困りですか？当社提供の<a href="https://auth0.com/docs" target="_blank" >ドキュメント</a>または<a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">コミュニティページ</a>で詳しい情報を確認してください。</p></div>

  </div></p>

## アプリケーションにログアウトを追加する {{{ data-action="code" data-code="app.js#16:22" }}}


<p>ユーザーをログアウトさせるには、<code>clearSession</code>を呼び出して、ユーザーをAuth0のログアウトエンドポイントにリダイレクトします。そうすると、ユーザーのセッションが認可サーバーから削除され、ユーザーがアプリケーションからログアウトされます。</p><p><div class="checkpoint">React Nativeクイックスタート - 手順6「チェックポイント」 <div class="checkpoint-default"><p><code>clearSession</code>を呼び出すボタンを追加して、Auth0のログアウトエンドポイントにリダイレクトされ、再び戻されることを確認してください。アプリケーションにはログインしていないはずです。</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>アプリケーションが正常にログアウトしなかった場合は以下を行います。</p><ul><li><p>［Allowed Logout URLs（許可されているログアウトURL）］が正しく設定されていることを確認します</p></li><li><p>URLを入力した後で保存したことを確認します</p></li></ul><p>まだお困りですか？当社提供の<a href="https://auth0.com/docs" target="_blank" >ドキュメント</a>または<a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">コミュニティページ</a>で詳しい情報を確認してください。</p></div>

  </div></p>

## ユーザープロファイル情報を表示する {{{ data-action="code" data-code="app.js#28:34" }}}


<p><code>useAuth0</code>フックは、認証済みユーザーの情報を含む<code>user</code>オブジェクトを公開します。これを使用すると、認証済みユーザーについてデコードされたユーザープロファイル情報に、<a data-contentfulid="7eGepxAjz89d1F7i1aP4ch-ja-JP">IDトークン</a>からアクセスできます。</p><p>ユーザーが認証されていない場合、このプロパティは<code>null</code>になります。</p><p><div class="checkpoint">React Nativeクイックスタート - 手順7「チェックポイント」 <div class="checkpoint-default"><p>ログインして、結果の<code>user</code>プロパティを調査します。<code>email</code>や<code>name</code>など、現在のユーザーのプロファイル情報を確認します。</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"></div>

  </div></p>
