```java
protected String login(final Map<String, Object> model, final HttpServletRequest req) {
    logger.debug("Performing login");
    detectError(model);
    // add Nonce to storage
    NonceUtils.addNonceToStorage(req);
    model.put("clientId", auth0Config.getClientId());
    model.put("domain", auth0Config.getDomain());
    model.put("loginCallback", auth0Config.getLoginCallback());
    model.put("state", SessionUtils.getState(req));
    model.put("connection", appConfig.getConnection());
    // for this sample only, this just allows configuration to
    // use Lock Widget or Auth0.js for login presentation
    // should only enable loginCustom for DB connection
    return appConfig.isCustomLogin() ? "loginCustom" : "login";
}
```