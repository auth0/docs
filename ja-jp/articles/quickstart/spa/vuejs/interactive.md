---
title: Vueアプリケーションにログインを追加する
description: このガイドは、VueアプリケーションにAuth0 Vue SDKを使ってAuth0を統合し、認証の追加とユーザープロファイル情報の表示を行う方法について説明します。
interactive:  true
files:
 - files/index
 - files/login
 - files/logout
 - files/profile
github:
  path: 01-Login
locale: ja-JP
---

# Vueアプリケーションにログインを追加する


<p></p><p>Auth0を使用すると、アプリケーションに認証を追加することができます。このガイドは、VueアプリケーションにAuth0 Vue SDKを使ってAuth0を統合し、認証の追加とユーザープロファイル情報の表示を行う方法について説明します。</p><p><div class="alert-container" severity="warning"><p>このクイックスタートは、Vue 3アプリケーションで<a href="https://github.com/auth0/auth0-vue" target="_blank" rel="noreferrer noopener">Auth0 Vue</a>を使用するために設計されています。Vue 2を使用している場合は、<a href="https://github.com/auth0/auth0-vue/blob/main/tutorial/vue2-login.md" target="_blank" rel="noreferrer noopener">Auth0 SPA SDKを使ったVue 2チュートリアル</a>を確認するか、「<a href="https://developer.auth0.com/resources/guides/spa/vue/basic-authentication/v2-javascript" target="_blank" rel="noreferrer noopener">例を挙げて説明するVue.js認証2</a>」ガイドを参照してください。</p></div></p><p>このクイックスタートを使用するには、以下の手順に従います：</p><ul><li><p>Auth0の無料アカウントを使用するか、Auth0にサインアップします。</p></li><li><p>統合する作業中のVueプロジェクト、または、ログインした後に、サンプルアプリケーションをダウンロードすることができます。</p></li></ul><p></p>

## Auth0を構成する


<p>Auth0のサービスを利用するには、Auth0 Dashboadに設定済みのアプリケーションがある必要があります。Auth0アプリケーションは、開発中のプロジェクトに対してどのように認証が動作して欲しいかを構成する場所です。</p><h3>アプリケーションを構成する</h3><p>対話型のセレクターを使ってAuth0アプリケーションを新規作成するか、統合したいプロジェクトを表す既存のアプリケーションを選択します。Auth0のすべてのアプリケーションには英数字からなる一意のクライアントIDが割り当てられており、アプリケーションのコードがSDKを通じてAuth0 APIを呼び出す際に使用されます。</p><p>このクイックスタートを使って構成されたすべての設定は、<a href="https://manage.auth0.com/dashboard/us/dev-1-2s2aq0/" target="_blank" rel="noreferrer noopener">Dashboard</a>のアプリケーションを自動更新します。今後、アプリケーションの管理もDashboardで行えます。</p><p>代わりに完了済みの構成を見てみたい場合は、サンプルアプリケーションをご覧ください。</p><h3>Callback URLを構成する</h3><p>Callback URLとは、Auth0がユーザーを認証後にリダイレクトするアプリケーション内URLです。設定されていない場合、ユーザーはログイン後にアプリケーションに戻りません。</p><p><div class="alert-container" severity="default"><p>サンプルプロジェクトに沿って進めている場合は、<code>http://localhost:3000</code>に設定してください。</p></div></p><h3>ログアウトURLを構成する</h3><p>ログアウトURLとは、Auth0がユーザーをログアウト後にリダイレクトするアプリケーション内URLです。設定されていない場合、ユーザーはアプリケーションからログアウトできず、エラーを受け取ります。</p><p><div class="alert-container" severity="default"><p>サンプルプロジェクトに沿って進めている場合は、<code>http://localhost:3000</code>に設定してください。</p></div></p><h3>Allowed Web Origins（許可されているWebオリジン）を構成する</h3><p>［Allowed Web Origin（許可されているWebオリジン）］とは、認証フローにアクセスすることを許可して欲しいURLです。これにはプロジェクトのURLが含まれている必要があります。適切に設定されていない場合、プロジェクトが認証トークンを暗黙でリフレッシュできず、ユーザーがアプリケーションを再び訪問した時、またはページを再読み込みした時にログアウトした状態になってしまいます。</p><p><div class="alert-container" severity="default"><p>サンプルプロジェクトに沿って進めている場合は、<code>http://localhost:3000</code>に設定してください。</p></div></p>

## Auth0 Vue SDKをインストールする {{{ data-action="code" data-code="index.js" }}}


<p>Vue 3アプリで、Auth0の認証・認可を手軽に実装できるように、Auth0は<a href="https://github.com/auth0/auth0-vue" target="_blank" rel="noreferrer noopener">Vue SDK</a>を提供しています。</p><p>ターミナルで以下のコマンドを実行してAuth0 Vue SDKをインストールします：</p><p><pre><code class="language-bash">cd &lt;your-project-directory&gt;

npm install @auth0/auth0-vue

</code></pre>

</p><h3>プラグインを登録する</h3><p>SDKが機能するには、以下のプロパティを使ってVueアプリケーションでプラグインを登録する必要があります。</p><ul><li><p><code>domain</code>：Auth0テナントのドメインです。この値は、Auth0 Dashboardにあるアプリケーションの［Settings（設定）］の［Domain（ドメイン）］フィールドにあります。<a href="https://auth0.com/docs/custom-domains" target="_blank" >カスタムドメイン</a>を使用している場合は、この値をカスタムドメインの値に設定してください。</p></li><li><p><code>clientId</code>：このクイックスタートで前にセットアップした、Auth0アプリケーションのIDです。Auth0 Dashboardにあるアプリケーションの［Settings（設定）］の［Client ID（クライアントID）］フィールドで確認してください。</p></li><li><p><code>authorizationParams.redirect_uri</code>：ユーザー認証の後、Auth0にユーザーをリダイレクトして欲しいアプリケーション内URLです。このクイックスタートで前にセットアップしたCallback URLと呼応します。この値は、Auth0 Dashboardにあるアプリケーションの［Settings（設定）］の［Callback URLs（コールバックURL）］フィールドにあります。コードに入力した値と前にセットアップした値は必ず一致させてください。異なった場合はユーザーにエラーが表示されます。</p></li></ul><p>プラグインは、<code>provide</code>と<code>app.config.globalProperties</code>の両方を使ってSDKを登録します。これによって、<a href="https://vuejs.org/guide/introduction.html#composition-api" target="_blank" rel="noreferrer noopener">Composition API</a>と<a href="https://vuejs.org/guide/introduction.html#options-api" target="_blank" rel="noreferrer noopener">Options API</a>の両方が有効になります。</p><p><div class="checkpoint">vueクイックスタート手順2「チェックポイント」 <div class="checkpoint-default"><p>プラグインが構成されました。アプリケーションを実行して次の点を確認します：</p><ul><li><p>SDKが正しく初期化している</p></li><li><p>アプリケーションがAuth0に関連したエラーを投入していない</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>アプリケーションが正常に起動しなかった場合は以下を行います。</p><ul><li><p>正しいアプリケーションが選択されていることを確認します</p></li><li><p>URLを入力した後で変更内容を保存します</p></li><li><p>ドメインとクライアントIDが正常にインポートされていることを確認します</p></li></ul><p>まだお困りですか？当社提供の<a href="https://auth0.com/docs" target="_blank" >ドキュメント</a>または<a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">コミュニティページ</a>で詳しい情報を確認してください。</p></div>

  </div></p>

## アプリケーションにログインを追加する {{{ data-action="code" data-code="login.js" }}}


<p>次に、プロジェクト用のログインを設定します。<code>useAuth0</code>の返り値に表示されたSDKの<code>loginWithRedirect</code>関数を使用します。これには、コンポーネントのsetup関数でアクセスすることができます。ユーザーはAuth0ユニバーサルログインページにリダイレクトされ、ユーザーの認証後、このクイックスタートで前に設定したCallback URLにリダイレクトされます。</p><h3>Options APIの使用</h3><p>Options APIでは、<code>this</code>アクセサを通じてグローバル<code>$auth0</code>プロパティからの同じ<code>loginWithRedirect</code>メソッドを使用することができます。</p><p><div class="checkpoint">Vueクイックスタート手順3「チェックポイント」 <div class="checkpoint-default"><p>Auth0ユニバーサルログインからログインできるようになります。</p><p>ログインボタンをクリックして次の点を確認します：</p><ul><li><p>VueアプリケーションによってAuth0ユニバーサルログインページにリダイレクトされる</p></li><li><p>ログインまたはサインアップできる</p></li><li><p>Auth0が、プラグインを構成するために使った<code>authorizationParams.redirect_uri</code>の値を使用し、アプリケーションへリダイレクトする。</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Auth0のユニバーサルログインを使用してログインできない場合には以下を行います。</p><ul><li><p>正しい<code>authorizationParams.redirect_uri</code>が構成されていることを確認します</p></li><li><p>ドメインとクライアントIDが正しく設定されていることを確認します</p></li></ul><p>まだお困りですか？当社提供の<a href="https://auth0.com/docs" target="_blank" >ドキュメント</a>または<a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">コミュニティページ</a>で詳しい情報を確認してください。</p></div>

  </div></p>

## アプリケーションにログアウトを追加する {{{ data-action="code" data-code="logout.js" }}}


<p>プロジェクトにログインしたユーザーには、ログアウトする方法も必要です。ユーザーがログアウトすると、アプリケーションによって<a href="https://auth0.com/docs/api/authentication?javascript#logout" target="_blank" >Auth0 logout</a>エンドポイントにリダイレクトされてから、指定された<code>logoutParams.returnTo</code>パラメーターにリダイレクトされます。</p><p><code>useAuth0</code>の返り値に表示された<code>logout</code>関数を使用します。これには、コンポーネントの<code>setup</code>関数でアクセスすることができ、ユーザーをアプリケーションからログアウトします。</p><p></p><h3>Options APIの使用</h3><p>Options APIでは、<code>this</code>アクセサを通じてグローバル<code>$auth0</code>プロパティからの同じ<code>logout</code>メソッドを使用することができます。</p><p><div class="checkpoint">vueクイックスタート手順4「チェックリスト」 <div class="checkpoint-default"><p>アプリケーションを実行してログアウトボタンをクリックし、次の点を検証します：</p><ul><li><p>Vueアプリケーションによって<code>logoutParams.returnTo</code>アドレスにリダイレクトされる</p></li><li><p>アプリケーションにログインしていない</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>ログアウトできない場合には以下を行います。</p><ul><li><p><code>logout</code>を呼び出すときに<code>logoutParams.returnTo</code>の値が指定されていることを確認します</p></li><li><p>［Application Settings（アプリケーションの設定）］で［Allowed Logout URLs（許可されているログアウトURL）］に<code>returnTo</code>値が含まれていることを確認します。</p></li></ul><p>まだお困りですか？当社提供の<a href="https://auth0.com/docs" target="_blank" >ドキュメント</a>または<a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">コミュニティページ</a>で詳しい情報を確認してください。</p></div>

  </div></p>

## ユーザープロファイル情報を表示する {{{ data-action="code" data-code="profile.js" }}}


<p>次に、認証ユーザーに関連する<a href="https://auth0.com/docs/users/concepts/overview-user-profile" target="_blank" >プロファイル情報</a>を取得する方法を構成します。たとえば、ログインしたユーザーの名前やプロフィール写真をプロジェクトに表示したいかもしれません。ユーザーが認証を行うと、SDKはユーザーのプロファイル情報を抽出し、メモリ内に保存します。アプリケーションは、リアクティブな<code>user</code>プロパティを使ってユーザープロファイルにアクセスすることができます。このプロパティにアクセスするには、コンポーネントの<code>setup</code>関数を確認し、<code>userAuth0</code>返り値を見つけます。</p><p><code>user</code>プロパティには、ユーザーIDに関する機微な情報が含まれています。これは、ユーザーの認証ステータスに基づいてのみ利用できます。エラーを防ぐため、常に以下を行ってください：</p><ul><li><p>Vueが<code>user</code>プロパティを使用するコンポーネントを呼び出す前に、<code>isAuthenticated</code>プロパティを使用してAuth0がユーザーを認証したかどうかを定義する。</p></li><li><p><code>isAuthenticated</code>プロパティにアクセスする前に、<code>isLoading</code>がfalseであることをチェックして、SDKの読み込みが完了したことを確認する。</p></li></ul><h3>Options APIの使用</h3><p>Options APIでは、アクセサ<code>this</code>を通じてグローバル<code>$auth0</code>プロパティからの同じリアクティブな<code>user</code>、<code>isLoading</code>、および<code>isAuthenticated</code>プロパティを使用します。</p><p><div class="checkpoint">vue手順5「チェックポイント」 <div class="checkpoint-default"><p>以下の点を確認します：</p><ul><li><p>ログイン後、コンポーネント内の<code>user</code>やその他のユーザープロパティをすべて正しく表示できる</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p><code>user</code>プロパティで問題が発生している場合には以下を行います。</p><ul><li><p><code>isAuthenticated</code>プロパティへのアクセス以前に<code>isLoading</code>の確認が追加されていることを確認します</p></li><li><p><code>user</code>プロパティへのアクセス以前に<code>isAuthenticated</code>の確認が追加されていることを確認します</p></li></ul><p>まだお困りですか？当社提供の<a href="https://auth0.com/docs" target="_blank" >ドキュメント</a>または<a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">コミュニティページ</a>で詳しい情報を確認してください。</p></div>

  </div></p>
