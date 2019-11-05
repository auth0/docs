---
title: Login
default: true
description: This tutorial demonstrates how to add user login to a Scala Play application.
budicon: 448
topics:
  - quickstarts
  - webapp
  - login
  - scala
contentType: tutorial
useCase: quickstart
github:
  path: 00-Starter-Seed
---
<%= include('../_includes/_getting_started', { library: 'Scala', callback: 'http://localhost:3000/callback' }) %>

<%= include('../../../_includes/_logout_url', { returnTo: 'http://localhost:3000' }) %>

## Configure Scala to Use Auth0

### Add the Auth0 Callback Handler

Add the handler for the Auth0 callback so you can authenticate the user and retrieve their information:

```scala
// app/controllers/Callback.scala

package controllers

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

import javax.inject.Inject
import play.api.cache._
import play.api.http.HeaderNames
import play.api.http.MimeTypes
import play.api.libs.json.JsValue
import play.api.libs.json.Json
import play.api.libs.json.Json.toJsFieldJsValueWrapper
import play.api.libs.ws._
import play.api.mvc.{Action, AnyContent, Controller}
import helpers.Auth0Config

class Callback @Inject() (cache: CacheApi, ws: WSClient) extends Controller {

  def callback(codeOpt: Option[String] = None, stateOpt: Option[String] = None): Action[AnyContent] = Action.async { request =>
    val sessionId = request.session.get("id").get
    if (stateOpt == cache.get(sessionId + "state")) {
      (for {
        code <- codeOpt
      } yield {
        getToken(code, sessionId).flatMap { case (idToken, accessToken) =>
          getUser(accessToken).map { user =>
            cache.set(request.session.get("id").get + "profile", user)
            Redirect(routes.User.index())
              .withSession(
                "idToken" -> idToken,
                "accessToken" -> accessToken
              )
          }

        }.recover {
          case ex: IllegalStateException => Unauthorized(ex.getMessage)
        }
      }).getOrElse(Future.successful(BadRequest("No parameters supplied")))
    } else {
      Future.successful(BadRequest("Invalid state parameter"))
    }
  }

  def getToken(code: String, sessionId: String): Future[(String, String)] = {

    val tokenResponse = ws.url(String.format("https://%s/oauth/token", "${account.namespace}")).
      withHeaders(HeaderNames.ACCEPT -> MimeTypes.JSON).
      post(
        Json.obj(
          "client_id" -> "${account.clientId}",
          "client_secret" -> "YOUR_CLIENT_SECRET",
          "redirect_uri" -> "http://localhost:3000/callback",
          "code" -> code,
          "grant_type"-> "authorization_code",
          "audience" -> "${apiIdentifier}"
        )
      )

    tokenResponse.flatMap { response =>
      (for {
        idToken <- (response.json \ "id_token").asOpt[String]
        accessToken <- (response.json \ "access_token").asOpt[String]
      } yield {
        cache.set(sessionId + "id_token", idToken)
        cache.set(sessionId + "access_token", accessToken)
        Future.successful((idToken, accessToken))
      }).getOrElse(Future.failed[(String, String)](new IllegalStateException("Tokens not sent")))
    }

  }

  def getUser(accessToken: String): Future[JsValue] = {
    val config = Auth0Config.get()
    val userResponse = ws.url(String.format("https://%s/userinfo", "${account.namespace}"))
      .withQueryString("access_token" -> accessToken)
      .get()

    userResponse.flatMap(response => Future.successful(response.json))
  }
}
```

## Trigger Authentication

In the `Application` controller add `login` action to log the user in.

```scala
// app/controllers/Application.scala

package controllers

import javax.inject.Inject
import play.api.cache._
import play.api.mvc.Action
import play.api.mvc.Controller
import helpers.Auth0Config
import java.security.SecureRandom
import java.math.BigInteger
import java.util.UUID.randomUUID

class Application @Inject() (cache: CacheApi) extends Controller {

  def index: Action[AnyContent] = Action {
    Ok(views.html.index())
  }

  def login: Action[AnyContent] = Action {
    // Generate random state parameter
    object RandomUtil {
      private val random = new SecureRandom()

      def alphanumeric(nrChars: Int = 24): String = {
        new BigInteger(nrChars * 5, random).toString(32)
      }
    }
    val state = RandomUtil.alphanumeric()

    val id = randomUUID().toString
    cache.set(id + "state", state)
    val query = String.format(
      "authorize?client_id=%s&redirect_uri=%s&response_type=code&scope=openid profile&audience=%s&state=%s",
      "${account.clientId}",
      "http://localhost:3000/callback",
      "${apiIdentifier}",
      state
    )
    Redirect(String.format("https://%s/%s", "${account.namespace}", query)).withSession("id" -> id)
  }
}
```

In the `index` view add a link to `login` route.

```html
<!-- app/views/index.scala.html -->

<div class="login-box auth0-box before">
  <img src="https://i.cloudup.com/StzWWrY34s.png" />
  <h3>Auth0 Example</h3>
  <p>Zero friction identity infrastructure, built for developers</p>
  <a class="btn btn-primary btn-lg btn-block" href="/login">Sign in</a>
</div>
```

## Display User Information

You can access the user information from the `cache`.

```scala
// app/controllers/User.scala

package controllers

import javax.inject.Inject
import play.api.mvc.{Action, AnyContent, Controller, Request, Result}
import play.api.libs.json._
import play.api.cache._


class User @Inject() (cache: CacheApi) extends Controller {
  def AuthenticatedAction(f: Request[AnyContent] => Result): Action[AnyContent] = {
    Action { request =>
      (request.session.get("id").flatMap { id =>
        cache.get[JsValue](id + "profile")
      } map { profile =>
        f(request)
      }).orElse {
        Some(Redirect(routes.Application.index()))
      }.get
    }
  }

  def index: Action[AnyContent] = AuthenticatedAction { request =>
    val id = request.session.get("id").get
    val profile = cache.get[JsValue](id + "profile").get
    Ok(views.html.user(profile))
  }
}
```

Display the user information in the `user` view.

```scala
// app/views/user.scala.html

@(profile: JsValue)

@main("Auth0 Play2 Scala Sample","home") {
  <img class="avatar" src='@((profile \ "picture").as[String])'/>
  <h2>Welcome @((profile \ "name").as[String])</h2>
}
```

## Logout

To log the user out, you have to clear the data from the session, and redirect the user to the Auth0 logout endpoint. You can find more information about this in [our documentation logout documentation](/logout).

Add the `logout` action in the `Application` controller.

```scala
// app/controllers/Application.scala

class Application @Inject() (cache: CacheApi) extends Controller {

  //...

  def logout: Action[AnyContent] = Action { request =>
    val host = request.host
    var scheme = "http"
    if (request.secure) {
      scheme = "https"
    }
    val returnTo = scheme + "://" + host
    Redirect(String.format(
      "https://%s/v2/logout?client_id=%s&returnTo=%s",
      config.domain,
      config.clientId,
      returnTo)
    ).withNewSession
  }
}
```

::: note
The redirect URL needs to be in the list of Allowed Logout URLs in the settings section of the application, For more information, see [Redirect Users After Logout](/logout/guides/redirect-users-after-logout).
:::

In the `user` view add a link to `logout` route.

```html
<!-- app/views/user.scala.html -->

<a href="/logout" class="btn btn-lg">Logout</a>
```

## Optional Steps

You can add the following `Action` to check if the user is authenticated. If not, redirect them to the login page:

```scala
// app/controllers/User.scala

def AuthenticatedAction(f: Request[AnyContent] => Result): Action[AnyContent] = {
  Action { request =>
    (request.session.get("id").flatMap { id =>
      cache.getAs[JsValue](id + "profile")
    } map { profile =>
      f(request)
    }).orElse {
      Some(Redirect(routes.Application.index()))
    }.get
  }
}

def index: Action[AnyContent] = AuthenticatedAction { request =>
  val id = request.session.get("id").get
  val profile = cache.getAs[JsValue](id + "profile").get
  Ok(views.html.user(profile))
}
```
