---
title: Login
description: This tutorial will show you how to use the Auth0 Play 2 Scala SDK to add authentication and authorization to your web app.
---

## Play 2 Scala Tutorial

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:
* Scala 2.11.7
* Typesafe Activator 1.3.7
* Play framework 2.4.6
:::

<%= include('../../_includes/_package', {
  pkgRepo: 'auth0-scala',
  pkgBranch: 'master',
  pkgPath: 'examples/regular-webapp',
  pkgFilePath: 'examples/regular-webapp/conf/application.conf',
  pkgType: 'replace'
}) %>

**Otherwise, Please follow the steps below to configure your existing Play2 Scala WebApp to use it with Auth0.**

### 1. Add configuration keys from Auth0

${snippet(meta.snippets.dependencies)}

### 2. Add Auth0 callback handler

We need to add the handler for the Auth0 callback so that we can authenticate the user and get his information.

```scala
// controllers/Callback.scala
package controllers

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

import play.api.Play
import play.api.Play.current
import play.api.cache.Cache
import play.api.http.HeaderNames
import play.api.http.MimeTypes
import play.api.libs.json.JsValue
import play.api.libs.json.Json
import play.api.libs.json.Json.toJsFieldJsValueWrapper
import play.api.libs.ws.WS
import play.api.mvc.Action
import play.api.mvc.Controller

class Callback extends Controller {

  // callback route
  def callback(codeOpt: Option[String] = None) = Action.async {
    (for {
      code <- codeOpt
    } yield {
      // Get the token
      getToken(code).flatMap { case (idToken, accessToken) =>
       // Get the user
       getUser(accessToken).map { user =>
          // Cache the user and tokens into cache and session respectively
          Cache.set(idToken+ "profile", user)
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
  }

  def getToken(code: String): Future[(String, String)] = {
    val tokenResponse = WS.url(String.format("https://%s/oauth/token", "${account.namespace}"))(Play.current).
      withHeaders(HeaderNames.ACCEPT -> MimeTypes.JSON).
      post(
        Json.obj(
          "client_id" -> "${account.clientId}",
          "client_secret" -> "${account.clientSecret}",
          "redirect_uri" -> "http://localhost:9000/callback",
          "code" -> code,
          "grant_type"-> "authorization_code"
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
    val userResponse = WS.url(String.format("https://%s/userinfo", "${account.namespace}"))(Play.current)
      .withQueryString("access_token" -> accessToken)
      .get()

    userResponse.flatMap(response => Future.successful(response.json))
  }
}
```

${include('../_callbackRegularWebApp')}

In this case, the callbackURL should look something like:

```
http://yourUrl/callback
```

### 3. Triggering login manually or integrating the Auth0Lock

${lockSDK}

> **Note:** Please note that the `callbackURL` specified in the `Auth0Lock` constructor **must match** the one specified in the previous step

### 4. Accessing user information

You can access the user information from the `cache`

```scala
// controllers/User.scala
package controllers

import play.api._
import play.api.mvc._
import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits.global
import play.api.http.{MimeTypes, HeaderNames}
import play.api.libs.ws.WS
import play.api.mvc.{Results, Action, Controller}
import play.api.libs.json._
import play.api.cache.Cache
import play.api.Play.current
import play.mvc.Results.Redirect

class User extends Controller {
    def AuthenticatedAction(f: Request[AnyContent] => Result): Action[AnyContent] = {
      Action { request =>
        (request.session.get("idToken").flatMap { idToken =>
          Cache.getAs[JsValue](idToken + "profile")
        } map { profile =>
          f(request)
        }).orElse {
          Some(Redirect(controllers.routes.Application.index()))
        }.get
      }
    }

    def index = AuthenticatedAction { request =>
      val idToken = request.session.get("idToken").get
      val profile = Cache.getAs[JsValue](idToken + "profile").get
      Ok(views.html.user(profile))
    }
}
```

```scala
// views/user.html.scala
@(profile: JsValue)

@main("Auth0 Play2 Scala Sample","home") {
  <img class="avatar" src='@((profile \ "picture").as[String])'/>
  <h2>Welcome @((profile \ "name").as[String])</h2>
}
```

### 5. You're done!

You have configured your Play2 Scala Webapp to use Auth0. Congrats, you're awesome!

### Optional steps

#### Checking if the user is authenticated

You can add the following `Action` to check if the user is authenticated and redirect him to the login page if he's not:

```scala
def AuthenticatedAction(f: Request[AnyContent] => Result): Action[AnyContent] = {
  Action { request =>
    (request.session.get("idToken").flatMap { idToken =>
      Cache.getAs[JsValue](idToken + "profile")
    } map { profile =>
      f(request)
    }).orElse {
      Some(Redirect(routes.Application.index()))
    }.get
  }
}

def index = AuthenticatedAction { request =>
  val idToken = request.session.get("idToken").get
  val profile = Cache.getAs[JsValue](idToken + "profile").get
  Ok(views.html.user(profile))
}
```
