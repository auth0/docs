```java
private void fetchUserProfile(String token, String userId, final SimpleCallback<String> callback) {
    Bundle params = new Bundle();
    params.putString("access_token", token);
    params.putString("fields", "first_name,last_name,email");

    GraphRequest request = new GraphRequest();
    request.setParameters(params);
    request.setGraphPath(userId);
    request.setCallback(new GraphRequest.Callback() {
        @Override
        public void onCompleted(GraphResponse response) {
            FacebookRequestError error = response.getError();
            if (error != null) {
                //Failed to fetch user profile
                callback.onError(error.getException());
                return;
            }
            //Handle back the profile as received
            callback.onResult(response.getRawResponse());
        }
    });
    request.executeAsync();
}
```