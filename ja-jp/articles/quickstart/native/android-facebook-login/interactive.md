---
title: Android - Facebookログイン
description: このチュートリアルは、ネイティブFacebookログインを使用して、Androidアプリケーションにユーザーログインを追加する方法について説明します。
interactive:  true
files:
 - files/performLogin + SimpleCallback
 - files/onCreate
 - files/fetchSessionToken
 - files/fetchUserProfile
 - files/exchangeTokens
 - files/performLogin
github:
  path: 00-login-facebook
locale: ja-JP
---

# Android - Facebookログイン


<p>このチュートリアルは、ネイティブFacebookログインを使用して、Androidアプリケーションにユーザーログインを追加する方法について説明します。ログインして、アカウント用に構成された例を参考にして、このクリックスタートに従うことをお勧めします。</p><h2>システム要件</h2><ul><li><p>Android Studio 3.6.1</p></li><li><p>Android SDK 25</p></li><li><p>Emulator - Nexus 5X - Android 6.0</p></li></ul><p>このチュートリアルは、<a href="https://developers.facebook.com/docs/" target="_blank" rel="noreferrer noopener">Facebook SDK</a>でログインを実装する方法について説明します。​</p><h2>始める前に</h2><ul><li><p><a href="https://developers.facebook.com/docs/facebook-login/" target="_blank" rel="noreferrer noopener">FacebookログインSDK</a>をインストールして構成します。<a href="https://developers.facebook.com/" target="_blank" rel="noreferrer noopener">https://developers.facebook.com</a>でFacebookアプリの作成プロセスも行います。<b>この手順が終了したら、Facebookログインが統合された状態でモバイルアプリが稼働しているはずです。</b></p></li></ul><p>DashboardでFacebookネイティブサインインを使用するようにAuth0アプリケーションを構成します。「<a href="https://auth0.com/docs/connections/nativesocial/facebook" target="_blank" >Facebookログインをネイティブアプリに追加する</a>」を参照してください。<b>この手順が終了したら、アプリケーションはFacebookネイティブログインを実装できるようになります。</b></p><p></p>

## Facebookのアクセス許可を要求する


<p>アプリケーションでは既にFacebookでサインインすることができますが、リッチユーザープロファイルを確保するには、Facebookログインボタンがセットアップされたアクセス許可を更新する必要があります。</p><p>要求されたアクセス許可を<code>public_profile</code>と<code>email</code>に設定します。これで、アクセス要求がユーザーによって受け入れられたという前提で、ユーザーメールも応答の一部に含まれます。</p><p><code>loginButton.setPermissions(Arrays.asList(&quot;public_profile&quot;, &quot;email&quot;));</code></p>

## performLoginメソッドを作成する {{{ data-action="code" data-code="performLogin + SimpleCallback" }}}


<p>次に、Auth0で認証プロセスを始めるために、送信するペイロードの準備を行う新しいメソッドを作成します。</p><p>内部コールバックを処理するために、小さなインターフェイスを利用します。</p><p>サンプルでは、メソッドの名前は<code>performLogin</code>、インターフェイスの名前は<code>SimpleCallback</code>に指定されています。両方を追加してください。</p>

## performLoginメソッドを呼び出す {{{ data-action="code" data-code="onCreate" }}}


<p>次に、Facebookログインのコールバックの<code>onSuccess</code>メソッドから特定のメソッドを呼び出します。</p>

## Facebookを統合する


<p>Auth0でFacebookを使ってサインインすると、バックエンドはユーザーが主張する通りの本人であることを確認するために、バックグラウンドで確認作業を実施します。これを実現するには、セッションアクセストークンを提供する必要があります。</p><p>さらに、このFacebookユーザーを表すために、ユーザーをAuth0で作成する必要がある場合、バックエンドでは姓名やメールなどの一部の情報が必要になります。Auth0ユーザープロファイルでは、メールは（提供された場合）未検証としてフラグが付けられます。</p><p>セッションアクセストークンとユーザープロファイルを取得するには、Facebook APIに対してさらに2つの要求を行う必要があります。</p>

## Facebookセッションアクセストークンを取得する {{{ data-action="code" data-code="fetchSessionToken" }}}


<p>Facebook APIの<code>/oauth/access_token</code>エンドポイントに対して新しいGET要求を行います。以下のクエリパラメーターを使用します：</p><ul><li><p><code>grant_type</code>: <code>fb_attenuate_token</code>。</p></li><li><p><code>fb_exchange_token</code>：ログイン時に受け取るアクセストークンです。</p></li><li><p><code>client_id</code>：アプリIDです。この値は、Facebook開発者のダッシュボードから取得したもので、Facebookログインの統合に成功している場合は、アプリケーションで既に使用されているはずです。</p></li></ul><p>この手順で得たロジックを独自のメソッドに投入します。これを前に追加したメソッドから後で呼び出します。</p><p>サンプルはFacebook SDKの<code>GraphRequest</code>クラスを使用して、この要求を実行します。</p>

## Facebookのユーザープロファイルを取得する {{{ data-action="code" data-code="fetchUserProfile" }}}


<p>上の手順と同様に、別のGET要求を行います。エンドポイントパスは、Facebookログイン結果から得たユーザーID値（<code>/904636746222815</code>など）になります。次のパラメーターを使用します：</p><ul><li><p><code>access_token</code>：ログイン時に受け取るアクセストークンです。</p></li><li><p><code>fields</code>：応答で取得したいユーザープロファイルからのフィールドです。これらは、初めに構成されたFacebookログインボタンのアクセス許可に直接関連付けられています。アクセス許可が任意の場合、ユーザーはまずアクセス許可を付与することに同意する必要があります。Auth0でユーザーをサインアップするには、フルネームとメールを入力するだけで十分です。</p></li></ul><p></p>

## Auth0を統合する


<p>必要なアーティファクトを取得したら、IDやアクセストークンなどAuth0のユーザー資格情報に交換する準備ができました。しかしまず、その最後の要求を行うためにAuth0 SDKをセットアップする必要があります。</p><h3>アプリケーションキーを取得する</h3><ol><li><p><a href="https://manage.auth0.com/" target="_blank" rel="noreferrer noopener">Auth0 Dashboard</a>の<b>［Applications（アプリケーション）］</b>セクションで、<b>［Sign in with Facebook（Facebookでサインイン）］</b>を有効にした既存のアプリケーションを選択します。この手順で不明な点があれば、この記事の上に記載された要件セクションを確認してください。</p></li><li><p>アプリケーションの設定ページから<b>［Domain（ドメイン）］</b>と<b>［Client ID（クライアントID）］</b>の値をコピーします。これらはSDKで必要です。</p></li><li><p>Androidアプリケーションのstrings.xmlファイルで2つの新しいリソースを作成して保存します。キーの名前は以下で使用するキーと一致しなければなりません。<pre><code>&lt;resources&gt;

    &lt;string name=&quot;com_auth0_domain&quot;&gt;${account.namespace}&lt;/string&gt;

    &lt;string name=&quot;com_auth0_client_id&quot;&gt;${account.clientId}&lt;/string&gt;

&lt;/resources&gt;

</code></pre>

</p></li></ol><h3>Auth0 SDKをインストールする</h3><p>Androidアプリケーションで、この行をapp/build.gradleファイルに追加します：</p><p><pre><code>dependencies {

    implementation 'com.auth0.android:auth0:1.+'

}

</code></pre>

</p><p>次に、Gradle Syncタスクを実行し、プロジェクトとその依存関係を更新します。</p><h3>Web認証のマニフェストを更新する</h3><p>アプリケーションがSDKによって提供されるWeb認証モジュールを利用する予定がない場合は、未使用のアクティビティをAndroidManifest.xmlファイルから削除し、マニフェストのプレースホルダー問題を防ぐ必要があります。これを実現するには、アクティビティの宣言を追加し、tools:node=&quot;remove&quot;の注釈を加えます。</p><p><pre><code>&lt;application&gt;

  &lt;!-- Add the activity declaration line below --&gt;

   &lt;activity

    android:name=&quot;com.auth0.android.provider.AuthenticationActivity&quot;

    tools:node=&quot;remove&quot; /&gt;



&lt;/application&gt;

</code></pre>

</p><p>ただし、Web認証をサポートする予定の場合は、<a href="https://auth0.com/docs/libraries/auth0-android#authentication-via-universal-login" target="_blank" >ここ</a>でマニフェストのプレースホルダーを宣言する方法を確認してください。</p>

## 受け取ったデータをAuth0トークンに交換する {{{ data-action="code" data-code="exchangeTokens" }}}


<p>SDKは、使用する前にインスタンス化する必要があります。クラスレベルでフィールドを定義し、<code>onCreate</code>メソッドで初期化します。上の手順で定義した資格情報が<code>Auth0</code>コンストラクターに渡されたら、<code>AuthenticationAPIClient</code>の新しいインスタンスが作成されます。</p><p><pre><code>private AuthenticationAPIClient auth0Client;



@Override

public void onCreate(Bundle savedInstanceState) {

    super.onCreate(savedInstanceState);



    setContentView(R.layout.activity_login);



    Auth0 account = new Auth0(getString(R.string.com_auth0_client_id), getString(R.string.com_auth0_domain));

    auth0Client = new AuthenticationAPIClient(account);



    //...

}

</code></pre>

</p><p>ロジックを維持するメソッドを作成し、取得した2つのアーティファクトをAuth0のユーザー資格情報に交換します。サンプルでは、このメソッドの名前は<code>exchangeTokens</code>です。</p><p>APIクライアントは、トークンとサブジェクトタイプを受け取る<code>loginWithNativeSocialToken</code>メソッドを宣言します。前者はセッショントークンに対応し、後者はバックエンドが認証しようとする接続のタイプを示します。</p><p>ネイティブFacebookログインでは、以下の値を使用します：<code>&quot;http://auth0.com/oauth/token-type/facebook-info-session-access-token&quot;</code></p><p>構成する必要がある他の値は、ユーザープロファイル（<code>user_profile</code>キーを使用）とAuth0トークンに含まれる要求されたスコープです。</p><p><div class="alert-container" severity="default"><p>変化しないことを把握している値はすべて、クラスの上部で定数として維持しておくと便利です。サンプルは、件名トークンタイプ、Facebookのアクセス許可、およびAuth0のスコープに対して定数を利用します。Auth0のスコープの詳細については、特集<a data-contentfulid="78W9Q6R2zt6VRY0BouhtYG-ja-JP">記事</a>をお読みください。</p></div></p>

## performLoginメソッドを更新する {{{ data-action="code" data-code="performLogin" }}}


<p>すべての手順が独自のメソッドで定義されたら、<code>performLogin</code>メソッドに全部まとめて入れましょう。</p><p>すべて正常に実行されると、FacebookログインSDKでネイティブ認証ができるようになります。つまり、Facebookアプリがデバイスにインストールされていると、認証はブラウザーアプリでなくアプリケーションを介して処理されます。</p>
