---
title: Reactアプリケーションにログインを追加する
description: このガイドは、新規または既存のReactアプリケーションにAuth0 React SDKを使ってAuth0を統合する方法を説明します。
interactive:  true
files:
 - files/index
 - files/login
 - files/logout
 - files/profile
github:
  path: Sample-01
locale: ja-JP
---

# Reactアプリケーションにログインを追加する


<p>Auth0を使用すると、アプリケーションに手軽に認証を追加することができます。このガイドは、ReactアプリケーションにAuth0 React SDKを使ってAuth0を統合し、認証の追加とユーザープロファイル情報の表示を行う方法について説明します。</p><p>このクイックスタートを使用するには、以下の手順に従います：</p><ul><li><p>Auth0の無料アカウントにサインアップするか、Auth0にログインします。</p></li><li><p>統合したいReactアプリケーションを用意します。または、ログインした後に、サンプルアプリケーションを表示してダウンロードすることもできます。</p></li></ul><p><div class="alert-container" severity="default"><p>Reactでユーザー認証を実装するための詳しい情報については、<a href="https://developer.auth0.com/resources/guides/spa/react/basic-authentication" target="_blank" rel="noreferrer noopener">例を挙げて説明するReact認証ガイド</a>を参照してください。このガイドでは、サインアップボタンを作成する方法、React Routerを使用してルートガードを追加する方法、そして保護されたAPIをReactから呼び出す方法が詳しく説明されています。</p></div></p><p></p>

## Auth0を構成する


<p>Auth0のサービスを利用するには、Auth0 Dashboadに設定済みのアプリケーションがある必要があります。Auth0アプリケーションは、開発中のプロジェクトに対してどのように認証が動作して欲しいかを構成する場所です。</p><h3>アプリケーションを構成する</h3><p>対話型のセレクターを使ってAuth0アプリケーションを新規作成するか、統合したいプロジェクトを表す既存のアプリケーションを選択します。Auth0のすべてのアプリケーションには英数字からなる一意のクライアントIDが割り当てられており、アプリケーションのコードがSDKを通じてAuth0 APIを呼び出す際に使用されます。</p><p>このクイックスタートを使って構成されたすべての設定は、<a href="https://manage.auth0.com/#/" target="_blank" rel="noreferrer noopener">Dashboard</a>のアプリケーションを自動更新します。今後、アプリケーションの管理もDashboardで行えます。</p><p>完了済みの構成を見てみたい場合は、サンプルアプリケーションをご覧ください。</p><h3>Callback URLを構成する</h3><p>Callback URLとは、Auth0がユーザーを認証後にリダイレクトするアプリケーション内URLです。設定されていない場合、ユーザーはログイン後にアプリケーションに戻りません。</p><p><div class="alert-container" severity="default"><p>サンプルプロジェクトに沿って進めている場合は、<code>http://localhost:3000</code>に設定してください。</p></div></p><h3>ログアウトURLを構成する</h3><p>ログアウトURLとは、Auth0がユーザーをログアウト後にリダイレクトするアプリケーション内URLです。設定されていない場合、ユーザーはアプリケーションからログアウトできず、エラーを受け取ります。</p><p><div class="alert-container" severity="default"><p>サンプルプロジェクトに沿って進めている場合は、<code>http://localhost:3000</code>に設定してください。</p></div></p><h3>Allowed Web Origins（許可されているWebオリジン）を構成する</h3><p>Allowed Web Origin（許可されているWebオリジン）とは、認証フローへのアクセスを許可されるURLです。これにはプロジェクトのURLが含まれている必要があります。適切に設定されていない場合、プロジェクトが認証トークンを暗黙でリフレッシュできず、ユーザーがアプリケーションを再び訪問した時、またはページを再読み込みした時にログアウトした状態になってしまいます。</p><p><div class="alert-container" severity="default"><p>サンプルプロジェクトに沿って進めている場合は、<code>http://localhost:3000</code>に設定してください。</p></div></p>

## Auth0 React SDKをインストールする {{{ data-action="code" data-code="index.js" }}}


<p>Reactアプリで、Auth0の認証・認可を手軽に実装できるように、Auth0は<a href="https://github.com/auth0/auth0-react" target="_blank" rel="noreferrer noopener">React SDK</a>（auth0-react.js）を提供しています。</p><p>ターミナルで以下のコマンドを実行してAuth0 React SDKをインストールします：</p><p><pre><code>cd &lt;your-project-directory&gt;

npm install @auth0/auth0-react

</code></pre>

</p><h3>Auth0Providerコンポーネントを構成する</h3><p>SDKが正しく機能するためには、次のプロパティをAuth0Providerコンポーネントで設定しなければなりません：</p><ul><li><p><code>domain</code>：Auth0テナントのドメインです。通常、Auth0 Dashboardにあるアプリケーションの設定の［Domain（ドメイン）］フィールドで確認できます。<a href="https://auth0.com/docs/custom-domains" target="_blank" >カスタムドメイン</a>を使用している場合は、その値を代わりに設定してください。</p></li><li><p><code>clientId</code>：このクイックスタートで前にセットアップした、Auth0アプリケーションのIDです。Auth0 Dashboardにあるアプリケーションの設定の［Client ID（クライアントID）］フィールドで確認できます。</p></li><li><p><code>authorizationParams.redirect_uri</code>：ユーザー認証の後、Auth0にユーザーをリダイレクトして欲しいアプリケーション内URLです。このクイックスタートで前にセットアップしたCallback URLと呼応します。Auth0 Dashboardにあるアプリケーションの［Settings（設定）］の［Callback URLs（コールバックURL）］フィールドでもこの値を確認できます。コードに入力した値と前にセットアップした値は必ず一致させてください。異なった場合はユーザーにエラーが表示されます。</p></li></ul><p><div class="checkpoint">Reactクイックスタート - 手順2「チェックポイント」 <div class="checkpoint-default"><p>Auth0Providerコンポーネントが適切に構成されました。アプリケーションを実行して次の点を検証します：</p><ul><li><p>SDKが正しく初期化している。</p></li><li><p>アプリケーションがAuth0に関連したエラーを投入していない。</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>すみません。いくつかの点をもう一度確認してください。</p><ul><li><p>正しいアプリケーションが選択されていることを確認します</p></li><li><p>URLを入力した後で保存しましたか？</p></li><li><p>ドメインとクライアントIDが正常にインポートされていることを確認します</p></li></ul><p>まだお困りですか？当社提供の<a href="https://auth0.com/docs" target="_blank" >ドキュメント</a>または<a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">コミュニティページ</a>で詳しい情報を確認してください。</p></div>

  </div></p>

## アプリケーションにログインを追加する {{{ data-action="code" data-code="login.js" }}}


<p>Auth0アプリケーションとAuth0 React SDKの構成が完了したら、プロジェクトのためにログインをセットアップする必要があります。これを実現するには、SDKのloginWithRedirect()メソッドを使用して、ユーザをAuth0のユニバーサルログインページにリダイレクトするログインボタンを作成します。ユーザーが認証に成功すると、このクイックスタートで前にセットアップしたCallback URLへリダイレクトされます。</p><p><div class="alert-container" severity="default"><p>このガイドでは<code>useAuth0()</code>のカスタムReactフックに焦点を当てています。クラスコンポーネントを使用している場合は、<a href="https://github.com/auth0/auth0-react/blob/master/EXAMPLES.md#use-with-a-class-component" target="_blank" rel="noreferrer noopener"><code>withAuth0()</code>を使用したこちらのサンプル</a>を確認してください。</p></div></p><p>ログインボタンコンポーネントのためにアプリケーションで<code>login.js</code>という名前の新規ファイルを作成し、インタラクティブパネルから右へとコードにコピーします。これにはログインに必要なロジックが含まれています。それから<code>index.js</code>ファイルを更新して新しいログインボタンを含めます。</p><p><div class="checkpoint">Reactクイックスタート - 手順3「チェックポイント」 <div class="checkpoint-default"><p>ユーザー名とパスワードを使ってログインやサインアップができるようになりました。</p><p>ログインボタンをクリックして次の点を検証します：</p><ul><li><p>ReactアプリケーションによってAuth0ユニバーサルログインページにリダイレクトされる。</p></li><li><p>ログインまたはサインアップできる。</p></li><li><p>Auth0が、<code>Auth0Provider</code>を構成するために使った<code>authorizationParams.redirect_uri</code>の値を使用し、アプリケーションへリダイレクトする。</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>すみません。いくつかの点をもう一度確認してください。</p><ul><li><p>正しい<code>authorizationParams.redirect_uri</code>が構成されている</p></li><li><p>ログインボタンが<code>index.js</code>ファイルに追加されている</p></li></ul><p>まだお困りですか？当社提供の<a href="https://auth0.com/docs" target="_blank" >ドキュメント</a>または<a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">コミュニティページ</a>で詳しい情報を確認してください。</p></div>

  </div></p>

## アプリケーションにログアウトを追加する {{{ data-action="code" data-code="logout.js" }}}


<p>プロジェクトにログインしたユーザーには、ログアウトする方法も必要です。SDKのlogout()メソッドを使用してログアウトボタンを作成します。ユーザーはログアウトすると、<a href="https://auth0.com/docs/api/authentication?javascript#logout" target="_blank" >Auth0ログアウト</a>エンドポイントにリダイレクトされてから、即座に、このクイックスタートで先ほどセットアップしたログアウトURLにリダイレクトで戻されます。</p><p>ログアウトボタンコンポーネントのためにアプリケーションで<code>logout.js</code>という名前の新規ファイルを作成し、インタラクティブパネルからコードにコピーします。これにはログアウトに必要なロジックが含まれています。それから<code>index.js</code>ファイルを更新して新しいログアウトボタンを含めます。</p><p><div class="checkpoint">Reactクイックスタート - 手順4「チェックポイント」 <div class="checkpoint-default"><p>アプリケーションを実行してログアウトボタンをクリックし、次の点を検証します：</p><ul><li><p>Reactアプリケーションによって、アプリケーションの設定で［Allowed Logout URLs（許可されているログアウトURL）］の一つに指定したアドレスへリダイレクトされる。</p></li><li><p>アプリケーションにログインしていない。</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>すみません。いくつかの点をもう一度確認してください。</p><ul><li><p>正しいログアウトURLが構成されている</p></li><li><p>ログアウトボタンが<code>index.js</code>ファイルに追加されている</p></li></ul><p>まだお困りですか？当社提供の<a href="https://auth0.com/docs" target="_blank" >ドキュメント</a>または<a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">コミュニティページ</a>で詳しい情報を確認してください。</p></div>

  </div></p>

## ユーザープロファイル情報を表示する {{{ data-action="code" data-code="profile.js" }}}


<p>ユーザーがログインやログアウトできるようになったら、認証済のユーザーに関連付けられた<a href="https://auth0.com/docs/users/concepts/overview-user-profile" target="_blank" >プロファイル情報</a>を取得できるようにしたいと考えるはずです。たとえば、ログインしたユーザーの名前やプロファイル画像をプロジェクトに表示できるようになりたいかもしれません。</p><p>React用のAuth0 SDKでは、<code>user</code>プロパティを通じてユーザー情報を提供します。インタラクティブパネルで<code>profile.js</code>コードを確認し、使用方法の例をチェックします。</p><p><code>user</code>プロパティにはユーザーのアイデンティティに関する機密情報が含まれるため、この方法が使用できるかはユーザーの認証ステータスによります。エラーを防ぐため、常に以下を行ってください：</p><ul><li><p>Reactが<code>user</code>プロパティを使用するコンポーネントを呼び出す前に、<code>isAuthenticated</code>プロパティを使用してAuth0がユーザーを認証したかどうかを定義する。</p></li><li><p><code>isAuthenticated</code>プロパティにアクセスする前に、<code>isLoading</code>がfalseであることをチェックして、SDKの読み込みが完了したことを確認する。</p></li></ul><img src="//images.ctfassets.net/cdy7uua7fh8z/5Lp4Zahxd2v6wSJmy9JaM4/717068d1dafc0637c4dad2cdcf5a29a5/Login_Screen_-_Japanese.png" alt="null" /><p><div class="checkpoint">Reactクイックスタート - 手順5「チェックポイント」 <div class="checkpoint-default"><p>以下の点を確認します：</p><ul><li><p>ログイン後、コンポーネント内の<code>user.name </code>やその他のユーザープロパティをすべて正しく表示できる。</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>すみません。いくつかの点をもう一度確認してください。</p><ul><li><p><code>isAuthenticated</code>プロパティへのアクセス以前に<code>isLoading</code>の確認が追加されている</p></li><li><p><code>Profile</code>コンポーネントが<code>index.js</code>ファイルに追加されている</p></li></ul><p>まだお困りですか？当社提供の<a href="https://auth0.com/docs" target="_blank" >ドキュメント</a>または<a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">コミュニティページ</a>で詳しい情報を確認してください。</p></div>

  </div></p>
