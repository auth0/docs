---
name: User.swift
language: swift
---

```swift
import JWTDecode

struct User {
    let id: String
    let email: String
    let picture: String
}

extension User {
    init?(from idToken: String) {
        guard let jwt = try? decode(jwt: idToken),
              let id = jwt.subject,
              let email = jwt["email"].string,
              let picture = jwt["picture"].string
        else { return nil }
        self.id = id
        self.email = email
        self.picture = picture
    }
}
```
