```python
# server.py

import os
import json

from auth0.v3.authentication import GetToken
from auth0.v3.authentication import Users
from dotenv import load_dotenv
from flask import Flask
from flask import redirect
from flask import render_template
from flask import request
from flask import send_from_directory
from flask import session

# Here we're using the /callback route.
@app.route('/callback')
def callback_handling():
    code = request.args.get('code')
    get_token = GetToken('${account.namespace}')
    auth0_users = Users('${account.namespace}')
    token = get_token.authorization_code('${account.clientId}',
                                         'YOUR_CLIENT_SECRET', code, '${account.callback}')
    user_info = auth0_users.userinfo(token['access_token'])
    session['profile'] = json.loads(user_info)
    return redirect('/dashboard')
```
