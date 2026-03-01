---
title: Spring Bootアプリケーションに認可を追加する
description: このガイドは、新規または既存のSpring BootアプリケーションにAuth0を統合する方法を説明します。
interactive:  true
files:
 - files/application
 - files/SecurityConfig
 - files/Message
 - files/APIController
github:
  path: 01-Authorization-MVC
locale: ja-JP
---

# Spring Bootアプリケーションに認可を追加する


<p>Auth0を使用すると、アプリケーションにすばやく認可を追加することができます。このガイドは、新規または既存のSpring BootアプリケーションにAuth0を統合する方法を説明します。</p><p>Auth0 DashboardでAPIをまだ作成していない場合は、対話型のセレクターを使ってAuth0 APIを新規作成します。そうでない場合は、統合したいプロジェクトを表す既存のAPIを選択します。</p><p>Auth0 Dashboardを使って初めてAPIをセットアップする場合には、<a href="https://auth0.com/docs/get-started/auth0-overview/set-up-apis" target="_blank" >使用の開始ガイド</a>を確認してください。</p><p>それぞれのAuth0 APIにはAPI識別子があり、アプリケーションにアクセストークンの検証で使用されます。</p><p><div class="alert-container" severity="default"><p><b>Auth0を初めてご利用ですか？</b><a href="https://auth0.com/docs/overview" target="_blank" >Auth0の仕組み</a>と、OAuth 2.0フレームワークを用いた<a href="https://auth0.com/docs/api-auth" target="_blank" >API認証と認可の実装</a>について説明します。</p></div></p><p></p>

## アクセス許可を定義する


<p>アクセス許可は、ユーザーの代わりに、提供されたアクセストークンを使ってどのようにしてリソースにアクセスできるのかを定義できるようにします。たとえば、ユーザーがマネージャーアクセスレベルを持つ場合には、<code>messages</code>リソースに対して読み出しアクセスを付与し、管理者アクセスレベルを持つ場合には、書き込みアクセスを付与することができます。</p><p>Auth0 Dashboardの<a href="https://manage.auth0.com/dashboard/us/dev-1-2s2aq0/apis" target="_blank" rel="noreferrer noopener">［APIs］</a>セクションにある<b>［Permissions（権限）］</b>ビューで使用可能なアクセス許可を定義することができます。</p><img src="//images.ctfassets.net/cdy7uua7fh8z/1s3Yp5zqJiKiSWqbPSezNO/acef814282795bef6921535f044f96e9/Quickstarts_API.png" alt="［Auth0 Dashboard］>［Applications（アプリケーション）］>［APIs］>［Specific API（特定のAPI］>［Permissions（権限）］タブ" /><p><div class="alert-container" severity="default"><p>以下の例では<code>read:messages</code>スコープを使用します。</p></div></p>

## サンプルプロジェクトを構成する {{{ data-action="code" data-code="application.yml#1:6" }}}


<p>サンプルプロジェクトは<code>/src/main/resources/application.yml</code>ファイルを使用し、これをAPIに対して正しいAuth0<b>ドメイン</b>と<b>API識別子</b>を使用するように構成します。このページからコードをダウンロードすると、自動的に構成されます。GitHubから例を複製する場合は、ご自身で入力する必要があります。</p><p></p>

## 依存関係をインストールする {{{ data-action="code" data-code="application.yml#1:6" }}}


<p>Gradleを使用している場合、<a href="https://docs.spring.io/spring-boot/docs/current/gradle-plugin/reference/html/" target="_blank" rel="noreferrer noopener">Spring Boot Gradleプラグイン</a>と<a href="https://docs.spring.io/dependency-management-plugin/docs/current/reference/html/" target="_blank" rel="noreferrer noopener">Dependency Managementプラグイン</a>を使って必要な依存関係を追加し、依存関係のバージョンを解決することができます：</p><p><pre><code>// build.gradle



    plugins {

        id 'java'

        id 'org.springframework.boot'

        version '3.1.5'

        id 'io.spring.dependency-management'

        version '1.1.3'

    }



    dependencies {

        implementation 'org.springframework.boot:spring-boot-starter-web'

        implementation 'com.okta.spring:okta-spring-boot-starter:3.0.5'

    }

</code></pre>

</p><p>Mavenを使用している場合は、Springの依存関係を<code>pom.xml</code>ファイルに追加します：</p><p><pre><code class="language-xml">// pom.xml



&lt;parent&gt;

 &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;

 &lt;artifactId&gt;spring-boot-starter-parent&lt;/artifactId&gt;

 &lt;version&gt;3.1.5&lt;/version&gt;

 &lt;relativePath/&gt;

&lt;/parent&gt;

&lt;dependencies&gt;

 &lt;dependency&gt;

 &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;

 &lt;artifactId&gt;spring-boot-starter-web&lt;/artifactId&gt;

 &lt;/dependency&gt;

 &lt;dependency&gt;

 &lt;groupId&gt;com.okta.spring&lt;/groupId&gt;

 &lt;artifactId&gt;okta-spring-boot-starter&lt;/artifactId&gt;

 &lt;version&gt;3.0.5&lt;/version&gt;

 &lt;/dependency&gt;

&lt;/dependencies&gt;

</code></pre>

</p>

## リソースサーバーを構成する {{{ data-action="code" data-code="SecurityConfig.java" }}}


<p>アプリケーションをリソースサーバーとして構成し、JWTを検証するには、<code>SecurityFilterChain</code>のインスタンスを提供するクラスを作成し、<code>@Configuration</code>の注釈を追加します。</p><h3>APIエンドポイントを保護する</h3><p>以下に示されたルートは次の要求で使用することができます：</p><ul><li><p><code>GET /api/public</code>：認証を必要としない要求に使用できる</p></li><li><p><code>GET /api/private</code>：追加スコープのないアクセストークンを含む認証された要求に使用できる</p></li><li><p><code>GET /api/private-scoped</code>：<code>read:messages</code>スコープが付与されたアクセストークンを含む認証された要求に使用できる</p></li></ul><p>以下の例は、<code>SecurityConfig</code>クラスの<code>filterChain()</code>メソッドで指定された<code>HttpSecurity</code>オブジェクトを使用して、APIメソッドのセキュリティを確保する方法を示します。ルートマッチャーは必要な認可レベルに基づいてアクセスを制限します。</p><p><div class="alert-container" severity="default"><p>デフォルトで、Spring SecurityはJWTの<code>scope</code>クレームで、クレームごとに<code>GrantedAuthority</code>を作成します。このスコープでは、<code>hasAuthority(&quot;SCOPE_read:messages&quot;)</code>メソッドを使用して、<code>read:messages</code>スコープを含む有効なJWTへのアクセスを制限することができます。</p></div></p>

## ドメインオブジェクトを作成する {{{ data-action="code" data-code="Message.java#1:4" }}}


<p>エンドポイントがJSONを返すには、Javaレコードを使用することができます。このオブジェクトのメンバー変数は、JSONのキー値にシリアル化されます。<code>Message</code>と呼ばれる新しいレコードを、API呼び出し中に返すサンプルドメインオブジェクトとして作成します。</p>

## APIコントローラーを作成する {{{ data-action="code" data-code="APIController.java" }}}


<p><code>APIController</code>という名前の新しいクラスを作成し、エンドポイントへの要求を処理します。<code>APIController</code>には、<a href="https://auth0.com/docs/quickstart/backend/java-spring-security5/interactive#configure-the-resource-server" target="_blank" >APIエンドポイントを保護する</a>セクションで定義されるように、3つのルートがあります。たとえば、<code>@CrossOrigin</code>の注釈からすべてのオリジンを許可します。実際のアプリケーションでは、ユースケースに対して<code>CORS</code>を構成する必要があります。</p>

## アプリケーションを実行する {{{ data-action="code" data-code="APIController.java" }}}


<p>サンプルプロジェクトを構築し実行するには、<code>bootRun</code> Gradleタスクを実行します。</p><p>LinuxまたはmacOS：</p><p><pre><code class="language-bash">./gradlew bootRun

</code></pre>

</p><p>Windows：</p><p><pre><code class="language-bash">gradlew.bat bootRun

</code></pre>

</p><p>Mavenと<a href="https://docs.spring.io/spring-boot/docs/current/reference/html/build-tool-plugins-maven-plugin.html" target="_blank" rel="noreferrer noopener">Spring Boot Mavenプラグイン</a>で独自のアプリケーションを構成している場合は、<code>spring-boot:run</code>ゴールを実行することができます。</p><p>LinuxまたはmacOS：</p><p><pre><code class="language-bash">mvn spring-boot:run

</code></pre>

</p><p>Windows：</p><p><pre><code class="language-bash">mvn.cmd spring-boot:run

</code></pre>

</p><p><div class="checkpoint">Spring Boot API手順7「チェックポイント」 <div class="checkpoint-default"><p>サンプルアプリケーションは<code>http://localhost:3010/</code>で入手できます。「<a href="https://auth0.com/docs/quickstart/backend/java-spring-security5/02-using" target="_blank" >APIの使用</a>」の記事でAPIをテストおよび使用する方法についてお読みください。</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>アプリケーションが正常に起動しなかった場合は以下を行います。</p><ul><li><p><a href="https://auth0.com/docs/quickstart/backend/java-spring-security5/03-troubleshooting" target="_blank" >トラブルシューティング</a>のセクションを使用して構成を確認します。</p></li></ul><p>まだお困りですか？当社提供の<a href="https://auth0.com/docs" target="_blank" >ドキュメント</a>または<a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">コミュニティページ</a>で詳しい情報を確認してください。</p></div>

  </div></p>
