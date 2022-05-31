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
    static var empty: Self {
        return User(id: "", email: "", picture: "")
    }

    static func from(_ idToken: String) -> Self {
        guard let jwt = try? decode(jwt: idToken),
              let id = jwt.subject,
              let email = jwt.claim(name: "email").string,
              let picture = jwt.claim(name: "picture").string
        else { return .empty }
        return User(id: id, email: email, picture: picture)
    }
}
```
