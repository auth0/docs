---
title: Add Authorization to Your PHP Application
description: This guide demonstrates how to integrate Auth0, add token-based authorization, and protect application routes using the Auth0 PHP SDK.
interactive:  true
files:
 - files/index
 - files/router
github:
  path: https://github.com/auth0-samples/auth0-php-api-samples/tree/main/app
locale: en-US
---

# Add Authorization to Your PHP Application


<p>Auth0 allows you to add token-based endpoint authorization to almost any application type quickly. This guide demonstrates how to integrate Auth0, add token-based authorization, and protect application routes using the Auth0 PHP SDK.</p><p>To use this quickstart, you’ll need to:</p><ul><li><p>Sign up for a free Auth0 account or log in to Auth0.</p></li><li><p>Have a working PHP project that you want to integrate with Auth0. Alternatively, you can view or download a sample application after logging in.</p></li></ul><p></p><p></p>

## Configure Auth0


<p>To use Auth0 services, you need to have an application registered in the Auth0 Dashboard. The Auth0 application is where you configure how you want authentication to work for your project.</p><h3>Configure an application</h3><p>Use the interactive selector to create a new Auth0 application or select an existing application that represents the project you want to integrate. Every application in Auth0 is assigned an alphanumeric, unique client ID that your application code uses to call Auth0 APIs through the SDK.</p><p>Any settings you configure using this quickstart automatically updates for your application in the <a href="https://manage.auth0.com/#/">Dashboard</a>, which is where you can manage your applications in the future.</p><p>If you would rather explore a complete configuration, you can view a sample application instead.</p><h3>Configure an API</h3><p>Similarly, you need to create a new Auth0 API or use an existing API that represents the project you&#39;re integrating from the <a href="https://manage.auth0.com/#/">Dashboard</a>. Choose a unique identifier for the API and make a note of it. You need that identifier to configure your application below.</p>

## Install the Auth0 PHP SDK {{{ data-action="code" data-code="index.php" }}}


<p>Auth0 provides a <a href="https://github.com/auth0/auth0-PHP">PHP SDK</a> (Auth0-PHP) to simplify the process of implementing Auth0 authentication and authorization in PHP apps.</p><p>The Auth0 PHP SDK requires <a href="https://www.php-fig.org/psr/psr-17/">PSR-17</a> and <a href="https://www.php-fig.org/psr/psr-18/">PSR-18</a> installed, compatible HTTP libraries for managing network requests. If you don&#39;t have libraries available, you can install reliable choices by running the following commands in your terminal:</p><p><pre><code class="language-powershell">cd &lt;your-project-directory&gt;

    composer require symfony/http-client nyholm/psr7

</code></pre>

</p><p>Now, install the Auth0 PHP SDK by running the following command in your terminal:</p><p><pre><code class="language-powershell">composer require auth0/auth0-php

</code></pre>

</p><h3>Configure the Auth0 SDK</h3><p>For the SDK to function properly, you must set the following properties in the Auth0 SDK during initialization:</p><ul><li><p><code>strategy</code>: The strategy helps guide the behavior of the SDK for the use case of your app. In this case, you want to set this to the constant</p><p> <code>Auth0\SDK\Configuration\SdkConfiguration::STRATEGY_API</code></p></li><li><p>domain: The domain of your Auth0 tenant. Generally, you find this in the Auth0 Dashboard under Application&#39;s Settings in the Domain field. If you are using a  custom domain, set this to the value of your custom domain instead.</p></li><li><p>clientId: The ID of the Auth0 Application you set up earlier in this quickstart. You can find this in the Auth0 Dashboard under your Application&#39;s Settings in the Client ID field.</p></li><li><p>clientSecret: The secret of the Auth0 application you created earlier in this quickstart. Client secret is in the Auth0 Dashboard under your Application&#39;s Settings in the Client Secret field.</p></li><li><p>audience: The identifier of the Auth0 API you registered above. This must be provided as an array.</p></li></ul><p><div class="checkpoint">PHP API Step 2 Checkpoint <div class="checkpoint-default"><p>Your Auth0 SDK is now properly configured. Run your application to verify that:</p><ul><li><p>The SDK is initializing correctly.</p></li><li><p>Your application is not throwing any errors related to Auth0.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Sorry about that. Here&#39;s a couple things to double check:</p><ul><li><p>Make sure the correct application is selected.</p></li><li><p>Did you save after entering your URLs?</p></li><li><p>Make sure the domain and client ID imported correctly.</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p></div>

  </div></p>

## Listen for the bearer tokens {{{ data-action="code" data-code="index.php#20:23" }}}


<p>Next, expand your application to retrieve and process bearer tokens. Bearer tokens are access tokens provided to your API with requests from clients on a users&#39; behalf. Access tokens approve or deny access to routes in your application. This is referred to as endpoint authorization.</p><p>The easiest way to retrieve access tokens from a request is using the PHP SDK&#39;s <code>getBearerToken()</code> method. This method fetches tokens from GET parameters, POST bodies, request headers, and other sources. In this case, the PHP SDK processes tokens passed from GET requests in the <code>token</code> parameter or from the HTTP <code>Authorization</code> header.</p>

## Create and configure routes {{{ data-action="code" data-code="router.php" }}}


<p>Now, install a routing library to help direct incoming requests to your application. This isn&#39;t a required step, but simplifies the application structure for the purposes of this quickstart.</p><p><pre><code class="language-powershell">composer require steampixel/simple-php-router

</code></pre>

</p><p>Create a new file in your application called <code>router.php</code> to define the routes. Copy in the code from the interactive panel to the right under the <b>router.php</b> tab.</p>

## Configure endpoint authorization {{{ data-action="code" data-code="router.php#21:31" }}}


<p>Now that you have configured your Auth0 application, the Auth0 PHP SDK, and you application retrieves bearer tokens from requests, the next step is to set up endpoint authorization for your project. The <code>getBearerToken()</code> method you implemented above returns a <code>Token</code> class that includes details on the request&#39;s access.</p><p>Since the <code>getBearerToken()</code> method automatically validates and verifies the incoming request, your application determines the details of the access token by evaluating the method&#39;s response. When the response is null, no valid token has been provided. Otherwise, inspect the contents of the response to learn more about the request.</p><p>In the interactive panel to the right, you can see a check if the response is null or not to filter access to your <code>/api/private</code> route.</p>

## Authorize with scopes {{{ data-action="code" data-code="router.php#33:48" }}}


<p>In some cases, you may want to filter access to a specific route based on the requested scopes in an access token. As shown in the interactive panel on the right, evaluate the contents of the &#39;scope&#39; property from the <code>getBearerToken()</code> method&#39;s response to check the scopes granted by the access token.</p>
