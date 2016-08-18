```java
@Value(value = "<%= "${auth0.customLogin}" %>")
protected boolean customLogin;

@Value(value = "<%= "${auth0.connection}" %>")
protected String connection;

public boolean isCustomLogin() {
    return customLogin;
}

public String getConnection() {
    return connection;
}
```