---
title: JavaScriptアプリケーションにログインを追加する
description: このガイドは、単純なJavaScriptを使用するシングルページアプリケーション（SPA）にAuth0 SPA SDKを使ってAuth0を統合し、認証の追加とユーザープロファイル情報の表示を行う方法について説明します。
interactive:  true
files:
 - files/app
github:
  path: 01-Login
locale: ja-JP
---

# JavaScriptアプリケーションにログインを追加する


<p>Auth0を使用すると、アプリケーションに手軽に認証を追加することができます。このガイドは、単純なJavaScriptを使用するシングルページアプリケーション（SPA）に<a href="https://github.com/auth0/auth0-spa-js" target="_blank" rel="noreferrer noopener">Auth0 SPA SDK</a>を使ってAuth0を統合し、認証の追加とユーザープロファイル情報の表示を行う方法について説明します。</p><p>このクイックスタートを使用するには、以下の手順に従います：</p><ul><li><p>Auth0の無料アカウントにサインアップするか、Auth0にログインします。</p></li><li><p>統合したいプロジェクトを用意します。または、ログインした後に、サンプルアプリケーションを表示してダウンロードすることもできます。</p></li></ul><p><div class="alert-container" severity="default"><p>このクイックスタートでは、ReactやAngularなどのフレームワークを使用しているのでなく、単純なJavaScriptアプリケーションにAuth0を追加しているものとします。</p></div></p><p></p><p></p>

## Auth0を構成する


<p>Auth0のサービスを利用するには、Auth0 Dashboadでセットアップしたアプリケーションが必要です。Auth0アプリケーションは、開発中のプロジェクトに対してどのように認証が動作して欲しいかを構成する場所です。</p><h3>アプリケーションを構成する</h3><p>対話型のセレクターを使ってAuth0アプリケーションを新規作成するか、統合したいプロジェクトを表す既存のアプリケーションを選択します。Auth0のすべてのアプリケーションには英数字からなる一意のクライアントIDが割り当てられており、アプリケーションのコードがSDKを通じてAuth0 APIを呼び出す際に使用されます。</p><p>このクイックスタートを使って構成されたすべての設定は、<a href="https://manage.auth0.com/#/" target="_blank" rel="noreferrer noopener">Dashboard</a>のアプリケーションを自動更新します。今後、アプリケーションの管理もDashboardで行えます。</p><p>代わりに完了済みの構成を見てみたい場合は、サンプルアプリケーションをご覧ください。</p><h3>Callback URLを構成する</h3><p>Callback URLとは、Auth0がユーザーを認証後にリダイレクトするアプリケーション内URLです。設定されていない場合、ユーザーはログイン後にアプリケーションに戻りません。</p><p><div class="alert-container" severity="default"><p>サンプルプロジェクトに沿って進めている場合は、<code>http://localhost:3000</code>に設定してください。</p></div></p><h3>ログアウトURLを構成する</h3><p>ログアウトURLとは、Auth0がユーザーをログアウト後にリダイレクトするアプリケーション内URLです。設定されていない場合、ユーザーはアプリケーションからログアウトできず、エラーを受け取ります。</p><p><div class="alert-container" severity="default"><p>サンプルプロジェクトに沿って進めている場合は、<code>http://localhost:3000</code>に設定してください。</p></div></p><h3>Allowed Web Origins（許可されているWebオリジン）を構成する</h3><p>［Allowed Web Origin（許可されているWebオリジン）］とは、認証フローにアクセスすることを許可して欲しいURLです。これにはプロジェクトのURLが含まれている必要があります。適切に設定されていない場合、プロジェクトが認証トークンを暗黙でリフレッシュできず、ユーザーがアプリケーションを再び訪問した時、またはページを再読み込みした時にログアウトした状態になってしまいます。</p><p><div class="alert-container" severity="default"><p>サンプルプロジェクトに沿って進めている場合は、<code>http://localhost:3000</code>に設定してください。</p></div></p>

## Auth0 SPA SDKを追加する


<p>JavaScriptアプリで、Auth0の認証・認可を手軽に実装できるように、Auth0はSPA SDK（auth0-spa-js）を提供しています。Auth0 SPA SDKはNPMパッケージとして、またはCDNからインストールすることができます。このクイックスタートの目的上、CDNを使用します。HTMLページにこのスクリプトタグを含めます。</p><p><pre><code class="language-javascript">&lt;script src=&quot;https://cdn.auth0.com/js/auth0-spa-js/2.0/auth0-spa-js.production.js&quot;&gt;&lt;/script&gt;

</code></pre>

</p>

## Auth0クライアントを作成する {{{ data-action="code" data-code="app.js#1:7" }}}


<p>Auth0 SPA SDKで提供されているAuth0クライアントの新規インスタンスを作成し、このクイックスタートで前に作成したAuth0アプリケーションの詳細を提供します。</p><p>ユーザーが以前にログインしている場合、クライアントはページの読み込み時に認証状態を更新します。ページが更新されても、ユーザーはこれまでと変わらずログインされます。</p>

## アプリケーションにログインを追加する {{{ data-action="code" data-code="app.js#8:14" }}}


<p>Auth0アプリケーションの構成、Auth0 SPA SDKの追加、Auth0クライアントの作成が完了したら、プロジェクトのためにログインをセットアップする必要があります。これを実現するには、SDKの<code>loginWithRedirect()</code>メソッドを使用して、ユーザーをAuth0のユニバーサルログインページにリダイレクトします。ここでAuth0はユーザーを認証することができます。ユーザーが認証に成功すると、このクイックスタートで前にセットアップしたCallback URLへリダイレクトされます。</p><p>アプリケーションで選択時に<code>loginWithRedirect()</code>を呼び出すログインボタンを作成します。</p><p><div class="checkpoint">Javascriptクイックスタート手順4「チェックポイント」 <div class="checkpoint-default"><p>アプリケーションにログインできるようになります。</p><p>アプリケーションを実行し、ログインボタンを選択します。以下の点を確認します：</p><ul><li><p>ユーザー名とパスワードを使って、ログインまたはサインアップできる</p></li><li><p>アプリケーションによって<a href="https://auth0.com/universal-login" target="_blank" >Auth0ユニバーサルログイン</a>ページにリダイレクトされる</p></li><li><p>認証用にAuth0にリダイレクトされる</p></li><li><p>認証した後、Auth0はユーザーをアプリケーションにリダイレクトで戻す</p></li><li><p>コンソールでAuth0に関連したエラーを受け取らない</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>すみません。いくつかの点をもう一度確認してください。</p><ul><li><p>正しいアプリケーションが選択されていることを確認します</p></li><li><p>URLを入力した後で保存したことを確認します</p></li><li><p>Auth0クライアントがAuth0のドメインとクライアントIDで正しく構成されていることを確認します</p></li></ul><p>まだお困りですか？当社提供の<a href="https://auth0.com/docs/" target="_blank" >ドキュメント</a>または<a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">コミュニティページ</a>で詳しい情報を確認してください。</p></div>

  </div></p>

## Auth0からのコールバックを処理する {{{ data-action="code" data-code="app.js#16:21" }}}


<p>ブラウザーでアプリケーションプロセスへとリダイレクトで戻されると、アプリケーションはAuth0からのコールバックを検出した場合にのみ、Auth0クライアントで<code>handleRedirectCallback()</code>関数を呼び出します。これを実行する1つの方法は、<code>code</code>と<code>state</code>のクエリパラメーターが検出されたときに、<code>handleRedirectCallback()</code>のみを呼び出すことです。</p><p>コールバックの処理に成功すると、パラメーターはURLから削除されます。これによって、次回ページが読み込まれても、コールバックハンドラーがトリガーされることはありません。</p><p><div class="checkpoint">Javascriptクイックスタート手順5「チェックポイント」 <div class="checkpoint-default"><p>Auth0からのコールバックが正しく処理されます。</p><p>アプリケーションを実行し、ログインボタンをもう一度選択します。以下の点を確認します：</p><ul><li><p>認証した後、Auth0はアプリケーションにリダイレクトで戻される。</p></li><li><p>クエリパラメータがURLから削除される。</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>すみません。いくつかの点をもう一度確認してください。</p><ul><li><p>アプリケーションのURLに<code>redirect_uri</code>オプションが構成されていることを確認します</p></li><li><p><code>error</code>クエリパラメーターがある場合は、それを調べてエラーの原因を確認します</p></li></ul><p>まだお困りですか？当社提供の<a href="https://auth0.com/docs/" target="_blank" >ドキュメント</a>または<a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">コミュニティページ</a>で詳しい情報を確認してください。</p></div>

  </div></p>

## アプリケーションにログアウトを追加する {{{ data-action="code" data-code="app.js#23:29" }}}


<p>プロジェクトにログインしたユーザーには、<a href="https://auth0.com/docs/logout/guides/logout-auth0" target="_blank" >ログアウトする方法</a>も必要です。Auth0クライアントには、アプリからユーザーをログアウトするのに使用できる<code>logout()</code>メソッドが用意されています。ユーザーはログアウトすると、<a href="https://auth0.com/docs/api/authentication?javascript#logout" target="_blank" >Auth0ログアウトエンドポイント</a>にリダイレクトされてから、即座に、アプリケーションとこのクイックスタートで先ほどセットアップしたログアウトURLへとリダイレクトで戻されます。</p><p>アプリケーションで選択時に<code>logout()</code>を呼び出すログアウトボタンを作成します。</p><p><div class="alert-container" severity="default"><p>SDKによって<code>isAuthenticated()</code>関数が公開されることで、ユーザーが認証されているかどうかを確認することができます。<code>isAuthenticated()</code>関数の値に基づいて、条件付きでログインボタンとログアウトボタンを表示することができます。または、シングルボタンを使って、ログインとログアウトの両方のボタンと条件付きレンダリングを組み合わせることができます。</p></div></p><p><div class="checkpoint">javascriptクイックスタート手順6「チェックポイント」 <div class="checkpoint-default"><p>アプリケーションからログアウトできるようになります。</p><p>アプリケーションを実行し、ログインし、ログアウトボタンを選択します。以下の点を確認します：</p><ul><li><p>Auth0のログアウトエンドポイントにリダイレクトされている。</p></li><li><p>Auth0がアプリケーションと正しいログアウトURLへのリダイレクトで戻される。</p></li><li><p>アプリケーションにログインしていない。</p></li><li><p>コンソールでAuth0に関連したエラーを受け取らない。</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>すみません。いくつかの点をもう一度確認してください。</p><ul><li><p>ログアウトURLが<b>［Allowed Logout URLs（許可されているログアウトURL）］</b>としてアプリケーションの<b>［Settings（設定）］</b>で構成されていることを確認します</p></li><li><p><a href="https://manage.auth0.com/#/logs" target="_blank" rel="noreferrer noopener">アプリケーションログ</a>で他にもエラーがないかを調べます</p></li></ul><p>まだお困りですか？当社提供の<a href="https://auth0.com/docs/" target="_blank" >ドキュメント</a>または<a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">コミュニティページ</a>で詳しい情報を確認してください。</p></div>

  </div></p>

## ユーザープロファイル情報を表示する {{{ data-action="code" data-code="app.js#31:45" }}}


<p>ユーザーがログインやログアウトできるようになったら、認証済みのユーザーに関連付けられた<a href="https://auth0.com/docs/users/concepts/overview-user-profile" target="_blank" >プロファイル情報</a>を取得できるようにしたいと考えるはずです。たとえば、ログインしたユーザーの名前やプロフィール写真を表示することで、ユーザーインターフェイスをパーソナライズできるようになりたいかもしれません。</p><p>Auth0 SPA SDKは、Auth0クライアントによって公開された<code>getUser()</code>関数を介してユーザー情報を提供します。Auth0クライアントは、ユーザーが認証されているかどうかを確認することができる<code>isAuthenticated()</code>関数も公開します。これを使って、たとえば、UI要素を表示・非表示にするかを判断することができます。インタラクティブパネルでコードを確認し、これらの関数の使用方法の例をチェックします。</p><p><div class="checkpoint">Javascriptクイックスタート手順7「チェックポイント」 <div class="checkpoint-default"><p>ユーザープロファイル情報を表示することができるようになります。</p><p>アプリケーションを実行して次の点を確認します：</p><ul><li><p>ログイン後にユーザー情報が正しく表示される。</p></li><li><p>ログアウト後にユーザー情報が表示されない。</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>すみません。いくつかの点をもう一度確認してください。</p><ul><li><p>これまでの手順がすべて問題なく動作することを確認します</p></li><li><p>認証状態に対する応答でUIを管理するコードを確認します</p></li><li><p><a href="https://manage.auth0.com/#/logs" target="_blank" rel="noreferrer noopener">アプリケーションログ</a>でサイレント認証に関連のエラーが他にもないか調べます</p></li></ul><p>まだお困りですか？当社提供の<a href="https://auth0.com/docs/" target="_blank" >ドキュメント</a>または<a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">コミュニティページ</a>で詳しい情報を確認してください。</p></div>

  </div></p>
