# Using Auth0 with Python

This tutorial explains how to integrate Auth0 with a Python web application. 

## Tutorial

### 1. Setting up the callback URL in Auth0

<div class="setup-callback">
<p>After authenticating the user on Auth0, we will do a GET to a URL on your web site. For security purposes, you have to register this URL  on the <strong>Application Settings</strong> section on Auth0 Admin app.</p>

<pre><code>http://localhost:port/callback</pre></code>
</div>

### 2. Handle the login response

Define a handler for the login callback.

    import webapp2
    import urllib2
    import urllib
    import json
     
    AUTH0_CLIENT_ID = "@@account.clientId@@"
    AUTH0_CLIENT_SECRET = "@@account.clientSecret@@"
    AUTH0_DOMAIN = "@@account.namespace@@"
    CALLBACK_URL = "@@account.callback@@"

    class LoginCallback(webapp2.RequestHandler):
     
        def get(self):
          code = self.request.get("code")
          base_url = "https://{domain}".format(domain=AUTH0_DOMAIN)
          data = urllib.urlencode([('client_id', AUTH0_CLIENT_ID), 
                                   ('redirect_uri', CALLBACK_URL), 
                                   ('client_secret', AUTH0_CLIENT_SECRET),
                                   ('code', code), 
                                   ('grant_type', 'authorization_code')])
          req = urllib2.Request(base_url + "/oauth/token", data)
          response = urllib2.urlopen(req)
          oauth = json.loads(response.read())
          userinfo = base_url + "/userinfo?access_token=" + oauth['access_token']
          
          response = urllib2.urlopen(userinfo)
          profile = response.read()
     
          ## store profile in session 
          ##    session['profile'] = profile
          ## store oauth['id_token'] in session if you want to call an API from the web app
          ##    session['id_token'] = oauth['id_token']

          self.redirect("/")
 
Finally, map a route to the handler

    application = webapp2.WSGIApplication([
        ('/callback', LoginCallback)
    ], debug=True)

### 3. Triggering login manually or integrating the Auth0 widget

@@sdk2@@

**Congratulations!**
