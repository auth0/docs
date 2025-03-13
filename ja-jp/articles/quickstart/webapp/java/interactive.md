---
title: Java Servletアプリケーションにログインを追加する
description: このガイドは、新規または既存のJava ServletアプリケーションにAuth0を統合する方法を説明します。
interactive:  true
files:
 - files/web
 - files/AuthenticationControllerProvider
 - files/LoginServlet
 - files/CallbackServlet
 - files/HomeServlet
 - files/LogoutServlet
github:
  path: https://github.com/auth0-samples/auth0-servlet-sample/tree/master/01-Login
locale: ja-JP
---

# Java Servletアプリケーションにログインを追加する


<p>Auth0を使用すると、アプリケーションに手軽に認証を追加して、ユーザープロファイル情報にアクセスすることができます。このガイドは、新規または既存のJava ServletアプリケーションにAuth0を統合する方法を説明します。</p><p></p>

## Auth0を構成する


<p>Auth0のサービスを利用するには、Auth0 Dashboadに設定済みのアプリケーションがある必要があります。Auth0アプリケーションは、開発中のプロジェクトに対してどのように認証が動作して欲しいかを構成する場所です。</p><h3>アプリケーションを構成する</h3><p>対話型のセレクターを使ってAuth0アプリケーションを新規作成するか、統合したいプロジェクトを表す既存のアプリケーションを選択します。Auth0のすべてのアプリケーションには英数字からなる一意のクライアントIDが割り当てられており、アプリケーションのコードがSDKを通じてAuth0 APIを呼び出す際に使用されます。</p><p>このクイックスタートを使って構成されたすべての設定は、<a href="https://manage.auth0.com/#/">Dashboard</a>のアプリケーションを自動更新します。今後、アプリケーションの管理もDashboardで行えます。</p><p>完了済みの構成を見てみたい場合は、サンプルアプリケーションをご覧ください。</p><h3>Callback URLを構成する</h3><p>Callback URLとは、Auth0がユーザーを認証後にリダイレクトするアプリケーション内URLです。設定されていない場合、ユーザーはログイン後にアプリケーションに戻りません。</p><p><div class="alert-container" severity="default"><p>サンプルプロジェクトに沿って進めている場合は、<code>http://localhost:3000</code><code>/callback</code>に設定してください。</p></div></p><h3>ログアウトURLを構成する</h3><p>ログアウトURLとは、Auth0がユーザーをログアウト後にリダイレクトするアプリケーション内URLです。設定されていない場合、ユーザーはアプリケーションからログアウトできず、エラーを受け取ります。</p><p><div class="alert-container" severity="default"><p>サンプルプロジェクトに沿って進めている場合は、<code>http://localhost:3000/logout</code>に設定してください。</p></div></p>

## Auth0をアプリケーションに統合する


<h3>依存関係をセットアップする</h3><p>Auth0でJavaアプリケーションを統合するには、以下の依存関係を追加します：</p><ul><li><p><b>javax.servlet-api</b></p><p>：Java Servletsの作成を許可するライブラリーです。TomcatやGrettyのようなサーバー依存関係を追加する必要があります。どれを追加するかは自己判断です。詳細はサンプルコードをご覧ください。</p></li><li><p><b>auth0-java-mvc-commons</b>：サーバー側のMVC Webアプリ用にJavaでAuth0の使用を許可する<a href="https://github.com/auth0/auth0-java-mvc-common">Javaライブラリー</a>です。ユーザーを識別する<a href="https://auth0.com/docs/tokens">Auth0トークン</a>を最後に取得する過程で受け取った結果を認証、検証するために呼び出す必要のある認可URLを生成します。</p></li></ul><p>Gradleを使用している場合は、<code>build.gradle</code>に追加します：</p><p><pre><code>// build.gradle



compile 'javax.servlet:javax.servlet-api:3.1.0'

compile 'com.auth0:mvc-auth-commons:1.+'W

</code></pre>

</p><p>Mavenを使用している場合は、<code>pom.xml</code>に追加します：</p><p><pre><code>&lt;!-- pom.xml --&gt;



&lt;dependency&gt;

  &lt;groupId&gt;com.auth0&lt;/groupId&gt;

  &lt;artifactId&gt;mvc-auth-commons&lt;/artifactId&gt;

  &lt;version&gt;[1.0, 2.0)&lt;/version&gt;

&lt;/dependency&gt;

&lt;dependency&gt;

  &lt;groupId&gt;javax.servlet&lt;/groupId&gt;

  &lt;artifactId&gt;javax.servlet-api&lt;/artifactId&gt;

  &lt;version&gt;3.1.0&lt;/version&gt;

&lt;/dependency&gt;

</code></pre>

</p>

## Javaアプリケーションを構成する {{{ data-action="code" data-code="web.xml" }}}


<p>Javaアプリは、Auth0アカウントに対して認証するために、いくつかの情報を必要とします。サンプルではこの情報をデプロイメント記述子ファイル（<code>src/main/webapp/WEB-INF/web.xml</code>）から読み取っていますが、任意の場所に保存できます。</p><p>この情報は<b>auth0-java-mvc-commons</b>ライブラリーを構成するために使用され、ユーザーがアプリケーションにログインすることを可能にします。ライブラリーや各構成オプションの詳細情報については、<a href="https://github.com/auth0/auth0-java-mvc-common/blob/master/README.md">ライブラリーのドキュメント</a>をご覧ください。</p><h3>入力された属性をチェックする</h3><p>このサンプルを<b>［Download Sample（サンプルをダウンロード）］</b>ボタンでダウンロードした場合は、<code>domain</code>、<code>clientId</code>、<code>clientSecret</code>属性が自動的に入力されます。特にアカウントに複数のAuth0アプリケーションがある場合は、値が正しいことを確認してください。</p><h3>プロジェクト構造</h3><p><b>［Download Sample（サンプルをダウンロード）］</b>ボタンでダウンロードできるサンプルプロジェクトは以下の構造になっています：</p><p><pre><code>- src

-- main

---- java

------ com

-------- auth0

---------- example

------------ Auth0Filter.java

------------ AuthenticationControllerProvider.java

------------ HomeServlet.java

------------ CallbackServlet.java

------------ LoginServlet.java

------------ LogoutServlet.java

---- webapp

------ WEB-INF

-------- jsp

---------- home.jsp

-------- web.xml

- build.gradle

</code></pre>

</p><p>プロジェクトには単一のJSPがあります：<code>home.jsp</code>は、ログイン成功後にユーザーに関連付けられたトークンを表示し、ログアウトオプションを提供します。</p><p>プロジェクトはWebFilterを含みます：<code>Auth0Filter.java</code>は、保護された<code>/portal/*</code>パスへのユーザーアクセスを付与する前に、既存のトークンを確認します。トークンが存在しない場合、要求は<code>LoginServlet</code>へリダイレクトされます。</p><p>プロジェクトにはサーブレットも4つあります：</p><ul><li><p><code>LoginServlet.java</code>：ユーザーがログインしようとした時に発動します。<code>client_id</code>パラメーターと<code>domain</code>パラメーターを使って有効な認可URLを作成し、ユーザーをリダイレクトします。</p></li><li><p><code>CallbackServlet.java</code>：Callback URLへの要求をキャッチし、データを処理して資格情報を取得するサーブレットです。資格情報はログイン成功後、要求のHttpSessionに保存されます。</p></li><li><p><code>HomeServlet.java</code>：以前保存されたトークンを読み取り、<code>home.jsp</code>リソースで表示するサーブレットです。</p></li><li><p><code>LogoutServlet.java</code>：ユーザーがログアウトリンクをクリックすると発動します。ユーザーセッションを無効化し、<code>LoginServlet</code>でハンドリングされたログインページにユーザーをリダイレクトします。</p></li><li><p><code>AuthenticationControllerProvider.java</code>：<code>AuthenticationController</code>の単一インスタンスを作成・管理するためのものです。</p></li></ul><p></p>

## AuthenticationControllerを作成する {{{ data-action="code" data-code="AuthenticationControllerProvider.java#5:26" }}}


<p>ユーザー認証を可能にするために、<code>domain</code>、<code>clientId</code>、<code>clientSecret</code>を使って<code>auth0-java-mvc-commons</code> SDKから提供された<code>AuthenticationController</code>のインスタンスを作成します。サンプルでは、RS256非対称署名アルゴリズムを使って署名したトークンで使用するためのコンポーネントの構成方法が紹介されています。トークンの署名を検証するために使用された公開鍵を取得する<code>JwkProvider</code>が指定されています。その他の構成オプションについての詳細は、<a href="https://github.com/auth0/jwks-rsa-java">jwks-rsa-javaレポジトリ</a>をご覧ください。HS256を使用している場合は、<code>JwkProvider</code>を構成する必要はありません。</p><p><div class="alert-container" severity="default"><p><code>AuthenticationController</code>はコンテキストを一切保存せず、再使用を意図しています。不必要な作成はリソースの追加作成を招き、パフォーマンスに影響が出る可能性があります。</p></div></p>

## ログインにリダイレクトする {{{ data-action="code" data-code="LoginServlet.java#21:23" }}}


<p>アプリケーションは、ユーザーがログインできるように、<a data-contentfulid="67MpEy8zCywwI8YMkn5jy1-ja-JP">ユニバーサルログイン</a>ページへリダイレクトします。<code>AuthenticationController</code>インスタンスを使うと、<code>buildAuthorizeUrl(HttpServletRequest request</code>、<code>HttpServletResponse response</code>、<code>String redirectUrl)</code>メソッドを呼び出すことでリダイレクトURLを生成できます。リダイレクトURLは、Auth0アプリケーションの<b>［Allowed Callback URLs（許可されているコールバックURL）］</b>に追加されたURLである必要があります。</p>

## トークンの処理 {{{ data-action="code" data-code="CallbackServlet.java#16:37" }}}


<p>ユーザーがログインした後、結果はGET要求またはPOST HTTP要求経由で<code>CallbackServlet</code>で受信されます。（初期設定として）Authorization Code Flowを使用しているため、GET要求が送信されます。ライブラリーを暗黙フロー用に構成している場合は、代わりにPOST要求が送信されます。</p><p>認可URLを<code>AuthenticationController</code>で生成することにより、要求はライブラリーで以前設定した呼び出しコンテキストを保持します。コントローラーに渡されると、有効な<code>Tokens</code>インスタンスまたは不具合を特定するExceptionが返ってきます。呼び出しに成功した場合、後でアクセスするために資格情報をどこかに保存しておく必要があります。ライブラリーに含まれる<code>SessionsUtils</code>クラスを使って、要求の<code>HttpSession</code>を使用できます。</p><p><div class="alert-container" severity="default"><p>トークンを要求した時刻と受け取った<code>expiresIn</code>値は保存することを推奨します。そうすることで、次回トークンを使用する時に、すでに有効期限が切れているか、または引き続き有効かを確認できます。このサンプルでは検証をスキップします。</p></div></p>

## ホームページを表示する {{{ data-action="code" data-code="HomeServlet.java#4:14" }}}


<p>ユーザーは認証される（トークンが存在する）と、<code>Auth0Filter</code>によって保護されたリソースへのアクセスを許可されます。<code>HomeServlet</code>で要求セッションからトークンが取得され、<code>userId</code>属性として設定されることで、JSPコードから使用できるようになります。</p>

## ログアウトを処理する {{{ data-action="code" data-code="LogoutServlet.java#13:30" }}}


<p>ログアウトを適切に処理するには、セッションを消去し、ユーザーをAuth0からログアウトさせる必要があります。この処理は、サンプルアプリケーションの<code>LogoutServlet</code>で行われます。</p><p>まず、<code>request.getSession().invalidate()</code>を呼び出してセッションを消去します。それから、<code>returnTo</code>クエリパラメーターを含めることを念頭に置きつつ、ログアウトURLを構築します。ユーザーはログアウト後にこのURLにリダイレクトされます。最後にレスポンスをログアウトURLにリダイレクトします。</p>

## サンプルを実行する


<p>ターミナルからサンプルを実行するには、ディレクトリをプロジェクトのルートフォルダーに変更して以下のラインを実行します：</p><p><code>./gradlew clean app</code></p><p>数秒後、アプリケーションが<code>http://localhost:3000/</code>でアクセスできるようになります。保護されたリソース（<a href="http://localhost:3000/portal/home">http://localhost:3000/portal/home</a>）にアクセスしてみて、<code>Auth0Filter</code>によるAuth0ログインページへのリダイレクト方法を観察します。ウィジェット が、<a href="https://manage.auth0.com/#/">Dashboard</a>でこのアプリケーションに定義したソーシャル接続とデータベース接続をすべて表示します。</p><img src="//images.ctfassets.net/cdy7uua7fh8z/7L6lZ6xCi1L7sJBFZUPb9g/1012d2df62dd58a943f75092452f91d2/Login_Screen_-_Japanese.png" alt="null" /><p>認証成功後、ホームページのコンテンツを見られるようになります。</p><img src="//images.ctfassets.net/cdy7uua7fh8z/FzK3jxfSGoeIDYQamxnJl/6b608e39ff39e044644193cfd2ee0f69/java-step-9-2.png" alt="null" /><p>ホームページ右上の<b>［logout（ログアウト）］</b>ボタン をクリックしてログアウトします。</p>
