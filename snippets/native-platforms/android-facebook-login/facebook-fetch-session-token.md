The sample uses the Facebook SDK's `GraphRequest` class to perform this request.

```java
private void fetchSessionToken(String token, final SimpleCallback<String> callback) {
    Bundle params = new Bundle();
    params.putString("grant_type", "fb_attenuate_token");
    params.putString("fb_exchange_token", token);
    params.putString("client_id", getString(R.string.facebook_app_id));

    GraphRequest request = new GraphRequest();
    request.setParameters(params);
    request.setGraphPath("oauth/access_token");
    request.setCallback(new GraphRequest.Callback() {
        @Override
        public void onCompleted(GraphResponse response) {
            FacebookRequestError error = response.getError();
            if (error != null) {
                //Failed to fetch session token
                callback.onError(error.getException());
                return;
            }
            try {
                String fbSessionToken = response.getJSONObject().getString("access_token");
                callback.onResult(fbSessionToken);
            } catch (JSONException e) {
                //Failed to parse session token
                callback.onError(e);
            }
        }
    });
    request.executeAsync();
}
```