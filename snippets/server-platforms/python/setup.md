```python
import os
import json

import requests
from flask import Flask, request, jsonify, session, redirect, render_template, send_from_directory

# Here we're using the /callback route.
@app.route('/callback')
def callback_handling():
  code = request.args.get('code')

  json_header = {'content-type': 'application/json'}

  token_url = "https://{domain}/oauth/token".format(domain='${account.namespace}')

  token_payload = {
    'client_id':     '${account.clientId}',
    'client_secret': '${account.clientSecret}',
    'redirect_uri':  '${account.callback}',
    'code':          code,
    'grant_type':    'authorization_code'
  }

  token_info = requests.post(token_url, data=json.dumps(token_payload), headers = json_header).json()

  user_url = "https://{domain}/userinfo?access_token={access_token}" \
      .format(domain='${account.namespace}', access_token=token_info['access_token'])

  user_info = requests.get(user_url).json()

  # We're saving all user information into the session
  session['profile'] = user_info

  # Redirect to the User logged in page that you want here
  # In our case it's /dashboard
  return redirect('/dashboard')
```
