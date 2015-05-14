---
lodash: true
---

## Play 2 Scala Tutorial

<div class="package" style="text-align: center;">
  <blockquote>
    <a href="@@base_url@@/auth0-scala/master/create-package?path=examples/regular-webapp&filePath=examples/regular-webapp/conf/application.conf&type=replace@@account.clientParam@@" class="btn btn-lg btn-success btn-package" style="text-transform: uppercase; color: white">
      <span style="display: block">Download a Seed project</span>
      <% if (account.userName) { %>
      <span class="smaller" style="display:block; font-size: 11px">with your Auth0 API Keys already set and configured</span>
      <% } %>
    </a>
  </blockquote>
</div>

**Otherwise, Please follow the steps below to configure your existing Play2 Scala WebApp to use it with Auth0.**

### 1. Add configuration keys from Auth0

Add the following keys to your `application.conf`

````properties
# Auth0 Information
# ~~~~~~~~~~~~~~~~~

auth0.clientSecret="@@account.clientSecret@@"
auth0.clientId="@@account.clientId@@"
auth0.domain="@@account.namespace@@"
auth0.callbackURL="http://localhost:9000/callback"
```

### 2. Add Auth0 callback handler

We need to add the handler for the Auth0 callback so that we can authenticate the user and get his information.

````scala
// conf/routes
GET     /callback                   controllers.Callback.callback(code: Option[String], state: Option[String])
```

````scala
// controllers/Callback.scala
object Callback extends Controller {

  // callback route
  def callback(codeOpt: Option[String] = None, stateOpt: Option[String] = None) = Action.async {
    (for {
      code <- codeOpt
      state <- stateOpt
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
    val tokenResponse = WS.url(String.format("https://%s/oauth/token", "@@account.namespace@@"))(Play.current).
      withHeaders(HeaderNames.ACCEPT -> MimeTypes.JSON).
      post(
        Json.obj(
          "client_id" -> "@@account.clientId@@",
          "client_secret" -> "@@account.clientSecret@@",
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
    val config = Auth0Config.get()
    val userResponse = WS.url(String.format("https://%s/userinfo", config.domain))(Play.current)
      .withQueryString("access_token" -> accessToken)
      .get()

    userResponse.flatMap(response => Future.successful(response.json))
  }
}
```

@@includes.callbackRegularWebapp@@

In this case, the callbackURL should look something like:

````
http://yourUrl/callback
```

### 3. Triggering login manually or integrating the Auth0Lock

@@lockSDK@@

> **Note:** Please note that the `callbackURL` specified in the `Auth0Lock` constructor **must match** the one specified in the previous step

### 4. Accessing user information

You can access the user information from the `cache`

````scala
// controllers/User.scala
def index = AuthenticatedAction { request =>
  val idToken = request.session.get("idToken").get
  val profile = Cache.getAs[JsValue](idToken + "profile").get
  Ok(views.html.user(profile))
}
```

````scala
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

````scala
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
  val profile = Cache.getAs[JsValue](idToken + "profile").get
  Ok(views.html.user(profile))
}
```
