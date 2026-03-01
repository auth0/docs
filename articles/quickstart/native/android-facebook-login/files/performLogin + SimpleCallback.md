---
name: performLogin + SimpleCallback
language: kotlin
---
    
```kotlin
private interface SimpleCallback<T> {
  fun onResult(result: T)

  fun onError(cause: Throwable)
}
```
