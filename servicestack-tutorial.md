---
title: Auth0 and ServiceStack
---
# Using Auth0 with ServiceStack

Integrating Auth0 with ServiceStack is straight forward. At the end of this tutorial you will have a working web site, capable of authenticating users with an external identity provider.

##Before you start

1. We assume you have [ServiceStack](http://www.servicestack.net/) installed and you are familiar with it.
2. We also assume you have a [connection](https://app.auth0.com/#/connections) either enabled or created. If you don't have one, this [tutorial](enable-simple-connection) shows how to enabe Google OpenID, the simplest possible connection.

##Integrating Auth0 with a ServiceStack app

ServiceStack has its own authentication mechanism based on sessions. We will provide you with a provider to plug on ServiceStack

#####1. Create the ServiceStack OAuthProvider

Add a new class to your project and copy this code:

	namespace Auth0
	{
	    using System;
	    using System.Collections.Generic;
	    using System.IO;
	    using System.Net;
	    using System.Text;
	    using System.Web;
	    using ServiceStack.Configuration;
	    using ServiceStack.ServiceHost;
	    using ServiceStack.ServiceInterface;
	    using ServiceStack.ServiceInterface.Auth;
	    using ServiceStack.Text;

	    public class Auth0Provider : OAuthProvider
	    {
	        public const string Name = "auth0";

	        public string AppId { get; set; }
	        public string AppSecret { get; set; }
	        public string Connection { get; set; }
	        public string PreAuthUrl { get; set; }
	        public string UserInfoUrl { get; set; }

	        public Auth0Provider(IResourceManager appSettings, string realm)
	            : base(appSettings, realm, Name)
	        {
	            this.AuthRealm = realm;

	            this.AppId = appSettings.GetString("oauth.auth0.AppId");
	            if (string.IsNullOrWhiteSpace(this.AppId)) { throw new ArgumentNullException("oauth.auth0.AppId"); }

	            this.AppSecret = appSettings.GetString("oauth.auth0.AppSecret");
	            if (string.IsNullOrWhiteSpace(this.AppSecret)) { throw new ArgumentNullException("oauth.auth0.AppSecret"); }

	            this.Connection = appSettings.GetString("oauth.auth0.DefaultConnection");

	            //Construct URLs based on realm.
	            this.PreAuthUrl = realm + "/authorize";
	            this.AccessTokenUrl = realm + "/oauth/token";
	            this.UserInfoUrl = realm + "/userinfo";
	        }

	        public override object Authenticate(IServiceBase authService, IAuthSession session, Auth request)
	        {
	            var tokens = Init(authService, ref session, request);
	            var error = authService.RequestContext.Get<IHttpRequest>().QueryString["error"];
	            if (!string.IsNullOrEmpty(error))
	            {
	                var error_description = authService.RequestContext.Get<IHttpRequest>().QueryString["error_description"];

	                return authService.Redirect(session.ReferrerUrl
	                                                    .AddHashParam("error", error)
	                                                    .AddHashParam("error_description", error_description));
	            }

	            var code = authService.RequestContext.Get<IHttpRequest>().QueryString["code"];
	            var isPreAuthCallback = !string.IsNullOrWhiteSpace(code);
	            if (!isPreAuthCallback)
	            {
	                var connection = authService.RequestContext.Get<IHttpRequest>().QueryString["connection"] ?? this.Connection;
	                var preAuthUrl = this.PreAuthUrl + string.Format("?client_id={0}&redirect_uri={1}&response_type=code&connection={2}",
	                        AppId, HttpUtility.UrlEncode(CallbackUrl), connection);
	                authService.SaveSession(session, SessionExpiry);
	                return authService.Redirect(preAuthUrl);
	            }

	            try
	            {
	                var entity = new StringBuilder()
	                    .Append(string.Format("client_id={0}&", this.AppId))
	                    .Append(string.Format("client_secret={0}&", this.AppSecret))
	                    .Append(string.Format("code={0}&", code))
	                    .Append(string.Format("grant_type={0}&", "authorization_code"))
	                    .Append(string.Format("redirect_uri={0}&", HttpUtility.UrlEncode(CallbackUrl)))
	                    .Append(string.Format("type={0}", "web_server"))
	                    .ToString();

	                var tokenRequest = WebRequest.Create(this.AccessTokenUrl);
	                tokenRequest.ContentType = "application/x-www-form-urlencoded";
	                tokenRequest.ContentLength = entity.Length;
	                tokenRequest.Method = "POST";

	                using (Stream requestStream = tokenRequest.GetRequestStream())
	                {
	                    var writer = new StreamWriter(requestStream);
	                    writer.Write(entity);
	                    writer.Flush();
	                }

	                var tokenResponse = (HttpWebResponse)tokenRequest.GetResponse();
	                if (tokenResponse.StatusCode == HttpStatusCode.OK)
	                {
	                    using (var reader = new StreamReader(tokenResponse.GetResponseStream()))
	                    {
	                        var obj = JsonObject.Parse(reader.ReadToEnd());
	                        if (obj != null)
	                        {
	                            tokens.AccessTokenSecret = obj.Get("access_token");
	                            session.IsAuthenticated = true;
	                            authService.SaveSession(session, SessionExpiry);
	                            OnAuthenticated(authService, session, tokens, obj);

	                            //Haz access!
	                            return authService.Redirect(session.ReferrerUrl.AddHashParam("s", "1"));
	                        }
	                    }
	                }
	            }
	            catch (WebException we)
	            {
	                var statusCode = ((HttpWebResponse)we.Response).StatusCode;
	                if (statusCode == HttpStatusCode.BadRequest)
	                {
	                    return authService.Redirect(session.ReferrerUrl.AddHashParam("f", "AccessTokenFailed"));
	                }
	            }

	            //Shouldn't get here
	            return authService.Redirect(session.ReferrerUrl.AddHashParam("f", "Unknown"));
	        }

	        protected override void LoadUserAuthInfo(AuthUserSession userSession, IOAuthTokens tokens, System.Collections.Generic.Dictionary<string, string> authInfo)
	        {
	            try
	            {
	                var tokenRequest = WebRequest.Create(this.UserInfoUrl + "?access_token=" + tokens.AccessTokenSecret);

	                var tokenResponse = (HttpWebResponse)tokenRequest.GetResponse();
	                if (tokenResponse.StatusCode == HttpStatusCode.OK)
	                {
	                    using (var reader = new StreamReader(tokenResponse.GetResponseStream()))
	                    {
	                        var obj = JsonObject.Parse(reader.ReadToEnd());
	                        userSession.Id = obj.Get("user_id");
	                        userSession.UserName = obj.Get("nickname");
	                        userSession.DisplayName = obj.Get("name");
	                        userSession.FirstName = obj.Get("given_name");
	                        userSession.LastName = obj.Get("family_name");
	                        userSession.Email = obj.Get("email");
	                        var groups = obj.Get<string[]>("groups");
	                        userSession.Roles = new List<string>();
	                        userSession.Roles.AddRange(groups);
	                        LoadUserOAuthProvider(userSession, tokens);
	                    }
	                }
	            }
	            catch (Exception ex)
	            {
	                Log.Error("Could not retrieve auth0 user info for '{0}'".Fmt(tokens.DisplayName), ex);
	            }
	        }
	    }
	}

TODO: put this on nuget

#####2. Instantiate the Auth0Provider

Typically you will have an `AppHost.cs` file where you can add plugins. Add the following code:

	Plugins.Add(new AuthFeature(() => new CustomUserSession(),
				new IAuthProvider[] {
                    new Auth0.Auth0Provider(appSettings, appSettings.GetString("oauth.auth0.OAuthServerUrl"))
				}));

#####3. Add Configuration Settings

	<add key="oauth.auth0.AppId" value="@@account.clientId@@" />
	<add key="oauth.auth0.AppSecret" value="@@account.clientSecret@@" />
	<add key="oauth.auth0.OAuthServerUrl" value="https://@@account.namespace@@"/>


#####4. Setup the callback URL in Auth0

Did you keep your settings page open? Make sure the __callback address__ in Auth0 is configured with the app's callback URL. For ServiceStack this would be:

	http://yourapp/api/auth0

## Testing the app:

Open a browser an navigate to the login URL. Typically this would be.

	http://yourapp/api/auth0?connection={connection-name}

> The connection name is the one you wrote when the connection was created.

Congratulations! 
