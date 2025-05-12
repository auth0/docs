---
title: Spring Webアプリケーションにログインを追加する
description: このガイドでは、Spring BootアプリケーションにAuth0 Spring Boot SDKを使ってAuth0を統合する方法を説明します。
interactive:  true
files:
 - files/application
 - files/SecurityConfig
 - files/index
 - files/HomeController
 - files/SecurityConfigWithLogout
github:
  path: mvc-login
locale: ja-JP
---

# Spring Webアプリケーションにログインを追加する


<p><div class="alert-container" severity="default"><h3>Spring WebFluxを使用する？</h3><p>このチュートリアルでは<a href="https://docs.spring.io/spring/docs/current/spring-framework-reference/web.html" target="_blank" rel="noreferrer noopener">Spring MVC</a>を使用します。<a href="https://docs.spring.io/spring/docs/current/spring-framework-reference/web-reactive.html#spring-web-reactive" target="_blank" rel="noreferrer noopener">Spring WebFlux</a>を使用している場合、認証を追加する手順は似ていますが、実装の詳細は一部異なります。<a href="https://github.com/auth0-samples/auth0-spring-boot-login-samples/tree/master/webflux-login" target="_blank" rel="noreferrer noopener">Spring Boot WebFluxサンプルコード</a>で、Auth0とSpring Boot WebFluxアプリケーションの統合方法を確認してください。</p></div></p><p></p>

## Auth0を構成する


<p>Auth0のサービスを利用するには、Auth0 Dashboadでセットアップしたアプリケーションが必要です。Auth0アプリケーションは、開発中のプロジェクトに対してどのように認証が動作して欲しいかを構成する場所です。</p><h3>アプリケーションを構成する</h3><p>インタラクティブセレクターを使ってAuth0アプリケーションを新規作成するか、統合したいプロジェクトを表す既存のアプリケーションを選択します。Auth0の全てのアプリケーションには英数字からなる一意のクライアントIDが割り当てられており、アプリケーションのコードがSDKを通じてAuth0 APIを呼び出す際に使用されます。</p><p>このクイックスタートを使って構成されたすべての設定は、<a href="https://manage.auth0.com/#/" target="_blank" rel="noreferrer noopener">Dashboard</a>のアプリケーションに自動更新を行います。今後、アプリケーションの管理はDashboardで行えます。</p><p>代わりに完了済みの構成を見てみたい場合は、サンプルアプリケーションをご覧ください。</p><h3>Callback URLを構成する</h3><p>Callback URLとは、Auth0がユーザーを認証後にリダイレクトするアプリケーション内URLです。設定されていない場合、ユーザーはログイン後にアプリケーションに戻りません。</p><p><div class="alert-container" severity="default"><p>サンプルプロジェクトに沿って進めている場合には、次の値に設定します：</p><p><code>http://localhost:3000/login/oauth2/code/okta</code></p></div></p><h3>ログアウトURLを構成する</h3><p>ログアウトURLとは、Auth0がユーザーをログアウト後にリダイレクトするアプリケーション内URLです。設定されていない場合、ユーザーはアプリケーションからログアウトできず、エラーを受け取ります。</p><p><div class="alert-container" severity="default"><p>サンプルプロジェクトに沿って進めている場合には、次の値に設定します：</p><p><code>http://localhost:3000</code></p><p></p></div></p>

## Sprint Bootアプリケーションを構成する


<h3>Spring依存関係を追加する</h3><p>Spring BootアプリケーションをAuth0と統合するには、<a href="https://github.com/okta/okta-spring-boot/" target="_blank" rel="noreferrer noopener">Okta Spring Boot Starter</a>をアプリケーションの依存関係に含めます。</p><p><div class="alert-container" severity="default"><p>このガイドでは、ビューレイヤー用に<a href="https://www.thymeleaf.org/" target="_blank" rel="noreferrer noopener">Thymeleaf</a>と<a href="https://github.com/thymeleaf/thymeleaf-extras-springsecurity" target="_blank" rel="noreferrer noopener">Spring Security統合モジュール</a>を使用しています。別の表示技術を使用している場合、Spring Securityの構成とコンポーネントはそのまま同じです。</p></div></p><p>Gradleを使用している場合は、以下のようにこれらの依存関係を含めることができます。</p><p><pre><code class="language-javascript">plugins {

 id 'java'

 id 'org.springframework.boot' version '3.1.4'

 id 'io.spring.dependency-management' version '1.1.3'

}



implementation 'com.okta.spring:okta-spring-boot-starter:3.0.5'

implementation 'org.springframework.boot:spring-boot-starter-web'

implementation 'org.springframework.boot:spring-boot-starter-thymeleaf'

implementation 'org.thymeleaf.extras:thymeleaf-extras-springsecurity6'

implementation 'nz.net.ultraq.thymeleaf:thymeleaf-layout-dialect'

</code></pre>

</p><p>Mavenを使用している場合：</p><p><pre><code class="language-xml">&lt;parent&gt;

 &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;

 &lt;artifactId&gt;spring-boot-starter-parent&lt;/artifactId&gt;

 &lt;version&gt;3.1.4&lt;/version&gt;

 &lt;relativePath/&gt;

&lt;/parent&gt;



&lt;dependencies&gt;

 &lt;dependency&gt;

&lt;groupId&gt;com.okta&lt;/groupId&gt;

&lt;artifactId&gt;okta-spring-boot-starter&lt;/artifactId&gt;

&lt;version&gt;3.0.5&lt;/version&gt;

 &lt;/dependency&gt;

 &lt;dependency&gt;

&lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;

&lt;artifactId&gt;spring-boot-starter-web&lt;/artifactId&gt;

 &lt;/dependency&gt;

 &lt;dependency&gt;

&lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;

&lt;artifactId&gt;spring-boot-starter-oauth2-client&lt;/artifactId&gt;

 &lt;/dependency&gt;

 &lt;dependency&gt;

&lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;

&lt;artifactId&gt;spring-boot-starter-thymeleaf&lt;/artifactId&gt;

 &lt;/dependency&gt;

 &lt;dependency&gt;

&lt;groupId&gt;org.thymeleaf.extras&lt;/groupId&gt;

&lt;artifactId&gt;thymeleaf-extras-springsecurity6&lt;/artifactId&gt;

 &lt;/dependency&gt;

 &lt;dependency&gt;

&lt;groupId&gt;nz.net.ultraq.thymeleaf&lt;/groupId&gt;

&lt;artifactId&gt;thymeleaf-layout-dialect&lt;/artifactId&gt;

 &lt;/dependency&gt;

&lt;/dependencies&gt;

</code></pre>

</p>

## Spring Securityを構成する {{{ data-action="code" data-code="application.yml" }}}


<p>Okta Spring Boot Starterでは、Auth0でアプリケーションを簡単に構成できます。以下のサンプルでは<code>application.yml</code>ファイルを使用していますが、プロパティファイルや他の<a href="https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#boot-features-external-config" target="_blank" rel="noreferrer noopener">サポートされる表出化メカニズム</a>を使用することもできます。</p><p><pre><code>#src/main/resources/application.yml



okta:

  oauth2:

    issuer: https://${account.namespace}/

    client-id: ${account.clientId}

    client-secret: ${account.clientSecret}



#The sample and instructions above for the callback and logout URL configuration use port 3000.

#If you wish to use a different port, change this and be sure your callback and logout URLs are

#configured with the correct port.

server:

  port: 3000

</code></pre>

</p>

## アプリケーションにログインを追加する {{{ data-action="code" data-code="SecurityConfig.java" }}}


<p>Auth0でユーザーログインを有効にするには、<a href="https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/web/SecurityFilterChain.html" target="_blank" rel="noreferrer noopener">SecurityFilterChain</a>を登録するクラスを作成し、<code>@Configuration</code>の注釈を追加します。</p><p><div class="alert-container" severity="default"><p>すべてまたは特定のパスで認証を必須にするために、<a href="https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/config/annotation/web/builders/HttpSecurity.html" target="_blank" rel="noreferrer noopener">HttpSecurity</a>インスタンスを構成することができます。たとえば、ホームページを除くすべてのパスで認証を必須にするには、以下のようにします：</p></div></p><p><pre><code class="language-java">http.authorizeHttpRequests(authorize -&gt; authorize

        .requestMatchers(&quot;/&quot;).permitAll()

        .anyRequest().authenticated()

    );

</code></pre>

</p>

## 表紙ページを追加する {{{ data-action="code" data-code="index.html" }}}


<p>Okta Spring Boot Starterは以前に定義したクライアント構成を使って、ユーザーがアプリケーションの<code>/oauth2/authorization/okta</code>パスにアクセスしたときのログインを処理します。これを使用して、アプリケーションでログインリンクを作成することができます。</p><p>このページは、ユーザー認証時にユーザー属性を返します。テンプレートの<code>/logout</code>リンクを使用して、ログアウト機能を実装します。</p>

## コントローラーを追加する {{{ data-action="code" data-code="HomeController.java" }}}


<p>受信要求を処理するようにコントロールを作成します。このコントローラは<code>index.html</code>ページをレンダリングします。ユーザー認証時に、アプリケーションはユーザーのプロファイル情報の属性を取得し、ページをレンダリングします。</p><p><div class="checkpoint">spring boot手順6「チェックポイント」 <div class="checkpoint-default"><p>ログインリンクをクリックすると、アプリケーションによって<a href="https://auth0.com/universal-login" target="_blank" >Auth0ユニバーサルログイン</a>ページにリダイレクトされ、ユーザー名とパスワードまたはソーシャルプロバイダーを使ってログインまたはサインアップできるようになったことを確認します。</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"></div>

  </div></p><img src="//images.ctfassets.net/cdy7uua7fh8z/7L6lZ6xCi1L7sJBFZUPb9g/1012d2df62dd58a943f75092452f91d2/Login_Screen_-_Japanese.png" alt="null" /><p><div class="alert-container" severity="default"><p>Auth0は、Googleソーシャルプロバイダーを新しいテナントでデフォルトで有効にし、<a href="https://auth0.com/docs/connections/identity-providers-social" target="_blank" >ソーシャルIDプロバイダー</a>でログインテストを実施するための開発者キーを提供します。ただし、これらの開発者キーにはいくつかの制限が設けられており、これによってアプリケーションが異なる動作をする場合があります。この動作の様子と修正方法については、「<a href="https://auth0.com/docs/connections/social/devkeys#limitations-of-developer-keys" target="_blank" >Auth0開発者キーを使ってソーシャル接続をテストする</a>」ドキュメントを参照してください。</p></div></p>

## アプリケーションにログアウトを追加する {{{ data-action="code" data-code="SecurityConfigWithLogout.java" }}}


<p>アプリケーションにログインできるようになったら、<a href="https://auth0.com/docs/logout/guides/logout-auth0" target="_blank" >ログアウトする方法</a>が必要です。デフォルトで、ログアウトが有効になると、Spring Securityはユーザーをアプリケーションからログアウトし、セッションを消去します。Auth0から正常にログアウトするには、<code>LogoutHandler</code>でユーザーを<a href="https://auth0.com/docs/api/authentication?javascript#logout" target="_blank" >Auth0ログアウトエンドポイント</a>（<code>https://{yourDomain}/v2/logout</code>）にリダイレクトした直後に、アプリケーションにリダイレクトします。</p><p><code>SecurityConfig</code>クラスで<code>LogoutHandler</code>を指定すると、Auth0ログアウトエンドポイントにリダイレクトされ、ログアウトハンドラを追加するように<code>HttpSecurity</code>を構成します。</p><p><div class="checkpoint">spring boot手順7「チェックポイント」 <div class="checkpoint-default"><p>ログアウトリンクをクリックすると、「Settings（設定）」にある［Allowed Logout URLs（許可されているログアウトURL）］のいずれかに指定されたアドレスにリダイレクトされ、アプリケーションにログインされなくなります。</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"></div>

  </div></p>
