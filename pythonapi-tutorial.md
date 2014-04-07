# Using Auth0 with Flask Python API

@@includes.apinote@@

Installing the following package will provide the [JSON Web Token](jwt) validation.

    pip install jwt

Then add the following to your Python API. In this example, we are using Flask, but this could be translated to any other Python framework easily.

    import jwt
    import base64

    from functools import wraps
    from flask import Flask, request, jsonify, _request_ctx_stack
    from werkzeug.local import LocalProxy

    app = Flask(__name__)
    app.debug = True

    CLIENT_ID = '@@account.clientId@@' 
    CLIENT_SECRET = '@@account.clientSecret@@'
    
    current_user = LocalProxy(lambda: _request_ctx_stack.top.current_user)

    def authenticate(error):
      resp = jsonify(error)

      resp.status_code = 401
      resp.headers['WWW-Authenticate'] = 'Bearer realm="' + CLIENT_ID + '"'

      return resp

    def requires_auth(f):
      @wraps(f)
      def decorated(*args, **kwargs):
        auth = request.headers.get('Authorization', None)
        if not auth: 
          return authenticate({'code': 'authorization_header_missing', 'description': 'Authorization header is expected'})

        parts = auth.split()

        if parts[0].lower() != 'bearer':
          return {'code': 'invalid_header', 'description': 'Authorization header must start with Bearer'}
        elif len(parts) == 1:
          return {'code': 'invalid_header', 'description': 'Token not found'}
        elif len(parts) > 2:
          return {'code': 'invalid_header', 'description': 'Authorization header must be Bearer + \s + token'}

        token = parts[1]
        try:
            payload = jwt.decode(
                token,
                base64.b64decode(CLIENT_SECRET.replace("_","/").replace("-","+"))
            )
        except jwt.ExpiredSignature:
            return authenticate({'code': 'token_expired', 'description': 'token is expired'})
        except jwt.DecodeError:
            return authenticate({'code': 'token_invalid_signature', 'description': 'token signature is invalid'})
        
        if payload['aud'] != CLIENT_ID:
          return authenticate({'code': 'invalid_audience', 'description': 'the audience does not match. expected: ' + CLIENT_ID})

        _request_ctx_stack.top.current_user = user = payload
        return f(*args, **kwargs)

      return decorated

This will add a decorator `requires_auth` that you can put on top of the APIs you want to protect. Below are two examples, one unprotected and the other requires the token to be sent. Also note that you have all the attributes of the JSON Web Token in `current_user`.

    @app.route("/")
    def hello():
        return "Hello World!"

    @app.route("/protected")
    @requires_auth
    def protected():
        return "Hello World " + current_user['email'] + "!"

    if __name__ == "__main__":
        app.run()    

> If you are not using Flask you can use the [jwt package](https://github.com/progrium/pyjwt) which provides the underlying token validation functionality used here.

@@includes.callapi@@
