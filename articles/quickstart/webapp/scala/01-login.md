---
title: Login
default: true
description: This tutorial demonstrates how to add user login to a Scala Play application.
budicon: 448
github:
  path: 00-Starter-Seed
---
<%= include('../_includes/_getting_started', { library: 'Scala', callback: 'http://localhost:3000/callback' }) %>

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
import play.api.mvc.Action
import play.api.mvc.Controller
import helpers.Auth0Config

class Callback @Inject() (cache: CacheApi, ws: WSClient) extends Controller {
  
  def callback(codeOpt: Option[String] = None, stateOpt: Option[String] = None) = Action.async {
    if (stateOpt == cache.get("state")) {
      (for {
        code <- codeOpt
      } yield {
        getToken(code).flatMap { case (idToken, accessToken) =>
          getUser(accessToken).map { user =>
            cache.set(idToken + "profile", user)
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

  def getToken(code: String): Future[(String, String)] = {
    val config = Auth0Config.get()
    var audience = config.audience
    if (config.audience == ""){
      audience = String.format("https://%s/userinfo",config.domain)
    }
    val tokenResponse = ws.url(String.format("https://%s/oauth/token", config.domain)).
      withHeaders(HeaderNames.ACCEPT -> MimeTypes.JSON).
      post(
        Json.obj(
          "client_id" -> config.clientId,
          "client_secret" -> config.secret,
          "redirect_uri" -> config.callbackURL,
          "code" -> code,
          "grant_type"-> "authorization_code",
          "audience" -> audience
        )
      )
      
    tokenResponse.flatMap { response =>
      (for {
        idToken <- (response.json \ "id_token").asOpt[String]
        accessToken <- (response.json \ "access_token").asOpt[String]
      } yield {
        Future.successful((idToken, accessToken)) 
      }).getOrElse(Future.failed[(String, String)](new IllegalStateException("Tokens not sent")))
    }
    
  }
  
  def getUser(accessToken: String): Future[JsValue] = {
    val config = Auth0Config.get()
    val userResponse = ws.url(String.format("https://%s/userinfo", config.domain))
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

class Application @Inject() (cache: CacheApi) extends Controller {

  def index = Action {
    Ok(views.html.index())
  }

  def login = Action {
    val config = Auth0Config.get()
    // Generate random state parameter
    object RandomUtil {
      private val random = new SecureRandom()

      def alphanumeric(nrChars: Int = 24): String = {
        new BigInteger(nrChars * 5, random).toString(32)
      }
    }
    val state = RandomUtil.alphanumeric()
    var audience = config.audience
    cache.set("state", state)
    if (config.audience == ""){
      audience = String.format("https://%s/userinfo",config.domain)
    }

    val query = String.format(
      "authorize?client_id=%s&redirect_uri=%s&response_type=code&scope=openid profile&audience=%s&state=%s",
      config.clientId,
      config.callbackURL,
      audience,
      state
    )
    Redirect(String.format("https://%s/%s",config.domain,query))
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
  <a class="btn btn-primary btn-lg btn-block" href="/login">SignIn</a>
</div>
```

## Display User Information

You can access the user information from the `cache`.

```scala
// app/controllers/User.scala

package controllers

import javax.inject.Inject
import play.api.mvc._
import play.api.mvc.{Action, Controller}
import play.api.libs.json._
import play.api.cache._


class User @Inject() (cache: CacheApi) extends Controller {
  def AuthenticatedAction(f: Request[AnyContent] => Result): Action[AnyContent] = {
    Action { request =>
      (request.session.get("idToken").flatMap { idToken =>
        cache.get[JsValue](idToken + "profile")
      } map { profile =>
        f(request)
      }).orElse {
        Some(Redirect(routes.Application.index()))
      }.get
    }
  }
  
  def index = AuthenticatedAction { request =>
    val idToken = request.session.get("idToken").get
    val profile = cache.get[JsValue](idToken + "profile").get
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
  
  def logout = Action {
    val config = Auth0Config.get()
    Redirect(String.format(
      "https://%s/v2/logout?client_id=%s&returnTo=http://localhost:9000",
      config.domain,
      config.clientId)
    ).withNewSession
  }
}
```

::: note
Please take into consideration that the return to URL needs to be in the list of Allowed Logout URLs in the settings section of the application as explained in [our documentation](/logout#redirect-users-after-logout)
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
    (request.session.get("idToken").flatMap { idToken =>
      cache.getAs[JsValue](idToken + "profile")
    } map { profile =>
      f(request)
    }).orElse {
      Some(Redirect(routes.Application.index()))
    }.get
  }
}

def index = AuthenticatedAction { request =>
  val idToken = request.session.get("idToken").get
  val profile = cache.getAs[JsValue](idToken + "profile").get
  Ok(views.html.user(profile))
}
```
