---
title: Java EEアプリケーションにログインを追加する
description: このチュートリアルは、Java EE Webアプリケーションにユーザーログインを追加する方法について説明します。
interactive:  true
files:
 - files/src/main/webapp/WEB-INF/web
 - files/src/main/java/com/auth0/example/security/Auth0AuthenticationConfig
 - files/src/main/java/com/auth0/example/web/LoginServlet
 - files/src/main/java/com/auth0/example/web/HomeServlet
 - files/src/main/java/com/auth0/example/web/LogoutServlet
github:
  path: https://github.com/auth0-samples/auth0-java-ee-sample/tree/master/01-Login
locale: ja-JP
---

# Java EEアプリケーションにログインを追加する


<p>このチュートリアルは、Java EE Webアプリケーションにユーザーログインを追加する方法について説明します。ログインして、アカウント用に構成された例を参考にこのクイックタートに従うことをお勧めします。</p><h2>システム要件</h2><p>このチュートリアルとサンプルプロジェクトは次を使用してテストが完了しています：</p><ul><li><p>Java 11</p></li></ul><p></p><p></p>

## Auth0を構成する


<h3>アプリケーションキーを取得する</h3><p>Auth0にサインアップしたときには、新しいアプリケーションが作成されたか、すでに作成済みであった可能性があります。Auth0と通信するには、アプリケーションについての詳細が必要になります。これらの詳細は、Auth0 Dashboardの<a href="https://manage.auth0.com/#/applications">アプリケーションの設定</a>セクションで入手できます。</p><img src="//images.ctfassets.net/cdy7uua7fh8z/1NtemqhRTHLFgWkGyAVSC6/ae66506a56ffab891e8a36e1344e6376/uwp.png" alt="" /><p>以下の情報が必要です。</p><ul><li><p><b>Domain (ドメイン)</b></p></li><li><p><b>Client ID（クライアントID）</b></p></li><li><p><b>Client Secret（クライアントシークレット）</b></p></li></ul><p><div class="alert-container" severity="default"><p>このページの上部からサンプルをダウンロードした場合は、これらの詳細が入力されます。</p></div></p><h3>Callback URLを構成する</h3><p>Callback URLはアプリケーション内にあるURLで、Auth0は認証後にユーザーをここにリダイレクトします。アプリのCallback URLは<a href="https://manage.auth0.com/#/applications">アプリケーションの設定</a>にある<b>［Allowed Callback URLs（許可されているコールバックURL）］</b>フィールドに追加する必要があります。このフィールドが設定されていない場合、ユーザーはアプリケーションにログインできず、エラーが返されます。</p><p><div class="alert-container" severity="default"><p>このページの上部からダウンロードしたサンプルプロジェクトに沿って進めている場合には、<b>［Allowed Callback URLs（許可されているコールバックURL）］</b>フィールドに<code>http://localhost:3000/callback</code>を追加する必要があります。</p></div></p><h3>ログアウトURLを構成する</h3><p>ログアウトURLはアプリケーション内にあるURLで、Auth0は認可サーバーからのログアウト後にユーザーをここに戻すことができます。これは、<code>returnTo</code>クエリパラメーターで指定されます。アプリのログアウトURLは<a href="https://manage.auth0.com/#/applications">アプリケーションの設定</a>にある<b>［Allowed Logout URLs（許可されているログアウトURL）］</b>フィールドに追加する必要があります。このフィールドが設定されていない場合、ユーザーはアプリケーションからログアウトできず、エラーが返されます。</p><p><div class="alert-container" severity="default"><p>このページの上部からダウンロードしたサンプルプロジェクトに沿って進めている場合には、<b>［Allowed Logout URLs（許可されているログアウトURL）］</b>フィールドに<code>http://localhost:3000/</code>を追加する必要があります。</p></div></p><p></p>

## JavaEEにAuth0の使用を構成する {{{ data-action="code" data-code="src/main/webapp/WEB-INF/web.xml" }}}


<h3>依存関係をセットアップする</h3><p>Java EEアプリケーションをAuth0と統合するには、以下の依存関係を追加します。</p><ul><li><p><b>javax.javaee-api</b>：Java EE 8を使ってアプリケーションを作成するために必要なJava EE 8 APIです。実際の統合はアプリケーションコンテナーが提供するため、WARファイルに含める必要はありません。</p></li><li><p><b>javax.security.enterprise</b>：EEアプリケーションでセキュリティ上の懸念に対処できるようにするJava EE 8 Security APIです。<code>javax.javaee-api</code>の依存関係と同様に、統合はアプリケーションコンテナーが提供するため、WARファイルには含まれません。</p></li><li><p><b>auth0-java-mvc-commons</b>：<a href="https://github.com/auth0/auth0-java-mvc-common">Auth0 Java MVC SDK</a>は、サーバー側のMVC WebアプリケーションにAuth0とJavaを使用できるようにします。これは、アプリケーションがAuth0を使ったユーザー認証で呼び出すべき認可URLを生成します。</p></li></ul><p>Mavenを使用している場合は、次の依存関係を<code>pom.xml</code>に追加します：<code> </code></p><p><code></code><pre><code class="language-xml">&lt;!-- pom.xml --&gt;

&lt;dependency&gt;

 &lt;groupId&gt;com.auth0&lt;/groupId&gt;

 &lt;artifactId&gt;mvc-auth-commons&lt;/artifactId&gt;

 &lt;version&gt;[1.0, 2.0)&lt;/version&gt;

&lt;/dependency&gt;

&lt;dependency&gt;

 &lt;groupId&gt;javax&lt;/groupId&gt;

 &lt;artifactId&gt;javaee-api&lt;/artifactId&gt;

 &lt;version&gt;8.0.1&lt;/version&gt;

 &lt;scope&gt;provided&lt;/scope&gt;

&lt;/dependency&gt;

&lt;dependency&gt;

 &lt;groupId&gt;javax.security.enterprise&lt;/groupId&gt;

 &lt;artifactId&gt;javax.security.enterprise-api&lt;/artifactId&gt;

 &lt;version&gt;1.0&lt;/version&gt;

 &lt;scope&gt;provided&lt;/scope&gt;

&lt;/dependency&gt;

</code></pre>

</p><p>Gradleを使用している場合は、次を<code>build.gradle</code>に追加します：</p><p><pre><code class="language-powershell">// build.gradle



providedCompile 'javax:javaee-api:8.0.1'

providedCompile 'javax.security.enterprise:javax.security.enterprise-api:1.0'

implementation 'com.auth0:mvc-auth-commons:1. '

</code></pre>

</p><h3>Java EEアプリケーションを構成する</h3><p><div class="alert-container" severity="default"><p>このチュートリアルに付属のサンプルはJSPを使用して作成され、<a href="https://wildfly.org/">WildFly</a>アプリケーションサーバーでテストが完了しています。他のアプリケーションコンテナーや技術を使用して作業する場合には、一部の手順を調整する必要があるかもしれません。</p></div></p><p>Java EEアプリケーションは、Auth0アプリケーションを使ってユーザーを認証するために、いくつかの情報を必要とします。この情報の保管にはデプロイメント記述子である<code>web.xml</code>ファイルを使用できますが、別の安全な場所に保管することもできます。</p><p>この情報は、ユーザーがアプリケーションにログインできるように、<b>auth0-java-mvc-commons</b>ライブラリーを構成するために使用されます。ライブラリーとその構成オプションについては、ライブラリーの<a href="https://github.com/auth0/auth0-java-mvc-common/blob/master/README.md">README</a>を参照してください。</p><p><div class="tablew"><table class="table"><thead>

<tr>

<th>**入力済みの属性を確認する**</th>

</tr>

</thead>

<tbody>

<tr>

<td>このサンプルを__［Download Sample（サンプルをダウンロード）］__ボタンでダウンロードした場合は、<code>domain</code>、<code>clientId</code>、<code>clientSecret</code>の属性が自動的に入力されます。アカウントに複数のAuth0アプリケーションがある場合は特に、値が正しいことを確認してください。</td>

</tr>

</tbody>

</table></div></p><p></p>

## Java EE Securityを構成する {{{ data-action="code" data-code="src/main/java/com/auth0/example/security/Auth0AuthenticationConfig.java" }}}


<p>Java EE 8 Security APIには新たに<code>HttpAuthenticationMechanism</code>インターフェイスが搭載され、アプリケーションがユーザーの資格情報を取得できるようにしています。Basic認証とフォームベースの認証にはデフォルトの実装があり、カスタム認証ストラテジーを構成しやすくしています。</p><p>Auth0を使用して認証するには、以下のインターフェイスをカスタムで実装します。</p><ul><li><p>HttpAuthenticationMechanism：Auth0から戻されるユーザーの認証ワークフローを処理します（<a href="https://javaee.github.io/javaee-spec/javadocs/javax/security/enterprise/authentication/mechanism/http/HttpAuthenticationMechanism.html">JavaDoc</a>）。</p></li><li><p>IdentityStore：ユーザーの資格情報を検証します（<a href="https://javaee.github.io/javaee-spec/javadocs/javax/security/enterprise/identitystore/IdentityStore.html">JavaDoc</a>）。</p></li><li><p>CallerPrincipal：現在のHTTP要求の呼び出し元プリンシパルを表します（<a href="https://javaee.github.io/javaee-spec/javadocs/javax/security/enterprise/CallerPrincipal.html">JavaDoc</a>）。</p></li><li><p>Credential：呼び出し元が認証に使用する資格情報を表します（<a href="https://javaee.github.io/javaee-spec/javadocs/javax/security/enterprise/credential/Credential.html">JavaDoc</a>）。</p></li></ul><p>まず、アプリケーションがAuth0設定を使用できるように、@ApplicationScoped Beanを作成してWebコンテキストから値を取得し、getterを通して利用できるようにします。</p><p>次に、現在の要求の呼び出し元を表すカスタムの<code>CallerPrincipal</code>を作成します：</p><p><pre><code class="language-javascript">// src/main/java/com/auth0/example/security/Auth0JwtPrincipal.java



public class Auth0JwtPrincipal extends CallerPrincipal {

    private final DecodedJWT idToken;



    Auth0JwtPrincipal(DecodedJWT idToken) {

        super(idToken.getClaim(&quot;name&quot;).asString());

        this.idToken = idToken;

    }



    public DecodedJWT getIdToken() {

        return this.idToken;

    }

}

</code></pre>

</p><p>これで、ユーザーの資格情報を表すために使用されるカスタムの<code>Credential</code>が実装できるようになりました。これには、プリンシパルについての情報が保管されます：</p><p><pre><code class="language-javascript">// src/main/java/com/auth0/example/security/Auth0JwtCredential.java



class Auth0JwtCredential implements Credential {

    private Auth0JwtPrincipal auth0JwtPrincipal;



    Auth0JwtCredential(String token) {

        DecodedJWT decodedJWT = JWT.decode(token);

        this.auth0JwtPrincipal = new Auth0JwtPrincipal(decodedJWT);

    }



    Auth0JwtPrincipal getAuth0JwtPrincipal() {

        return auth0JwtPrincipal;

    }

}

</code></pre>

</p><p>これで、呼び出し元プリンシパルと資格情報を表すクラスが定義できました。次に、<code>IdentityStore</code>のカスタム実装を作成します。このクラスはユーザー資格情報の検証に使用されます。</p><p><pre><code class="language-javascript">// src/main/java/com/auth0/example/security/Auth0JwtIdentityStore.java



@ApplicationScoped

public class Auth0JwtIdentityStore implements IdentityStore {



    @Override

    public CredentialValidationResult validate(final Credential credential) {

        CredentialValidationResult result = CredentialValidationResult.NOT_VALIDATED_RESULT;

        if (credential instanceof Auth0JwtCredential) {

            Auth0JwtCredential auth0JwtCredential = (Auth0JwtCredential) credential;

            result = new CredentialValidationResult(auth0JwtCredential.getAuth0JwtPrincipal());

        }

        return result;

    }

}

</code></pre>

</p><p><code>credential</code>が<code>Auth0Credential</code>の場合はユーザーの呼び出しが認証され有効であるため、正常として、資格情報を使って作成された<code>CredentialValidationResult</code>が返されます。<code>Auth0Credential</code>でない場合には、<code>CredentialValidationResult.NOT_VALIDATED_RESULT</code>が返されます。</p><p>これらのすべてを使用する<code>HttpAuthenticationMechanism</code>インターフェイスを実装する前に、Beanを作成して、Auth0 Java MVC SDKにある構成済みの<code>AuthenticationController</code>インスタンスが提供されるようにします。<code>AuthenticationController</code>はユーザーがログインする認可URLの構築と、ユーザーを認証するトークン交換の処理に使用されます。</p><ul><li><p>Auth0アプリケーションに<b>RS256署名アルゴリズム</b>（新しいAuth0アプリケーション作成時のデフォルト）の使用が構成されている場合には、<code>JwkProvider</code>を構成して、トークン署名の検証に使われる公開鍵を取得するようにします。その他の構成オプションについては、<a href="https://github.com/auth0/jwks-rsa-java">jwks-rsa-javaレポジトリ</a>を参照してください。</p></li><li><p>Auth0アプリケーションに<b>HS256署名アルゴリズム</b>の使用が構成されている場合には、<code>JwkProvider</code>を構成する必要はありません。</p></li></ul><p><div class="alert-container" severity="default"><p>使用可能な署名アルゴリズムについては、<a href="https://auth0.com/docs/tokens/concepts/signing-algorithms">こちらのドキュメント</a>を参照してください。</p></div></p><p>以下のサンプルは、<b>RS256署名アルゴリズム</b>の使用に<code>AuthenticationController</code>をどのように構成するのかを示しています。</p><p><pre><code class="language-javascript">// src/main/java/com/auth0/example/security/Auth0AuthenticationProvider.java



@ApplicationScoped

public class Auth0AuthenticationProvider {



    @Produces

    public AuthenticationController authenticationController(Auth0AuthenticationConfig config) {

        JwkProvider jwkProvider = new JwkProviderBuilder(config.getDomain()).build();

        return AuthenticationController.newBuilder(config.getDomain(), config.getClientId(), config.getClientSecret())

                .withJwkProvider(jwkProvider)

                .build();

    }

}

</code></pre>

</p><p>最後に、カスタムの<code>HttpAuthenticationMechanism</code>を実装します。</p><p><code></code><pre><code class="language-javascript">// src/main/java/com/auth0/example/security/Auth0AuthenticationMechanism.java



@ApplicationScoped

@AutoApplySession

public class Auth0AuthenticationMechanism implements HttpAuthenticationMechanism {

    private final AuthenticationController authenticationController;

    private final IdentityStoreHandler identityStoreHandler;



    @Inject

    Auth0AuthenticationMechanism(AuthenticationController authenticationController, IdentityStoreHandler identityStoreHandler) {

        this.authenticationController = authenticationController;

        this.identityStoreHandler = identityStoreHandler;

    }



    @Override

    public AuthenticationStatus validateRequest(HttpServletRequest httpServletRequest,

                                                HttpServletResponse httpServletResponse,

                                                HttpMessageContext httpMessageContext) throws AuthenticationException {



        // Exchange the code for the ID token, and notify container of result.

        if (isCallbackRequest(httpServletRequest)) {

            try {

                Tokens tokens = authenticationController.handle(httpServletRequest, httpServletResponse);

                Auth0JwtCredential auth0JwtCredential = new Auth0JwtCredential(tokens.getIdToken());

                CredentialValidationResult result = identityStoreHandler.validate(auth0JwtCredential);

                return httpMessageContext.notifyContainerAboutLogin(result);

            } catch (IdentityVerificationException e) {

                return httpMessageContext.responseUnauthorized();

            }

        }

        return httpMessageContext.doNothing();

    }



    private boolean isCallbackRequest(HttpServletRequest request) {

        return request.getRequestURI().equals(&quot;/callback&quot;) &amp;&amp; request.getParameter(&quot;code&quot;) != null;

    }

}

</code></pre>

</p><p>このクラスは<code>validateRequest</code>メソッドをオーバーライドします。このメソッドはAuth0アプリケーションに対するすべての要求で呼び出され、コンテナーに認証ステータスを通知します。</p><p>このサンプルでは、<a href="https://auth0.com/docs/flows/concepts/auth-code">認可コードフロー</a>を使用して、認証フロー中に認可コードをトークンと交換します。この要求が<code>/callback</code>エンドポイントに対するもので、<code>code</code>要求パラメーターが含まれている場合には、以下にあるいくつかの重要な処理を行います。</p><ul><li><p><code>AuthenticationController</code>の<code>handle</code>メソッドを呼び出して、認可コードをIDトークンおよびアクセストークンと交換する。</p></li><li><p>IDトークンを使用して、新たに<code>Auth0Credential</code>を作成する。</p></li><li><p>カスタムの<code>IdentityStore</code>実装の<code>validate</code>メソッドを呼び出して、検証結果を取得する。</p></li><li><p>アプリケーションコンテナーにログインステータスを通知する。</p></li></ul><p>要求されたリソースが<code>/callback</code>でない場合には、<code>httpMessageContext.doNothing()</code>を返して、要求の処理が続行できるようにします。後ほど、認証のトリガーやWebビューの表示で認証情報をどのように使用するかについて説明します。</p><p>最後に、認証したユーザーのセッションをコンテナーが作成できるように、<code>@AutoApplySession</code>アノテーションが追加されたことに注意してください。</p>

## 認証をトリガーする {{{ data-action="code" data-code="src/main/java/com/auth0/example/web/LoginServlet.java" }}}


<p>ユーザーがログインできるようにするには、<code>/login</code>パスへの要求を処理するサーブレットを作成します。</p><p><code>LoginController</code>は、ユーザーがAuth0で認証できるように、正しい認可URLに要求をリダイレクトします。正しい認可URLの構築には、<code>Auth0AuthenticationConfig</code>を通して投入された構成値と、Auth0 Java MVC SDKが提供する<code>AuthenticationController</code>が使用されます。このサンプルはデフォルトで<code>openid profile email</code>スコープを要求して、アプリケーションが基本的なプロファイル情報を認証済みのユーザーから取得できるようにします。これらのスコープについては、<a href="https://auth0.com/docs/scopes/current/oidc-scopes">OpenID Connectスコープ</a>のドキュメントをお読みください。</p><p>ユーザーが資格情報を入力し、要求されたアクセス権を認可すると、Auth0は<code>callbackUrl</code>に対して要求を発行し、IDトークンおよびアクセストークンと交換できる<code>code</code>クエリパラメーターを含めます。先ほど説明したように、上記で作成した<code>Auth0HttpAuthenticationMechanism</code>がこの交換を処理し、アプリケーションコンテナーに認証ステータスを通知できるようにします。そうすることで、<code>/callback</code>パスへの要求を処理するサーブレットは、ログイン前に要求された元のリソースに要求を転送するか、ホームページにリダイレクトするだけで済みます。</p><p><pre><code class="language-javascript">// src/main/com/auth0/example/web/CallbackServlet.java



@WebServlet(urlPatterns = {&quot;/callback&quot;})

public class CallbackServlet extends HttpServlet {



    @Override

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {

        String referer = (String) request.getSession().getAttribute(&quot;Referer&quot;);

        String redirectTo = referer != null ? referer : &quot;/&quot;;



        response.sendRedirect(redirectTo);

    }

}

</code></pre>

</p>

## ユーザー情報を表示する {{{ data-action="code" data-code="src/main/java/com/auth0/example/web/HomeServlet.java" }}}


<p>認証したユーザーのプロファイル情報を取得するには、<code>Auth0JwtPrincipal</code>を使用することができます。<code>HomeServlet.java</code>のサンプルコードでは、<a href="https://auth0.com/docs/tokens/id-token">IDトークン</a>でクレームを使ってプロファイルデータを要求属性に設定する方法を例示しています。</p><p>そのプロファイル情報は、ユーザーについての情報を表示するビューで使用できます。</p><p><pre><code class="language-html">&lt;!-- src/main/webapp/WEB-INF/jsp/fragments/navbar.jspf --&gt;



&lt;c:choose&gt;

 &lt;c:when test=&quot;{empty profile}&quot;&gt;

&lt;li&gt;

 &lt;form action=&quot;/login&quot; method=&quot;GET&quot;&gt;

&lt;input type=&quot;submit&quot; value=&quot;Login&quot;/&gt;

 &lt;/form&gt;

&lt;/li&gt;

 &lt;/c:when&gt;

 &lt;c:otherwise&gt;

&lt;li&gt;

 &lt;a href=&quot;#&quot;&gt;

&lt;!-- Profile image should be set to the profile picture from the id token --&gt;

&lt;img src=&quot;{profile.get('picture').asString()}&quot; alt=&quot;Profile picture&quot;/&gt;

 &lt;/a&gt;

 &lt;div&gt;

&lt;!-- Show the user's full name from the id token here --&gt;

&lt;div&gt;&quot;{profile.get('name').asString()}&quot;&lt;/div&gt;

&lt;a href=&quot;/profile&quot;&gt;Profile&lt;/a&gt;

&lt;a href=&quot;/logout&quot;&gt;Log out&lt;/a&gt;

 &lt;/div&gt;

&lt;/li&gt;

 &lt;/c:otherwise&gt;

&lt;/c:choose&gt;

</code></pre>

</p><p></p><p></p>

## ログアウトを処理する {{{ data-action="code" data-code="src/main/java/com/auth0/example/web/LogoutServlet.java" }}}


<p>ユーザーをログアウトさせるには、アプリケーションセッションを消去して、Auth0からユーザーをログアウトさせる必要があります。これは<code>LogoutServlet</code>で処理されます。</p><p>まず、<code>request.getSession().invalidate()</code>を呼び出して、セッションを消去します。それから、ログアウトURLを構築して、必ず<code>returnTo</code>クエリパラメーターを含めます。ユーザーはログアウト後にこのURLにリダイレクトされます。最後に、アプリケーションのをログアウトURLに応答をリダイレクトします。</p>

## サンプルを実行する


<p>サンプルを構築し実行するには、Mavenゴールに対してwildfly:runを実行し、このアプリケーションをデプロイした組み込みのWildFlyアプリケーションサーバーを起動します。詳細については、<a href="https://docs.jboss.org/wildfly/plugins/maven/latest/">WildFly Maven Plugin</a>のドキュメントを参照してください。</p><p>LinuxまたはMacOSを使用している場合は、次を行います：</p><p><pre><code class="language-powershell">./mvnw clean wildfly:run

</code></pre>

</p><p>Windows：</p><p><pre><code class="language-powershell">mvnw.cmd clean wildfly:run

</code></pre>

</p><p>使用しているブラウザーで<code>http:</code><code>//localhost:3000</code>をポイントします。<b>ログイン</b>リンクを使用して、Auth0テナントにログインまたはサインアップします。</p><img src="//images.ctfassets.net/cdy7uua7fh8z/5Lp4Zahxd2v6wSJmy9JaM4/717068d1dafc0637c4dad2cdcf5a29a5/Login_Screen_-_Japanese.png" alt="null" /><p>ログインに成功すると、ユーザーのプロフィール画像とログインリンクのあるドロップダウンメニューが表示されます。<b>プロファイル</b>リンクをクリックすると、ユーザーのプロファイルページを表示することができます。ドロップダウンメニューにある<b>ログアウト</b>リンクをクリックすると、ログアウトできます。</p>
