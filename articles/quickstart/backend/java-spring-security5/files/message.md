---
name: Message.java
language: java
---
```java
// src/main/java/com/auth0/example/model/Message.java

public class Message {
    private final String message;

    public Message(String message) {
        this.message = message;
    }

    public String getMessage() {
        return this.message;
    }
}
```