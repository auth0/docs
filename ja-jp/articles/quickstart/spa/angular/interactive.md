---
title: Angularアプリケーションにログインを追加する
description: このガイドは、AngularアプリケーションにAuth0 Angular SDKを使ってAuth0を統合し、認証の追加とユーザープロファイル情報の表示を行う方法について説明します。
interactive:  true
files:
 - files/main
 - files/login-button
 - files/logout-button
 - files/user-profile
github:
  path: https://github.com/auth0-samples/auth0-angular-samples/tree/main/Sample-01
locale: ja-JP
---

# Angularアプリケーションにログインを追加する


<p><div class="alert-container" severity="default"><p>Angularでユーザー認証を実装するための詳しい情報については、「<a href="https://developer.auth0.com/resources/guides/spa/angular/basic-authentication">例を挙げて説明するAngular認証ガイド</a>」を参照してください。このガイドでは、サインアップボタンを作成する方法、ルートガードを追加する方法、そして保護されたAPIをAngularから呼び出す方法が詳しく説明されています。</p></div></p><p>Auth0を使用すると、アプリケーションに手軽に認証を追加することができます。このガイドは、Angularアプリケーションに<a href="https://github.com/auth0/auth0-angular">Auth0 Angular SDK</a>を使ってAuth0を統合し、認証の追加とユーザープロファイル情報の表示を行う方法について説明します。</p><p>このクイックスタートを使用するには、以下の手順に従います：</p><ul><li><p>Auth0の無料アカウントにサインアップするか、Auth0にログインします。</p></li><li><p>統合したいAngularプロジェクトを用意します。または、ログインした後に、サンプルアプリケーションを表示してダウンロードすることもできます。</p></li></ul><p></p><p></p>

## Auth0を構成する


<p>Auth0のサービスを利用するには、Auth0 Dashboadに設定済みのアプリケーションがある必要があります。Auth0アプリケーションは、開発中のプロジェクトに対してどのように認証が動作して欲しいかを構成する場所です。</p><h3>アプリケーションを構成する</h3><p>対話型のセレクターを使ってAuth0アプリケーションを新規作成するか、統合したいプロジェクトを表す既存のアプリケーションを選択します。Auth0のすべてのアプリケーションには英数字からなる一意のクライアントIDが割り当てられており、アプリケーションのコードがSDKを通じてAuth0 APIを呼び出す際に使用されます。</p><p>このクイックスタートを使って構成されたすべての設定は、<a href="https://manage.auth0.com/#/">Dashboard</a>のアプリケーションを自動更新します。今後、アプリケーションの管理もDashboardで行えます。</p><p>代わりに完了済みの構成を見てみたい場合は、サンプルアプリケーションをご覧ください。</p><h3>Callback URLを構成する</h3><p>Callback URLとは、Auth0がユーザーを認証後にリダイレクトするアプリケーション内URLです。設定されていない場合、ユーザーはログイン後にアプリケーションに戻りません。</p><p><div class="alert-container" severity="default"><p>サンプルプロジェクトに沿って進めている場合は、<code>http://localhost:4200</code>に設定してください。</p><p></p></div></p><h3>ログアウトURLを構成する</h3><p>ログアウトURLとは、Auth0がユーザーをログアウト後にリダイレクトするアプリケーション内URLです。設定されていない場合、ユーザーはアプリケーションからログアウトできず、エラーを受け取ります。</p><p><div class="alert-container" severity="default"><p>サンプルプロジェクトに沿って進めている場合は、<code>http://localhost:4200</code>に設定してください。</p><p></p></div></p><h3>Allowed Web Origins（許可されているWebオリジン）を構成する</h3><p>［Allowed Web Origin（許可されているWebオリジン）］とは、認証フローにアクセスすることを許可して欲しいURLです。これにはプロジェクトのURLが含まれている必要があります。適切に設定されていない場合、プロジェクトが認証トークンを暗黙でリフレッシュできず、ユーザーがアプリケーションを再び訪問した時、またはページを再読み込みした時にログアウトした状態になってしまいます。</p><p><div class="alert-container" severity="default"><p>サンプルプロジェクトに沿って進めている場合は、<code>http://localhost:4200</code>に設定してください。</p><p></p></div></p>

## Auth0 Angular SDKをインストールする


<p>Angularアプリで、Auth0の認証・認可を手軽に実装できるように、Auth0は<a href="https://github.com/auth0/auth0-angular">Angular SDK</a>を提供しています。</p><p>ターミナルで以下のコマンドを実行してAuth0 Angular SDKをインストールします：</p><p><code>npm install @auth0/auth0-angular</code></p><p>SDKはモジュールや認証サービスなど、Auth0をAngularアプリケーションに慣用的に統合しやすくする種類をいくつか公開しています。</p>

## Auth0を登録・提供する {{{ data-action="code" data-code="main.ts#7:13" }}}


<p>SDKは、SDKが機能するために必要なすべてのサービスを含んだprovide関数である、<code>provideAuth0</code>をエクスポートします。これをアプリケーションで登録するには、以下のようにします。</p><ol><li><p><code>main.ts</code>ファイルを開きます。</p></li><li><p><code>@auth0/auth0-angular</code>パッケージから<code>provideAuth0</code>関数をインポートします。</p></li><li><p><code>provideAuth0</code>を<code>bootstrapApplication</code>内の<code>providers</code>に追加することで、アプリケーションに追加します。</p></li><li><p><code>AuthService</code>を<code>AppComponent</code>に注入します。</p></li></ol><p><code>provideAuth0</code>関数は<code>domain</code>プロパティと<code>clientId</code>プロパティを取ります。これらのプロパティの値は、Auth0で登録したシングルページアプリケーション（SPA）の<b>［Settings（設定）］</b>にある<b>Domain（ドメイン）</b>と<b>Client ID（クライアントID）</b>の値に対応します。その上に、<code>authorizationParams.redirect_uri</code>を構成します。これによって、認証に成功した後、Auth0はユーザーを特定のURLにリダイレクトで戻すことができます。</p><p><div class="alert-container" severity="default"><p><a href="https://auth0.com/docs/custom-domains">Auth0を使用したカスタムドメイン</a>では、ドメインプロパティの値は［Settings（設定）］タブに反映された値でなく、カスタムドメインの値になります。</p></div></p>

## アプリケーションにログインを追加する {{{ data-action="code" data-code="login-button.ts#11:13" }}}


<p>Auth0アプリケーションとAuth0 Angular SDKの構成が完了したら、プロジェクトのためにログインをセットアップする必要があります。これを実現するには、<code>AuthService</code>クラスからSDKの<code>loginWithRedirect()</code>メソッドを使用して、ユーザーをAuth0のユニバーサルログインページにリダイレクトします。そこでAuth0はユーザーを認証することができます。ユーザーが認証に成功すると、アプリケーション、およびこのクイックスタートで前にセットアップしたCallback URLへリダイレクトされます。</p><p>アプリケーションで選択時に<code>loginWithRedirect()</code>を呼び出すログインボタンを作成します。</p><p><div class="checkpoint">Angular手順4「チェックポイント」 <div class="checkpoint-default"><p>アプリケーションにログインできるようになります。</p><p>アプリケーションを実行し、ログインボタンを選択します。以下の点を確認します：</p><ul><li><p>ユーザー名とパスワードを使って、ログインまたはサインアップできる。</p></li><li><p>アプリケーションによって<a href="https://auth0.com/universal-login">Auth0ユニバーサルログイン</a>ページにリダイレクトされる。</p></li><li><p>認証用にAuth0にリダイレクトされる。</p></li><li><p>認証した後、Auth0はアプリケーションにリダイレクトで戻される。</p></li><li><p>コンソールでAuth0に関連したエラーを受け取らない。</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Sorry about that. Here are a few things to double check:</p><ul><li><p>make sure you configured the correct <code>authorizationParams.redirect_uri</code></p></li><li><p>make sure you added the<code>LoginButtonComponent</code> button to the module&#39;s declarations</p></li></ul><p>Still having issues? To get more help, check out our <a href="https://auth0.com/docs/">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a>.</p></div>

  </div></p>

## アプリケーションにログアウトを追加する {{{ data-action="code" data-code="logout-button.ts#19:25" }}}


<p>プロジェクトにログインしたユーザーには、<a href="https://auth0.com/docs/logout/guides/logout-auth0">ログアウトする方法</a>も必要です。SDKには、<code>AuthService</code>クラスでアプリからユーザーをログアウトするのに使用できる<code>logout()</code>メソッドが用意されています。ユーザーはログアウトすると、<a href="https://auth0.com/docs/api/authentication?javascript#logout">Auth0ログアウトエンドポイント</a>にリダイレクトされてから、即座に、アプリケーションとこのクイックスタートで先ほどセットアップしたログアウトURLへとリダイレクトで戻されます。</p><p>アプリケーションで選択時に<code>logout()</code>を呼び出すログアウトボタンを作成します。</p><p><div class="alert-container" severity="default"><p>SDKによって<code>AuthService</code>クラスで<code>isAuthenticated$</code> Observableが公開されることで、ユーザーが認証されているかどうかを確認することができます。<code>isAuthenticated$</code> Observableの値に基づいて、条件付きでログインボタンとログアウトボタンを作成することができます。または、シングルボタンを使って、ログインとログアウトの両方のボタンと条件付きレンダリングを組み合わせることができます。</p></div></p><p><div class="checkpoint">Angular手順5「チェックポイント」 <div class="checkpoint-default"><p>アプリケーションからログアウトできるようになります。</p><p>アプリケーションを実行し、ログインし、ログアウトボタンを選択します。以下の点を確認します：</p><ul><li><p>Auth0のログアウトエンドポイントにリダイレクトされている。</p></li><li><p>Auth0がアプリケーションと正しいログアウトURLへのリダイレクトで戻される。</p></li><li><p>アプリケーションにログインしていない。</p></li><li><p>コンソールでAuth0に関連したエラーを受け取らない。</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Sorry about that. Here are a few things to double check:</p><ul><li><p>make sure that you configured the logout URL as one of the <b>Allowed Logout URLS </b>in your application&#39;s <b>Settings</b></p></li><li><p>check that you added the <code>LogoutButtonComponent</code> to the module&#39;s declarations</p></li><li><p>inspect the <a href="https://manage.auth0.com/#/logs">application logs</a> for further errors</p></li></ul><p>Still having issues? To get more help, check out our <a href="https://auth0.com/docs/">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a>.</p></div>

  </div></p>

## ユーザープロファイル情報を表示する {{{ data-action="code" data-code="user-profile.ts" }}}


<p>ユーザーがログインやログアウトできるようになったら、認証済みのユーザーに関連付けられた<a href="https://auth0.com/docs/users/concepts/overview-user-profile">プロファイル情報</a>を取得できるようにしたいと考えるはずです。たとえば、ログインしたユーザーの名前やプロフィール写真を表示することで、ユーザーインターフェイスをパーソナライズできるようになりたいかもしれません。</p><p>Auth0 Angular SDKは、<code>AuthService</code>クラスによって公開された<code>user$</code> Observableを介してユーザー情報を提供します。<code>user$</code> Observableにはユーザーのアイデンティティに関する機密情報とアーティファクトが含まれるため、この方法が使用できるかはユーザーの認証ステータスによります。幸い、<code>user$</code> Observableは、<code>isAuthenticated$</code> Observableがtrueである場合にのみ値を出力するよう構成されています。そのため、ユーザープロファイルデータにアクセスする前に、認証状態を手動で確認する必要はありません。</p><p>SDKは、<code>AuthService</code>クラスでユーザーが認証されているかどうかを確認することができる<code>isAuthenticated$</code> Observableも公開します。これを使って、たとえば、UI要素を表示・非表示にするかを判断することができます。</p><p>インタラクティブパネルで<code>UserProfileComponent</code>コードを確認し、これらの関数の使用方法の例をチェックします。</p><p><div class="checkpoint">Angular手順6「チェックポイント」 <div class="checkpoint-default"><p>ユーザープロファイル情報を表示することができるようになります。</p><p>アプリケーションを実行して次の点を確認します：</p><ul><li><p>ログイン後にユーザー情報が正しく表示される。</p></li><li><p>ログアウト後にユーザー情報が表示されない。</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Sorry about that. Here are a few things to double check:</p><ul><li><p>make sure you are logged in</p></li><li><p>make sure you are trying to access an existing property such as <code>user.name</code></p></li><li><p>make sure you added the <code>UserProfileComponent</code> component to the correct module&#39;s declarations</p></li></ul><p>Still having issues? To get more help, check out our <a href="https://auth0.com/docs/">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a>.</p></div>

  </div></p>
